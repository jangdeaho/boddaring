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
  const [contactTab, setContactTab] = useState("inquiry");
  const [formData, setFormData] = useState({ email: "", telegram: "", message: "" });
  const [devFormData, setDevFormData] = useState({ email: "", telegram: "", program: "" });
  const [formStatus, setFormStatus] = useState("idle");
  const [devFormStatus, setDevFormStatus] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const [devFormErrors, setDevFormErrors] = useState({});

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("on"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.telegram.trim()) {
      setFormErrors({ email: !formData.email.trim(), telegram: !formData.telegram.trim() });
      return;
    }
    setFormErrors({});
    setFormStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_INQUIRY,
        { from_email: formData.email, telegram_id: formData.telegram, message: formData.message || "(메시지 없음)", to_email: "boddaring@endholdings.com" },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
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
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DEVELOPMENT,
        { from_email: devFormData.email, telegram_id: devFormData.telegram, program_request: devFormData.program || "(내용 없음)", to_email: "development@endholdings.com" },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setDevFormStatus("sent");
      setDevFormData({ email: "", telegram: "", program: "" });
      setTimeout(() => setDevFormStatus("idle"), 5000);
    } catch (error) { setDevFormStatus("error"); }
  };

  return (
    <div className="main-wrapper">
      <StarCanvas />
      <div className="nebula-wrap">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container navbar-inner">
          <Link href="/" className="brand">
            <img src="/doge.png" alt="BODDARING" className="brand-icon" />
            <div className="brand-text">
              <span className="brand-name">BODDARING</span>
              <span className="brand-sub">아비트라지 데이터 플랫폼</span>
            </div>
          </Link>

          <div className="nav-links">
            <div className="nav-item-dropdown">
              <button className="nav-link">서비스</button>
              <div className="dropdown-menu">
                <a href="#signal" className="dropdown-item">
                  <span className="dropdown-title">시그널 소개</span>
                  <span className="dropdown-desc">실시간 차익 신호 시스템</span>
                </a>
                <a href="#exchanges" className="dropdown-item">
                  <span className="dropdown-title">연동 거래소</span>
                  <span className="dropdown-desc">글로벌 24개 거래소 데이터</span>
                </a>
                <a href="#bot" className="dropdown-item">
                  <span className="dropdown-title">BOT 소개</span>
                  <span className="dropdown-desc">자동화 매매 솔루션</span>
                </a>
              </div>
            </div>
            
            <div className="nav-item-dropdown">
              <button className="nav-link">더 알아보기!</button>
              <div className="dropdown-menu">
                <Link href="/learn#arbitrage" className="dropdown-item">
                  <span className="dropdown-title">아비트라지란?</span>
                  <span className="dropdown-desc">무위험 차익 거래의 원리</span>
                </Link>
                <Link href="/learn#kimpremium" className="dropdown-item">
                  <span className="dropdown-title">김프 매매란?</span>
                  <span className="dropdown-desc">국내외 가격차 활용 전략</span>
                </Link>
                <Link href="/learn#data" className="dropdown-item">
                  <span className="dropdown-title">데이터 수집 방법</span>
                  <span className="dropdown-desc">초단위 데이터 처리 기술</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="nav-cta">
            <Link href="/trial" className="btn-free-trial-nav">무료체험 신청하기 🚀</Link>
            <Link href="/apply" className="btn-apply">신청하기 <span className="arrow">→</span></Link>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-left reveal">
            <div className="neon-badge">
              <span className="hero-badge-dot" />
              Real-Time Data Acquisition
            </div>
            <h1 className="hero-title">
              거래소 간 <span className="hero-grad">시세 차익</span>을<br />한눈에, 빠르게!<br />
              <span className="hero-title-animated">데이터수집의 새로운 기준</span>
            </h1>
            <p className="hero-desc">
              수많은 아비트라지 서비스들, 그동안 실망만 하셨나요?<br />
              국내·해외 거래소에 상장된 모든 코인의 데이터를 수집하여 가격을 비교해 차익을 계산하고, 실행 가능한 기회만 선별해 초 단위로 시그널을 제공합니다.<br />
              차원이 다른 압도적인 데이터 수집 속도와 정교한 계산 시스템을 직접 경험해 보세요!<br />
              <span className="highlight">단 하루면 충분합니다! 지금 바로 24시간 무료 체험으로 체험해 보세요!</span>
            </p>
            <div className="hero-actions">
              <a href="#contact" className="btn-primary">지금 문의하기</a>
              <Link href="/trial" className="btn-outline">24시간 무료체험 신청하기 🚀</Link>
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
            </div>
          </div>

          <div className="hero-right reveal">
            <div className="hero-video-wrap">
              <div className="hero-video-placeholder">
                <div className="neon-badge" style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 10 }}>
                  <span className="hero-badge-dot" />
                  LIVE Signal
                </div>
                <video src="/hero-video.mp4" autoPlay loop muted playsInline />
                <div className="video-icon">▶</div>
                <span className="video-label">소개 영상 넣을자리</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="signal" className="container reveal" style={{ padding: '100px 0' }}>
        <h2 className="hero-title" style={{ textAlign: 'center', fontSize: '36px' }}>아비트라지의 모든 것, BODDARING</h2>
        <div className="timeline-grid">
          <div className="timeline-card">
            <span className="timeline-icon">📊</span>
            <h3 className="timeline-title">실시간 데이터 수집</h3>
            <p className="timeline-desc">공개 오더북 데이터를 초 단위로 수집하여 가장 빠른 기회를 포착합니다.</p>
          </div>
          <div className="timeline-card">
            <span className="timeline-icon">🧮</span>
            <h3 className="timeline-title">비용 반영 계산 시스템</h3>
            <p className="timeline-desc">수수료, 환율, 슬리피지를 반영한 정밀한 계산값을 제공합니다.</p>
          </div>
          <div className="timeline-card">
            <span className="timeline-icon">📈</span>
            <h3 className="timeline-title">오더북 기반 유동성 분석</h3>
            <p className="timeline-desc">실제 체결 가능한 범위 기준의 신뢰도 높은 가격 데이터를 제공합니다.</p>
          </div>
          <div className="timeline-card">
            <span className="timeline-icon">🔍</span>
            <h3 className="timeline-title">사용자 조건 필터</h3>
            <p className="timeline-desc">격차 비율(Per) 및 거래 규모(Amount) 등 맞춤형 필터링을 지원합니다.</p>
          </div>
        </div>
      </section>

      <section id="exchanges" className="exchange-section">
        <div className="exchange-track">
          {[...EXCHANGES, ...EXCHANGES].map((ex, i) => (
            <div key={i} className="exchange-item">
              <img src={`/exchanges/${ex.logo}`} alt={ex.name} className="exchange-logo" />
              <span className="exchange-name">{ex.name}</span>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="container reveal" style={{ padding: '100px 0' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '12px', marginBottom: '32px', justifyContent: 'center' }}>
            <button className={`tab-btn ${contactTab === "inquiry" ? "active" : ""}`} onClick={() => setContactTab("inquiry")}>일반 문의하기</button>
            <button className={`tab-btn ${contactTab === "development" ? "active" : ""}`} onClick={() => setContactTab("development")}>프로그램 개발 문의</button>
          </div>

          {contactTab === "inquiry" ? (
            <form onSubmit={handleSubmit} className="contact-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="email" placeholder="이메일 주소" className="form-input" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <input type="text" placeholder="텔레그램 ID" className="form-input" value={formData.telegram} onChange={(e) => setFormData({...formData, telegram: e.target.value})} />
              </div>
              <textarea placeholder="궁금하신 내용을 입력해 주세요." className="form-input" style={{ minHeight: '150px' }} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                {formStatus === "sending" ? "전송 중..." : formStatus === "sent" ? "전송 완료!" : "문의하기"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleDevSubmit} className="contact-form">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                <input type="email" placeholder="이메일 주소" className="form-input" value={devFormData.email} onChange={(e) => setDevFormData({...devFormData, email: e.target.value})} />
                <input type="text" placeholder="텔레그램 ID" className="form-input" value={devFormData.telegram} onChange={(e) => setDevFormData({...devFormData, telegram: e.target.value})} />
              </div>
              <textarea placeholder="개발 컨설팅 비용은 500만원이며, 프로그램 제작은 최소 천만원부터 시작합니다." className="form-input" style={{ minHeight: '150px' }} value={devFormData.program} onChange={(e) => setDevFormData({...devFormData, program: e.target.value})} />
              <button type="submit" className="btn-primary" style={{ width: '100%', marginTop: '16px' }}>
                {devFormStatus === "sending" ? "전송 중..." : devFormStatus === "sent" ? "전송 완료!" : "개발 문의하기"}
              </button>
            </form>
          )}
        </div>
      </section>

      <footer className="container" style={{ padding: '60px 0', borderTop: '1px solid var(--stroke)', textAlign: 'center' }}>
        <p style={{ color: var(--muted2), fontSize: '13px' }}>
          본 사이트는 각 거래소와 공식적인 제휴 관계가 없으며, 공개 API 기반 데이터를 활용한 독립적인 정보 제공 플랫폼입니다.<br />
          This service does not solicit or broker the sale of financial investment products. © BODDARING All rights reserved.
        </p>
      </footer>

      <style jsx>{`
        .main-wrapper { position: relative; z-index: 1; }
        .contact-form { background: rgba(255,255,255,0.03); padding: 40px; border-radius: 24px; border: 1px solid var(--stroke); }
        .form-input { width: 100%; padding: 14px 20px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--stroke); color: #fff; font-size: 15px; outline: none; transition: all 0.2s; }
        .form-input:focus { border-color: var(--accent); background: rgba(255,255,255,0.08); }
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
        .reveal.on { opacity: 1; transform: translateY(0); }
      `}</style>
    </div>
  );
}
