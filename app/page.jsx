"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── 거래소 데이터 ── */
const EXCHANGES = [
  { name: "업비트", logo: "upbit.png", color: "#1763B6" },
  { name: "빗썸", logo: "bithumb.png", color: "#F7A600" },
  { name: "코인원", logo: "coinone.png", color: "#0075FF" },
  { name: "코빗", logo: "korbit.png", color: "#0075FF" },
  { name: "고팍스", logo: "gopax.png", color: "#fea831" },
  { name: "Binance", logo: "binance.png", color: "#F0B90B" },
  { name: "Bybit", logo: "bybit.png", color: "#ffb01f" },
  { name: "OKX", logo: "okx.png", color: "#ffffff" },
  { name: "KuCoin", logo: "kucoin.png", color: "#00C087" },
  { name: "Gate.io", logo: "gateio.png", color: "#e0464c" },
  { name: "Bitget", logo: "bitget.png", color: "#00f5ff" },
  { name: "MEXC", logo: "mexc.png", color: "#00b3ff" },
  { name: "HTX", logo: "htx.png", color: "#00c2ff" },
  { name: "Crypto.com", logo: "cryptocom.png", color: "#0066ff" },
  { name: "Coinbase", logo: "coinbase.png", color: "#0052ff" },
  { name: "Bitmart", logo: "bitmart.png", color: "#5741D9" },
  { name: "Kraken", logo: "kraken.png", color: "#5741d9" },
  { name: "AscendEX", logo: "ascendex.png", color: "#7c44c0" },
  { name: "Bingx", logo: "bingx.png", color: "#2a54ff" },
  { name: "Whitebit", logo: "whitebit.png", color: "#eabb4a" },
  { name: "Lbank", logo: "lbank.png", color: "#ffcd00" },
  { name: "CoinEx", logo: "coinex.png", color: "#1ee1bc" },
  { name: "OrangeX", logo: "orangex.png", color: "#ff8508" },
  { name: "Deepcoin", logo: "deepcoin.png", color: "#fe7701" },
];

