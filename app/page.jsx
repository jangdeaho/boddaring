"use client";
import emailjs from "@emailjs/browser";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const EXCHANGES = [
  { name: "업비트", logo: "upbit.png", color: "#1763B6" },
  { name: "빗썸", logo: "bithumb.png", color: "#F7A600" },
  { name: "코인원", logo: "coinone.png", color: "#0075FF" },
  { name: "코빗", logo: "korbit.png", color: "#0075FF" },
  { name: "고팍스", logo: "gopax.png", color: "#fea831" },
  { name: "Binance", logo: "binance.png", color: "#F0B90B" },
  { name: "Bybit", logo: "bybit.png", color: "#ffb01f" },
  { name: "OKX", logo: "okx.png", color: "#ffffff" },
  { name: "KuCoin", logo: "kucoin.png", color: "#00C087" },
  { name: "Gate.io", logo: "gateio.png", color: "#e0464c" },
  { name: "Bitget", logo: "bitget.png", color: "#00f5ff" },
  { name: "MEXC", logo: "mexc.png", color: "#00b3ff" },
  { name: "HTX", logo: "htx.png", color: "#00c2ff" },
  { name: "Crypto.com", logo: "cryptocom.png", color: "#0066ff" },
  { name: "Coinbase", logo: "coinbase.png", color: "#0052ff" },
  { name: "Bitmart", logo: "bitmart.png", color: "#5741D9" },
  { name: "Kraken", logo: "kraken.png", color: "#5741d9" },
  { name: "AscendEX", logo: "ascendex.png", color: "#7c44c0" },
  { name: "Bingx", logo: "bingx.png", color: "#2a54ff" },
  { name: "Whitebit", logo: "whitebit.png", color: "#eabb4a" },
  { name: "Lbank", logo: "lbank.png", color: "#ffcd00" },
  { name: "CoinEx", logo: "coinex.png", color: "#1ee1bc" },
  { name: "OrangeX", logo: "orangex.png", color: "#ff8508" },
  { name: "Deepcoin", logo: "deepcoin.png", color: "#fe7701" },
];


function StarCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;

    const stars = Array.from({ length: 220 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.2,
      a: Math.random() * 0.7 + 0.15,
      speed: Math.random() * 0.003 + 0.001,
      phase: Math.random() * Math.PI * 2,
    }));

    class Meteor {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * W * 1.5 - W * 0.25;
        this.y = -40;
        this.len = Math.random() * 120 + 60;
        this.speed = Math.random() * 6 + 4;
        this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.3;
        this.alpha = 0;
        this.life = 0;
        this.maxLife = Math.random() * 60 + 40;
        this.active = false;
        this.delay = Math.random() * 400;
        this.timer = 0;
      }
      update() {
        if (!this.active) {
          this.timer++;
          if (this.timer >= this.delay) { this.active = true; }
          return;
        }
        this.life++;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        const progress = this.life / this.maxLife;
        this.alpha = progress < 0.2
          ? progress / 0.2
          : progress > 0.7
            ? 1 - (progress - 0.7) / 0.3
            : 1;
        if (this.life >= this.maxLife || this.x > W + 100 || this.y > H + 100) {
          this.reset();
        }
      }
      draw(ctx) {
        if (!this.active || this.alpha <= 0) return;
        const tailX = this.x - Math.cos(this.angle) * this.len;
        const tailY = this.y - Math.sin(this.angle) * this.len;
        const grad = ctx.createLinearGradient(tailX, tailY, this.x, this.y);
        grad.addColorStop(0, `rgba(255,255,255,0)`);
        grad.addColorStop(0.6, `rgba(180,160,255,${this.alpha * 0.4})`);
        grad.addColorStop(1, `rgba(255,255,255,${this.alpha * 0.9})`);
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.lineCap = "round";
        ctx.stroke();
        const glow = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, 6);
        glow.addColorStop(0, `rgba(255,255,255,${this.alpha * 0.8})`);
        glow.addColorStop(1, `rgba(180,160,255,0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6, 0, Math.PI * 2);
        ctx.fillStyle = glow;
        ctx.fill();
      }
    }

    const meteors = Array.from({ length: 6 }, () => new Meteor());

    let frame = 0;
    let raf;

    function draw() {
      ctx.clearRect(0, 0, W, H);
      frame++;


      stars.forEach((s) => {
        const a = s.a * (0.6 + 0.4 * Math.sin(frame * s.speed + s.phase));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(220,230,255,${a})`;
        ctx.fill();
      });


      meteors.forEach((m) => {
        m.update();
        m.draw(ctx);
      });

      raf = requestAnimationFrame(draw);
    }

    draw();

    const onResize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = W;
      canvas.height = H;
      stars.forEach((s) => {
        s.x = Math.random() * W;
        s.y = Math.random() * H;
      });
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="star-canvas"
      aria-hidden="true"
    />
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [contactTab, setContactTab] = useState("inquiry");
  const [activeBot, setActiveBot] = useState("order");
  const [formData, setFormData] = useState({
    email: "",
    telegram: "",
    message: "",
  });
  const [devFormData, setDevFormData] = useState({
    email: "",
    telegram: "",
    program: "",
  });
  const [formStatus, setFormStatus] = useState("idle");
  const [devFormStatus, setDevFormStatus] = useState("idle");
  const [formErrors, setFormErrors] = useState({});
  const [devFormErrors, setDevFormErrors] = useState({});
  const [emailjsReady, setEmailjsReady] = useState(false);
  const serviceRef = useRef(null);
  const serviceCloseT = useRef(null);


  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (serviceRef.current && !serviceRef.current.contains(e.target)) {
        setServiceOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
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


  useEffect(() => {
    const pk = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!pk) {
      console.error("Missing NEXT_PUBLIC_EMAILJS_PUBLIC_KEY");
      return;
    }
    emailjs.init(pk);
    setEmailjsReady(true);
  }, []);


  const validate = () => {
    const errs = {};
    if (!formData.email.trim()) errs.email = true;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errs.email = true;
    if (!formData.telegram.trim()) errs.telegram = true;
    return errs;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }
    setFormErrors({});
    setFormStatus("sending");
    try {
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
      const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_INQUIRY || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS env missing");
      }
      await emailjs.send(serviceId, templateId, {
        from_email: formData.email,
        telegram_id: formData.telegram,
        message: formData.message || "(메시지 없음)",
        to_email: "boddaring@endholdings.com",
      });
      setFormStatus("sent");
      setFormData({ email: "", telegram: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 5000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setFormStatus("error");
    }
  };


