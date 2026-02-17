export const metadata = {
  title: "BODDARING",
  description: "거래소 간 시세 차익을 빠르게 파악하는 아비트라지 인텔리전스 플랫폼",
  
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png"
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
