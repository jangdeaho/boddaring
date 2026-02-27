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

  const scrollToId = (id) => {
    if (typeof window === "undefined") return;
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
              <Link href="/#signal" className="nav-link">대표 서비스</Link>
              <Link href="/learn" className="nav-link nav-learn-link" style={{ color: "#a78bfa" }}>
                더 알아보기
                <span className="nav-learn-badge">!</span>
              </Link>
            </div>
            <div className="nav-cta">
              <Link href="/trial" className="btn-cta-u btn-cta-u--pink">
                무료체험 신청하기 <span className="arrow">→</span>
              </Link>

              <Link href="/apply" className="btn-cta-u btn-cta-u--blue">
                구독하기 <span className="arrow">→</span>
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
                <strong>아비트라지(Arbitrage)</strong>는 같은 자산이 서로 다른 시장에서 서로 다른 가격으로 거래될 때,<br />
                <strong>싸게 사서 비싸게 파는 가격 차이</strong>를 이용해 차익을 만드는 방식입니다.<br />
                “방향성(상승/하락)을 맞히는 투자”라기보다는, <strong>가격 괴리</strong>가 생겼을 때 그 틈을 빠르게 집어내는 전략에 가깝습니다.<br />
              </p>
              <p>
                암호화폐 시장에서는 특히 국내 거래소(KRW 마켓)와 해외 거래소(USDT 마켓) 사이에 가격 차이가 자주 생깁니다.<br />
                국내가 더 비싸면 <strong>김치 프리미엄</strong>이고, 반대로 국내가 더 싸면 <strong>역프리미엄</strong>입니다.<br />
                이 괴리가 의미 있게 커질 때 차익 기회가 만들어져요.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-1")}
                  aria-label="프리미엄 1 설명으로 이동"
                >
                  [프리미엄1]
                </button>
              </p>

              <h4>왜 가격 차이가 발생하는가?</h4>
              <p>
                이유는 단순합니다.<br />
                시장이 같지 않거든요.<br />
                국내는 원화(KRW), 해외는 테더(USDT)를 기준으로 가격이 만들어지고,<br />
                두 시장의 <strong>수요·공급, 유동성, 입·출금 제약, 그 외 규제 환경</strong>이 다르면 가격도 자연스럽게 벌어집니다.<br />
                게다가 이 괴리는 <strong>수 초 단위로</strong> 줄었다 늘었다 하기 때문에,<br />
                “지금 이 순간 체결 가능한 가격”을 확인하는 게 핵심입니다.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-2")}
                  aria-label="프리미엄 2 설명으로 이동"
                >
                  [프리미엄2]
                </button>
              </p>

              <h4>아비트라지의 흐름</h4>
              <p>
                흐름은 크게 4단계입니다.<br />
                ① 가격 괴리 탐지<br />
                ② 비용(수수료/환율/슬리피지) 반영<br />
                ③ <strong>호가창(매수벽·매도벽)</strong>으로 “실제 체결 가능 수량” 검증<br />
                ④ 조건 충족 시 실행<br />
                <span className="pulse">BODDARING</span>은 이 중 <strong>①~③을 빠르게, 실제에 가깝게</strong> 해주는 데이터·계산 플랫폼입니다.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-3")}
                  aria-label="프리미엄 3 설명으로 이동"
                >
                  [프리미엄3]
                </button>
              </p>

              <h4>실전에서 자주 놓치는 포인트</h4>
              <ul>
                <li><strong>입출금 상태</strong>가 막혀 있으면, 괴리가 커도 아비트라지가 어렵습니다.</li>
                <li><strong>호가창이 얇으면</strong> (매수벽·매도벽이 약하면), 표시된 Per보다 실제 수익률이 낮아질 수 있습니다.</li>
                <li><strong>환율</strong>은 “원/달러”가 아니라 <strong>USDT 실거래 환율</strong>을 기준으로 보는 게 더 현실적입니다.</li>
              </ul>

              <div className="learn-footnotes">
                <div className="learn-footnotes-title">캡션</div>
                <div id="premium-1" className="learn-footnote-item">
                  <div className="learn-footnote-label">[프리미엄1]</div>
                  <div className="learn-footnote-body">
                    프리미엄은 “같은 코인인데 국내/해외 가격이 다르게 형성되는 현상”을 말합니다.<br />
                    국내가 더 비싸면 김치 프리미엄, 국내가 더 싸면 역프리미엄이라고 부릅니다.
                  </div>
                </div>
                <div id="premium-2" className="learn-footnote-item">
                  <div className="learn-footnote-label">[프리미엄2]</div>
                  <div className="learn-footnote-body">
                    괴리의 원인은 환율·유동성·수요·공급·입출금 제약 등 복합적입니다.<br />
                    중요한 건 “왜 벌어졌나”보다, <strong>지금 이 순간 실제로 체결 가능한 괴리인가</strong>입니다.
                  </div>
                </div>
                <div id="premium-3" className="learn-footnote-item">
                  <div className="learn-footnote-label">[프리미엄3]</div>
                  <div className="learn-footnote-body">
                    아비트라지는 생각보다 ‘속도 게임’입니다. 시그널이 떠도 체결/슬리피지/수수료 때문에 결과가 달라질 수 있습니다.<br />
                    그래서 호가창 기반 계산과 필터링(Per/Amount)이 실전에서는 더 중요합니다.
                  </div>
                </div>
              </div>

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
                ⚠️ <strong style={{ color: "#c4b5fd" }}>주의사항</strong><br />
                 아비트라지는 가격 격차를 활용하는 전략이지만, 실행 속도·수수료·환율 변동·입출금 제한 등 다양한 리스크 요인이 존재합니다.<br />
                 <strong>BODDARING은 데이터 제공 플랫폼으로서 투자 결과에 대한 책임을 지지 않습니다.</strong>
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
                “국내 1% 비싸다” 같은 단순 비교는 실전에서 거의 도움이 안 됩니다.<br />
                중요한 건 <strong>실제로 사고 팔았을 때 남는 돈</strong>이죠.<br />
                BODDARING의 계산은 시세 차이(Per)를 만들 때부터 <strong>현실적인 비용</strong>을 같이 넣어,<br />
                체감 수익률에 가까운 값으로 정리합니다.
              </p>

              <h4>반영되는 비용 요소</h4>
              <p>
                기본은 3가지입니다.<br />
                <strong>거래 수수료</strong>(거래소/주문유형별), <strong>USDT 실거래 환율</strong>, 그리고 <strong>슬리피지</strong>(호가에 따른 체결 손실).<br />
                이 3개를 빼고 계산하면 “수익처럼 보이는데 실제로는 남는 게 없는” 시그널이 쉽게 생깁니다.
              </p>

              <h4>오더북(매수/매도 호가·수량) 기반 Amount 계산</h4>
              <p>
                BODDARING은 “마지막 체결가”가 아니라 <strong>실시간 호가(Order Book)</strong>를 기준으로 Amount를 잡습니다.<br />
                즉, 화면에 보이는 수익률이 아니라 <strong>그 수량이 실제로 체결 가능한 구간</strong>에서 계산합니다.<br />
                그래서 허수 시그널을 줄이고, ‘될 만한’ 구간만 남기도록 설계했습니다.
              </p>

              <h4>Per(격차 비율) 계산 공식</h4>
              <p>
                Per는 “국내(USDT 환산) − 해외”의 차이를 백분율로 표현한 값이고,<br />
                여기서 수수료·슬리피지 같은 비용을 반영해 <strong>순수 격차</strong>에 가깝게 만듭니다.<br />
                사용자는 최소 Per를 정해두고, 그 이하 구간은 아예 필터링할 수 있습니다.
              </p>

              <h4>필터가 중요한 이유</h4>
              <p>
                같은 1%라도 코인마다, 거래소마다 아비트라지 난이도가 다릅니다.<br />
                그래서 BODDARING은 <strong>Per + Amount</strong>를 같이 보도록 만들었고,<br />
                “나는 이 정도 규모는 되어야 움직인다” 같은 기준을 사용자 설정으로 고정할 수 있게 했습니다.<br />
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
                BODDARING은 국내·해외 주요 거래소의 API(WebSocket/REST)를 통해 오더북 데이터를 <strong>초 단위로 수집</strong>합니다.<br />
                단순히 “가격만 긁어오는” 수준이 아니라, <strong>호가/수량/퍼센트</strong>까지 받아서 실제 체결 관점으로 계산합니다.
              </p>

              <h4>수집 대상 데이터</h4>
              <p>
                오더북(매수/매도 호가·수량), 체결가, 종목 상태, 입·출금 가능 여부, 그리고 USDT 실거래 환율까지 함께 봅니다.<br />
                결국 “지금 이 수량이 가능한지”가 중요하기 때문에, 데이터도 그 방향으로 구성되어 있어요.
              </p>

              <h4>데이터 처리 구조</h4>
              <p>
                들어온 원시 데이터는 즉시 정규화(포맷 통일) → 계산(Per/Amount) → 필터링(사용자 조건) 과정을 거칩니다.<br />
                그 다음에야 사이트에 시그널이 표시됩니다.<br />
                그래서 ‘보이기 좋은 숫자’보다, <strong>실전에 가까운 숫자</strong>가 먼저 나오도록 구조를 짰습니다.
              </p>

              <h4>텔레그램 알림 시스템</h4>
              <p>
                매도 봇 등 프로그램을 사용하게 되면, 사용자 개인 텔레그램 봇을 통해 즉시 알림이 발송됩니다.<br />
                개인 봇 기반 구조이므로 타 사용자와 알림이 공유되지 않으며, 독립적이고 안전한 시그널 수신 환경을 제공합니다.
              </p>

              <h4>추가로 알면 좋은 것</h4>
              <ul>
                <li><strong>지연(Delay)</strong>: 거래소/네트워크 상황에 따라 달라질 수 있습니다.</li>
                <li><strong>정책 변경</strong>: 거래소 API/입출금 정책은 예고 없이 바뀔 수 있습니다.</li>
                <li><strong>안전 장치</strong>: 실전에서는 최소 Per, 최소 Amount, 입·출금 상태를 함께 보는 걸 추천합니다.</li>
              </ul>

              <div style={{
                background: "rgba(30,20,60,0.5)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "20px 24px",
                marginTop: "24px",
              }}>
                <div style={{ fontSize: "12px", color: "#7070a0", marginBottom: "8px", fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase" }}><strong style={{ color: "#c4b5fd" }}>참고</strong></div>
                <p style={{ fontSize: "13px", color: "#9090b8", lineHeight: "1.7", margin: 0 }}>
                  본 플랫폼에서 제공하는 모든 데이터는 각 거래소의 공개 API를 기반으로 수집된 참고 정보입니다.<br />
                  실제 거래 시 시장 상황, 네트워크 지연, 거래소 정책 변경 등에 따라 결과가 달라질 수 있습니다.
                </p>
              </div>
            </div>
          </section>

          <section id="guidebook" className="learn-section">
            <div className="learn-section-label">초심자도 쉽게</div>
            <h2 className="learn-section-title">A to Z 가이드북 제공</h2>
            <div className="learn-section-body">
              <p>
                BODDARING은 초심자도 쉽게 배울 수 있는 A to Z 가이드북을 제공합니당 영상 넣고 내용 추가
              </p>
            </div>
          </section>

          <section id="aboutus" className="learn-section">
            <div className="learn-section-label">회사 소개</div>
            <h2 className="learn-section-title">우린 이런 사람이다</h2>
            <div className="learn-section-body">
              <p>
                엔드홀딩스 어쩌구
              </p>
            </div>
          </section>

          <section id="tos" className="learn-section">
            <div className="learn-section-label">이용 약관</div>
            <h2 className="learn-section-title">이용 약관</h2>
            <div className="learn-section-body">
              <p>
                투자는 본인의 어쩌구
              </p>
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
              직접 경험해보세요!
            </h3>
            <p style={{ fontSize: "14px", color: "#8080b0", marginBottom: "20px", lineHeight: 1.6 }}>
              먼저 24시간 무료 체험으로 흐름을 확인하고, 필요하면 플랜을 선택하시는게 어떨까요?
            </p>
            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/trial" className="btn-cta-u btn-cta-u--pink">
              24시간 무료 체험하기 🚀
            </Link>
              <Link href="/#contact" className="btn-cta-u btn-cta-u--blue">
                궁금한 것이 있으신가요? 🙄
              </Link>
            </div>
          </div>

        </main>
      </div>
    </>
  );
}
