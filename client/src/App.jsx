import { useState, useEffect, useRef, useCallback } from 'react';
import './App.css';

// Scalable Vector Logo for ANDREW TECH.
function Logo({ className = "brand-icon", size = 28 }) {
  return (
    <svg 
      className={className} 
      width={size} 
      height={size} 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#6366f1" />
        </linearGradient>
      </defs>
      <polygon 
        points="50,5 92,27.5 92,72.5 50,95 8,72.5 8,27.5" 
        stroke="url(#cyberGrad)" 
        strokeWidth="6" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
      <path 
        d="M50 25 L72 75 H60 L54 60 H46 L40 75 H28 L50 25 Z" 
        fill="url(#cyberGrad)" 
      />
      <circle cx="50" cy="46" r="3.5" fill="#ffffff" />
    </svg>
  );
}

// Low-overhead background watermark
function GlassyLogoBackground() {
  return (
    <div className="glassy-logo-backdrop" aria-hidden="true">
      <div className="glass-logo-shape glass-logo-1">
        <Logo size={340} />
      </div>
      <div className="glass-logo-shape glass-logo-2">
        <Logo size={260} />
      </div>
    </div>
  );
}

// ==========================================
// FEATURE 1: INTERACTIVE HACKER TERMINAL CLI
// ==========================================
function HackerTerminalModal({ isOpen, onClose }) {
  const [history, setHistory] = useState([
    { type: 'sys', text: 'ANDREW TECH OS v4.2.0 [Production Shell]' },
    { type: 'sys', text: 'Type "help" to review executable routines.' }
  ]);
  const [inputVal, setInputVal] = useState('');
  const bottomRef = useRef(null);

  useEffect(() => {
    if (isOpen) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history, isOpen]);

  const handleCommand = (e) => {
    if (e.key !== 'Enter') return;
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'cmd', text: `andrew@terminal:~$ ${cmd}` }];
    const lower = cmd.toLowerCase();

    if (lower === 'help') {
      newHistory.push({
        type: 'resp',
        text: `AVAILABLE ROUTINES:
  help            - List registered shell commands
  about           - Engineering bio & specializations
  skills          - Architectural toolkit breakdown
  projects        - Active production case studies
  clear           - Purge terminal buffer
  exit            - Terminate terminal session`
      });
    } else if (lower === 'about') {
      newHistory.push({
        type: 'resp',
        text: 'Andrew Tech: Full-Stack Engineer focused on scalable Node.js microservices, interactive React web platforms, and 60 FPS React Native applications.'
      });
    } else if (lower === 'skills') {
      newHistory.push({
        type: 'resp',
        text: `CORE STACK:
  [Frontend] React.js, Vite, HTML5 Canvas, Responsive CSS
  [Mobile]   React Native, Expo Router, Reanimated
  [Backend]  Node.js, Express (v5), REST APIs, JWT, Bcrypt
  [Data]     PostgreSQL, MongoDB, Redis, LocalPersistence`
      });
    } else if (lower === 'projects') {
      newHistory.push({
        type: 'resp',
        text: `1. Aura Market: React Native offline-first commerce suite.
2. PulseStay Engine: Node.js concurrent booking API with sub-85ms latency.`
      });
    } else if (lower === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    } else if (lower === 'exit') {
      onClose();
      return;
    } else {
      newHistory.push({
        type: 'err',
        text: `Command not recognized: "${cmd}". Type "help" for executable commands.`
      });
    }

    setHistory(newHistory);
    setInputVal('');
  };

  if (!isOpen) return null;

  return (
    <div className="terminal-overlay" onClick={onClose}>
      <div className="terminal-window" onClick={(e) => e.stopPropagation()}>
        <div className="terminal-topbar">
          <div className="term-dots">
            <span className="tdot red" onClick={onClose}></span>
            <span className="tdot yellow"></span>
            <span className="tdot green"></span>
          </div>
          <div className="term-title">andrew@linux-core: ~/portfolio_cli</div>
          <button className="term-close" onClick={onClose}>✕</button>
        </div>
        <div className="terminal-body">
          {history.map((line, i) => (
            <div key={i} className={`term-line ${line.type}`}>
              <pre>{line.text}</pre>
            </div>
          ))}
          <div className="term-input-row">
            <span className="term-prompt">andrew@terminal:~$</span>
            <input 
              autoFocus
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleCommand}
              placeholder="type 'help'..."
            />
          </div>
          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FEATURE 2: INTERACTIVE MOBILE PHONE SANDBOX
