"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

export default function Trial() {
  const [lang, setLang] = useState("ko");
  const [formStatus, setFormStatus] = useState("idle");
  const [userIP, setUserIP] = useState("Loading...");
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    experience: "beginner",
    message: ""
  });
  const [emailjsReady, setEmailjsReady] = useState(false);
// Language (KR/EN) — persist across pages
useEffect(() => {
  try {
    const saved = localStorage.getItem("boddaring_lang");
    if (saved === "en" || saved === "ko") setLang(saved);
  } catch {}
}, []);

useEffect(() => {
  try {
    localStorage.setItem("boddaring_lang", lang);
  } catch {}
}, [lang]);

const T = {
  ko: {
    back: "← 메인으로 돌아가기",
    bubble: "⏰ 하루면 충분합니다!",
    title: "무료 체험 요청",
    subtitle: (
      <>
        BODDARING의 실시간 시그널을 제한 없이 경험해 보세요.<br />
        초 단위로 업데이트되는 압도적인 데이터를 24시간 동안 무료로 이용할 수 있습니다.
      </>
    ),
    benefits: [
      { icon: "⚡", title: "실시간 시그널", desc: "초 단위 업데이트" },
      { icon: "📊", title: "고급 분석", desc: "15개+ 거래소 데이터" },
      { icon: "🔍", title: "차익 탐지", desc: "정교한 계산 시스템" },
    ],
    formTitle: "무료체험 신청서",
    required: "* 필수 입력",
    labels: {
      name: "이름 (Name)",
      phone: "연락처 (Phone)",
      email: "이메일 (E-mail)",
      telegram: "텔레그램 ID",
      exp: "코인 투자 경험",
      msg: "추가 문의사항",
    },
    placeholders: {
      name: "홍길동",
      nameEn: "John Doe",
      phone: "010-0000-0000",
      phoneEn: "+1 555 000 0000",
      email: "example@email.com",
      telegram: "@username",
      msge: "추가 문의사항이 있으시면 입력해 주세요.",
    },
    expOptions: {
      beginner: "1년 미만",
      intermediate: "1~3년",
      advanced: "3년 이상",
    },
    warningTitle: "⚠️ 무료체험 이용 주의사항",
    warningItems: [
      <>
        <strong>24시간 제한 :</strong> 무료체험은 계정 제공 후 정확히 24시간 동안만 이용 가능합니다.<br />
        24시간 경과 후 자동으로 서비스 접근이 제한되며, 계속 이용하려면 구독이 필요합니다. (연장 불가/1회 한정)
      </>,
      <>
        <strong>연락 가능한 정보 :</strong> 정확한 정보 입력이 필수이며, 허위 정보 입력 시 서비스 이용이 제한될 수 있습니다.
      </>,
      <>
        <strong>텔레그램 ID :</strong> 신청 승인 및 접근 정보는 텔레그램을 통해 전달되므로 유효한 텔레그램 ID 입력이 필수입니다.
      </>,
      <>
        <strong>데이터 신뢰성 :</strong> 제공되는 모든 데이터는 참고용이며, 투자 결정은 본인의 책임입니다.
      </>,
      <>
        <strong>보안 접속 정책(접속기록 처리)</strong>: 서비스 보안 및 부정 이용 방지(계정 공유·무단 접근 방지)를 위해<br />
        <strong> 접속기록(예: IP 주소, 접속 시각, 기기/브라우저 정보 등)</strong>이 처리될 수 있으며, 보안 정책에 따라 다른 환경 접속은 제한될 수 있습니다.<br />
        자세한 내용은{" "} <a href="/terms/privacy" className="inlineLink"><strong>* 개인정보처리방침</strong></a>에서 확인해 주세요.
      </>,
    ],
    btn: {
      sending: "신청서 제출 중...",
      sent: "제출 완료! 곧 연락드리겠습니다.",
      idle: "무료체험 신청하기 🚀",
    },
    error: "❌ 전송 실패. 다시 시도해 주세요.",
    footer: (
      <>
        문의사항이 있으신가요?<br />
        <strong>boddaring@endholdings.com</strong>으로 문의해 주세요.
      </>
    ),
    langKR: "KOR",
    langEN: "ENG",
  },
  en: {
    back: "← Back to Home",
    bubble: "⏰ 24-Hour Trial",
    title: "Request a Free Trial",
    subtitle: (
      <>
        Experience BODDARING’s real-time signals with full access.<br />
        Enjoy high-frequency, second-by-second data for 24 hours — free of charge.
      </>
    ),
    benefits: [
      { icon: "⚡", title: "Real-time Signals", desc: "Updates every second" },
      { icon: "📊", title: "Advanced Analytics", desc: "Data from 15+ exchanges" },
      { icon: "🔍", title: "Arbitrage Detection", desc: "Precise calculation system" },
    ],
    formTitle: "Free Trial Application",
    required: "* Required",
    labels: {
      name: "Name",
      phone: "Phone",
      email: "E-mail",
      telegram: "Telegram ID",
      exp: "Crypto investing experience",
      msge: "Additional notes",
    },
    placeholders: {
      name: "John Doe",
      nameKo: "홍길동",
      phone: "+1 555 000 0000",
      phoneKo: "010-0000-0000",
      email: "example@email.com",
      telegram: "@username",
      msge: "Tell us anything we should know (optional).",
    },
    expOptions: {
      beginner: "Less than 1 year",
      intermediate: "1–3 years",
      advanced: "3+ years",
    },
    warningTitle: "⚠️ Important notes for the free trial",
    warningItems: [
      <>
        <strong>24-hour limit:</strong> The free trial is available for exactly 24 hours after account access is provided.<br />
        Access is automatically revoked after 24 hours. To continue, a subscription is required. (No extensions / one-time only)
      </>,
      <>
        <strong>Reachable contact info:</strong> Accurate information is required. Providing false information may restrict access.
      </>,
      <>
        <strong>Telegram required:</strong> Approval and access details are delivered via Telegram. Please provide a valid Telegram ID.
      </>,
      <>
        <strong>Data disclaimer:</strong> All data is for reference only. You are responsible for your own investment decisions.
      </>,
      <>
        <strong>Security access policy (access logs):</strong> To secure the service and prevent misuse (account sharing / unauthorized access),<br />
        <strong> access logs (e.g., IP address, access time, device/browser info)</strong> may be processed, and access from other environments may be restricted.<br />
        See our{" "} <a href="/terms/privacy" className="inlineLink">Privacy Policy</a> for details.
      </>,
    ],
    btn: {
      sending: "Submitting...",
      sent: "Submitted! We'll contact you shortly.",
      idle: "Request Free Trial 🚀",
    },
    error: "❌ Submission failed. Please try again.",
    footer: (
      <>
        Need help?<br />
        Contact us at <strong>boddaring@endholdings.com</strong>.
      </>
    ),
    langKR: "KR",
    langEN: "EN",
  },
};

