import { useState } from 'react';
import './App.css';

export default function App() {
  const [navOpen, setNavOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('andrewalfred769@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const projects = [
    {
      id: 'aura-market',
      type: 'mobile',
      title: 'Aura Market — Mobile Retail Engine',
      role: 'Lead Mobile Engineer',
      period: '2026',
      category: 'React Native / Expo Architecture',
      overview: 'High-concurrency mobile commerce client engineered with optimistic state mutations, sub-16ms layout animations, and offline-first catalog caching modeled after high-scale retail suites.',
      metrics: [
        { label: 'Cart Sync Latency', val: '0ms (Optimistic)' },
        { label: 'Scroll Target', val: '60 FPS Steady' },
        { label: 'Cache Strategy', val: 'Local-First' }
      ],
      decisions: [
        'Implemented Context-based optimistic UI rollbacks to render additions instantaneously before network ACK.',
        'Structured modular file-based navigation utilizing Expo Router with dynamic deep-link param resolution.',
        'Benchmarked FlatList virtual memory pools to sustain smooth rendering across 600+ product catalog trees.'
      ],
      stack: ['React Native', 'Expo Router', 'TypeScript', 'Context API', 'AsyncStorage'],
      github: 'https://github.com/andrewalfred769/andrew-tech-portfolio'
    },
    {
      id: 'pulse-stay',
      type: 'backend',
      title: 'PulseStay — Distributed Reservation Core',
      role: 'Full-Stack Systems Engineer',
      period: '2026',
      category: 'Node.js / Distributed Web Platform',
      overview: 'Fault-tolerant reservation scheduling infrastructure built to eliminate double-booking race conditions during synchronized traffic spikes using atomic transactional locks.',
      metrics: [
        { label: 'P95 Response', val: '< 65ms' },
        { label: 'Auth Validation', val: 'JWT / Salted Hash' },
        { label: 'Throughput', val: 'Cluster Scale' }
      ],
      decisions: [
        'Engineered an Express middleware chain with tokenized session validation and granular CORS security headers.',
        'Eliminated double-allocation collisions by handling date-range availability validation at the database transaction layer.',
        'Constructed a reactive single-page client with custom React hooks for live telemetry and optimistic checkout forms.'
      ],
      stack: ['Node.js', 'Express', 'React.js', 'MongoDB / SQL', 'REST APIs'],
      github: 'https://github.com/andrewalfred769/andrew-tech-portfolio'
    }
  ];

  const filteredProjects = activeTab === 'all' 
    ? projects 
    : projects.filter(p => p.type === activeTab);

  const capabilities = [
    {
      title: 'Mobile Application Engineering',
      desc: 'Building cross-platform mobile apps using React Native and Expo Router. Specialized in smooth gesture handling, native bridge tuning, and offline-capable state synchronization.',
      tools: ['React Native', 'Expo Router', 'Context API', 'Mobile Gestures', 'Local Cache Persistence']
    },
    {
      title: 'Full-Stack Web & Component Systems',
      desc: 'Crafting responsive web applications with React.js, clean hook primitives, modular CSS architecture, and fast client-side performance under heavy UI interactions.',
      tools: ['React.js (v18+)', 'JavaScript (ESNext)', 'Vite Tooling', 'Semantic Layouts', 'CSS Systems']
    },
    {
      title: 'Backend Systems & API Architecture',
      desc: 'Designing scalable RESTful web services in Node.js and Express. Experienced in secure JWT session flows, bcrypt credential hashing, and schema validation.',
      tools: ['Node.js', 'Express.js', 'RESTful Design', 'JWT Security', 'Database Schema Modeling']
    },
    {
      title: 'Production Tooling & Systems',
      desc: 'Streamlined development workflow using Git revision control, Vercel continuous deployment, and native Linux environments for dependable service delivery.',
      tools: ['Git & GitHub CI/CD', 'Vercel Deployment', 'Ubuntu Linux', 'REST API Testing', 'Clean Architecture']
    }
  ];

  return (
    <div className="site-wrapper">
      {/* Precision Top Navigation Bar */}
      <header className="nav-shell">
        <div className="nav-inner">
          <a href="#" className="nav-identity">
            <span className="identity-mark">AA</span>
            <div className="identity-details">
              <span className="identity-name">Andrew Alfred</span>
              <span className="identity-sub">Product & Systems Engineer</span>
            </div>
          </a>

          <button 
            type="button" 
            className="mobile-trigger" 
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle navigation"
          >
            {navOpen ? '✕' : '☰'}
          </button>

          <nav className={`nav-items ${navOpen ? 'nav-expanded' : ''}`}>
            <a href="#about" onClick={() => setNavOpen(false)}>Profile</a>
            <a href="#work" onClick={() => setNavOpen(false)}>Engineered Work</a>
            <a href="#capabilities" onClick={() => setNavOpen(false)}>Capabilities</a>
            <a href="#contact" className="nav-cta" onClick={() => setNavOpen(false)}>
              Get in Touch
            </a>
          </nav>
        </div>
      </header>

      <main className="page-body">
        {/* Crisp Executive Hero */}
        <section className="profile-hero" id="about">
          <div className="availability-chip">
            <span className="live-dot"></span>
            Available for Software Engineering Roles & Select Contracts
          </div>

          <h1 className="hero-statement">
            Architecting reliable full-stack web platforms and fluid React Native applications.
          </h1>

          <p className="hero-manifesto">
            I am a Software Engineer focused on building performant mobile experiences and high-throughput web systems. 
            My approach pairs maintainable, clean code principles with measurable performance—ensuring zero dropped frames on device displays and sub-100ms response cycles on backend pipelines.
          </p>

          <div className="hero-cta-cluster">
            <a href="#work" className="btn btn-solid">
              Inspect Case Studies
            </a>
            <button className="btn btn-subtle" onClick={handleCopyEmail}>
              {copiedEmail ? '✓ andrewalfred769@gmail.com copied' : 'andrewalfred769@gmail.com'}
            </button>
          </div>
        </section>

        {/* Selected Work with Filter Tabs */}
        <section className="work-section" id="work">
          <div className="section-head">
            <div>
              <span className="eyebrow-tag">01 // SELECTED WORK</span>
              <h2 className="section-title">Production Systems & Case Studies</h2>
            </div>

            <div className="tab-switcher">
              <button 
                className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All Architecture
              </button>
              <button 
                className={`tab-btn ${activeTab === 'mobile' ? 'active' : ''}`}
                onClick={() => setActiveTab('mobile')}
              >
                Mobile
              </button>
              <button 
                className={`tab-btn ${activeTab === 'backend' ? 'active' : ''}`}
                onClick={() => setActiveTab('backend')}
              >
                Full-Stack
              </button>
            </div>
          </div>

          <div className="case-studies-container">
            {filteredProjects.map((project) => (
              <article key={project.id} className="case-card">
                <div className="case-header">
                  <div>
                    <span className="case-category">{project.category}</span>
                    <h3 className="case-title">{project.title}</h3>
                  </div>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="case-repo-link"
                  >
                    View Repository ↗
                  </a>
                </div>

                <p className="case-overview">{project.overview}</p>

                {/* Quantitative Metric Callouts */}
                <div className="metrics-row">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="metric-cell">
                      <span className="metric-label">{m.label}</span>
                      <span className="metric-value">{m.val}</span>
                    </div>
                  ))}
                </div>

                {/* Technical Decisions */}
                <div className="decisions-panel">
                  <span className="decisions-label">Technical Implementation Notes</span>
                  <ul className="decisions-list">
                    {project.decisions.map((decision, idx) => (
                      <li key={idx}>{decision}</li>
                    ))}
                  </ul>
                </div>

                <div className="tech-badge-wrap">
                  {project.stack.map((tech, idx) => (
                    <span key={idx} className="tech-badge">{tech}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* Engineering Capabilities */}
        <section className="work-section" id="capabilities">
          <div className="section-head">
            <div>
              <span className="eyebrow-tag">02 // TECHNICAL FOUNDATIONS</span>
              <h2 className="section-title">Core Competencies & Stack</h2>
            </div>
          </div>

          <div className="capabilities-grid">
            {capabilities.map((cap, idx) => (
              <div key={idx} className="cap-card">
                <h3 className="cap-title">{cap.title}</h3>
                <p className="cap-desc">{cap.desc}</p>
                <div className="cap-tools">
                  {cap.tools.map((t, i) => (
                    <span key={i} className="tool-chip">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Direct Contact Banner */}
        <section className="work-section" id="contact">
          <div className="contact-panel">
            <span className="eyebrow-tag">03 // CONTACT</span>
            <h2 className="contact-title">Let's build something durable.</h2>
            <p className="contact-text">
              I am open to full-time engineering opportunities, contract technical leadership, and performance audits. 
              Let's connect regarding your software stack and timeline.
            </p>

            <div className="contact-actions">
              <a href="mailto:andrewalfred769@gmail.com" className="btn btn-solid">
                Send Direct Email
              </a>
              <a 
                href="https://github.com/andrewalfred769" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-subtle"
              >
                Inspect GitHub Profile ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="site-foot">
        <div className="foot-inner">
          <p>© 2026 Andrew Alfred. Developed with React.js & Vite.</p>
          <div className="foot-links">
            <a href="https://github.com/andrewalfred769" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:andrewalfred769@gmail.com">andrewalfred769@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}