"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import emailjs from "@emailjs/browser";

export default function TrialPage() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    telegram: "",
    message: ""
  });
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (pk) emailjs.init(pk);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION;
      await emailjs.send(serviceId, templateId, {
        plan_type: "TRIAL",
        plan_name: "24시간 무료체험",
        user_name: formData.name,
        user_phone: formData.phone,
        user_email: formData.email,
        user_telegram: formData.telegram,
        user_message: formData.message || "24시간 무료체험 신청"
      });
      setStatus("sent");
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="trial-page" style={{ paddingTop: '140px', paddingBottom: '100px', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: '800px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <div style={{ display: 'inline-block', padding: '8px 16px', borderRadius: '20px', background: 'rgba(108,79,255,0.1)', border: '1px solid var(--accent)', color: 'var(--accent2)', fontSize: '14px', fontWeight: 800, marginBottom: '20px' }}>LIMITED OFFER</div>
          <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '20px', color: '#fff' }}>24시간 무료체험 신청</h1>
          <p style={{ color: 'var(--muted)', fontSize: '18px', lineHeight: '1.6' }}>
            BODDARING의 압도적인 데이터 속도를 직접 경험해 보세요.<br />
            신청 후 승인이 완료되면 24시간 동안 모든 기능을 제한 없이 이용하실 수 있습니다.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '24px', border: '1px solid var(--stroke)', backdropFilter: 'blur(20px)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 700 }}>이름 *</label>
              <input type="text" required placeholder="실명 입력" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--stroke)', color: '#fff' }} />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 700 }}>연락처 *</label>
              <input type="text" required placeholder="010-0000-0000" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--stroke)', color: '#fff' }} />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 700 }}>이메일 *</label>
              <input type="email" required placeholder="example@email.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--stroke)', color: '#fff' }} />
            </div>
            <div className="input-group">
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 700 }}>텔레그램 ID *</label>
              <input type="text" required placeholder="@username" value={formData.telegram} onChange={e => setFormData({...formData, telegram: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--stroke)', color: '#fff' }} />
            </div>
          </div>
          <div style={{ marginTop: '24px' }}>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 700 }}>신청 메시지 (선택)</label>
            <textarea rows="3" placeholder="간단한 인사말이나 요청사항을 적어주세요" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--stroke)', color: '#fff' }} />
          </div>
          
          <button type="submit" className="btn-shine-wrap" style={{ width: '100%', marginTop: '32px', border: 'none', cursor: 'pointer' }} disabled={status === 'sending'}>
            <div className="btn-shine-inner" style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: '18px' }}>
              {status === 'sending' ? '신청 중...' : '24시간 무료체험 신청하기 🚀'}
            </div>
            <div className="btn-shine-effect"></div>
          </button>
          
          {status === 'sent' && <p style={{ color: '#10b981', textAlign: 'center', marginTop: '16px', fontWeight: 700 }}>신청이 완료되었습니다! 검토 후 연락드리겠습니다.</p>}
          {status === 'error' && <p style={{ color: '#ef4444', textAlign: 'center', marginTop: '16px' }}>오류가 발생했습니다. 다시 시도해 주세요.</p>}
          
          <div style={{ marginTop: '30px', padding: '20px', borderRadius: '12px', background: 'rgba(255,107,53,0.05)', border: '1px solid rgba(255,107,53,0.2)' }}>
            <p style={{ fontSize: '13px', color: 'var(--accent3)', lineHeight: '1.6', textAlign: 'center' }}>
              * 무료체험은 1인당 1회만 가능하며, 중복 신청 시 거절될 수 있습니다.<br />
              * 허위 정보 기재 시 승인이 취소될 수 있습니다.
            </p>
          </div>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link href="/" style={{ color: 'var(--muted2)', fontSize: '14px', textDecoration: 'underline' }}>메인으로 돌아가기</Link>
        </div>
      </div>
    </div>
  );
}
