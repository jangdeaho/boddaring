"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "arbitrage", label: "아비트라지란?" },
  { id: "calc-system", label: "차익 계산 시스템이란?" },
  { id: "realtime", label: "실시간 데이터 수집 방법" },
];

export default function LearnPage() {
  const [activeId, setActiveId] = useState("arbitrage");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* 배경 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* 네비게이션 */}
      <nav className="navbar scrolled">
        <div className="container">
          <div className="navbar-inner">
            <Link href="/" className="brand">
              <img src="/icon.png" alt="BODDARING" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">BODDARING</span>
                <span className="brand-sub">아비트라지 데이터 플랫폼</span>
              </div>
            </Link>
            <div className="nav-links">
              <Link href="/#signal" className="nav-link">서비스</Link>
              <Link href="/learn" className="nav-link nav-learn-link" style={{ color: "#a78bfa" }}>
                더 알아보기
                <span className="nav-learn-badge">!</span>
              </Link>
            </div>
            <div className="nav-cta">
              <Link href="/apply" className="btn-apply">
                신청하기 <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 메인 레이아웃 */}
      <div className="learn-layout">
        {/* 사이드바 */}
        <aside className="learn-sidebar">
          <div className="learn-sidebar-title">목차</div>
          <nav className="learn-sidebar-nav">
            {SECTIONS.map(({ id, label }) => (
              <a
                key={id}
                href={`#${id}`}
                className={`learn-sidebar-link${activeId === id ? " active" : ""}`}
              >
                {label}
              </a>
            ))}
          </nav>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="learn-sidebar-title">바로가기</div>
            <nav className="learn-sidebar-nav">
              <Link href="/" className="learn-sidebar-link">← 메인으로</Link>
              <Link href="/#contact" className="learn-sidebar-link">문의하기</Link>
              <Link href="/apply" className="learn-sidebar-link">서비스 신청</Link>
            </nav>
          </div>
        </aside>

        {/* 본문 */}
        <main className="learn-content">

          {/* 헤더 */}
          <div style={{ marginBottom: "48px" }}>
            <div className="learn-section-label">Documentation</div>
            <h1 style={{ fontSize: "36px", fontWeight: 800, color: "#f0eeff", marginBottom: "12px", lineHeight: 1.2 }}>
              BODDARING 가이드
            </h1>
            <p style={{ fontSize: "15px", color: "#8080b0", lineHeight: 1.7 }}>
              아비트라지 데이터 플랫폼의 핵심 개념과 시스템 구조를 설명합니다.
            </p>
          </div>

          <hr className="learn-divider" />

          {/* 섹션 1: 아비트라지란? */}
          <section id="arbitrage" className="learn-section">
            <div className="learn-section-label">개념 이해</div>
            <h2 className="learn-section-title">아비트라지란?</h2>
            <div className="learn-section-body">
              <p>
                <strong>아비트라지(Arbitrage)</strong>란 동일한 자산이 서로 다른 시장에서 상이한 가격으로 거래될 때, 저가 시장에서 매수하고 고가 시장에서 매도하여 그 차익을 실현하는 거래 전략입니다. 이는 가격 비효율성을 활용하는 방식으로, 전통 금융 시장에서도 오랫동안 활용되어 온 개념입니다.
              </p>
              <p>
                암호화폐 시장에서는 국내 거래소(KRW 마켓)와 해외 거래소(USDT 마켓) 간의 가격 차이가 발생하는 구조적 특성이 있습니다. 이를 <strong>김치 프리미엄(Kimchi Premium)</strong> 또는 역프리미엄이라고 부르며, 이 격차가 일정 수준 이상일 때 차익 거래의 기회가 형성됩니다.
              </p>

              <h4>왜 가격 차이가 발생하는가?</h4>
              <p>
                국내 거래소는 원화(KRW) 기반으로 운영되며, 해외 거래소는 주로 USDT(테더) 기반으로 운영됩니다. 두 시장 간에는 환율, 유동성, 수요·공급 구조, 규제 환경 등의 차이가 존재하며, 이로 인해 동일 코인의 가격이 실시간으로 다르게 형성됩니다. 이 격차는 수 초에서 수 분 사이에 빠르게 변동하기 때문에, 실시간 데이터 수집이 핵심입니다.
              </p>

              <h4>아비트라지의 실행 흐름</h4>
              <p>
                일반적인 아비트라지 실행 흐름은 다음과 같습니다. 먼저 두 거래소 간 가격 격차를 실시간으로 탐지하고, 수수료·환율·슬리피지를 반영한 실질 수익률을 계산합니다. 이후 오더북 유동성을 확인하여 실제 체결 가능한 수량을 검증하고, 조건이 충족되면 매수·매도를 동시에 또는 순차적으로 실행합니다.
              </p>

              <div style={{
                background: "rgba(120,100,255,0.08)",
                border: "1px solid rgba(120,100,255,0.2)",
                borderRadius: "12px",
                padding: "16px 20px",
                marginTop: "20px",
                fontSize: "13px",
                color: "#a0a0c0",
                lineHeight: "1.7"
              }}>
                ⚠️ <strong style={{ color: "#c4b5fd" }}>주의사항:</strong> 아비트라지는 가격 격차를 활용하는 전략이지만, 실행 속도·수수료·환율 변동·입출금 제한 등 다양한 리스크 요인이 존재합니다. BODDARING은 데이터 제공 플랫폼으로서 투자 결과에 대한 책임을 지지 않습니다.
              </div>
            </div>
          </section>

          <hr className="learn-divider" />

          {/* 섹션 2: 차익 계산 시스템 */}
          <section id="calc-system" className="learn-section">
            <div className="learn-section-label">시스템 구조</div>
            <h2 className="learn-section-title">차익 계산 시스템이란?</h2>
            <div className="learn-section-body">
              <p>
                BODDARING의 차익 계산 시스템은 단순한 가격 비교를 넘어, 실제 거래에서 발생하는 모든 비용 요소를 반영한 <strong>실질 수익률(Net Per)</strong>을 산출합니다.
              </p>

              <h4>반영되는 비용 요소</h4>
              <p>
                계산에 반영되는 주요 요소는 다음과 같습니다. <strong>거래 수수료</strong>는 각 거래소별 메이커/테이커 수수료를 반영하며, <strong>환율</strong>은 단순 원·달러 환율이 아닌 USDT 실거래 환율(비트코인 환율 기반)을 적용합니다. <strong>슬리피지</strong>는 오더북 호가 데이터를 기반으로 실제 체결 시 발생하는 가격 미끄러짐을 추정하여 반영합니다.
              </p>

              <h4>오더북 기반 Amount 계산</h4>
              <p>
                일반적인 시스템이 종목별 최종 거래가(Last Price)를 기준으로 시그널을 발생시키는 것과 달리, BODDARING은 <strong>100% 실시간 호가창(Order Book)</strong>을 기준으로 Amount를 표기합니다. 이는 실제로 해당 수량만큼 체결이 가능한 가격 범위 내에서의 수익률을 의미하며, 허수 시그널을 최소화합니다.
              </p>

              <h4>Per(격차 비율) 계산 공식</h4>
              <p>
                Per는 다음과 같이 계산됩니다. 국내 거래소 매도 가격을 USDT 환산 후, 해외 거래소 매수 가격과 비교하여 수수료·슬리피지를 차감한 순 격차 비율을 백분율로 표시합니다. 사용자는 최소 Per 임계값을 직접 설정하여 원하는 수준 이상의 시그널만 필터링할 수 있습니다.
              </p>
            </div>
          </section>

          <hr className="learn-divider" />

          {/* 섹션 3: 실시간 데이터 수집 */}
          <section id="realtime" className="learn-section">
            <div className="learn-section-label">데이터 인프라</div>
            <h2 className="learn-section-title">실시간 데이터 수집 방법</h2>
            <div className="learn-section-body">
              <p>
                BODDARING은 국내·해외 주요 거래소의 공개 API를 통해 오더북 데이터를 <strong>초 단위로 수집</strong>합니다. 각 거래소의 WebSocket 스트림을 활용하여 지연 없이 실시간 호가 데이터를 수신하고, 이를 즉시 계산 파이프라인에 공급합니다.
              </p>

              <h4>수집 대상 데이터</h4>
              <p>
                수집되는 데이터는 각 거래소의 전 종목 오더북(매수/매도 호가 및 수량), 실시간 체결가, 입출금 상태(Deposit/Withdrawal status), USDT 실거래 환율 등을 포함합니다. 이를 통해 단순 가격 비교가 아닌, 실제 실행 가능성까지 검증된 시그널을 제공합니다.
              </p>

              <h4>데이터 처리 구조</h4>
              <p>
                수집된 원시 데이터는 실시간 계산 엔진을 통해 처리됩니다. 연동된 거래소 내 모든 코인 페어에 대해 초당 30만 회 이상의 계산이 수행되며, 사용자가 설정한 Per·Amount 필터 조건에 부합하는 시그널만 선별하여 제공합니다.
              </p>

              <h4>텔레그램 알림 시스템</h4>
              <p>
                조건에 부합하는 시그널이 탐지되면, 사용자 개인 텔레그램 봇을 통해 즉시 알림이 발송됩니다. 개인 봇 기반 구조이므로 타 사용자와 알림이 공유되지 않으며, 독립적이고 안전한 시그널 수신 환경을 제공합니다.
              </p>

              <div style={{
                background: "rgba(30,20,60,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginTop: "24px",
              }}>
                <div style={{ fontSize: "12px", color: "#7070a0", marginBottom: "8px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}>참고</div>
                <p style={{ fontSize: "13px", color: "#9090b8", lineHeight: "1.7", margin: 0 }}>
                  본 플랫폼에서 제공하는 모든 데이터는 각 거래소의 공개 API를 기반으로 수집된 참고 정보입니다. 실제 거래 시 시장 상황, 네트워크 지연, 거래소 정책 변경 등에 따라 결과가 달라질 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          {/* 하단 CTA */}
          <div style={{
            marginTop: "48px",
            padding: "32px",
            background: "linear-gradient(135deg, rgba(120,100,255,0.1) 0%, rgba(60,40,120,0.15) 100%)",
            border: "1px solid rgba(120,100,255,0.2)",
            borderRadius: "16px",
            textAlign: "center"
          }}>
            <h3 style={{ fontSize: "20px", fontWeight: 700, color: "#e0d7ff", marginBottom: "10px" }}>
              직접 경험해보세요
            </h3>
            <p style={{ fontSize: "14px", color: "#8080b0", marginBottom: "20px", lineHeight: 1.6 }}>
              BODDARING의 실시간 아비트라지 데이터 시그널을 지금 바로 신청하세요.
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <Link href="/trial" className="btn-free-trial" style={{ textDecoration: "none" }}>
                24시간 무료 체험하기 🚀
                <span className="btn-shine" />
              </Link>
              <Link href="/#contact" className="btn-outline" style={{ textDecoration: "none" }}>
                문의하기
              </Link>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
