import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="headline-section">
        <h1 className="main-headline">
          Application & Backend Developer
        </h1>
        <p className="subheadline">
          Crafting Robust Solutions with Flutter, Spring Boot & Modern Technologies
        </p>
      </div>

      <div className="front-page-grid">
        <div className="lead-story">
          <h2>Breaking Development News</h2>
          <p className="ornamental-divider"></p>
          
          <h3>Mobile Innovation Continues</h3>
          <p>
            In a remarkable display of technical prowess, our featured developer has been at the forefront 
            of mobile application development. Utilizing Flutter framework, numerous cross-platform applications 
            have been crafted, delivering seamless experiences across iOS and Android platforms.
          </p>
          
          <h3>Backend Systems Excellence</h3>
          <p>
            Sources confirm extensive work in backend architecture using Spring Boot. These systems handle 
            complex business logic, ensuring scalability and reliability. The implementation of RESTful APIs 
            and microservices architecture has become a hallmark of quality engineering.
          </p>
          
          <h3>Algorithmic Mastery</h3>
          <p>
            Reports indicate continuous dedication to data structures and algorithms, with regular practice 
            on competitive programming platforms. This foundation enables the creation of efficient, optimized 
            solutions to complex computational problems.
          </p>

          <div className="call-to-action">
            <h3 className="cta-headline">Explore Portfolio</h3>
            <p>Discover detailed project documentation and technical achievements</p>
            <Link to="/projects" className="vintage-btn">View Projects</Link>
          </div>
        </div>

        <div className="sidebar">
          <h3 className="sidebar-title">Technical Expertise</h3>
          <ul className="skills-list">
            <li>Flutter & Dart</li>
            <li>Java & Spring Boot</li>
            <li>Android Development</li>
            <li>REST API Design</li>
            <li>Database Management</li>
            <li>Git & Version Control</li>
            <li>Data Structures</li>
            <li>Algorithm Design</li>
          </ul>

          <p className="ornamental-divider"></p>

          <h3 className="sidebar-title">Professional Links</h3>
          <div className="social-links">
            <a 
              href="https://www.linkedin.com/in/allen-thomson-5b1309110/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>📰</span> LinkedIn Profile
            </a>
            <a 
              href="https://github.com/Allono07" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>⚙️</span> GitHub Repository
            </a>
            <a 
              href="https://leetcode.com/u/AllenThomson/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>🧩</span> LeetCode Profile
            </a>
            <a 
              href="https://www.instagram.com/allen.thomson7?igsh=OXlvZW8yanQ0NWR4" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link"
            >
              <span>📷</span> Instagram
            </a>
          </div>

          <p className="ornamental-divider"></p>

          <h3 className="sidebar-title">Latest Updates</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <strong>Now Available:</strong> Portfolio website redesigned with vintage newspaper aesthetics. 
            All project documentation updated with latest technical specifications.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