// ==========================================
function InteractiveMobileDevice() {
  const [activeTab, setActiveTab] = useState('feed');
  const [cart, setCart] = useState(['Air Boost 2.0']);
  const [selectedProduct, setSelectedProduct] = useState('CyberBass Pro');

  const addToCart = (item) => {
    setCart((prev) => [...prev, item]);
  };

  return (
    <div className="interactive-phone-frame">
      <div className="phone-screen-shell">
        <div className="phone-notch-bar">
          <div className="speaker-slot"></div>
        </div>

        <div className="phone-app-nav">
          <span className="app-brand" onClick={() => setActiveTab('feed')}>
            ⚡ Aura Market
          </span>
          <button 
            className="phone-cart-btn"
            onClick={() => setActiveTab('cart')}
          >
            🛒 <span className="cart-chip">{cart.length}</span>
          </button>
        </div>

        <div className="phone-tab-content">
          {activeTab === 'feed' && (
            <div className="screen-feed">
              <div className="feed-banner">
                <span className="b-tag">REACT NATIVE NATIVE THREAD</span>
                <strong>Interactive Catalog</strong>
              </div>
              <div className="catalog-list">
                <div className="catalog-item">
                  <div className="item-icon">👟</div>
                  <div className="item-info">
                    <h4>Air Boost 2.0</h4>
                    <span className="item-price">$129.00</span>
                  </div>
                  <button 
                    className="add-chip-btn" 
                    onClick={() => addToCart('Air Boost 2.0')}
                  >
                    + Add
                  </button>
                </div>

                <div className="catalog-item">
                  <div className="item-icon">🎧</div>
                  <div className="item-info">
                    <h4>CyberBass Pro</h4>
                    <span className="item-price">$249.99</span>
                  </div>
                  <button 
                    className="add-chip-btn" 
                    onClick={() => {
                      setSelectedProduct('CyberBass Pro');
                      setActiveTab('detail');
                    }}
                  >
                    Inspect
                  </button>
                </div>

                <div className="catalog-item">
                  <div className="item-icon">⌚</div>
                  <div className="item-info">
                    <h4>Pulse Watch v4</h4>
                    <span className="item-price">$199.50</span>
                  </div>
                  <button 
                    className="add-chip-btn" 
                    onClick={() => addToCart('Pulse Watch v4')}
                  >
                    + Add
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'detail' && (
            <div className="screen-detail">
              <button className="back-link" onClick={() => setActiveTab('feed')}>
                ← Back to Catalog
              </button>
              <div className="detail-preview-box">
                <span className="big-emoji">🎧</span>
                <span className="detail-badge">60 FPS Gesture Sheet</span>
              </div>
              <h3>{selectedProduct}</h3>
              <p className="detail-copy">
                Lossless audio profile with spatial noise cancellation. Powered by native audio bridges.
              </p>
              <div className="detail-price-row">
                <span className="price-tag">$249.99</span>
                <button 
                  className="buy-now-btn" 
                  onClick={() => {
                    addToCart(selectedProduct);
                    setActiveTab('cart');
                  }}
                >
                  ⚡ Add to Bag
                </button>
              </div>
            </div>
          )}

          {activeTab === 'cart' && (
            <div className="screen-cart">
              <div className="cart-header">
                <h3>Bag ({cart.length})</h3>
                <button className="clear-cart" onClick={() => setCart([])}>Clear</button>
              </div>
              <div className="cart-items-scroll">
                {cart.length === 0 ? (
                  <p className="empty-cart-msg">Your bag is empty. Tap feed items to add!</p>
                ) : (
                  cart.map((item, idx) => (
                    <div key={idx} className="cart-line-item">
                      <span>{item}</span>
                      <span className="price-mini">$129+</span>
                    </div>
                  ))
                )}
              </div>
              <div className="cart-total-bar">
                <span>Optimistic Total:</span>
                <strong>${cart.length * 140}</strong>
              </div>
              <button 
                className="checkout-sheet-btn" 
                disabled={cart.length === 0}
                onClick={() => {
                  alert(`Transaction simulated! Dispatched ${cart.length} item(s) through optimistic cache.`);
                }}
              >
                 Pay via Native Sheet
              </button>
            </div>
          )}
        </div>

        <div className="phone-bottom-tabs">
          <button 
            className={`tab-btn ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            🏠 Feed
          </button>
          <button 
            className={`tab-btn ${activeTab === 'detail' ? 'active' : ''}`}
            onClick={() => setActiveTab('detail')}
          >
            🔍 Details
          </button>
          <button 
            className={`tab-btn ${activeTab === 'cart' ? 'active' : ''}`}
            onClick={() => setActiveTab('cart')}
          >
            🛒 Cart ({cart.length})
          </button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FEATURE 3: ARCHITECTURE TIME MACHINE SLIDER
// ==========================================
function ArchitectureTimeMachine() {
  const [phase, setPhase] = useState(2);

  const phases = [
    {
      version: 'v0.1 Prototype',
      status: 'Initial Concept & Discovery',
      latency: '240ms',
      scalability: 'Single Node / Local DB',
      stack: 'Express static server + SQLite local cache',
      desc: 'Rapid monolithic MVP engineered to validate shopping cart business logic and client interaction patterns.'
    },
    {
      version: 'v0.5 Modular MVC',
      status: 'Decoupled API & Mobile Client',
      latency: '110ms',
      scalability: 'Load-Balanced Container',
      stack: 'Express API + JWT Auth + MongoDB Cluster + React Native Client',
      desc: 'Decoupled client-server architecture introducing robust token authentication, schema sanitation, and responsive UI caching.'
    },
    {
      version: 'v1.0 Production Scale',
      status: 'High-Concurrency Distributed Cloud',
      latency: '< 42ms',
      scalability: 'Distributed Microservices / Multi-region',
      stack: 'Node.js Express + Redis In-Memory Cache + Cloud Database + CDN Assets',
      desc: 'Production-ready platform architected for race-condition-free reservations, automatic cache invalidation, and sub-85ms SLA response times.'
    }
  ];

  const current = phases[phase];

  return (
    <div className="time-machine-card">
      <div className="tm-top">
        <span className="tm-tag">// ARCHITECTURE EVOLUTION TIME-MACHINE</span>
        <div className="tm-slider-control">
          <label>Version Stage:</label>
          <input 
            type="range" 
            min="0" 
            max="2" 
            value={phase} 
            onChange={(e) => setPhase(Number(e.target.value))}
          />
        </div>
      </div>

      <div className="tm-display">
        <div className="tm-header-row">
          <h3>{current.version}</h3>
          <span className="tm-status-pill">{current.status}</span>
        </div>
        <p className="tm-desc">{current.desc}</p>
        <div className="tm-specs-grid">
          <div className="tm-spec">
            <span className="label">AVG API LATENCY</span>
            <span className="val text-cyan">{current.latency}</span>
          </div>
          <div className="tm-spec">
            <span className="label">CAPACITY SCALE</span>
            <span className="val text-green">{current.scalability}</span>
          </div>
          <div className="tm-spec wide">
            <span className="label">DEPLOYED ARCHITECTURE</span>
            <span className="val">{current.stack}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// FEATURE 4: FLOATING AI PROJECT ASSISTANT WIDGET
// ==========================================
function FloatingAIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hey! I am Andrew’s AI Assistant. How can I assist your evaluation today?' }
  ]);

  const questions = [
    { q: 'Is Andrew open to hiring?', a: 'Yes! Andrew is available for Senior/Lead Full-Stack and Mobile engineering roles, contract engagements, and architectural consulting.' },
    { q: 'What is his core tech stack?', a: 'Andrew specializes in React Native (Expo Router), Node.js / Express backends, responsive React web platforms, and interactive canvas graphics.' },
    { q: 'How is performance guaranteed?', a: 'Through asynchronous event loop tuning, sub-85ms API routing, optimistic mobile UI caching, and 60 FPS gesture-driven animations.' }
  ];

  const handleAsk = (item) => {
    setMessages(prev => [
      ...prev,
      { from: 'user', text: item.q },
      { from: 'bot', text: item.a }
    ]);
  };

  return (
    <div className="ai-widget-wrapper">
      {open && (
        <div className="ai-chat-window">
          <div className="ai-chat-header">
            <div className="ai-brand">
              <span className="ai-pip"></span>
              ANDREW AI AGENT
            </div>
            <button className="ai-close" onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="ai-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`ai-msg ${m.from}`}>
                <span>{m.text}</span>
              </div>
            ))}
          </div>
          <div className="ai-quick-prompts">
            <span className="prompt-label">Quick Inquiries:</span>
            {questions.map((q, i) => (
              <button key={i} className="quick-btn" onClick={() => handleAsk(q)}>
                {q.q}
              </button>
            ))}
          </div>
        </div>
      )}
      <button 
        className="ai-toggle-bubble" 
        onClick={() => setOpen(!open)}
      >
        💬 <span>Ask Andrew AI</span>
      </button>
    </div>
  );
}

// ==========================================
// CYBER SNAKE ARCADE GAME OVERLAY
// ==========================================
function CyberSnakeModal({ isOpen, onClose }) {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [gameSpeed, setGameSpeed] = useState(200);

  const GRID_SIZE = 20;
  const CELL_COUNT = 18;

  const snakeRef = useRef([
    { x: 8, y: 9 },
    { x: 7, y: 9 },
    { x: 6, y: 9 }
  ]);
  const dirRef = useRef({ x: 1, y: 0 });
  const nextDirRef = useRef({ x: 1, y: 0 });
  const foodRef = useRef({ x: 13, y: 9 });

  const spawnFood = useCallback(() => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * CELL_COUNT),
        y: Math.floor(Math.random() * CELL_COUNT),
      };
      const onSnake = snakeRef.current.some(s => s.x === newFood.x && s.y === newFood.y);
      if (!onSnake) break;
    }
    foodRef.current = newFood;
  }, [CELL_COUNT]);

  const changeDirection = useCallback((x, y) => {
    if (dirRef.current.x + x === 0 && dirRef.current.y + y === 0) return;
    nextDirRef.current = { x, y };
  }, []);

  const startGame = () => {
    snakeRef.current = [
      { x: 8, y: 9 },
      { x: 7, y: 9 },
      { x: 6, y: 9 }
    ];
    dirRef.current = { x: 1, y: 0 };
    nextDirRef.current = { x: 1, y: 0 };
    setScore(0);
    spawnFood();
    setGameState('playing');
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (['ArrowUp', 'KeyW'].includes(e.code)) {
        e.preventDefault();
        changeDirection(0, -1);
      } else if (['ArrowDown', 'KeyS'].includes(e.code)) {
        e.preventDefault();
        changeDirection(0, 1);
      } else if (['ArrowLeft', 'KeyA'].includes(e.code)) {
        e.preventDefault();
        changeDirection(-1, 0);
      } else if (['ArrowRight', 'KeyD'].includes(e.code)) {
        e.preventDefault();
        changeDirection(1, 0);
      } else if (e.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, changeDirection, onClose]);

  useEffect(() => {
    if (!isOpen || gameState !== 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const interval = setInterval(() => {
      dirRef.current = nextDirRef.current;
      const head = {
        x: snakeRef.current[0].x + dirRef.current.x,
        y: snakeRef.current[0].y + dirRef.current.y,
      };

      if (head.x < 0 || head.x >= CELL_COUNT || head.y < 0 || head.y >= CELL_COUNT) {
        setGameState('gameover');
        return;
      }

      if (snakeRef.current.some(s => s.x === head.x && s.y === head.y)) {
        setGameState('gameover');
        return;
      }

      const newSnake = [head, ...snakeRef.current];

      if (head.x === foodRef.current.x && head.y === foodRef.current.y) {
        setScore(prev => {
          const next = prev + 10;
          setHighScore(h => Math.max(h, next));
          return next;
        });
        spawnFood();
      } else {
        newSnake.pop();
      }

      snakeRef.current = newSnake;

      ctx.fillStyle = '#060911';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      for (let i = 0; i <= CELL_COUNT; i++) {
        ctx.beginPath();
        ctx.moveTo(i * GRID_SIZE, 0);
        ctx.lineTo(i * GRID_SIZE, canvas.height);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(0, i * GRID_SIZE);
        ctx.lineTo(canvas.width, i * GRID_SIZE);
        ctx.stroke();
      }

      ctx.shadowColor = '#ec4899';
      ctx.shadowBlur = 14;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(
        foodRef.current.x * GRID_SIZE + GRID_SIZE / 2,
        foodRef.current.y * GRID_SIZE + GRID_SIZE / 2,
        GRID_SIZE / 2.6,
        0,
        Math.PI * 2
      );
      ctx.fill();

      snakeRef.current.forEach((seg, idx) => {
        if (idx === 0) {
          ctx.shadowColor = '#06b6d4';
          ctx.shadowBlur = 12;
          ctx.fillStyle = '#38bdf8';
        } else {
          ctx.shadowColor = '#6366f1';
          ctx.shadowBlur = 6;
          ctx.fillStyle = '#6366f1';
        }

        ctx.fillRect(
          seg.x * GRID_SIZE + 1.5,
          seg.y * GRID_SIZE + 1.5,
          GRID_SIZE - 3,
          GRID_SIZE - 3
        );
      });

      ctx.shadowBlur = 0;
    }, gameSpeed);

    return () => clearInterval(interval);
  }, [isOpen, gameState, spawnFood, CELL_COUNT, gameSpeed]);

  if (!isOpen) return null;

  return (
    <div className="arcade-modal-backdrop">
      <div className="arcade-modal-box">
        <div className="arcade-header">
          <div className="arcade-title">
            <span className="arcade-pip"></span>
            CYBER SERPENT // V1.0
          </div>
          <button className="arcade-close" onClick={onClose}>✕</button>
        </div>

        <div className="arcade-speed-selector">
          <span className="speed-lbl">SPEED:</span>
          <button 
            type="button"
            className={`speed-btn ${gameSpeed === 220 ? 'active' : ''}`}
            onClick={() => setGameSpeed(220)}
          >
            🐢 Chill
          </button>
          <button 
            type="button"
            className={`speed-btn ${gameSpeed === 180 ? 'active' : ''}`}
            onClick={() => setGameSpeed(180)}
          >
            ⚡ Normal
          </button>
          <button 
            type="button"
            className={`speed-btn ${gameSpeed === 130 ? 'active' : ''}`}
            onClick={() => setGameSpeed(130)}
          >
            🔥 Fast
          </button>
        </div>

        <div className="arcade-scoreboard">
          <div className="score-stat">
            <span className="lbl">SCORE:</span>
            <span className="val">{score}</span>
          </div>
          <div className="score-stat">
            <span className="lbl">HIGH:</span>
            <span className="val cyan">{highScore}</span>
          </div>
        </div>

        <div className="canvas-wrapper">
          <canvas 
            ref={canvasRef} 
            width={CELL_COUNT * GRID_SIZE} 
            height={CELL_COUNT * GRID_SIZE}
            className="snake-canvas"
          />

          {gameState === 'idle' && (
            <div className="arcade-splash-overlay">
              <Logo size={56} className="arcade-splash-logo" />
              <h3>CYBER SERPENT</h3>
              <p>Navigate the neon data flow. Collect nodes to scale system buffer.</p>
              <button className="btn btn-primary" onClick={startGame}>
                ⚡ START GAME
              </button>
            </div>
          )}

          {gameState === 'gameover' && (
            <div className="arcade-splash-overlay gameover">
              <h3 className="danger-text">CRITICAL BREACH</h3>
              <p>Collision detected. Final payload size: <strong>{score}</strong> pts.</p>
              <button className="btn btn-primary danger-btn" onClick={startGame}>
                ↺ REBOOT SYSTEM
              </button>
            </div>
          )}
        </div>

        <div className="mobile-dpad">
          <div className="dpad-row">
            <button className="dpad-btn" onClick={() => changeDirection(0, -1)}>▲</button>
          </div>
          <div className="dpad-row">
            <button className="dpad-btn" onClick={() => changeDirection(-1, 0)}>◀</button>
            <div className="dpad-center"></div>
            <button className="dpad-btn" onClick={() => changeDirection(1, 0)}>▶</button>
          </div>
          <div className="dpad-row">
            <button className="dpad-btn" onClick={() => changeDirection(0, 1)}>▼</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Interactive 3D Hologram Logo Sandbox with Dynamic Overclock Alarm Glow
function InteractiveLogoSandbox() {
  const cardRef = useRef(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [energyMode, setEnergyMode] = useState('cyan');
  const [overclock, setOverclock] = useState(false);

  const handlePointerMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -12;
    const rotateY = ((x - centerX) / centerX) * 12;

    setRotate({ x: rotateX, y: rotateY });
  };

  const handlePointerLeave = () => {
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div className="logo-sandbox-wrap">
      <div className="sandbox-controls">
        <span className="control-label">// REACTOR:</span>
        <button 
          type="button"
          className={`ctl-btn ${energyMode === 'cyan' && !overclock ? 'active' : ''}`}
          onClick={() => { setEnergyMode('cyan'); setOverclock(false); }}
        >
          Cyan
        </button>
        <button 
          type="button"
          className={`ctl-btn ${energyMode === 'purple' && !overclock ? 'active' : ''}`}
          onClick={() => { setEnergyMode('purple'); setOverclock(false); }}
        >
          Violet
        </button>
        <button 
          type="button"
          className={`ctl-btn ${energyMode === 'emerald' && !overclock ? 'active' : ''}`}
          onClick={() => { setEnergyMode('emerald'); setOverclock(false); }}
        >
          Green
        </button>
        <button 
          type="button" 
          className={`ctl-btn overclock-btn ${overclock ? 'overclock-on' : ''}`}
          onClick={() => setOverclock(!overclock)}
        >
          {overclock ? '⚡ OVERCLOCKED' : '⚡ Overclock'}
        </button>
      </div>

      <div 
        className="tilt-stage"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        ref={cardRef}
      >
        <div 
          className={`glass-holo-card mode-${energyMode}${overclock ? 'is-overclocked' : ''}`}
          style={{
            transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`,
          }}
        >
          <div className="holo-content">
            <div className="holo-emblem-wrap">
              <Logo size={110} className="sandbox-logo-render" />
            </div>
            <div className="holo-spec">
              <h3>ANDREW TECH. CORE</h3>
              <p>Tilt cursor or finger to rotate holographic layer.</p>
              <div className="holo-tags">
                <span>FPS: 60 LOCKED</span>
                <span className={overclock ? 'danger-tag' : ''}>
                  STATUS: {overclock ? 'CRITICAL OVERCLOCK' : 'STABLE'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 2-Second Sliding Showcase for Web Column
function WebProjectSlider() {
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="slider-wrapper">
      <div className="slider-frame">
        {slide === 0 && (
          <div className="mockup-container web-view">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="b-dot red"></span>
                <span className="b-dot yellow"></span>
                <span className="b-dot green"></span>
              </div>
              <div className="browser-url">https://auramarket.web.app</div>
            </div>
            <div className="web-nav">
              <div className="web-logo">⚡ AURA</div>
              <div className="web-links-fake">
                <span>Deals</span>
                <span>Shop</span>
              </div>
              <div className="web-user-badge">Cart (2)</div>
            </div>
            <div className="web-hero-banner">
              <div className="web-banner-left">
                <h2>Next-Gen Hardware</h2>
                <p>React Frontend & Node.js API</p>
                <button className="web-cta-sm">Browse</button>
              </div>
              <div className="web-banner-right">💻</div>
            </div>
            <div className="web-grid-preview">
              <div className="web-prod-card">
                <div className="w-img">💻</div>
                <div className="w-title">Laptop Pro</div>
                <div className="w-price">$1,499</div>
              </div>
              <div className="web-prod-card">
                <div className="w-img">🎮</div>
                <div className="w-title">Keyboard</div>
                <div className="w-price">$180</div>
              </div>
              <div className="web-prod-card">
                <div className="w-img">🖥️</div>
                <div className="w-title">Display</div>
                <div className="w-price">$620</div>
              </div>
            </div>
          </div>
        )}

        {slide === 1 && (
          <div className="mockup-container web-view">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="b-dot red"></span>
                <span className="b-dot yellow"></span>
                <span className="b-dot green"></span>
              </div>
              <div className="browser-url">https://api.auramarket.com/admin</div>
            </div>
            <div className="web-dash-header">
              <span>📊 Node.js API Telemetry</span>
              <span className="uptime-pill">● 99.98%</span>
            </div>
            <div className="web-dash-metrics">
              <div className="dash-metric">
                <div className="d-title">Active</div>
                <div className="d-val">4.8k</div>
              </div>
              <div className="dash-metric">
                <div className="d-title">Latency</div>
                <div className="d-val text-green">42ms</div>
              </div>
              <div className="dash-metric">
                <div className="d-title">Volume</div>
                <div className="d-val text-cyan">$82k</div>
              </div>
            </div>
            <div className="dash-chart-mock">
              <div className="chart-bar h-40"></div>
              <div className="chart-bar h-65"></div>
              <div className="chart-bar h-50"></div>
              <div className="chart-bar h-85"></div>
              <div className="chart-bar h-95"></div>
            </div>
            <div className="dash-log-line">→ POST /checkout 200 OK (28ms)</div>
          </div>
        )}

        {slide === 2 && (
          <div className="mockup-container web-view">
            <div className="browser-bar">
              <div className="browser-dots">
                <span className="b-dot red"></span>
                <span className="b-dot yellow"></span>
                <span className="b-dot green"></span>
              </div>
              <div className="browser-url">https://auramarket.web.app/checkout</div>
            </div>
            <div className="web-checkout-layout">
              <div className="w-chk-form">
                <div className="chk-heading">🔒 JWT Transaction</div>
                <div className="chk-field-mock">Card: •••• 4242</div>
                <button className="chk-submit-mock">Confirm Order ($1,499)</button>
              </div>
              <div className="w-chk-summary">
                <div className="chk-item-preview">💻 Laptop Pro × 1</div>
                <div className="chk-status-tag">Status: Verified</div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="slider-dots">
        {[0, 1, 2].map((i) => (
          <span 
            key={i} 
            className={`slider-dot ${slide === i ? 'active' : ''}`}
            onClick={() => setSlide(i)}
          />
        ))}
      </div>
    </div>
  );
}

// ==========================================
// MAIN ANDREW TECH APPLICATION
// ==========================================
export default function App() {
  const [loadingIntro, setLoadingIntro] = useState(true);
  const [introFading, setIntroFading] = useState(false);
  const [typedTitle, setTypedTitle] = useState('');
  const [showTagline, setShowTagline] = useState(false);
  const fullTitle = "ANDREW TECHNOLOGIES LTD";

  // Modals & Navigation
  const [navOpen, setNavOpen] = useState(false);
  const [arcadeOpen, setArcadeOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [feedback, setFeedback] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);

  // Rotating Dynamic Hero Headline
  const phrases = [
    'Fluid React Native Mobile Apps.',
    'Scalable Node.js & Express APIs.',
    'High-Performance Web Platforms.',
    'Interactive Canvas Engineering.'
  ];
  const [currentText, setCurrentText] = useState('');
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const canvasRef = useRef(null);

  // Global hotkey: press ` (backtick) to trigger Hacker CLI
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setTerminalOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Intro typewriter
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullTitle.length) {
        setTypedTitle(fullTitle.substring(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
        setShowTagline(true);

        setTimeout(() => setIntroFading(true), 2500);
        setTimeout(() => setLoadingIntro(false), 3100);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, []);

  // Hero cycling headline
  useEffect(() => {
    const currentPhrase = phrases[phraseIdx];
    let timer;

    if (isDeleting) {
      if (charIdx > 0) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, charIdx - 1));
          setCharIdx(charIdx - 1);
        }, 35);
      } else {
        setIsDeleting(false);
        setPhraseIdx((phraseIdx + 1) % phrases.length);
      }
    } else {
      if (charIdx < currentPhrase.length) {
        timer = setTimeout(() => {
          setCurrentText(currentPhrase.substring(0, charIdx + 1));
          setCharIdx(charIdx + 1);
        }, 70);
      } else {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      }
    }

    return () => clearTimeout(timer);
  }, [charIdx, isDeleting, phraseIdx]);

  // Performance-tuned Serpent Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animId;

    let isMobile = window.innerWidth <= 768;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const onResize = () => {
      isMobile = window.innerWidth <= 768;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);

    const mouse = { x: width / 2, y: height / 2, targetX: width / 2, targetY: height / 2 };

    const handlePointerMove = (e) => {
      mouse.targetX = e.clientX;
      mouse.targetY = e.clientY;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    const NUM_SEGMENTS = isMobile ? 18 : 26;
    const SEG_LENGTH = isMobile ? 12 : 15;
    const segments = Array.from({ length: NUM_SEGMENTS }, () => ({
      x: width / 2,
      y: height / 2,
    }));

    let time = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      time += 0.03;
      const waveX = Math.sin(time) * 12;
      const waveY = Math.cos(time) * 12;

      segments[0].x = mouse.x + waveX;
      segments[0].y = mouse.y + waveY;

      for (let i = 1; i < NUM_SEGMENTS; i++) {
        const prev = segments[i - 1];
        const current = segments[i];

        const dx = prev.x - current.x;
        const dy = prev.y - current.y;
        const angle = Math.atan2(dy, dx);

        current.x = prev.x - Math.cos(angle) * SEG_LENGTH;
        current.y = prev.y - Math.sin(angle) * SEG_LENGTH;
      }

      ctx.beginPath();
      ctx.moveTo(segments[0].x, segments[0].y);
      for (let i = 1; i < NUM_SEGMENTS; i++) {
        ctx.lineTo(segments[i].x, segments[i].y);
      }
      ctx.strokeStyle = 'rgba(99, 102, 241, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      segments.forEach((seg, i) => {
        const radius = Math.max(2, (NUM_SEGMENTS - i) * 0.6);
        ctx.beginPath();
        ctx.arc(seg.x, seg.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = i === 0 ? 'rgba(6, 182, 212, 0.9)' : 'rgba(99, 102, 241, 0.4)';
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ type: '', text: '' });

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) {
        setFeedback({ type: 'success', text: data.message });
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFeedback({ type: 'error', text: data.message || 'Transmission failed.' });
      }
    } catch {
      setFeedback({ type: 'error', text: 'Backend offline or network error.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {loadingIntro && (
        <div className={`intro-splash ${introFading ? 'fade-out' : ''}`}>
          <div className="intro-container">
            <div className="intro-brand-row">
              <Logo size={36} className="intro-logo" />
              <div className="typewriter-wrap">
                <span className="intro-text">{typedTitle}</span>
                <span className="intro-cursor"></span>
              </div>
            </div>

            <div className={`intro-meta ${showTagline ? 'visible' : ''}`}>
              <span className="meta-bracket">[</span>
              <span className="meta-status">SYS.INITIALIZED</span>
              <span className="meta-bracket">]</span>
              <span className="meta-sub">FULL-STACK & MOBILE</span>
            </div>
          </div>
        </div>
      )}

      {/* Feature 1: Hacker Terminal Shell Modal */}
      <HackerTerminalModal 
        isOpen={terminalOpen} 
        onClose={() => setTerminalOpen(false)} 
      />

      {/* Cyber Snake Arcade Modal */}
      <CyberSnakeModal 
        isOpen={arcadeOpen} 
        onClose={() => setArcadeOpen(false)} 
      />

      {/* Feature 4: Floating AI Project Assistant Widget */}
      <FloatingAIAssistant />

      {/* Permanently Fixed Glass Navbar */}
      <nav className="navbar">
        <div className="brand">
          <Logo size={24} />
          ANDREW<span>TECH.</span>
          <span className="brand-badge">2026</span>
        </div>

        <div className="nav-action-cluster">
          {/* Terminal Launcher */}
          <button 
            type="button" 
            className="term-launch-btn"
            onClick={() => setTerminalOpen(true)}
            title="Open CLI Terminal (Hotkey: `)"
          >
            &gt;_ CLI
          </button>

          <button 
            type="button" 
            className="nav-toggle" 
            aria-label="Toggle Navigation Menu"
            onClick={() => setNavOpen(!navOpen)}
          >
            {navOpen ? '✕' : '☰'}
          </button>
        </div>

        <div className={`nav-links ${navOpen ? 'open' : ''}`}>
          <a href="#about" onClick={() => setNavOpen(false)}>Engineering</a>
          <a href="#projects" onClick={() => setNavOpen(false)}>Projects</a>
          <a href="#interactive-core" onClick={() => setNavOpen(false)}>Core Lab</a>
          <a href="#skills" onClick={() => setNavOpen(false)}>Skills</a>
          <button 
            type="button"
            className="arcade-nav-trigger"
            onClick={() => { setNavOpen(false); setArcadeOpen(true); }}
          >
            🎮 Explore Free Gaming
          </button>
          <a href="#contact" className="btn-nav" onClick={() => setNavOpen(false)}>Contact</a>
        </div>
      </nav>

      <GlassyLogoBackground />

      <canvas id="bg-canvas" ref={canvasRef} />
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="content-wrapper">
        <section className="hero" id="about">
          <div className="hero-badge">
            <span className="pulse-dot"></span>
            Available for Senior / Lead Full-Stack & Mobile Roles
          </div>
          <h1 className="hero-title">
            Engineering scalable systems & <br />
            <span className="gradient-text">{currentText}</span>
            <span className="cursor-blink">_</span>
          </h1>
          <p className="hero-sub">
            Full-Stack Software Engineer building responsive <strong>React</strong> interfaces, 
            high-performance <strong>React Native</strong> mobile environments, and secure <strong>Node.js / Express</strong> backends.
          </p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary">Inspect Case Studies</a>
            <button className="btn btn-secondary" onClick={() => setTerminalOpen(true)}>
              &gt;_ Launch Terminal CLI
            </button>
          </div>
        </section>

        <div className="stats-strip">
          <div className="stat-box">
            <div className="stat-number">60 FPS</div>
            <div className="stat-label">Fluid Mobile Gestures</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">&lt; 85ms</div>
            <div className="stat-label">Node.js API Latency</div>
          </div>
          <div className="stat-box">
            <div className="stat-number">100%</div>
            <div className="stat-label">Modular Architecture</div>
          </div>
        </div>

        {/* Feature 2: Dedicated Interactive Project Columns */}
        <section className="section" id="projects">
          <div className="section-header">
            <span className="section-tag">// ARCHITECTURAL SHOWCASE</span>
            <h2 className="section-title">Production Systems & Visual Case Studies</h2>
            <p className="section-desc">Interactive mobile sandbox & full-stack web storefront simulations.</p>
          </div>

          <div className="showcase-columns">
            {/* Column 1: Feature 2 - Interactive Mobile Sandbox Device */}
            <div className="showcase-col">
              <div className="col-header">
                <span className="col-badge">LIVE DEVICE SIMULATOR</span>
                <h3>React Native & Expo Ecosystem</h3>
                <p>Click items below to test real-time native state transitions, haptics, and shopping cart mutations.</p>
              </div>

              {/* The Live Interactive Mobile Phone Frame */}
              <InteractiveMobileDevice />

              <div className="deep-dive-card">
                <h4>Aura Market — Mobile E-Commerce</h4>
                <p className="deep-dive-desc">
                  An end-to-end native retail experience patterned after modern commerce giants. Built with tactile feedback, fluid transitions, and instant catalog filtering.
                </p>
                <div className="feature-bullets">
                  <div className="bullet-point">
                    <span className="bullet-title">Optimistic Cart:</span> Updates subtotals instantly while coordinating payload sync with the server.
                  </div>
                  <div className="bullet-point">
                    <span className="bullet-title">Expo Router:</span> Deep-linking ready structure with smooth stack and modal routing.
                  </div>
                  <div className="bullet-point">
                    <span className="bullet-title">Offline Cache:</span> Persists user cart and recently viewed catalogs to local storage.
                  </div>
                </div>
                <div className="tags">
                  <span>React Native</span>
                  <span>Expo</span>
                  <span>Context API</span>
                  <span>Reanimated</span>
                </div>
              </div>
            </div>

            {/* Column 2: Web Distributed Systems Slider */}
            <div className="showcase-col">
              <div className="col-header">
                <span className="col-badge">FULL-STACK & BACKEND</span>
                <h3>React.js & Node.js Distributed Web</h3>
                <p>Scalable web platforms powered by modern React frontend hooks and high-concurrency Node.js REST API microservices.</p>
              </div>

              <WebProjectSlider />

              <div className="deep-dive-card">
                <h4>PulseStay Platform — Real-Time Engine</h4>
                <p className="deep-dive-desc">
                  Centralized reservation system and administrative hub designed to resolve race-condition booking requests through non-blocking asynchronous event loops.
                </p>
                <div className="feature-bullets">
                  <div className="bullet-point">
                    <span className="bullet-title">Express Middleware:</span> JWT verification, salted Bcrypt hashing, and strict CORS governance.
                  </div>
                  <div className="bullet-point">
                    <span className="bullet-title">Reactive React Interface:</span> Custom hooks, real-time availability updates, and form sanitization.
                  </div>
                  <div className="bullet-point">
                    <span className="bullet-title">Distributed Data Engine:</span> Conflict-free date scheduling algorithms with sub-85ms response times.
                  </div>
                </div>
                <div className="tags">
                  <span>React.js</span>
                  <span>Node.js</span>
                  <span>Express</span>
                  <span>JWT Auth</span>
                </div>
              </div>
            </div>
          </div>

          {/* Feature 3: Architecture Evolution Time-Machine Slider */}
          <div style={{ marginTop: '3rem' }}>
            <ArchitectureTimeMachine />
          </div>
        </section>

        {/* 3D Holographic Reactor Core */}
        <section className="section" id="interactive-core">
          <div className="section-header">
            <span className="section-tag">// HOLOGRAPHIC LABORATORY</span>
            <h2 className="section-title">Interactive Core Architecture</h2>
            <p className="section-desc">Experience 3D gyroscopic physics and real-time shader light refraction directly with your pointer.</p>
          </div>
          <InteractiveLogoSandbox />
        </section>

        <section className="section" id="skills">
          <div className="section-header">
            <span className="section-tag">// ARCHITECTURAL TOOLKIT</span>
            <h2 className="section-title">Deep Technical Foundations</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Native Mobile Engineering</h3>
              <p>Specialized in cross-platform React Native development with Expo Router, gesture-driven interactions, and optimistic caching.</p>
              <div className="tags">
                <span>React Native</span>
                <span>Expo Router</span>
                <span>Context API</span>
                <span>Reanimated</span>
              </div>
            </div>
            <div className="skill-card">
              <h3>Backend & Distributed Systems</h3>
              <p>Architecting resilient RESTful APIs in Node.js, JWT security layers, schema validation, and high-concurrency querying.</p>
              <div className="tags">
                <span>Node.js</span>
                <span>Express</span>
                <span>JWT / Bcrypt</span>
                <span>MongoDB / SQL</span>
              </div>
            </div>
            <div className="skill-card">
              <h3>Frontend & Interactive Graphics</h3>
              <p>Crafting component architectures in modern React with custom hooks, inverse kinematics, and responsive glassmorphism.</p>
              <div className="tags">
                <span>React</span>
                <span>HTML5 Canvas</span>
                <span>Kinematics</span>
                <span>CSS Grid</span>
              </div>
            </div>
          </div>
        </section>

        {/* Free Gaming Attention-Grabber Banner */}
        <div className="arcade-banner-strip">
          <div className="arcade-banner-box">
            <div className="arcade-banner-info">
              <span className="arcade-badge">⚡ BONUS EASTER EGG</span>
              <h3>Need a Break? Explore Free Cyber Gaming</h3>
              <p>Play the custom hardware-accelerated retro Snake engine built directly into this portfolio.</p>
            </div>
            <button 
              type="button" 
              className="btn btn-primary arcade-launch-btn"
              onClick={() => setArcadeOpen(true)}
            >
              🎮 Launch Snake Arcade
            </button>
          </div>
        </div>

        {/* Contact Section */}
        <section className="section" id="contact">
          <div className="section-header">
            <span className="section-tag">// SECURE TRANSMISSION</span>
            <h2 className="section-title">Let's Build Something Production-Grade</h2>
            <p className="section-desc">Available for contracts, full-stack roles, or technical consults.</p>
          </div>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>SENDER IDENTITY</label>
              <input
                type="text"
                required
                placeholder="Alex Mercer"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>RETURN ADDRESS</label>
              <input
                type="email"
                required
                placeholder="alex@company.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>TECHNICAL SPECIFICATION</label>
              <textarea
                rows="4"
                required
                placeholder="Outline your application requirements, timeline, or engineering role..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
              {submitting ? 'Transmitting Data...' : 'Dispatch Message'}
            </button>
            {feedback.text && (
              <p className="form-feedback" style={{ color: feedback.type === 'success' ? '#34d399' : '#f87171' }}>
                {feedback.text}
              </p>
            )}
          </form>
        </section>

        <footer className="footer">
          <p>© 2026 ANDREW TECH. Architected with React, Node.js & Inverse Kinematics.</p>
        </footer>
      </div>
    </>
  );
}