"use client";

import { useMemo, useState } from "react";
import Starfield from "./components/Starfield";

export default function Home() {
  const [email, setEmail] = useState("");
  const [tg, setTg] = useState("");
  const [msg, setMsg] = useState("");
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState("");

  const canSubmit = useMemo(() => {
    const eok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    const tok = tg.trim().startsWith("@") && tg.trim().length >= 3;
    return eok && tok;
  }, [email, tg]);

  async function onSubmit(e) {
    e.preventDefault();
    if (!canSubmit || sending) return;

    setSending(true);
    setToast("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          telegram: tg.trim(),
          message: msg.trim(),
          source: "boddaring.com",
        }),
      });

      if (!res.ok) {
        const t = await res.text();
        throw new Error(t || "전송 실패");
      }

      setToast("✅ 접수되었습니다. 곧 답변드릴게요!");
      setEmail("");
      setTg("");
      setMsg("");
    } catch (err) {
      setToast("⛔ 전송에 실패했습니다. 잠시 후 다시 시도하거나 이메일로 문의해 주세요.");
    } finally {
      setSending(false);
    }
  }

  const exchanges = [
    "Upbit",
    "Bithumb",
    "Coinone",
    "Korbit",
    "Binance",
    "Bybit",
    "OKX",
    "KuCoin",
  ];

  return (
    <>
      <Starfield />
      <div className="vignette" />

      {/* Top Nav */}
      <header className="navbar">
        <div className="container">
          <div className="nav-inner">
            <a className="brand" href="#top">
              <img className="brand-logo" src="/doge.png" alt="BODDARING" />
              <div>
                <div className="brand-title">BODDARING</div>
                <small className="brand-sub">국내 최고 아비트라지 플랫폼</small>
              </div>
            </a>

            <nav className="nav-links" aria-label="primary">
              <a href="#about">A</a>
              <a href="#signal">B</a>
              <a href="#bots">C</a>
            </nav>

            <div className="nav-cta">
              <a className="btn" href="#contact">문의</a>
              <a className="btn btn-primary" href="/apply">신청하기</a>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main id="top" className="section">
        <div className="container">
          <div className="hero-grid">
            <section className="card card-glow">
              <div className="card-inner">
                <div className="eyebrow">
                  <span className="dot" /> 국내/해외 거래소 데이터 → 시그널 → 실행 루틴
                </div>

                <h1>
                  거래소 간 시세 차익,
                  <br />
                  <span className="shine">한눈에 · 빠르게</span>
                </h1>

                <p className="lead">
                  국내/해외 거래소에 상장된 코인의 데이터를 수집해 가격을 비교하고 차익을 계산합니다.
                  <br />
                  그리고 실행 가능한 기회만 선별해 <b>초 단위로 시그널</b>로 제공합니다.
                </p>

                <div className="exchange-row" aria-label="connected exchanges">
                  {exchanges.map((x) => (
                    <span className="xchip" key={x}>
                      <span className="xlogo" aria-hidden="true">
                        {x.slice(0, 1)}
                      </span>
                      {x}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <a className="btn btn-primary" href="#signal">시그널 미리보기</a>
                  <a className="btn" href="#contact">상담/문의</a>
                </div>

                <div style={{ marginTop: 12 }} className="small">
                  * 상단 A/B/C는 추후 문구 확정 후 변경 가능합니다. (현재는 섹션 앵커 이동)
                </div>
              </div>
            </section>

            <section className="videoFrame" aria-label="demo video">
              {/* 네가 만든 영상으로 교체: public/demo.mp4 */}
              <video
                src="/demo.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
              />
              <div className="videoPlaceholder">
                <div>
                  <div style={{ fontWeight: 950, fontSize: 14, marginBottom: 6 }}>데모 영상 자리</div>
                  <div className="small">
                    public/demo.mp4 로 업로드하면 여기에 자동 재생됩니다.
                    <br />
                    (10~20초 추천, 용량 최적화 권장)
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* About / A */}
      <section id="about" className="section section-tight">
        <div className="container">
          <div className="section-head">
            <h2>한 문장으로 정리</h2>
            <p className="lead">
              BODDARING은 “차익이 <b>되는 구간</b>만 남기고, 실행까지의 루틴을 단순화”합니다.
              숫자만 예쁜 화면이 아니라, 실제 체결/이동/수수료/알림까지 흐름을 생각해서 설계했습니다.
            </p>
          </div>

          <div className="grid3">
            <div className="card feature">
              <span className="badge"><i /> Data</span>
              <h3>수집 범위</h3>
              <p>국내/해외 거래소 상장 코인의 가격/환율/유동성을 기반으로 “비교 가능한 형태”로 정규화합니다.</p>
            </div>
            <div className="card feature">
              <span className="badge"><i /> Signal</span>
              <h3>선별 기준</h3>
              <p>노이즈를 줄이기 위해 구간/퍼센트/금액 등 조건을 걸고, 실행 가능성이 높은 케이스에 집중합니다.</p>
            </div>
            <div className="card feature">
              <span className="badge"><i /> Execute</span>
              <h3>실전 루틴</h3>
              <p>시그널 → 매도/출금/알림 등 “사후 처리”까지 이어지게 구성해 운영 시간을 줄입니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Signal / B */}
      <section id="signal" className="section">
        <div className="container">
          <div className="section-head">
            <h2>시그널 대시보드</h2>
            <p className="lead">
              전체화면 → Korea/Global/Minor 구간으로 포커싱해 “지금 볼 것”만 보여주는 방식.
              다음 단계에서는 여기에 네가 만든 줌/스크롤 데모 영상을 그대로 넣습니다.
            </p>
          </div>

          <div className="card card-glow">
            <div className="card-inner">
              <div className="videoFrame" style={{ height: 420 }}>
                <video src="/signal-demo.mp4" autoPlay muted loop playsInline preload="metadata" />
                <div className="videoPlaceholder">
                  <div>
                    <div style={{ fontWeight: 950, fontSize: 14, marginBottom: 6 }}>시그널 영상 자리</div>
                    <div className="small">public/signal-demo.mp4 로 업로드하면 여기에 표시됩니다.</div>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 14 }} className="small">
                팁: 영상은 mp4(H.264) + 1080p / 10~20초 / 4~8Mbps 정도로 인코딩하면 웹에서 부담이 적습니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bots / C */}
      <section id="bots" className="section">
        <div className="container">
          <div className="section-head">
            <h2>아비트라지에 날개를 달아주는 BOT</h2>
            <p className="lead">
              사용자 편의성을 고려한 보조 프로그램 + 프라이빗한 텔레그램 알림으로,
              실전 흐름에 필요한 “마지막 1마일”을 줄입니다.
            </p>
          </div>

          <div className="grid3">
            <div className="card feature">
              <span className="badge"><i /> Sell</span>
              <h3>종합 매도봇</h3>
              <p>다중 거래소 지원, 반복 실행, 로그/알림/안전장치를 포함한 실전형 워크플로우.</p>
            </div>
            <div className="card feature">
              <span className="badge"><i /> Withdraw</span>
              <h3>출금봇</h3>
              <p>주소/네트워크 선택, 수수료 반영, 자동 재시도 등 출금 루틴을 빠르게 표준화.</p>
            </div>
            <div className="card feature">
              <span className="badge"><i /> Utility</span>
              <h3>유틸리티 봇</h3>
              <p>컨트랙트 검색, 잔고 알림, 가격 트리거 등 운영에 필요한 기능을 텔레그램과 연결.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy + Contact */}
      <section id="contact" className="section">
        <div className="container">
          <div className="split">
            <div className="card card-glow">
              <div className="card-inner">
                <h2 style={{ marginBottom: 10 }}>왜 ‘환율’이 아니라 ‘테더 환율’인가</h2>
                <div className="quote">
                  한국에서 개인이 달러를 입출금하며 “환전 플레이”를 하는 건 현실적으로 제약이 많습니다.
                  그래서 아비트라지는 원/달러 그 자체보다, <b>거래가 실제로 일어나는 테더(USDT) 흐름</b>을 보는 게 핵심입니다.
                  <br /><br />
                  그리고 아비트라지는 “비트코인이 얼마냐 / 이더가 얼마냐”의 문제가 아닙니다.
                  기본적 분석·기술적 분석에 매달리기보다, 우리가 보여주는 <b>실행 가능한 차익</b> 자체에 집중하면 됩니다.
                  <br /><br />
                  주식/코인 경력 10년차가 살아남은 방식 — 하루 종일 차트 보며 평단가 근처에서 와리가리하는 스트레스,
                  이제 줄이고 싶지 않으신가요? <b>데이트레이딩으로 끝낼 수 있는 아비트라지</b>의 매력에 들어오세요.
                </div>
              </div>
            </div>

            <div className="card card-glow">
              <div className="card-inner">
                <h2 style={{ marginBottom: 10 }}>문의하기</h2>

                <form className="form" onSubmit={onSubmit}>
                  <div className="field">
                    <label>
                      이메일 <span className="req">*</span>
                    </label>
                    <input
                      className="input"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="이메일을 입력해 주세요."
                      type="email"
                      autoComplete="email"
                    />
                  </div>

                  <div className="field">
                    <label>
                      텔레그램 ID <span className="req">*</span>
                    </label>
                    <input
                      className="input"
                      value={tg}
                      onChange={(e) => setTg(e.target.value)}
                      placeholder="예) @username"
                      type="text"
                      autoComplete="off"
                    />
                  </div>

                  <div className="field">
                    <label>궁금한 게 있으신가요?</label>
                    <textarea
                      className="textarea"
                      value={msg}
                      onChange={(e) => setMsg(e.target.value)}
                      placeholder="문의 사항을 작성해 주세요."
                    />
                  </div>

                  <div className="form-row">
                    <button className="btn btn-primary" type="submit" disabled={!canSubmit || sending}>
                      {sending ? "전송 중..." : "문의 등록하기"}
                    </button>
                    <div className="hint">
                      또는 <b>boddaring@endholdings.com</b> 으로 문의해 주세요.
                    </div>
                  </div>

                  {toast ? <div className="toast">{toast}</div> : null}
                </form>

                <div style={{ marginTop: 12 }} className="small">
                  * 필수 항목(이메일/텔레그램 ID)을 입력해야 버튼이 활성화됩니다.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer">
        <div className="container">
          <div className="footerRow">
            <div>© {new Date().getFullYear()} BODDARING. All rights reserved.</div>
            <div className="footerLinks">
              <a href="#top">Top</a>
              <a href="#about">A</a>
              <a href="#signal">B</a>
              <a href="#bots">C</a>
              <a href="/apply">신청하기</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
