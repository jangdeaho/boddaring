"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function PrivacyPage() {
  const COMPANY = "END HOLDINGS Inc.";
  const SERVICE = "BODDARING";
  const SUPPORT_EMAIL = "ceo@endholdings.com"; // 변경
  const DPO_NAME = "Yonghyeon Lee"; // 변경 (또는 개인정보책임자 이름)
  const DPO_TITLE = "CEO"; // 변경 가능
  const LAST_REVISED = "2026-03-01"; // 변경 가능
  const [lang, setLang] = useState("ko");

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

  const T = useMemo(() => {
    const dict = {
      ko: {
        title: "개인정보처리방침 (Privacy Policy)",
        subtitle: `${SERVICE} 개인정보처리방침 — 최종 개정일: ${LAST_REVISED}`,
        s1: {
          h: "1. 개요",
          b: (
            <>
              {COMPANY}(이하 “회사”)는 {SERVICE}(이하 “서비스”) 이용자의 개인정보를 중요하게 생각하며,
              관련 법령을 준수합니다. 본 방침은 회사가 어떤 정보를 어떤 목적과 방식으로 수집·이용·보관·파기하는지,
              그리고 이용자가 행사할 수 있는 권리와 방법을 설명합니다.
            </>
          ),
        },
        s2: {
          h: "2. 수집하는 개인정보 항목",
          b: (
            <>
              <strong>신청/문의 시 이용자가 직접 제공하는 정보</strong>
              <ul>
                <li>필수: 이름, 전화번호, 이메일, 텔레그램 ID</li>
                <li>선택: 문의사항(메시지 내용)</li>
              </ul>
              <strong>서비스 이용 과정에서 자동 수집되는 정보(보안/운영 목적)</strong>
              <ul>
                <li>IP 주소, 접속 일시, 페이지 요청 기록, 브라우저/기기 정보(예: OS, User-Agent)</li>
                <li>오류 로그 및 보안 이벤트(비정상 접근 탐지 등)</li>
              </ul>
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.85)" }}>
                ※ 현재 {SERVICE}는 회원가입 없이 신청 기반으로 운영될 수 있으나,
                향후 로그인/결제/구독 관리 기능 도입 시 수집 항목이 추가될 수 있습니다.
                변경 시 본 방침을 통해 안내합니다. (현재 Google Analytics/광고 픽셀 등 광고·행태정보 기반 추적 도구는 사용하지 않습니다.)
              </div>
            </>
          ),
        },
        s3: {
          h: "3. 개인정보 이용 목적",
          b: (
            <>
              회사는 아래 목적 범위에서만 개인정보를 이용합니다. 처리의 법적 근거는 (i) 이용자의 동의, (ii) 신청 처리 등 계약(신청) 이행, (iii) 보안/부정이용 방지를 위한 회사의 정당한 이익에 기반합니다.
              <ul>
                <li>무료체험 승인/안내, 구독 신청 처리 및 연락</li>
                <li>문의 응대, 공지 전달, 서비스 운영 커뮤니케이션</li>
                <li>부정 이용 방지 및 보안(접속 통제, 이상 징후 탐지, 사고 대응)</li>
                <li>서비스 품질 개선을 위한 통계/분석(가능한 경우 비식별/집계 형태)</li>
              </ul>
            </>
          ),
        },
        s4: {
          h: "4. 보관 기간 및 파기",
          b: (
            <>
              회사는 목적 달성에 필요한 기간 동안만 개인정보를 보관하며, 목적이 달성되거나 보관 기간이 종료되면
              지체 없이 파기합니다. 다만 관련 법령에 따라 보관이 필요한 경우 해당 기간 동안 보관할 수 있습니다.
              <ul>
                <li>신청/문의 기록: 처리 완료 후 최대 <strong>12개월</strong> 보관(분쟁 대응/운영 기록 목적)</li>
                <li>보안 로그(IP 등): 보안/장애 대응을 위해 최대 <strong>90일</strong> 보관</li>
              </ul>
              파기 방법은 전자적 파일은 복구 불가능한 방식으로 삭제하며, 출력물은 분쇄 또는 소각합니다.
            </>
          ),
        },
        s5: {
          h: "5. 제3자 제공 및 처리위탁",
          b: (
            <>
              회사는 원칙적으로 이용자의 개인정보를 제3자에게 제공하지 않습니다.
              다만 아래의 경우에는 예외로 합니다.
              <ul>
                <li>이용자의 사전 동의를 받은 경우</li>
                <li>법령에 근거하거나 수사/감사 등 적법한 절차에 따른 요청이 있는 경우</li>
              </ul>
              또한 서비스 운영을 위해 일부 업무를 외부에 위탁할 수 있으며, 이 경우 위탁사/위탁 범위/보호 조치를 본 방침 또는 별도 고지로 안내합니다.
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.9)" }}>
                <strong>현재 이용 중인 처리위탁(예시)</strong>
                <ul>
                  <li><strong>EmailJS</strong>: 신청 내용 이메일 발송(전송 목적)</li>
                  <li><strong>Vercel</strong>: 웹사이트 호스팅/전송/운영 인프라</li>
                </ul>
                ※ 위탁사는 변경될 수 있으며, 변경 시 본 방침을 통해 안내합니다.
              </div>
            </>
          ),
        },
        s6: {
          h: "6. 쿠키 및 유사 기술",
          b: (
            <>
              서비스는 사용자 경험 개선과 보안을 위해 쿠키 또는 유사 기술을 사용할 수 있습니다.
              이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.
              다만 쿠키 차단 시 일부 기능이 제한될 수 있습니다(향후 로그인 기능 도입 시 포함).
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.85)" }}>
                <strong>국외 이전 가능성</strong>: 서비스 인프라 특성상 개인정보가 국외에서 처리·보관·전송될 수 있습니다.
                이용자는 이에 대한 동의를 거부할 수 있으나, 거부 시 신청 처리 또는 서비스 제공이 제한될 수 있습니다.
              </div>
            </>
          ),
        },
        s7: {
          h: "7. 이용자의 권리",
          b: (
            <>
              이용자는 관련 법령에 따라 다음 권리를 행사할 수 있습니다.
              <ul>
                <li>개인정보 열람, 정정, 삭제, 처리정지 요청</li>
                <li>동의 철회(가능한 범위 내)</li>
              </ul>
              요청은 아래 문의처로 접수할 수 있으며, 회사는 법령이 허용하는 범위에서 신속히 처리합니다.
            </>
          ),
        },
        s8: {
          h: "8. 안전성 확보 조치",
          b: (
            <>
              회사는 개인정보의 안전한 처리를 위해 합리적인 기술적·관리적 보호조치를 적용합니다.
              (예: 접근권한 관리, 로그 모니터링, 보안 점검, 전송 구간 보호 등)
              <br />
              다만 인터넷 환경의 특성상 완전한 보안을 보장할 수는 없습니다.
            </>
          ),
        },
        s9: {
          h: "9. 개인정보 보호책임자 및 문의",
          b: (
            <>
              개인정보 관련 문의 및 권리 행사는 아래로 연락해 주세요.
              <ul>
                <li>회사명: <strong>{COMPANY}</strong></li>
                <li>개인정보 보호책임자: <strong>{DPO_NAME}</strong> ({DPO_TITLE})</li>
                <li>이메일: <a href={`mailto:${SUPPORT_EMAIL}`} style={{ textDecoration: "underline" }}>{SUPPORT_EMAIL}</a></li>
              </ul>
            </>
          ),
        },
        s10: {
          h: "10. 방침 변경",
          b: (
            <>
              회사는 법령/정책/서비스 변경에 따라 본 방침을 수정할 수 있으며,
              변경 시 본 페이지를 통해 공지합니다.
            </>
          ),
        },
        btnTerms: "이용약관으로",
        btnHome: "메인으로",
      },
      en: {
        title: "Privacy Policy",
        subtitle: `${SERVICE} Privacy Policy — Last revised: ${LAST_REVISED}`,
        s1: {
          h: "1. Overview",
          b: (
            <>
              {COMPANY} (the “Company”) values your privacy. This Policy explains what information we collect,
              why we collect it, how we use it, and the choices you have when using {SERVICE} (the “Service”).
            </>
          ),
        },
        s2: {
          h: "2. Data We Collect",
          b: (
            <>
              <strong>Information you provide</strong>
              <ul>
                <li>Required: name, phone number, email, Telegram ID</li>
                <li>Optional: message/inquiry content</li>
              </ul>
              <strong>Information collected automatically (security & operations)</strong>
              <ul>
                <li>IP address, access timestamps, request logs, device/browser info (e.g., OS, User-Agent)</li>
                <li>Error logs and security events (e.g., abnormal access detection)</li>
              </ul>
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.85)" }}>
                Note: The Service may currently operate without user accounts, but accounts/login/payments may be introduced later.
                If so, this Policy will be updated accordingly. (As of now, we do not use Google Analytics or advertising pixels for behavioral advertising.)
              </div>
            </>
          ),
        },
        s3: {
          h: "3. How We Use Data",
          b: (
            <>
              We use your data only for the purposes below:
              <ul>
                <li>Processing free-trial / subscription requests and contacting you</li>
                <li>Responding to inquiries and sending operational notices</li>
                <li>Security and fraud prevention (access control, anomaly detection, incident response)</li>
                <li>Service improvement through aggregated/statistical analysis where feasible</li>
              </ul>
            </>
          ),
        },
        s4: {
          h: "4. Retention & Deletion",
          b: (
            <>
              We retain personal data only as long as necessary for the purposes described above, unless a longer period is required by law.
              When no longer needed, we delete data using methods that make recovery impracticable.
              <ul>
                <li>Requests/inquiries: retained for up to <strong>12 months</strong> for support and dispute handling</li>
                <li>Security logs (IP, etc.): retained for up to <strong>90 days</strong> as needed for security/incident response</li>
              </ul>
            </>
          ),
        },
        s5: {
          h: "5. Sharing & Processors",
          b: (
            <>
              We do not sell your personal data. We do not share it with third parties except:
              <ul>
                <li>with your consent;</li>
                <li>when required by law or lawful governmental requests.</li>
              </ul>
              We may use service providers (processors) to operate the Service (e.g., email delivery, hosting/infrastructure). If so, we apply
              reasonable safeguards and disclose material changes via this Policy or separate notice.
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.9)" }}>
                <strong>Current processors (examples)</strong>
                <ul>
                  <li><strong>EmailJS</strong>: email delivery for application requests</li>
                  <li><strong>Vercel</strong>: hosting/infrastructure for the website</li>
                </ul>
              </div>
            </>
          ),
        },
        s6: {
          h: "6. Cookies",
          b: (
            <>
              We may use cookies or similar technologies for user experience and security. You can control cookies via browser settings.
              Blocking cookies may limit certain features (especially if login is introduced in the future).
              <div style={{ marginTop: 10, color: "rgba(170,176,210,0.85)" }}>
                <strong>Cross-border processing</strong>: Due to infrastructure providers, personal data may be processed or stored outside your country.
                If you do not consent, certain services (e.g., processing your request) may be limited.
              </div>
            </>
          ),
        },
        s7: {
          h: "7. Your Rights",
          b: (
            <>
              Subject to applicable law, you may request access, correction, deletion, or restriction of processing of your personal data.
              Please contact us using the details below.
            </>
          ),
        },
        s8: {
          h: "8. Security",
          b: (
            <>
              We implement reasonable technical and organizational measures to protect personal data (access controls, monitoring, security reviews, etc.).
              However, no system can be guaranteed 100% secure.
            </>
          ),
        },
        s9: {
          h: "9. Contact (Data Protection)",
          b: (
            <>
              For privacy requests and inquiries:
              <ul>
                <li>Company: <strong>{COMPANY}</strong></li>
                <li>Contact person: <strong>{DPO_NAME}</strong> ({DPO_TITLE})</li>
                <li>Email: <a href={`mailto:${SUPPORT_EMAIL}`} style={{ textDecoration: "underline" }}>{SUPPORT_EMAIL}</a></li>
              </ul>
            </>
          ),
        },
        s10: {
          h: "10. Changes",
          b: (
            <>
              We may update this Policy from time to time. Updates will be posted on this page.
            </>
          ),
        },
        btnTerms: "Back to Terms",
        btnHome: "Back to Home",
      },
    };
    return dict[lang];
  }, [lang]);

  return (
    <>
      {/* 배경 */}
      <div className="nebula-wrap" aria-hidden="true">
        <div className="nebula nebula-1" />
        <div className="nebula nebula-2" />
        <div className="nebula nebula-3" />
      </div>

      {/* 상단바 */}
      <nav className="navbar scrolled">
        <div className="container">
          <div className="navbar-inner">
            <Link href="/" className="brand">
              <img src="/icon.png" alt={SERVICE} className="brand-icon" />
              <div className="brand-text">
                <span className="brand-name">{SERVICE}</span>
                <span className="brand-sub">아비트라지 데이터 플랫폼</span>
              </div>
            </Link>

            <div className="nav-links">
              <Link href="/#signal" className="nav-link">대표 서비스</Link>
              <Link href="/learn" className="nav-link nav-learn-link" style={{ color: "#a78bfa" }}>
                더 알아보기 <span className="nav-learn-badge">!</span>
              </Link>
            </div>

            <div className="nav-cta" style={{ gap: 10 }}>
              <button type="button" className={`langBtn ${lang === "ko" ? "active" : ""}`} onClick={() => setLanguage("ko")}>KOR</button>
              <button type="button" className={`langBtn ${lang === "en" ? "active" : ""}`} onClick={() => setLanguage("en")}>ENG</button>

              <Link href="/trial" className="btn-cta-u btn-cta-u--pink">
                무료체험 요청 <span className="arrow">→</span>
              </Link>
              <Link href="/apply" className="btn-cta-u btn-cta-u--blue">
                구독 신청 <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main style={{ position: "relative", zIndex: 1 }}>
        <div className="container" style={{ paddingTop: 110, paddingBottom: 80, maxWidth: 980 }}>
          <div style={{ marginBottom: 28 }}>
            <div className="learn-section-label">Legal</div>
            <h1 style={{ fontSize: 36, fontWeight: 900, color: "#f0eeff", marginBottom: 10, lineHeight: 1.15 }}>
              {T.title}
            </h1>
            <p style={{ fontSize: 14.5, color: "#8080b0", lineHeight: 1.7, marginBottom: 18 }}>
              {T.subtitle}
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/terms" className="btn-cta-u btn-cta-u--blue" style={{ height: 42, fontSize: 14 }}>
                {T.btnTerms} <span className="arrow">→</span>
              </Link>
              <Link href="/" className="btn-cta-u btn-cta-u--pink" style={{ height: 42, fontSize: 14 }}>
                {T.btnHome} <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "26px 22px",
              boxShadow: "0 24px 64px rgba(0,0,0,.45)",
            }}
          >
            <Section title={T.s1.h}>{T.s1.b}</Section>
            <Section title={T.s2.h}>{T.s2.b}</Section>
            <Section title={T.s3.h}>{T.s3.b}</Section>
            <Section title={T.s4.h}>{T.s4.b}</Section>
            <Section title={T.s5.h}>{T.s5.b}</Section>
            <Section title={T.s6.h}>{T.s6.b}</Section>
            <Section title={T.s7.h}>{T.s7.b}</Section>
            <Section title={T.s8.h}>{T.s8.b}</Section>
            <Section title={T.s9.h}>{T.s9.b}</Section>
            <Section title={T.s10.h}>{T.s10.b}</Section>
          </div>

          <div style={{ marginTop: 18, color: "rgba(170,176,210,0.75)", fontSize: 12.5, lineHeight: 1.6 }}>
            ※ This page may be updated as the Service evolves. The latest version posted here governs.
          </div>
        </div>
      </main>

      <style jsx global>{`
        .langBtn{
          padding: 9px 12px;
          border-radius: 999px;
          border: 1px solid rgba(120,100,255,0.18);
          background: rgba(255,255,255,0.03);
          color: #a7b0c8;
          font-weight: 900;
          font-size: 12px;
          cursor: pointer;
          transition: all 180ms ease;
          letter-spacing: 0.5px;
          height: 42px;
        }
        .langBtn.active{
          color: #e0d7ff;
          border-color: rgba(167,139,250,0.35);
          background: linear-gradient(135deg, rgba(124,58,237,0.22), rgba(167,139,250,0.10));
          box-shadow: 0 0 18px rgba(124,58,237,0.18);
        }
        .sec-h2{
          font-size: 15px;
          font-weight: 900;
          color: #e0d7ff;
          margin: 18px 0 10px;
        }
        .sec-p{
          font-size: 14px;
          color: rgba(176,176,208,0.92);
          line-height: 1.85;
        }
        .sec-p ul{
          margin-top: 10px;
          padding-left: 18px;
        }
        .sec-p li{
          margin: 6px 0;
        }
      `}</style>
    </>
  );
}

function Section({ title, children }) {
  return (
    <section style={{ padding: "6px 2px" }}>
      <div className="sec-h2">{title}</div>
      <div className="sec-p">{children}</div>
      <div style={{ height: 1, margin: "18px 0 6px", background: "rgba(255,255,255,0.06)" }} />
    </section>
  );
}