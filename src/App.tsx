import { Hero } from './components/Hero';
import { Nav } from './components/Nav';
import { GuideSection } from './components/GuideSection';
import { GrainOverlay } from './components/GrainOverlay';
import { guides } from './content/guides';

export default function App() {
  return (
    <div className="app">
      <GrainOverlay />
      <Nav />
      <main>
        <Hero />
        {guides.map((guide) => (
          <GuideSection key={guide.slug} guide={guide} />
        ))}
        <footer className="footer">
          <p className="eyebrow">Abyssal Liturgy</p>
          <p className="footer__text">
            Six rites, one ceremony. The cup is only ever a record of the
            attention paid to it.
          </p>
          <a className="footer__back" href="#top">
            Return to the beginning
          </a>
        </footer>
      </main>
    </div>
  );
}
