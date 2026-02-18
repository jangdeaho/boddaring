import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://boddaring.com"),
  title: "BODDARING | Arbitrage Intelligence",
  description:
    "거래소 간 시세 차익을 실시간 비교하고 시그널을 제공하는 아비트라지 인텔리전스 플랫폼, BODDARING.",
  themeColor: "#070B16",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  openGraph: {
    title: "BODDARING | Arbitrage Intelligence",
    description: "거래소 간 시세 차익 비교 · 시그널 제공 · 자동화 봇 운영",
    type: "website",
    url: "/",
    images: [{ url: "/android-chrome-512x512.png", width: 512, height: 512, alt: "BODDARING" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
