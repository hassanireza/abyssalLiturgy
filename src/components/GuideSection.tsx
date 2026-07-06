import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Guide } from '../content/guides';
import { FrameSequence } from './FrameSequence';

gsap.registerPlugin(ScrollTrigger);

interface GuideSectionProps {
  guide: Guide;
  /** Alternates media/text side: even index = image left, odd = image right. */
  index: number;
}

export function GuideSection({ guide, index }: GuideSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const imageOnRight = index % 2 === 1;

  // Reveal-on-scroll for the individual text blocks (fires once, unrelated
  // to the scroll-length sync below).
  useEffect(() => {
    const el = copyRef.current;
    if (!el) return;

    const targets = el.querySelectorAll('[data-reveal]');
    const tween = gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 28, filter: 'blur(6px)' },
      {
        autoAlpha: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
        stagger: 0.12,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  // Sync the recipe text's own scroll to the same span as the frame
  // sequence: the text is visible from the very top (no gap), and is
  // translated upward at a rate slower than the page scroll, so it only
  // finishes revealing its final lines exactly when the frame sequence
  // finishes its last frame.
  useEffect(() => {
    const section = sectionRef.current;
    const sticky = stickyRef.current;
    const copy = copyRef.current;
    if (!section || !sticky || !copy) return;

    let overflow = 0;

    function measure() {
      const viewportH = sticky!.clientHeight;
      const contentH = copy!.scrollHeight;
      overflow = Math.max(0, contentH - viewportH);
    }

    measure();
    window.addEventListener('resize', measure);

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.35,
      onUpdate: (self) => {
        gsap.set(copy, { y: -self.progress * overflow });
      }
    });

    return () => {
      window.removeEventListener('resize', measure);
      st.kill();
    };
  }, [guide.slug]);

  return (
    <section
      className={`guide ${imageOnRight ? 'guide--image-right' : 'guide--image-left'}`}
      id={guide.slug}
      aria-labelledby={`${guide.slug}-title`}
      ref={sectionRef as React.RefObject<HTMLElement>}
    >
      <div className="guide__media-col">
        <FrameSequence
          slug={guide.slug}
          frameCount={guide.frameCount}
          containerRef={sectionRef as React.RefObject<HTMLElement>}
        />
      </div>

      <div
        className="guide__copy-col"
        style={{ ['--frame-scroll-h' as string]: `${guide.frameCount * 26}px` } as React.CSSProperties}
      >
        <div className="guide__copy-sticky" ref={stickyRef}>
          <div className="guide__copy" ref={copyRef}>
            <p className="guide__numeral" data-reveal>
              {guide.numeral}
            </p>
            <p className="eyebrow" data-reveal>
              {guide.subtitle} · {guide.duration}
            </p>
            <h2 className="guide__title" id={`${guide.slug}-title`} data-reveal>
              {guide.title}
            </h2>
            <p className="guide__intro" data-reveal>
              {guide.intro}
            </p>

            <ol className="guide__steps">
              {guide.steps.map((step, i) => (
                <li className="guide__step" key={step.label} data-reveal>
                  <span className="guide__step-index">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className="guide__step-label">{step.label}</p>
                    <p className="guide__step-text">{step.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="guide__closing" data-reveal>
              {guide.closing}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
