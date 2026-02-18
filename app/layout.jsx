import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://boddaring.com"),
  title: "BODDARING | Arbitrage Intelligence",
  description:
    "거래소 간 시세 차익을 실시간 비교하고 시그널을 제공하는 아비트라지 인텔리전스 플랫폼, BODDARING.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "BODDARING | Arbitrage Intelligence",
    description: "거래소 간 시세 차익 비교 · 시그널 제공 · 자동화 봇 운영",
    type: "website",
    url: "https://boddaring.com",
  },
  twitter: {
    card: "summary",
    title: "BODDARING | Arbitrage Intelligence",
    description: "거래소 간 시세 차익 비교 · 시그널 제공 · 자동화 봇 운영",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
