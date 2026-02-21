export const metadata = {
  title: "신청하기 | BODDARING",
};

export default function ApplyPage() {
  return (
    <main style={{ padding: "70px 0" }}>
      <div className="container">
        <div className="card card-glow">
          <div className="card-inner">
            <h1 style={{ marginTop: 0 }}>신청하기</h1>
            <p className="lead">
              신청서 페이지는 다음 단계에서 제작합니다. (구글폼/타입폼/자체 폼 모두 가능)
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
