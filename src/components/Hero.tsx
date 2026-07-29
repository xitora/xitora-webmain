function ArrowDown() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M10 2v14M4.5 10.5 10 16l5.5-5.5" />
    </svg>
  );
}

export function Hero() {
  return (
    <section className="hero noise-layer" id="top" aria-labelledby="hero-title">
      <img
        className="hero__image"
        src="/assets/hero-banner.png"
        alt=""
        fetchPriority="high"
      />
      <div className="hero__scrim" />

      <div className="hero__content page-shell">
        <p className="eyebrow eyebrow--light">
          <span>Digital maker</span>
          <span>Seoul / Web</span>
        </p>

        <h1 id="hero-title">
          아이디어를
          <br />
          <span>작동하는 경험</span>으로.
        </h1>

        <p className="hero__intro">
          제품, 웹, 도구와 시각 언어를 연결해
          <br />
          오래 남는 디지털 경험을 만듭니다.
        </p>

        <div className="hero__actions">
          <a className="button button--paper" href="#work">
            프로젝트 보기
            <span aria-hidden="true">↘</span>
          </a>
          <a className="text-link text-link--light" href="#about">
            xitora 소개
          </a>
        </div>
      </div>

      <a className="scroll-cue" href="#work" aria-label="프로젝트로 이동">
        <span>SCROLL</span>
        <ArrowDown />
      </a>
    </section>
  );
}
