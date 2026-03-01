"use client";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

export default function TermsPage() {
  // ✅ 바꿔 넣기 (너가 이미 바꿔놨다 했으니 여기만 확인하면 됨)
  const COMPANY = "END HOLDINGS Inc.";
  const SERVICE = "BODDARING";
  const SUPPORT_EMAIL = "support@endholdings.com"; // 너가 바꾼 이메일로
  const CEO_NAME = "CEO NAME"; // 너가 바꾼 CEO 이름으로
  const LAST_REVISED = "2026-03-01"; // 필요 시 수정

  const [lang, setLang] = useState("ko");

  // persist language
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
        title: "이용약관 (Terms of Service)",
        subtitle: `${SERVICE} 이용약관 — 최종 개정일: ${LAST_REVISED}`,
        introTitle: "1. 약관의 적용",
        introBody: (
          <>
            본 이용약관(이하 “약관”)은 <strong>{COMPANY}</strong>(이하 “회사”)가 운영하는 <strong>{SERVICE}</strong> 웹사이트 및 관련
            서비스(이하 “서비스”)의 이용과 관련하여 회사와 이용자 간의 권리·의무 및 책임사항을 규정합니다.
            <br />
            이용자는 본 서비스에 접속하거나, 무료체험 신청/구독 신청/문의 접수 등 서비스를 이용하는 경우 본 약관에 동의한 것으로
            간주됩니다.
            <br />
            본 약관은 <Link href="/privacy" style={{ textDecoration: "underline" }}>개인정보처리방침(Privacy Policy)</Link>과 함께 적용됩니다.
          </>
        ),
        eligibilityTitle: "2. 이용 자격 및 제한",
        eligibilityBody: (
          <>
            이용자는 대한민국 법령 및 거주 국가의 법령에 따라 본 서비스 이용에 법적 제한이 없어야 합니다.
            <br />
            회사는 다음의 경우 서비스 이용을 제한하거나 거절할 수 있습니다.
            <ul>
              <li>법령 또는 본 약관을 위반하거나 위반할 우려가 있는 경우</li>
              <li>서비스 운영·보안·안정성에 중대한 영향을 주는 비정상적 접근이 확인되는 경우</li>
              <li>기타 회사가 합리적으로 서비스 제공이 어렵다고 판단하는 경우</li>
            </ul>
          </>
        ),
        accountTitle: "3. 계정 및 인증(향후 기능 포함)",
        accountBody: (
          <>
            현재 {SERVICE}는 회원가입 없이 무료체험/구독 신청을 기반으로 운영될 수 있습니다.
            다만, 서비스 고도화(간편결제, 로그인, 구독 관리, 개인화 기능 등)에 따라 회사는 향후 계정 생성, 인증, 접근 권한 관리
            기능을 제공할 수 있습니다.
            <br />
            계정 기능이 도입되는 경우, 이용자는 본인의 계정 정보 및 접근 수단을 안전하게 관리해야 하며, 계정 도용 또는 무단 사용으로
            인해 발생하는 손해에 대해 회사는 법령이 허용하는 범위 내에서 책임을 제한할 수 있습니다.
          </>
        ),
        dataTitle: "4. 서비스의 성격 및 제공 범위",
        dataBody: (
          <>
            {SERVICE}는 거래소의 공개 API, 공개 데이터 또는 제3자 제공 데이터를 기반으로 시장 정보를 수집·가공하여 표시하는
            <strong> 데이터/계산 플랫폼</strong>입니다.
            <br />
            서비스는 SaaS 형태로 제공되며, 기능/표시 방식/지원 범위는 운영상 필요에 따라 변경될 수 있습니다.
            <br />
            회사는 24/7 제공을 목표로 합리적인 노력을 다하나, 유지보수·점검·네트워크 장애·제3자 제공 데이터 이슈 등으로 인해
            서비스가 일시 중단되거나 지연될 수 있습니다.
          </>
        ),
        licenseTitle: "5. 이용 허락(라이선스) 및 금지행위",
        licenseBody: (
          <>
            회사는 이용자에게 본 약관에 따른 범위 내에서 서비스에 접근하여 개인적 목적으로 이용할 수 있는
            비독점적·양도불가·재허용불가의 제한적 이용권을 부여합니다.
            <br />
            이용자는 다음 행위를 할 수 없습니다.
            <ul>
              <li>서비스 및 콘텐츠(화면, 데이터, UI, 문구 등)의 복제·재배포·상업적 이용</li>
              <li>스크래핑, 크롤링, 자동화 수집, 리버스 엔지니어링, 보안 우회</li>
              <li>서비스 과부하 유발(과도한 요청) 또는 운영 방해 행위</li>
              <li>악성코드 유포, 무단 접근 시도, 타인의 이용을 방해하는 행위</li>
              <li>회사 또는 제3자의 지식재산권·명예·권리를 침해하는 행위</li>
            </ul>
          </>
        ),
        privacyTitle: "6. 개인정보 및 보안 로그(IP 등) 처리",
        privacyBody: (
          <>
            무료체험 신청 또는 구독 신청 과정에서 이용자는 회사가 필요한 범위 내에서
            <strong> 이름, 전화번호, 이메일, 텔레그램 ID</strong> 등의 정보를 수집·이용할 수 있음에 동의합니다.
            <br />
            또한 보안 및 부정 이용 방지 목적(접근 통제, 위·변조 탐지, 사고 대응)을 위해 서비스 이용 과정에서
            <strong> IP 주소, 기기/브라우저 정보, 접속 로그</strong> 등이 자동으로 수집·처리될 수 있습니다.
            <br />
            자세한 내용은 <Link href="/privacy" style={{ textDecoration: "underline" }}>개인정보처리방침</Link>을 따릅니다.
          </>
        ),
        paymentsTitle: "7. 결제/구독(향후 결제 기능 포함)",
        paymentsBody: (
          <>
            회사는 현재 또는 향후 구독(월/연) 상품 및 유료 기능을 제공할 수 있으며, 결제 방식은 계좌이체, 카드 결제, 간편결제,
            가상자산 결제 등 운영 정책에 따라 달라질 수 있습니다.
            <br />
            유료 서비스 제공 시 가격, 결제 주기, 세금/VAT 포함 여부, 환불/해지 조건은 결제 화면 또는 별도 고지에 따릅니다.
            <br />
            회사는 합리적인 사유가 있는 경우 가격 및 상품 구성을 변경할 수 있으며, 변경 사항은 사전에 고지합니다.
          </>
        ),
        suspensionTitle: "8. 서비스 제한/중단",
        suspensionBody: (
          <>
            회사는 다음 사유가 발생하는 경우 서비스의 전부 또는 일부를 제한하거나 중단할 수 있습니다.
            <ul>
              <li>서비스 점검, 시스템 보수, 서버 이전 등 운영상 필요한 경우</li>
              <li>제3자 데이터 제공 중단/변경, 외부 네트워크 장애 등 불가항력 사유</li>
              <li>보안 위협 또는 비정상 트래픽이 감지되는 경우</li>
              <li>이용자의 약관 위반이 확인되거나 합리적으로 의심되는 경우</li>
            </ul>
            회사는 가능한 범위 내에서 사전 고지를 원칙으로 하나, 긴급한 경우 사후 고지할 수 있습니다.
          </>
        ),
        disclaimerTitle: "9. 투자 관련 고지(면책)",
        disclaimerBody: (
          <>
            서비스에서 제공되는 정보는 <strong>참고용</strong>이며, 투자·거래에 대한 권유 또는 자문이 아닙니다.
            디지털 자산 거래는 높은 변동성과 손실 위험을 수반하며, 최종 의사결정과 책임은 이용자에게 있습니다.
            <br />
            회사는 데이터의 정확성·완전성·실시간성을 보장하지 않으며, 네트워크 지연, 거래소 정책 변경, 체결/슬리피지, 수수료,
            입출금 제한 등으로 인해 실제 결과가 달라질 수 있습니다.
          </>
        ),
        liabilityTitle: "10. 책임의 제한",
        liabilityBody: (
          <>
            법령이 허용하는 범위 내에서 회사는 간접손해, 특별손해, 결과적 손해(영업 손실, 이익 상실 등)에 대해 책임을 지지 않습니다.
            <br />
            회사의 고의 또는 중대한 과실이 없는 한, 서비스 이용과 관련하여 발생하는 손해에 대한 회사의 책임은
            이용자가 해당 사안과 관련하여 회사에 실제로 지급한 금액(있는 경우)을 상한으로 제한될 수 있습니다.
          </>
        ),
        ipTitle: "11. 지식재산권",
        ipBody: (
          <>
            서비스 및 서비스 내 콘텐츠(상표, 로고, UI, 문서, 데이터 구조 등)에 대한 권리는 회사 또는 정당한 권리자에게 있습니다.
            이용자는 회사의 사전 서면 동의 없이 이를 복제, 수정, 배포, 판매, 상업적으로 이용할 수 없습니다.
          </>
        ),
        linksTitle: "12. 제3자 링크",
        linksBody: (
          <>
            서비스는 제3자 웹사이트 또는 서비스로 연결되는 링크를 포함할 수 있습니다.
            회사는 제3자 서비스의 내용/정책/보안에 대해 통제하지 않으며, 이용자는 본인의 책임 하에 제3자 서비스를 이용합니다.
          </>
        ),
        changesTitle: "13. 약관의 변경",
        changesBody: (
          <>
            회사는 서비스 운영상 필요에 따라 약관을 변경할 수 있으며, 변경 사항은 웹사이트 게시 또는 개별 고지를 통해 안내합니다.
            이용자가 변경된 약관 시행일 이후에도 서비스를 계속 이용하는 경우 변경된 약관에 동의한 것으로 봅니다.
          </>
        ),
        lawTitle: "14. 준거법 및 분쟁 해결",
        lawBody: (
          <>
            본 약관은 대한민국 법령을 준거법으로 합니다(국제사법 적용 대상은 예외).
            서비스 이용과 관련한 분쟁은 회사의 본점 소재지 관할 법원을 1심 전속 관할로 할 수 있습니다.
            <br />
            (※ 실제 관할/준거법은 회사의 운영 국가 및 서비스 제공 형태에 따라 조정할 수 있습니다.)
          </>
        ),
        contactTitle: "15. 문의처",
        contactBody: (
          <>
            회사명: <strong>{COMPANY}</strong>
            <br />
            대표자: <strong>{CEO_NAME}</strong>
            <br />
            문의: <a href={`mailto:${SUPPORT_EMAIL}`} style={{ textDecoration: "underline" }}>{SUPPORT_EMAIL}</a>
          </>
        ),
        privacyLinkText: "개인정보처리방침 보기",
      },
      en: {
        title: "Terms of Service",
        subtitle: `${SERVICE} Terms of Service — Last revised: ${LAST_REVISED}`,
        introTitle: "1. Scope",
        introBody: (
          <>
            These Terms of Service (the “Terms”) govern your use of the <strong>{SERVICE}</strong> website and related services
            (the “Service”) operated by <strong>{COMPANY}</strong> (the “Company”).
            <br />
            By accessing the Service or submitting a free-trial request, subscription request, or inquiry, you agree to these Terms.
            <br />
            These Terms apply together with our{" "}
            <Link href="/privacy" style={{ textDecoration: "underline" }}>
              Privacy Policy
            </Link>.
          </>
        ),
        eligibilityTitle: "2. Eligibility",
        eligibilityBody: (
          <>
            You must be legally permitted to use the Service under the laws of your jurisdiction.
            The Company may restrict or refuse access if:
            <ul>
              <li>your use violates applicable law or these Terms;</li>
              <li>abnormal access patterns threaten security, stability, or availability;</li>
              <li>the Company reasonably determines access should be limited for operational reasons.</li>
            </ul>
          </>
        ),
        accountTitle: "3. Accounts & Authentication (Future Features)",
        accountBody: (
          <>
            {SERVICE} may currently operate without user accounts, relying on free-trial/subscription requests.
            However, the Company may introduce accounts, authentication, payments, subscription management, and personalization in the future.
            <br />
            If account features are introduced, you are responsible for safeguarding your credentials and for activities conducted under your account,
            to the extent permitted by law.
          </>
        ),
        dataTitle: "4. Nature of the Service",
        dataBody: (
          <>
            {SERVICE} is a <strong>data and calculation platform</strong> that displays market information derived from public exchange APIs,
            public sources, and/or third-party data providers.
            <br />
            The Service is provided as SaaS and may change over time (features, availability, and supported coverage).
            <br />
            While the Company aims for continuous availability, interruptions or delays may occur due to maintenance, network issues,
            and third-party data limitations.
          </>
        ),
        licenseTitle: "5. License & Prohibited Activities",
        licenseBody: (
          <>
            Subject to these Terms, the Company grants you a limited, non-exclusive, revocable, non-transferable, non-sublicensable license
            to access and use the Service for personal purposes.
            <br />
            You must not:
            <ul>
              <li>copy, redistribute, or commercially exploit the Service or its content/UI/data;</li>
              <li>scrape/crawl, automate extraction, reverse engineer, or bypass security controls;</li>
              <li>generate excessive requests or interfere with the Service’s operation;</li>
              <li>introduce malware or attempt unauthorized access;</li>
              <li>infringe IP rights or harm the Company’s reputation.</li>
            </ul>
          </>
        ),
        privacyTitle: "6. Personal Data & Security Logs (IP, etc.)",
        privacyBody: (
          <>
            When submitting a free-trial request or subscription request, you may be asked to provide
            <strong> name, phone number, email, and Telegram ID</strong>.
            <br />
            For security and fraud prevention (access control, integrity checks, incident response), the Service may automatically collect
            <strong> IP address, device/browser data, and access logs</strong>.
            <br />
            Please review our{" "}
            <Link href="/privacy" style={{ textDecoration: "underline" }}>
              Privacy Policy
            </Link>{" "}
            for details.
          </>
        ),
        paymentsTitle: "7. Payments & Subscription (Future Payments)",
        paymentsBody: (
          <>
            The Company may offer subscription plans and paid features. Payment methods may include bank transfer, cards, one-click payments,
            or other methods per Company policy.
            <br />
            Pricing, billing cycles, taxes/VAT, cancellation, and refund rules will be disclosed on the checkout page or in separate notices.
            The Company may revise prices and plans with prior notice as reasonably practicable.
          </>
        ),
        suspensionTitle: "8. Suspension or Restriction",
        suspensionBody: (
          <>
            The Company may restrict or suspend the Service (in whole or in part) for:
            <ul>
              <li>maintenance, upgrades, or infrastructure changes;</li>
              <li>third-party data outages or force majeure events;</li>
              <li>security threats or abnormal traffic;</li>
              <li>suspected or confirmed violations of these Terms.</li>
            </ul>
            Where practicable, notice will be provided in advance; emergency actions may be notified after the fact.
          </>
        ),
        disclaimerTitle: "9. No Investment Advice",
        disclaimerBody: (
          <>
            The Service is provided for <strong>informational purposes only</strong> and does not constitute investment advice,
            solicitation, or recommendations.
            Digital asset trading involves significant risk, and you are solely responsible for your decisions and outcomes.
            <br />
            The Company does not guarantee accuracy, completeness, or real-time performance. Execution outcomes may vary due to latency,
            exchange policy changes, fees, slippage, and deposit/withdrawal constraints.
          </>
        ),
        liabilityTitle: "10. Limitation of Liability",
        liabilityBody: (
          <>
            To the maximum extent permitted by law, the Company is not liable for indirect, incidental, special, consequential,
            or punitive damages, including lost profits.
            <br />
            Unless caused by the Company’s willful misconduct or gross negligence, the Company’s aggregate liability may be limited
            to the amount you actually paid to the Company for the relevant issue (if any).
          </>
        ),
        ipTitle: "11. Intellectual Property",
        ipBody: (
          <>
            All rights in the Service and its content (including trademarks, logos, UI, documentation, and data structures) belong to the Company
            or rightful licensors. You may not use them beyond the limited license granted herein without prior written permission.
          </>
        ),
        linksTitle: "12. Third-Party Links",
        linksBody: (
          <>
            The Service may contain links to third-party websites or services. The Company does not control third parties and is not responsible
            for their content, policies, or security. Use third-party services at your own risk.
          </>
        ),
        changesTitle: "13. Changes to these Terms",
        changesBody: (
          <>
            The Company may update these Terms as needed. Updates will be posted on the website or otherwise notified.
            Continued use of the Service after the effective date constitutes acceptance of the updated Terms.
          </>
        ),
        lawTitle: "14. Governing Law & Dispute Resolution",
        lawBody: (
          <>
            These Terms are governed by the laws of the Republic of Korea, unless conflict-of-law rules require otherwise.
            Disputes may be subject to the exclusive jurisdiction of the competent court at the Company’s principal place of business.
            <br />
            (Note: governing law/jurisdiction may be adjusted based on where the Company operates and how the Service is provided.)
          </>
        ),
        contactTitle: "15. Contact",
        contactBody: (
          <>
            Company: <strong>{COMPANY}</strong>
            <br />
            Representative: <strong>{CEO_NAME}</strong>
            <br />
            Email:{" "}
            <a href={`mailto:${SUPPORT_EMAIL}`} style={{ textDecoration: "underline" }}>
              {SUPPORT_EMAIL}
            </a>
          </>
        ),
        privacyLinkText: "View Privacy Policy",
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

      {/* 상단바 (Learn 톤 유지) */}
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
              {/* KOR/ENG */}
              <button
                type="button"
                className={`langBtn ${lang === "ko" ? "active" : ""}`}
                onClick={() => setLanguage("ko")}
              >
                KOR
              </button>
              <button
                type="button"
                className={`langBtn ${lang === "en" ? "active" : ""}`}
                onClick={() => setLanguage("en")}
              >
                ENG
              </button>

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

      {/* 본문 */}
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
              <Link href="/privacy" className="btn-cta-u btn-cta-u--blue" style={{ height: 42, fontSize: 14 }}>
                {T.privacyLinkText} <span className="arrow">→</span>
              </Link>
              <Link href="/" className="btn-cta-u btn-cta-u--pink" style={{ height: 42, fontSize: 14 }}>
                메인으로 <span className="arrow">→</span>
              </Link>
            </div>
          </div>

          {/* 본문 카드 */}
          <div
            style={{
              borderRadius: 18,
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
              padding: "26px 22px",
              boxShadow: "0 24px 64px rgba(0,0,0,.45)",
            }}
          >
            <TermsSection title={T.introTitle}>{T.introBody}</TermsSection>
            <TermsSection title={T.eligibilityTitle}>{T.eligibilityBody}</TermsSection>
            <TermsSection title={T.accountTitle}>{T.accountBody}</TermsSection>
            <TermsSection title={T.dataTitle}>{T.dataBody}</TermsSection>
            <TermsSection title={T.licenseTitle}>{T.licenseBody}</TermsSection>
            <TermsSection title={T.privacyTitle}>{T.privacyBody}</TermsSection>
            <TermsSection title={T.paymentsTitle}>{T.paymentsBody}</TermsSection>
            <TermsSection title={T.suspensionTitle}>{T.suspensionBody}</TermsSection>
            <TermsSection title={T.disclaimerTitle}>{T.disclaimerBody}</TermsSection>
            <TermsSection title={T.liabilityTitle}>{T.liabilityBody}</TermsSection>
            <TermsSection title={T.ipTitle}>{T.ipBody}</TermsSection>
            <TermsSection title={T.linksTitle}>{T.linksBody}</TermsSection>
            <TermsSection title={T.changesTitle}>{T.changesBody}</TermsSection>
            <TermsSection title={T.lawTitle}>{T.lawBody}</TermsSection>
            <TermsSection title={T.contactTitle}>{T.contactBody}</TermsSection>
          </div>

          <div style={{ marginTop: 18, color: "rgba(170,176,210,0.75)", fontSize: 12.5, lineHeight: 1.6 }}>
            ※ 본 페이지의 문구는 서비스 운영 정책에 따라 업데이트될 수 있습니다. 최신 버전은 본 페이지에 게시된 내용을 따릅니다.
          </div>
        </div>
      </main>

      {/* KOR/ENG 버튼 스타일 (learn 톤에 맞춘 최소 추가) */}
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
        .terms-h2{
          font-size: 15px;
          font-weight: 900;
          color: #e0d7ff;
          margin: 18px 0 10px;
        }
        .terms-p{
          font-size: 14px;
          color: rgba(176,176,208,0.92);
          line-height: 1.85;
        }
        .terms-p ul{
          margin-top: 10px;
          padding-left: 18px;
        }
        .terms-p li{
          margin: 6px 0;
        }
      `}</style>
    </>
  );
}

function TermsSection({ title, children }) {
  return (
    <section style={{ padding: "6px 2px" }}>
      <div className="terms-h2">{title}</div>
      <div className="terms-p">{children}</div>
      <div style={{ height: 1, margin: "18px 0 6px", background: "rgba(255,255,255,0.06)" }} />
    </section>
  );
}