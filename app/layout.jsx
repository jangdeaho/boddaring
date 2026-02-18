import "./globals.css";

export const metadata = {
  title: "BODDARING | Arbitrage Intelligence",
  description:
    "거래소 간 시세 차익을 실시간 비교하고 시그널을 제공하는 아비트라지 인텔리전스 플랫폼, BODDARING.",
  openGraph: {
    title: "BODDARING | Arbitrage Intelligence",
    description: "거래소 간 시세 차익 비교 · 시그널 제공 · 자동화 봇 운영",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
