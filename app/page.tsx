"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Slide = {
  img: string;
  tag: string;
  title: string;
  desc: string;
};

function cleanText(s: string) {
  return String(s).replace(/\s*\n+\s*/g, " ").trim();
}

export default function Page() {
  const HERO_SLIDES: Slide[] = useMemo(
    () => [
      {
        img: "/assets/hero-1.png",
        tag: "Signal Dashboard",
        title: "차익 기회만 빠르게 스캔",
        desc: "국내/해외 거래소 가격을 비교해 의미 있는 구간만 남깁니다."
      },
      {
        img: "/assets/hero-2.png",
        tag: "Execution Flow",
        title: "실전 워크플로우 연결",
        desc: "시그널 → 매도/출금/알림까지 이어지는 루틴을 제공합니다."
      },
      {
        img: "/assets/hero-3.png",
        tag: "Automation",
        title: "자동화로 속도 확보",
        desc: "반복 작업을 줄이고 판단/실행에 집중할 수 있게 설계했습니다."
      }
    ],
    []
  );

  const SIGNAL_SHOTS = useMemo(() => ["/assets/bot-1.png", "/assets/bot-2.png"], []);

  const [idx, setIdx] = useState(0);
  const [isHover, setIsHover] = useState(false);
  const startXRef = useRef<number | null>(null);
  const sliderRef = useRef<HTMLDivElement | null>(null);

  // Auto slide
  useEffect(() => {
    const t = setInterval(() => {
      if (!isHover) setIdx((v) => (v + 1) % HERO_SLIDES.length);
    }, 4200);
    return () => clearInterval(t);
  }, [isHover, HERO_SLIDES.length]);

  // Reveal on scroll
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("on");
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  // Year
  const year = new Date().getFullYear();

  const go = (next: number) => {
    const n = (next + HERO_SLIDES.length) % HERO_SLIDES.length;
    setIdx(n);
  };

  const onDown = (clientX: number) => {
    startXRef.current = clientX;
  };
  const onUp = (clientX: number) => {
    const startX = startXRef.current;
    if (startX == null) return;
    const dx = clientX - startX;
    startXRef.current = null;
    if (Math.abs(dx) > 40) {
      dx < 0 ? go(idx + 1) : go(idx - 1);
    }
  };

  return (
    <>
      <div className="blur-orb orb1" />
      <div className="blur-orb orb2" />
      <div className="blur-orb orb3" />

      {/* Topbar */}
      <div className="topbar">
        <div className="container">
          <div className="topbar-inner">
            <a className="brand" href="#top">
              <div className="mark" />
              <div>
                <span>BODDARING</span>
                <small>Arbitrage Intelligence</small>
              </div>
            </a>

            <div className="nav">
              <a href="#how">작동 방식</a>
              <a href="#signal">시그널 소개</a>
              <a href="#bots">봇 소개</a>
              <a href="#contact">문의</a>
            </div>

            <div className="cta">
              {/* 예: <a className="btn" href="https://blog.naver.com/..." target="_blank" rel="noreferrer">블로그</a> */}
              <a className="btn btn-primary" href="#contact">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div id="top" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="panel reveal">
              <div className="panel-inner">
                <div className="pill">
                  <span className="dot" /> 실시간 시세차익 · 시그널 · 자동화 운영
                </div>

                <h1 className="h1">
                  거래소 간 <span className="grad">시세 차익</span>을
                  <br />
                  한눈에, 빠르게!
                </h1>

                <p className="lead">
                  BODDARING은 국내/해외 거래소 가격을 비교해 차익을 계산하고,
                  <br />
                  실행 가능한 기회만 선별해 초 단위로 시그널로 제공합니다.
                  <br />
                  발견부터 실행·관리까지 이어지는 통합 워크플로우를 지원합니다.
                  <span className="mini" style={{ display: "block" }}>
                    * 워크플로우란?
                    <br />
                    시그널 → 판단 → 실행 → 사후관리(BOT, 알림 등)까지 이어지는 “전체 작업 흐름”입니다.
                  </span>
                </p>

                <div className="hero-actions">
                  <a className="btn btn-primary" href="#contact">
                    바로 문의하기
                  </a>
                  <a className="btn" href="#signal">
                    시그널 화면 보기
                  </a>
                  <a className="btn" href="#bots">
                    봇 소개 보기
                  </a>
                </div>

                <div className="kpis">
                  <div className="kpi">
                    <b>Realtime</b>
                    <span>거래소별 가격/환율 기반</span>
                  </div>
                  <div className="kpi">
                    <b>Signal-first</b>
                    <span>실행 가능한 케이스 위주</span>
                  </div>
                  <div className="kpi">
                    <b>Automation</b>
                    <span>봇 연동으로 속도 확보</span>
                  </div>
                </div>

                <div className="mini">
                  ※ 본 페이지는 소개용입니다.
                  <br />
                  　가입/결제는 추후 도입 예정이며 현재는 텔레그램 문의로 안내드립니다.
                </div>
              </div>
            </div>

            {/* Slider */}
            <div
              className="slider reveal"
              id="heroSlider"
              aria-label="boddaring slider"
              ref={sliderRef}
              onMouseEnter={() => setIsHover(true)}
              onMouseLeave={() => setIsHover(false)}
              onMouseDown={(e) => onDown(e.clientX)}
              onMouseUp={(e) => onUp(e.clientX)}
              onTouchStart={(e) => onDown(e.touches[0].clientX)}
              onTouchEnd={(e) => onUp(e.changedTouches[0].clientX)}
            >
              <div className="slides" style={{ transform: `translateX(${-idx * 100}%)` }}>
                {HERO_SLIDES.map((s, i) => (
                  <div
                    key={i}
                    className="slide"
                    style={{ backgroundImage: `url('${s.img}')` }}
                  >
                    <div>
                      <div className="slide-tag">⚡ {cleanText(s.tag)}</div>
                      <div className="slide-title">{cleanText(s.title)}</div>
                      <div className="slide-desc">{cleanText(s.desc)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="dots">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    className={"dotbtn" + (i === idx ? " active" : "")}
                    aria-label={`go to slide ${i + 1}`}
                    onClick={() => go(i)}
                  />
                ))}
              </div>

              {/* nav arrows */}
              <div className="nav-arrows">
                <button className="iconbtn" aria-label="previous" onClick={() => go(idx - 1)}>
                  ‹
                </button>
                <button className="iconbtn" aria-label="next" onClick={() => go(idx + 1)}>
                  ›
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How it works */}
      <section id="how">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>어떻게 작동하나요?</h2>
              <p className="subhead">“많이 뜨는 것”이 아니라, 실제로 실행 가능한 조건을 중심으로 정리합니다.</p>
            </div>
          </div>

          <div className="grid3">
            <div className="card reveal">
              <div className="badge">
                <i /> Data
              </div>
              <h3>거래소 가격/유동성 체크</h3>
              <p>
                호가 / 스프레드 / 체결 가능성을 고려하여 <br />
                <b>“그럴듯한 숫자”</b>를 걸러냅니다.
              </p>
            </div>

            <div className="card reveal">
              <div className="badge">
                <i /> Signal
              </div>
              <h3>기회만 선별하는 시그널</h3>
              <p>조건을 만족하는 케이스만 추려 시그널로 제공합니다. 필요한 정보만 빠르게 전달합니다.</p>
            </div>

            <div className="card reveal">
              <div className="badge">
                <i /> Execute
              </div>
              <h3>봇 연동으로 사용자 편의성 Up!</h3>
              <p>
                매도BOT, 국/해외 출금BOT 외 여러 봇들로
                <br />
                실전 흐름에 필요한 보조 프로그램을 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Signal */}
      <section id="signal">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>시그널 사이트 소개</h2>
              <p className="subhead">
                거래소 간 가격 차이를 비교해, 실시간으로 의미 있는 차익 기회를 보여줍니다.
                <br />
                (예: Korea / Global / Minor 구간 분리, 금액·퍼센트 기준 필터링)
              </p>
            </div>
          </div>

          <div className="split">
            <div className="shot reveal">
              <div className="img" style={{ backgroundImage: `url('${SIGNAL_SHOTS[0]}')` }} />
              <div className="overlay" />

              {/* 배지 우측 상단 */}
              <div className="cap-badge">
                <span className="pill">
                  <span className="dot" /> Live
                </span>
              </div>

              {/* 텍스트 하단 */}
              <div className="cap">
                <div className="txt">
                  <b>대시보드 뷰</b>
                  <span>구간별(국내/글로벌/마이너)로 기회를 정리하여 한 눈에 판단할 수 있게 구성합니다.</span>
                </div>
              </div>
            </div>

            <div className="shot reveal">
              <div className="img" style={{ backgroundImage: `url('${SIGNAL_SHOTS[1]}')` }} />
              <div className="overlay" />

              {/* 배지 우측 상단 */}
              <div className="cap-badge">
                <span className="pill" style={{ borderColor: "rgba(252,163,17,.25)", color: "rgba(252,163,17,.95)" }}>
                  ⚡ Signal
                </span>
              </div>

              {/* 텍스트 하단 */}
              <div className="cap">
                <div className="txt">
                  <b>필터 &amp; 실행 중심</b>
                  <span>체감상 “되는 것”만 남기기 위해 여러 조건을 걸어 노이즈를 줄입니다.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bots */}
      <section id="bots">
        <div className="container">
          <div className="section-head reveal">
            <div>
              <h2>봇 소개</h2>
              <p className="subhead">
                단순 알림이 아니라 <b>“실행 루틴”</b>까지 이어지도록 설계했습니다.
                <span className="mini" style={{ display: "block" }}>
                  운영 방식은 문의 시 안내
                </span>
              </p>
            </div>
          </div>

          <div className="grid3">
            <div className="card reveal">
              <div className="badge">
                <i /> Sell Bot
              </div>
              <h3>종합 매도봇</h3>
              <p>다중 거래소 지원, 반복 실행, 알림/로그/안전장치 중심의 실전형 매도 워크플로우.</p>
            </div>
            <div className="card reveal">
              <div className="badge">
                <i /> Withdrawal
              </div>
              <h3>출금봇</h3>
              <p>주소/네트워크 기반 선택, 수수료 반영, 자동 재시도 등 출금 루틴을 빠르게 표준화.</p>
            </div>
            <div className="card reveal">
              <div className="badge">
                <i /> Alerts
              </div>
              <h3>그 외 제공되는 봇</h3>
              <p>컨트랙트 검색, 잔고 알림, 가격 감지 매도봇, 메타마스크 출금봇 등 텔레그램 연동으로 운영 효율을 높입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="container">
          <div className="panel reveal">
            <div
              className="panel-inner"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}
            >
              <div>
                <h2 style={{ margin: "0 0 8px" }}>아비트라지에 관심이 있다면?</h2>
                <p className="subhead" style={{ margin: 0 }}>
                  텔레그램 문의로 사용 흐름을 안내드립니다.
                </p>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <a className="btn btn-primary" href="https://t.me/ttarihunter" target="_blank" rel="noreferrer">
                  텔레그램 문의하기
                </a>
                <a className="btn" href="https://blog.naver.com/forgotten-season/224174439754" target="_blank" rel="noreferrer">
                  블로그 방문하기
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="footer-row">
            <div>© {year} BODDARING. All rights reserved.</div>
            <div className="links">
              <a href="#top">Top</a>
              <a href="#signal">Signal</a>
              <a href="#bots">Bots</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}