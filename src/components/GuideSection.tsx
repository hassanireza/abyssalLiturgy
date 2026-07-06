import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { Guide } from '../content/guides';
import { FrameSequence } from './FrameSequence';

gsap.registerPlugin(ScrollTrigger);

interface GuideSectionProps {
  guide: Guide;
}

export function GuideSection({ guide }: GuideSectionProps) {
  const copyRef = useRef<HTMLDivElement>(null);

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
          start: 'top 75%',
          once: true
        }
      }
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, []);

  return (
    <section className="guide" id={guide.slug} aria-labelledby={`${guide.slug}-title`}>
      <FrameSequence slug={guide.slug} frameCount={guide.frameCount} />

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
    </section>
  );
}
