"use client";
import { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";

const EXCHANGES = [
  { name: "업비트", logo: "upbit.png", desc: "국내 최대 원화 거래소", color: "#1763B6" },
  { name: "빗썸", logo: "bithumb.png", desc: "국내 최저 수수료 거래소", color: "#F7A600" },
  { name: "코인원", logo: "coinone.png", desc: "국내 안정적 거래소", color: "#0066FF" },
  { name: "바이낸스", logo: "binance.png", desc: "글로벌 최대 거래소", color: "#F3BA2F" },
  { name: "바이비트", logo: "bybit.png", desc: "글로벌 파생상품 거래소", color: "#F7931A" },
  { name: "OKX", logo: "okx.png", desc: "글로벌 주요 거래소", color: "#000000" },
  { name: "게이트아이오", logo: "gateio.png", desc: "글로벌 안정적 거래소", color: "#0066FF" },
  { name: "후오비", logo: "huobi.png", desc: "글로벌 주요 거래소", color: "#1890FF" },
];

const doubledExchanges = [...EXCHANGES, ...EXCHANGES];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [emailjsReady, setEmailjsReady] = useState(false);

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
      setEmailjsReady(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailjsReady) return;

    setFormStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message || "(메시지 없음)",
        to_name: "BODDARING 관리자",
      });

      setFormStatus("sent");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  return (
    <>
      {/* 배경 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* ── 히어로 섹션 ── */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            {/* 좌측 — 텍스트 */}
            <div className="hero-left">
              <div className="hero-badge reveal">
                <span className="hero-badge-dot" />
                실시간 시세차익 데이터 수집 · 구조화 끝판왕
              </div>

              <h1 className="hero-title">
                거래소 간 <span className="hero-grad">시세 차익</span>을 한눈에, 빠르게!
                <span className="line2 hero-title-animated">데이터수집의 새로운 기준</span>
              </h1>

              <p className="hero-desc">
                국내·해외 거래소에 상장된 모든 코인의 데이터를 수집하여 가격을 비교해 차익을 계산하고, 실행 가능한 기회만 선별해 <span className="pulse">초 단위로 시그널</span>을 제공합니다.
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
              거래소 간 가격 비교를 자동화하여, 차트 분석 없이도 가격 격차 구간을 직관적으로 확인할 수 있습니다. BODDARING은 실시간 데이터 기반으로 가격 차이가 형성된 구간을 탐지·구조화하여 제공하며, 해당 정보는 투자 판단을 보조하기 위한 참고 자료로 활용됩니다.
            </p>
          </div>

          {/* 기능 카드 — 타임라인 스타일 */}
          <div className="feature-timeline reveal">
            <div className="timeline-item">
              <div className="timeline-icon">📊</div>
              <div className="timeline-content">
                <h4>실시간 데이터 수집</h4>
                <p>공개 오더북 데이터를 초 단위로 수집합니다.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">💰</div>
              <div className="timeline-content">
                <h4>비용 반영 계산 시스템</h4>
                <p>수수료, 환율, 슬리피지를 반영한 계산값을 표시합니다. (투자 수익 보장을 의미하지 않습니다.)</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">📈</div>
              <div className="timeline-content">
                <h4>오더북 기반 유동성 분석</h4>
                <p>체결 가능 범위 기준의 가격 데이터를 제공합니다.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-icon">🎯</div>
              <div className="timeline-content">
                <h4>사용자 조건 필터</h4>
                <p>Per(격차 비율) 및 Amount(거래 규모) 필터링 기능을 제공합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ── 경쟁력 섹션 ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Why BODDARING</div>
            <h2 className="section-title">
              데이터가 곧 <span className="hero-grad">경쟁력</span>입니다.
            </h2>
            <p className="section-desc no-break">
              아비트라지는 속도와 정보의 싸움입니다. BODDARING은 대한민국 최고 수준의 데이터 수집 인프라로 여러분의 경쟁력을 극대화합니다.
            </p>

            <div className="check-list">
              <div className="check-item">
                압도적인 데이터 수집<br />
                <span className="check-desc">국내·해외 모든 주요 거래소의 오더북을 초 단위로 수집</span>
              </div>
              <div className="check-item">
                신뢰성 높은 계산 엔진<br />
                <span className="check-desc">수수료, 환율, 슬리피지를 반영한 실질 수익률 계산</span>
              </div>
              <div className="check-item">
                즉각적인 시그널 전달<br />
                <span className="check-desc">조건 부합 시 텔레그램을 통해 실시간 알림</span>
              </div>
              <div className="check-item">
                24/7 무중단 운영<br />
                <span className="check-desc">시장 개장 시간에 관계없이 지속적인 데이터 수집 및 분석</span>
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
              사용자 편의성을 최우선으로 고려한 보조 프로그램을 제공합니다. 프라이빗한 텔레그램 알림부터 실전 매매 흐름에 최적화된 자동화 기능까지 제공합니다.
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
              This platform has no official affiliation with any listed exchange. All data is independently collected via public APIs and provided solely for informational purposes. All trademarks belong to their respective owners.
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
                아비트라지는 예측의 영역이 아닌<br />
                <strong>가격 구조 데이터를 이해하는 과정</strong>입니다.
              </div>
              <div className="quote-item">
                하루 종일 차트를 붙잡고
                평단가에 흔들리는 스트레스와
                기약 없는 기다림의 포지션 종료 대신,
                짧은 사이클로 구조를 확인하는 아비트라지가 있습니다.
              </div>
              <div className="quote-item">
                BODDARING은 다년간의 데이터 분석 경험을 바탕으로 설계되었습니다.
              </div>
              <div className="quote-author">
                ※ 본 서비스는 금융투자상품의 매매를 권유하거나 중개하지 않으며,<br />
                   정보 제공 플랫폼으로서 투자 결과에 대한 법적 책임을 지지 않습니다.
              </div>
              <div className="quote-author">
                BODDARING · 아비트라지 데이터 플랫폼
              </div>
            </div>

            {/* 우측 — 문의 폼 */}
            <div className="contact-box reveal reveal-delay-1">
              <h3>문의하기</h3>
              <p style={{ color: "#8080b0", marginBottom: "24px" }}>
                궁금한 사항이나 기술적 지원이 필요하신 경우 언제든지 연락주세요.
              </p>
              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px" }}>성함</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleInput("name")}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px" }}>이메일</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleInput("email")}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
                  />
                </div>
                <div style={{ marginBottom: "16px" }}>
                  <label style={{ display: "block", marginBottom: "6px", fontSize: "13px" }}>문의사항</label>
                  <textarea
                    required
                    value={formData.message}
                    onChange={handleInput("message")}
                    style={{ width: "100%", padding: "10px", borderRadius: "8px", background: "rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", minHeight: "80px" }}
                  />
                </div>
                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
                    color: "#fff",
                    border: "none",
                    fontWeight: 600,
                    cursor: "pointer"
                  }}
                >
                  {formStatus === "sending" ? "전송 중..." : "문의 전송하기"}
                </button>
                {formStatus === "sent" && <p style={{ color: "#4ade80", marginTop: "12px", fontSize: "13px" }}>✅ 문의가 전송되었습니다!</p>}
                {formStatus === "error" && <p style={{ color: "#ff6b6b", marginTop: "12px", fontSize: "13px" }}>❌ 전송 실패. 다시 시도해 주세요.</p>}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
