"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [lang, setLang] = useState("ko"); // "ko" | "en"
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, yearly, vip
  const [exchangeRate, setExchangeRate] = useState(1471); // KRW per 1 USDT (derived via BTC cross-rate)
  const [lastUpdated, setLastUpdated] = useState("");
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

  const [formStatus, setFormStatus] = useState("idle");
  const [emailjsReady, setEmailjsReady] = useState(false);

  // -----------------------------
  // USDT exchange rate (KRW/USDT) via BTC cross-rate (Upbit KRW-BTC / Binance BTCUSDT)
  // 1 minute refresh to avoid rate-limit / jitter
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
          setLastUpdated(new Date().toLocaleTimeString());
        }
      }
    } catch (err) {
      console.error("Exchange Rate Error:", err);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const timer = setInterval(fetchExchangeRate, 60_000); // 1 min
    return () => clearInterval(timer);
  }, []);

  const formatUSDT = (krw) => {
    if (!krw || !exchangeRate) return "0";
    const usdt = Math.round(Number(krw) / Number(exchangeRate));
    return usdt.toLocaleString();
  };

  // -----------------------------
  // i18n dictionary
  // -----------------------------
  const T = useMemo(() => {
    const dict = {
      ko: {
        pageTitle: "서비스 신청하기",
        pageDesc: "원하시는 플랜을 선택하고 신청서를 작성해 주시면 검토 후 빠르게 연락드리겠습니다.",
        tabMonthly: "월 플랜",
        tabYearly: "연 플랜",
        tabVIP: "VIP",
        plansTitle: "플랜 선택",
        vatNote: "* 모든 플랜은 부가세(VAT) 포함입니다.",
        exchangeInfo: `현재 환율: ${exchangeRate.toLocaleString()} KRW (1분 단위 갱신: ${lastUpdated || "-"})`,
        priceNote: "* 플랜 가격은 결제 당시 환율로 계산됩니다.",
        yearlyPromoTitle: "연 플랜 혜택",
        yearlyPromoDesc: "연 플랜은 2개월 할인 혜택이 적용됩니다.",
        yearlyBadge: "✨2개월 할인 혜택!",
        selectedBadge: "선택됨",

        formRequiredNote: " 는 필수 입력 항목입니다.",
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
      },
      en: {
        pageTitle: "Apply for Service",
        pageDesc: "Select a plan and submit the application. We’ll review it and get back to you shortly.",
        tabMonthly: "Monthly",
        tabYearly: "Yearly",
        tabVIP: "VIP",
        plansTitle: "Select a Plan",
        vatNote: "* All prices include VAT.",
        exchangeInfo: `Exchange rate: ${exchangeRate.toLocaleString()} KRW (Updated: ${lastUpdated || "-"})`,
        priceNote: "* Plan prices are calculated using the exchange rate at the time of payment.",
        yearlyPromoTitle: "Yearly Benefit",
        yearlyPromoDesc: "Yearly plans include a 2-month discount.",
        yearlyBadge: "✨2-Month Discount!",
        selectedBadge: "Selected",

        formRequiredNote: " Required fields.",
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

        labelFund: "(Fund Size)",

        langKOR: "KOR",
        langENG: "ENG",
      },
    };
    return dict[lang];
  },
    [lang, exchangeRate, lastUpdated]
  );

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

  // -----------------------------
  // Options (value + label)
  // -----------------------------
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
      { value: "small", labelKo: "1,000만원 이하", labelEn: "Under $ 10M" },
      { value: "medium", labelKo: "1,000만원 ~ 1억원", labelEn: "$ 10M ~ $ 100M" },
      { value: "large", labelKo: "1억원 이상", labelEn: "$ 100M+" },
    ],
    []
  );

  // -----------------------------
  // Plans (use stable ids, localize display)
  // -----------------------------
  const plans = useMemo(
    () => ({
      monthly: [
        { id: "BASIC", krw: 2200000, descKo: "실시간 시그널", descEn: "Real-time signals" },
        { id: "PRO", krw: 3000000, descKo: "시그널 + 종합 BOT", descEn: "Signals + Execution BOT" },
        { id: "BOT", krw: 880000, descKo: "종합 BOT", descEn: "Execution BOT" },
      ],
      yearly: [
        // ✅ 연 플랜도 월 플랜과 동일하게 "무엇이 포함되는지"가 항상 보이도록 통일
        { id: "BASIC", krw: 20000000, descKo: "실시간 시그널", descEn: "Real-time signals" },
        { id: "PRO", krw: 30000000, descKo: "시그널 + 종합 BOT", descEn: "Signals + Execution BOT" },
        { id: "BOT", krw: 8000000, descKo: "종합 BOT", descEn: "Execution BOT" },
      ],
      vip: [{ id: "VIP", krw: 0, priceKo: "별도 문의", priceEn: "Contact us", descKo: "커스텀 전략 및 전용 인프라 구축", descEn: "Custom strategy & dedicated infrastructure" }],
    }),
    []
  );

  const getPlanLabel = (tab, planId) => {
    const found = (plans[tab] || []).find((p) => p.id === planId);
    if (!found) return planId;
    // plan display name (keep BASIC/PRO/BOT/VIP)
    return planId;
  };

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

  // -----------------------------
  // EmailJS init
  // -----------------------------
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
      setEmailjsReady(true);
    }
  }, []);

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  const onTabClick = (tab) => {
    setActiveTab(tab);
    // default to first plan in tab
    const first = plans[tab]?.[0]?.id;
    if (first) setFormData((p) => ({ ...p, plan: first }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailjsReady) return;

    setFormStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION;

      const experienceLabel = getExperienceLabel(formData.experience);
      const fundLabel = getFundLabel(formData.fundSize);

      const selectedPlan = (plans[activeTab] || []).find((p) => p.id === formData.plan);
      const selectedKrw = selectedPlan?.krw || 0;
      const krwPriceLabel = selectedKrw > 0 ? `${selectedKrw.toLocaleString()} KRW` : (lang === "ko" ? "별도 문의" : "Contact us");
      const usdtPriceLabel = selectedKrw > 0 ? `${formatUSDT(selectedKrw)} USDT` : (lang === "ko" ? "별도 문의" : "Contact us");

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        telegram_id: formData.telegram,

        // ✅ label로 전송
        experience: experienceLabel,
        fund_size: fundLabel,

        // 선택 플랜도 사람이 읽기 쉽게
        selected_plan: `${activeTab.toUpperCase()} - ${getPlanLabel(activeTab, formData.plan)}`,
        krw_price: krwPriceLabel,
        usdt_price: usdtPriceLabel,
        exchange_rate: `${exchangeRate.toLocaleString()} KRW/USDT`,
        rate_updated: lastUpdated || "-",

        // 참고로 value도 필요하면 템플릿에 추가로 써도 됨(선택)
        experience_value: formData.experience,
        fund_size_value: formData.fundSize,

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

  const isYearly = activeTab === "yearly";

  return (
    <div
      style={{
        padding: "120px 40px",
        maxWidth: "1400px",
        margin: "0 auto",
        color: "#fff",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* keyframes / classes */}
      <style jsx global>{`
        @keyframes bod_pop {
          0% { transform: scale(0.98); }
          45% { transform: scale(1.03); }
          100% { transform: scale(1.0); }
        }
        @keyframes bod_pulse {
          0%, 100% { transform: scale(1); opacity: 0.85; }
          50% { transform: scale(1.06); opacity: 1; }
        }
        @keyframes bod_shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .planCard {
          position: relative;
          will-change: transform, box-shadow, border;
        }
        .planCard.selected {
          animation: bod_pop 320ms ease-out;
          transform: translateZ(0) scale(1.01);
        }
        .planCard .selectedBadge {
          position: absolute;
          top: 14px;
          right: 14px;
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
        }
        .planCard.selected .selectedBadge {
          opacity: 1;
          transform: translateY(0);
        }
        .yearlyBanner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1px solid rgba(167,139,250,0.18);
          background: linear-gradient(135deg, rgba(124,58,237,0.16), rgba(167,139,250,0.08));
          box-shadow: 0 0 24px rgba(124,58,237,0.16);
          margin-bottom: 14px;
        }
        
        .planPrice {
          text-align: right;
          font-weight: 900;
          color: #e0d7ff;
          letter-spacing: 0.2px;
        }
        .planPriceMain {
          font-size: 15px;
          white-space: nowrap;
        }
        .planPriceSub {
          margin-top: 6px;
          font-size: 12px;
          font-weight: 800;
          color: rgba(168, 148, 255, 0.95);
          white-space: nowrap;
        }
        .planHeader {
          padding-right: 92px; /* space for ✓ 선택됨 */
        }

        .yearlyBadge {
          font-size: 12px;
          font-weight: 800;
          padding: 7px 10px;
          border-radius: 999px;
          color: #f1eaff;
          background: linear-gradient(90deg, rgba(124,58,237,0.35), rgba(167,139,250,0.18));
          border: 1px solid rgba(167,139,250,0.24);
          animation: bod_pulse 1.6s ease-in-out infinite;
          white-space: nowrap;
        }
        .discountTag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          font-weight: 800;
          padding: 6px 10px;
          border-radius: 999px;
          border: 1px solid rgba(167,139,250,0.22);
          color: #e9ddff;
          background: rgba(124,58,237,0.14);
          animation: bod_pulse 1.8s ease-in-out infinite;
          margin-top: 10px;
          width: fit-content;
        }
        .langToggleWrap {
          position: absolute;
          top: 26px;
          right: 26px;
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
        .yearlyTabShimmer {
          background-size: 200% 100%;
          background-image: linear-gradient(
            90deg,
            rgba(124,58,237,0.10),
            rgba(167,139,250,0.18),
            rgba(124,58,237,0.10)
          );
          animation: bod_shimmer 1.8s linear infinite;
        }
      `}</style>

      {/* 배경 */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(120,100,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(100,120,255,0.06) 0%, transparent 50%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 언어 토글 */}
        <div className="langToggleWrap" aria-label="Language selector">
          <button className={`langBtn ${lang === "ko" ? "active" : ""}`} onClick={() => setLanguage("ko")} type="button">
            {T.langKOR}
          </button>
          <button className={`langBtn ${lang === "en" ? "active" : ""}`} onClick={() => setLanguage("en")} type="button">
            {T.langENG}
          </button>
        </div>

        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1
            style={{
              fontSize: "48px",
              fontWeight: 800,
              marginBottom: "16px",
              background: "linear-gradient(135deg, #e0d7ff, #a78bfa)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {T.pageTitle}
          </h1>
          <p style={{ fontSize: "16px", color: "#a0a0c0", marginBottom: "24px", lineHeight: 1.6 }}>
            {T.pageDesc}
          </p>

          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap", marginTop: "10px" }}>
            <span style={{ fontSize: "12px", color: "#b9b0e6", background: "rgba(124,58,237,0.10)", border: "1px solid rgba(167,139,250,0.20)", padding: "7px 10px", borderRadius: "999px" }}>
              {T.exchangeInfo}
            </span>
            <span style={{ fontSize: "12px", color: "#9aa8c7", background: "rgba(112,128,160,0.10)", border: "1px solid rgba(112,128,160,0.18)", padding: "7px 10px", borderRadius: "999px" }}>
              {T.priceNote}
            </span>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="apply-tabs" style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "50px" }}>
          {["monthly", "yearly", "vip"].map((tab) => {
            const isActive = activeTab === tab;
            const isYearlyTab = tab === "yearly";
            const isVipTab = tab === "vip";
            return (
              <button
                key={tab}
                onClick={() => onTabClick(tab)}
                type="button"
                className={`${isYearlyTab && isActive ? "yearlyTabShimmer" : ""} ${isVipTab ? "vipTab" : ""} ${isVipTab && isActive ? "vipTabActive" : ""}`}
                style={{
                  padding: "14px 36px",
                  borderRadius: "30px",
                  border: `2px solid ${isActive ? "#7c3aed" : "rgba(120, 100, 255, 0.2)"}`,
                  background: isActive
                    ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(167,139,250,0.1))"
                    : "rgba(255,255,255,0.02)",
                  color: isActive ? "#c4b5fd" : "#8080b0",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: "15px",
                  transition: "all 0.3s ease",
                  boxShadow: isActive ? "0 0 20px rgba(124,58,237,0.3)" : "none",
                }}
              >
                {isVipTab && <span className="vipCrown" aria-hidden="true">👑</span>}
                {tab === "monthly" ? T.tabMonthly : tab === "yearly" ? T.tabYearly : T.tabVIP}
              </button>
            );
          })}
        </div>

        {/* 메인 */}
        <div className="apply-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "50px" }}>
          {/* 플랜 선택 */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "16px", gap: "16px" }}>
              <h3 style={{ color: "#e0d7ff", fontSize: "20px", fontWeight: 700, margin: 0 }}>{T.plansTitle}</h3>
              <span
                style={{
                  fontSize: "12px",
                  color: "#9aa8c7",
                  background: "rgba(112,128,160,0.12)",
                  border: "1px solid rgba(112,128,160,0.18)",
                  padding: "5px 10px",
                  borderRadius: "999px",
                  whiteSpace: "nowrap",
                }}
              >
                {T.vatNote}
              </span>
            </div>

            {/* 연 플랜 강조 배너 */}
            {isYearly && (
              <div className="yearlyBanner" role="note" aria-label="Yearly promotion">
                <div>
                  <div style={{ fontWeight: 900, color: "#e7ddff", marginBottom: "4px" }}>{T.yearlyPromoTitle}</div>
                  <div style={{ fontSize: "13px", color: "#b2b6d6", lineHeight: 1.4 }}>{T.yearlyPromoDesc}</div>
                </div>
                <div className="yearlyBadge">{T.yearlyBadge}</div>
              </div>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {plans[activeTab].map((p) => {
                const selected = formData.plan === p.id;
                const desc = lang === "ko" ? p.descKo : p.descEn;

                const isVip = String(p.id).toUpperCase() === "VIP";
                const periodKo = activeTab === "monthly" ? "월" : activeTab === "yearly" ? "연" : "";
                const periodEn = activeTab === "monthly" ? "mo" : activeTab === "yearly" ? "yr" : "";
                const krwLine = !isVip && p.krw ? `${periodKo} ${p.krw.toLocaleString()} KRW` : (lang === "ko" ? (p.priceKo || "별도 문의") : (p.priceEn || "Contact us"));
                const usdLine = !isVip && p.krw ? `$ ${formatUSDT(p.krw)}${periodEn ? ` / ${periodEn}` : ""}` : "";
                const priceMain = lang === "ko" ? krwLine : (usdLine || krwLine);
                const priceSub = lang === "ko" ? (usdLine || "") : (!isVip && p.krw ? krwLine : "");

                return (
                  <label
                    key={`${activeTab}-${p.id}`}
                    className={`planCard ${selected ? "selected" : ""} ${isYearly ? "yearly" : ""} ${isVip ? "vip" : ""}`}
                    style={{
                      padding: "24px",
                      borderRadius: "16px",
                      border: `2px solid ${selected ? "#7c3aed" : "rgba(255,255,255,0.08)"}`,
                      background: selected
                        ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.08))"
                        : "rgba(255,255,255,0.02)",
                      cursor: "pointer",
                      transition: "all 0.3s ease",
                      boxShadow: selected ? "0 0 30px rgba(124,58,237,0.2)" : "none",
                      transform: selected ? "scale(1.01)" : "scale(1.0)",
                    }}
                  >
                    <span className="selectedBadge">✓ {T.selectedBadge}</span>

                    <input
                      type="radio"
                      name="plan"
                      value={p.id}
                      checked={selected}
                      onChange={handleInput("plan")}
                      style={{ display: "none" }}
                    />

                    {/* 상단 */}
                    <div className="planHeader">
                      <div style={{ fontWeight: 900, fontSize: "18px", color: "#e0d7ff" }}>{p.id}</div>
                      <div style={{ fontSize: "13px", color: "#8080b0", marginTop: "6px" }}>{desc}</div>

                      {isYearly && (
                        <div className="discountTag" style={{ marginTop: "10px" }}>
                          {T.yearlyBadge}
                        </div>
                      )}
                    </div>

                    {/* 하단 */}
                    <div style={{ display: "flex", justifyContent: "flex-end", marginTop: "14px" }}>
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

          {/* 폼 */}
          <form
            onSubmit={handleSubmit}
            style={{
              background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(120,100,255,0.03))",
              padding: "40px",
              borderRadius: "20px",
              border: "1px solid rgba(120,100,255,0.15)",
              backdropFilter: "blur(10px)",
            }}
          >
            {/* 이름 / 연락처 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <p style={{ fontSize: "13px", color: "#8080b0", marginBottom: "20px" }}>
                  <span style={{ color: "#ff6b6b" }}>*</span> {T.formRequiredNote}
                </p>

                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.name}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelName}</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleInput("name")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                    transition: "all 0.2s",
                  }}
                  placeholder={T.phName}
                />
              </div>

              <div>
                <p style={{ marginBottom: "20px", opacity: 0 }}>&nbsp;</p>

                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.phone}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelPhone}</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleInput("phone")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                  placeholder={T.phPhone}
                />
              </div>
            </div>

            {/* 이메일 / 텔레그램 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.email}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelEmail}</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleInput("email")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                  placeholder={T.phEmail}
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.telegram}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelTelegram}</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.telegram}
                  onChange={handleInput("telegram")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                  }}
                  placeholder={T.phTelegram}
                />
              </div>
            </div>

            {/* 경험 / 자금 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.experience}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelExperience}</span>
                </label>
                <select
                  required
                  value={formData.experience}
                  onChange={handleInput("experience")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {experienceOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ background: "#1a1a2e", color: "#fff" }}>
                      {lang === "ko" ? opt.labelKo : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>{T.fundSize}</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelFund}</span>
                </label>
                <select
                  required
                  value={formData.fundSize}
                  onChange={handleInput("fundSize")}
                  style={{
                    width: "100%",
                    padding: "12px",
                    borderRadius: "8px",
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "#fff",
                    fontSize: "14px",
                    cursor: "pointer",
                  }}
                >
                  {fundOptions.map((opt) => (
                    <option key={opt.value} value={opt.value} style={{ background: "#1a1a2e", color: "#fff" }}>
                      {lang === "ko" ? opt.labelKo : opt.labelEn}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 메시지 */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                <span style={{ color: "#e0d7ff" }}>{T.message}</span>
                <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>{T.labelMessage}</span>
              </label>
              <textarea
                value={formData.message}
                onChange={handleInput("message")}
                style={{
                  width: "100%",
                  padding: "12px",
                  borderRadius: "8px",
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  color: "#fff",
                  fontSize: "14px",
                  minHeight: "100px",
                  fontFamily: "inherit",
                  resize: "vertical",
                }}
                placeholder={T.phMessage}
              />
            </div>

            {/* 제출 */}
            <button
              type="submit"
              disabled={formStatus === "sending"}
              style={{
                width: "100%",
                padding: "16px",
                borderRadius: "12px",
                background: formStatus === "sending" ? "rgba(124, 58, 237, 0.5)" : "linear-gradient(135deg, #7c3aed, #a78bfa)",
                color: "#fff",
                border: "none",
                fontWeight: 800,
                fontSize: "16px",
                cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)",
              }}
            >
              {formStatus === "sending" ? T.btnSending : T.btnSubmit}
            </button>

            {formStatus === "sent" && (
              <p style={{ color: "#4ade80", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>
                {T.success}
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ color: "#ff6b6b", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 700 }}>
                {T.error}
              </p>
            )}
          </form>
        </div>

        {/* 하단 링크 */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Link href="/" style={{ color: "#8080b0", textDecoration: "none", fontSize: "14px", fontWeight: 700, transition: "color 0.2s" }}>
            {T.backHome}
          </Link>
        </div>
      </div>
    </div>
  );
}