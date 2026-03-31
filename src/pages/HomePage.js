import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { workExperience } from '../data/workExperience.js';
import ExperienceList from '../components/ExperienceList.js';
import portrait from '../../allen.jpeg';
import engineeringVideo from '../data/video/engineeringvideo.webm';

const researchPublications = [
  {
    title: 'A Cost-Effective NFC-Based Tap-and-Pay Payment System',
    date: 'Sep 2025',
    venue: 'IEEE ICWITE 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Paper accepted for oral presentation at IEEE International Conference for Women in Innovation, Technology & Entrepreneurship (ICWITE 2025).',
      'Submission ID: 741, Status: Accepted',
    ],
  },
];

export default function HomePage() {
  const featuredProjects = projects.slice(0, 4);

  return (
    <section className="page page-home">
      <section className="home-hero">
        <div className="home-hero-copy">
          <header className="home-heading">
            <h1 className="portfolio-name">Allen Thomson</h1>
            <p className="portfolio-role">Software Engineer</p>
          </header>

          <div className="ink-rule" />

          <div className="intro-row">
            <div className="portrait-shell">
              <img className="portrait-image" src={portrait} alt="Allen Thomson portrait" />
            </div>

            <p className="intro-copy">
              Hello! I&apos;m Allen, a software engineer. I love to build and solve problems.
            </p>
          </div>
        </div>

        <aside className="hero-art-panel" aria-label="Engineering animation">
          <video
            autoPlay
            className="hero-art-media"
            loop
            muted
            playsInline
            preload="auto"
          >
            <source src={engineeringVideo} type="video/mp4" />
          </video>
        </aside>
      </section>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Work Experience</h2>

        <ExperienceList items={workExperience} />
      </section>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Featured Projects</h2>

        <div className="feature-list feature-list--compact">
          {featuredProjects.map((project) => (
            <article
              className="feature-row feature-row--compact feature-row--text-only"
              key={project.id}
            >
              <div className="feature-copy">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <a
                  className="text-link"
                  href={project.link}
                  rel="noreferrer"
                  target="_blank"
                >
                  {project.linkLabel}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Research and Publications</h2>

        <div className="research-list">
          {researchPublications.map((paper) => (
            <article className="research-item" key={paper.title}>
              <div className="research-heading">
                <h3>{paper.title}</h3>
                <p className="research-meta">{paper.date}</p>
              </div>

              <p className="research-submeta">
                {paper.venue} · {paper.location}
              </p>

              <ul className="research-highlights">
                {paper.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <div className="home-panels">
        <article className="home-panel">
          <h2>About Me</h2>
          <p>
            Learn more about how I work across mobile, backend, and developer
            experience projects.
          </p>
          <Link className="text-link" to="/about">
            Read More &gt;
          </Link>
        </article>

        <article className="home-panel">
          <h2>Contact Me</h2>
          <p>
            Reach out for product engineering, backend work, or collaboration
            on thoughtful software.
          </p>
          <Link className="text-link" to="/contact">
            Get In Touch &gt;
          </Link>
        </article>
      </div>
    </section>
  );
}
