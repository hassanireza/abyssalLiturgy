import { guides } from '../content/guides';
import { useActiveSection } from '../hooks/useActiveSection';

export function Nav() {
  const active = useActiveSection(guides.map((g) => g.slug));

  return (
    <nav className="nav" aria-label="Guide navigation">
      <a className="nav__mark" href="#top">
        A.L.
      </a>
      <ul className="nav__list">
        {guides.map((g) => (
          <li key={g.slug}>
            <a
              href={`#${g.slug}`}
              className={`nav__link ${active === g.slug ? 'is-active' : ''}`}
            >
              <span className="nav__numeral">{g.numeral}</span>
              <span className="nav__label">{g.title}</span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
