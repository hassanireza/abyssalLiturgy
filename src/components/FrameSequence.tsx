import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FrameSequenceProps {
  slug: string;
  frameCount: number;
  /** The scroll span this sequence is scrubbed against. Its top/bottom
   * defines start and end of playback, so the frame sequence finishes
   * exactly when this container's scroll range finishes (matching the
   * height of the recipe text next to it). */
  containerRef: React.RefObject<HTMLElement>;
  className?: string;
}

/**
 * Renders a sequence of still frames onto a sticky canvas, scrubbed 1:1
 * to the scroll progress of an external container (the two-column guide
 * row). The image never advances ahead of the reader's scroll and never
 * finishes before the paired recipe text does, since both are driven by
 * the same scroll span.
 */
export function FrameSequence({ slug, frameCount, containerRef, className }: FrameSequenceProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const frameStateRef = useRef({ frame: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const container = containerRef.current;
    if (!canvas || !sticky || !container) return;

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
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(sticky!.clientWidth * dpr);
      canvas!.height = Math.round(sticky!.clientHeight * dpr);
      canvas!.style.width = '100%';
      canvas!.style.height = '100%';
      render();
    }

    resize();
    window.addEventListener('resize', resize);

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
      trigger: container,
      start: 'top top',
      end: 'bottom bottom',
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
  }, [slug, frameCount, containerRef]);

  return (
    <div className={`frame-sequence ${className ?? ''}`}>
      <div ref={stickyRef} className="frame-sequence__sticky">
        <canvas ref={canvasRef} className="frame-sequence__canvas" />
        <div className="frame-sequence__vignette" aria-hidden="true" />
      </div>
    </div>
  );
}
