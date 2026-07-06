import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  slug: string;
  frameCount: number;
  /** Path prefix under /frames, e.g. "pour-over" */
  className?: string;
}

/**
 * Renders a sequence of still frames onto a <canvas>, then scrubs through
 * them tied 1:1 to scroll position inside a tall pinned section — the same
 * technique used for Apple product-page scroll films. The section's total
 * scrollable height determines how much scrolling is required to traverse
 * the whole clip: the video never advances ahead of the user's scroll and
 * never completes early.
 */
export function FrameSequence({ slug, frameCount, className }: FrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !wrapper) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const base = import.meta.env.BASE_URL;
    const framePath = (i: number) =>
      `${base}frames/${slug}/f_${String(i).padStart(4, '0')}.jpg`;

    let cancelled = false;
    const images: HTMLImageElement[] = new Array(frameCount);
    imagesRef.current = images;

    function loadImage(index: number): Promise<void> {
      return new Promise((resolve) => {
        const img = new Image();
        img.decoding = 'async';
        img.onload = () => resolve();
        img.onerror = () => resolve();
        img.src = framePath(index + 1);
        images[index] = img;
      });
    }

    function render() {
      const img = images[Math.round(frameStateRef.current.frame)];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas!.width;
      const ch = canvas!.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (cw - w) / 2;
      const y = (ch - h) / 2;
      ctx!.clearRect(0, 0, cw, ch);
      ctx!.drawImage(img, x, y, w, h);
    }

    function resize() {
      const rect = wrapper!.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(wrapper!.clientWidth * dpr);
      canvas!.height = Math.round(wrapper!.clientHeight * dpr);
      canvas!.style.width = '100%';
      canvas!.style.height = '100%';
      render();
    }

    resize();
    window.addEventListener('resize', resize);

    // Load first frame immediately, then the rest progressively.
    loadImage(0).then(() => {
      if (!cancelled) render();
    });
    (async () => {
      for (let i = 1; i < frameCount; i++) {
        if (cancelled) return;
        await loadImage(i);
      }
    })();

    const st = ScrollTrigger.create({
      trigger: wrapper,
      start: 'top top',
      end: `+=${frameCount * 24}`,
      pin: true,
      pinSpacing: true,
      scrub: 0.35,
      onUpdate: (self) => {
        frameStateRef.current.frame = self.progress * (frameCount - 1);
        render();
      }
    });

    return () => {
      cancelled = true;
      window.removeEventListener('resize', resize);
      st.kill();
    };
  }, [slug, frameCount]);

  return (
    <div ref={wrapperRef} className={`frame-sequence ${className ?? ''}`}>
      <canvas ref={canvasRef} className="frame-sequence__canvas" />
      <div className="frame-sequence__vignette" aria-hidden="true" />
    </div>
  );
}
