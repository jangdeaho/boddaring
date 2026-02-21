"use client";
import emailjs from "@emailjs/browser";
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
  { name: "Gate.io", logo: "gate.png", color: "#e0464c" },
  { name: "Bitget", logo: "bitget.png", color: "#00f5ff" },
  { name: "MEXC", logo: "mexc.png", color: "#00b3ff" },
  { name: "HTX", logo: "htx.png", color: "#00c2ff" },
  { name: "Crypto.com", logo: "cryptocom.png", color: "#0066ff" },
  { name: "Coinbase", logo: "coinbase.png", color: "#0052ff" },
  { name: "OKX", logo: "okx.png", color: "#2D2D2D" },
  { name: "Bybit", logo: "bybit.png", color: "#F7A600" },
  { name: "Bitget", logo: "bitget.png", color: "#00B4D8" },
  { name: "Gate.io", logo: "gateio.png", color: "#2354E6" },
  { name: "MEXC", logo: "mexc.png", color: "#2B6AFF" },
  { name: "HTX", logo: "htx.png", color: "#2ECC71" },
  { name: "KuCoin", logo: "kucoin.png", color: "#00A550" },
  { name: "Crypto.com", logo: "cryptocom.png", color: "#222b5a" },
  { name: "Bitmart", logo: "bitmart.png", color: "#5741D9" },
  { name: "Kraken", logo: "kraken.png", color: "#5741d9" },
  { name: "AscendEX", logo: "ascendex.png", color: "#7c44c0" },
  { name: "Bingx", logo: "bingx.png", color: "#2a54ff" },
  { name: "Whitebit", logo: "whitebit.png", color: "#eabb4a" },
  { name: "Lbank", logo: "lbank.png", color: "#ffcd00" },
  { name: "CoinEx", logo: "coinex.png", color: "#1ee1bc" },
  { name: "OrangeX", logo: "orangex.png", color: "#ff8508" },
  { name: "Deepcoin2", logo: "deepcoin.png", color: "#fe7701" },
];

