import { useState } from 'react';

/**
 * Renders the appropriate link / button for a project.
 *
 * Priority:
 *  1. simulationLink → small "View Demo" button
 *  2. playStoreLink  → small Google Play badge + testing-phase modal
 *  3. link           → GitHub icon (original behaviour)
 */
export default function ProjectLinkIcon({ project }) {
  const [showModal, setShowModal] = useState(false);

  if (project.simulationLink) {
    return (
      <a
        aria-label={`View demo for ${project.title}`}
        className="demo-btn"
        href={project.simulationLink}
        rel="noreferrer"
        target="_blank"
      >
        <svg aria-hidden="true" viewBox="0 0 24 24" width="11" height="11">
          <path d="M8 5v14l11-7z" fill="currentColor" />
        </svg>
        View Demo
      </a>
    );
  }

  if (project.playStoreLink) {
    return (
      <>
        <button
          aria-label={`Download ${project.title} on Google Play`}
          className="play-store-link"
          onClick={() => setShowModal(true)}
          title="Available on Google Play (Testing)"
          type="button"
        >
          {/* Google Play icon */}
          <svg aria-hidden="true" viewBox="0 0 24 24" width="15" height="15">
            <path
              d="M3.18 23.76a2 2 0 0 1-.88-.88V1.12A2 2 0 0 1 3.18.24L13.94 11 3.18 23.76ZM5.06 1.42 16.3 9.17l-2.9 2.9L5.06 1.42Zm0 21.16 8.34-10.65 2.9 2.9L5.06 22.58ZM17.36 16.7l2.48-1.42a1.6 1.6 0 0 0 0-2.56l-2.48-1.42-3.1 3.1 3.1 3.3Z"
              fill="currentColor"
            />
          </svg>
          <span className="play-store-label">
            <span className="play-store-sub">GET IT ON</span>
            <span className="play-store-main">Google Play</span>
          </span>
        </button>

        {showModal && (
          <div className="modal-overlay" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <div className="modal-box">
              {/* Play Store icon */}
              <div className="modal-icon">
                <svg viewBox="0 0 24 24" width="32" height="32" aria-hidden="true">
                  <path
                    d="M3.18 23.76a2 2 0 0 1-.88-.88V1.12A2 2 0 0 1 3.18.24L13.94 11 3.18 23.76ZM5.06 1.42 16.3 9.17l-2.9 2.9L5.06 1.42Zm0 21.16 8.34-10.65 2.9 2.9L5.06 22.58ZM17.36 16.7l2.48-1.42a1.6 1.6 0 0 0 0-2.56l-2.48-1.42-3.1 3.1 3.1 3.3Z"
                    fill="currentColor"
                  />
                </svg>
              </div>

              <h3 id="modal-title" className="modal-title">App in Testing Phase</h3>

              <p className="modal-body">
                <strong>Sonno Music Player</strong> is currently in the{' '}
                <strong>Google Play testing phase</strong> and is not yet publicly available
                on the Play Store.
              </p>
              <p className="modal-body">
                You can download the APK directly and install it on your Android device.
              </p>

              <div className="modal-actions">
                <button
                  className="modal-btn modal-btn--cancel"
                  onClick={() => setShowModal(false)}
                  type="button"
                >
                  Cancel
                </button>
                <a
                  className="modal-btn modal-btn--ok"
                  href={project.playStoreLink}
                  onClick={() => setShowModal(false)}
                  rel="noreferrer"
                  target="_blank"
                >
                  Download APK
                </a>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  if (project.link) {
    return (
      <a
        aria-label={`Open ${project.title}`}
        className="project-icon-link"
        href={project.link}
        rel="noreferrer"
        target="_blank"
        title={`Open ${project.title}`}
      >
        <svg aria-hidden="true" viewBox="0 0 24 24">
          <path
            d="M12 .5A11.5 11.5 0 0 0 .5 12.2a11.7 11.7 0 0 0 7.9 11.1c.6.1.8-.3.8-.6v-2.1c-3.2.7-3.9-1.4-3.9-1.4-.5-1.4-1.3-1.8-1.3-1.8-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.8 2.7 1.3 3.4 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.4-5.3-6 0-1.3.4-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.2 1.2a10.7 10.7 0 0 1 5.8 0c2.2-1.5 3.2-1.2 3.2-1.2.7 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.2c0 .3.2.7.8.6a11.7 11.7 0 0 0 7.9-11.1A11.5 11.5 0 0 0 12 .5Z"
            fill="currentColor"
          />
        </svg>
      </a>
    );
  }

  return null;
}
