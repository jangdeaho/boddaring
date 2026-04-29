"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

const SECTIONS = [
  { id: "arbitrage", label: "코인 아비트라지란?" },
  { id: "calc-system", label: "차익 계산 시스템이란?" },
  { id: "guidebook", label: "A to Z 가이드북" },
  { id: "QNA", label: "자주 묻는 질문" },
  { id: "glossary", label: "용어 사전" },
];

const INFO_SECTIONS = [
  { id: "wallet-alerts", label: "거래소 지갑 알림" },
  { id: "notice-alerts", label: "거래소 공지 알림" },
  { id: "exchange-links", label: "거래소 가입 링크" },
];

const ALL_SECTIONS = [...SECTIONS, ...INFO_SECTIONS];

const TELEGRAM_WALLET_LINK = "https://t.me/BODDARING_WALLET";

const TELEGRAM_NOTICE_LINK = "https://t.me/BODDARING_NOTICE";

const WALLET_ALERT_API_URL = "https://api.boddaring.com/wallet/alerts?limit=30";

const WALLET_ALERT_PREVIEW = [
  {
    type: "wallet_change",
    exchange: "MEXC",
    title: "MEXC 지갑 변경 감지",
    lines: ["USDT (TRX) : 입금 ❌ ┊ 출금 ✅"],
    time: "최근 알림",
    tone: "danger",
  },
  {
    type: "wallet_added",
    exchange: "BINANCE",
    title: "BINANCE 신규 지갑 추가",
    lines: ["WLD (OPTIMISM) : 입금 ✅ ┊ 출금 ✅", "USDT (TON) : 입금 ✅ ┊ 출금 ✅"],
    time: "샘플",
    tone: "success",
  },
  {
    type: "network_check",
    exchange: "OKX",
    title: "OKX 네트워크 점검 감지",
    lines: ["MATIC 네트워크 : 입금 ❌ ┊ 출금 ❌", "영향 코인 : USDT, USDC, POL 외 다수"],
    time: "샘플",
    tone: "warning",
  },
];

const EXCHANGE_LINKS = [
  { name: "코인원", eng: "Coinone", href: "https://buly.kr/uVKTup", region: "KOREA", icon: "coinone.png" },
  { name: "업비트", eng: "Upbit", href: "https://buly.kr/9tByViY", region: "KOREA", icon: "upbit.png" },
  { name: "빗썸", eng: "Bithumb", href: "https://buly.kr/3NJwDV8", region: "KOREA", icon: "bithumb.png" },
  { name: "코빗", eng: "Korbit", href: "https://buly.kr/C0B4HW3", region: "KOREA", icon: "korbit.png" },

  { name: "후오비", eng: "HTX", href: "https://buly.kr/3CPBEjq", region: "GLOBAL", icon: "htx.png" },
  { name: "쿠코인", eng: "Kucoin", href: "https://buly.kr/28udLsY", region: "GLOBAL", icon: "kucoin.png" },
  { name: "오케이", eng: "OKX", href: "https://buly.kr/9MRhZLv", region: "GLOBAL", icon: "okx.png" },
  { name: "게이트아이오", eng: "Gate.io", href: "https://buly.kr/DwFP4a3", region: "GLOBAL", icon: "gateio.png" },
  { name: "아센덱스", eng: "Ascendex", href: "https://buly.kr/7QNMmPh", region: "GLOBAL", icon: "ascendex.png" },
  { name: "멕시", eng: "MEXC", href: "https://buly.kr/6td5pyM", region: "GLOBAL", icon: "mexc.png" },
  { name: "바이비트", eng: "Bybit", href: "https://buly.kr/3CPBEqk", region: "GLOBAL", icon: "bybit.png" },
  { name: "비트마트", eng: "Bitmart", href: "https://buly.kr/EduQzt1", region: "GLOBAL", icon: "bitmart.png" },
  { name: "바이낸스", eng: "Binance", href: "https://buly.kr/9iHDX4B", region: "GLOBAL", icon: "binance.png" },
  { name: "비트겟", eng: "Bitget", href: "https://buly.kr/YfoWiR", region: "GLOBAL", icon: "bitget.png" },
  { name: "크립토닷컴", eng: "Crypto.com", href: "https://buly.kr/8Ix9ghG", region: "GLOBAL", icon: "cryptocom.png" },
  { name: "코인베이스", eng: "Coinbase advanced", href: "https://buly.kr/BTQp3YC", region: "GLOBAL", icon: "coinbase.png" },
  { name: "빙엑스", eng: "BingX", href: "https://buly.kr/AllnYl4", region: "GLOBAL", icon: "bingx.png" },
  { name: "코인엑스", eng: "CoinEx", href: "https://buly.kr/3YEjL8Q", region: "GLOBAL", icon: "coinex.png" },
  { name: "엘뱅크", eng: "LBank", href: "https://buly.kr/31USOU5", region: "GLOBAL", icon: "lbank.png" },
  { name: "크라켄", eng: "Kraken", href: "https://buly.kr/AF1WcLL", region: "GLOBAL", icon: "kraken.png" },
  { name: "제미니", eng: "Gemini", href: "https://exchange.gemini.com", region: "GLOBAL", icon: "" },
  { name: "딥코인", eng: "Deepcoin", href: "https://buly.kr/A46ldJA", region: "GLOBAL", icon: "deepcoin.png" },
  { name: "오렌지엑스", eng: "OrangeX", href: "https://buly.kr/2JpQTQ3", region: "GLOBAL", icon: "orangex.png" },
];

