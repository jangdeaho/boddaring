"use client";
import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import Link from "next/link";

export default function Apply() {
  const [tab, setTab] = useState("monthly"); // monthly, yearly, vip
  const [selectedPlan, setSelectedPlan] = useState("BASIC");
  const [usdtRate, setUsdtRate] = useState(1450);
  const [lastUpdate, setLastUpdate] = useState("");
  const [formStatus, setFormStatus] = useState("idle");
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", telegram: "", experience: "1년 미만", budget: "1,000만원 미만", message: ""
  });

  /* 환율 실시간 연동 (10초 주기) */
  useEffect(() => {
    const fetchRate = async () => {
      try {
        const [upbitRes, binanceRes] = await Promise.all([
          fetch("https://api.upbit.com/v1/ticker?markets=KRW-BTC"),
          fetch("https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT")
        ]);
        const upbitData = await upbitRes.json();
        const binanceData = await binanceRes.json();
        const rate = upbitData[0].trade_price / parseFloat(binanceData.price);
        setUsdtRate(Math.round(rate));
        setLastUpdate(new Date().toLocaleTimeString());
      } catch (e) { console.error("Rate fetch error", e); }
    };
    fetchRate();
    const timer = setInterval(fetchRate, 10000);
    return () => clearInterval(timer);
  }, []);

  const plans = {
    monthly: [
      { id: "BASIC", name: "BASIC", price: 2200000, items: ["실시간 시그널", "월 금액"] },
      { id: "PRO", name: "PRO", price: 3300000, items: ["실시간 시그널", "종합 BOT"] },
      { id: "BOT", name: "BOT", price: 1100000, items: ["종합 BOT"] }
    ],
    yearly: [
      { id: "BASIC_Y", name: "BASIC", price: 22000000, items: ["실시간 시그널", "연 금액", "✨2개월 할인 혜택!"] },
      { id: "PRO_Y", name: "PRO", price: 33000000, items: ["실시간 시그널", "종합 BOT", "✨2개월 할인 혜택!"] },
      { id: "BOT_Y", name: "BOT", price: 11000000, items: ["종합 BOT", "✨2개월 할인 혜택!"] }
    ],
    vip: [
      { id: "VIP", name: "VIP PASS", price: 100000000, items: ["모든 기능 무제한", "1:1 컨설팅", "전용 서버 구축"] }
    ]
  };

  const currentPlans = plans[tab];
  const activePlan = currentPlans.find(p => p.id === selectedPlan) || currentPlans[0];
  const usdtPrice = Math.round(activePlan.price / usdtRate);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_APPLICATION,
        {
          ...formData,
          plan_name: `${tab.toUpperCase()} - ${activePlan.name}`,
          krw_price: activePlan.price.toLocaleString(),
          usdt_price: usdtPrice.toLocaleString(),
          exchange_rate: usdtRate.toLocaleString(),
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
        <h1 className="hero-title" style={{ fontSize: '36px' }}>서비스 신청하기</h1>
        <p className="hero-desc" style={{ margin: '0 auto' }}>원하시는 플랜을 선택하고 신청서를 작성해 주시면 검토 후 빠르게 연락드리겠습니다.</p>
      </div>

      <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginBottom: '40px' }}>
        <button className={`tab-btn ${tab === "monthly" ? "active" : ""}`} onClick={() => {setTab("monthly"); setSelectedPlan("BASIC");}}>월 플랜</button>
        <button className={`tab-btn ${tab === "yearly" ? "active" : ""}`} onClick={() => {setTab("yearly"); setSelectedPlan("BASIC_Y");}}>연 플랜</button>
        <button className={`tab-btn vip-gold-btn ${tab === "vip" ? "active" : ""}`} onClick={() => {setTab("vip"); setSelectedPlan("VIP");}}>👑 VIP 플랜</button>
      </div>

      <div className="plan-row">
        {currentPlans.map(plan => (
          <div key={plan.id} className={`plan-box ${selectedPlan === plan.id ? "active" : ""} ${tab === 'vip' ? 'vip-card-gold' : ''}`} onClick={() => setSelectedPlan(plan.id)}>
            {selectedPlan === plan.id && <span className="plan-check">✓ 선택됨</span>}
            <h3 className="timeline-title" style={{ fontSize: '24px', marginBottom: '16px' }}>{plan.name}</h3>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff' }}>₩ {plan.price.toLocaleString()}</div>
              <div style={{ fontSize: '14px', color: 'var(--accent2)', marginTop: '4px' }}>≈ {Math.round(plan.price / usdtRate).toLocaleString()} USDT</div>
            </div>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {plan.items.map((item, i) => (
                <li key={i} style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent2)' }}>•</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '12px', color: 'var(--muted2)' }}>
        현재 환율: 1 USDT = {usdtRate.toLocaleString()} KRW (갱신: {lastUpdate})<br />
        * 모든 플랜은 부가세(VAT) 포함입니다. 플랜 가격은 결제 당시 환율로 계산합니다.
      </div>

      <form onSubmit={handleSubmit} className="contact-form" style={{ marginTop: '60px', maxWidth: '800px', margin: '60px auto 0' }}>
        <h3 className="timeline-title" style={{ marginBottom: '24px', textAlign: 'center' }}>신청서 작성 <span style={{ fontSize: '12px', color: '#ff4d4d', fontWeight: 'normal' }}>* 필수 입력</span></h3>
        
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

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>코인 투자 경험</label>
            <select className="form-input" value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})}>
              <option>1년 미만</option><option>1~3년</option><option>3~5년</option><option>5년 이상</option>
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>예상 운용 자금</label>
            <select className="form-input" value={formData.budget} onChange={e => setFormData({...formData, budget: e.target.value})}>
              <option>1,000만원 미만</option><option>1,000~5,000만원</option><option>5,000만원~1억</option><option>1억 이상</option>
            </select>
          </div>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontSize: '13px', marginBottom: '8px' }}>추가 문의사항</label>
          <textarea className="form-input" style={{ minHeight: '120px' }} value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} />
        </div>

        <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px' }}>
          {formStatus === "sending" ? "신청서 제출 중..." : formStatus === "sent" ? "제출 완료! 곧 연락드리겠습니다." : "신청서 제출하기"}
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
