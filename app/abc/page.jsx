export const metadata = {
  title: "A/B/C | BODDARING",
};

export default function AbcPage() {
  return (
    <main style={{ padding: "70px 0" }}>
      <div className="container">
        <div className="card card-glow">
          <div className="card-inner">
            <h1 style={{ marginTop: 0 }}>A/B/C 페이지</h1>
            <p className="lead">
              상단 메뉴 A/B/C는 “같은 페이지 내 섹션 이동” 또는 “하위 페이지” 둘 다 가능합니다.
              지금은 라우팅 예시로 페이지를 만들어뒀습니다.
            </p>
            <div style={{ marginTop: 18 }}>
              <a className="btn" href="/">← 메인으로</a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
