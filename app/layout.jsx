import "./globals.css";

export const metadata = {
  metadataBase: new URL("https://boddaring.com"),
  title: "BODDARING | 국내 최고 아비트라지 플랫폼",
  description:
    "국내/해외 거래소에 상장된 모든 코인의 데이터를 수집하여 차익을 계산하고, 실행 가능한 기회만 선별해 초 단위로 시그널을 제공합니다.",
  keywords: "아비트라지, 김프, 시세차익, 코인, 비트코인, 거래소, 텔레그램 알림",
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
    title: "BODDARING | 국내 최고 아비트라지 플랫폼",
    description: "거래소 간 시세 차익 비교 · 초 단위 시그널 · 자동화 봇 운영",
    type: "website",
    url: "https://boddaring.com",
  },
  twitter: {
    card: "summary",
    title: "BODDARING | 국내 최고 아비트라지 플랫폼",
    description: "거래소 간 시세 차익 비교 · 초 단위 시그널 · 자동화 봇 운영",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        {/* Pretendard 폰트 */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
