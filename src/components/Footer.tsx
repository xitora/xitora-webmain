function ExternalArrow() {
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <path d="M5 15 15 5M7 5h8v8" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="site-footer noise-layer" id="contact">
      <div className="page-shell">
        <div className="footer-top">
          <p className="section-index section-index--light">04 / CONTACT</p>
          <p className="footer-kicker">다음 장면을 함께 만들까요?</p>
          <h2>
            LET&apos;S BUILD
            <br />
            <span>SOMETHING CLEAR.</span>
          </h2>
          <a
            className="button button--paper footer-button"
            href="https://github.com/xitora"
            target="_blank"
            rel="noreferrer"
          >
            GitHub에서 만나기
            <ExternalArrow />
          </a>
        </div>

        <div className="footer-bottom">
          <a className="wordmark wordmark--footer" href="#top">
            XITORA<span className="wordmark__dot">.</span>
          </a>
          <p>Designing products, tools and web experiences.</p>
          <div className="footer-links">
            <a href="https://github.com/xitora" target="_blank" rel="noreferrer">
              GitHub ↗
            </a>
            <a href="https://xitora.cc" target="_blank" rel="noreferrer">
              xitora.cc ↗
            </a>
          </div>
          <span>© {new Date().getFullYear()} XITORA</span>
        </div>
      </div>
    </footer>
  );
}
