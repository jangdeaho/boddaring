"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const TABS = [
  { id: "signal", label: "시그널 소개" },
  { id: "exchanges", label: "연동 거래소" },
  { id: "bot", label: "BOT 소개" },
];

const EXCHANGES_DOMESTIC = [
  { name: "업비트", desc: "국내 최대 원화 거래소", color: "#1763B6", abbr: "U" },
  { name: "빗썸", desc: "국내 2위 원화 거래소", color: "#F7A600", abbr: "B" },
  { name: "코인원", desc: "국내 원화 거래소", color: "#0075FF", abbr: "C" },
];

const EXCHANGES_GLOBAL = [
  { name: "Binance", desc: "세계 최대 거래소", color: "#F0B90B", abbr: "B" },
  { name: "OKX", desc: "글로벌 Top 3 거래소", color: "#2D2D2D", abbr: "O" },
  { name: "Bybit", desc: "선물 특화 거래소", color: "#F7A600", abbr: "B" },
  { name: "Bitget", desc: "카피트레이딩 특화", color: "#00B4D8", abbr: "B" },
  { name: "Gate.io", desc: "알트코인 특화 거래소", color: "#2354E6", abbr: "G" },
  { name: "MEXC", desc: "신규 상장 특화", color: "#2B6AFF", abbr: "M" },
  { name: "HTX", desc: "구 후오비 거래소", color: "#2ECC71", abbr: "H" },
  { name: "KuCoin", desc: "중소형 알트 특화", color: "#00A550", abbr: "K" },
  { name: "Kraken", desc: "미국 주요 거래소", color: "#5741D9", abbr: "K" },
];

