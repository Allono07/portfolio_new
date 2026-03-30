import { useState } from 'react';

export default function ExperienceList({ items, initialOpenId = null }) {
  const [openId, setOpenId] = useState(initialOpenId);

  return (
    <div className="experience-list">
      {items.map((experience) => {
        const isOpen = openId === experience.id;
        const panelId = `experience-panel-${experience.id}`;

        return (
          <article
            className={`experience-item${isOpen ? ' is-open' : ''}`}
            key={experience.id}
          >
            <div className="experience-heading">
              <div className="experience-heading-copy">
                <h3>{experience.role}</h3>
                <p className="experience-meta">
                  {experience.company} · {experience.period}
                </p>
              </div>

              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="text-button experience-toggle"
                onClick={() => setOpenId(isOpen ? null : experience.id)}
                type="button"
              >
                <span>{isOpen ? 'Hide details' : 'Read more'}</span>
                <span aria-hidden="true" className="experience-toggle-icon" />
              </button>
            </div>

            <p className="experience-summary">{experience.summary}</p>

            <div
              className={`experience-panel${isOpen ? ' is-open' : ''}`}
              id={panelId}
            >
              <div className="experience-panel-inner">
                <ul className="experience-details">
                  {experience.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
