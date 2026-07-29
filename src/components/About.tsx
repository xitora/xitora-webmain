export function About() {
  return (
    <section className="about-section section" id="about" aria-labelledby="about-title">
      <div className="page-shell about-grid">
        <div className="about-portrait noise-layer">
          <img
            src="/assets/profile-art.png"
            alt="흰색, 검은색, 파란색으로 표현된 xitora의 캐릭터 아트"
            loading="lazy"
          />
          <span className="about-portrait__label">PROFILE / XITORA</span>
        </div>

        <div className="about-copy">
          <p className="section-index">02 / ABOUT</p>
          <h2 id="about-title">
            코드와 이미지 사이,
            <br />
            <span>필요한 것을 직접 만듭니다.</span>
          </h2>
          <p className="about-copy__lead">
            안녕하세요, xitora입니다. 화면이 어떻게 보이는지와 실제로 어떻게
            작동하는지를 따로 생각하지 않습니다.
          </p>
          <p className="about-copy__body">
            작은 도구, 커뮤니티 제품, 아티스트 페이지와 인터랙티브 실험까지.
            문제의 크기보다 사용자가 마주할 순간을 먼저 보고, 선명한 구조와
            고유한 분위기를 함께 설계합니다.
          </p>

          <dl className="practice-list">
            <div>
              <dt>01</dt>
              <dd>
                <strong>Product</strong>
                <span>정보 구조 · 인터랙션 · 프로토타입</span>
              </dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>
                <strong>Web</strong>
                <span>프론트엔드 · 반응형 · 접근성</span>
              </dd>
            </div>
            <div>
              <dt>03</dt>
              <dd>
                <strong>Visual</strong>
                <span>아트 디렉션 · 모션 · 아이덴티티</span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}
