// app/layout.jsx
export const metadata = {
  title: "BODDARING | 아비트라지 인텔리전스 플랫폼",
  description:
    "거래소 간 시세 차익을 실시간 비교하고 시그널을 제공하는 아비트라지 인텔리전스 플랫폼, BODDARING.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
