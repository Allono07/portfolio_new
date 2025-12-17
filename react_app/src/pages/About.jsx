import './About.css';

const About = () => {
  return (
    <div className="about">
      <div className="about-header">
        <div className="profile-image-placeholder">👨‍💻</div>
        <h1>Allen Thomson</h1>
        <p className="subheadline">Application & Backend Developer</p>
      </div>

      <div className="about-content newspaper-columns">
        <p>
          <strong>Special Report</strong> — In an exclusive feature, we examine the career trajectory 
          of a distinguished software developer who has made significant contributions to the field of 
          mobile and backend development.
        </p>
        <p>
          From early beginnings in computer science to mastering modern frameworks and technologies, 
          this developer has demonstrated consistent dedication to excellence. The journey encompasses 
          extensive work in Flutter for cross-platform mobile applications, coupled with robust backend 
          systems built using Spring Boot framework.
        </p>
        <p>
          The technical repertoire extends beyond mobile and backend development. A strong foundation 
          in data structures and algorithms, regularly honed through competitive programming platforms, 
          ensures that solutions are not only functional but optimally efficient.
        </p>
        <p>
          Contemporary software development demands versatility, and this profile delivers. Experience 
          spans the full development lifecycle, from requirements gathering and system design to 
          implementation, testing, and deployment. Version control mastery with Git, coupled with 
          understanding of modern DevOps practices, rounds out a comprehensive skill set.
        </p>
      </div>

      <p className="ornamental-divider"></p>

      <div className="experience-section">
        <h2>Professional Experience</h2>
        
        <div className="experience-item">
          <h3 className="experience-title">Mobile Application Development</h3>
          <p className="experience-details">Flutter & Dart • Cross-Platform Development</p>
          <p>
            Developed multiple mobile applications using Flutter framework, ensuring consistent user 
            experience across iOS and Android platforms. Implemented state management solutions, 
            integrated REST APIs, and created responsive, intuitive user interfaces.
          </p>
        </div>

        <div className="experience-item">
          <h3 className="experience-title">Backend System Architecture</h3>
          <p className="experience-details">Java Spring Boot • Microservices • REST APIs</p>
          <p>
            Designed and implemented scalable backend systems using Spring Boot framework. Created 
            RESTful APIs, managed database operations, and ensured system reliability and performance. 
            Implemented security best practices and handled complex business logic efficiently.
          </p>
        </div>

        <div className="experience-item">
          <h3 className="experience-title">Algorithm & Problem Solving</h3>
          <p className="experience-details">Data Structures • Competitive Programming</p>
          <p>
            Maintained active presence on coding platforms including LeetCode, focusing on algorithmic 
            problem-solving and optimization. Applied theoretical knowledge to practical scenarios, 
            ensuring code efficiency and scalability.
          </p>
        </div>
      </div>

      <h2 style={{ marginTop: '3rem' }}>Education & Certifications</h2>
      <div className="education-grid">
        <div className="education-card">
          <p className="degree">Computer Science Education</p>
          <p className="institution">Strong foundation in software engineering principles</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Comprehensive study of programming fundamentals, data structures, algorithms, 
            database management, and software architecture.
          </p>
        </div>

        <div className="education-card">
          <p className="degree">Continuous Learning</p>
          <p className="institution">Modern Technology Stack</p>
          <p style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
            Regular upskilling in latest technologies including Flutter, Spring Boot, 
            cloud services, and modern development practices.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
