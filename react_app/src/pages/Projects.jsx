import './Projects.css';

const Projects = () => {
  const projects = [
    {
      title: "E-Commerce Mobile Application",
      category: "Mobile Development",
      tech: ["Flutter", "Dart", "Firebase", "REST API"],
      description: "A comprehensive e-commerce platform built with Flutter, offering seamless shopping experience across iOS and Android devices. The application features real-time inventory management, secure payment processing, and personalized user recommendations.",
      features: [
        "Cross-platform compatibility with native performance",
        "Real-time inventory tracking and updates",
        "Secure authentication and payment gateway integration",
        "Advanced search and filtering capabilities",
        "User reviews and ratings system"
      ],
      github: "#",
      demo: "#"
    },
    {
      title: "Enterprise Resource Planning System",
      category: "Backend Development",
      tech: ["Java", "Spring Boot", "PostgreSQL", "Docker"],
      description: "Robust backend system for enterprise resource management built with Spring Boot. Handles complex business logic, data processing, and provides RESTful APIs for multiple client applications.",
      features: [
        "Microservices architecture for scalability",
        "RESTful API design with comprehensive documentation",
        "Database optimization and query performance tuning",
        "Role-based access control and security",
        "Automated testing and continuous integration"
      ],
      github: "#",
      demo: "#"
    },
    {
      title: "Task Management Dashboard",
      category: "Full Stack Development",
      tech: ["Flutter", "Spring Boot", "MySQL", "AWS"],
      description: "Full-stack project management application combining Flutter frontend with Spring Boot backend. Enables teams to collaborate effectively with real-time updates and comprehensive project tracking.",
      features: [
        "Real-time task updates and notifications",
        "Project timeline visualization",
        "Team collaboration and communication tools",
        "File sharing and document management",
        "Analytics and reporting dashboard"
      ],
      github: "#",
      demo: "#"
    },
    {
      title: "Algorithm Visualizer",
      category: "Educational Tool",
      tech: ["Flutter", "Dart", "Algorithms"],
      description: "Interactive mobile application for visualizing data structures and algorithms. Helps students and developers understand complex algorithmic concepts through visual representations and step-by-step execution.",
      features: [
        "Visualization of sorting algorithms",
        "Graph traversal animations",
        "Dynamic programming solution breakdowns",
        "Step-by-step code execution",
        "Performance comparison tools"
      ],
      github: "#",
      demo: "#"
    }
  ];

  return (
    <div className="projects">
      <div className="projects-header">
        <h1>Project Portfolio</h1>
        <p className="subheadline">Technical Achievement & Innovation Reports</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, index) => (
          <article key={index} className="project-article">
            <h2 className="project-headline">{project.title}</h2>
            <p className="project-byline">Filed under: {project.category}</p>
            
            <div className="tech-tags">
              {project.tech.map((tech, i) => (
                <span key={i} className="tech-tag">{tech}</span>
              ))}
            </div>

            <div className="project-description">
              <p><strong>Project Overview:</strong> {project.description}</p>
            </div>

            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>Key Features</h3>
              <ul className="project-features">
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>

            <div className="project-links">
              <a href={project.github} className="project-link">
                View Source Code
              </a>
              <a href={project.demo} className="project-link">
                Live Demo
              </a>
            </div>
          </article>
        ))}
      </div>

      <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', border: '2px dashed var(--border-color)' }}>
        <h3 style={{ marginBottom: '1rem' }}>More Projects in Development</h3>
        <p>Additional projects and technical documentation available upon request. Contact for detailed information.</p>
      </div>
    </div>
  );
};

export default Projects;