export default function FeaturesPage() {
  const [activeTab, setActiveTab] = useState("signal");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("on");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [activeTab]);

  return (
    <>
      {/* 배경 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* 네비게이션 */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            <Link href="/" className="brand">
              <img src="/icon.png" alt="BODDARING" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">BODDARING</span>
                <span className="brand-sub">국내 최고 아비트라지 플랫폼</span>
              </div>
            </Link>
            <div className="nav-links">
              <Link href="/#signal" className="nav-link">시그널 소개</Link>
              <Link href="/#exchanges" className="nav-link">연동 거래소</Link>
              <Link href="/#bot" className="nav-link">BOT 소개</Link>
              <Link href="/#contact" className="nav-link">문의하기</Link>
            </div>
            <div className="nav-cta">
              <Link href="/apply" className="btn-apply">
                신청하기 <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 서브페이지 히어로 */}
      <div className="subpage-hero">
        <div className="container">
          <Link href="/" className="back-link">← 메인으로</Link>
          <h1>
            <span className="hero-grad">BODDARING</span> 서비스 소개
          </h1>
          <p>
            시그널부터 자동화까지, BODDARING이 제공하는 모든 기능을 확인하세요.
          </p>
        </div>
      </div>

      {/* 탭 네비게이션 */}
      <div style={{ borderBottom: "1px solid var(--stroke)", position: "sticky", top: "var(--nav-h)", zIndex: 50, background: "rgba(4,6,15,.92)", backdropFilter: "blur(16px)" }}>
        <div className="container">
          <div style={{ display: "flex", gap: "4px", padding: "0 0 0" }}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  padding: "14px 20px",
                  fontSize: "14px",
                  fontWeight: 700,
                  color: activeTab === tab.id ? "var(--text)" : "var(--muted2)",
                  background: "none",
                  border: "none",
                  borderBottom: activeTab === tab.id ? "2px solid var(--accent)" : "2px solid transparent",
                  cursor: "pointer",
                  transition: "all .2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 탭 콘텐츠 */}
      <div style={{ position: "relative", zIndex: 1, padding: "60px 0 100px" }}>
        <div className="container">

          {/* 시그널 소개 */}
          {activeTab === "signal" && (
            <div>
              <div className="section-head reveal">
                <div className="section-label">Signal Intelligence</div>
                <h2 className="section-title">초 단위 시그널, 실행 가능한 기회만</h2>
                <p className="section-desc">
                  BODDARING의 시그널은 단순한 가격 비교가 아닙니다.
                  수수료, 환율, 유동성, 입출금 상태를 모두 반영한 실전 기준의 시그널입니다.
                </p>
              </div>

              <div className="feature-grid">
                {[
                  { icon: "📡", title: "실시간 데이터 수집", desc: "국내외 20개 이상 거래소의 호가를 1초 단위로 수집합니다. 오더북 기반의 실행 가능한 가격 데이터만 활용합니다." },
                  { icon: "🧮", title: "정밀 차익 계산", desc: "수수료, USDT 환율, 슬리피지를 모두 반영한 순수익 기준으로 계산합니다. 보여주기식 수치가 아닌 실제 손에 쥐는 수익입니다." },
                  { icon: "⚡", title: "즉시 실행 가능 여부 판별", desc: "입출금 상태, 유동성, 최소 주문 금액을 실시간으로 확인하여 실제로 실행 가능한 기회만 선별합니다." },
                  { icon: "🔔", title: "텔레그램 프라이빗 알림", desc: "조건에 맞는 기회 발생 시 즉시 텔레그램으로 알림을 전송합니다. 나만의 조건으로 설정 가능합니다." },
                  { icon: "📊", title: "히스토리 데이터 분석", desc: "과거 아비트라지 기회 데이터를 분석하여 최적의 진입 타이밍과 패턴을 파악할 수 있습니다." },
                  { icon: "🛡️", title: "리스크 관리 지표", desc: "단순 차익률 외에도 변동성, 체결 리스크 등 다양한 리스크 지표를 함께 제공합니다." },
                ].map((item, i) => (
                  <div className={`feature-card reveal${i > 0 ? ` reveal-delay-${Math.min(i, 3)}` : ""}`} key={i}>
                    <div className="feature-icon">{item.icon}</div>
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 연동 거래소 */}
          {activeTab === "exchanges" && (
            <div>
              <div className="section-head reveal">
                <div className="section-label">Supported Exchanges</div>
                <h2 className="section-title">국내외 모든 주요 거래소 커버</h2>
                <p className="section-desc">
                  국내 원화 거래소부터 글로벌 USDT 거래소까지, 아비트라지에 필요한
                  모든 거래소를 지원합니다.
                </p>
              </div>

              <div style={{ marginBottom: "48px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: "var(--muted)" }}>
                  🇰🇷 국내 원화 거래소
                </h3>
                <div className="feature-grid">
                  {EXCHANGES_DOMESTIC.map((ex, i) => (
                    <div className={`feature-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`} key={i}>
                      <div className="feature-icon" style={{ background: ex.color + "22", border: `1px solid ${ex.color}44`, color: ex.color, fontSize: "18px", fontWeight: 900 }}>
                        {ex.abbr}
                      </div>
                      <h3>{ex.name}</h3>
                      <p>{ex.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: "18px", fontWeight: 800, marginBottom: "20px", color: "var(--muted)" }}>
                  🌐 글로벌 USDT 거래소
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px" }}>
                  {EXCHANGES_GLOBAL.map((ex, i) => (
                    <div className={`feature-card reveal${i > 0 ? ` reveal-delay-${Math.min(i % 3 + 1, 3)}` : ""}`} key={i}>
                      <div className="feature-icon" style={{ background: ex.color + "22", border: `1px solid ${ex.color}44`, color: ex.color, fontSize: "18px", fontWeight: 900 }}>
                        {ex.abbr}
                      </div>
                      <h3>{ex.name}</h3>
                      <p>{ex.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* BOT 소개 */}
          {activeTab === "bot" && (
            <div>
              <div className="section-head reveal">
                <div className="section-label">Automation</div>
                <h2 className="section-title">아비트라지에 날개를 달아주는 BOT</h2>
                <p className="section-desc">
                  사용자 편의성을 최우선으로 고려한 보조 프로그램입니다.
                  프라이빗한 텔레그램 알림부터 실전 흐름에 필요한 자동화 도구까지 제공합니다.
                </p>
              </div>

              <div className="bot-grid">
                {[
                  { img: "/bot-1.png", tag: "Signal Bot", title: "실시간 시그널 알림 봇", desc: "설정한 조건에 맞는 아비트라지 기회가 발생하면 텔레그램으로 즉시 알림을 전송합니다. 24시간 모니터링을 완전 자동화합니다.", features: ["커스텀 조건 설정", "텔레그램 즉시 알림", "다중 거래소 동시 모니터링"] },
                  { img: "/bot-2.png", tag: "Execution Bot", title: "실행 자동화 봇", desc: "시그널 발생 시 자동으로 매수/매도 주문을 실행합니다. 반복 작업을 줄이고 판단과 리스크 관리에 집중할 수 있습니다.", features: ["자동 주문 실행", "슬리피지 최소화", "리스크 한도 설정"] },
                  { img: "/bot-3.png", tag: "Monitor Bot", title: "포트폴리오 모니터링 봇", desc: "보유 포지션과 수익률을 실시간으로 추적합니다. 입출금 상태, 잔고 현황을 한눈에 파악할 수 있습니다.", features: ["실시간 잔고 추적", "수익률 리포트", "입출금 상태 알림"] },
                ].map((bot, i) => (
                  <div className={`bot-card reveal${i > 0 ? ` reveal-delay-${i}` : ""}`} key={i}>
                    <div className="bot-card-img">
                      <img src={bot.img} alt={bot.title} onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                    <div className="bot-tag">{bot.tag}</div>
                    <h3>{bot.title}</h3>
                    <p style={{ marginBottom: "16px" }}>{bot.desc}</p>
                    <div className="check-list" style={{ marginTop: 0 }}>
                      {bot.features.map((f, fi) => (
                        <div className="check-item" key={fi} style={{ fontSize: "13px" }}>{f}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* 푸터 */}
      <footer>
        <div className="container">
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} BODDARING. All rights reserved.</span>
            <div className="footer-bottom-links">
              <Link href="/">메인으로</Link>
              <Link href="/apply">서비스 신청</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
