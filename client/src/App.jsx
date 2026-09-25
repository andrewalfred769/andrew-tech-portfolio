import { useState, useEffect, useRef } from 'react';
import './App.css';

export default function App() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeSandboxTab, setActiveSandboxTab] = useState('mobile');
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Aura Runner Pro', price: 145, qty: 1 }
  ]);
  const [apiLogs, setApiLogs] = useState([
    { time: '12:00:04', event: 'POST /api/v1/cart/sync', status: 200, latency: '42ms' }
  ]);

  // Interactive Background Canvas Ref
  const canvasRef = useRef(null);

  // 3D Hex Logo Tilt state
  const [logoTilt, setLogoTilt] = useState({ x: 0, y: 0 });

  // Handle Copy Email
  const handleCopyEmail = () => {
    navigator.clipboard.writeText('andrewalfred769@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Add Item in Interactive Mobile Simulator
  const handleAddToCart = (productName, price) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.name === productName);
      if (existing) {
        return prev.map(item => item.name === productName ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { id: Date.now(), name: productName, price, qty: 1 }];
    });

    const now = new Date();
    const timeStr = `${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    setApiLogs(prev => [
      { time: timeStr, event: `POST /api/cart/mutate [${productName}]`, status: 200, latency: `${Math.floor(Math.random() * 25) + 35}ms` },
      ...prev.slice(0, 3)
    ]);
  };

  // Canvas Interactive Wallpaper Logic
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    const particleCount = Math.min(Math.floor(width / 22), 48);
    const particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.5 + 1
      });
    }

    let mouse = { x: -1000, y: -1000, radius: 140 };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Calculate subtle 3D tilt for the hero logo
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2.5;
      const tiltX = (e.clientY - centerY) / 35;
      const tiltY = -(e.clientX - centerX) / 35;
      setLogoTilt({ x: Math.max(-15, Math.min(15, tiltX)), y: Math.max(-15, Math.min(15, tiltY)) });
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw and update particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse repelling / connecting
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          p.x -= (dx / dist) * force * 1.5;
          p.y -= (dy / dist) * force * 1.5;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(56, 189, 248, 0.35)';
        ctx.fill();

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dist2 = Math.hypot(p.x - p2.x, p.y - p2.y);
          if (dist2 < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(56, 189, 248, ${0.15 * (1 - dist2 / 110)})`;
            ctx.lineWidth = 0.7;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const totalCartValue = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="aura-site">
      {/* Interactive Background Canvas */}
      <canvas ref={canvasRef} className="interactive-wallpaper"></canvas>

      {/* Floating Glass Pill Navbar */}
      <header className="floating-nav-wrap">
        <nav className="floating-nav">
          <a href="#" className="nav-brand">
            <span className="brand-dot"></span> Andrew Alfred
          </a>
          
          <div className="nav-links">
            <a href="#work">Portfolio</a>
            <a href="#interactive-sandbox">Live Sandbox</a>
            <a href="#services">Services</a>
            <a href="#contact">Contact</a>
          </div>

          <a href="#contact" className="nav-hire-btn">
            Hire Me <span className="btn-arrow">→</span>
          </a>
        </nav>
      </header>

      {/* Main Interactive Hero Section */}
      <main className="aura-content">
        <section className="hero-viewport" id="about">
          <div className="badge-pill">
            Full-Stack Software Engineer &amp; Mobile Architect
          </div>

          {/* Interactive 3D Hexagon Logo with Hover Tilt */}
          <div 
            className="hero-logo-stage"
            style={{
              transform: `perspective(600px) rotateX(${logoTilt.x}deg) rotateY(${logoTilt.y}deg)`
            }}
          >
            <div className="hex-logo-frame">
              <svg className="hex-svg" viewBox="0 0 100 100" fill="none">
                <polygon 
                  points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25" 
                  stroke="rgba(56, 189, 248, 0.45)" 
                  strokeWidth="2.5" 
                  fill="rgba(10, 15, 26, 0.85)"
                />
                <polygon 
                  points="50 12, 85 30, 85 70, 50 88, 15 70, 15 30" 
                  stroke="rgba(255, 255, 255, 0.15)" 
                  strokeWidth="1"
                />
                <text 
                  x="50" 
                  y="58" 
                  textAnchor="middle" 
                  fill="#ffffff" 
                  fontSize="24" 
                  fontFamily="'JetBrains Mono', monospace" 
                  fontWeight="800" 
                  letterSpacing="1"
                >
                  AA
                </text>
              </svg>
              <div className="hex-ambient-glow"></div>
            </div>
            <span className="interactive-hint">✦ Interactive Canvas Responsive</span>
          </div>

          {/* Clean Aura Headline */}
          <h1 className="hero-display-title">
            Crafting performant mobile &amp; web experiences
          </h1>

          <p className="hero-subline">
            Specializing in cross-platform <strong>React Native</strong> mobile applications, 
            responsive <strong>React</strong> interfaces, and resilient <strong>Node.js</strong> backends. 
            Turning complex architectures into seamless, high-speed digital products.
          </p>

          <div className="hero-actions-row">
            <a href="#interactive-sandbox" className="btn-glow-pill">
              Explore Live Sandbox ↓
            </a>
            <button className="btn-ghost-pill" onClick={handleCopyEmail}>
              {copiedEmail ? '✓ andrewalfred769@gmail.com copied' : 'Copy Email Address'}
            </button>
          </div>

          {/* Micro-Stats Bar */}
          <div className="micro-stats-bar">
            <div className="stat-pill-item">
              <span className="stat-ico">⏱</span>
              <span>2+ Years Experience</span>
            </div>
            <div className="stat-pill-item">
              <span className="stat-ico">💼</span>
              <span>Production Systems</span>
            </div>
            <div className="stat-pill-item">
              <span className="stat-ico">⚡</span>
              <span>60 FPS &amp; &lt;85ms SLA</span>
            </div>
          </div>
        </section>

        {/* ========================================================
            TASTE-TESTED INTERACTIVE ENGINEERING SANDBOX
            ======================================================== */}
        <section className="sandbox-section" id="interactive-sandbox">
          <div className="section-header-center">
            <span className="section-eyebrow">INTERACTIVE LAB</span>
            <h2 className="section-headline">Tactile Architecture Sandbox</h2>
            <p className="section-subtext">
              Interact with the live client-side state machine below. Click items to simulate real-time optimistic updates and inspect concurrent API payloads.
            </p>
          </div>

          <div className="sandbox-console-frame">
            <div className="sandbox-nav-header">
              <div className="sandbox-tab-group">
                <button 
                  className={`sb-tab ${activeSandboxTab === 'mobile' ? 'active' : ''}`}
                  onClick={() => setActiveSandboxTab('mobile')}
                >
                  📱 Mobile Simulator (React Native State)
                </button>
                <button 
                  className={`sb-tab ${activeSandboxTab === 'telemetry' ? 'active' : ''}`}
                  onClick={() => setActiveSandboxTab('telemetry')}
                >
                  ⚡ Live API Telemetry &amp; Payloads
                </button>
              </div>
              <div className="sandbox-live-indicator">
                <span className="live-pulse"></span> SYSTEM HEALTHY
              </div>
            </div>

            <div className="sandbox-workspace">
              {activeSandboxTab === 'mobile' ? (
                <div className="mobile-sim-view">
                  <div className="sim-device">
                    <div className="sim-device-header">
                      <span className="sim-brand">Aura Market v1.0</span>
                      <span className="sim-cart-count">Bag: ${totalCartValue}.00</span>
                    </div>

                    <div className="sim-catalog-grid">
                      <div className="catalog-item">
                        <span className="cat-icon">👟</span>
                        <div className="cat-info">
                          <span className="cat-name">Air Nitro v2</span>
                          <span className="cat-price">$145.00</span>
                        </div>
                        <button 
                          className="cat-add-btn"
                          onClick={() => handleAddToCart('Air Nitro v2', 145)}
                        >
                          + Add
                        </button>
                      </div>

                      <div className="catalog-item">
                        <span className="cat-icon">🎧</span>
                        <div className="cat-info">
                          <span className="cat-name">Pulse ANC Buds</span>
                          <span className="cat-price">$189.00</span>
                        </div>
                        <button 
                          className="cat-add-btn"
                          onClick={() => handleAddToCart('Pulse ANC Buds', 189)}
                        >
                          + Add
                        </button>
                      </div>

                      <div className="catalog-item">
                        <span className="cat-icon">⌚</span>
                        <div className="cat-info">
                          <span className="cat-name">Onyx Chrono HR</span>
                          <span className="cat-price">$260.00</span>
                        </div>
                        <button 
                          className="cat-add-btn"
                          onClick={() => handleAddToCart('Onyx Chrono HR', 260)}
                        >
                          + Add
                        </button>
                      </div>
                    </div>

                    <div className="sim-status-banner">
                      <span>✓ State Sync: Local-First Async Storage (0ms perceived lag)</span>
                    </div>
                  </div>

                  <div className="sim-details-panel">
                    <h4 className="sim-h4">Optimistic State Pipeline</h4>
                    <p className="sim-p">
                      In high-volume mobile e-commerce, waiting for server confirmation introduces perceptible latency. 
                      This simulator demonstrates optimistic Context API mutations that update UI immediately before background network reconciliation.
                    </p>
                    <div className="sim-metric-chips">
                      <div className="s-chip"><span>Frame Budget</span><strong>16.6ms</strong></div>
                      <div className="s-chip"><span>Items in Cache</span><strong>{cartItems.reduce((a, b) => a + b.qty, 0)}</strong></div>
                      <div className="s-chip"><span>Storage Engine</span><strong>AsyncStorage</strong></div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="telemetry-view">
                  <div className="telemetry-log-pane">
                    <span className="telemetry-pane-title">Real-Time Backend Dispatch Logs</span>
                    <div className="logs-stream">
                      {apiLogs.map((log, idx) => (
                        <div key={idx} className="log-row">
                          <span className="log-t">{log.time}</span>
                          <span className="log-e">{log.event}</span>
                          <span className="log-s">{log.status} OK</span>
                          <span className="log-l">{log.latency}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="telemetry-payload-pane">
                    <span className="telemetry-pane-title">Active State JSON Payload</span>
                    <pre className="payload-json">
                      {JSON.stringify({
                        session: "usr_sess_prod_2026",
                        currency: "USD",
                        cart: cartItems,
                        total_amount: totalCartValue,
                        security_hash: "sha256_b79c3f..."
                      }, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Selected Works Portfolio */}
        <section className="portfolio-section" id="work">
          <div className="section-header-center">
            <span className="section-eyebrow">SELECTED WORKS</span>
            <h2 className="section-headline">Engineered Products &amp; Architecture</h2>
          </div>

          <div className="projects-collection">
            <article className="cinematic-project-card">
              <div className="card-top-bar">
                <span className="card-tag">MOBILE APPS</span>
                <a 
                  href="https://github.com/andrewalfred769/andrew-tech-portfolio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card-github-link"
                >
                  View Code on GitHub ↗
                </a>
              </div>

              <h3 className="project-heading">Aura Market — High-Volume Retail App</h3>
              <span className="project-category-sub">React Native // Expo Router // Node.js</span>
              <p className="project-summary-text">
                A cross-platform mobile retail engine architected for sub-16ms screen transitions, local-first cache persistence, and instant optimistic shopping cart mutations modeled after modern commercial apps.
              </p>

              <div className="metrics-shelf">
                <div className="metric-box">
                  <span className="m-label">Frame Rate</span>
                  <span className="m-value">60 FPS</span>
                </div>
                <div className="metric-box">
                  <span className="m-label">Cart Latency</span>
                  <span className="m-value">0ms (Optimistic)</span>
                </div>
                <div className="metric-box">
                  <span className="m-label">Architecture</span>
                  <span className="m-value">Context &amp; Offline Sync</span>
                </div>
              </div>

              <div className="stack-chips">
                <span className="chip">React Native</span>
                <span className="chip">Expo Router</span>
                <span className="chip">TypeScript</span>
                <span className="chip">AsyncStorage</span>
                <span className="chip">REST API</span>
              </div>
            </article>

            <article className="cinematic-project-card">
              <div className="card-top-bar">
                <span className="card-tag">BACKEND &amp; WEB</span>
                <a 
                  href="https://github.com/andrewalfred769/andrew-tech-portfolio" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="card-github-link"
                >
                  View Code on GitHub ↗
                </a>
              </div>

              <h3 className="project-heading">PulseStay — Distributed Booking Hub</h3>
              <span className="project-category-sub">React.js // Node.js // Express // Microservices</span>
              <p className="project-summary-text">
                Fault-tolerant reservation scheduling infrastructure built to eliminate double-booking race conditions during synchronized traffic spikes using atomic transactional locks and secure JWT authentication.
              </p>

              <div className="metrics-shelf">
                <div className="metric-box">
                  <span className="m-label">P95 Latency</span>
                  <span className="m-value">&lt; 65ms</span>
                </div>
                <div className="metric-box">
                  <span className="m-label">Auth Pipeline</span>
                  <span className="m-value">JWT / Bcrypt</span>
                </div>
                <div className="metric-box">
                  <span className="m-label">Data Integrity</span>
                  <span className="m-value">Transactional Locks</span>
                </div>
              </div>

              <div className="stack-chips">
                <span className="chip">Node.js</span>
                <span className="chip">Express</span>
                <span className="chip">React.js</span>
                <span className="chip">MongoDB / SQL</span>
                <span className="chip">REST APIs</span>
              </div>
            </article>
          </div>
        </section>

        {/* Services & Capabilities */}
        <section className="services-section" id="services">
          <div className="section-header-center">
            <span className="section-eyebrow">SERVICES</span>
            <h2 className="section-headline">What I Bring to Your Team</h2>
          </div>

          <div className="services-grid">
            <div className="service-card">
              <span className="svc-num">01</span>
              <h3 className="svc-title">Mobile App Engineering</h3>
              <p className="svc-desc">
                Developing fluid iOS &amp; Android apps with React Native &amp; Expo. Fluid gestures, tactile micro-interactions, native module integrations, and resilient offline-first state.
              </p>
            </div>
            <div className="service-card">
              <span className="svc-num">02</span>
              <h3 className="svc-title">Full-Stack Web Systems</h3>
              <p className="svc-desc">
                Building responsive single-page applications in React and Vite. Focused on crisp component systems, modular styling, and high-performance client rendering.
              </p>
            </div>
            <div className="service-card">
              <span className="svc-num">03</span>
              <h3 className="svc-title">REST APIs &amp; Security</h3>
              <p className="svc-desc">
                Architecting scalable backend services with Node.js and Express. Implementing secure JWT sessions, rate limiting, and bulletproof database transactions.
              </p>
            </div>
            <div className="service-card">
              <span className="svc-num">04</span>
              <h3 className="svc-title">CI/CD &amp; Cloud Delivery</h3>
              <p className="svc-desc">
                Automating build pipelines with Git, GitHub Actions, and Vercel for continuous deployment. Proficient in Ubuntu Linux command environments.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="cta-section" id="contact">
          <div className="cta-glass-card">
            <span className="section-eyebrow">GET IN TOUCH</span>
            <h2 className="cta-headline">Let’s build your next high-impact product.</h2>
            <p className="cta-subtext">
              Available for full-time software engineering positions, contract roles, 
              and mobile development projects. Let's discuss your timeline and vision.
            </p>

            <div className="cta-btn-group">
              <a href="mailto:andrewalfred769@gmail.com" className="btn-glow-pill">
                Send Direct Email →
              </a>
              <a 
                href="https://github.com/andrewalfred769" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn-ghost-pill"
              >
                Inspect GitHub Profile ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="aura-site-footer">
        <div className="footer-inner">
          <p>© 2026 Andrew Alfred. Engineered with React &amp; Vite.</p>
          <div className="footer-links-row">
            <a href="https://github.com/andrewalfred769" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a href="mailto:andrewalfred769@gmail.com">andrewalfred769@gmail.com</a>
          </div>
        </div>
      </footer>
    </div>
  );
}