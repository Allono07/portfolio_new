import ExperienceList from '../components/ExperienceList.js';
import { workExperience } from '../data/workExperience.js';

const education = [
  {
    school: 'Christ (Deemed to be) University',
    degree: 'M.Sc Computer Science and Applications',
    period: 'Jun 2023 - Jun 2025',
    location: 'Bengaluru, India',
    highlights: [
      'Key Focus: Data Structures, System Design, Artificial Intelligence, Spring Boot, Android Development',
    ],
  },
  {
    school: 'Christ (Deemed to be) University',
    degree: 'B.Sc in Physics, Mathematics, and Electronics',
    period: 'Jun 2019 - Jun 2022',
    location: 'Bengaluru, India',
  },
];

export default function AboutPage() {
  return (
    <section className="page">
      <p className="page-kicker">About</p>
      <h1 className="page-title">A little more about my work, education, and life.</h1>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Work Experience</h2>

        <ExperienceList items={workExperience} />
      </section>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Education</h2>

        <div className="experience-list">
          {education.map((entry) => (
            <article className="experience-item education-item" key={`${entry.school}-${entry.degree}`}>
              <div className="experience-heading">
                <h3>{entry.school}</h3>
                <p className="experience-meta">{entry.period}</p>
              </div>

              <p className="education-degree">{entry.degree}</p>
              <p className="education-location">{entry.location}</p>

              {entry.highlights ? (
                <ul className="education-highlights">
                  {entry.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              ) : null}
            </article>
          ))}
        </div>
      </section>

      <div className="ink-rule" />

      <section className="home-section">
        <h2 className="section-title">Life</h2>

        <div className="about-copy">
          <p>
            I enjoy building things that feel useful, calm, and dependable.
            That mindset carries through both my work and the way I approach
            everyday life: stay curious, keep learning, and make complicated
            things easier for other people to use.
          </p>
          <p>
            A lot of my thinking is shaped by problem solving, patience with
            detail, and the satisfaction of making an experience feel simpler
            than it was before. That is true whether I am working on a mobile
            flow, a backend system, or a small internal tool.
          </p>
        </div>
      </section>
    </section>
  );
}
