"use client";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

export default function Trial() {
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", telegram: "", experience: "1년 미만", message: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION,
        {
          ...formData,
          plan_name: "24시간 무료체험 신청",
          to_email: "boddaring@endholdings.com"
        },
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );
      setFormStatus("sent");
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (e) { setFormStatus("error"); }
  };

  return (
    <div className="apply-wrap container">
      <Link href="/" className="brand" style={{ marginBottom: '40px' }}>
        <img src="/doge.png" alt="BODDARING" className="brand-icon" />
        <span className="brand-name">BODDARING</span>
      </Link>

      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h1 className="hero-title" style={{ fontSize: '36px' }}>24시간 무료체험 신청</h1>
        <p className="hero-desc" style={{ margin: '0 auto' }}>BODDARING의 압도적인 기술력을 단 하루 동안 제한 없이 경험해 보세요.</p>
      </div>

      <form onSubmit={handleSubmit} className="contact-form" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h3 className="timeline-title" style={{ marginBottom: '24px', textAlign: 'center' }}>무료체험 신청서 <span style={{ fontSize: '12px', color: '#ff4d4d', fontWeight: 'normal' }}>* 필수 입력</span></h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>이름 (Name) <span style={{ color: '#ff4d4d' }}>*</span></label>
            <input type="text" className="form-input" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>연락처 (Phone) <span style={{ color: '#ff4d4d' }}>*</span></label>
            <input type="text" className="form-input" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} />
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>이메일 (E-mail) <span style={{ color: '#ff4d4d' }}>*</span></label>
            <input type="email" className="form-input" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>텔레그램 ID <span style={{ color: '#ff4d4d' }}>*</span></label>
            <input type="text" className="form-input" required value={formData.telegram} onChange={e => setFormData({...formData, telegram: e.target.value})} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>코인 투자 경험</label>
          <select className="form-input" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
            <option>1년 미만</option><option>1~3년</option><option>3~5년</option><option>5년 이상</option>
          </select>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>추가 문의사항</label>
          <textarea className="form-input" style={{ minHeight: '120px' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }}>
          {formStatus === "sending" ? "신청서 제출 중..." : formStatus === "sent" ? "제출 완료! 곧 연락드리겠습니다." : "24시간 무료체험 신청하기 🚀"}
        </button>
      </form>

      <style jsx>{`
        .apply-wrap { position: relative; z-index: 1; }
        .contact-form { background: rgba(255,255,255,0.03); padding: 40px; border-radius: 24px; border: 1px solid var(--stroke); }
        .form-input { width: 100%; padding: 14px 20px; border-radius: 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--stroke); color: #fff; font-size: 15px; outline: none; transition: all 0.2; }
        .form-input:focus { border-color: var(--accent); background: rgba(255,255,255,0.08); }
        select.form-input { appearance: none; background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E"); background-repeat: no-repeat; background-position: right 15px center; background-size: 18px; }
      `}</style>
    </div>
  );
}
