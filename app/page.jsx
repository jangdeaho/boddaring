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
        this.alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;
        if (this.life >= this.maxLife || this.x > W + 100 || this.y > H + 100) {
          this.reset();
        }
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

      /* 별 */
      stars.forEach((s) => {
        const a = s.a * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${a})`;
        ctx.fill();
      });

      /* 별똥별 */
      meteors.forEach((m) => {
        m.update();
        m.draw(ctx);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      stars.forEach((s) => {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [contactTab, setContactTab] = useState("inquiry"); // inquiry, development
  const [formData, setFormData] = useState({
    email: "",
    telegram: "",
    message: "",
  });
  const [devFormData, setDevFormData] = useState({
    email: "",
    telegram: "",
    program: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [devFormStatus, setDevFormStatus] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const [devFormErrors, setDevFormErrors] = useState({});
  const [emailjsReady, setEmailjsReady] = useState(false);
  const serviceRef = useRef(null);

  /* 스크롤 감지 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 드롭다운 외부 클릭 감지 */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* Scroll Reveal */
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("on");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* EmailJS 초기화 */
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!pk) return;
    emailjs.init(pk);
    setEmailjsReady(true);
  }, []);

  /* 폼 검증 */
  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = true;
    if (!formData.telegram.trim()) errs.telegram = true;
    return errs;
  };

  /* 폼 제출 — 일반 문의 */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    setFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_INQUIRY || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS env missing");
      }
      await emailjs.send(serviceId, templateId, {
        from_email: formData.email,
        telegram_id: formData.telegram,
        message: formData.message || "(메시지 없음)",
        to_email: "boddaring@endholdings.com",
      });
      setFormStatus("sent");
      setFormData({ email: "", telegram: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  /* 폼 제출 — 개발 문의 */
  const handleDevSubmit = async (e) => {
    e.preventDefault();
    if (!devFormData.email.trim() || !devFormData.telegram.trim()) {
      setDevFormErrors({ 
        email: !devFormData.email.trim(), 
        telegram: !devFormData.telegram.trim() 
      });
      return;
    }
    setDevFormErrors({});
    setDevFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2; 
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DEVELOPMENT;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS env missing");
      }
      await emailjs.send(serviceId, templateId, {
        from_email: devFormData.email,
        telegram_id: devFormData.telegram,
        program_request: devFormData.program || "(내용 없음)",
        to_email: "development@endholdings.com",
      });
      setDevFormStatus("sent");
      setDevFormData({ email: "", telegram: "", program: "" });
      setTimeout(() => setDevFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setDevFormStatus("error");
    }
  };

  return (
    <div className="main-wrapper">
      <StarCanvas />

      {/* 배경 성운 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* ── 네비게이션 ── */}
      <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* Brand */}
            <Link href="/" className="brand">
              <img src="/icon.png" alt="BODDARING" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">BODDARING</span>
                <span className="brand-sub">아비트라지 데이터 플랫폼</span>
              </div>
            </Link>

            {/* Desktop Links */}
            <div className="nav-links">
              <div className="nav-item-wrap" ref={serviceRef}>
                <button 
                  className={`nav-link ${serviceOpen ? "active" : ""}`}
                  onMouseEnter={() => setServiceOpen(true)}
                  onClick={() => setServiceOpen(!serviceOpen)}
                >
                  서비스 <span style={{ fontSize: "10px", marginLeft: "4px" }}>▼</span>
                </button>
                {serviceOpen && (
                  <div className="dropdown-menu" onMouseLeave={() => setServiceOpen(false)}>
                    <a href="#signal" className="dropdown-item">
                      <div className="dropdown-item-title">시그널 소개</div>
                      <div className="dropdown-item-desc">초 단위 실시간 시세 차익 알림</div>
                    </a>
                    <a href="#exchanges" className="dropdown-item">
                      <div className="dropdown-item-title">연동 거래소</div>
                      <div className="dropdown-item-desc">국내외 20+ 주요 거래소 실시간 연동</div>
                    </a>
                    <a href="#bot" className="dropdown-item">
                      <div className="dropdown-item-title">BOT 소개</div>
                      <div className="dropdown-item-desc">자동화 거래 및 전략 실행 솔루션</div>
                    </a>
                    <a href="#contact" className="dropdown-item">
                      <div className="dropdown-item-title">문의하기</div>
                      <div className="dropdown-item-desc">서비스 이용 및 개발 컨설팅 문의</div>
                    </a>
                  </div>
                )}
              </div>
              <Link href="/learn" className="nav-link nav-learn-link">
                더 알아보기
                <span className="nav-learn-badge">!</span>
              </Link>
            </div>

            {/* CTA */}
            <div className="nav-cta">
              <Link href="/apply" className="btn-free-nav">
                무료체험 신청하기 🚀
                <span className="shine"></span>
              </Link>
              <Link href="/apply" className="btn-apply">
                신청하기 <span className="arrow">→</span>
              </Link>
              {/* Mobile Hamburger */}
              <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="mobile-menu open">
          <button className="mobile-nav-link" onClick={() => { setMobileServiceOpen(!mobileServiceOpen); }}>
            서비스 {mobileServiceOpen ? "▲" : "▼"}
          </button>
          {mobileServiceOpen && (
            <div className="mobile-sub-menu">
              <a href="#signal" onClick={() => setMenuOpen(false)}>시그널 소개</a>
              <a href="#exchanges" onClick={() => setMenuOpen(false)}>연동 거래소</a>
              <a href="#bot" onClick={() => setMenuOpen(false)}>BOT 소개</a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>문의하기</a>
            </div>
          )}
          <Link href="/learn" className="mobile-nav-link" onClick={() => setMenuOpen(false)}>더 알아보기</Link>
          <Link href="/apply" className="btn-apply" onClick={() => setMenuOpen(false)}>신청하기</Link>
        </div>
      )}

      {/* ── 히어로 섹션 ── */}
      <section className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left reveal">
              <div className="hero-label">
                <span className="hero-badge-dot"></span>
                실시간 시세차익 데이터 수집·구조화 끝판왕
              </div>
              <h1 className="hero-title">
                거래소 간 <span className="hero-grad">시세 차익</span>을<br />
                <span className="no-break">한눈에, 빠르게!</span><br />
                <span className="line2 hero-title-animated">데이터수집의 새로운 기준</span>
              </h1>
              <p className="hero-desc">
                수많은 아비트라지 사이트들, 그동안 실망만 하셨나요? <span className="highlight">단 하루면 충분합니다.</span><br />
                타 서비스와는 차원이 다른 압도적인 데이터 수집 속도와 정교한 계산 엔진을 직접 경험해 보세요.<br />
                <span className="led-text">지금 바로 24시간 무료 체험</span>으로 당신의 수익 구조를 혁신하십시오.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn-primary">지금 문의하기</a>
                <Link href="/apply" className="btn-free-trial">
                  24시간 무료체험 신청하기 🚀
                  <span className="shine"></span>
                </Link>
              </div>

              <div className="hero-bottom-info">
                {/* Real-Time Badge (LIVE Signal 테마 통일) */}
                <div className="badge-live">
                  <span className="dot-live"></span>
                  Real-Time Data Acquisition
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-val">15<span className="unit">+</span></span>
                    <span className="hero-stat-label">연동 거래소</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">10,000<span className="unit">+</span></span>
                    <span className="hero-stat-label">추적 코인</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">1<span className="unit">초</span></span>
                    <span className="hero-stat-label">시그널 갱신 주기</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">300,000<span className="unit">회</span></span>
                    <span className="hero-stat-label">종목·페어 초당 계산</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right reveal">
              <div className="hero-video-wrap">
                <div className="hero-video-badge">
                  <span className="live-dot"></span>
                  LIVE Signal
                </div>
                <div className="hero-video-placeholder">
                  <div className="video-icon">▶</div>
                  <div className="video-label">소개 영상 넣을자리</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 아비트라지 소개 ── */}
      <section id="signal" className="section">
        <div className="container">
          <div className="section-head center reveal">
            <span className="section-label">Arbitrage Data</span>
            <h2 className="section-title">아비트라지의 모든 것, BODDARING</h2>
            <p className="section-desc">
              차트 분석 없이도 가격 격차 구간을 직관적으로 확인할 수 있습니다.
            </p>
          </div>

          <div className="timeline-wrap reveal">
            <div className="timeline-card">
              <div className="timeline-icon-box">📡</div>
              <div className="timeline-content">
                <h3>실시간 데이터 수집</h3>
                <p>공개 오더북 데이터를 초 단위로 수집하여 지연 없는 정보를 제공합니다.</p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-icon-box">🧮</div>
              <div className="timeline-content">
                <h3>비용 반영 계산 시스템</h3>
                <p>수수료, 환율, 슬리피지를 반영한 정밀한 계산값을 표시합니다. (투자 수익 보장을 의미하지 않습니다.)</p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-icon-box">📊</div>
              <div className="timeline-content">
                <h3>오더북 기반 유동성 분석</h3>
                <p>단순 체결가가 아닌, 실제 체결 가능 범위 기준의 호가 데이터를 제공합니다.</p>
              </div>
            </div>
            <div className="timeline-card">
              <div className="timeline-icon-box">⚙️</div>
              <div className="timeline-content">
                <h3>사용자 조건 필터</h3>
                <p>Per(격차 비율) 및 Amount(거래 규모) 필터링을 통해 원하는 시그널만 선별합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 데이터 경쟁력 ── */}
      <section className="section" style={{ background: "rgba(255,255,255,0.01)" }}>
        <div className="container">
          <div className="section-head reveal">
            <span className="section-label">Data Efficiency</span>
            <h2 className="section-title">데이터가 곧 경쟁력입니다</h2>
            <p className="section-desc">
              아비트라지는 속도와 정보의 싸움입니다. BODDARING은 대한민국 최고의 데이터 처리 기술로 기회를 극대화합니다.
            </p>
          </div>

          <div className="feature-grid reveal">
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>초고속 수집 엔진</h3>
              <p>초당 수십만 개의 데이터 포인트를 처리하는 분산 수집 아키텍처를 보유하고 있습니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🛡️</div>
              <h3>안정적인 인프라</h3>
              <p>24시간 중단 없는 서버 모니터링으로 중요한 기회를 놓치지 않도록 보장합니다.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>개인 텔레그램 알림</h3>
              <p>설정한 조건에 부합하는 시그널을 개인 텔레그램 봇으로 즉시 발송합니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── BOT 소개 ── */}
      <section id="bot" className="section">
        <div className="container">
          <div className="bot-intro-grid">
            <div className="bot-img-wrap reveal">
              <img src="/bot-2.png" alt="BODDARING BOT" className="bot-img" />
            </div>
            <div className="bot-info reveal">
              <span className="section-label">Execution Solution</span>
              <h2 className="section-title">아비트라지에 날개를 더하는 BOT</h2>
              <p className="section-desc" style={{ marginBottom: "32px" }}>
                데이터 수집을 넘어, 실행까지 자동화하십시오. BODDARING 전용 BOT은 복잡한 주문 실행을 한 번의 설정으로 처리합니다.
              </p>
              <ul className="bot-features">
                <li><span>✓</span> 국내/해외 동시 주문 실행 엔진</li>
                <li><span>✓</span> 잔고 실시간 모니터링 및 자동 밸런싱</li>
                <li><span>✓</span> 사용자 정의 리스크 관리 알고리즘</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── 연동 거래소 ── */}
      <section id="exchanges" className="exchange-section">
        <div className="container">
          <div className="section-head center reveal">
            <span className="section-label">Global Connectivity</span>
            <h2 className="section-title">20+ 글로벌 주요 거래소 실시간 연동</h2>
            <p className="section-desc">
              BODDARING은 국내외 모든 주요 거래소의 API를 공식적으로 지원하며, 가장 정확한 오더북 데이터를 제공합니다.
            </p>
          </div>
        </div>

        <div className="exchange-marquee-container reveal">
          <div className="marquee-track">
            {[...EXCHANGES, ...EXCHANGES].map((ex, idx) => (
              <div key={idx} className="exchange-chip">
                <img src={`/exchanges/${ex.logo}`} alt={ex.name} className="chip-logo" />
                <span className="chip-name">{ex.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="container" style={{ marginTop: "40px" }}>
          <p className="disclaimer-en">
            * This site is an independent information platform utilizing public API data and has no official partnership with each exchange. All trademarks belong to their respective owners.
            <br />
            * This service does not solicit or broker the sale of financial investment products. As an information provision platform, it assumes no legal responsibility for investment results.
          </p>
          <p className="disclaimer-ko">
            본 사이트는 각 거래소와 공식적인 제휴 관계가 없으며, 공개 API 기반 데이터를 활용한 독립적인 정보 제공 플랫폼입니다. 각 상표는 해당 권리자에게 귀속됩니다.
            <br />
            본 서비스는 금융투자상품의 매매를 권유하거나 중개하지 않습니다. 정보 제공 플랫폼으로서 투자 결과에 대한 법적 책임을 지지 않습니다.
          </p>
        </div>
      </section>

      {/* ── 문의하기 ── */}
      <section id="contact" className="section" style={{ background: "rgba(10,11,26,0.5)" }}>
        <div className="container">
          <div className="section-head center reveal">
            <span className="section-label">Contact Us</span>
            <h2 className="section-title">방향성보다 구조를 보십시오</h2>
            <p className="section-desc">
              BODDARING과 함께 데이터 기반의 안정적인 수익 구조를 설계하십시오.
            </p>
          </div>

          <div className="contact-tabs reveal">
            <button 
              className={`contact-tab-btn ${contactTab === "inquiry" ? "active" : ""}`}
              onClick={() => setContactTab("inquiry")}
            >
              일반 문의하기
            </button>
            <button 
              className={`contact-tab-btn ${contactTab === "development" ? "active" : ""}`}
              onClick={() => setContactTab("development")}
            >
              개발 컨설팅 문의
            </button>
          </div>

          <div className="contact-form reveal">
            {contactTab === "inquiry" ? (
              <form onSubmit={handleSubmit}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "24px", textAlign: "center" }}>
                  궁금한 점이 있으시면 아래 양식을 통해 문의해 주세요. 최대한 빠르게 답변 드리겠습니다.
                </p>
                <div className="form-group">
                  <label className="form-label">이메일 주소</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                  {formErrors.email && <span style={{color: "#ef4444", fontSize: "12px"}}>올바른 이메일을 입력해주세요.</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">텔레그램 ID</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="@username"
                    value={formData.telegram}
                    onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                  />
                  {formErrors.telegram && <span style={{color: "#ef4444", fontSize: "12px"}}>텔레그램 ID를 입력해주세요.</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">문의 내용</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="궁금하신 내용을 입력해 주세요."
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-send" disabled={formStatus === "sending"}>
                  {formStatus === "sending" ? "전송 중..." : "문의하기 제출"}
                </button>
                {formStatus === "sent" && <p style={{color: "#10b981", marginTop: "16px", textAlign: "center"}}>문의가 성공적으로 전송되었습니다!</p>}
                <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  또는 <a href="mailto:boddaring@endholdings.com" style={{ color: "#7c3aed", textDecoration: "underline" }}>boddaring@endholdings.com</a> 으로 문의주세요.
                </div>
              </form>
            ) : (
              <form onSubmit={handleDevSubmit}>
                <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", marginBottom: "24px", textAlign: "center" }}>
                  전문적인 투자 프로그램 개발이 필요하신가요? 맞춤형 솔루션을 제공해 드립니다.
                </p>
                <div className="form-group">
                  <label className="form-label">이메일 주소</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="example@email.com"
                    value={devFormData.email}
                    onChange={(e) => setDevFormData({...devFormData, email: e.target.value})}
                  />
                  {devFormErrors.email && <span style={{color: "#ef4444", fontSize: "12px"}}>이메일을 입력해주세요.</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">텔레그램 ID</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="@username"
                    value={devFormData.telegram}
                    onChange={(e) => setDevFormData({...devFormData, telegram: e.target.value})}
                  />
                  {devFormErrors.telegram && <span style={{color: "#ef4444", fontSize: "12px"}}>텔레그램 ID를 입력해주세요.</span>}
                </div>
                <div className="form-group">
                  <label className="form-label">프로그램 개발 요청사항</label>
                  <textarea 
                    className="form-textarea" 
                    rows="4" 
                    placeholder="개발 컨설팅 비용은 500만원이며, 프로그램 제작은 최소 천만원부터 시작합니다. 컨설팅 이후 프로그램 제작 확정 시 총액에서 컨설팅 비용은 차감합니다."
                    value={devFormData.program}
                    onChange={(e) => setDevFormData({...devFormData, program: e.target.value})}
                  ></textarea>
                </div>
                <button type="submit" className="btn-send" disabled={devFormStatus === "sending"}>
                  {devFormStatus === "sending" ? "전송 중..." : "개발 컨설팅 신청"}
                </button>
                {devFormStatus === "sent" && <p style={{color: "#10b981", marginTop: "16px", textAlign: "center"}}>신청이 성공적으로 전송되었습니다!</p>}
                <div style={{ marginTop: "24px", textAlign: "center", fontSize: "13px", color: "rgba(255,255,255,0.4)" }}>
                  또는 <a href="mailto:development@endholdings.com" style={{ color: "#7c3aed", textDecoration: "underline" }}>development@endholdings.com</a> 으로 문의주세요.
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="footer">
        <div className="container">
          <img src="/icon.png" alt="BODDARING" style={{ width: "32px", height: "32px", margin: "0 auto 20px" }} />
          <p className="footer-text">
            © 2026 BODDARING. All rights reserved.
            <br />
            본 플랫폼의 모든 데이터는 참고용이며, 투자 결과에 대한 책임은 사용자 본인에게 있습니다.
          </p>
        </div>
      </footer>

      <style jsx>{`
        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          background: rgba(10, 11, 26, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 12px;
          margin-top: 12px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          z-index: 1000;
        }
        .dropdown-item {
          display: block;
          padding: 12px 16px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.2s;
        }
        .dropdown-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        .dropdown-item-title {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin-bottom: 2px;
        }
        .dropdown-item-desc {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.4);
        }
        .disclaimer-en, .disclaimer-ko {
          font-size: 12px;
          color: rgba(255, 255, 255, 0.3);
          line-height: 1.6;
          margin-top: 12px;
        }
        .feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          margin-top: 48px;
        }
        @media (max-width: 768px) { .feature-grid { grid-template-columns: 1fr; } }
        .feature-card {
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.3s;
        }
        .feature-icon { font-size: 32px; margin-bottom: 20px; }
        .feature-card h3 { font-size: 18px; font-weight: 800; margin-bottom: 12px; color: #fff; }
        .feature-card p { font-size: 14px; color: rgba(255, 255, 255, 0.5); line-height: 1.6; }
        .bot-intro-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
        }
        @media (max-width: 1024px) { .bot-intro-grid { grid-template-columns: 1fr; text-align: center; } }
        .bot-img { width: 100%; border-radius: 24px; box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4); }
        .bot-features { list-style: none; padding: 0; }
        .bot-features li { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; font-size: 16px; color: rgba(255, 255, 255, 0.7); }
        @media (max-width: 1024px) { .bot-features li { justify-content: center; } }
        .bot-features li span { color: #7c3aed; font-weight: 900; }
      `}</style>
    </div>
  );
}
