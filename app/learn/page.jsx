"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "arbitrage", label: "아비트라지란?" },
  { id: "calc-system", label: "차익 계산 시스템이란?" },
  { id: "realtime", label: "실시간 데이터 수집 방법" },
  { id: "guidebook", label: "A to Z 가이드북" },
  { id: "aboutus", label: "회사 소개" },
  { id: "tos", label: "이용약관" },
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
                무료체험 요청 <span className="arrow">→</span>
              </Link>

              <Link href="/apply" className="btn-cta-u btn-cta-u--blue">
                구독 신청 <span className="arrow">→</span>
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
            <h2 className="learn-section-title">코인 아비트라지란?</h2>
            <div className="learn-section-body">
              <p>
                <strong>코인 아비트라지(Arbitrage)</strong>는 같은 코인이 서로 다른 거래소에서 서로 다른 가격으로 거래될 때,<br />
                <strong>저렴하게 파는 거래소에서 </strong>코인을 프리미엄이 붙은 거래소에 전송하여 가격 차이를 이용해 차익을 만드는 방식입니다.<br />
                코인 아비트라지는 <strong>시장의 방향성(상승/하락)</strong>이 어느 방향으로 가도 전혀 상관없습니다.<br />
                그 과정에서 가격 괴리가 생겼을 때 그 틈을 이용하는 전략에 가깝습니다.
              </p>
              <p>
                암호화폐 시장에서는 특히 국내 거래소(KRW 마켓)와 해외 거래소(USDT 마켓) 사이에 가격 차이가 자주 생깁니다.<br />
                국내가 더 비싸면 <strong>김치 프리미엄</strong>이고, 반대로 국내가 더 싸면 <strong>역프리미엄</strong>입니다.<br />
                이 괴리가 의미 있게 커질 때 차익 기회가 만들어집니다.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-1")}
                  aria-label="프리미엄 설명으로 이동"
                >
                  프리미엄이란?
                </button>
              </p>

              <h4>왜 가격 차이가 발생하는가?</h4>
              <p>
                이유는 단순합니다.<br />
                시장이 같지 않거든요.<br />
                국내는 원화(KRW), 해외는 테더(USDT)를 기준으로 가격이 만들어지고,<br />
                두 시장의 <strong>수요·공급, 유동성, 입·출금 제약, 그 외 규제 환경</strong>이 다르면 가격도 자연스럽게 벌어집니다.<br />
                게다가 이 괴리는 메인 홈페이지에 삽입된 영상처럼 종목, 페어, 거래소별 다양한 조건에서<br />
                <strong>수 초 단위로</strong> 변동하기 때문에, “지금 이 순간 체결 가능한 가격”을 확인하는 게 핵심입니다.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-2")}
                  aria-label="제약요인 설명으로 이동"
                >
                  [제약요인]
                </button>
              </p>

              <h4>언제까지 아비트라지 생태계가 지속될 수 있느냐?</h4>
              <p>
                <strong>첫 번째로,</strong><br />
                국내외 규제·컴플라이언스 환경 차이로 인해 시장이 분리되고, 김프와 역프는 구조적으로 발생할 수 밖에 없습니다.<br />
                국내에서 오더북 공유가 불가능한 이유는 법적·제도적 한계 때문입니다.<br />
                <br />
                우선 특금법에 따라 오더북 공유를 하려면 양쪽 거래소가 모두 자금세탁방지(AML) 의무를 준수하고<br />
                고객 신원확인(KYC)을 이행할 수 있어야 합니다.<br />
                <br />
                하지만 해외 거래소의 AML 이행 여부를 확인하기 어렵고,<br />
                해외 고객 정보를 국내에서 검증하는 것은 현실적으로 불가능에 가깝습니다.<br />
                <br />
                또한 공유받은 오더북 데이터가 실제 사용자 간의 거래에 기반한 것인지,<br />
                아니면 허수 주문이나 가짜 호가인지를 검증하기 어렵다는 문제도 있습니다.<br />
                결국 금융당국 입장에서는 자금세탁 가능성과 거래 진위성 검증 문제를 우려할 수밖에 없습니다.<br />
              </p>
              <p>
                <strong>두 번째로,</strong><br />
                이미 과세가 진행 중인 해외 거래소 간에도 프리미엄이 존재합니다.<br />
                <strong>해외A 거래소의 X/USDT</strong>와 <strong>해외B 거래소의 X/USDT</strong> 또한 가격 괴리가 빈번하게 발생합니다.<br />
                그럼 해외A 거래소의 현물페어 X/USDT와 선물페어 XUSDTPERP의 가격도 항상 같을까요?<br />
                아닙니다. 같은 거래소 내에 현물, 선물이 동시 상장되어 있어도 이 둘의 가격 괴리는 발생합니다.<br />
              </p>
              <p>
                 <strong>세 번째로,</strong><br />
                 다가올 과세를 두려워 하지 마세요. <strong>과세 구간까지 수익을 내야 본인 손에 남는 돈이 있습니다.</strong>
              </p>

              <h4>보따링 아비트라지의 흐름</h4>
              <p>
                보따링 시스템의 흐름은 크게 4단계입니다.<br />
                ① 가격 괴리 탐지<br />
                ② 비용(수수료/환율/슬리피지) 반영<br />
                ③ <strong>호가창(매수벽·매도벽)</strong>으로 “실제 체결 가능 수량” 검증<br />
                ④ 조건 충족 시 실행<br />
                <span className="pulse">BODDARING</span>은 이 중 <strong>①~③을 빠르고 정확하게 표기하는</strong> 데이터·계산 플랫폼입니다.
                <button
                  type="button"
                  className="footnote-ref"
                  onClick={() => scrollToId("premium-3")}
                  aria-label="체결 가능성 설명으로 이동"
                >
                  [체결 가능성]
                </button>
              </p>

              <h4>아비트라지에서 흔히 하는 착각</h4>
                <ul>
                  <li><strong>코인 입출금</strong>이 불가능한 경우, 괴리가 커도 아비트라지가 어렵습니다.</li>

                  <li><strong>호가창이 얇으면</strong> (매수벽·매도벽 수량이 적을 때), 표시된 Per보다 실제 수익률이 낮아질 수 있습니다.</li>

                  <li>
                    <strong>환율</strong>은 “원/달러(KRW/USD)”가 아니라 <strong>비트코인 기반 USDT 실거래 환율</strong>을 기준으로 실행해야 합니다.
                    <ul>
                      <p></p><li>원화(KRW) 입금 후 달러(USD) 현지 출금 혹은 달러(USD) 현지 입금 후 국내 원화(KRW) 반입은 불법입니다.</li>
                      <p></p> <li>원화(KRW) 입금 후 USDT 출금 → 해외 거래소 테더(USDT) 마켓 거래 → 테더(USDT) 반입은 합법이며,<br />
                        그렇기에 원/달러 환율은 실질적으로 아비트라지에 도움되지 않습니다.</li>
                        ※ 관련 규정은 개인/거래소/국가별로 다를 수 있습니다.
                    </ul>
                  </li>
                </ul>

              <div className="learn-footnotes">
                <div className="learn-footnotes-title">캡션</div>
                <div id="premium-1" className="learn-footnote-item">
                  <div className="learn-footnote-label">[프리미엄의 정의]</div>
                  <div className="learn-footnote-body">
                    프리미엄은 “같은 코인인데 국내/해외 가격이 다르게 형성되는 현상”을 말합니다.<br />
                    국내가 더 비싸면 김치 프리미엄, 국내가 더 싸면 역프리미엄이라고 부릅니다.
                  </div>
                </div>
                <div id="premium-2" className="learn-footnote-item">
                  <div className="learn-footnote-label">[제약요인]</div>
                  <div className="learn-footnote-body">
                    괴리의 원인은 환율·유동성·수요·공급·입출금 제약 등 복합적입니다.<br />
                    중요한 건 “왜 벌어졌나”보다, <strong>지금 이 순간 실제로 체결 가능한 괴리인가</strong>입니다.
                  </div>
                </div>
                <div id="premium-3" className="learn-footnote-item">
                  <div className="learn-footnote-label">[체결 가능성]</div>
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
                “국내 1% 비싸다”, "역프가 3%" 단순 최종 거래가 비교는 실전에서 즉각 판단이 불가합니다.<br />
                중요한 건 <strong>실제로 어느 평단에 얼만큼의 수량(Amount)을 사고 팔았을 때 남는 차익금 아닌가요?</strong><br />
                BODDARING 시스템은 수량(Amount) 및 차익(%, Per) 표기 시 <strong>실제 수익률에 가장 근접한 값으로 정리합니다.</strong>
              </p>

              <h4>반영되는 비용 요소</h4>
              <p>
                기본은 3가지입니다.<br />
                <strong>거래 수수료</strong>(거래소/주문유형별), <strong>비트코인 기반의 USDT 실거래 환율</strong> 그리고 <strong>슬리피지</strong>(호가에 따른 체결 손실).<br />
                이 3가지 항목을 제외하고 계산하면 <strong>“수익처럼 보이는데 실제로는 남는 게 없는” 차익 거래 탐지 기능이 쉽게 생깁니다.</strong>
              </p>

              <h4>오더북(매수/매도 호가·수량) 기반 수량(Amount) 및 차익률(%, Per) 시스템</h4>
              <p>
                BODDARING은 “마지막 체결가”가 아니라 <strong>실시간 호가(Order Book)</strong>를 기준으로 Amount, Per를 표기합니다.<br />
                Per는 “국내(USDT 환산) − 해외”의 차이를 백분율로 표현한 값이고,<br />
                여기서 수수료·슬리피지 같은 비용을 반영해 순수 격차에 가깝게 만듭니다.<br />
                즉, 화면에 보이는 수익률이 아니라 <strong>그 수량이 실제로 체결 가능한 구간</strong>에서 계산합니다.<br />
              </p>

              <h4>BODDARING 아비트라지 플랫폼의 타사 대비 대체불가 특장점</h4>
              <p>
                국내와 해외 간 차익이 전부가 아닌 양방향, 국내-국내 / 해외-해외 간의 시그널도 발생됩니다.<br />
                사용자는 최소 Amount 및 Per(%)를 정해두고, 설정값 미만의 구간을 표기하지 않도록 필터링할 수 있습니다.<br />
              </p>

              <h4>필터가 중요한 이유</h4>
              <p>
                1% 차익이라도 코인마다, 거래소마다 아비트라지 난이도 및 거래 변수가 다릅니다.<br />
                BODDARING은 <strong>Amount, Per</strong> 수치를 한 눈에 확인할 수 있도록 개발하였고,<br />
                불필요한 계산 없이 1 초라도 앞서갈 수 있도록 코인명/페어, 출발지 및 도착지의 평단가 체크기능 등의<br />
                다양한 시스템이 구축되어 있습니다.<br />
                “나는 이 정도 규모와 차익률이 충족해야 진입한다” 같은 명확한 기준을 개인별 설정 값을 지정하여 사용할 수 있습니다.<br />
              </p>

              <h4>텔레그램 알림 시스템</h4>
              <p>
                매도 봇 등 프로그램을 사용하게 되면, 사용자 개인용 텔레그램 봇을 통해 즉시 알림이 발송됩니다.<br />
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
                (초반에 영상삽입, title 아래)
                차트가 이렇고 저렇고 거래량이 이렇고 저렇고.. 평생 공부해도 시장 싸이클은 바뀌어요.<br />
                BODDARING은 초심자도 쉽게 배울 수 있는 A to Z 가이드북을 제공합니다.<br/>
              </p>
            </div>
          </section>

          <section id="aboutus" className="learn-section">
            <div className="learn-section-label">회사 소개</div>
            <h2 className="learn-section-title">EndHoldings</h2>
            <div className="learn-section-body">
              <p>
                엔드홀딩스 어쩌구
              </p>
            </div>
          </section>

          <section id="tos" className="learn-section">
            <div className="learn-section-label">개인정보 보호정책</div>
            <h2 className="learn-section-title">이용 약관</h2>
            <div className="learn-section-body">
              <p>
                -
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
