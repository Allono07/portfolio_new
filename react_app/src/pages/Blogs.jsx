import './Blogs.css';

const Blogs = () => {
  const blogs = [
    {
      title: "Building Cross-Platform Mobile Apps with Flutter",
      date: "November 2025",
      category: "Mobile Development",
      excerpt: "An in-depth exploration of Flutter's capabilities for creating seamless cross-platform mobile applications. Discussing architecture patterns, state management solutions, and performance optimization techniques that enable developers to build production-ready applications efficiently."
    },
    {
      title: "Microservices Architecture with Spring Boot",
      date: "October 2025",
      category: "Backend Development",
      excerpt: "Comprehensive guide to designing and implementing microservices using Spring Boot framework. Covering service discovery, API gateway patterns, distributed tracing, and strategies for maintaining data consistency across services in a production environment."
    },
    {
      title: "Mastering Data Structures for Technical Interviews",
      date: "September 2025",
      category: "Algorithms",
      excerpt: "Essential data structures every software engineer should master. From arrays and linked lists to complex trees and graphs, this article breaks down implementation details and provides practical problem-solving strategies for technical interviews and real-world applications."
    },
    {
      title: "RESTful API Design Best Practices",
      date: "August 2025",
      category: "API Development",
      excerpt: "Professional standards and conventions for designing robust RESTful APIs. Discussing resource naming, HTTP methods, status codes, versioning strategies, authentication, and documentation practices that lead to maintainable and developer-friendly APIs."
    }
  ];

  return (
    <div className="blogs">
      <div className="blogs-header">
        <h1>Technical Articles</h1>
        <p className="subheadline">In-Depth Analysis & Development Insights</p>
      </div>

      {blogs.map((blog, index) => (
        <article key={index} className="blog-article">
          <h2 className="blog-title">{blog.title}</h2>
          <p className="blog-meta">
            Published: {blog.date} • Category: {blog.category}
          </p>
          <p className="blog-excerpt">{blog.excerpt}</p>
          <div className="newspaper-columns">
            <p>
              This comprehensive article delves into the technical aspects and practical applications 
              of modern development practices. Drawing from real-world experience and industry standards, 
              the content provides valuable insights for developers at all levels.
            </p>
            <p>
              The discussion encompasses theoretical foundations while maintaining focus on practical 
              implementation. Code examples, best practices, and common pitfalls are thoroughly examined 
              to provide readers with actionable knowledge they can immediately apply to their projects.
            </p>
          </div>
          <a href="#" className="read-more">Continue Reading →</a>
        </article>
      ))}

      <div style={{ marginTop: '3rem', textAlign: 'center', padding: '2rem', border: '2px dashed var(--border-color)', background: 'var(--paper-aged)' }}>
        <h3 style={{ marginBottom: '1rem' }}>Subscribe to Technical Updates</h3>
        <p>Regular publications on software development, architecture, and engineering best practices.</p>
        <button className="vintage-btn" style={{ marginTop: '1rem' }}>Stay Informed</button>
      </div>
    </div>
  );
};

export default Blogs;
