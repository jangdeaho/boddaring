"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [lang, setLang] = useState("ko"); // "ko" | "en"
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, yearly, vip

  // KRW per 1 USDT (derived via BTC cross-rate)
  const [exchangeRate, setExchangeRate] = useState(1471);
  const [lastUpdatedAt, setLastUpdatedAt] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    experience: "beginner",
    fundSize: "small",
    plan: "BASIC",
    message: "",
  });

  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | sent | error
  const [emailjsReady, setEmailjsReady] = useState(false);

  // -----------------------------
  // USDT exchange rate (KRW/USDT) via BTC cross-rate (Upbit KRW-BTC / Binance BTCUSDT)
  // 1 minute refresh
  // -----------------------------
  const fetchExchangeRate = async () => {
    try {
      const [upbitRes, binanceRes] = await Promise.all([
        fetch("https://api.upbit.com/v1/ticker?markets=KRW-BTC"),
        fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"),
      ]);
      const upbitData = await upbitRes.json();
      const binanceData = await binanceRes.json();

      const upbitBTC = upbitData?.[0]?.trade_price;
      const binanceBTC = parseFloat(binanceData?.price);

      if (upbitBTC && binanceBTC) {
        const rate = Math.round(upbitBTC / binanceBTC);
        if (Number.isFinite(rate) && rate > 0) {
          setExchangeRate(rate);
          setLastUpdatedAt(new Date());
        }
      }
    } catch (err) {
      console.error("Exchange Rate Error:", err);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const timer = setInterval(fetchExchangeRate, 60_000);
    return () => clearInterval(timer);
  }, []);

  const formatUSDT = (krw) => {
    if (!krw || !exchangeRate) return "0";
    const usdt = Math.round(Number(krw) / Number(exchangeRate));
    return usdt.toLocaleString();
  };

  const formatTime = (d) => {
    if (!d) return "-";
    if (lang === "en") return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
    return d.toLocaleTimeString("ko-KR", { hour: "numeric", minute: "2-digit" });
  };

  // -----------------------------
  // i18n
  // -----------------------------
  const T = useMemo(() => {
    const rateStr = exchangeRate ? exchangeRate.toLocaleString() : "-";
    const timeStr = formatTime(lastUpdatedAt);
    const dict = {
      ko: {
        pageTitle: "서비스 신청하기",
        pageDesc: "원하시는 플랜을 선택하고 신청서를 작성해 주시면 검토 후 빠르게 연락드리겠습니다.",
        tabMonthly: "월 플랜",
        tabYearly: "연 플랜",
        tabVIP: "VIP",
        plansTitle: "플랜 선택",
        vatNote: "* 모든 플랜은 부가세(VAT) 포함입니다.",
        exchangeInfo: `현재 USDT 환율 : ${rateStr} KRW (${timeStr})`,
        exchangeNote: "플랜 가격은 결제 당시 환율(USDT)로 계산됩니다.",
        selectedBadge: "선택됨",
        requiredHint: "필수 항목을 모두 입력하면 제출 버튼이 활성화됩니다.",
        name: "이름",
        phone: "연락처",
        email: "이메일",
        telegram: "텔레그램 ID",
        experience: "코인 투자 경험",
        fundSize: "예상 운용 자금",
        message: "문의사항",
        phName: "홍길동",
        phPhone: "010-0000-0000",
        phEmail: "example@email.com",
        phTelegram: "@username",
        phMessage: "추가 문의사항이 있으시면 입력해 주세요.",
        btnSending: "전송 중...",
        btnSubmit: "신청서 제출하기",
        success: "✅ 신청서가 성공적으로 제출되었습니다! 빠르게 연락드리겠습니다.",
        error: "❌ 전송 실패. 다시 시도해 주세요.",
        backHome: "← 메인으로 돌아가기",
        langKOR: "KOR",
        langENG: "ENG",
        yearlySave: (n) => `최대 ${n}% 절약!`,
        yearlySaveSmall: (krw) => `월 플랜 대비 ${krw.toLocaleString()}원 절약!`,
      },
      en: {
        pageTitle: "Apply for Service",
        pageDesc: "Select a plan and submit the application. We’ll review it and get back to you shortly.",
        tabMonthly: "Monthly",
        tabYearly: "Yearly",
        tabVIP: "VIP",
        plansTitle: "Select a Plan",
        vatNote: "* All prices include VAT.",
        exchangeInfo: `Current USDT rate: ${rateStr} KRW (${timeStr})`,
        exchangeNote: "Plan prices are calculated using the USDT rate at the time of payment.",
        selectedBadge: "Selected",
        requiredHint: "The submit button activates after required fields are filled.",
        name: "Name",
        phone: "Phone",
        email: "Email",
        telegram: "Telegram ID",
        experience: "Crypto Experience",
        fundSize: "Estimated Capital",
        message: "Message",
        phName: "John Doe",
        phPhone: "+82 10-0000-0000",
        phEmail: "example@email.com",
        phTelegram: "@username",
        phMessage: "Write any additional details here.",
        btnSending: "Sending...",
        btnSubmit: "Submit Application",
        success: "✅ Submitted successfully! We’ll contact you shortly.",
        error: "❌ Failed to send. Please try again.",
        backHome: "← Back to Home",
        langKOR: "KOR",
        langENG: "ENG",
        yearlySave: (n) => `Save up to ${n}%!`,
        yearlySaveSmall: (krw) => `Save ₩${krw.toLocaleString()} vs monthly!`,
      },
    };
    return dict[lang];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang, exchangeRate, lastUpdatedAt]);

  // persist language
  useEffect(() => {
    try {
      const saved = localStorage.getItem("boddaring_lang");
      if (saved === "ko" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  const setLanguage = (next) => {
    setLang(next);
    try {
      localStorage.setItem("boddaring_lang", next);
    } catch {}
  };

  const experienceOptions = useMemo(
    () => [
      { value: "beginner", labelKo: "1년 미만", labelEn: "Less than 1 year" },
      { value: "intermediate", labelKo: "1~3년", labelEn: "1–3 years" },
      { value: "advanced", labelKo: "3년 이상", labelEn: "3+ years" },
    ],
    []
  );

  const fundOptions = useMemo(
    () => [
      { value: "small", labelKo: "1,000만원 이하", labelEn: "Under ₩10M" },
      { value: "medium", labelKo: "1,000만원 ~ 1억원", labelEn: "₩10M ~ ₩100M" },
      { value: "large", labelKo: "1억원 이상", labelEn: "₩100M+" },
    ],
    []
  );

  const plans = useMemo(
    () => ({
      monthly: [
        { id: "BASIC", krw: 2200000, descKo: "실시간 시그널", descEn: "Real-time signals" },
        { id: "PRO", krw: 3000000, descKo: "시그널 + 종합 BOT", descEn: "Signals + Execution BOT" },
        { id: "BOT", krw: 880000, descKo: "종합 BOT", descEn: "Execution BOT" },
      ],
      yearly: [
        { id: "BASIC", krw: 20000000, descKo: "실시간 시그널", descEn: "Real-time signals" },
        { id: "PRO", krw: 30000000, descKo: "시그널 + 종합 BOT", descEn: "Signals + Execution BOT" },
        { id: "BOT", krw: 8000000, descKo: "종합 BOT", descEn: "Execution BOT" },
      ],
      vip: [
        {
          id: "VIP",
          krw: 0,
          priceKo: "별도 문의",
          priceEn: "Contact us",
          descKo: "커스텀 전략 및 전용 인프라 구축",
          descEn: "Custom strategy & dedicated infrastructure",
        },
      ],
    }),
    []
  );

  const yearlyMaxSavePct = useMemo(() => {
    const monthly = plans.monthly;
    const yearly = plans.yearly;
    const pcts = yearly.map((y) => {
      const m = monthly.find((x) => x.id === y.id);
      if (!m || !m.krw || !y.krw) return 0;
      const total = m.krw * 12;
      const save = total - y.krw;
      if (total <= 0) return 0;
      return Math.max(0, Math.round((save / total) * 100));
    });
    return Math.max(0, ...pcts);
  }, [plans]);

  const yearlySavingsById = useMemo(
    () => ({
      BASIC: 6400000,
      PRO: 6000000,
      BOT: 800000,
    }),
    []
  );

  const getExperienceLabel = (val) => {
    const found = experienceOptions.find((o) => o.value === val);
    if (!found) return val;
    return lang === "ko" ? found.labelKo : found.labelEn;
  };

  const getFundLabel = (val) => {
    const found = fundOptions.find((o) => o.value === val);
    if (!found) return val;
    return lang === "ko" ? found.labelKo : found.labelEn;
  };

  // EmailJS init
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
      setEmailjsReady(true);
    }
  }, []);

  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  const onTabClick = (tab) => {
    setActiveTab(tab);
    const first = plans[tab]?.[0]?.id;
    if (first) setFormData((p) => ({ ...p, plan: first }));
  };

  const isFormValid = useMemo(() => {
    const req = ["name", "phone", "email", "telegram"];
    return req.every((k) => String(formData[k] || "").trim().length > 0);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailjsReady) return;
    if (!isFormValid) return;

    setFormStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION;
      if (!serviceId || !templateId) throw new Error("Missing EmailJS env vars.");

      const experienceLabel = getExperienceLabel(formData.experience);
      const fundLabel = getFundLabel(formData.fundSize);

      const selectedPlan = (plans[activeTab] || []).find((p) => p.id === formData.plan);
      const selectedKrw = selectedPlan?.krw || 0;

      const krwPriceLabel =
        selectedKrw > 0 ? `${selectedKrw.toLocaleString()} KRW` : lang === "ko" ? "별도 문의" : "Contact us";
      const usdtPriceLabel =
        selectedKrw > 0 ? `${formatUSDT(selectedKrw)} USDT` : lang === "ko" ? "별도 문의" : "Contact us";

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        telegram_id: formData.telegram,

        experience: experienceLabel,
        fund_size: fundLabel,

        selected_plan: `${activeTab.toUpperCase()} - ${formData.plan}`,
        plan_krw: krwPriceLabel,
        plan_usdt: usdtPriceLabel,

        exchange_rate: `${exchangeRate.toLocaleString()} KRW/USDT`,
        rate_updated: lastUpdatedAt ? formatTime(lastUpdatedAt) : "-",

        message: formData.message || (lang === "ko" ? "(메시지 없음)" : "(No message)"),
        to_name: lang === "ko" ? "BODDARING 관리자" : "BODDARING Admin",
        ui_lang: lang,
      });

      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="applyWrap">
      <style jsx global>{`
        /* =========================
           Aurora (TradingView-ish but unique)
           - layered orbs + conic wash + subtle noise
           ========================= */
        .applyWrap {
          position: relative;
          padding: 120px 40px;
          max-width: 1400px;
          margin: 0 auto;
          color: #fff;
          overflow: hidden;
          background: #0a0e27;
        }
        @media (max-width: 1024px) {
          .applyWrap { padding: 110px 20px; }
        }
        .aurora {
          position: absolute;
          inset: -160px;
          pointer-events: none;
          z-index: 0;
          opacity: 1;
        }
        .aurora::before{
          content:"";
          position:absolute;
          inset:0;
          background:
            radial-gradient(55% 55% at 18% 28%, rgba(124,58,237,0.35) 0%, transparent 62%),
            radial-gradient(52% 52% at 88% 38%, rgba(236,72,153,0.28) 0%, transparent 64%),
            radial-gradient(46% 46% at 72% 86%, rgba(59,130,246,0.22) 0%, transparent 62%),
            radial-gradient(40% 40% at 22% 84%, rgba(167,139,250,0.20) 0%, transparent 64%),
            radial-gradient(35% 35% at 45% 45%, rgba(34,197,94,0.12) 0%, transparent 68%);
          filter: blur(50px);
          mix-blend-mode: screen;
          animation: auroraMove1 14s ease-in-out infinite;
          transform: translateZ(0);
        }
        .aurora::after{
          content:"";
          position:absolute;
          inset:-60px;
          background:
            conic-gradient(from 210deg at 50% 50%,
              rgba(124,58,237,0.12),
              rgba(236,72,153,0.14),
              rgba(59,130,246,0.12),
              rgba(34,197,94,0.08),
              rgba(124,58,237,0.12));
          filter: blur(70px);
          opacity: 0.65;
          mix-blend-mode: screen;
          animation: auroraMove2 20s ease-in-out infinite reverse;
        }
        @keyframes auroraMove1{
          0%{ transform: translate(-1%, -1%) scale(1); }
          45%{ transform: translate(2%, 1%) scale(1.06); }
          75%{ transform: translate(1%, 2%) scale(1.04); }
          100%{ transform: translate(-1%, -1%) scale(1); }
        }
        @keyframes auroraMove2{
          0%{ transform: translate(0%, 0%) scale(1); }
          50%{ transform: translate(-2%, 1%) scale(1.03); }
          100%{ transform: translate(0%, 0%) scale(1); }
        }
        .auroraNoise{
          position:absolute;
          inset:0;
          pointer-events:none;
          z-index:0;
          opacity:0.15;
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px);
          mix-blend-mode: overlay;
        }
        .content { position: relative; z-index: 1; }

        .backTop {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 5;
          color: rgba(205, 216, 255, 0.72);
          font-weight: 800;
          font-size: 13px;
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(10px);
          transition: transform .18s ease, color .18s ease, border-color .18s ease;
        }
        .backTop:hover {
          transform: translateY(-1px);
          color: rgba(232, 238, 255, 0.92);
          border-color: rgba(167,139,250,0.30);
        }

        .langToggleWrap {
          position: absolute;
          top: 24px;
          right: 24px;
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 5;
        }
        .langBtn {
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(120,100,255,0.18);
          background: rgba(255,255,255,0.03);
          color: #a7b0c8;
          font-weight: 800;
          font-size: 12px;
          cursor: pointer;
          transition: all 180ms ease;
          letter-spacing: 0.5px;
        }
        .langBtn.active {
          color: #e0d7ff;
          border-color: rgba(167,139,250,0.35);
          background: linear-gradient(135deg, rgba(124,58,237,0.22), rgba(167,139,250,0.10));
          box-shadow: 0 0 18px rgba(124,58,237,0.18);
        }

        .rateBox {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 14px;
          border: 1px solid rgba(167,139,250,0.18);
          background: linear-gradient(135deg, rgba(124,58,237,0.16), rgba(167,139,250,0.06));
          box-shadow: 0 0 26px rgba(124,58,237,0.16);
          max-width: 860px;
          margin: 18px auto 0;
          flex-wrap: wrap;
        }
        .rateBox .left { font-size: 12px; font-weight: 900; color: rgba(233, 221, 255, 0.92); }
        .rateBox .right { font-size: 12px; font-weight: 800; color: rgba(186, 196, 230, 0.88); }

        /* ✅ prevent clipping for floating bubbles */
        .applyTabs { 
          display: flex; justify-content: center; gap: 12px; 
          margin: 54px 0 50px; flex-wrap: wrap; 
          overflow: visible;
          padding-top: 14px; /* headroom for bubble */
        }
        .tabBtn {
          position: relative;
          padding: 14px 38px;
          border-radius: 999px;
          border: 2px solid rgba(120, 100, 255, 0.20);
          background: rgba(255,255,255,0.02);
          color: #8080b0;
          cursor: pointer;
          font-weight: 800;
          font-size: 15px;
          transition: all 0.25s ease;
          overflow: visible;
        }
        .tabBtn.active {
          border-color: #7c3aed;
          background: linear-gradient(135deg, rgba(124,58,237,0.20), rgba(167,139,250,0.10));
          color: #c4b5fd;
          box-shadow: 0 0 20px rgba(124,58,237,0.30);
        }
        .vipCrown {
          position: absolute;
          top: -10px;
          right: -8px;
          transform: rotate(18deg);
          filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.45));
          font-size: 16px;
        }
        .yearlyBubble {
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          padding: 7px 10px;
          border-radius: 999px;
          font-size: 12px;
          font-weight: 900;
          color: #f8f2ff;
          background: linear-gradient(135deg, rgba(236,72,153,0.42), rgba(124,58,237,0.22));
          border: 1px solid rgba(255,255,255,0.16);
          box-shadow: 0 0 18px rgba(236,72,153,0.18), 0 0 18px rgba(124,58,237,0.16);
          animation: floaty 2.6s ease-in-out infinite;
          white-space: nowrap;
          z-index: 3;
        }
        .yearlyBubble:after{
          content:"";
          position:absolute;
          left:50%;
          bottom:-7px;
          width:12px;height:12px;
          transform: translateX(-50%) rotate(45deg);
          background: rgba(236,72,153,0.25);
          border-right: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        @keyframes floaty{
          0%,100%{ transform: translateX(-50%) translateY(0); }
          50%{ transform: translateX(-50%) translateY(-6px); }
        }

        .applyGrid { display: grid; grid-template-columns: 1fr 1.2fr; gap: 50px; }
        @media (max-width: 980px) { .applyGrid { grid-template-columns: 1fr; gap: 26px; } }

        .planCard {
          position: relative;
          padding: 24px;
          border-radius: 16px;
          border: 2px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.02);
          cursor: pointer;
          transition: all 0.25s ease;
          overflow: hidden;
        }
        .planCard:hover { border-color: rgba(167,139,250,0.22); background: rgba(255,255,255,0.03); }

        /* ✅ selected style (not VIP) */
        .planCard.selected:not(.vip) {
          border-color: #7c3aed;
          background: linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.08));
          box-shadow: 0 0 30px rgba(124,58,237,0.20);
          transform: scale(1.01);
        }

        /* ✅ "선택됨" pill moved to top-right to avoid collision with price */
        .selectedBadge {
          position: absolute;
          right: 14px;
          top: 14px;
          font-size: 12px;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.22);
          background: rgba(124,58,237,0.18);
          color: #d9ccff;
          opacity: 0;
          transform: translateY(-4px);
          transition: all 220ms ease;
          pointer-events: none;
          z-index: 3;
        }
        .planCard.selected .selectedBadge { opacity: 1; transform: translateY(0px); }

        .planRowTop { position: relative; z-index: 2; display:flex; align-items:flex-start; justify-content:space-between; gap:16px; padding-bottom: 24px; }
        .planTitle { font-weight: 900; font-size: 18px; color: #e0d7ff; }
        .planDesc { font-size: 13px; color: rgba(200,206,235,0.62); margin-top: 10px; font-weight: 700; }
        .planPrice { text-align:right; font-weight: 900; color:#e0d7ff; }
        .planPriceMain { font-size: 15px; white-space: nowrap; }
        .planPriceSub { margin-top: 6px; font-size: 12px; font-weight: 900; color: rgba(168,148,255,0.95); white-space: nowrap; }

        .savingTag {
          display: inline-flex; align-items: center; gap: 6px;
          font-size: 12px; font-weight: 900;
          padding: 7px 10px; border-radius: 999px;
          border: 1px solid rgba(236,72,153,0.22);
          color: rgba(255, 230, 250, 0.95);
          background: rgba(236,72,153,0.12);
          margin-top: 12px;
          width: fit-content;
          animation: floaty 2.8s ease-in-out infinite;
        }

        /* ✅ VIP gold aura/border (stronger + higher specificity) */
        .planCard.vip {
          border-color: rgba(245, 158, 11, 0.62);
          background: linear-gradient(135deg, rgba(245,158,11,0.14), rgba(255,255,255,0.02));
          box-shadow:
            0 0 0 1px rgba(255, 215, 140, 0.12) inset,
            0 0 22px rgba(245, 158, 11, 0.22),
            0 0 38px rgba(234, 179, 8, 0.16);
        }
        .planCard.vip::before{
          content:"";
          position:absolute;
          inset:-45%;
          background:
            radial-gradient(44% 44% at 30% 30%, rgba(245,158,11,0.30) 0%, transparent 62%),
            radial-gradient(38% 38% at 72% 52%, rgba(255,215,140,0.22) 0%, transparent 66%),
            radial-gradient(30% 30% at 55% 85%, rgba(236,72,153,0.12) 0%, transparent 64%);
          filter: blur(34px);
          opacity: 0.95;
          animation: vipDrift 10s ease-in-out infinite;
          pointer-events:none;
          z-index: 1;
        }
        @keyframes vipDrift{
          0%{ transform: translate(-1%, -1%) scale(1); }
          50%{ transform: translate(2%, 1%) scale(1.07); }
          100%{ transform: translate(-1%, -1%) scale(1); }
        }
        .planCard.vip.selected{
          border-color: rgba(245, 158, 11, 0.85);
          background: linear-gradient(135deg, rgba(245,158,11,0.18), rgba(255,255,255,0.02)) !important;
          box-shadow:
            0 0 0 1px rgba(255, 215, 140, 0.16) inset,
            0 0 32px rgba(245, 158, 11, 0.28),
            0 0 52px rgba(234, 179, 8, 0.20) !important;
          transform: scale(1.012);
        }
        .planCard.vip .planTitle{ color: rgba(255, 239, 205, 0.96); }
        .planCard.vip .planDesc{ color: rgba(255, 233, 200, 0.72); }
        .planCard.vip .planPriceMain{ color: rgba(255, 239, 205, 0.92); }
        .planCard.vip .planPriceSub{ color: rgba(255, 214, 150, 0.85); }
        .planCard.vip .selectedBadge{
          border-color: rgba(245,158,11,0.38);
          background: rgba(245,158,11,0.16);
          color: rgba(255, 235, 200, 0.95);
        }

        .formCard {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(120,100,255,0.03));
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(120,100,255,0.15);
          backdrop-filter: blur(10px);
        }
        @media (max-width: 980px) { .formCard { padding: 26px; } }

        .fieldLabel { display:block; margin-bottom:8px; font-size:14px; font-weight:700; color:#e0d7ff; }
        .requiredStar { color:#ff6b6b; margin-left:4px; }

        .input,.select,.textarea {
          width:100%;
          padding:12px;
          border-radius:10px;
          background: rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.10);
          color:#fff;
          font-size:14px;
          outline:none;
          transition: border-color .18s ease, box-shadow .18s ease;
        }
        .input:focus,.select:focus,.textarea:focus{
          border-color: rgba(167,139,250,0.38);
          box-shadow: 0 0 0 4px rgba(124,58,237,0.16);
        }
        .textarea{ min-height:110px; resize:none; font-family:inherit; }

        .submitBtn{
          width:100%;
          padding:16px;
          border-radius:14px;
          border:none;
          font-weight:900;
          font-size:16px;
          cursor:pointer;
          transition: transform .18s ease, filter .18s ease, box-shadow .18s ease, opacity .18s ease;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          box-shadow: 0 0 20px rgba(124,58,237,0.24), 0 0 22px rgba(236,72,153,0.18);
          color:#fff;
        }
        .submitBtn:hover{ transform: translateY(-1px); filter: brightness(1.05); }
        .submitBtn:disabled{ opacity:0.45; cursor:not-allowed; transform:none; filter:none; box-shadow:none; }
      `}</style>

      <div className="aurora" />
      <div className="auroraNoise" />

      <Link href="/" className="backTop">{T.backHome}</Link>

      <div className="content">
        <div className="langToggleWrap" aria-label="Language selector">
          <button className={`langBtn ${lang === "ko" ? "active" : ""}`} onClick={() => setLanguage("ko")} type="button">{T.langKOR}</button>
          <button className={`langBtn ${lang === "en" ? "active" : ""}`} onClick={() => setLanguage("en")} type="button">{T.langENG}</button>
        </div>

        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <h1 style={{
            fontSize: "48px",
            fontWeight: 900,
            marginBottom: "14px",
            background: "linear-gradient(135deg, #e0d7ff, #a78bfa)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>{T.pageTitle}</h1>
          <p style={{ fontSize: "16px", color: "#a0a0c0", marginBottom: "0", lineHeight: 1.65 }}>{T.pageDesc}</p>
          <div className="rateBox" role="note" aria-label="Exchange info">
            <div className="left">{T.exchangeInfo}</div>
            <div className="right">{T.exchangeNote}</div>
          </div>
        </div>

        <div className="applyTabs">
          {["monthly","yearly","vip"].map((tab) => {
            const isActive = activeTab === tab;
            const isVip = tab === "vip";
            const isYear = tab === "yearly";
            return (
              <button key={tab} onClick={() => onTabClick(tab)} type="button" className={`tabBtn ${isActive ? "active" : ""}`}>
                {isYear && <span className="yearlyBubble">{T.yearlySave(yearlyMaxSavePct)}</span>}
                {isVip && <span className="vipCrown" aria-hidden="true">👑</span>}
                {tab === "monthly" ? T.tabMonthly : tab === "yearly" ? T.tabYearly : "VIP"}
              </button>
            );
          })}
        </div>

        <div className="applyGrid">
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px", gap: "16px" }}>
              <h3 style={{ color: "#e0d7ff", fontSize: "20px", fontWeight: 800, margin: 0 }}>{T.plansTitle}</h3>
              <span style={{
                fontSize: "12px",
                color: "#9aa8c7",
                background: "rgba(112,128,160,0.12)",
                border: "1px solid rgba(112,128,160,0.18)",
                padding: "5px 10px",
                borderRadius: "999px",
                whiteSpace: "nowrap",
              }}>{T.vatNote}</span>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {(plans[activeTab] || []).map((p) => {
                const selected = formData.plan === p.id;
                const isVip = String(p.id).toUpperCase() === "VIP";
                const desc = lang === "ko" ? p.descKo : p.descEn;

                const periodKo = activeTab === "monthly" ? "월" : activeTab === "yearly" ? "연" : "";
                const periodEn = activeTab === "monthly" ? "mo" : activeTab === "yearly" ? "yr" : "";

                const krwLine = !isVip && p.krw
                  ? `${periodKo} ${p.krw.toLocaleString()} KRW`
                  : lang === "ko" ? (p.priceKo || "별도 문의") : (p.priceEn || "Contact us");

                const usdLine = !isVip && p.krw ? `${formatUSDT(p.krw)} USDT / ${periodEn}` : "";

                const priceMain = lang === "ko" ? krwLine : (usdLine || krwLine);
                const priceSub = lang === "ko" ? (usdLine || "") : (!isVip && p.krw ? krwLine : "");

                const yearlySaving = activeTab === "yearly" ? yearlySavingsById[p.id] : null;

                return (
                  <label
                    key={`${activeTab}-${p.id}`}
                    className={`planCard ${selected ? "selected" : ""} ${isVip ? "vip" : ""}`}
                  >
                    <span className="selectedBadge">✓ {T.selectedBadge}</span>
                    <input type="radio" name="plan" value={p.id} checked={selected} onChange={handleInput("plan")} style={{ display: "none" }} />

                    <div className="planRowTop">
                      <div>
                        <div className="planTitle">{p.id}</div>
                        <div className="planDesc">{desc}</div>
                        {yearlySaving ? <div className="savingTag">{T.yearlySaveSmall(yearlySaving)}</div> : null}
                      </div>

                      <div className="planPrice">
                        <div className="planPriceMain">{priceMain}</div>
                        {priceSub ? <div className="planPriceSub">{priceSub}</div> : null}
                      </div>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          <form className="formCard" onSubmit={handleSubmit}>
            <p style={{ fontSize: "13px", color: "rgba(186,196,230,0.9)", margin: "0 0 18px" }}>
              <span style={{ color: "#ff6b6b", fontWeight: 900 }}>*</span> {T.requiredHint}
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              <div>
                <label className="fieldLabel">{T.name}<span className="requiredStar">*</span></label>
                <input className="input" type="text" required value={formData.name} onChange={handleInput("name")} placeholder={T.phName} />
              </div>
              <div>
                <label className="fieldLabel">{T.phone}<span className="requiredStar">*</span></label>
                <input className="input" type="tel" required value={formData.phone} onChange={handleInput("phone")} placeholder={T.phPhone} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              <div>
                <label className="fieldLabel">{T.email}<span className="requiredStar">*</span></label>
                <input className="input" type="email" required value={formData.email} onChange={handleInput("email")} placeholder={T.phEmail} />
              </div>
              <div>
                <label className="fieldLabel">{T.telegram}<span className="requiredStar">*</span></label>
                <input className="input" type="text" required value={formData.telegram} onChange={handleInput("telegram")} placeholder={T.phTelegram} />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "18px" }}>
              <div>
                <label className="fieldLabel">{T.experience}</label>
                <select className="select" required value={formData.experience} onChange={handleInput("experience")}>
                  {experienceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ background: "#111629", color: "#fff" }}>
                      {lang === "ko" ? opt.labelKo : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="fieldLabel">{T.fundSize}</label>
                <select className="select" required value={formData.fundSize} onChange={handleInput("fundSize")}>
                  {fundOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ background: "#111629", color: "#fff" }}>
                      {lang === "ko" ? opt.labelKo : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: "22px" }}>
              <label className="fieldLabel">{T.message}</label>
              <textarea className="textarea" value={formData.message} onChange={handleInput("message")} placeholder={T.phMessage} />
            </div>

            <button className="submitBtn" type="submit" disabled={formStatus === "sending" || !isFormValid}>
              {formStatus === "sending" ? T.btnSending : T.btnSubmit}
            </button>

            {formStatus === "sent" && (
              <p style={{ color: "#4ade80", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 800 }}>{T.success}</p>
            )}
            {formStatus === "error" && (
              <p style={{ color: "#ff6b6b", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 800 }}>{T.error}</p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
