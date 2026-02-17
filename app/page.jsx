import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* public/index.html을 iframe으로 띄우는 가장 쉬운 방식 */}
      <iframe
        src="/index.html"
        style={{
          width: "100vw",
          height: "100vh",
          border: "0",
          display: "block",
        }}
        title="BODDARING"
      />

      {/* 필요하면 여기서 추가 스크립트도 붙일 수 있음 */}
      <Script id="noop" strategy="afterInteractive">{``}</Script>
    </>
  );
}
