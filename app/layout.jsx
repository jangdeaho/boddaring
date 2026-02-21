import "./globals.css";

export const metadata = {
  title: "BODDARING | 국내 최고 아비트라지 플랫폼",
  description:
    "국내/해외 거래소 데이터를 수집해 차익을 계산하고, 실행 가능한 기회만 초 단위로 시그널로 제공합니다.",
  openGraph: {
    title: "BODDARING | 국내 최고 아비트라지 플랫폼",
    description:
      "국내/해외 거래소 가격 비교 · 실행 가능한 기회 선별 · 초 단위 시그널",
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
