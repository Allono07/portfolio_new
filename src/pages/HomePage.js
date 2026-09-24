import MagneticLink from '../components/cinematic/MagneticLink.jsx';
import Journey from '../components/cinematic/Journey.jsx';
import Portrait from '../components/cinematic/Portrait.jsx';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects.js';
import { workExperience } from '../data/workExperience.js';
import { researchPublications } from '../data/research.js';
import { blogPosts } from '../data/blogPosts.js';
import { forumTopics } from '../data/forumTopics.js';
import ExperienceList from '../components/ExperienceList.js';
import ProjectLinkIcon from '../components/ProjectLinkIcon.js';
import { renderInlineLinks } from '../utils/renderInlineLinks.js';
import engineeringVideo from '../data/video/engineeringvideo.webm';

function Label({ number, children }) { return <p className="section-label mono"><span>{number}</span> / {children}</p>; }
function ProjectArt({ index }) {
  return <div className={`work-art work-art-${index}`} aria-hidden="true">
    <div className="art-grid" />
    {index === 0 ? <><div className="map-path" /><span className="map-point point-a"/><span className="map-point point-b"/><div className="terminal-mini"><span>● LIVE LOCATION</span><p>stream:driver-locations</p><b>→ Nearby. Notified.</b></div></> : index === 1 ? <><div className="record"><i/></div><div className="sound-bars">{Array.from({length:28},(_,i)=><i key={i} style={{height: `${15+Math.sin(i*1.3)**2*60}%`}}/>)}</div><span className="art-caption">LESS NOISE. MORE REST.</span></> : <><div className="system-window"><div>↗ {['','','CHECK-IN','EVENT STREAM','ORDER FLOW','OBJECT DETECTION'][index]}</div><p>{['','','[ QR ]','{ event: true }','01 → 02 → 03','[ ■ ]'][index]}</p><span>BUILD / EXPERIMENT / REPEAT</span></div></>}
    <span className="art-index mono">EXP. {String(index+1).padStart(2,'0')}</span>
  </div>;
}
export default function HomePage() {
  return <div className="cinematic-home">
    <Journey/>
    <div className="hero-track">
    <section className="hero" aria-labelledby="hero-name">
      <div className="hero-topline mono"><span>SOFTWARE ENGINEER & TINKERER</span><span>PERSONAL PORTFOLIO / SELECTED WORK</span></div>
      <h1 id="hero-name" className="hero-name">ALL<span className="reversed-e">E</span>N<br className="mobile-name-break"/> THOMSON<span className="name-asterisk">✳</span></h1>
      <div className="hero-orbit" aria-hidden="true"/><span className="hero-cross cross-left" aria-hidden="true">+</span><span className="hero-cross cross-right" aria-hidden="true">+</span>
      <Portrait/>
      <div className="hero-copy"><span className="mono eyebrow">HELLO, I’M ALLEN.</span><h2>I build software.<br/>And what’s next.</h2><p>A software engineer.<br/>A builder. A founder in progress.</p><MagneticLink href="#work" className="primary-cta magnetic">View my work <span aria-hidden="true">↗</span></MagneticLink></div>
      <div className="hero-note"><span className="mono">A LITTLE CURIOSITY.<br/>A LOT OF BUILDING.</span><p>From backend systems<br/>to ideas worth exploring.</p><span className="hero-spark" aria-hidden="true">✳</span></div>
      <div className="hero-bottom mono"><span>01 — THE HUMAN BEHIND THE CODE</span><a href="#about">SCROLL TO EXPLORE <span aria-hidden="true">↓</span></a><span className="hero-coordinate">&lt; ALWAYS IN PROGRESS /&gt;</span></div>
    </section>
    </div>
    <div className="journey-content">
      <section id="about" className="story-panel about-panel">
        <Label number="01">ABOUT / THE WAY I THINK</Label>
        <div className="about-grid"><h2 className="section-display reveal-lines"><span className="reveal-line">Curiosity.</span><span className="reveal-line">Made useful.</span></h2><div className="about-body"><p className="large-copy">Hello! I’m Allen, a software engineer. I love to build and solve problems.</p><p>I enjoy building things. I like to understand how things work, and then use that understanding to make something new. That mindset carries through both my work and the way I approach everyday life: stay curious, keep learning, and make complicated things easier for other people to use.</p><Link to="/about" className="arrow-link">More about me <span>↗</span></Link><p className="small-note">Learn more about how I work across mobile, backend, and developer experience projects.</p></div></div>
        <div className="discipline-strip mono"><span>BACKEND SYSTEMS</span><span>MOBILE EXPERIENCES</span><span>PRODUCT THINKING</span><span>INDEPENDENT BUILDING</span></div>
        <details className="engineering-film"><summary className="mono">A STUDY IN ENGINEERING <span>PLAY ORIGINAL ANIMATION ↗</span></summary><video controls loop muted playsInline preload="none"><source src={engineeringVideo} type="video/webm" /></video></details>
      </section>
      <section id="work" className="story-panel work-panel">
        <div className="section-heading"><div><Label number="02">SELECTED WORK</Label><h2 className="section-display"><span className="reveal-line">Built to do</span><span className="reveal-line">something.</span></h2></div><p>Projects, experiments, and prototypes.<br/>From a thought to a working thing.</p></div>
        <div className="work-grid">{projects.map((project,index)=><article className="work-card" key={project.id}><ProjectArt index={index}/><div className="work-card-copy"><div className="work-card-meta mono"><span>{String(index+1).padStart(2,'0')} / {project.preview.toUpperCase()}</span><span>{project.year}</span></div><h3>{project.title}</h3><p>{project.description}</p>{project.tech && <p className="work-tech mono">{project.tech}</p>}<div className="work-card-action"><span className="mono">EXPLORE PROJECT</span><ProjectLinkIcon project={project}/></div></div></article>)}</div>
        <Link to="/portfolio" className="arrow-link">The complete project library <span>↗</span></Link>
      </section>
      <section id="experience" className="story-panel experience-section"><Label number="03">EXPERIENCE</Label><h2 className="section-display"><span className="reveal-line">Learning by</span><span className="reveal-line">building.</span></h2><ExperienceList items={workExperience}/><Link className="arrow-link" to="/about">Education & more <span>↗</span></Link></section>
      <section id="building" className="story-panel building-panel"><Label number="04">BUILDING / WHAT’S NEXT</Label><div className="building-grid"><div><h2 className="section-display"><span className="reveal-line">An idea is</span><span className="reveal-line">a beginning.</span></h2><p className="large-copy">Builder / Founder-in-progress</p><p>Share ideas, leave feedback, and signal interest in projects you would like to help build.</p></div><div className="venture-stack">{forumTopics.map(topic=><Link to={`/forum/${topic.id}`} className="venture-card" key={topic.id}><span className="mono">OPEN EXPERIMENT <span>↗</span></span><h3>{topic.title}</h3><p>{topic.description}</p><div className="venture-tags mono">{topic.tags.join(' / ')}</div></Link>)}<p className="placeholder-note mono">[ADD: Entrepreneurial focus and next venture]</p><Link to="/forum" className="arrow-link">Join the conversation <span>↗</span></Link></div></div></section>
      <section id="writing" className="story-panel writing-panel"><div className="section-heading"><div><Label number="05">WRITING & RESEARCH</Label><h2 className="section-display"><span className="reveal-line">Thinking</span><span className="reveal-line">out loud.</span></h2></div><Link to="/blog" className="arrow-link">All writing <span>↗</span></Link></div><div className="writing-list">{blogPosts.map((post,index)=><article key={post.id}><span className="mono">{String(index+1).padStart(2,'0')} / {post.date}</span><div><Link to={`/blog/${post.id}`}><h3>{post.title}<span>↗</span></h3></Link><p>{renderInlineLinks(post.excerpt)}</p></div></article>)}</div><div className="research-block"><p className="mono">RESEARCH & PUBLICATIONS</p>{researchPublications.map(paper=><article key={paper.title}><h3>{paper.title}</h3><p className="mono">{paper.date} / {paper.venue} / {paper.location}</p><ul>{paper.highlights.map(h=><li key={h}>{h}</li>)}</ul><a className="arrow-link" href={paper.url} target="_blank" rel="noreferrer">View paper on IEEE Xplore <span>↗</span></a></article>)}</div></section>
      <section id="contact" className="story-panel contact-panel"><Label number="06">CONTACT / A PLACE TO LAND</Label><div className="contact-landing"><div><p className="mono">GOOD THINGS START WITH A CONVERSATION.</p><h2 className="section-display"><span className="reveal-line">What shall</span><span className="reveal-line">we build?</span></h2><p>Reach out for product engineering, backend work, or collaboration on thoughtful software.</p><Link className="primary-cta" to="/contact">Let’s talk <span>↗</span></Link><a className="contact-email mono" href="mailto:allono.at@gmail.com">allono.at@gmail.com ↗</a></div><div className="landing-zone" aria-hidden="true"><span className="landing-rings"/><span className="mono">NEXT STOP / YOUR IDEA</span></div></div></section>
    </div>
  </div>;
}
