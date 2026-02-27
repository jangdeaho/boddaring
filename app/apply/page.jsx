"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [lang, setLang] = useState("ko"); // "ko" | "en"
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, yearly, vip
  const [exchangeRate, setExchangeRate] = useState(1471); // Default, updated by API
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
  // USDT 환율 연동 (업비트/바이낸스)
  // -----------------------------
  const fetchExchangeRate = async () => {
    try {
      const [upbitRes, binanceRes] = await Promise.all([
        fetch("https://api.upbit.com/v1/ticker?markets=KRW-BTC"),
        fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
      ]);
      const upbitData = await upbitRes.json();
      const binanceData = await binanceRes.json();
      
      const upbitBTC = upbitData[0].trade_price;
      const binanceBTC = parseFloat(binanceData.price);
      
      if (upbitBTC && binanceBTC) {
        const rate = Math.round(upbitBTC / binanceBTC);
        setExchangeRate(rate);
        setLastUpdated(new Date().toLocaleTimeString());
      }
    } catch (error) {
      console.error("Exchange Rate Error:", error);
    }
  };

  useEffect(() => {
    fetchExchangeRate();
    const timer = setInterval(fetchExchangeRate, 60000); // 1분 단위 갱신
    return () => clearInterval(timer);
  }, []);

  const formatUSDT = (krw) => {
    const usdt = Math.round(krw / exchangeRate);
    return usdt.toLocaleString();
  };

  // -----------------------------
  // i18n dictionary (문구 유지)
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
        exchangeInfo: `현재 환율: ${exchangeRate.toLocaleString()} KRW (1분 단위 갱신: ${lastUpdated})`,
        priceNote: "* 플랜 가격은 결제 당시 환율로 계산합니다."
      },
      en: {
        pageTitle: "Apply for Service",
        pageDesc: "Select a plan and submit the application. We’ll review it and get back to you shortly.",
        tabMonthly: "Monthly",
        tabYearly: "Yearly",
        tabVIP: "VIP",
        plansTitle: "Select a Plan",
        vatNote: "* All prices include VAT.",
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
        langKOR: "KOR",
        langENG: "ENG",
        exchangeInfo: `Exchange Rate: ${exchangeRate.toLocaleString()} KRW (Updated: ${lastUpdated})`,
        priceNote: "* Plan prices are calculated based on the exchange rate at the time of payment."
      },
    };
    return dict[lang];
  }, [lang, exchangeRate, lastUpdated]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("boddaring_lang");
      if (saved === "ko" || saved === "en") setLang(saved);
    } catch {}
  }, []);

  const setLanguage = (next) => {
    setLang(next);
    try { localStorage.setItem("boddaring_lang", next); } catch {}
  };

  const experienceOptions = [
    { value: "beginner", labelKo: "1년 미만", labelEn: "Less than 1 year" },
    { value: "intermediate", labelKo: "1~3년", labelEn: "1–3 years" },
    { value: "advanced", labelKo: "3년 이상", labelEn: "3+ years" },
  ];

  const fundOptions = [
    { value: "small", labelKo: "1,000만원 이하", labelEn: "Under $ 10M" },
    { value: "medium", labelKo: "1,000만원 ~ 1억원", labelEn: "$ 10M ~ $ 100M" },
    { value: "large", labelKo: "1억원 이상", labelEn: "$ 100M+" },
  ];

  const plans = useMemo(() => ({
    monthly: [
      { id: "BASIC", krw: 2200000, items: ["실시간 시그널 전송", "기본 기술 지원"] },
      { id: "PRO", krw: 3000000, items: ["실시간 시그널 전송", "종합 실행 BOT 제공", "우선 기술 지원"] },
      { id: "BOT", krw: 880000, items: ["종합 실행 BOT 전용", "기본 기술 지원"] },
    ],
    yearly: [
      { id: "BASIC", krw: 22000000, items: ["실시간 시그널 전송", "기본 기술 지원"] },
      { id: "PRO", krw: 30000000, items: ["실시간 시그널 전송", "종합 실행 BOT 제공", "우선 기술 지원"] },
      { id: "BOT", krw: 8800000, items: ["종합 실행 BOT 전용", "기본 기술 지원"] },
    ],
    vip: [{ id: "VIP", krw: 0, items: ["커스텀 전략 개발", "전용 서버 인프라 구축", "1:1 전담 매니저 배정", "최상위 우선순위 지원"] }],
  }), []);

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) { emailjs.init(pk); setEmailjsReady(true); }
  }, []);

  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  const onTabClick = (tab) => {
    setActiveTab(tab);
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
      
      const selectedPlanData = plans[activeTab].find(p => p.id === formData.plan);
      const usdtPrice = selectedPlanData.krw > 0 ? `${formatUSDT(selectedPlanData.krw)} USDT` : "별도 협의";
      const krwPrice = selectedPlanData.krw > 0 ? `${selectedPlanData.krw.toLocaleString()} KRW` : "별도 협의";

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        telegram_id: formData.telegram,
        experience: experienceOptions.find(o => o.value === formData.experience)[lang === "ko" ? "labelKo" : "labelEn"],
        fund_size: fundOptions.find(o => o.value === formData.fundSize)[lang === "ko" ? "labelKo" : "labelEn"],
        selected_plan: `${activeTab.toUpperCase()} - ${formData.plan}`,
        krw_price: krwPrice,
        usdt_price: usdtPrice,
        exchange_rate: `${exchangeRate.toLocaleString()} KRW/USDT`,
        message: formData.message || (lang === "ko" ? "(메시지 없음)" : "(No message)"),
        to_name: "BODDARING Admin",
      });
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) { setFormStatus("error"); }
  };

  return (
    <div className="apply-page-container">
      <div className="apply-inner">
        <Link href="/" className="back-link">{T.backHome}</Link>
        <div className="lang-toggle">
          <button className={lang === "ko" ? "active" : ""} onClick={() => setLanguage("ko")}>{T.langKOR}</button>
          <button className={lang === "en" ? "active" : ""} onClick={() => setLanguage("en")}>{T.langENG}</button>
        </div>

        <h1 className="apply-title">{T.pageTitle}</h1>
        <p className="apply-desc">{T.pageDesc}</p>

        <div className="plan-tabs">
          <button className={activeTab === "monthly" ? "active" : ""} onClick={() => onTabClick("monthly")}>{T.tabMonthly}</button>
          <button className={activeTab === "yearly" ? "active" : ""} onClick={() => onTabClick("yearly")}>{T.tabYearly}</button>
          <button className={`${activeTab === "vip" ? "active vip-gold" : ""} vip-tab-btn`} onClick={() => onTabClick("vip")}>
            {T.tabVIP} <span className="tab-crown">👑</span>
          </button>
        </div>

        <div className="plan-grid">
          {plans[activeTab].map((p) => (
            <div key={p.id} className={`plan-card ${formData.plan === p.id ? "selected" : ""} ${activeTab === 'vip' ? 'vip-card-gold' : ''}`} onClick={() => setFormData({ ...formData, plan: p.id })}>
              {formData.plan === p.id && <div className="selected-badge">✓ {T.selectedBadge}</div>}
              <h3 className="plan-name">{p.id}</h3>
              <div className="plan-price">
                {p.krw > 0 ? (
                  <>
                    <div className="price-krw">{lang === 'ko' ? `월 ${p.krw.toLocaleString()} KRW` : `$ ${(p.krw/1440).toFixed(0)} / mo`}</div>
                    <div className="price-usdt">{formatUSDT(p.krw)} USDT</div>
                  </>
                ) : (
                  <div className="price-krw">{lang === 'ko' ? '별도 협의' : 'Contact Us'}</div>
                )}
              </div>
              {activeTab === 'yearly' && <div className="yearly-promo-badge">{T.yearlyBadge}</div>}
              <ul className="plan-items">
                {p.items.map((item, idx) => <li key={idx}>{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="exchange-info-bar">
          <p className="exchange-rate-text">{T.exchangeInfo}</p>
          <p className="vat-note">{T.vatNote} {T.priceNote}</p>
        </div>

        <form className="apply-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label><strong>{T.name}</strong> <span className="required">* (Name)</span></label>
              <input type="text" placeholder={T.phName} required value={formData.name} onChange={handleInput("name")} />
            </div>
            <div className="form-group">
              <label><strong>{T.phone}</strong> <span className="required">* (Phone)</span></label>
              <input type="text" placeholder={T.phPhone} required value={formData.phone} onChange={handleInput("phone")} />
            </div>
            <div className="form-group">
              <label><strong>{T.email}</strong> <span className="required">* (E-mail)</span></label>
              <input type="email" placeholder={T.phEmail} required value={formData.email} onChange={handleInput("email")} />
            </div>
            <div className="form-group">
              <label><strong>{T.telegram}</strong> <span className="required">* (Telegram ID)</span></label>
              <input type="text" placeholder={T.phTelegram} required value={formData.telegram} onChange={handleInput("telegram")} />
            </div>
            <div className="form-group">
              <label><strong>{T.experience}</strong> <span className="sub">(Experience)</span></label>
              <select value={formData.experience} onChange={handleInput("experience")}>
                {experienceOptions.map(o => <option key={o.value} value={o.value}>{lang === "ko" ? o.labelKo : o.labelEn}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label><strong>{T.fundSize}</strong> <span className="sub">(Capital)</span></label>
              <select value={formData.fundSize} onChange={handleInput("fundSize")}>
                {fundOptions.map(o => <option key={o.value} value={o.value}>{lang === "ko" ? o.labelKo : o.labelEn}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group full">
            <label><strong>{T.message}</strong> <span className="sub">(Message)</span></label>
            <textarea placeholder={T.phMessage} rows="4" value={formData.message} onChange={handleInput("message")} />
          </div>
          <button type="submit" className="submit-btn" disabled={formStatus === "sending"}>
            {formStatus === "sending" ? T.btnSending : T.btnSubmit}
          </button>
          {formStatus === "sent" && <p className="status-msg success">{T.success}</p>}
          {formStatus === "error" && <p className="status-msg error">{T.error}</p>}
        </form>
      </div>

      <style jsx>{`
        .apply-page-container { padding: 120px 20px; min-height: 100vh; background: #04060f; color: #fff; }
        .apply-inner { max-width: 1100px; margin: 0 auto; }
        .back-link { display: inline-block; margin-bottom: 32px; color: rgba(255,255,255,0.5); font-size: 14px; }
        .lang-toggle { display: flex; gap: 8px; margin-bottom: 24px; justify-content: flex-end; }
        .lang-toggle button { padding: 6px 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-size: 12px; }
        .lang-toggle button.active { background: #7c3aed; color: #fff; border-color: #7c3aed; }
        .apply-title { font-size: 40px; font-weight: 900; margin-bottom: 12px; text-align: center; }
        .apply-desc { font-size: 16px; color: rgba(255,255,255,0.5); text-align: center; margin-bottom: 48px; }
        .plan-tabs { display: flex; justify-content: center; gap: 12px; margin-bottom: 32px; }
        .plan-tabs button { padding: 12px 24px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); font-weight: 700; transition: all 0.3s; position: relative; }
        .plan-tabs button.active { background: #7c3aed; color: #fff; border-color: #7c3aed; }
        .plan-tabs button.vip-gold.active { background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); border-color: #fcd34d; box-shadow: 0 0 20px rgba(245, 158, 11, 0.4); }
        .tab-crown { position: absolute; top: -10px; right: -5px; transform: rotate(15deg); font-size: 18px; }
        .plan-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 24px; }
        @media (max-width: 768px) { .plan-grid { grid-template-columns: 1fr; } }
        .plan-card { padding: 32px 24px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; cursor: pointer; transition: all 0.3s; position: relative; display: flex; flex-direction: column; }
        .plan-card.selected { border-color: #7c3aed; background: rgba(124,58,237,0.05); transform: translateY(-4px); }
        .plan-card.vip-card-gold.selected { border-color: #f59e0b; background: rgba(245, 158, 11, 0.05); }
        .selected-badge { position: absolute; top: 12px; right: 12px; background: #7c3aed; color: #fff; font-size: 10px; font-weight: 800; padding: 4px 8px; border-radius: 6px; }
        .plan-name { font-size: 24px; font-weight: 900; margin-bottom: 8px; }
        .plan-price { margin-bottom: 20px; }
        .price-krw { font-size: 16px; font-weight: 700; color: #7c3aed; }
        .vip-card-gold .price-krw { color: #f59e0b; }
        .price-usdt { font-size: 20px; font-weight: 900; color: #fff; margin-top: 4px; }
        .yearly-promo-badge { background: rgba(16, 185, 129, 0.1); color: #10b981; padding: 6px 12px; border-radius: 8px; font-size: 12px; font-weight: 800; margin-bottom: 16px; display: inline-block; width: fit-content; }
        .plan-items { list-style: none; padding: 0; margin-top: auto; }
        .plan-items li { font-size: 14px; color: rgba(255,255,255,0.6); margin-bottom: 8px; display: flex; align-items: center; gap: 8px; }
        .plan-items li::before { content: "•"; color: #7c3aed; }
        .exchange-info-bar { text-align: center; margin-bottom: 48px; }
        .exchange-rate-text { font-size: 14px; color: #7c3aed; font-weight: 700; margin-bottom: 8px; }
        .vat-note { font-size: 12px; color: rgba(255,255,255,0.3); }
        .apply-form { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); padding: 48px; border-radius: 24px; }
        .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 24px; }
        @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } }
        .form-group label { display: block; font-size: 14px; margin-bottom: 8px; }
        .form-group input, .form-group select, .form-group textarea { width: 100%; padding: 14px 18px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; color: #fff; }
        .form-group.full { grid-column: 1 / -1; }
        .submit-btn { width: 100%; padding: 18px; background: #7c3aed; color: #fff; border-radius: 12px; font-weight: 800; font-size: 18px; transition: all 0.3s; }
        .submit-btn:hover { background: #6d28d9; transform: translateY(-2px); box-shadow: 0 8px 25px rgba(124,58,237,0.3); }
      `}</style>
    </div>
  );
}
