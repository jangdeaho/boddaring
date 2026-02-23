"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, yearly, vip
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

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) {
      emailjs.init(pk);
      setEmailjsReady(true);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!emailjsReady) return;

    setFormStatus("sending");

    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION;

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_phone: formData.phone,
        from_email: formData.email,
        telegram_id: formData.telegram,
        experience: formData.experience,
        fund_size: formData.fundSize,
        selected_plan: `${activeTab.toUpperCase()} - ${formData.plan}`,
        message: formData.message || "(메시지 없음)",
        to_name: "BODDARING 관리자",
      });

      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };

  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
  };

  const plans = {
    monthly: [
      { name: "BASIC", price: "월 2,200,000 KRW", desc: "실시간 시그널" },
      { name: "PRO", price: "월 3,000,000 KRW", desc: "시그널 + 종합 BOT" },
      { name: "BOT", price: "월 880,000 KRW", desc: "종합 BOT" },
    ],
    yearly: [
      { name: "BASIC (1년)", price: "연 20,000,000 KRW", desc: "2개월 할인 혜택!" },
      { name: "PRO (1년)", price: "연 30,000,000 KRW", desc: "2개월 할인 혜택!" },
      { name: "BOT (1년)", price: "연 8,000,000 KRW", desc: "2개월 할인 혜택!" },
    ],
    vip: [
      { name: "VIP", price: "별도 문의", desc: "커스텀 전략 및 전용 인프라 구축" },
    ],
  };

  const experienceOptions = [
    { value: "beginner", label: "1년 미만" },
    { value: "intermediate", label: "1~3년" },
    { value: "advanced", label: "3년 이상" },
  ];

  const fundOptions = [
    { value: "small", label: "1,000만원 이하" },
    { value: "medium", label: "1,000만원 ~ 1억원" },
    { value: "large", label: "1억원 이상" },
  ];

  return (
    <div style={{ padding: "120px 40px", maxWidth: "1400px", margin: "0 auto", color: "#fff", position: "relative", overflow: "hidden" }}>
      {/* 배경 애니메이션 */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: "radial-gradient(circle at 20% 50%, rgba(120,100,255,0.08) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(100,120,255,0.06) 0%, transparent 50%)",
        pointerEvents: "none",
        zIndex: 0
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        {/* 헤더 */}
        <div style={{ textAlign: "center", marginBottom: "60px" }}>
          <h1 style={{ fontSize: "48px", fontWeight: 800, marginBottom: "16px", background: "linear-gradient(135deg, #e0d7ff, #a78bfa)", backgroundClip: "text", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            서비스 신청하기
          </h1>
          <p style={{ fontSize: "16px", color: "#a0a0c0", marginBottom: "24px", lineHeight: 1.6 }}>
            원하시는 플랜을 선택하고 신청서를 작성해 주시면 검토 후 빠르게 연락드리겠습니다.<br />
          </p>
        </div>

        {/* 탭 메뉴 */}
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginBottom: "50px" }}>
          {["monthly", "yearly", "vip"].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setFormData(p => ({ ...p, plan: plans[tab][0].name }));
              }}
              style={{
                padding: "14px 36px",
                borderRadius: "30px",
                border: `2px solid ${activeTab === tab ? "#7c3aed" : "rgba(120, 100, 255, 0.2)"}`,
                background: activeTab === tab ? "linear-gradient(135deg, rgba(124,58,237,0.2), rgba(167,139,250,0.1))" : "rgba(255,255,255,0.02)",
                color: activeTab === tab ? "#c4b5fd" : "#8080b0",
                cursor: "pointer",
                fontWeight: 700,
                fontSize: "15px",
                transition: "all 0.3s ease",
                boxShadow: activeTab === tab ? "0 0 20px rgba(124,58,237,0.3)" : "none"
              }}
            >
              {tab === "monthly" ? "월 플랜" : tab === "yearly" ? "연 플랜" : "VIP"}
            </button>
          ))}
        </div>

        {/* 메인 콘텐츠 */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "50px" }}>
          {/* 플랜 선택 */}
          <div>
            {}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                marginBottom: "24px",
                gap: "16px",
              }}
            >
              <h3
                style={{
                  color: "#e0d7ff",
                  fontSize: "20px",
                  fontWeight: 700,
                  margin: 0,
                }}
              >
                플랜 선택
              </h3>

              {}
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
                * 모든 플랜은 부가세(VAT) 포함입니다.
              </span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {plans[activeTab].map((p) => (
                <label
                  key={p.name}
                  style={{
                    padding: "24px",
                    borderRadius: "16px",
                    border: `2px solid ${formData.plan === p.name ? "#7c3aed" : "rgba(255,255,255,0.08)"}`,
                    background: formData.plan === p.name ? "linear-gradient(135deg, rgba(124,58,237,0.15), rgba(167,139,250,0.08))" : "rgba(255,255,255,0.02)",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: formData.plan === p.name ? "0 0 30px rgba(124,58,237,0.2)" : "none"
                  }}
                >
                  <input
                    type="radio"
                    name="plan"
                    value={p.name}
                    checked={formData.plan === p.name}
                    onChange={handleInput("plan")}
                    style={{ display: "none" }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <div style={{ fontWeight: 800, fontSize: "18px", color: "#e0d7ff" }}>{p.name}</div>
                      <div style={{ fontSize: "13px", color: "#8080b0", marginTop: "6px" }}>{p.desc}</div>
                    </div>
                    <div style={{ fontWeight: 800, color: "#a78bfa", fontSize: "16px", textAlign: "right" }}>{p.price}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* 신청서 폼 */}
          <form onSubmit={handleSubmit} style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.04), rgba(120,100,255,0.03))",
            padding: "40px",
            borderRadius: "20px",
            border: "1px solid rgba(120,100,255,0.15)",
            backdropFilter: "blur(10px)"
          }}>
            {/* 이름 / 연락처 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>* 표시는 필수 입력 항목입니다</span><br />
                  <span style={{ color: "#e0d7ff" }}>이름</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Name)</span>
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
                    transition: "all 0.2s"
                  }}
                  placeholder="홍길동"
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>연락처</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Phone)</span>
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
                    fontSize: "14px"
                  }}
                  placeholder="010-0000-0000"
                />
              </div>
            </div>

            {/* 이메일 / 텔레그램 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>이메일</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(E-mail)</span>
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
                    fontSize: "14px"
                  }}
                  placeholder="example@email.com"
                />
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>텔레그램 ID</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Telegram ID)</span>
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
                    fontSize: "14px"
                  }}
                  placeholder="@username"
                />
              </div>
            </div>

            {/* 투자 경험 / 운용 자금 */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "20px" }}>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>코인 투자 경험</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Experience)</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
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
                    cursor: "pointer"
                  }}
                >
                  {experienceOptions.map(opt => (
                    <option key={opt.label} value={opt.label} style={{ background: "#1a1a2e", color: "#fff" }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                  <span style={{ color: "#e0d7ff" }}>예상 운용 자금</span>
                  <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Fund Size)</span>
                  <span style={{ color: "#ff6b6b", marginLeft: "4px" }}>*</span>
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
                    cursor: "pointer"
                  }}
                >
                  {fundOptions.map(opt => (
                    <option key={opt.label} value={opt.label} style={{ background: "#1a1a2e", color: "#fff" }}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 문의사항 */}
            <div style={{ marginBottom: "24px" }}>
              <label style={{ display: "block", marginBottom: "8px", fontSize: "14px", fontWeight: 600 }}>
                <span style={{ color: "#e0d7ff" }}>문의사항</span>
                <span style={{ color: "#8080b0", fontSize: "12px", marginLeft: "4px" }}>(Message)</span>
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
                  resize: "vertical"
                }}
                placeholder="추가 문의사항이 있으시면 입력해 주세요."
              />
            </div>

            {/* 제출 버튼 */}
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
                fontWeight: 700,
                fontSize: "16px",
                cursor: formStatus === "sending" ? "not-allowed" : "pointer",
                transition: "all 0.3s",
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.3)"
              }}
            >
              {formStatus === "sending" ? "전송 중..." : "신청서 제출하기"}
            </button>

            {formStatus === "sent" && (
              <p style={{ color: "#4ade80", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 600 }}>
                ✅ 신청서가 성공적으로 제출되었습니다! 빠르게 연락드리겠습니다.
              </p>
            )}
            {formStatus === "error" && (
              <p style={{ color: "#ff6b6b", marginTop: "16px", textAlign: "center", fontSize: "14px", fontWeight: 600 }}>
                ❌ 전송 실패. 다시 시도해 주세요.
              </p>
            )}
          </form>
        </div>

        {/* 하단 링크 */}
        <div style={{ textAlign: "center", marginTop: "60px" }}>
          <Link href="/" style={{ color: "#8080b0", textDecoration: "none", fontSize: "14px", fontWeight: 600, transition: "color 0.2s" }}>
            ← 메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