export default function Home() {
  const headerRef = useRef(null);

  /* ── 네비 토글(모바일) ── */
  const [menuOpen, setMenuOpen] = useState(false);

  /* ── 문의 폼 상태 ── */
  const [formData, setFormData] = useState({
    email: "",
    telegram: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error

  const validate = () => {
    const errs = {};
    const email = formData.email.trim();
    const telegram = formData.telegram.trim();

    if (!email) errs.email = "이메일을 입력해 주세요.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errs.email = "이메일 형식이 올바르지 않습니다.";

    if (!telegram) errs.telegram = "텔레그램 ID를 입력해 주세요.";
    return errs;
  };

  /*  폼 제출 */
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
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS env missing (service/template/public key)");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: "boddaring@endholdings.com",
          from_email: formData.email,
          from_name: "BODDARING 문의",
          telegram_id: formData.telegram,
          message: formData.message?.trim() ? formData.message : "(메시지 없음)",
        },
        { publicKey }
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
    !formData.email.trim() ||
    !formData.telegram.trim() ||
    formStatus === "sending";

  /* ── 스크롤 Reveal 애니메이션 ── */
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((ent) => {
          if (ent.isIntersecting) ent.target.classList.add("show");
        });
      },
      { threshold: 0.15 }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* ── 스크롤 시 헤더 쉐도우 ── */
  useEffect(() => {
    const onScroll = () => {
      if (!headerRef.current) return;
      if (window.scrollY > 10) headerRef.current.classList.add("scrolled");
      else headerRef.current.classList.remove("scrolled");
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* ── TOP Anchor ── */}
      <div id="top" />

      {/* ── Header ── */}
      <header ref={headerRef} className="site-header">
        <div className="container header-inner">
          <Link href="/" className="brand" onClick={() => setMenuOpen(false)}>
            <span className="brand-mark">⚡</span>
            <span className="brand-text">BODDARING</span>
          </Link>

          <nav className={`nav ${menuOpen ? "open" : ""}`}>
            <a href="#features" onClick={() => setMenuOpen(false)}>
              Features
            </a>
            <a href="#bots" onClick={() => setMenuOpen(false)}>
              BOT
            </a>
            <a href="#exchanges" onClick={() => setMenuOpen(false)}>
              Exchanges
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>
              Contact
            </a>
          </nav>

          <div className="header-cta">
            <a className="cta-btn" href="#contact" onClick={() => setMenuOpen(false)}>
              신청하기
            </a>
            <button
              className={`menu-btn ${menuOpen ? "open" : ""}`}
              onClick={() => setMenuOpen((p) => !p)}
              aria-label="menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="hero">
        <div className="hero-bg" aria-hidden="true">
          <div className="hero-stars" />
          <div className="hero-shooters" />
        </div>

        <div className="container hero-inner">
          <div className="hero-copy reveal">
            <div className="hero-kicker">국내 최고 아비트라지 플랫폼</div>
            <h1 className="hero-title">
              구조를 읽고,
              <br />
              실행으로 연결합니다.
            </h1>
            <p className="hero-subtitle">
              오더북 기반 실시간 데이터 수집, 정밀 차익 계산, 사용자 맞춤 필터링까지.
              BODDARING은 ‘실행 가능한’ 신호만 제공합니다.
            </p>

            <div className="hero-actions">
              <a className="btn-primary" href="#contact">
                문의하기
              </a>
              <a className="btn-ghost" href="#features">
                기능 보기
              </a>
            </div>

            <div className="hero-metrics">
              <div className="metric">
                <div className="metric-num">15+</div>
                <div className="metric-label">거래소 연동</div>
              </div>
              <div className="metric">
                <div className="metric-num">1s</div>
                <div className="metric-label">초 단위 데이터</div>
              </div>
              <div className="metric">
                <div className="metric-num">Orderbook</div>
                <div className="metric-label">실행 가능 검증</div>
              </div>
            </div>
          </div>

          <div className="hero-card reveal reveal-delay-1">
            <div className="hero-card-top">
              <div className="chip">Live</div>
              <div className="chip ghost">Scout</div>
            </div>
            <div className="hero-card-body">
              <div className="card-line" />
              <div className="card-line sm" />
              <div className="card-line" />
              <div className="card-line lg" />
            </div>
            <div className="hero-card-foot">
              <span className="dot" />
              <span className="dot" />
              <span className="dot" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">Core Features</div>
            <h2 className="section-title">
              데이터가 곧 <span className="hero-grad">경쟁력</span>입니다
            </h2>
            <p className="section-desc">
              아비트라지는 속도와 정보의 싸움입니다. BODDARING은 국내 최고 수준의
              데이터 수집 인프라로 여러분의 경쟁력을 극대화합니다.
            </p>
          </div>

          <div className="feature-grid">
            <div className="feature-card reveal">
              <div className="feature-icon">📡</div>
              <h3>실시간 오더북 수집</h3>
              <p>
                국내외 주요 거래소의 오더북 데이터를 초 단위로 수집합니다.
                실제 체결 가능한 가격 기준의 유동성 데이터만을 반영합니다.
              </p>
            </div>

            <div className="feature-card reveal reveal-delay-1">
              <div className="feature-icon">⚡</div>
              <h3>정밀 차익 계산 엔진</h3>
              <p>
                수수료, 환율, 슬리피지까지 반영하여 실질 순수익 기준의
                아비트라지 기회만을 선별합니다.
              </p>
            </div>

            <div className="feature-card reveal reveal-delay-2">
              <div className="feature-icon">🤖</div>
              <h3>사용자 맞춤 필터링</h3>
              <p>
                Per(수익률)과 Amount(거래 규모)를 직접 설정하여 원하는 조건의
                시그널만 확인할 수 있습니다. 거래소 및 거래 페어 필터도 자유롭게
                구성 가능합니다.
              </p>
            </div>

            <div className="feature-card reveal reveal-delay-3">
              <div className="feature-icon">🎯</div>
              <h3>호가 스카우터</h3>
              <p>
                거래소 간 차익 시그널과 함께 From 거래소의 평균 매수가와 To 거래소의
                현재가를 실시간으로 비교 제공합니다. 별도의 평단 계산 없이 즉시 수익
                판단이 가능합니다.
              </p>
            </div>
          </div>

          <div className="check-list reveal reveal-delay-1">
            <div className="check-item">국내·해외 주요 거래소의 가격을 1초 단위로 실시간 비교</div>
            <div className="check-item">
              테더(USDT) 실거래 환율 기반 김프 계산 — 단순 원·달러 환율이 아닌 실질 수익 기준 반영
            </div>
            <div className="check-item">
              오더북 유동성 기반 실행 가능성 검증 — 표시되는 수치가 아닌 실제 체결 가능한 기회만 선별
            </div>
            <div className="check-item">
              입출금 상태 실시간 모니터링 — 차익 발생 시 즉시 실행 가능한 환경인지 사전 확인
            </div>
            <div className="check-item">
              텔레그램 프라이빗 알림 시스템 — 개인 봇 설정을 통한 안전하고 독립적인 시그널 관리
            </div>
          </div>
        </div>
      </section>

      {/* ── BOT 섹션 ── */}
      <section id="bots" className="section bots-section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">BOT Suite</div>
            <h2 className="section-title">
              아비트라지에 <span className="hero-grad">실행력을 더하는 BOT</span>
            </h2>
            <p className="section-desc">
              사용자 편의성을 최우선으로 설계된 보조 프로그램을 제공합니다.
              프라이빗 텔레그램 알림부터 실전 매매 흐름에 최적화된 자동화 기능까지,
              즉시 활용 가능한 트레이딩 인프라입니다.
            </p>
          </div>

          <div className="bot-grid">
            <div className="bot-card reveal">
              <div className="bot-card-img">
                <img
                  src="/bot-1.png"
                  alt="시그널 봇"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="img-placeholder" style={{ display: "none" }}>
                  🤖
                </div>
              </div>
              <div className="bot-tag">Signal Bot</div>
              <h3>종합 매도 BOT</h3>
              <p>
                국내·해외 주요 거래소를 통합 연동하여 시장가·지정가 매도를 빠르게
                실행합니다. 반복 주문, 잔고 확인, 수익 계산 및 텔레그램 알림까지
                실전 매도 흐름을 자동화합니다.
              </p>
            </div>

            <div className="bot-card reveal reveal-delay-1">
              <div className="bot-card-img">
                <img
                  src="/bot-2.png"
                  alt="자동화 봇"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="img-placeholder" style={{ display: "none" }}>
                  ⚙️
                </div>
              </div>
              <div className="bot-tag">Execution Bot</div>
              <h3>국·해외 출금 BOT</h3>
              <p>
                국내 및 글로벌 거래소 간 자산 이동을 자동화합니다. 네트워크 선택,
                수수료 반영, 입출금 상태 확인까지 안전하고 빠른 자금 이동을
                지원합니다.
              </p>
            </div>

            <div className="bot-card reveal reveal-delay-2">
              <div className="bot-card-img">
                <img
                  src="/bot-3.png"
                  alt="모니터링 봇"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="img-placeholder" style={{ display: "none" }}>
                  📊
                </div>
              </div>
              <div className="bot-tag">Monitor Bot</div>
              <h3>보조 & 전략 BOT</h3>
              <p>
                급락 감지 매수 봇, 메타마스크 전송 자동화, 컨트랙트 검색기, 잔고 알리미,
                업비트 입금 확인 시스템 등 실전 운영에 필요한 다양한 전략 보조 도구를
                제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Exchanges ── */}
      <section id="exchanges" className="section exchanges-section">
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">Exchanges</div>
            <h2 className="section-title">
              국내외 주요 거래소 <span className="hero-grad">선별 연동</span>
            </h2>
            <p className="section-desc">
              국내외 주요 거래소를 선별 연동하여 고품질 차익 데이터를 제공합니다.
              저유동성 거래소는 필터링하며, 시장 변화에 따라 연동 거래소는 지속적으로
              확장됩니다.
            </p>
          </div>

          <div className="exchange-grid reveal reveal-delay-1">
            {EXCHANGES.map((ex) => (
              <div className="exchange-card" key={ex.name}>
                <div className="exchange-logo">
                  <img
                    src={`/${ex.logo}`}
                    alt={ex.name}
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="img-placeholder" style={{ display: "none" }}>
                    {ex.name.slice(0, 1)}
                  </div>
                </div>
                <div className="exchange-name">{ex.name}</div>
                <div className="exchange-bar" style={{ background: ex.color }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 인용구 + 문의하기 섹션 ── */}
      <section id="contact" className="quote-section">
        <div className="container">
          <div className="quote-contact-grid">
            {/* 좌측 — 인용구 */}
            <div className="quote-box reveal">
              <div className="quote-title">방향성보다 구조를 보십시오.</div>

              <div className="quote-item">
                원·달러 환율이 중요한가요?
                <br />
                비트코인 가격이 오르는지가 핵심인가요?
              </div>

              <div className="quote-item">
                아비트라지는 예측의 영역이 아닙니다.
                <br />
                <strong>가격 구조의 차이를 읽는 기술</strong>입니다.
              </div>

              <div className="quote-item">
                기본적 분석도, 기술적 분석도 필요 없습니다.
                <br />
                우리가 제공하는 데이터 그 자체만 보십시오.
              </div>

              <div className="quote-item">
                하루 종일 차트를 붙잡고
                <br />
                평단가에 흔들리는 스트레스 대신,
                <br />
                구조적인 수익 흐름을 선택하십시오.
              </div>

              <div className="quote-item">
                10년간 시장에서 살아남은 이유,
                <br />
                그 방식을 공개합니다.
              </div>

              <div className="quote-author">BODDARING · Arbitrage Infrastructure</div>
            </div>

            {/* 우측 — 문의 폼 */}
            <div className="contact-box reveal reveal-delay-1">
              <div className="contact-title">Contact Us</div>
              <p className="contact-desc">
                아래 정보를 남겨주시면 BODDARING 팀이 빠르게 회신드립니다.
              </p>

              <form className="contact-form" onSubmit={handleSubmit}>
                <label className={`field ${formErrors.email ? "error" : ""}`}>
                  <span>이메일</span>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={handleInput("email")}
                    placeholder="example@email.com"
                    autoComplete="email"
                  />
                  {formErrors.email && <em>{formErrors.email}</em>}
                </label>

                <label className={`field ${formErrors.telegram ? "error" : ""}`}>
                  <span>텔레그램 ID</span>
                  <input
                    type="text"
                    value={formData.telegram}
                    onChange={handleInput("telegram")}
                    placeholder="@your_telegram_id"
                  />
                  {formErrors.telegram && <em>{formErrors.telegram}</em>}
                </label>

                <label className="field">
                  <span>문의 내용</span>
                  <textarea
                    value={formData.message}
                    onChange={handleInput("message")}
                    placeholder="문의 내용을 입력해 주세요."
                    rows={5}
                  />
                </label>

                <button className="submit-btn" type="submit" disabled={isSubmitDisabled}>
                  {formStatus === "sending" ? "전송 중..." : "문의 보내기"}
                </button>

                {formStatus === "sent" && (
                  <div className="form-msg ok">✅ 문의가 정상적으로 접수되었습니다.</div>
                )}
                {formStatus === "error" && (
                  <div className="form-msg err">
                    ❌ 전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="brand-mark">⚡</span>
              <span className="brand-text">BODDARING</span>
            </div>

            <div className="footer-links">
              <a href="#features">Features</a>
              <a href="#bots">BOT</a>
              <a href="#exchanges">Exchanges</a>
              <a href="#contact">Contact</a>
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
