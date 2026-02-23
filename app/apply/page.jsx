"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function ApplyPage() {
  const [activeTab, setActiveTab] = useState("monthly"); // monthly, yearly, vip
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
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
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;

      await emailjs.send(serviceId, templateId, {
        from_name: formData.name,
        from_email: formData.email,
        telegram_id: formData.telegram,
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
      { name: "BASIC", price: "월 220만원", desc: "실시간 시그널" },
      { name: "PRO", price: "월 300만원", desc: "시그널 + 종합 BOT" },
      { name: "BOT", price: "월 88만원", desc: "종합 BOT" },
    ],
    yearly: [
      { name: "BASIC (1년)", price: "연 2000만원", desc: "2개월 할인 혜택" },
      { name: "PRO (1년)", price: "연 3000만원", desc: "2개월 할인 혜택" },
      { name: "BOT (1년)", price: "연 800만원", desc: "2개월 할인 혜택" },
    ],
    vip: [
      { name: "VIP", price: "별도 문의", desc: "커스텀 전략 및 전용 인프라 구축" },
    ],
  };

  return (
    <div className="apply-container" style={{ padding: "120px 20px", maxWidth: "1000px", margin: "0 auto", color: "#fff" }}>
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1 style={{ fontSize: "42px", fontWeight: 800, marginBottom: "16px" }}>서비스 신청하기</h1>
        <p style={{ color: "#a0a0c0" }}>원하시는 플랜을 선택하고 신청서를 작성해 주세요.</p>
        <span style={{ color: "var(--muted2)", fontSize: "13px" }}>* 표시는 필수 입력 항목입니다.</span>
        <span style={{ color: "var(--muted2)", fontSize: "13px" }}>* 모든 플랜은 부가세 포함입니다.</span>
      </div>

      {/* 탭 메뉴 */}
      <div style={{ display: "flex", justifyContent: "center", gap: "10px", marginBottom: "40px" }}>
        {["monthly", "yearly", "vip"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setFormData(p => ({ ...p, plan: plans[tab][0].name }));
            }}
            style={{
              padding: "12px 30px",
              borderRadius: "30px",
              border: "1px solid rgba(120, 100, 255, 0.3)",
              background: activeTab === tab ? "linear-gradient(135deg, #7c3aed, #a78bfa)" : "rgba(255,255,255,0.05)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              transition: "all 0.3s"
            }}
          >
            {tab === "monthly" ? "월 플랜" : tab === "yearly" ? "연 플랜" : "VIP"}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
        {/* 플랜 선택 */}
        <div>
          <h3 style={{ marginBottom: "20px", color: "#e0d7ff" }}>플랜 선택</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
            {plans[activeTab].map((p) => (
              <label
                key={p.name}
                style={{
                  padding: "20px",
                  borderRadius: "16px",
                  border: `2px solid ${formData.plan === p.name ? "#7c3aed" : "rgba(255,255,255,0.1)"}`,
                  background: formData.plan === p.name ? "rgba(124, 58, 237, 0.1)" : "rgba(255,255,255,0.02)",
                  cursor: "pointer",
                  transition: "all 0.2s"
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
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "18px" }}>{p.name}</div>
                    <div style={{ fontSize: "13px", color: "#a0a0c0", marginTop: "4px" }}>{p.desc}</div>
                  </div>
                  <div style={{ fontWeight: 800, color: "#c4b5fd" }}>{p.price}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* 신청서 폼 */}
        <form onSubmit={handleSubmit} style={{ background: "rgba(255,255,255,0.03)", padding: "30px", borderRadius: "20px", border: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>성함 / 닉네임</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={handleInput("name")}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
              placeholder="홍길동"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>이메일</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={handleInput("email")}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
              placeholder="example@email.com"
            />
          </div>
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>텔레그램 ID</label>
            <input
              type="text"
              required
              value={formData.telegram}
              onChange={handleInput("telegram")}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}
              placeholder="@username"
            />
          </div>
          <div style={{ marginBottom: "25px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontSize: "14px" }}>추가 문의사항 (선택)</label>
            <textarea
              value={formData.message}
              onChange={handleInput("message")}
              style={{ width: "100%", padding: "12px", borderRadius: "8px", background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff", minHeight: "100px" }}
            />
          </div>

          <button
            type="submit"
            disabled={formStatus === "sending"}
            style={{
              width: "100%",
              padding: "16px",
              borderRadius: "12px",
              background: "linear-gradient(135deg, #7c3aed, #a78bfa)",
              color: "#fff",
              border: "none",
              fontWeight: 700,
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            {formStatus === "sending" ? "전송 중..." : "신청서 제출하기"}
          </button>

          {formStatus === "sent" && <p style={{ color: "#4ade80", marginTop: "15px", textAlign: "center" }}>✅ 신청서가 성공적으로 제출되었습니다!</p>}
          {formStatus === "error" && <p style={{ color: "#ff6b6b", marginTop: "15px", textAlign: "center" }}>❌ 전송 실패. 다시 시도해 주세요.</p>}
        </form>
      </div>
      <div style={{ textAlign: "center", marginTop: "40px" }}>
        <Link href="/" style={{ color: "#a0a0c0", textDecoration: "none", fontSize: "14px" }}>← 메인으로 돌아가기</Link>
      </div>
    </div>
  );
}
