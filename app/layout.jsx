export const metadata = {
  title: "BODDARING | Arbitrage Intelligence",
  description: "거래소 간 시세 차익을 실시간 비교하고 시그널을 제공하는 아비트라지 인텔리전스 플랫폼, BODDARING.",
  icons: {
    icon: "/icon.png",                  // 파비콘
    apple: "/doge.png",                 // 애플 홈 아이콘
    other: [
      { rel: "shortcut icon", url: "/doge.png" }
    ]
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body style={{ margin: 0 }}>
        {children}
      </body>
    </html>
  );
}