/* ── 별똥별 Canvas ── */
function StarCanvas() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));
    class Meteor {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W * 1.5 - W * 0.25;
        this.y = -40;
        this.len = Math.random() * 120 + 60;
        this.speed = Math.random() * 6 + 4;
        this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3;
        this.alpha = 0;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 40;
        this.active = false;
        this.delay = Math.random() * 400;
        this.timer = 0;
      }
      update() {
        if (!this.active) {
          this.timer++;
          if (this.timer >= this.delay) { this.active = true; }
          return;
        }
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        const progress = this.life / this.maxLife;
        this.alpha = progress < 0.2 ? progress / 0.2 : progress > 0.7 ? 1 - (progress - 0.7) / 0.3 : 1;
        if (this.life >= this.maxLife || this.x > W + 100 || this.y > H + 100) { this.reset(); }
      }
      draw(ctx) {
        if (!this.active || this.alpha <= 0) return;
        const tailX = this.x - Math.cos(this.angle) * this.len;
        const tailY = this.y - Math.sin(this.angle) * this.len;
        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(180,160,255,${this.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${this.alpha * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 6);
        glow.addColorStop(0, `rgba(255,255,255,${this.alpha * 0.8})`);
        glow.addColorStop(1, `rgba(180,160,255,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }
    const meteors = Array.from({ length: 6 }, () => new Meteor());
    let frame = 0;
    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;
      stars.forEach((s) => {
        const a = s.a * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${a})`;
        ctx.fill();
      });
      meteors.forEach((m) => { m.update(); m.draw(ctx); });
      raf = requestAnimationFrame(draw);
    }
    draw();
    const onResize = () => {
      W = window.innerWidth; H = window.innerHeight;
      canvas.width = W; canvas.height = H;
      stars.forEach((s) => { s.x = Math.random() * W; s.y = Math.random() * H; });
    };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={canvasRef} id="star-canvas" aria-hidden="true" />;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [contactTab, setContactTab] = useState("inquiry");
  const [formData, setFormData] = useState({ email: "", telegram: "", message: "" });
  const [devFormData, setDevFormData] = useState({ email: "", telegram: "", program: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [devFormStatus, setDevFormStatus] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const [devFormErrors, setDevFormErrors] = useState({});
  const [emailjsReady, setEmailjsReady] = useState(false);
  const serviceRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) setServiceOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) { emailjs.init(pk); setEmailjsReady(true); }
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = true;
    if (!formData.telegram.trim()) errs.telegram = true;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_INQUIRY || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      await emailjs.send(serviceId, templateId, {
        from_email: formData.email,
        telegram_id: formData.telegram,
        message: formData.message || "(메시지 없음)",
        to_email: "boddaring@endholdings.com",
      });
      setFormStatus("sent");
      setFormData({ email: "", telegram: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) { setFormStatus("error"); }
  };

  const handleDevSubmit = async (e) => {
    e.preventDefault();
    if (!devFormData.email.trim() || !devFormData.telegram.trim()) {
      setDevFormErrors({ email: !devFormData.email.trim(), telegram: !devFormData.telegram.trim() });
      return;
    }
    setDevFormErrors({});
    setDevFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DEVELOPMENT;
      await emailjs.send(serviceId, templateId, {
        from_email: devFormData.email,
        telegram_id: devFormData.telegram,
        program_request: devFormData.program || "(내용 없음)",
        to_email: "development@endholdings.com",
      });
      setDevFormStatus("sent");
      setDevFormData({ email: "", telegram: "", program: "" });
      setTimeout(() => setDevFormStatus("idle"), 5000);
    } catch (error) { setDevFormStatus("error"); }
  };

  return (
    <>
      <StarCanvas />
      <div className="nebula-wrap">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <Link href="/" className="brand">
            <img src="/icon.png" alt="B" className="brand-icon" />
            <div className="brand-text">
              <span className="brand-name">BODDARING</span>
              <span className="brand-sub">아비트라지 데이터 플랫폼</span>
            </div>
          </Link>

          <div className="nav-links pc-only">
            <div className="nav-dropdown-wrap" ref={serviceRef}>
              <button className={`nav-link ${serviceOpen ? "active" : ""}`} onClick={() => setServiceOpen(!serviceOpen)}>
                서비스 <span className="drop-arrow">▾</span>
              </button>
              {serviceOpen && (
                <div className="nav-dropdown">
                  <a href="#signal" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <div className="item-icon">📡</div>
                    <div className="item-text">
                      <div className="item-title">시그널 소개</div>
                      <div className="item-desc">실시간 시세 차익 데이터 신호</div>
                    </div>
                  </a>
                  <a href="#exchanges" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <div className="item-icon">💱</div>
                    <div className="item-text">
                      <div className="item-title">연동 거래소</div>
                      <div className="item-desc">국내외 20개 이상 주요 거래소</div>
                    </div>
                  </a>
                  <a href="#bot" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <div className="item-icon">🤖</div>
                    <div className="item-text">
                      <div className="item-title">BOT 소개</div>
                      <div className="item-desc">자동 실행 및 관리 시스템</div>
                    </div>
                  </a>
                  <a href="#contact" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <div className="item-icon">✉️</div>
                    <div className="item-text">
                      <div className="item-title">문의하기</div>
                      <div className="item-desc">일반 및 기술 지원 문의</div>
                    </div>
                  </a>
                </div>
              )}
            </div>
            <Link href="/learn" className="nav-link">
              더 알아보기 <span className="learn-badge">!</span>
            </Link>
          </div>

          <div className="nav-cta pc-only" style={{ display: 'flex', gap: '10px' }}>
            <Link href="/apply" className="btn-apply-free" style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)',
              boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              무료체험 신청하기 🚀
              <div className="btn-shine"></div>
            </Link>
            <Link href="/apply" className="btn-apply">
              신청하기 <span className="arrow">→</span>
            </Link>
          </div>

          <button className="hamburger mobile-only" onClick={() => setMenuOpen(!menuOpen)}>
            <span /> <span /> <span />
          </button>
        </div>

        <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
          <button className="mobile-nav-link" onClick={() => { setMobileServiceOpen(!mobileServiceOpen); }}>
            서비스 {mobileServiceOpen ? "▴" : "▾"}
          </button>
          {mobileServiceOpen && (
            <div className="mobile-sub">
              <a href="#signal" onClick={() => setMenuOpen(false)}>시그널 소개</a>
              <a href="#exchanges" onClick={() => setMenuOpen(false)}>연동 거래소</a>
              <a href="#bot" onClick={() => setMenuOpen(false)}>BOT 소개</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>문의하기</a>
            </div>
          )}
          <Link href="/learn" className="nav-link" onClick={() => setMenuOpen(false)}>더 알아보기</Link>
          <Link href="/apply" className="btn-apply" onClick={() => setMenuOpen(false)}>신청하기</Link>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="container hero-grid">
            <div className="hero-left reveal">
              <div className="hero-badge">
                <div className="hero-badge-dot" />
                실시간 시세차익 데이터 수집·구조화 끝판왕
              </div>
              <h1 className="hero-title">
                거래소 간 <span className="hero-grad">시세 차익</span>을<br />한눈에, 빠르게!<br />
                <span className="line2 hero-title-animated">데이터수집의 새로운 기준</span>
              </h1>
              <p className="hero-desc">
                수많은 아비트라지 사이트들, 그동안 실망만 하셨나요? <span className="highlight">단 하루면 충분합니다.</span> 타 서비스와는 차원이 다른 압도적인 데이터 수집 속도와 정교한 계산 엔진을 직접 경험해 보세요. <span className="highlight">지금 바로 24시간 무료 체험</span>으로 당신의 수익 구조를 혁신하십시오.
              </p>
              <div className="hero-actions">
                <a href="#contact" className="btn-primary">지금 문의하기</a>
                <Link href="/apply" className="btn-free-trial" style={{
                  background: 'linear-gradient(135deg, #8b5cf6 0%, #f472b6 100%)',
                  boxShadow: '0 0 20px rgba(124, 58, 237, 0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}>
                  24시간 무료체험 신청하기 🚀
                  <div className="btn-shine"></div>
                </Link>
              </div>

              <div className="hero-bottom-info">
                <div className="hero-rtbadge-row">
                  <div className="live-signal-badge" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 12px',
                    borderRadius: '8px',
                    background: 'rgba(0,0,0,0.4)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#fff',
                    marginBottom: '16px'
                  }}>
                    <span className="real-dot" style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#10b981',
                      boxShadow: '0 0 8px #10b981',
                      animation: 'pulse 2s infinite'
                    }} />
                    Real-Time Data Acquisition
                  </div>
                </div>
                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-val">15<span className="unit"> +</span></span>
                    <span className="hero-stat-label">연동 거래소</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">10,000<span className="unit"> +</span></span>
                    <span className="hero-stat-label">추적 코인</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">1<span className="unit"> 초</span></span>
                    <span className="hero-stat-label">시그널 갱신 주기</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">300,000<span className="unit"> 회</span></span>
                    <span className="hero-stat-label">종목-페어 초당 계산</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right reveal">
              <div className="hero-video-wrap">
                <div className="hero-video-placeholder">
                  <div className="video-icon">▶</div>
                  <span className="video-label">소개 영상 넣을자리</span>
                  <div className="hero-video-badge">
                    <span className="live-dot" />
                    LIVE Signal
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* [중간 섹션들 - 텍스트 보존하며 구조 유지] */}
        <section id="signal" className="section-signal">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title">아비트라지의 모든 것, <span className="hero-grad">BODDARING</span></h2>
              <p className="section-subtitle no-break">거래소 간 가격 비교부터 실행 가능한 시그널까지, 차트 분석 없이도 가격 격차 구간을 직관적으로 확인할 수 있습니다.</p>
            </div>
            
            <div className="timeline-container reveal">
              <div className="timeline-card">
                <div className="timeline-icon">📡</div>
                <div className="timeline-content">
                  <h3>실시간 데이터 수집</h3>
                  <p>공개 오더북 데이터를 초 단위로 수집합니다.</p>
                </div>
              </div>
              <div className="timeline-card">
                <div className="timeline-icon">🧮</div>
                <div className="timeline-content">
                  <h3>비용 반영 계산 시스템</h3>
                  <p>수수료, 환율, 슬리피지를 반영한 계산값을 표시합니다. (투자 수익 보장을 의미하지 않습니다.)</p>
                </div>
              </div>
              <div className="timeline-card">
                <div className="timeline-icon">📊</div>
                <div className="timeline-content">
                  <h3>오더북 기반 유동성 분석</h3>
                  <p>체결 가능 범위 기준의 가격 데이터를 제공합니다.</p>
                </div>
              </div>
              <div className="timeline-card">
                <div className="timeline-icon">🔍</div>
                <div className="timeline-content">
                  <h3>사용자 조건 필터</h3>
                  <p>Per(격차 비율) 및 Amount(거래 규모) 필터링 기능을 제공합니다.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="section-data">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title">데이터가 곧 <span className="hero-grad">경쟁력</span>입니다</h2>
              <p className="section-subtitle no-break">아비트라지는 속도와 정보의 싸움입니다. BODDARING은 대한민국 최고의 데이터 수집 기술력을 바탕으로 당신의 수익 기회를 극대화합니다.</p>
            </div>
          </div>
        </section>

        <section id="bot" className="section-bot">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title">아비트라지에 날개를 더하는 <span className="hero-grad">BOT</span></h2>
            </div>
            <div className="bot-grid">
              <div className="bot-card reveal">
                <img src="/bot-1.png" alt="BOT 1" />
                <h3>멀티 거래소 연동</h3>
              </div>
              <div className="bot-card reveal">
                <img src="/bot-2.png" alt="BOT 2" />
                <h3>초고속 실행 엔진</h3>
              </div>
              <div className="bot-card reveal">
                <img src="/bot-3.png" alt="BOT 3" />
                <h3>안전한 자산 관리</h3>
              </div>
            </div>
          </div>
        </section>

        <section id="exchanges" className="section-exchanges">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title">연동 거래소</h2>
              <p className="section-subtitle">전 세계 주요 거래소의 데이터를 실시간으로 연결합니다.</p>
            </div>
            <div className="exchange-marquee">
              <div className="marquee-track">
                {[...EXCHANGES, ...EXCHANGES].map((ex, i) => (
                  <div key={i} className="exchange-chip">
                    <img src={`/exchanges/${ex.logo}`} alt={ex.name} />
                    <span>{ex.name}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="exchange-footer">
              <p className="exchange-legal-kr">
                * 본 사이트는 각 거래소와 공식적인 제휴 관계가 없으며, 공개 API 기반 데이터를 활용한 독립적인 정보 제공 플랫폼입니다. 각 상표는 해당 권리자에게 귀속됩니다.
              </p>
              <p className="exchange-legal-en">
                * This platform is an independent information provider utilizing public API data and has no official partnership with the respective exchanges. All trademarks belong to their respective owners.
              </p>
              <p className="exchange-disclaimer-en">
                * This service does not solicit or broker the sale of financial investment products. As an information provision platform, it assumes no legal responsibility for investment results.
              </p>
            </div>
          </div>
        </section>

        <section id="contact" className="section-contact">
          <div className="container">
            <div className="section-head reveal">
              <h2 className="section-title">방향성보다, <span className="hero-grad">구조</span>를 보십시오</h2>
            </div>
            
            <div className="contact-tabs">
              <button className={contactTab === "inquiry" ? "active" : ""} onClick={() => setContactTab("inquiry")}>일반 문의하기</button>
              <button className={contactTab === "development" ? "active" : ""} onClick={() => setContactTab("development")}>개발 문의하기</button>
            </div>

            <div className="contact-box reveal">
              {contactTab === "inquiry" ? (
                <form onSubmit={handleSubmit} className="contact-form">
                  <p className="contact-form-desc">궁금한 점이 있으시면 아래 양식을 통해 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.</p>
                  <div className="input-group">
                    <label>이메일</label>
                    <input type="email" placeholder="example@email.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={formErrors.email ? "error" : ""} />
                  </div>
                  <div className="input-group">
                    <label>텔레그램 ID</label>
                    <input type="text" placeholder="@username" value={formData.telegram} onChange={(e) => setFormData({...formData, telegram: e.target.value})} className={formErrors.telegram ? "error" : ""} />
                  </div>
                  <div className="input-group">
                    <label>문의사항</label>
                    <textarea rows="4" placeholder="문의하실 내용을 입력해 주세요." value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary full" disabled={formStatus === "sending"}>
                    {formStatus === "sending" ? "전송 중..." : "문의하기 제출"}
                  </button>
                  {formStatus === "sent" && <p className="status-success">성공적으로 전송되었습니다!</p>}
                  {formStatus === "error" && <p className="status-error">전송에 실패했습니다. 다시 시도해 주세요.</p>}
                  <p className="contact-direct">또는 <a href="mailto:boddaring@endholdings.com">boddaring@endholdings.com</a> 으로 문의주세요.</p>
                </form>
              ) : (
                <form onSubmit={handleDevSubmit} className="contact-form">
                  <p className="contact-form-desc">전문적인 투자 프로그램 개발이 필요하신가요? 맞춤형 솔루션을 제공해 드립니다.</p>
                  <div className="input-group">
                    <label>이메일</label>
                    <input type="email" placeholder="example@email.com" value={devFormData.email} onChange={(e) => setDevFormData({...devFormData, email: e.target.value})} className={devFormErrors.email ? "error" : ""} />
                  </div>
                  <div className="input-group">
                    <label>텔레그램 ID</label>
                    <input type="text" placeholder="@username" value={devFormData.telegram} onChange={(e) => setDevFormData({...devFormData, telegram: e.target.value})} className={devFormErrors.telegram ? "error" : ""} />
                  </div>
                  <div className="input-group">
                    <label>프로그램 개발 요청사항</label>
                    <textarea rows="4" placeholder="개발 컨설팅 비용은 500만원이며, 프로그램 제작은 최소 천만원부터 시작합니다. 컨설팅 이후 프로그램 제작 확정 시 총액에서 컨설팅 비용은 차감합니다." value={devFormData.program} onChange={(e) => setDevFormData({...devFormData, program: e.target.value})} />
                  </div>
                  <button type="submit" className="btn-primary full" disabled={devFormStatus === "sending"}>
                    {devFormStatus === "sending" ? "전송 중..." : "개발 문의 제출"}
                  </button>
                  {devFormStatus === "sent" && <p className="status-success">성공적으로 전송되었습니다!</p>}
                  {devFormStatus === "error" && <p className="status-error">전송에 실패했습니다. 다시 시도해 주세요.</p>}
                  <p className="contact-direct">또는 <a href="mailto:development@endholdings.com">development@endholdings.com</a> 으로 문의주세요.</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <div className="footer-inner">
            <div className="footer-brand">
              <img src="/icon.png" alt="B" />
              <span>BODDARING</span>
            </div>
            <p className="footer-copy">© 2026 BODDARING. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx global>{`
        .btn-apply-free {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 20px;
          border-radius: 12px;
          font-size: 14px;
          font-weight: 800;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.15);
          transition: all 0.2s ease;
          white-space: nowrap;
        }
        .btn-apply-free:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .btn-shine {
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(120deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: shine 3s infinite;
        }
        @keyframes shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        .btn-free-trial {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 13px 26px;
          border-radius: 14px;
          font-size: 15px;
          font-weight: 800;
          color: #fff;
          border: 1px solid rgba(255,255,255,0.1);
          transition: all 0.2s ease;
        }
        .btn-free-trial:hover {
          transform: translateY(-2px);
          filter: brightness(1.1);
        }
        .timeline-container {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        @media (max-width: 768px) { .timeline-container { grid-template-columns: 1fr; } }
        .timeline-card {
          padding: 32px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 20px;
          display: flex;
          gap: 20px;
          transition: all 0.3s ease;
        }
        .timeline-card:hover {
          background: rgba(255,255,255,0.05);
          border-color: rgba(108,79,255,0.3);
          transform: translateY(-5px);
        }
        .timeline-icon {
          font-size: 32px;
          flex-shrink: 0;
        }
        .timeline-content h3 {
          font-size: 18px;
          font-weight: 800;
          margin-bottom: 8px;
          color: #fff;
        }
        .timeline-content p {
          font-size: 14px;
          color: rgba(255,255,255,0.6);
          line-height: 1.6;
        }
        .no-break {
          white-space: nowrap;
        }
        @media (max-width: 1024px) { .no-break { white-space: normal; } }
      `}</style>
    </>
  );
}
