"use client";
import emailjs from "@emailjs/browser"
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

/* ── 거래소 데이터 (이미지 로고 준비) ── */
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

    /* 정적 별 */
    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    /* 별똥별 */
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
        /* 헤드 글로우 */
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

/* ── 메인 컴포넌트 ── */
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ email: "", telegram: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");
  const [emailjsReady, setEmailjsReady] = useState(false);

  /* 스크롤 감지 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!pk) {
      console.error("Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
      return;
    }
  
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

  /* 폼 제출 */
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
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey  = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS env missing (SERVICE_ID / TEMPLATE_ID / PUBLIC_KEY)");
      }
  
      // (권장) init을 useEffect에서 해도 되지만, 안전하게 여기서도 보장 가능
      // emailjs.init(publicKey);
  
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_email: formData.email,
          telegram_id: formData.telegram,
          message: formData.message || "(메시지 없음)",
          name: "BODDARING 문의",
        },
      );
  
      setFormStatus("sent");
      setFormData({ email: "", telegram: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors((p) => ({ ...p, [field]: false }));
  };

  const isSubmitDisabled =
    !emailjsReady ||
    !formData.email.trim() ||
    !formData.telegram.trim() ||
    formStatus === "sending";

  /* 거래소 무한 스크롤용 복제 */
  const doubledExchanges = [...EXCHANGES, ...EXCHANGES];

  return (
    <>
      {/* ── 배경 ── */}
      <StarCanvas />
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* ── 네비게이션 ── */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            {/* 브랜드 */}
            <a href="#top" className="brand">
              <img src="/icon.png" alt="BODDARING" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">BODDARING</span>
                <span className="brand-sub">대한민국 최고 아비트라지 플랫폼</span>
              </div>
            </a>

            {/* 데스크탑 네비 */}
            <div className="nav-links">
              <a href="#signal" className="nav-link">시그널 소개</a>
              <a href="#exchanges" className="nav-link">연동 거래소</a>
              <a href="#bot" className="nav-link">BOT 소개</a>
              <a href="#contact" className="nav-link">문의하기</a>
            </div>

            {/* CTA */}
            <div className="nav-cta">
              <Link href="/apply" className="btn-apply">
                신청하기 <span className="arrow">→</span>
              </Link>
            </div>

            {/* 모바일 햄버거 */}
            <button
              className="hamburger"
              aria-label="메뉴"
              onClick={() => setMenuOpen((p) => !p)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      {/* 모바일 메뉴 */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <a href="#signal" className="nav-link" onClick={() => setMenuOpen(false)}>시그널 소개</a>
        <a href="#exchanges" className="nav-link" onClick={() => setMenuOpen(false)}>연동 거래소</a>
        <a href="#bot" className="nav-link" onClick={() => setMenuOpen(false)}>BOT 소개</a>
        <a href="#contact" className="nav-link" onClick={() => setMenuOpen(false)}>문의하기</a>
        <Link href="/apply" className="btn-apply" onClick={() => setMenuOpen(false)}>
          신청하기 →
        </Link>
      </div>

      {/* ── 히어로 섹션 ── */}
      <section id="top" className="hero">
        <div className="container">
          <div className="hero-grid">
            {/* 좌측 */}
            <div className="hero-left reveal">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                실시간 시세차익 데이터 수집 · 구조화 끝판왕
              </div>

              <h1 className="hero-title">
                거래소 간{" "}
                <span className="hero-grad">시세 차익</span>을
                <br />
                한눈에, 빠르게!
                <span className="line2">데이터수집의 새로운 기준</span>
              </h1>

              <p className="hero-desc">
                국내·해외 거래소에 상장된 모든 코인의 데이터를 수집하여
                가격을 비교해 차익을 계산하고, 실행 가능한 기회만 선별해{" "}
                <span className="pulse">초 단위로 시그널</span>을 제공합니다.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn-primary">
                  지금 문의하기
                </a>
                <a href="#signal" className="btn-outline">
                  시그널 화면 보기
                </a>
                <br />
                <div>
                  <div className="real-time-badge">
                    <span className="real-dot" />
                    Real-Time Data Acquisition
                  </div>
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
                  <span className="hero-stat-val">300,000<span className="unit"> 회⤴</span></span>
                  <span className="hero-stat-label">종목·페어 초당 계산</span>
                </div>
              </div>
            </div>

            {/* 우측 — 영상 영역 */}
            <div className="hero-right reveal reveal-delay-2">
              <div className="hero-video-wrap">
                <div className="hero-video-badge">
                  <span className="live-dot" />
                  LIVE Signal
                </div>
                <div className="hero-video-placeholder">
                  <div className="video-icon">▶</div>
                  <span className="video-label">소개 영상 넣을자리</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 연동 거래소 섹션 ── */}
      <section id="exchanges" className="exchange-section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Supported Exchanges</div>
            <h2 className="section-title">연동된 거래소</h2>
            <p className="section-desc">
              BODDARING은 단순히 많은 거래소를 나열하지 않습니다.<br />
              국내외 주요 거래소를 대부분 연동하였으며, 유의미한 차익 신호 선별을 위해<br />
              거래량이 낮거나 신뢰도가 떨어지는 거래소는 제외하고 있습니다.<br />
              데이터 완성도를 높이기 위해 필요한 거래소는 지속적으로 추가됩니다.
            </p>
          </div>
        </div>
        <div className="exchange-track-wrap">
          <div className="exchange-track">
            {doubledExchanges.map((ex, i) => (
              <div className="exchange-chip" key={i}>
                <img
                  src={`/exchanges/${ex.logo}`}
                  alt={ex.name}
                  className="ex-logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
                <span
                  className="ex-icon-fallback"
                  style={{ background: ex.color + "22", color: ex.color, border: `1px solid ${ex.color}44`, display: "none" }}
                >
                  {ex.name.charAt(0)}
                </span>
                {ex.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 시그널 소개 섹션 ── */}
      <section id="signal" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">Signal Intelligence</div>
            <h2 className="section-title">
              아비트라지의 모든 것,<br />
              <span className="hero-grad">BODDARING</span>이 정리합니다.
            </h2>
            <p className="section-desc">
              거래소 간 가격 비교를 자동화하여, 차트 분석 없이도 기회를 잡을 수 있습니다. BODDARING은 실제로 수익이 나는 순간만 정확하게 포착합니다.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">📡</div>
              <h3>실시간 데이터 수집</h3>
              <p>
                국내외 주요 거래소별 전종목 오더북 데이터를 초 단위로 수집합니다. 실제 체결 가능한 가격 기준의 유동성 데이터만을 반영합니다.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">⚡</div>
              <h3>정밀 차익 계산 시스템</h3>
              <p>
                수수료, 환율, 슬리피지까지 반영하여 실질 순수익 기준의 아비트라지 기회만을 선별합니다.
                - 종목별 최종거래가 기준으로 시그널이 발생하는 것이 아닌 100% 실시간 호가창 비교를 통해 Amount를 표기하며, Amount만큼의 수익률 계산 공식이 작동됩니다.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">🎯</div>
              <h3>호가 스카우터</h3>
              <p>
                거래소 간 차익 시그널과 함께 From 거래소의 평균 매수가와 To 거래소의 현재가를 실시간으로 비교 제공합니다.
                국내·해외 간 아비트라지 발생 시 평단가 계산 없이 To 거래소에 맞춰 평단가를 표기하여 즉시 수익 판단이 가능합니다.
              </p>
            </div>
            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">🤖</div>
              <h3>커스터마이징 필터</h3>
              <p>
                최소 Per(수익률) 및 Amount(거래 규모)를 직접 설정하여 원하는 조건의 시그널만 확인할 수 있습니다.
                거래소 및 거래 페어 필터도 자유롭게 구성 가능합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 사이트 상세 소개 ── */}
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            {/* 좌측 — 영상 */}
            <div className="reveal">
              <div className="about-video-wrap">
                <div className="about-video-placeholder">
                  <div className="video-icon">▶</div>
                  <span className="video-label">상세 소개 영상</span>
                </div>
              </div>
            </div>

            {/* 우측 — 설명 */}
            <div className="reveal reveal-delay-1">
              <div className="section-label">Why BODDARING</div>
              <h2 className="section-title">
                데이터가 곧 <span className="hero-grad">경쟁력</span>입니다.
              </h2>
              <p className="section-desc">
                아비트라지는 속도와 정보의 싸움입니다.<br />
                BODDARING은 대한민국 최고 수준의 데이터 수집 인프라로 여러분의 경쟁력을 극대화합니다.
              </p>

              <div className="check-list">
                <div className="check-item">
                  압도적인 데이터 수집<br />
                    └─ 연동 거래소내에 상장된 모든 코인 호가를 1초 단위로 실시간 데이터 수집 및 비교 
                </div>              
                <div className="check-item">
                  테더(USDT) 실거래 환율 기반 프리미엄 계산<br />
                    └─ 단순 원·달러 환율이 아닌 비트코인 환율 기반 실질 수익 기준 반영
                </div>              
                <div className="check-item">
                  오더북 유동성 기반 실행 가능성 검증<br />
                    └─ 표시되는 단순 퍼센트 수치가 아닌 실제 체결 가능한 기회만 선별
                </div>              
                <div className="check-item">
                  입출금 상태 실시간 모니터링<br />
                    └─ 차익 발생 시 즉시 실행 가능한 환경인지 사전 확인
                </div>              
                <div className="check-item">
                  텔레그램 프라이빗 알림 시스템<br />
                    └─ 개인 봇 설정을 통한 안전하고 독립적인 시그널 관리
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── BOT 소개 섹션 ── */}
      <section id="bot" className="bot-section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Automation</div>
            <h2 className="section-title">
              아비트라지에 <span className="hero-grad">날개를 더하는 BOT</span>
            </h2>
            <p className="section-desc">
              사용자 편의성을 최우선으로 고려한 보조 프로그램을 제공합니다.<br />
              프라이빗한 텔레그램 알림부터 실전 매매 흐름에 최적화된 자동화 기능까지 제공합니다.
            </p>
          </div>

          <div className="bot-grid">
            <div className="bot-card reveal">
              <div className="bot-card-img">
                <img src="/bot-1.png" alt="시그널 봇" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="img-placeholder" style={{display:'none'}}>🤖</div>
              </div>
              <div className="bot-tag">Signal Bot</div>
              <h3>종합 매도 BOT</h3>
              <p>
                국내·해외 주요 거래소를 통합 연동하여 시장가·지정가 매도를 빠르게 실행합니다. 반복 주문, 잔고 확인 및 텔레그램 알림까지 실전 매도 흐름을 자동화합니다.
              </p>
            </div>
            <div className="bot-card reveal reveal-delay-1">
              <div className="bot-card-img">
                <img src="/bot-2.png" alt="자동화 봇" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="img-placeholder" style={{display:'none'}}>⚙️</div>
              </div>
              <div className="bot-tag">Execution Bot</div>
              <h3>국·해외 출금 BOT</h3>
              <p>
                국내 및 글로벌 거래소 간 자산 이동을 자동화합니다. 네트워크 선택, 수수료 반영, 입출금 상태 확인까지 안전하고 빠른 자금 이동을 지원합니다.
              </p>
            </div>
            <div className="bot-card reveal reveal-delay-2">
              <div className="bot-card-img">
                <img src="/bot-3.png" alt="모니터링 봇" onError={(e) => { e.target.style.display='none'; e.target.nextSibling.style.display='flex'; }} />
                <div className="img-placeholder" style={{display:'none'}}>📊</div>
              </div>
              <div className="bot-tag">Monitor Bot</div>
              <h3>보조 & 전략 BOT</h3>
              <p>
                급락 감지 매수 봇, 메타마스크 전송 자동화, 컨트랙트 검색기, 잔고 알리미, 업비트 입금 확인 시스템 등 실전 운영에 필요한 다양한 전략 보조 도구를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 인용구 + 문의하기 섹션 ── */}
      <section id="contact" className="quote-section">
        <div className="container">
          <div className="quote-contact-grid">
      
            {/* 좌측 — 인용구 */}
            <div className="quote-box reveal">
      
              <div className="quote-title">
                방향성보다 구조를 보십시오.
              </div>
      
              <div className="quote-item">
                원·달러 환율이 중요한가요?<br />
                비트코인 가격이 오르는지가 핵심인가요?
              </div>
      
              <div className="quote-item">
                아비트라지는 예측의 영역이 아닙니다.<br />
                <strong>가격 구조의 차이를 읽는 기술</strong>입니다.
              </div>
      
              <div className="quote-item">
                기본적 분석도, 기술적 분석도 필요 없습니다.<br />
                우리가 제공하는 데이터 그 자체만 보십시오.
              </div>
      
              <div className="quote-item">
                하루 종일 차트를 붙잡고<br />
                평단가에 흔들리는 스트레스 대신,<br />
                구조적인 수익 흐름을 선택하십시오.
              </div>
      
              <div className="quote-item">
                10년간 시장에서 살아남은 이유,<br />
                그 방식을 공개합니다.
              </div>
      
              <div className="quote-author">
                BODDARING · Arbitrage Infrastructure
              </div>
      
            </div>

            {/* 우측 — 문의 폼 */}
            <div className="contact-box reveal reveal-delay-1">
              <h3>문의하기</h3>
              <p>
                궁금한 점이 있으시면 아래 양식을 통해 문의해 주세요.
                빠르게 답변 드리겠습니다.
              </p>

              {formStatus === "sent" ? (
                <div className="form-success show">
                  ✅ 문의가 성공적으로 등록되었습니다!<br />
                  <span style={{ fontSize: "13px", color: "var(--muted2)", fontWeight: 600 }}>
                    빠른 시일 내에 연락 드리겠습니다.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>
                  <div className="form-group">
                    <label className="form-label">
                      이메일 <span className="req">*</span>
                    </label>
                    <input
                      type="email"
                      className={`form-input${formErrors.email ? " error" : ""}`}
                      placeholder="이메일을 입력해 주세요."
                      value={formData.email}
                      onChange={handleInput("email")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      텔레그램 ID <span className="req">*</span>
                    </label>
                    <input
                      type="text"
                      className={`form-input${formErrors.telegram ? " error" : ""}`}
                      placeholder="예) @username"
                      value={formData.telegram}
                      onChange={handleInput("telegram")}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">궁금한 게 있으신가요?</label>
                    <textarea
                      className="form-textarea"
                      placeholder="문의 사항을 작성해 주세요."
                      value={formData.message}
                      onChange={handleInput("message")}
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-submit"
                    disabled={isSubmitDisabled}
                  >
                    {formStatus === "sending" ? "전송 중..." : "문의 등록하기"}
                  </button>
                  {formStatus === "error" && (
                    <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                      ❌ 전송에 실패했습니다. 이메일로 직접 문의해 주세요.
                    </p>
                  )}
                </form>
              )}

              <p className="contact-alt">
                또는{" "}
                <a href="mailto:boddaring@endholdings.com">
                  boddaring@endholdings.com
                </a>
                {" "}으로 문의해 주세요.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="brand-name">BODDARING</div>
              <p className="footer-desc">
                대한민국 최고 아비트라지 플랫폼.<br />거래소 간 시세 차익을 초 단위로 포착합니다.
              </p>
            </div>
            <div className="footer-col">
              <h4>서비스</h4>
              <ul>
                <li><a href="#signal">시그널 소개</a></li>
                <li><a href="#exchanges">연동 거래소</a></li>
                <li><a href="#bot">BOT 소개</a></li>
                <li><Link href="/apply">서비스 신청</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>문의</h4>
              <ul>
                <li><a href="#contact">문의하기</a></li>
                <li><a href="mailto:boddaring@endholdings.com">이메일 문의</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} BODDARING. All rights reserved.</span>
            <div className="footer-bottom-links">
              <a href="#top">맨 위로</a>
              <a href="#contact">문의</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
