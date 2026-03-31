import ProjectLinkIcon from '../components/ProjectLinkIcon.js';
import ProjectPreview from '../components/ProjectPreview.js';
import { projects } from '../data/projects.js';

export default function PortfolioPage() {
  return (
    <section className="page">
      <p className="page-kicker">Portfolio Library</p>
      <h1 className="page-title">Projects</h1>
      <p className="page-lead">
        A hobbyist&apos;s collection of projects, experiments, and prototypes.
      </p>

      <ol className="library-list library-list--projects" aria-label="Project list">
        {projects.map((project, index) => (
          <li className="library-item library-item--project" key={project.id}>
            <article className="project-row">
              <ProjectPreview type={project.preview} />

              <div className="project-row-copy">
                <p className="library-meta">
                  Volume {String(index + 1).padStart(2, '0')} · {project.year}
                </p>
                <h2 className="library-title">{project.title}</h2>
                <p className="library-description">{project.description}</p>
                <ProjectLinkIcon href={project.link} title={project.title} />
              </div>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