const L = T[lang];

  // Get user IP
  useEffect(() => {
    const fetchIP = async () => {
      try {
        const response = await fetch("https://api.ipify.org?format=json");
        const data = await response.json();
        setUserIP(data.ip);
      } catch (error) {
        console.error("IP fetch error:", error);
        setUserIP("IP 정보 수집 실패");
      }
    };
    fetchIP();
  }, []);

  // EmailJS init
  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
      setEmailjsReady(true);
    }
  }, []);

  const isFormValid = Object.values(formData).slice(0, 4).every(v => String(v).trim().length > 0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailjsReady || !isFormValid) return;
    
    setFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_TRIAL;
      if (!serviceId || !templateId) throw new Error("Missing EmailJS env vars.");

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        telegram_id: formData.telegram,
        experience: formData.experience,
        selected_plan: "24시간 무료체험 (실시간 시그널)",
        user_ip: userIP,
        message: formData.message || "(메시지 없음)",
        to_name: "BODDARING 관리자",
        ui_lang: "ko",
      });
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  return (
    <div className="trialWrap">
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html, body {
          width: 100%;
          height: 100%;
        }

        /* =========================
           Aurora Background (Trial Page - Full Screen)
           ========================= */
        .trialWrap {
          position: relative;
          width: 100vw;
          min-height: 100vh;
          color: #fff;
          overflow-x: hidden;
          background: #0a0e27;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 60px 40px;
        }
        @media (max-width: 1024px) {
          .trialWrap { padding: 50px 20px; }
        }

        .trialAurora {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 1;
          width: 100vw;
          height: 100vh;
        }
        .trialAurora::before {
          content: "";
          position: absolute;
          inset: 0;
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
        .trialAurora::after {
          content: "";
          position: absolute;
          inset: 0;
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
        @keyframes auroraMove1 {
          0% { transform: translate(-1%, -1%) scale(1); }
          45% { transform: translate(2%, 1%) scale(1.06); }
          75% { transform: translate(1%, 2%) scale(1.04); }
          100% { transform: translate(-1%, -1%) scale(1); }
        }
        @keyframes auroraMove2 {
          0% { transform: translate(0%, 0%) scale(1); }
          50% { transform: translate(-2%, 1%) scale(1.03); }
          100% { transform: translate(0%, 0%) scale(1); }
        }
        .trialNoise {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.15;
          background-image:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.12) 0, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 3px),
            repeating-linear-gradient(90deg, rgba(0,0,0,0.18) 0, rgba(0,0,0,0.18) 1px, transparent 1px, transparent 4px);
          mix-blend-mode: overlay;
          width: 100vw;
          height: 100vh;
        }
        .trialContent { 
          position: relative; 
          z-index: 1; 
          width: 100%;
          max-width: 900px;
        }

        .backLink {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: rgba(205, 216, 255, 0.72);
          font-weight: 800;
          font-size: 13px;
          text-decoration: none;
          padding: 10px 12px;
          border-radius: 999px;
          border: 1px solid rgba(255,255,255,0.10);
          background: rgba(0,0,0,0.18);
          backdrop-filter: blur(10px);
          transition: all 0.18s ease;
          margin-bottom: 40px;
        }
        .backLink:hover {
          transform: translateY(-1px);
          color: rgba(232, 238, 255, 0.92);
          border-color: rgba(167,139,250,0.30);
        }

        .trialHeader {
          text-align: center;
          margin-bottom: 60px;
          position: relative;
        }
        .trialTitleWrapper {
          position: relative;
          display: inline-block;
          margin-bottom: 16px;
        }
        .trialTitle {
          font-size: 48px;
          font-weight: 900;
          margin-bottom: 0;
          background: linear-gradient(135deg, #e0d7ff, #a78bfa);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .trialBubble {
          position: absolute;
          top: -28px;
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
        .trialBubble:after {
          content: "";
          position: absolute;
          left: 50%;
          bottom: -7px;
          width: 12px;
          height: 12px;
          transform: translateX(-50%) rotate(45deg);
          background: rgba(236,72,153,0.25);
          border-right: 1px solid rgba(255,255,255,0.12);
          border-bottom: 1px solid rgba(255,255,255,0.12);
        }
        @keyframes floaty {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-6px); }
        }

        .trialSubtitle {
          font-size: 16px;
          color: #a0a0c0;
          margin-bottom: 24px;
          line-height: 1.65;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .trialBenefits {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 16px;
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }
        .benefitCard {
          padding: 16px;
          border-radius: 12px;
          border: 1px solid rgba(167,139,250,0.18);
          background: linear-gradient(135deg, rgba(124,58,237,0.12), rgba(167,139,250,0.04));
          text-align: center;
          transition: all 0.25s ease;
        }
        .benefitCard:hover {
          border-color: rgba(167,139,250,0.35);
          background: linear-gradient(135deg, rgba(124,58,237,0.16), rgba(167,139,250,0.08));
          transform: translateY(-2px);
        }
        .benefitIcon {
          font-size: 24px;
          margin-bottom: 8px;
        }
        .benefitTitle {
          font-size: 13px;
          font-weight: 800;
          color: #e0d7ff;
          margin-bottom: 4px;
        }
        .benefitDesc {
          font-size: 12px;
          color: rgba(200,206,235,0.72);
        }

        .formSection {
          background: linear-gradient(135deg, rgba(255,255,255,0.04), rgba(120,100,255,0.03));
          padding: 40px;
          border-radius: 20px;
          border: 1px solid rgba(120,100,255,0.15);
          backdrop-filter: blur(10px);
          margin-bottom: 24px;
        }
        @media (max-width: 768px) {
          .formSection { padding: 24px; }
        }

        .formTitle {
          font-size: 18px;
          font-weight: 900;
          color: #e0d7ff;
          margin-bottom: 24px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .formTitleRequired {
          font-size: 12px;
          color: #ff6b6b;
          font-weight: 900;
        }

        .formGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 16px;
        }
        @media (max-width: 640px) {
          .formGrid { grid-template-columns: 1fr; }
        }

        .formGroup {
          display: flex;
          flex-direction: column;
        }
        .formLabel {
          display: block;
          font-size: 13px;
          font-weight: 700;
          color: #e0d7ff;
          margin-bottom: 8px;
        }
        .formRequired {
          color: #ff6b6b;
          margin-left: 4px;
        }

        .formInput,
        .formSelect,
        .formTextarea {
          width: 100%;
          padding: 12px;
          border-radius: 10px;
          background: rgba(0,0,0,0.18);
          border: 1px solid rgba(255,255,255,0.10);
          color: #fff;
          font-size: 14px;
          font-family: inherit;
          outline: none;
          transition: all 0.18s ease;
        }
        .formInput:focus,
        .formSelect:focus,
        .formTextarea:focus {
          border-color: rgba(167,139,250,0.38);
          box-shadow: 0 0 0 4px rgba(124,58,237,0.16);
        }
        .formSelect {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 18px;
          padding-right: 40px;
        }
        .formTextarea {
          min-height: 110px;
          resize: none;
        }

        .warningBox {
          background: linear-gradient(135deg, rgba(236,72,153,0.12), rgba(245,158,11,0.08));
          border: 1px solid rgba(236,72,153,0.22);
          border-radius: 12px;
          padding: 20px;
          margin-bottom: 24px;
        }
        .warningTitle {
          font-size: 13px;
          font-weight: 900;
          color: #ffb3ba;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .warningList {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .warningList li {
          font-size: 12px;
          color: rgba(255,200,210,0.88);
          margin-bottom: 8px;
          padding-left: 20px;
          position: relative;
          line-height: 1.5;
        }
        .warningList li:before {
          content: "•";
          position: absolute;
          left: 0;
          color: rgba(236,72,153,0.6);
          font-weight: bold;
        }
        .warningList li:last-child {
          margin-bottom: 0;
        }
        .warningList strong {
          color: rgba(255,220,230,0.95);
        }

        .submitBtn {
          width: 100%;
          padding: 16px;
          border-radius: 14px;
          border: none;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
          transition: all 0.18s ease;
          background: linear-gradient(135deg, #7c3aed, #ec4899);
          box-shadow: 0 0 20px rgba(124,58,237,0.24), 0 0 22px rgba(236,72,153,0.18);
          color: #fff;
        }
        .submitBtn:hover:not(:disabled) {
          transform: translateY(-1px);
          filter: brightness(1.05);
        }
        .submitBtn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
          transform: none;
          filter: none;
          box-shadow: none;
        }

        .statusMessage {
          margin-top: 16px;
          text-align: center;
          font-size: 14px;
          font-weight: 800;
          border-radius: 10px;
          padding: 12px;
        }
        .statusSuccess {
          color: #4ade80;
          background: rgba(74,222,128,0.12);
          border: 1px solid rgba(74,222,128,0.22);
        }
        .statusError {
          color: #ff6b6b;
          background: rgba(255,107,107,0.12);
          border: 1px solid rgba(255,107,107,0.22);
        }

        .trialFooter {
          text-align: center;
          margin-top: 48px;
          padding-top: 24px;
          border-top: 1px solid rgba(167,139,250,0.18);
        }
        .trialFooterText {
          font-size: 12px;
          color: rgba(186,196,230,0.72);
          line-height: 1.6;
        }
  .trialFooterText strong {
    color: rgba(167,139,250,0.9);
  }

  .trialTopbar{
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    margin-bottom: 22px;
  }

  .langToggle{
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 6px;
    border-radius: 999px;
    border: 1px solid rgba(255,255,255,0.10);
    background: rgba(255,255,255,0.04);
    backdrop-filter: blur(10px);
  }
  .langBtn{
    height: 32px;
    padding: 0 12px;
    border-radius: 999px;
    font-size: 12px;
    font-weight: 800;
    letter-spacing: .2px;
    color: rgba(232,238,255,0.70);
    border: 1px solid transparent;
    background: transparent;
    cursor: pointer;
    transition: background .18s ease, color .18s ease, border-color .18s ease, transform .18s ease;
  }
  .langBtn:hover{
    transform: translateY(-1px);
    color: rgba(232,238,255,0.92);
    background: rgba(255,255,255,0.06);
    border-color: rgba(255,255,255,0.10);
  }
  .langBtn.active{
    color: #fff;
    background: linear-gradient(135deg, rgba(124,58,237,0.55), rgba(236,72,153,0.45));
    border-color: rgba(255,255,255,0.12);
    box-shadow: 0 0 18px rgba(124,58,237,0.18), 0 0 18px rgba(236,72,153,0.14);
  }

  @media (max-width: 520px){
    .trialTopbar{ margin-bottom: 18px; }
    .langBtn{ padding: 0 10px; }
  }
`}</style>

      <div className="trialAurora" />
      <div className="trialNoise" />

      <div className="trialContent">
        <div className="trialTopbar">
  <Link href="/" className="backLink">{L.back}</Link>

  <div className="langToggle" aria-label="Language toggle">
    <button
      type="button"
      className={`langBtn${lang === "ko" ? " active" : ""}`}
      onClick={() => setLang("ko")}
    >
      {L.langKR}
    </button>
    <button
      type="button"
      className={`langBtn${lang === "en" ? " active" : ""}`}
      onClick={() => setLang("en")}
    >
      {L.langEN}
    </button>
  </div>
</div>

        <div className="trialHeader">
          <div className="trialTitleWrapper">
            <span className="trialBubble">{L.bubble}</span>
            <h1 className="trialTitle">{L.title}</h1>
          </div>
          <p className="trialSubtitle">{L.subtitle}</p>
        </div>

        
<div className="trialBenefits">
  {L.benefits.map((b, idx) => (
    <div className="benefitCard" key={idx}>
      <div className="benefitIcon">{b.icon}</div>
      <div className="benefitTitle">{b.title}</div>
      <div className="benefitDesc">{b.desc}</div>
    </div>
  ))}
</div>

<div className="formSection">
          <h2 className="formTitle">
            {L.formTitle}
            <span className="formTitleRequired">{L.required}</span>
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="formGrid">
              <div className="formGroup">
                <label className="formLabel">
                  {L.labels.name}
                  <span className="formRequired">*</span>
                </label>
                <input
                  type="text"
                  className="formInput"
                  required
                  placeholder={lang === "ko" ? L.placeholders.name : L.placeholders.name}
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="formGroup">
                <label className="formLabel">
                  {L.labels.phone}
                  <span className="formRequired">*</span>
                </label>
                <input
                  type="tel"
                  className="formInput"
                  required
                  placeholder={lang === "ko" ? T.ko.placeholders.phone : T.en.placeholders.phone}
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="formGrid">
              <div className="formGroup">
                <label className="formLabel">
                  {L.labels.email}
                  <span className="formRequired">*</span>
                </label>
                <input
                  type="email"
                  className="formInput"
                  required
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="formGroup">
                <label className="formLabel">
                  {L.labels.telegram}
                  <span className="formRequired">*</span>
                </label>
                <input
                  type="text"
                  className="formInput"
                  required
                  placeholder="@username"
                  value={formData.telegram}
                  onChange={(e) => setFormData({...formData, telegram: e.target.value})}
                />
              </div>
            </div>

            <div className="formGroup" style={{ marginBottom: "16px" }}>
              <label className="formLabel">{L.labels.exp}</label>
              <select
                className="formSelect"
                value={formData.experience}
                onChange={(e) => setFormData({...formData, experience: e.target.value})}
              >
                <option value="beginner">{L.expOptions.beginner}</option>
                <option value="intermediate">{L.expOptions.intermediate}</option>
                <option value="advanced">{L.expOptions.advanced}</option>
              </select>
            </div>

            <div className="formGroup" style={{ marginBottom: "24px" }}>
              <label className="formLabel">{L.labels.msge}</label>
              <textarea
                className="formTextarea"
                placeholder="{L.labels.msg}이 있으시면 입력해 주세요."
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>

            <div className="warningBox">
              <div className="warningTitle">{L.warningTitle}</div>
              <ul className="warningList">
                {L.warningItems.map((it, i) => (<li key={i}>{it}</li>))}
              </ul>
            </div>

            <button
              type="submit"
              className="submitBtn"
              disabled={formStatus === "sending" || !isFormValid}
            >
              {formStatus === "sending"
                ? "신청서 제출 중..."
                : formStatus === "sent"
                ? "제출 완료! 곧 연락드리겠습니다."
                : "무료체험 신청하기 🚀"}
            </button>

            {formStatus === "error" && (
              <div className="statusMessage statusError">
                {L.error}
              </div>
            )}
          </form>
        </div>

        <div className="trialFooter">
          <p className="trialFooterText">{L.footer}</p>
        </div>
      </div>
    </div>
  );
}
