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
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [formData, setFormData] = useState({ email: "", telegram: "", message: "" });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");
  const [emailjsReady, setEmailjsReady] = useState(false);
  const serviceRef = useRef(null);

  /* 스크롤 감지 */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* 드롭다운 외부 클릭 닫기 */
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
      await emailjs.send(serviceId, templateId, {
        from_email: formData.email,
        telegram_id: formData.telegram,
        message: formData.message || "(메시지 없음)",
        name: "BODDARING 문의",
      });
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
                <span className="brand-sub">아비트라지 데이터 플랫폼</span>
              </div>
            </a>

            {/* 데스크탑 네비 */}
            <div className="nav-links">
              {/* 서비스 드롭다운 */}
              <div
                className={`nav-dropdown${serviceOpen ? " open" : ""}`}
                ref={serviceRef}
                onMouseEnter={() => setServiceOpen(true)}
                onMouseLeave={() => setServiceOpen(false)}
              >
                <button className="nav-link nav-dropdown-trigger">
                  서비스
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="dropdown-menu">
                  <a href="#signal" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">📡</span>
                    <div>
                      <div className="dropdown-item-title">시그널 소개</div>
                      <div className="dropdown-item-desc">실시간 차익 시그널 시스템</div>
                    </div>
                  </a>
                  <a href="#exchanges" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">🏦</span>
                    <div>
                      <div className="dropdown-item-title">연동 거래소</div>
                      <div className="dropdown-item-desc">국내·해외 주요 거래소 현황</div>
                    </div>
                  </a>
                  <a href="#bot" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">🤖</span>
                    <div>
                      <div className="dropdown-item-title">BOT 소개</div>
                      <div className="dropdown-item-desc">자동화 보조 프로그램</div>
                    </div>
                  </a>
                  <a href="#contact" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">✉️</span>
                    <div>
                      <div className="dropdown-item-title">문의하기</div>
                      <div className="dropdown-item-desc">서비스 이용 문의</div>
                    </div>
                  </a>
                </div>
              </div>

              {/* 더 알아보기 */}
              <Link href="/learn" className="nav-link nav-learn-link">
                더 알아보기
                <span className="nav-learn-badge">!</span>
              </Link>
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
        {/* 모바일 서비스 아코디언 */}
        <button
          className="nav-link mobile-service-toggle"
          onClick={() => setMobileServiceOpen((p) => !p)}
        >
          서비스
          <svg
            className={`dropdown-arrow${mobileServiceOpen ? " rotated" : ""}`}
            width="12" height="12" viewBox="0 0 12 12" fill="none"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {mobileServiceOpen && (
          <div className="mobile-service-list">
            <a href="#signal" className="mobile-service-item" onClick={() => setMenuOpen(false)}>시그널 소개</a>
            <a href="#exchanges" className="mobile-service-item" onClick={() => setMenuOpen(false)}>연동 거래소</a>
            <a href="#bot" className="mobile-service-item" onClick={() => setMenuOpen(false)}>BOT 소개</a>
            <a href="#contact" className="mobile-service-item" onClick={() => setMenuOpen(false)}>문의하기</a>
          </div>
        )}
        <Link href="/learn" className="nav-link" onClick={() => setMenuOpen(false)}>
          더 알아보기
        </Link>
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
                거래소 간 <span className="hero-grad">시세 차익</span>을<br />한눈에, 빠르게!
                <span className="line2 hero-title-animated">데이터수집의 새로운 기준</span>
              </h1>

              <p className="hero-desc">
                국내·해외 거래소에 상장된 모든 코인의 데이터를 수집하여<br />가격을 비교해 차익을 계산하고,<br />실행 가능한 기회만 선별해 <span className="pulse">초 단위로 시그널</span>을 제공합니다.
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn-primary">
                  지금 문의하기
                </a>
                <a href="#signal" className="btn-outline">
                  시그널 화면 보기
                </a>
              </div>

              <div className="hero-bottom-info">
                {/* Real-Time Badge */}
                <div className="hero-rtbadge-row">
                  <div className="real-time-badge">
                    <span className="real-dot" />
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
                    <span className="hero-stat-val">300,000<span className="unit"> 회 ⤴</span></span>
                    <span className="hero-stat-label">종목·페어 초당 계산</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 우측 — 영상 영역 */}
            <div className="hero-right reveal reveal-delay-2">
              <div className="hero-video-wrap hero-video-large">
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

      {/* ── 시그널 소개 섹션 ── */}
      <section id="signal" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">Signal Intelligence</div>
            <h2 className="section-title">
              아비트라지의 모든 것,<br />
              <span className="hero-grad">BODDARING</span>
            </h2>
            <p className="section-desc no-break">
              거래소 간 가격 비교를 자동화하여, 차트 분석 없이도 가격 격차 구간을 직관적으로 확인할 수 있습니다.<br />
              BODDARING은 실시간 데이터 기반으로 가격 차이가 형성된 구간을 탐지·구조화하여 제공하며, 해당 정보는 투자 판단을 보조하기 위한 참고 자료로 활용됩니다.
            </p>
          </div>

          {/* 기능 카드 — 타임라인 스타일 */}
          <div className="feature-timeline reveal">
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">📡</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">실시간 데이터 수집</h3>
                <p className="ftl-desc">공개 오더북 데이터를 초 단위로 수집합니다. 실제 체결 가능한 가격 기준의 유동성 데이터만을 반영하여 정확도를 높입니다.</p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">⚡</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">비용 반영 계산 시스템</h3>
                <p className="ftl-desc">수수료, 환율, 슬리피지를 반영한 계산값을 표시합니다. 종목별 최종 거래가가 아닌 100% 실시간 호가창 비교를 통해 Amount를 표기하며, 해당 수량 기준의 수익률 계산 공식이 작동됩니다.<br />
                <span className="ftl-note">(투자 수익 보장을 의미하지 않습니다.)</span></p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">🎯</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">오더북 기반 유동성 분석</h3>
                <p className="ftl-desc">체결 가능 범위 기준의 가격 데이터를 제공합니다. From 거래소의 평균 매수가와 To 거래소의 현재가를 실시간으로 비교하여 즉시 수익 판단이 가능합니다.</p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">🤖</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">사용자 조건 필터</h3>
                <p className="ftl-desc">Per(격차 비율) 및 Amount(거래 규모) 필터링 기능을 제공합니다. 거래소 및 거래 페어 필터도 자유롭게 구성 가능합니다.</p>
              </div>
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
              <p className="section-desc no-break">
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
                    └─ 단순 원·달러 환율이 아닌 비트코인 환율 기반 실질 차익 기준 반영
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

      {/* ── 연동 거래소 섹션 ── */}
      <section id="exchanges" className="exchange-section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Supported Exchanges</div>
            <h2 className="section-title">연동된 거래소</h2>
            <p className="section-desc">
              BODDARING은 단순히 거래소 수를 늘리는 것이 아닌, 데이터 신뢰성을 기준으로 거래소를 선별합니다. 현재 국내 및 글로벌 주요 거래소를 통해 KRW / USDT 시장 간 가격 격차 데이터를 제공하며, 해당 데이터는 공개 API 기반으로 수집·계산된 참고 정보입니다. 유의미한 차익 신호 선별을 위해 데이터 신뢰도가 낮은 거래소는 제외하고 있으며, 데이터 완성도를 높이기 위해 검증된 거래소를 지속적으로 추가하고 있습니다.
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

        {/* 거래소 섹션 하단 고지 */}
        <div className="container">
          <div className="exchange-footer-notes">
            <p className="exchange-note-intl">
              * Traders in Thailand, India, and other countries who require a professional arbitrage data system tailored to their local market are welcome to contact us.
            </p>
            <p className="exchange-disclaimer">
              * This platform has no official affiliation with any listed exchange. All data is independently collected via public APIs and provided solely for informational purposes. All trademarks belong to their respective owners.<br />
              * 이 플랫폼은 상장된 거래소와 공식적인 제휴 관계가 없습니다. 모든 데이터는 공개 API를 통해 독립적으로 수집되며 정보 제공 목적으로만 제공됩니다. 모든 상표는 각자의 소유주에게 속합니다.
            </p>
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
                비트코인 가격을 왜 '예측'하려고 하시나요?<br />
                시황 뉴스는 대부분 이미 가격에 반영된 뒤 도착합니다.
              </div>
              <div className="quote-item">
                뒤늦은 해석과 감정적인 추격 대신,<br />
                <strong>거래소 간 가격 격차라는 '구조'</strong>를 보세요.
              </div>
              <div className="quote-item">
                아비트라지는 예측의 영역이 아닌,<br />
                <strong>가격 구조 데이터를 이해하는 과정</strong>입니다.
              </div>
              <div className="quote-item">
                하루 종일 차트를 붙잡고<br />
                평단가에 흔들리는 스트레스와<br />
                기약 없는 기다림의 포지션 종료 대신,<br />
                짧은 사이클로 구조를 확인하는 아비트라지가 있습니다.
              </div>
              <div className="quote-item">
                BODDARING은 다년간의 데이터 분석 경험을 바탕으로 설계되었습니다.
              </div>
              <div className="quote-author">
                ※  본 서비스는 금융투자상품의 매매를 권유하거나 중개하지 않으며,<br />
                　　정보 제공 플랫폼으로서 투자 결과에 대한 법적 책임을 지지 않습니다.
              </div>
              <div className="quote-author">
                BODDARING · 아비트라지 데이터 플랫폼
              </div>
            </div>

            {/* 우측 — 문의 폼 */}
            <div className="contact-box reveal reveal-delay-1">
              <h3>문의하기</h3>
              <p>
                궁금한 점이 있으시면 아래 양식을 통해 문의해 주세요.<br />
                최대한 빠르게 답변 드리겠습니다.
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
                아비트라지 데이터 플랫폼.
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