const handleDevSubmit = async (e) => {
  e.preventDefault();
  

  if (!devFormData.email.trim() || !devFormData.telegram.trim()) {
    setDevFormErrors({ 
      email: !devFormData.email.trim(), 
      telegram: !devFormData.telegram.trim() 
    });
    return;
  }

  setDevFormErrors({});
  setDevFormStatus("sending");

  try {
    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID2; 
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_DEVELOPMENT;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
    if (!serviceId || !templateId || !publicKey) {
      throw new Error("EmailJS 설정값이 없습니다.");
    }
    await emailjs.send(serviceId, templateId, {
        from_email: devFormData.email,
        telegram_id: devFormData.telegram,
        program_request: devFormData.program || "(내용 없음)",
        to_email: "development@endholdings.com",
      });

    setDevFormStatus("sent");
    setDevFormData({ email: "", telegram: "", program: "" });
    setTimeout(() => setDevFormStatus("idle"), 5000);
  } catch (error) {
    const res = await emailjs.send(serviceId, templateId, params);
    console.error("EmailJS Error:", error);
    setDevFormStatus("error");
  }
};


  const handleInput = (field) => (e) => {
    setFormData((p) => ({ ...p, [field]: e.target.value }));
    if (formErrors[field]) setFormErrors((p) => ({ ...p, [field]: false }));
  };

  const handleDevInput = (field) => (e) => {
    setDevFormData((p) => ({ ...p, [field]: e.target.value }));
    if (devFormErrors[field]) setDevFormErrors((p) => ({ ...p, [field]: false }));
  };

  const isSubmitDisabled =
    !emailjsReady ||
    !formData.email.trim() ||
    !formData.telegram.trim() ||
    formStatus === "sending";

  const isDevSubmitDisabled =
    !emailjsReady ||
    !devFormData.email.trim() ||
    !devFormData.telegram.trim() ||
    devFormStatus === "sending";

  const doubledExchanges = [...EXCHANGES, ...EXCHANGES];

  const openWithCancel = (setFn, timerRef) => {
    if (timerRef?.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setFn(true);
  };
  const closeWithDelay = (setFn, timerRef, ms = 220) => {
    if (timerRef?.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setFn(false);
      timerRef.current = null;
    }, ms);
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
  
    const applyTabFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const tab = params.get("tab");
      if (tab === "inquiry" || tab === "development") {
        setContactTab(tab);
      }
    };
  
    applyTabFromUrl();
  }, []);

  return (
    <>
      <StarCanvas />
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      <style jsx global>{`
        #about .about-grid{
          display:grid;
          grid-template-columns:1.04fr .96fr;
          gap:38px;
          align-items:center;
        }
        #about .signal-shell{
          position:relative;
          min-height:850px;
          overflow:hidden;
          border-radius:28px;
          border:1px solid rgba(255,255,255,.12);
          background:radial-gradient(420px 260px at 22% 18%, rgba(124,58,237,.18), transparent 62%),radial-gradient(420px 300px at 84% 20%, rgba(14,165,233,.11), transparent 65%),linear-gradient(145deg, rgba(255,255,255,.065), rgba(255,255,255,.026));
          box-shadow:0 24px 90px rgba(0,0,0,.42), inset 0 1px 0 rgba(255,255,255,.08);
        }
        #about .signal-ui{position:absolute;inset:22px;border:1px solid rgba(255,255,255,.11);border-radius:24px;background:rgba(4,7,18,.72);backdrop-filter:blur(18px);box-shadow:0 18px 80px rgba(0,0,0,.42);overflow:hidden;animation:bdrFadeUp .35s ease;}
        #about .signal-head{min-height:68px;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:0 18px;border-bottom:1px solid rgba(255,255,255,.08);background:linear-gradient(90deg,rgba(124,58,237,.14),transparent),rgba(255,255,255,.03);}
        #about .signal-brand{display:flex;align-items:center;gap:12px;min-width:0;}
        #about .signal-logo{width:38px;height:38px;border-radius:12px;overflow:hidden;background:rgba(255,255,255,.06);display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(124,58,237,.18);padding:6px;}
        #about .signal-logo img{width:100%;height:100%;object-fit:contain;display:block;}
        #about .signal-title{font-weight:950;font-size:15px;color:rgba(245,247,255,.97);}
        #about .signal-body{padding:18px;display:grid;gap:16px;}
        #about .signal-stats{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:12px;}
        #about .stat-card{padding:14px 14px 13px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.07);box-shadow:inset 0 1px 0 rgba(255,255,255,.03);}
        #about .stat-label{color:rgba(202,210,238,.54);font-size:11px;line-height:1.15;font-weight:900;letter-spacing:.04em;text-transform:uppercase;margin-bottom:8px;white-space:nowrap;}
        #about .stat-value{font-size:22px;font-weight:950;letter-spacing:-.04em;}
        #about .stat-sub{margin-top:4px;color:rgba(202,210,238,.64);font-size:12px;font-weight:700;}
        #about .signal-flow{display:flex;align-items:center;gap:10px;flex-wrap:wrap;padding:14px 16px;border-radius:16px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);}
        #about .flow-node{display:flex;align-items:center;gap:8px;padding:10px 12px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);font-size:12px;font-weight:850;color:rgba(245,247,255,.92);}
        #about .flow-dot{width:8px;height:8px;border-radius:50%;box-shadow:0 0 14px currentColor;animation:bdrPulse 1.4s ease-in-out infinite;}
        #about .arrow{color:rgba(202,210,238,.46);font-weight:900;font-size:14px;}
        #about .signal-table{overflow:hidden;border-radius:18px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.035);}
        #about .signal-row,#about .signal-head-row{display:grid;grid-template-columns:.82fr 1.34fr 1.34fr .92fr .55fr;gap:12px;align-items:center;padding:15px 18px;}
        #about .signal-head-row{border-bottom:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.03);color:rgba(202,210,238,.62);font-size:11px;font-weight:900;letter-spacing:.08em;text-transform:uppercase;}
        #about .signal-row{position:relative;animation:bdrSoftIn .4s ease both;}
        #about .signal-row:nth-child(2){animation-delay:.05s;}#about .signal-row:nth-child(3){animation-delay:.1s;}#about .signal-row:nth-child(4){animation-delay:.15s;}
        #about .signal-row + .signal-row{border-top:1px solid rgba(255,255,255,.06);}
        #about .coin-cell{display:flex;align-items:center;gap:10px;font-weight:950;min-width:0;}
        #about .coin-icon{width:30px;height:30px;border-radius:50%;overflow:hidden;background:none;display:block;box-shadow:none;flex:0 0 30px;}
        #about .coin-icon img{width:100%;height:100%;object-fit:cover;display:block;}
        #about .pair-block{display:flex;flex-direction:column;gap:4px;min-width:0;}
        #about .pair-top{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:900;color:rgba(245,247,255,.96);white-space:nowrap;}
        #about .pair-ex{color:rgba(202,210,238,.46);font-size:11px;font-weight:800;text-transform:uppercase;}
        #about .pair-bottom{font-size:12px;font-weight:900;color:#fbbf24;}#about .pair-bottom.blue{color:#22d3ee;}
        #about .amount-cell{font-size:13px;font-weight:950;color:#fff;white-space:nowrap;}#about .per-cell{font-size:16px;font-weight:950;color:#4ade80;white-space:nowrap;}#about .per-cell.red{color:#ff5f73;}#about .per-cell.green{color:#22c55e;}
        #about .about-copy .section-desc{font-size:13px;line-height:1.85;max-width:720px;}
        #about .value-stack{display:grid;gap:13px;margin-top:28px;}
        #about .value-card{position:relative;overflow:hidden;padding:18px 18px 18px 52px;border:1px solid rgba(255,255,255,.10);border-radius:18px;background:rgba(255,255,255,.045);transition:transform .18s ease,border-color .18s ease,background .18s ease;}
        #about .value-card:hover{transform:translateY(-2px);border-color:rgba(167,139,250,.34);background:rgba(255,255,255,.062);}
        #about .value-card:before{content:"✓";position:absolute;left:18px;top:18px;width:22px;height:22px;display:grid;place-items:center;border-radius:50%;color:#08111d;background:linear-gradient(135deg,#34d399,#38bdf8);font-size:12px;font-weight:950;}
        #about .value-title{font-size:15px;font-weight:950;margin:0 0 5px;}#about .value-desc{margin:0;color:rgba(202,210,238,.66);line-height:1.62;font-size:13px;font-weight:650;}

        #bot .bot-layout{margin-top:40px;display:grid;grid-template-columns:.86fr 1.14fr;gap:28px;align-items:stretch;}
        #bot .bot-tabs{display:grid;gap:14px;}#bot .bot-tab{width:100%;padding:20px;border:1px solid rgba(255,255,255,.10);border-radius:20px;background:rgba(255,255,255,.04);color:white;text-align:left;cursor:pointer;transition:transform .2s ease,border-color .2s ease,background .2s ease,box-shadow .2s ease;}
        #bot .bot-tab:hover{transform:translateY(-2px);border-color:rgba(167,139,250,.28);background:rgba(255,255,255,.058);}#bot .bot-tab.active{border-color:rgba(167,139,250,.48);background:linear-gradient(135deg,rgba(124,58,237,.18),rgba(56,189,248,.08)),rgba(255,255,255,.05);box-shadow:0 0 40px rgba(124,58,237,.12);}
        #bot .bot-tab-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:12px;}#bot .bot-tag{display:inline-flex;align-items:center;gap:7px;color:rgba(221,214,254,.96);background:rgba(124,58,237,.18);border:1px solid rgba(167,139,250,.18);border-radius:999px;padding:7px 10px;font-size:11px;font-weight:950;letter-spacing:.05em;}#bot .bot-tag i{width:7px;height:7px;border-radius:50%;background:#a78bfa;box-shadow:0 0 12px rgba(167,139,250,.7);}#bot .bot-index{color:rgba(202,210,238,.42);font-size:12px;font-weight:950;}#bot .bot-tab h3{margin:0 0 8px;font-size:20px;font-weight:950;letter-spacing:-.035em;}#bot .bot-tab p{margin:0;color:rgba(202,210,238,.66);font-size:13px;line-height:1.62;font-weight:650;}
        #bot .bot-mini-chips{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px;}#bot .bot-mini-chips span{display:inline-flex;align-items:center;padding:6px 10px;border-radius:999px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.08);color:rgba(235,240,255,.82);font-size:11px;font-weight:850;}
        #bot .bot-preview{position:relative;min-height:580px;overflow:hidden;border:1px solid rgba(255,255,255,.12);border-radius:28px;background:radial-gradient(520px 300px at 70% 10%,rgba(56,189,248,.14),transparent 62%),radial-gradient(400px 260px at 18% 24%,rgba(124,58,237,.2),transparent 65%),rgba(255,255,255,.045);box-shadow:0 24px 90px rgba(0,0,0,.42),inset 0 1px 0 rgba(255,255,255,.07);}
        #bot .bot-preview:before{content:"";position:absolute;inset:0;opacity:.11;background:linear-gradient(90deg,transparent 0 49%,rgba(255,255,255,.08) 50%,transparent 51%),linear-gradient(0deg,transparent 0 49%,rgba(255,255,255,.06) 50%,transparent 51%);background-size:42px 42px;mask-image:radial-gradient(circle at 54% 28%,black,transparent 78%);pointer-events:none;}
        #bot .program-shell{position:absolute;inset:34px;border:1px solid rgba(255,255,255,.13);border-radius:24px;background:rgba(4,7,18,.78);box-shadow:0 18px 80px rgba(0,0,0,.44);backdrop-filter:blur(20px);overflow:hidden;animation:bdrFadeUp .35s ease;}
        #bot .program-head{min-height:66px;display:flex;align-items:center;justify-content:space-between;gap:14px;padding:0 20px;border-bottom:1px solid rgba(255,255,255,.09);background:linear-gradient(90deg,rgba(124,58,237,.12),transparent),rgba(255,255,255,.035);}
        #bot .program-brand{display:flex;align-items:center;gap:12px;min-width:0;}
        #bot .program-logo{width:34px;height:34px;border-radius:12px;background:linear-gradient(135deg,rgba(124,58,237,.92),rgba(56,189,248,.76));box-shadow:0 0 22px rgba(124,58,237,.25);display:grid;place-items:center;font-weight:950;font-size:13px;overflow:hidden;}
        #bot .program-logo img{width:100%;height:100%;object-fit:cover;display:block;}
        #bot .program-title{font-weight:950;font-size:15px;color:rgba(245,247,255,.96);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        #bot .program-sub{margin-top:2px;color:rgba(202,210,238,.48);font-size:11px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        #bot .program-status{padding:8px 11px;border-radius:999px;background:rgba(52,211,153,.09);border:1px solid rgba(52,211,153,.18);color:rgba(209,250,229,.92);font-size:11px;font-weight:950;white-space:nowrap;}
        #bot .program-canvas{height:calc(100% - 66px);padding:18px;overflow:hidden;}#bot .ui-grid{display:grid;grid-template-columns:.95fr 1.05fr;gap:16px;height:100%;}#bot .ui-panel{border:1px solid rgba(255,255,255,.09);border-radius:18px;background:rgba(255,255,255,.035);padding:16px;min-height:0;display:flex;flex-direction:column;overflow:hidden;}#bot .panel-label{margin-bottom:14px;color:rgba(202,210,238,.48);font-size:10px;font-weight:950;letter-spacing:.18em;text-transform:uppercase;}#bot .control-form{display:grid;gap:10px;flex:1;min-height:0;}#bot .field-row{display:grid;grid-template-columns:96px 1fr;gap:10px;align-items:center;}#bot .field-row label{color:rgba(245,247,255,.88);font-size:12px;font-weight:900;}#bot .fake-input{height:31px;display:flex;align-items:center;justify-content:space-between;gap:8px;padding:0 10px;border-radius:4px;background:rgba(255,255,255,.9);color:#111827;font-size:12px;font-weight:800;white-space:nowrap;overflow:hidden;}#bot .fake-input.disabled{opacity:.6;background:rgba(255,255,255,.58);}#bot .select-arrow{color:rgba(15,23,42,.62);font-size:10px;margin-left:auto;}#bot .center-actions{display:flex;justify-content:center;gap:12px;flex-wrap:wrap;margin-top:16px;}#bot .fake-btn{min-width:96px;padding:10px 14px;border-radius:6px;text-align:center;font-size:12px;font-weight:950;color:#071018;box-shadow:0 0 18px rgba(255,255,255,.05);transition:transform .18s ease,box-shadow .18s ease,filter .18s ease;}#bot .fake-btn:hover{transform:translateY(-1px);filter:brightness(1.03);box-shadow:0 8px 24px rgba(0,0,0,.25);}#bot .btn-sell{background:#ff6868;}#bot .btn-stop{background:#ffe16c;}#bot .btn-send{background:#58f29d;}
        #bot .log-panel{display:flex;flex-direction:column;min-height:0;height:100%;}#bot .log-box{flex:1;min-height:0;display:flex;flex-direction:column;gap:8px;padding:13px;border-radius:12px;background:rgba(0,0,0,.28);border:1px solid rgba(255,255,255,.07);overflow:hidden;box-shadow:inset 0 1px 0 rgba(255,255,255,.03);}#bot .log-line{color:rgba(245,247,255,.84);font-size:12px;font-weight:770;line-height:1.38;padding:8px 10px;border-radius:10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.03);animation:bdrSoftIn .35s ease both;}#bot .log-line:nth-child(2){animation-delay:.05s;}#bot .log-line:nth-child(3){animation-delay:.1s;}#bot .log-line:nth-child(4){animation-delay:.15s;}#bot .log-line:nth-child(5){animation-delay:.2s;}#bot .log-line.good{color:rgba(187,247,208,.95);border-color:rgba(52,211,153,.16);}#bot .log-line.warn{color:rgba(254,240,138,.95);border-color:rgba(250,204,21,.14);}#bot .log-line.blue{color:rgba(186,230,253,.95);border-color:rgba(56,189,248,.16);}
        #bot .assist-preview-wrap{height:100%;display:flex;flex-direction:column;justify-content:flex-start;padding:4px 2px 0;}#bot .assist-intro{text-align:center;margin-bottom:10px;padding:0 8px;}#bot .assist-kicker{color:rgba(202,210,238,.52);font-size:10px;font-weight:900;letter-spacing:.14em;text-transform:uppercase;margin-bottom:8px;}#bot .assist-title{font-size:22px;line-height:1.2;font-weight:950;letter-spacing:-.03em;color:#f5f7ff;margin-bottom:8px;}#bot .assist-desc{max-width:560px;margin:0 auto;font-size:12px;line-height:1.6;color:rgba(202,210,238,.68);font-weight:650;}#bot .assist-slider-stage{position:relative;overflow:hidden;margin-top:6px;padding:8px 0 10px;}#bot .assist-slider-track{display:flex;gap:16px;width:max-content;padding:0 6px;will-change:transform;animation:bdrAssistLoop 24s linear infinite;}#bot .assist-slider-stage:hover .assist-slider-track{animation-play-state:paused;}#bot .assist-slide-card{width:248px;min-height:272px;border-radius:20px;padding:18px;position:relative;overflow:hidden;background:linear-gradient(180deg,rgba(255,255,255,.055),rgba(255,255,255,.028));border:1px solid rgba(255,255,255,.08);box-shadow:0 16px 34px rgba(0,0,0,.22);flex:0 0 auto;transition:transform .22s ease,border-color .22s ease,box-shadow .22s ease;}#bot .assist-slide-card:hover{transform:translateY(-4px);border-color:rgba(167,139,250,.28);box-shadow:0 22px 42px rgba(0,0,0,.28);}#bot .assist-slide-card:before{content:"";position:absolute;inset:0;background:radial-gradient(160px 90px at 22% 16%,rgba(124,58,237,.14),transparent 60%),radial-gradient(160px 90px at 82% 16%,rgba(56,189,248,.10),transparent 60%);pointer-events:none;}#bot .assist-card-top{position:relative;z-index:1;display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:16px;}#bot .assist-card-icon{width:44px;height:44px;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:900;color:#fff;background:linear-gradient(135deg,rgba(124,58,237,.95),rgba(56,189,248,.78));box-shadow:0 10px 24px rgba(124,58,237,.22);}#bot .assist-card-chip{padding:7px 10px;border-radius:999px;border:1px solid rgba(255,255,255,.08);background:rgba(255,255,255,.05);color:rgba(230,235,255,.88);font-size:10px;font-weight:900;letter-spacing:.08em;}#bot .assist-card-title{position:relative;z-index:1;font-size:18px;font-weight:950;letter-spacing:-.03em;color:#f5f7ff;margin-bottom:8px;}#bot .assist-card-text{position:relative;z-index:1;font-size:12px;line-height:1.65;color:rgba(202,210,238,.72);font-weight:650;min-height:78px;}#bot .assist-card-miniui{position:relative;z-index:1;margin-top:16px;display:grid;gap:10px;}#bot .assist-mini-box{border-radius:12px;padding:11px 12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);}#bot .assist-mini-label{font-size:10px;font-weight:900;color:rgba(202,210,238,.5);letter-spacing:.08em;text-transform:uppercase;margin-bottom:6px;}#bot .assist-mini-value{font-size:13px;font-weight:850;color:#f5f7ff;}#bot .assist-mini-row{display:flex;gap:8px;}#bot .assist-mini-pill{flex:1;padding:10px 10px;border-radius:10px;text-align:center;font-size:11px;font-weight:900;color:#071018;}#bot .assist-pill-yellow{background:#ffb000;}#bot .assist-pill-green{background:#58f29d;}#bot .assist-pill-blue{background:#8fd3ff;}#bot .assist-pill-orange{background:#ffbf47;}#bot .assist-slider-dots{display:flex;justify-content:center;gap:8px;margin-top:8px;}#bot .assist-slider-dots span{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,.16);animation:bdrAssistDotPulse 1.8s ease-in-out infinite;}#bot .assist-slider-dots span:nth-child(2){animation-delay:.25s;}#bot .assist-slider-dots span:nth-child(3){animation-delay:.5s;}
        #bot .mini-cta{margin-top:38px;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;}#bot .ghost-note{padding:12px 14px;border-radius:999px;border:1px solid rgba(255,255,255,.10);background:rgba(255,255,255,.04);color:rgba(202,210,238,.68);font-size:12px;font-weight:800;}
        @keyframes bdrFadeUp{from{opacity:0;transform:translateY(10px);}to{opacity:1;transform:translateY(0);}}@keyframes bdrPulse{0%,100%{opacity:.55;transform:scale(.92);}50%{opacity:1;transform:scale(1.15);}}@keyframes bdrSoftIn{from{opacity:0;transform:translateY(8px);}to{opacity:1;transform:translateY(0);}}@keyframes bdrAssistLoop{from{transform:translateX(0);}to{transform:translateX(-1056px);}}@keyframes bdrAssistDotPulse{0%,100%{opacity:.35;transform:scale(.92);}50%{opacity:1;transform:scale(1.15);}}
        @media (max-width:1080px){#about .about-grid,#bot .bot-layout{grid-template-columns:1fr;}#about .signal-shell{min-height:900px;}#bot .program-shell{position:relative;inset:auto;margin:24px;min-height:540px;}#bot .bot-preview{min-height:auto;}}
        @media (max-width:800px){#about .signal-stats{grid-template-columns:1fr;}#about .signal-head-row,#about .signal-row{grid-template-columns:1fr;gap:10px;}#bot .ui-grid{grid-template-columns:1fr;}#bot .field-row{grid-template-columns:1fr;gap:6px;}#bot .bot-tabs{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;padding-bottom:8px;}#bot .bot-tab{min-width:280px;scroll-snap-align:start;}}
      `}</style>

      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <div className="container">
          <div className="navbar-inner">
            <a href="#top" className="brand">
              <img src="/img/icon.png" alt="BODDARING" className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">BODDARING</span>
                <span className="brand-sub">아비트라지 데이터 플랫폼</span>
              </div>
            </a>

            <div className="nav-links">
              <div
                className={`nav-dropdown${serviceOpen ? " open" : ""}`}
                ref={serviceRef}
                onMouseEnter={() => openWithCancel(setServiceOpen, serviceCloseT)}
                onMouseLeave={() => closeWithDelay(setServiceOpen, serviceCloseT)}
              >
                <button className="nav-link nav-dropdown-trigger">
                  대표 서비스 
                  <svg className="dropdown-arrow" width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <div className="dropdown-menu" onMouseEnter={() => openWithCancel(setServiceOpen, serviceCloseT)}>
                  <a href="#signal" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">📡</span>
                    <div>
                      <div className="dropdown-item-title">시그널 소개</div>
                      <div className="dropdown-item-desc">실시간 차익 시그널 시스템</div>
                    </div>
                  </a>
                  <a href="#bot" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">🤖</span>
                    <div>
                      <div className="dropdown-item-title">BOT 소개</div>
                      <div className="dropdown-item-desc">자동화 보조 프로그램</div>
                    </div>
                  </a>
                  <a href="#exchanges" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">🏦</span>
                    <div>
                      <div className="dropdown-item-title">연동 거래소</div>
                      <div className="dropdown-item-desc">국내·해외 주요 거래소 현황</div>
                    </div>
                  </a>
                  <a href="#contact" className="dropdown-item" onClick={() => setServiceOpen(false)}>
                    <span className="dropdown-item-icon">✉️</span>
                    <div>
                      <div className="dropdown-item-title">문의하기</div>
                      <div className="dropdown-item-desc">서비스 이용 문의</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="nav-inline">
                <Link href="/learn#arbitrage" className="nav-link nav-link--inline">
                  아비트라지란?
                </Link>
                <Link href="/learn#calc-system" className="nav-link nav-link--inline">
                  김프 매매란?
                </Link>
                <Link href="/learn#guidebook" className="nav-link nav-link--inline">
                  A to Z 가이드북
                </Link>
                <Link href="/learn#QNA" className="nav-link nav-link--inline">
                  자주 묻는 질문
                </Link>
              </div>
            </div>

            <div className="nav-cta">
              <Link href="/trial" className="btn-cta-u btn-cta-u--pink">
                무료체험 요청 <span className="arrow">→</span>
              </Link>

              <Link href="/apply" className="btn-cta-u btn-cta-u--blue">
                구독 신청 <span className="arrow">→</span>
              </Link>
            </div>

            <button
              className="hamburger"
              aria-label="메뉴"
              onClick={() => setMenuOpen((p) => !p)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        <button
          className="nav-link mobile-service-toggle"
          onClick={() => setMobileServiceOpen((p) => !p)}
        >
          서비스
          <svg
            className={`dropdown-arrow${mobileServiceOpen ? " rotated" : ""}`}
            width="12" height="12" viewBox="0 0 12 12" fill="none"
          >
            <path d="M2 4L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        {mobileServiceOpen && (
          <div className="mobile-service-list">
            <a href="#signal" className="mobile-service-item" onClick={() => setMenuOpen(false)}>시그널 소개</a>
            <a href="#exchanges" className="mobile-service-item" onClick={() => setMenuOpen(false)}>연동 거래소</a>
            <a href="#bot" className="mobile-service-item" onClick={() => setMenuOpen(false)}>BOT 소개</a>
            <a href="#contact" className="mobile-service-item" onClick={() => setMenuOpen(false)}>문의 접수</a>
          </div>
        )}
        <Link href="/learn#arbitrage" className="nav-link" onClick={() => setMenuOpen(false)}>
          아비트라지란?
        </Link>
        <Link href="/learn#calc-system" className="nav-link" onClick={() => setMenuOpen(false)}>
          김프 매매란?
        </Link>
        <Link href="/learn#realtime" className="nav-link" onClick={() => setMenuOpen(false)}>
          데이터 수집 방법
        </Link>
        <Link href="/learn#guidebook" className="nav-link" onClick={() => setMenuOpen(false)}>
          A to Z 가이드북
        </Link>        
        <Link href="/trial" className="btn-trial-top" onClick={() => setMenuOpen(false)}>
          무료체험 신청하기
        </Link>
        <Link href="/apply" className="btn-apply" onClick={() => setMenuOpen(false)}>
          신청하기 →
        </Link>
      </div>


      <section id="top" className="hero">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-left reveal">
              <div className="hero-badge">
                <span className="hero-badge-dot" />
                실시간 시세차익 데이터 수집 · 구조화 끝판왕
              </div>

              <h1 className="hero-title">
                거래소 간 <span className="hero-grad">시세 차익</span>을<br />한눈에, 빠르게!<br />
                <span className="line2 hero-title-animated">데이터수집의 새로운 기준</span>
              </h1>

              <p className="hero-desc">
                수많은 아비트라지 서비스들, 그동안 실망만 하셨나요?<br />
                국내·해외 거래소에 상장된 모든 코인의 데이터를 수집하여 가격을 비교해 차익을 계산하고,실행 가능한 기회만 선별해 <span className="hero-title-animated">초 단위로 시그널</span>을 제공합니다.<br />
                차원이 다른 압도적인 데이터 수집 속도와 정교한 계산 시스템을<br />
                <span className="pulse">지금 바로 24시간 무료 체험</span>으로 직접 경험해 보세요!
              </p>

              <div className="hero-actions">
                <a href="#contact" className="btn-primary">
                  궁금한 것이 있으신가요? 🙄
                </a>
                <a href="/trial" className="btn-free-trial">
                  24시간 무료체험 신청하기 🚀
                  <span className="btn-shine"></span>
                </a>
              </div>

              <div className="hero-bottom-info">
                <div className="hero-stats-wrap">
                  <div className="hero-stats-badge hero-neon-badge">
                    <span className="live-dot" />
                    Real-Time Data Acquisition
                  </div>
                </div>

                <div className="hero-stats">
                  <div className="hero-stat">
                    <span className="hero-stat-val">15<span className="unit"> +</span></span>
                    <span className="hero-stat-label">연동 거래소</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">10,000<span className="unit"> +</span></span>
                    <span className="hero-stat-label">추적 코인</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">1<span className="unit"> 초</span></span>
                    <span className="hero-stat-label">시그널 갱신 주기</span>
                  </div>
                  <div className="hero-stat-divider" />
                  <div className="hero-stat">
                    <span className="hero-stat-val">300,000<span className="unit"> 회 ⤴</span></span>
                    <span className="hero-stat-label">종목·페어 초당 계산</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-right reveal reveal-delay-2">
              <div className="hero-video-wrap hero-video-large">
                <div className="hero-video-badge">
                  <span className="live-dot" />
                  LIVE Signal
                </div>
                <video
                  className="hero-video"
                  src="/videos/intro.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="signal" style={{ padding: "100px 0" }}>
        <div className="container">
          <div className="section-head reveal">
            <div className="section-label">Signal Intelligence</div>
            <h2 className="section-title">
              아비트라지의 모든 것,<br />
              <span className="hero-grad">BODDARING</span>
            </h2>
            <p className="section-desc no-break">
              거래소 간 가격 비교를 자동화하여, 차트 분석 없이도 가격 격차 구간을 직관적으로 확인할 수 있습니다.<br />
              BODDARING은 실시간 데이터 기반으로 가격 차이가 형성된 구간을 탐지·구조화하여 제공하며, 해당 정보는 투자 판단을 보조하기 위한 참고 자료로 활용됩니다.
            </p>
          </div>

          <div className="feature-timeline reveal">
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">📡</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">실시간 데이터 수집</h3>
                <p className="ftl-desc">공개 오더북 데이터를 초 단위로 수집합니다. 실제 체결 가능한 가격 기준의 유동성 데이터만을 반영하여 정확도를 높입니다.</p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">⚡</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">비용 반영 계산 시스템</h3>
                <p className="ftl-desc">수수료, 환율, 슬리피지를 반영한 계산값을 표시합니다. 종목별 최종 거래가가 아닌 100% 실시간 호가창 비교를 통해 Amount를 표기하며, 해당 수량 기준의 수익률 계산 공식이 작동됩니다.<br />
                <span className="ftl-note">(투자 수익 보장을 의미하지 않습니다.)</span></p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">🎯</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">오더북 기반 유동성 분석</h3>
                <p className="ftl-desc">체결 가능 범위 기준의 가격 데이터를 제공합니다. From 거래소의 평균 매수가와 To 거래소의 현재가를 실시간으로 비교하여 수익 가능성 판단이 가능합니다.</p>
              </div>
            </div>
            <div className="feature-timeline-item">
              <div className="ftl-icon-wrap">
                <div className="ftl-icon">🤖</div>
              </div>
              <div className="ftl-content">
                <h3 className="ftl-title">사용자 조건 필터</h3>
                <p className="ftl-desc">Per(격차 비율) 및 Amount(거래 규모) 필터링 기능을 제공합니다. 거래소 및 거래 페어 필터도 자유롭게 구성 가능합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="about" className="about-section">
        <div className="container">
          <div className="about-grid">
            <div className="signal-shell reveal">
              <div className="signal-ui">
                <div className="signal-head">
                  <div className="signal-brand">
                    <div className="signal-logo">
                      <img src="/img/icon.png" alt="BODDARING" />
                    </div>
                    <div>
                      <div className="signal-title">BODDARING DATA ENGINE</div>
                    </div>
                  </div>
                </div>

                <div className="signal-body">
                  <div className="signal-stats">
                    <div className="stat-card">
                      <div className="stat-label">Connected Exchanges</div>
                      <div className="stat-value">15+</div>
                      <div className="stat-sub">국내 · 해외 거래소 통합</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Tracked Symbols</div>
                      <div className="stat-value">10,000+</div>
                      <div className="stat-sub">실시간 호가 모니터링</div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-label">Signal Logic</div>
                      <div className="stat-value">Amount · Per</div>
                      <div className="stat-sub">차익 구간 자동 계산</div>
                    </div>
                  </div>

                  <div className="signal-flow">
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#34d399", background: "#ee4d4d" }} />15개+ 거래소 호가 수집</div>
                    <div className="arrow">→</div>
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#38bdf8", background: "#f38462" }} />A ↔ B 거래소 차익 감지</div>
                    <div className="arrow">→</div>
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#fbbf24", background: "#fbbf24" }} />Amount · Per 계산</div>
                    <div className="arrow">→</div>
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#fd7a3d", background: "#98ee47e8" }} />입·출금 여부 감지</div>
                    <div className="arrow">→</div>
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#6aee8b", background: "#56a0f5" }} />개인 필터링</div>
                    <div className="arrow">→</div>
                    <div className="flow-node"><span className="flow-dot" style={{ color: "#a78bfa", background: "#a78bfa" }} />차익 시그널 표시</div>
                  </div>

                  <div className="signal-table">
                    <div className="signal-head-row">
                      <div>Base</div>
                      <div>From</div>
                      <div>To</div>
                      <div>Amount</div>
                      <div>Per</div>
                    </div>

                    <div className="signal-row">
                      <div className="coin-cell"><div>TRAC</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-USDT</div><div className="pair-ex">MEXC</div><div className="pair-bottom">503.9938 KRW</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-KRW</div><div className="pair-ex">BITHUMB</div><div className="pair-bottom blue">534.5026 KRW</div></div>
                      <div className="amount-cell">4,435 USDT</div>
                      <div className="per-cell red">+6.04%</div>
                    </div>

                    <div className="signal-row">
                      <div className="coin-cell"><div>TRAC</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-USD</div><div className="pair-ex">COINBASE</div><div className="pair-bottom">502.8702 KRW</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-KRW</div><div className="pair-ex">BITHUMB</div><div className="pair-bottom blue">532.4029 KRW</div></div>
                      <div className="amount-cell">8,601 USD</div>
                      <div className="per-cell red">+5.87%</div>
                    </div>

                    <div className="signal-row">
                      <div className="coin-cell"><div>TRAC</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-USDT</div><div className="pair-ex">GATE.IO</div><div className="pair-bottom">507.5571 KRW</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-KRW</div><div className="pair-ex">BITHUMB</div><div className="pair-bottom blue">534.1176 KRW</div></div>
                      <div className="amount-cell">5,453 USDT</div>
                      <div className="per-cell red">+5.23%</div>
                    </div>

                    <div className="signal-row">
                      <div className="coin-cell"><div>TRAC</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-USDT</div><div className="pair-ex">KUCOIN</div><div className="pair-bottom">515.7781 KRW</div></div>
                      <div className="pair-block"><div className="pair-top">TRAC-KRW</div><div className="pair-ex">BITHUMB</div><div className="pair-bottom blue">533.1780 KRW</div></div>
                      <div className="amount-cell">2,2821 USDT</div>
                      <div className="per-cell red">+3.37%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-copy reveal reveal-delay-1">
              <div className="section-label">Why BODDARING</div>
              <h2 className="section-title">
                데이터가 곧 <span className="hero-grad">경쟁력</span>
              </h2>
              <p className="section-desc no-break">
                아비트라지는 단순히 높은 퍼센트를 찾는 게임이 아닙니다.<br />
                중요한 것은 지금 표시된 가격 차이가 실제로 체결 가능한 구조인지,<br />
                입출금·수수료·환율까지 반영했을 때 의미 있는 구간인지 판단하는 것입니다.
              </p>

              <div className="value-stack">
                <div className="value-card"><p className="value-title">압도적인 데이터 수집</p><p className="value-desc">15개 이상의 거래소에서 모든 종목의 호가를 모아,<br />같은 기준으로 빠르게 비교할 수 있는 구조를 만듭니다.</p></div>
                <div className="value-card"><p className="value-title">차익 시그널 자동 계산</p><p className="value-desc">A 거래소와 C 거래소 사이의 가격 차이만 보는 것이 아닌<br />Amount, Per, 도착 거래소 통화단위의 평균 매수 단가표기로 판단 속도를 높입니다.</p></div>
                <div className="value-card"><p className="value-title">실행 가능한 기회 선별</p><p className="value-desc">겉으로 표기되는 숫자보다 실제 체결 구조 및 수수료 그리고 환율 반영 등<br />의미 있는 기회만 빠르게 확인할 수 있으며, 사용자별 개인 설정을 통해 커스텀 할 수 있습니다.</p></div>
                <div className="value-card"><p className="value-title">실시간 시그널 중심 화면</p><p className="value-desc">복잡한 설명보다 바로 읽히는 구조가 중요합니다.<br />핵심 종목, 거래소, 금액, 퍼센트 위주로 신호를 단순하게 표시합니다.</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      <section id="bot" className="bot-section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Automation</div>
            <h2 className="section-title">
              아비트라지에 <span className="hero-grad">날개를 더하는 BOT</span>
            </h2>
            <p className="section-desc">
              데이터 확인에서 끝나지 않고, 실제 운영 흐름을 더 빠르고 안정적으로 만들기 위한 보조 프로그램을 제공합니다.<br />
              주문·출금·알림·전략 보조까지 실전에서 반복되는 과정을 더 단순하게 만듭니다.
            </p>
          </div>

          <div className="bot-layout">
            <div className="bot-tabs">
              <button type="button" className={`bot-tab${activeBot === "order" ? " active" : ""}`} onClick={() => setActiveBot("order")}>
                <div className="bot-tab-top"><span className="bot-tag"><i /> ORDER BOT</span><span className="bot-index">01</span></div>
                <h3>종합 오더 BOT</h3>
                <p>다양한 거래유형 중심의 깔끔한 주문 화면과<br />콘솔형 상태 표시를 통해 핵심 동작만 간단하게 보여줍니다.</p>
              </button>

              <button type="button" className={`bot-tab${activeBot === "withdraw" ? " active" : ""}`} onClick={() => setActiveBot("withdraw")}>
                <div className="bot-tab-top"><span className="bot-tag"><i /> WITHDRAW BOT</span><span className="bot-index">02</span></div>
                <h3>국내·해외 출금 BOT</h3>
                <p>국내 및 글로벌 거래소 간 자산 이동을 자동화합니다.<br />네트워크 선택, 수수료 반영까지 안전하고 빠른 자산 이동을 지원합니다.</p>
              </button>

              <button type="button" className={`bot-tab${activeBot === "assist" ? " active" : ""}`} onClick={() => setActiveBot("assist")}>
                <div className="bot-tab-top"><span className="bot-tag"><i /> ASSIST BOT</span><span className="bot-index">03</span></div>
                <h3>보조 & 전략 BOT</h3>
                <p>실전 운영에 필요한 보조 기능을 하나로 묶었습니다.<br />컨트랙트 검색, 잔고 알림, 입금 확인, 거래내역, 매매 일지 등<br />자주 사용하는 유틸리티를 빠르게 실행할 수 있습니다.</p>
                <div className="bot-mini-chips"><span>Contract Search</span><span>Balance Alert</span><span>Deposit Check</span><span>Trade History</span></div>
              </button>
            </div>

            <div className="bot-preview">
              {activeBot === "order" && (
                <div className="program-shell">
                  <div className="program-head">
                    <div className="program-brand">
                      <div className="program-logo">
                        <img src="/img/icon.png" alt="BODDARING" />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <div className="program-title">BODDARING ORDER BOT</div>
                      </div>
                    </div>
                    <div className="program-status">ORDER</div>
                  </div>
                  <div className="program-canvas"><div className="ui-grid">
                    <div className="ui-panel"><div className="panel-label">LimitSell Form</div><div className="control-form">
                      <div className="field-row"><label>거래소 선택</label><div className="fake-input"><span>Bithumb</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>코인명</label><div className="fake-input"><span>USDT</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>주문 가격</label><div className="fake-input"><span>1,490 KRW</span></div></div>
                      <div className="field-row"><label>주문 수량</label><div className="fake-input"><span>1000.0 USDT</span></div></div>
                      <div className="field-row"><label>딜레이</label><div className="fake-input"><span>0.1s</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>텔레그램</label><div className="fake-input"><span>Connected</span></div></div>
                    </div><div className="center-actions"><div className="fake-btn btn-sell">SELL</div><div className="fake-btn btn-stop">STOP</div></div></div>
                    <div className="ui-panel"><div className="panel-label">Console Log</div><div className="log-panel"><div className="log-box"><div className="log-line blue">⏰ 지정가 매도 요청 준비중...</div><div className="log-line">💰 현재 보유 수량 - 5.0000 USDT</div><div className="log-line warn">📌 매도 가격 1,490 KRW<br />💸 매도 수량 1000.0 USDT</div><div className="log-line good">✅ Bithumb LIMIT SELL 완료!</div><div className="log-line good">📨 텔레그램 알림 전송 완료!</div><div className="log-line blue">⏰ 지정가 매도 요청 준비중...</div></div></div></div>
                  </div></div>
                </div>
              )}

              {activeBot === "withdraw" && (
                <div className="program-shell">
                  <div className="program-head"><div className="program-brand"><div className="program-logo"><img src="/img/icon.png" alt="BODDARING" /></div><div style={{ minWidth: 0 }}><div className="program-title">BODDARING WITHDRAW BOT</div></div></div><div className="program-status">WITHDRAW</div></div>
                  <div className="program-canvas"><div className="ui-grid">
                    <div className="ui-panel"><div className="panel-label">Withdraw Form</div><div className="control-form">
                      <div className="field-row"><label>거래소 선택</label><div className="fake-input"><span>Upbit</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>네트워크 선택</label><div className="fake-input"><span>TRX</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>코인명</label><div className="fake-input"><span>USDT</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>수신 주소</label><div className="fake-input"><span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>TCcyd...qr5Se</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>2차 주소</label><div className="fake-input disabled"><span>&nbsp;</span><span className="select-arrow">▼</span></div></div>
                      <div className="field-row"><label>딜레이</label><div className="fake-input"><span>1s</span><span className="select-arrow">▼</span></div></div>
                    </div><div className="center-actions"><div className="fake-btn btn-send">SEND</div><div className="fake-btn btn-stop">STOP</div></div></div>
                    <div className="ui-panel"><div className="panel-label">Console Log</div><div className="log-panel"><div className="log-box"><div className="log-line">💠 수신 주소 선택 : TCcyd...qr5Se</div><div className="log-line">⛔ 2차 주소가 비활성화되었습니다.</div><div className="log-line blue">📤 업비트 출금 요청<br />3500.0000 USDT → TCcyd...qr5Se</div><div className="log-line">수수료: 0.01 USDT | 시도 횟수= 1/6</div><div className="log-line good">✅ 출금 요청 완료!</div><div className="log-line good">📨 텔레그램 알림 전송 완료!</div><div className="log-line warn">⛔ 출금이 중단되었습니다.</div></div></div></div>
                  </div></div>
                </div>
              )}

              {activeBot === "assist" && (
                <div className="program-shell">
                  <div className="program-head"><div className="program-brand"><div className="program-logo"><img src="/img/icon.png" alt="BODDARING" /></div><div style={{ minWidth: 0 }}><div className="program-title">BODDARING ASSIST BOT</div></div></div><div className="program-status">SUPPORT</div></div>
                  <div className="program-canvas"><div className="assist-preview-wrap">
                    <div className="assist-intro"><div className="assist-kicker">Assist Preview</div><div className="assist-desc">실전에서 자주 쓰는 보조 기능들을 미리 보여주는 프리뷰입니다.</div></div>
                    <div className="assist-slider-stage"><div className="assist-slider-track">
                      {[
                        ["🔎", "SEARCH", "컨트랙트 검색", "필요한 토큰 정보를 빠르게 확인하고, 핵심 주소를 바로 찾아볼 수 있는 검색형 프리셋입니다.", "Keyword", "USDT / ETH / XRP", "Search", "Explorer", "assist-pill-yellow", "assist-pill-blue"],
                        ["🔔", "ALERT", "잔고 알림", "지갑 또는 자산 상태를 확인하고, 변동이 발생했을 때 빠르게 대응할 수 있도록 돕는 모니터링 프리셋입니다.", "Monitor", "Wallet Watch · Notify", "Start", "Refresh", "assist-pill-green", "assist-pill-blue"],
                        ["💸", "CHECK", "입금 확인", "입금 진행 상태를 빠르게 점검하고, 필요한 흐름을 한 번 더 체크할 수 있는 확인용 프리셋입니다.", "Status", "Detect · Scan · Confirm", "Scan", "Clear", "assist-pill-green", "assist-pill-yellow"],
                        ["📘", "TRADE", "트레이딩 봇", "거래 내역을 조회하고 매매 일지 작성 등 자산의 흐름을 정리하고 관리할 수 있는 프리셋입니다.", "History", "Trades · Journal · Summary", "Search", "Journal", "assist-pill-orange", "assist-pill-blue"],
                        ["🔎", "SEARCH", "컨트랙트 검색", "필요한 토큰 정보를 빠르게 확인하고, 핵심 주소를 바로 찾아볼 수 있는 검색형 프리셋입니다.", "Keyword", "USDT / ETH / XRP", "Search", "Explorer", "assist-pill-yellow", "assist-pill-blue"],
                        ["🔔", "ALERT", "잔고 알림", "지갑 또는 자산 상태를 확인하고, 변동이 발생했을 때 빠르게 대응할 수 있도록 돕는 모니터링 프리셋입니다.", "Monitor", "Wallet Watch · Notify", "Start", "Refresh", "assist-pill-green", "assist-pill-blue"],
                        ["💸", "CHECK", "입금 확인", "입금 진행 상태를 빠르게 점검하고, 필요한 흐름을 한 번 더 체크할 수 있는 확인용 프리셋입니다.", "Status", "Detect · Scan · Confirm", "Scan", "Clear", "assist-pill-green", "assist-pill-yellow"],
                        ["📘", "TRADE", "트레이딩 봇", "거래 내역을 조회하고 매매 일지 작성 등 자산의 흐름을 정리하고 관리할 수 있는 프리셋입니다.", "History", "Trades · Journal · Summary", "Search", "Journal", "assist-pill-orange", "assist-pill-blue"],
                      ].map((card, idx) => (
                        <div className="assist-slide-card" key={idx}><div className="assist-card-top"><div className="assist-card-icon">{card[0]}</div><div className="assist-card-chip">{card[1]}</div></div><div className="assist-card-title">{card[2]}</div><div className="assist-card-text">{card[3]}</div><div className="assist-card-miniui"><div className="assist-mini-box"><div className="assist-mini-label">{card[4]}</div><div className="assist-mini-value">{card[5]}</div></div><div className="assist-mini-row"><div className={`assist-mini-pill ${card[8]}`}>{card[6]}</div><div className={`assist-mini-pill ${card[9]}`}>{card[7]}</div></div></div></div>
                      ))}
                    </div></div>
                    <div className="assist-slider-dots"><span /><span /><span /></div>
                  </div></div>
                </div>
              )}
            </div>
          </div>

          <div className="mini-cta"><div className="ghost-note">※ 실제 프로그램 화면이 아닌, 기능 이해를 위한 가상 UI 프리뷰입니다.</div></div>
        </div>
      </section>

      <div className="divider" />

      <section id="exchanges" className="exchange-section">
        <div className="container">
          <div className="section-head center reveal">
            <div className="section-label">Supported Exchanges</div>
            <h2 className="section-title">연동 거래소</h2>
            <p className="section-desc">
              BODDARING은 데이터 신뢰성을 기준으로 거래소를 선별합니다.<br />
              국내·글로벌 주요 거래소의 공개 API 데이터를 기반으로 KRW / USDT 시장 간 가격 격차 정보를 제공합니다.
            </p>
          </div>
        </div>
        <div className="exchange-track-wrap">
          <div className="exchange-track">
            {doubledExchanges.map((ex, i) => (
              <div className="exchange-chip" key={i}>
                <img
                  src={`/exchanges/${ex.logo}`}
                  alt={ex.name}
                  className="ex-logo"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextElementSibling.style.display = "flex";
                  }}
                />
                <span
                  className="ex-icon-fallback"
                  style={{ background: ex.color + "22", color: ex.color, border: `1px solid ${ex.color}44`, display: "none" }}
                >
                  {ex.name.charAt(0)}
                </span>
                {ex.name}
              </div>
            ))}
          </div>
        </div>

        <div className="container">
          <div className="exchange-footer-notes">
            <p className="exchange-note-intl">
              * Traders in Thailand, India, and other countries who require a professional arbitrage data system tailored to their local market are welcome to contact us.
            </p>
            <p className="exchange-disclaimer">
              * This platform has no official affiliation with any listed exchange. All data is independently collected via public APIs and provided solely for informational purposes. All trademarks belong to their respective owners.<br />
              * This service does not solicit or broker the sale of financial investment products. As an information provision platform, it assumes no legal responsibility for investment results.
            </p>
          </div>
        </div>
      </section>

      <div className="divider" />


      <section id="contact" className="quote-section">
        <div className="container">
          <div className="quote-contact-grid">

            <div className="quote-box reveal">
              <div className="quote-title">
                방향성보다 구조를 보십시오.
              </div>
              <div className="quote-item">
                비트코인 가격을 왜 '예측'하려고 하시나요?<br />
                대부분의 뉴스와 시황은 이미 가격에 반영된 뒤 도착합니다.
              </div>
              <div className="quote-item">
                뒤늦은 해석과 감정적인 추격 대신,<br />
                <strong>거래소 간 가격 격차라는 '구조'</strong>를 확인할 수 있습니다.
              </div>
              <div className="quote-item">
                아비트라지는 예측의 영역이 아니라,<br />
                <strong>가격 구조 데이터를 해석하는 과정</strong>입니다.
              </div>
              <div className="quote-item">
                하루 종일 차트를 붙잡고<br />
                평단가에 흔들리는 스트레스와<br />
                기약 없는 기다림의 포지션 종료 대신,<br />
                짧은 구간에서 형성되는 가격 구조를 데이터로 확인하는 방식도 존재합니다.
              </div>
              <div className="quote-item">
                BODDARING은 다년간의 데이터 분석 경험을 바탕으로 설계된<br />
                가격 격차 데이터 플랫폼입니다.
              </div>
              <div className="quote-author">
                BODDARING · 아비트라지 데이터 플랫폼
              </div>
            </div>

            <div className="contact-box reveal reveal-delay-1">
              <div style={{ display: "flex", gap: "12px", marginBottom: "24px", borderBottom: "1px solid rgba(255,255,255,0.1)", paddingBottom: "12px" }}>
                <button
                  onClick={() => setContactTab("inquiry")}
                  style={{
                    padding: "8px 16px",
                    background: contactTab === "inquiry" ? "rgba(120,100,255,0.2)" : "transparent",
                    border: contactTab === "inquiry" ? "1px solid rgba(120,100,255,0.5)" : "1px solid transparent",
                    borderRadius: "8px",
                    color: contactTab === "inquiry" ? "#c4b5fd" : "#8080b0",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "all 0.2s"
                  }}
                >
                  문의 접수
                </button>
                <button
                  onClick={() => setContactTab("development")}
                  style={{
                    padding: "8px 16px",
                    background: contactTab === "development" ? "rgba(120,100,255,0.2)" : "transparent",
                    border: contactTab === "development" ? "1px solid rgba(120,100,255,0.5)" : "1px solid transparent",
                    borderRadius: "8px",
                    color: contactTab === "development" ? "#c4b5fd" : "#8080b0",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "14px",
                    transition: "all 0.2s"
                  }}
                >
                  개발 문의
                </button>
              </div>

              {contactTab === "inquiry" && (
                <>
                  <h3>일반 문의 <span className="ftl-note2"> (*는 필수 항목입니다.)</span></h3>
                  <p>
                    궁금한 점이 있으시면 아래 양식을 통해 문의해 주세요.<br />
                    최대한 빠르게 답변 드리겠습니다.<br />
                  </p>
                  <p>

                  </p>

                  {formStatus === "sent" ? (
                    <div className="form-success show">
                      ✅ 문의가 성공적으로 등록되었습니다!<br />
                      <span style={{ fontSize: "13px", color: "var(--muted2)", fontWeight: 600 }}>
                        빠른 시일 내에 연락 드리겠습니다.
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">
                          이메일 <span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-input${formErrors.email ? " error" : ""}`}
                          placeholder="이메일을 입력해 주세요."
                          value={formData.email}
                          onChange={handleInput("email")}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          텔레그램 ID <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-input${formErrors.telegram ? " error" : ""}`}
                          placeholder="예) @username"
                          value={formData.telegram}
                          onChange={handleInput("telegram")}
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">궁금한 게 있으신가요?</label>
                        <textarea
                          className="form-textarea"
                          placeholder="문의 사항을 작성해 주세요."
                          value={formData.message}
                          onChange={handleInput("message")}
                        />
                      </div>
                      <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitDisabled}
                      >
                        {formStatus === "sending" ? "전송 중..." : "문의 등록하기"}
                      </button>
                      {formStatus === "error" && (
                        <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                          ❌ 전송에 실패했습니다. 이메일로 직접 문의해 주세요.
                        </p>
                      )}
                    </form>
                  )}

                  <p className="contact-alt">
                    또는{" "}
                    <a href="mailto:boddaring@endholdings.com">
                      boddaring@endholdings.com
                    </a>
                    {" "}으로 문의해 주세요.
                  </p>
                </>
              )}

              {contactTab === "development" && (
                <>
                  <h3>개발 문의 <span className="ftl-note"> (*는 필수 항목입니다.)</span></h3>
                  <p>
                    전문적인 투자 프로그램 개발이 필요하신가요?<br />
                    맞춤형 솔루션을 제공해 드립니다.{" "}<br />
                  </p>
                  <p>

                  </p>

                  {devFormStatus === "sent" ? (
                    <div className="form-success show">
                      ✅ 개발 문의가 성공적으로 등록되었습니다!<br />
                      <span style={{ fontSize: "13px", color: "var(--muted2)", fontWeight: 600 }}>
                        담당자가 빠르게 연락드리겠습니다.
                      </span>
                    </div>
                  ) : (
                    <form onSubmit={handleDevSubmit} noValidate>
                      <div className="form-group">
                        <label className="form-label">
                          이메일 <span className="req">*</span>
                        </label>
                        <input
                          type="email"
                          className={`form-input${devFormErrors.email ? " error" : ""}`}
                          placeholder="이메일을 입력해 주세요."
                          value={devFormData.email}
                          onChange={handleDevInput("email")}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          텔레그램 ID <span className="req">*</span>
                        </label>
                        <input
                          type="text"
                          className={`form-input${devFormErrors.telegram ? " error" : ""}`}
                          placeholder="예) @username"
                          value={devFormData.telegram}
                          onChange={handleDevInput("telegram")}
                        />
                      </div>

                      <div className="form-group">
                        <label className="form-label">어떤 프로그램 개발을 원하시나요?</label>
                        <textarea
                          className="form-textarea"
                          placeholder="원하시는 기능·요건을 자유롭게 작성해 주세요. (예: 거래소, 전략, 알림 방식, UI 등)"
                          value={devFormData.program}
                          onChange={handleDevInput("program")}
                        />
                        {/* 아래에 별도 표기 */}
                        <p className="form-note">
                          ※ 개발 컨설팅 비용은 500만원이며, 프로그램 제작은 최소 1,000만원부터 시작합니다.<br />
                          　　컨설팅 이후 프로그램 제작 확정 시 해당 비용은 총액에서 차감됩니다.
                        </p>
                      </div>

                      <button
                        type="submit"
                        className="btn-submit"
                        disabled={isDevSubmitDisabled}
                      >
                        {devFormStatus === "sending" ? "전송 중..." : "개발 문의 등록하기"}
                      </button>

                      {devFormStatus === "error" && (
                        <p style={{ color: "#ff6b6b", fontSize: "13px", marginTop: "10px", textAlign: "center" }}>
                          ❌ 전송에 실패했습니다. 이메일로 직접 문의해 주세요.
                        </p>
                      )}
                    </form>
                  )}

                  <p className="contact-alt">
                    또는{" "}
                    <a href="mailto:development@endholdings.com">
                      development@endholdings.com
                    </a>
                    {" "}으로 문의해 주세요.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </section>
      
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="footer-brand-stack">
                <div className="footer-brand-name">BODDARING</div>

                <img
                  src="/img/endlogo.png"
                  alt="END HOLDINGS Inc."
                  className="footer-logo"
                />
              </div>
            </div>

            <div className="footer-col">
              <h4>서비스</h4>
              <ul>
                <li><a href="#signal">차익 시그널 시스템</a></li>
                <li><a href="#bot">BOT</a></li>
                <li><a href="#exchanges">연동 거래소</a></li>
                <li><Link href="/apply">구독 신청</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>회사</h4>
              <ul>
                <li><Link href="/terms">이용약관</Link></li>
                <li><Link href="/terms/privacy">개인정보처리방침</Link></li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>CONTACT</h4>
              <ul>
                <li>
                  <a
                    href="#contact"
                    onClick={() => setContactTab("inquiry")}
                  >
                    문의 접수
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={() => setContactTab("development")}
                  >
                    개발 문의
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>소셜</h4>
              <ul>
                <li>
                  <a href="https://x.com/" target="_blank" rel="noreferrer">
                    X (준비중)
                  </a>
                </li>
                <li>
                  <a href="https://blog.naver.com/forgotten-season" target="_blank" rel="noreferrer">
                    NAVER BLOG
                  </a>
                </li>
                <li>
                  <a href="https://t.me/BODDARING_ranin" target="_blank" rel="noreferrer">
                    Telegram (준비중)
                  </a>
                </li>
                <li>
                  <a href="https://open.kakao.com/o/" target="_blank" rel="noreferrer">
                    KakaoTalk OpenChat (준비중)
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="footer-divider-full" aria-hidden="true" />

          <div className="footer-bottom">
            <div className="footer-copy">© {new Date().getFullYear()} END HOLDINGS Inc. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </>
  );
}