export default function LearnPage() {
  const [activeId, setActiveId] = useState("arbitrage");
  const [walletAlerts, setWalletAlerts] = useState([]);
  const [walletAlertStatus, setWalletAlertStatus] = useState("loading");

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
    ALL_SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let mounted = true;

    const loadWalletAlerts = async () => {
      try {
        const response = await fetch(`${WALLET_ALERT_API_URL}&t=${Date.now()}`, {
          cache: "no-store",
        });

        if (!response.ok) {
          if (mounted) {
            setWalletAlertStatus("error");
            setWalletAlerts([]);
          }
          return;
        }

        const data = await response.json();
        const items = Array.isArray(data) ? data : data?.alerts;

        if (mounted) {
          if (Array.isArray(items)) {
            setWalletAlerts(items);
            setWalletAlertStatus(items.length > 0 ? "ready" : "empty");
          } else {
            setWalletAlerts([]);
            setWalletAlertStatus("error");
          }
        }
      } catch (_) {
        if (mounted) {
          setWalletAlerts([]);
          setWalletAlertStatus("error");
        }
      }
    };

    loadWalletAlerts();
    const timer = window.setInterval(loadWalletAlerts, 15000);

    return () => {
      mounted = false;
      window.clearInterval(timer);
    };
  }, []);

  return (
    <>
      <style jsx global>{`
        /* ---------- Tooltip (for .footnote-ref) ---------- */
        .footnote-ref{
          position: relative;
        }
        .footnote-ref[data-tip]::after{
          content: attr(data-tip);
          position: absolute;
          left: 50%;
          bottom: calc(100% + 10px);
          transform: translateX(-50%) translateY(6px);
          opacity: 0;
          pointer-events: none;

          max-width: 320px;
          width: max-content;
          white-space: normal;

          padding: 10px 12px;
          border-radius: 12px;
          background: rgba(12, 12, 28, 0.96);
          border: 1px solid rgba(167,139,250,0.35);
          color: rgba(235,242,255,0.92);
          font-size: 12.5px;
          line-height: 1.55;
          box-shadow:
            0 18px 50px rgba(0,0,0,0.55),
            0 0 0 1px rgba(255,255,255,0.04),
            0 0 22px rgba(124,58,237,0.14);
          backdrop-filter: blur(18px);
          z-index: 9999;
          transition: opacity .18s ease, transform .18s ease;
        }
        .footnote-ref[data-tip]::before{
          content: "";
          position: absolute;
          left: 50%;
          bottom: calc(100% + 5px);
          width: 10px;
          height: 10px;
          transform: translateX(-50%) rotate(45deg);
          background: rgba(12, 12, 28, 0.96);
          border-left: 1px solid rgba(167,139,250,0.35);
          border-top: 1px solid rgba(167,139,250,0.35);
          opacity: 0;
          transition: opacity .18s ease;
          z-index: 9999;
          pointer-events: none;
        }
        .footnote-ref:hover::after,
        .footnote-ref:focus-visible::after{
          opacity: 1;
          transform: translateX(-50%) translateY(0);
        }
        .footnote-ref:hover::before,
        .footnote-ref:focus-visible::before{
          opacity: 1;
        }

        /* ---------- Exchange Info / Wallet Alerts ---------- */
        .info-menu-block{
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid rgba(255,255,255,0.07);
        }
        .wallet-alert-shell{
          margin-top: 22px;
          overflow: hidden;
          border-radius: 22px;
          border: 1px solid rgba(167,139,250,0.16);
          background:
            radial-gradient(circle at 10% 0%, rgba(167,139,250,0.18), transparent 34%),
            linear-gradient(180deg, rgba(9,10,28,0.88), rgba(5,6,18,0.96));
          box-shadow:
            0 24px 70px rgba(0,0,0,0.42),
            inset 0 1px 0 rgba(255,255,255,0.05);
        }
        .wallet-alert-topbar{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 16px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.025);
        }
        .wallet-alert-title{
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .wallet-alert-title strong{
          color: #efeaff;
          font-size: 15px;
          letter-spacing: -0.01em;
        }
        .wallet-alert-title span{
          color: rgba(170,176,210,0.75);
          font-size: 12px;
          font-weight: 700;
        }
        .wallet-live-pill{
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-radius: 999px;
          border: 1px solid rgba(34,197,94,0.25);
          background: rgba(34,197,94,0.08);
          color: #bbf7d0;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }
        .wallet-alert-feed{
          display: flex;
          flex-direction: column;
          gap: 14px;
          max-height: 520px;
          overflow-y: auto;
          padding: 20px 18px;
        }
        .wallet-alert-feed::-webkit-scrollbar{ width: 8px; }
        .wallet-alert-feed::-webkit-scrollbar-thumb{
          border-radius: 999px;
          background: rgba(167,139,250,0.35);
        }
        .wallet-empty-state{
          display: flex;
          flex-direction: column;
          gap: 6px;
          padding: 18px 18px;
          border-radius: 16px;
          border: 1px dashed rgba(167,139,250,0.22);
          background: rgba(0,0,0,0.16);
        }

        .wallet-empty-state strong{
          color: #efeaff;
          font-size: 14px;
          font-weight: 900;
        }

        .wallet-empty-state span{
          color: rgba(170,176,210,0.78);
          font-size: 12.5px;
          line-height: 1.6;
          font-weight: 700;
        }

        .wallet-empty-state.error{
          border-color: rgba(248,113,113,0.24);
          background: rgba(60,20,36,0.28);
        }
        .wallet-bubble-row{
          display: flex;
          justify-content: flex-start;
        }
        .wallet-bubble{
          max-width: min(620px, 100%);
          padding: 15px 16px;
          border-radius: 18px 18px 18px 6px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(16,18,44,0.82);
          box-shadow: 0 14px 40px rgba(0,0,0,0.24);
        }
        .wallet-bubble.danger{ border-color: rgba(248,113,113,0.18); background: rgba(60,20,36,0.48); }
        .wallet-bubble.success{ border-color: rgba(34,197,94,0.18); background: rgba(15,50,37,0.44); }
        .wallet-bubble.warning{ border-color: rgba(251,191,36,0.20); background: rgba(62,45,12,0.42); }
        .wallet-bubble-head{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }
        .wallet-bubble-head strong{
          color: #f0eeff;
          font-size: 14px;
          font-weight: 900;
        }
        .wallet-bubble-time{
          color: rgba(170,176,210,0.65);
          font-size: 11px;
          font-weight: 800;
          white-space: nowrap;
        }
        .wallet-bubble-lines{
          display: flex;
          flex-direction: column;
          gap: 6px;
          color: #dbe4ff;
          font-size: 13px;
          line-height: 1.65;
          font-weight: 800;
        }
        .wallet-alert-bottom{
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 14px;
          padding: 18px;
          border-top: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.18);
        }
        .wallet-alert-note{
          color: rgba(170,176,210,0.84);
          font-size: 12.5px;
          line-height: 1.6;
          font-weight: 700;
        }
        .telegram-join-btn{
          flex: 0 0 auto;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 11px 15px;
          border-radius: 999px;
          color: #f8fbff;
          font-size: 13px;
          font-weight: 900;
          text-decoration: none;
          background: linear-gradient(135deg, #38bdf8, #7c3aed);
          box-shadow: 0 15px 36px rgba(56,189,248,0.18);
          transition: transform .18s ease, filter .18s ease;
        }
        .telegram-join-btn:hover{
          transform: translateY(-1px);
          filter: brightness(1.08);
        }
        .disabled-telegram-btn{
          opacity: 0.62;
          cursor: not-allowed;
          filter: grayscale(0.25);
        }

        .notice-wait-pill{
          border-color: rgba(251,191,36,0.28);
          background: rgba(251,191,36,0.10);
          color: #fde68a;
        }

        .notice-maintenance-shell{
          border-color: rgba(251,191,36,0.14);
        }
        .exchange-link-groups{
          margin-top: 22px;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .exchange-link-group{
          padding: 18px;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            radial-gradient(circle at 10% 0%, rgba(167,139,250,0.11), transparent 34%),
            rgba(8,10,28,0.62);
        }

        .exchange-link-group-head{
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 14px;
          margin-bottom: 14px;
        }

        .exchange-link-group-title{
          color: #efeaff;
          font-size: 15px;
          font-weight: 900;
        }

        .exchange-link-group-desc{
          margin-top: 5px;
          color: rgba(170,176,210,0.72);
          font-size: 12.5px;
          line-height: 1.55;
          font-weight: 700;
        }

        .exchange-link-group-count{
          flex: 0 0 auto;
          padding: 6px 9px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.16);
          background: rgba(167,139,250,0.10);
          color: #c4b5fd;
          font-size: 11px;
          font-weight: 900;
        }

        .exchange-link-grid{
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
        }

        .exchange-link-card.compact{
          display: grid;
          grid-template-columns: 38px 1fr auto;
          align-items: center;
          gap: 10px;
          min-height: 66px;
          padding: 12px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          background: rgba(0,0,0,0.16);
          text-decoration: none;
          transition: transform .18s ease, border-color .18s ease, background .18s ease;
        }

        .exchange-link-card.compact:hover{
          transform: translateY(-1px);
          border-color: rgba(167,139,250,0.30);
          background: rgba(167,139,250,0.08);
        }

        .exchange-link-logo{
          width: 38px;
          height: 38px;
          border-radius: 13px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          flex: 0 0 auto;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.08);
          box-shadow: 0 12px 26px rgba(124,58,237,0.12);
        }

        .exchange-link-logo img{
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
          display: block;
        }

        .exchange-link-logo span{
          color: #efeaff;
          font-size: 14px;
          font-weight: 950;
        }

        .exchange-link-meta{
          min-width: 0;
        }

        .exchange-link-name{
          color: #f0eeff;
          font-size: 13.5px;
          font-weight: 900;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .exchange-link-eng{
          margin-top: 3px;
          color: rgba(170,176,210,0.72);
          font-size: 12px;
          font-weight: 800;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .exchange-link-action{
          color: #a78bfa;
          font-size: 12px;
          font-weight: 900;
          white-space: nowrap;
        }
        @media (max-width: 920px){
          .exchange-link-grid{ grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .wallet-alert-bottom{ align-items: flex-start; flex-direction: column; }
        }

        @media (max-width: 560px){
          .exchange-link-grid{ grid-template-columns: 1fr; }
          .exchange-link-card.compact{
            grid-template-columns: 36px 1fr;
          }
          .exchange-link-action{
            grid-column: 2;
          }
          .wallet-alert-topbar{ align-items: flex-start; flex-direction: column; }
        }

        /* ---------- Glossary ---------- */
        .glossary-card{
          margin-top: 22px;
          padding: 22px 22px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.08);
          background: linear-gradient(135deg, rgba(120,100,255,0.10), rgba(20,16,44,0.55));
        }
        .glossary-head{
          display:flex;
          align-items:center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 12px;
        }
        .glossary-title{
          font-size: 12px;
          letter-spacing: .08em;
          text-transform: uppercase;
          color: #9aa0c8;
          font-weight: 900;
        }
        .glossary-hint{
          font-size: 12px;
          color: rgba(170,176,210,0.78);
          font-weight: 700;
          white-space: nowrap;
        }
        .glossary-dl{
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
          margin-top: 14px;
        }
        .glossary-item{
          padding: 14px 14px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.06);
          background: rgba(0,0,0,0.14);
        }
        .glossary-item dt{
          font-size: 13px;
          font-weight: 900;
          color: #e0d7ff;
          margin-bottom: 6px;
        }
        .glossary-item dd{
          font-size: 13px;
          color: #aab0d2;
          line-height: 1.7;
          margin-left: 0;
        }
        .qna-wrap{
          margin-top: 18px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .qna-item{
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.14);
          padding: 0;
          overflow: hidden;
        }

        .qna-q{
          list-style: none;
          cursor: pointer;
          padding: 14px 16px;
          font-weight: 900;
          color: #e0d7ff;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .qna-q::-webkit-details-marker{ display:none; }

        .qna-q::after{
          content: "＋";
          font-weight: 900;
          color: rgba(167,139,250,0.9);
        }

        .qna-item[open] .qna-q::after{
          content: "−";
        }

        .qna-a{
          padding: 0 16px 14px 16px;
          color: #aab0d2;
          line-height: 1.75;
          font-size: 13px;
          font-weight: 600;
        }

        .qna-link{
          color: #c4b5fd;
          font-weight: 800;
          text-decoration: underline;
          text-underline-offset: 3px;
        }
        .qna-video{
          margin-top: 12px;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(0,0,0,0.18);
        }
        .qna-video-el{
          width: 100%;
          height: auto;
          display: block;
          aspect-ratio: 16 / 9;
          object-fit: cover;
        }
        .qna-caption{
          margin-top: 10px;
          font-size: 12px;
          line-height: 1.55;
          color: rgba(170,176,210,0.78);
          font-weight: 700;
        }
      `}</style>

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

          <div className="info-menu-block">
            <div className="learn-sidebar-title">거래소 정보</div>
            <nav className="learn-sidebar-nav">
              {INFO_SECTIONS.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  className={`learn-sidebar-link${activeId === id ? " active" : ""}`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>

          <div style={{ marginTop: "32px", paddingTop: "24px", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
            <div className="learn-sidebar-title">바로가기</div>
            <nav className="learn-sidebar-nav">
              <Link href="/" className="learn-sidebar-link">← 메인으로</Link>
              <Link href="/#contact" className="learn-sidebar-link">문의하기</Link>
              <Link href="/terms" className="learn-sidebar-link">이용약관</Link>
              <Link href="/terms/privacy" className="learn-sidebar-link">개인정보처리방침</Link>
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
                  data-tip="같은 코인이 국내/해외에서 다르게 가격이 형성되는
                  ‘가격 괴리’ 현상"
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
                  data-tip="환율·유동성·입출금 제약 등
                  ‘실행을 막는 변수’가 괴리를 만든다"
                >
                  제약요인
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
                <br />
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
                  data-tip="표시된 괴리가 ‘실제로 체결 가능한 구간’인지가 실전 핵심"
                >
                  체결 가능성
                </button>
              </p>

              <h4>아비트라지에서 흔히 하는 착각</h4>
                <ul>
                  <li><strong>코인 입출금</strong>이 불가능한 경우, 괴리가 커도 아비트라지가 어렵습니다.</li>

                  <li><strong>호가창이 얇으면</strong> (매수벽·매도벽 수량이 적을 때), 표시된 Per보다 실제 수익률이 낮아질 수 있습니다.</li>

                  <li>
                    <strong>환율</strong>은 “원/달러(KRW/USD)”가 아니라{" "}
                    <strong>비트코인 기반 USDT 실거래 환율</strong>을 기준으로 실행해야 합니다.

                    <div className="learn-callout">
                      <div className="learn-callout-title">참고</div>
                      <ul className="learn-callout-list">
                        <li>원화(KRW) 입금 후 달러(USD) 현지 출금 혹은 달러(USD) 현지 입금 후 국내 원화(KRW) 반입은 불법입니다.</li>
                        <li>
                          원화(KRW) 입금 후 USDT 출금 → 해외 거래소 테더(USDT) 마켓 거래 → 테더(USDT) 반입은 합법이며,<br />
                          그렇기에 원/달러 환율은 실질적으로 아비트라지에 도움되지 않습니다.
                        </li>
                      </ul>
                      <div className="learn-callout-footnote">※ 관련 규정은 개인/거래소/국가별로 다를 수 있습니다.</div>
                    </div>
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
                BODDARING 시스템은 수량(Amount) 및 차익(%, Per) 표기 시<br />
                <strong>실제 수익률에 가장 근접한 값으로 정리합니다.</strong>
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

          <hr className="learn-divider" />

          <section id="guidebook" className="learn-section">
            <div className="learn-section-label">초심자도 쉽게</div>
            <h2 className="learn-section-title">A to Z 가이드북 제공</h2>
            <div className="learn-video-wrap" aria-label="Guidebook video">
              <div className="learn-video-badge">
                <span className="live-dot" />
                Guidebook Preview
              </div>

              <video
                className="learn-video"
                src="/videos/guidebook.mp4"
                autoPlay
                muted
                loop
                playsInline
                controls={false}
                preload="metadata"
              />
            </div>

            <div className="learn-section-body">
              <p>
                <br></br>
                주식도, 코인도 결국 시장은 ‘사이클’이 돌죠.<br />
                반감기, 조정 구간, 불장·약세장… 용어는 많지만<br />
                몇 년을 공부해도 단 하루만에 흐름이 뒤집히는 게 현실입니다.<br />
                <br />
                그래서 {`BODDARING`}은 방향성 예측보다,<br />
                <strong>‘지금 이 순간’ 실제로 벌어지는 가격 괴리</strong>를 기반으로 판단하는 아비트라지 관점의<br />
                <strong>“A to Z 가이드북”</strong>을 제공합니다.<br />
                <span style={{ color: "#c4b5fd", fontWeight: 700 }}>
                  세팅 → 조건 필터 → 시그널 해석 → 실행 체크리스트
                </span>
                까지, 흐름대로 따라오면 됩니다.
              </p>
              <div className="learn-note">
                * 본 가이드북은 무료체험/무료 플랜에는 포함되지 않으며, 구독 플랜에서만 제공됩니다.
              </div>
            </div>
          </section>

          <hr className="learn-divider" />

          <section id="QNA" className="learn-section">
            <div className="learn-section-label">FAQ</div>
            <h2 className="learn-section-title">자주 묻는 질문 (Q&A)</h2>

            <div className="learn-section-body">
              <div className="qna-wrap">

              <details className="qna-item" open>
                <summary className="qna-q">이것을 실제로 사용하시나요?</summary>
                  <div className="qna-a">
                    네. 저는 2021년부터 아비트라지를 실전으로 운영해 왔고, 지금까지 시장에서 살아남아 계속 실행해 왔습니다.<br />
                    보따링은 그 과정에서 쌓인 실전 경험을 바탕으로, 구독자분들과 동일한 <strong>시그널 기준</strong>과 동일한 <strong>종합 BOT(보조 프로그램)</strong>으로<br />
                    운영 흐름을 검증합니다.<br />
                    아래 영상은 2021년부터의 아비트라지 기록(이더스캔 기반)을 간단히 공유한 자료이며,<br />
                    현재까지도 꾸준히 실전으로 운영 중입니다.<br />

                    <div className="qna-video" onContextMenu={(e) => e.preventDefault()}>
                      <p className="qna-caption">
                         ※ 영상은 2021년부터의 온체인 트랜잭션(이더스캔) 기반 참고 자료입니다. 일부는 정보 보호를 위해 블러 처리를 하였습니다.
                      </p>
                      <video
                        className="qna-video-el"
                        src="/videos/etherscan.mp4"
                        controls
                        controlsList="nodownload noplaybackrate noremoteplayback"
                        disablePictureInPicture
                        playsInline
                        preload="metadata"
                      />
                    </div>
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">개발과 업데이트 빈도는 어느 정도인가요?</summary>
                  <div className="qna-a">
                    24시간 상시 운영 기준으로 거래소 추가, 신규 페어(예: 선물/파생 페어), 기능 개선 등을 지속적으로 반영합니다.<br />
                    시장/거래소 정책 변화가 잦은 영역이라, 운영 환경에 맞춰 계속 업데이트됩니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">코인에 대해 아무것도 모릅니다. 어떻게 시작해야 하나요?</summary>
                  <div className="qna-a">
                    처음에는 어렵게 느껴질 수 있지만, 실제 사용 흐름은 <strong>“조건 설정 → 시그널 확인 → 실행 체크”</strong>의 반복입니다.<br />
                    가이드북(A to Z)에서 <strong>세팅/필터/시그널 해석/체크리스트</strong>를 단계별로 안내하며,<br />
                    최소 금액·최소 퍼센트 같은 기본 기준부터 천천히 맞춰가면 됩니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">기관/전문투자자용 맞춤형 프로그램도 가능한가요?</summary>
                  <div className="qna-a">
                    가능합니다.<br />
                    요구사항(거래소/전략/리스크/알림/서버 구조 등)에 따라 범위가 달라지므로,<br />
                    <a className="qna-link" href="mailto:development@endholdings.com">development@endholdings.com</a> 로 문의 주시면 목적에 맞춰 안내드리겠습니다.
                  </div>
                </details>

                {/* --- 추가 FAQ: 구독자 입장에서 많이 묻는 것들 --- */}
                <details className="qna-item">
                  <summary className="qna-q">시그널은 “수익 보장”인가요?</summary>
                  <div className="qna-a">
                    아닙니다. 본 서비스는 투자 판단을 돕는 <strong>데이터 제공/계산 플랫폼</strong>이며,<br />
                    수수료·슬리피지·입출금 제한·네트워크 지연 등 변수에 따라 결과가 달라질 수 있습니다.<br />
                    실전에서는 <strong>호가(매수벽/매도벽)·Amount·입출금 상태</strong>까지 함께 확인하는 것이 중요합니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">어떤 거래소를 지원하나요?</summary>
                  <div className="qna-a">
                    국내(KRW)·해외(USDT) 주요 거래소의 공개 API 데이터를 기반으로 시그널을 구성합니다.<br />
                    연동 거래소 목록은 메인 페이지의 <Link href="/#exchanges" className="qna-link">“연동 거래소”</Link> 섹션에서 확인할 수 있으며,<br />
                    정책/점검/상장 상태에 따라 일부 데이터는 일시적으로 제한될 수 있습니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">입출금이 막히면 어떻게 되나요?</summary>
                  <div className="qna-a">
                    입출금 제한(점검/지연)이 있으면 괴리가 커도 실행이 어려울 수 있습니다.<br />
                    그래서 보따링은 단순 퍼센트가 아닌 <strong>실행 가능성(호가/Amount/상태)</strong>을 함께 보도록 설계되어 있습니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">무료체험은 무엇을 확인하면 좋나요?</summary>
                  <div className="qna-a">
                    무료체험에서는 “내가 원하는 조건(퍼센트/금액/거래소 조합)”이 실제로 얼마나 자주 뜨는지,<br />
                    그리고 호가·Amount 기준으로 봤을 때 실행 가능한 구간이 어느 정도인지 확인해보는 것을 추천합니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">결제/구독은 어떻게 진행되나요?</summary>
                  <div className="qna-a">
                    현재는 신청서 접수 후 안내드리는 방식으로 진행됩니다.<br />
                    결제 수단/절차는 운영 정책에 따라 변경될 수 있으며, 자세한 안내는 신청 후 개별로 전달드립니다.
                  </div>
                </details>

                <details className="qna-item">
                  <summary className="qna-q">문의는 어디로 하면 되나요?</summary>
                  <div className="qna-a">
                    서비스 이용 관련 문의는 메인 페이지 <Link href="/?tab=inquiry#contact" className="qna-link">"문의 접수"</Link>에서 접수할 수 있고,<br />
                    개발/맞춤형 프로그램 관련 문의는 <Link href="/?tab=development#contact" className="qna-link">"개발 문의"</Link> 또는 
                    <a className="qna-link" href="mailto:development@endholdings.com">development@endholdings.com</a> 으로 연락주시면 됩니다.
                  </div>
                </details>

              </div>
            </div>
          </section>

          <hr className="learn-divider" />

          <section id="glossary" className="learn-section">
            <div className="learn-section-label">Glossary</div>
            <h2 className="learn-section-title">용어 사전</h2>
            <div className="learn-section-body">
              <div className="glossary-card">
                <div className="glossary-head">
                  <div className="glossary-title">주요 용어</div>
                  <div className="glossary-hint">본문 용어를 한 번에 정리해둔 영역입니다.</div>
                </div>

                <dl className="glossary-dl">
                  <div className="glossary-item">
                    <dt>프리미엄 (김치 프리미엄 / 역프리미엄)</dt>
                    <dd>같은 코인이라도 국내(KRW)와 해외(USDT) 시장 구조 차이로 가격이 다르게 형성되는 괴리 현상.</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>호가창 / 오더북(Order Book)</dt>
                    <dd>현재 시장에 쌓여 있는 매수·매도 가격/수량 목록. “실제로 체결 가능한 구간”을 판단할 때 핵심.</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>매수벽·매도벽</dt>
                    <dd>특정 가격 구간에 대기 물량이 두껍게 쌓인 상태. 호가가 얇으면 표시된 수익률과 실제 수익률이 달라질 수 있음.</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>슬리피지(Slippage)</dt>
                    <dd>원하는 가격에 전량 체결되지 않아 평균 체결가가 불리해지는 현상(호가/유동성 영향).</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>USDT 실거래 환율(Cross Rate)</dt>
                    <dd>원/달러 고시 환율이 아니라, 실제 시장 거래(예: BTC 기반 교차환산)로 형성되는 KRW↔USDT 체감 환율.</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>Amount / Per(%)</dt>
                    <dd>Amount는 실제 체결 가능 규모, Per는 차익률(%) 지표, (수량/총액). 실전에서는 둘을 함께 봐야 정확함.</dd>
                  </div>

                  <div className="glossary-item">
                    <dt>입·출금 제약</dt>
                    <dd>거래소/네트워크/정책(점검, 제한 등)으로 입출금이 중단되는 상태. 괴리가 커도 실행이 어려울 수 있음.</dd>
                  </div>
                </dl>
              </div>
            </div>
          </section>

          <hr className="learn-divider" />

          <section id="wallet-alerts" className="learn-section">
            <div className="learn-section-label">Wallet Alerts</div>
            <h2 className="learn-section-title">거래소 지갑 알림</h2>
            <div className="learn-section-body">
              <p>
                거래소별 입출금 상태 변화, 신규 지갑 추가, 네트워크 점검·복구 알림을 확인할 수 있습니다.<br />
                가장 빠른 알림은 텔레그램 채널에 먼저 전송되며, 웹 화면은 최근 기록 확인용으로 일부 지연 반영될 수 있습니다.
              </p>

              <div className="wallet-alert-shell">
                <div className="wallet-alert-topbar">
                  <div className="wallet-alert-title">
                    <strong>BODDARING 거래소 지갑 알림</strong>
                    <span>최근 알림 미리보기</span>
                  </div>
                  <div className="wallet-live-pill">
                    <span className="live-dot" />
                    Telegram Alerts
                  </div>
                </div>

                <div className="wallet-alert-feed" aria-live="polite">
                  {walletAlertStatus === "loading" && (
                    <div className="wallet-empty-state">
                      <strong>알림 기록을 불러오는 중입니다.</strong>
                      <span>서버의 최근 지갑 알림 데이터를 확인하고 있습니다.</span>
                    </div>
                  )}

                  {walletAlertStatus === "error" && (
                    <div className="wallet-empty-state error">
                      <strong>알림 기록을 불러오지 못했습니다.</strong>
                      <span>서버 연결 상태를 확인 중입니다. 가장 빠른 알림은 텔레그램 채널에서 확인할 수 있습니다.</span>
                    </div>
                  )}

                  {walletAlertStatus === "empty" && (
                    <div className="wallet-empty-state">
                      <strong>아직 표시할 최근 알림이 없습니다.</strong>
                      <span>새로운 입출금 변경, 신규 지갑 추가, 네트워크 점검 감지가 발생하면 이곳에 표시됩니다.</span>
                    </div>
                  )}

                  {walletAlerts.map((alert, index) => (
                    <div className="wallet-bubble-row" key={`${alert.exchange || "alert"}-${alert.title || index}-${index}`}>
                      <div className={`wallet-bubble ${alert.tone || "danger"}`}>
                        <div className="wallet-bubble-head">
                          <strong>{alert.title}</strong>
                          <span className="wallet-bubble-time">{alert.time || "최근"}</span>
                        </div>
                        <div className="wallet-bubble-lines">
                          {(alert.lines || []).map((line, lineIndex) => (
                            <div key={lineIndex}>{line}</div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="wallet-alert-bottom">
                  <div className="wallet-alert-note">
                    텔레그램 채널은 서버 감시 엔진에서 가장 먼저 전송됩니다.<br />
                    텔레그램 채널에 입장하여 실시간으로 알림을 받아보세요!
                  </div>
                  <a
                    href={TELEGRAM_WALLET_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telegram-join-btn"
                  >
                    텔레그램 입장하기 →
                  </a>
                </div>
              </div>
            </div>
          </section>

          <hr className="learn-divider" />

            <section id="notice-alerts" className="learn-section">
              <div className="learn-section-label">Notice Alerts</div>
              <h2 className="learn-section-title">거래소 공지 알림</h2>
              <div className="learn-section-body">
                <p>
                  거래소 상장, 입출금, 점검 공지를 한 곳에서 확인할 수 있도록 준비 중입니다.<br />
                  현재는 지갑 알림 시스템을 우선 운영 중이며, 공지 알림은 안정화 후 순차적으로 공개될 예정입니다.
                </p>

                <div className="wallet-alert-shell notice-maintenance-shell">
                  <div className="wallet-alert-topbar">
                    <div className="wallet-alert-title">
                      <strong>BODDARING 거래소 공지 알림</strong>
                      <span>상장 · 입출금 공지 · 점검 안내 통합 예정</span>
                    </div>
                    <div className="wallet-live-pill notice-wait-pill">
                      준비 중
                    </div>
                  </div>

                  <div className="wallet-alert-feed">
                    <div className="wallet-bubble-row">
                      <div className="wallet-bubble warning">
                        <div className="wallet-bubble-head">
                          <strong>현재 점검 중입니다</strong>
                          <span className="wallet-bubble-time">Coming Soon</span>
                        </div>
                        <div className="wallet-bubble-lines">
                          <div>거래소별 공지 수집 엔진을 준비하고 있습니다.</div>
                          <div>상장 공지, 입출금 공지, 점검 공지를 분리해 제공할 예정입니다.</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="wallet-alert-bottom">
                    <div className="wallet-alert-note">
                      공지 알림은 거래소별 페이지 구조와 API 안정성을 확인한 뒤 공개됩니다.<br />
                      먼저 제공 중인 지갑 알림 채널에서 입출금 상태 변화를 확인할 수 있습니다.
                    </div>
                    <a
                      href={TELEGRAM_NOTICE_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="telegram-join-btn disabled-telegram-btn"
                      onClick={(e) => e.preventDefault()}
                    >
                      공지 알림 준비 중
                    </a>
                  </div>
                </div>
              </div>
            </section>
          <hr className="learn-divider" />

          <section id="exchange-links" className="learn-section">
            <div className="learn-section-label">Exchange Links</div>
            <h2 className="learn-section-title">거래소 가입 링크</h2>
            <div className="learn-section-body">
              <p>
                BODDARING에서 자주 다루는 국내·해외 거래소 링크를 한 곳에 정리했습니다.<br />
                버튼을 누르면 각 거래소 가입/접속 페이지가 새 창으로 열립니다.
              </p>

              <div className="exchange-link-groups">
                {["KOREA", "GLOBAL"].map((region) => {
                  const items = EXCHANGE_LINKS.filter((exchange) => exchange.region === region);
                  const regionTitle = region === "KOREA" ? "국내 거래소" : "해외 거래소";
                  const regionDesc = region === "KOREA"
                    ? "KRW 마켓과 국내 입출금 환경을 확인할 수 있는 거래소입니다."
                    : "USDT 마켓과 글로벌 유동성을 확인할 수 있는 거래소입니다.";

                  return (
                    <div className="exchange-link-group" key={region}>
                      <div className="exchange-link-group-head">
                        <div>
                          <div className="exchange-link-group-title">{regionTitle}</div>
                          <div className="exchange-link-group-desc">{regionDesc}</div>
                        </div>
                        <span className="exchange-link-group-count">{items.length}개</span>
                      </div>

                      <div className="exchange-link-grid compact">
                        {items.map((exchange) => (
                          <a
                            key={`${exchange.name}-${exchange.eng}`}
                            href={exchange.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="exchange-link-card compact"
                          >
                            <div className="exchange-link-logo">
                              {exchange.icon ? (
                                <img
                                  src={`/exchanges/${exchange.icon}`}
                                  alt={`${exchange.eng} logo`}
                                  loading="lazy"
                                />
                              ) : (
                                <span>{exchange.eng.slice(0, 1).toUpperCase()}</span>
                              )}
                            </div>
                            <div className="exchange-link-meta">
                              <div className="exchange-link-name">{exchange.name}</div>
                              <div className="exchange-link-eng">{exchange.eng}</div>
                            </div>
                            <div className="exchange-link-action">이동 →</div>
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
          <hr className="learn-divider" />

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