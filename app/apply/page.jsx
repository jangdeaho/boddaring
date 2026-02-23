"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const PLANS = [
  { id: "basic", label: "Basic", desc: "시그널 알림 서비스", price: "2,200,000 KRW" },
  { id: "pro", label: "Pro", desc: "시그널 + 종합 BOT", price: "3,000,000 KRW" },
  { id: "vip", label: "VIP", desc: "전체 서비스", price: "문의" },
];

export default function ApplyPage() {
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("pro");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    telegram: "",
    phone: "",
    plan: "pro",
    experience: "",
    capital: "",
    message: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formStatus, setFormStatus] = useState("idle");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) e.target.classList.add("on");
      }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const handleInput = (field) => (e) => {
    const val = e.target.value;
    setFormData((p) => ({ ...p, [field]: val }));
    if (formErrors[field]) setFormErrors((p) => ({ ...p, [field]: false }));
    if (field === "plan") setSelectedPlan(val);
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) errs.name = true;
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = true;
    if (!formData.telegram.trim()) errs.telegram = true;
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setFormErrors(errs); return; }
    setFormErrors({});
    setFormStatus("sending");
    try {
      await new Promise((r) => setTimeout(r, 1400));
      setFormStatus("sent");
    } catch {
      setFormStatus("error");
    }
  };

  const isDisabled = !formData.name.trim() || !formData.email.trim() || !formData.telegram.trim() || formStatus === "sending";

  return (
    <>
      {/* 배경 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
      </div>

      {/* 네비게이션 */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
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
              <Link href="/#signal" className="nav-link">시그널 소개</Link>
              <Link href="/#exchanges" className="nav-link">연동 거래소</Link>
              <Link href="/#bot" className="nav-link">BOT 소개</Link>
              <Link href="/#contact" className="nav-link">문의하기</Link>
            </div>
            <div className="nav-cta">
              <Link href="/apply" className="btn-apply active" style={{ opacity: .7, pointerEvents: "none" }}>
                신청하기
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 신청서 */}
      <div className="apply-wrap">
        <Link href="/" className="back-link">← 메인으로</Link>

        <h1>서비스 <span className="hero-grad">신청하기</span></h1>
        <p className="apply-sub">
          아래 양식을 작성해 주시면 검토 후 빠르게 연락 드리겠습니다.<br />
          <span style={{ color: "var(--muted2)", fontSize: "13px" }}>* 표시는 필수 입력 항목입니다.</span>
        </p>

        {/* 플랜 선택 */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "12px", marginBottom: "32px" }}>
          {PLANS.map((plan) => (
            <button
              key={plan.id}
              onClick={() => { setSelectedPlan(plan.id); setFormData((p) => ({ ...p, plan: plan.id })); }}
              style={{
                padding: "16px",
                borderRadius: "14px",
                border: selectedPlan === plan.id
                  ? "2px solid var(--accent)"
                  : "1px solid var(--stroke)",
                background: selectedPlan === plan.id
                  ? "rgba(108,79,255,.12)"
                  : "var(--panel)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all .2s ease",
              }}
            >
              <div style={{ fontSize: "15px", fontWeight: 800, color: selectedPlan === plan.id ? "var(--text)" : "var(--muted)", marginBottom: "4px" }}>
                {plan.label}
              </div>
              <div style={{ fontSize: "12px", color: "var(--muted2)", marginBottom: "8px" }}>{plan.desc}</div>
              <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--accent2)" }}>{plan.price}</div>
            </button>
          ))}
        </div>

        {formStatus === "sent" ? (
          <div className="apply-form-card" style={{ textAlign: "center", padding: "48px 36px" }}>
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>✅</div>
            <h2 style={{ fontSize: "22px", fontWeight: 800, marginBottom: "10px" }}>신청이 완료되었습니다!</h2>
            <p style={{ color: "var(--muted)", fontSize: "15px", lineHeight: 1.7, marginBottom: "24px" }}>
              입력하신 이메일 및 텔레그램으로 빠른 시일 내에 연락 드리겠습니다.
            </p>
            <Link href="/" className="btn-primary" style={{ display: "inline-flex" }}>
              메인으로 돌아가기
            </Link>
          </div>
        ) : (
          <div className="apply-form-card reveal">
            <form onSubmit={handleSubmit} noValidate>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">이름 <span className="req">*</span></label>
                  <input
                    type="text"
                    className={`form-input${formErrors.name ? " error" : ""}`}
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={handleInput("name")}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">연락처</label>
                  <input
                    type="tel"
                    className="form-input"
                    placeholder="010-0000-0000"
                    value={formData.phone}
                    onChange={handleInput("phone")}
                  />
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">이메일 <span className="req">*</span></label>
                <input
                  type="email"
                  className={`form-input${formErrors.email ? " error" : ""}`}
                  placeholder="이메일을 입력해 주세요."
                  value={formData.email}
                  onChange={handleInput("email")}
                />
              </div>

              <div className="form-group">
                <label className="form-label">텔레그램 ID <span className="req">*</span></label>
                <input
                  type="text"
                  className={`form-input${formErrors.telegram ? " error" : ""}`}
                  placeholder="예) @username"
                  value={formData.telegram}
                  onChange={handleInput("telegram")}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div className="form-group">
                  <label className="form-label">코인 투자 경험</label>
                  <select
                    className="form-input"
                    value={formData.experience}
                    onChange={handleInput("experience")}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">선택해 주세요</option>
                    <option value="none">없음 (입문자)</option>
                    <option value="under1">1년 미만</option>
                    <option value="1to3">1~3년</option>
                    <option value="over3">3년 이상</option>
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">예상 운용 자금</label>
                  <select
                    className="form-input"
                    value={formData.capital}
                    onChange={handleInput("capital")}
                    style={{ cursor: "pointer" }}
                  >
                    <option value="">선택해 주세요</option>
                    <option value="under500">500만원 미만</option>
                    <option value="500to1000">500만~1,000만원</option>
                    <option value="1000to3000">1,000만~3,000만원</option>
                    <option value="over3000">3,000만원 이상</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">문의 사항</label>
                <textarea
                  className="form-textarea"
                  placeholder="궁금한 점이나 요청 사항을 자유롭게 작성해 주세요."
                  value={formData.message}
                  onChange={handleInput("message")}
                />
              </div>

              <button
                type="submit"
                className="btn-submit"
                disabled={isDisabled}
              >
                {formStatus === "sending" ? "제출 중..." : "신청서 제출하기"}
              </button>

              {formStatus === "error" && (
                <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "12px", textAlign: "center" }}>
                  제출에 실패했습니다. boddaring@endholdings.com으로 직접 문의해 주세요.
                </p>
              )}
            </form>
          </div>
        )}

        <p style={{ textAlign: "center", fontSize: "13px", color: "var(--muted2)", marginTop: "20px" }}>
          또는{" "}
          <a href="mailto:boddaring@endholdings.com" style={{ color: "var(--accent2)", fontWeight: 700 }}>
            boddaring@endholdings.com
          </a>
          {" "}으로 직접 문의해 주세요.
        </p>
      </div>

      {/* 푸터 */}
      <footer>
        <div className="container">
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} BODDARING. All rights reserved.</span>
            <div className="footer-bottom-links">
              <Link href="/">메인으로</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
