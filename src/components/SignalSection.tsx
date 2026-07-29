export function SignalSection() {
  return (
    <section className="signal-section noise-layer" aria-label="xitora의 작업 원칙">
      <img
        className="signal-section__image"
        src="/assets/signal-field.png"
        alt=""
        loading="lazy"
      />
      <div className="signal-section__overlay" />
      <div className="page-shell signal-section__content">
        <p className="section-index section-index--light">03 / PRINCIPLE</p>
        <p className="signal-section__statement">
          정돈된 구조 위에
          <br />
          <span>예상 밖의 한 장면.</span>
        </p>
        <p className="signal-section__caption">
          CLEAR SYSTEMS
          <br />
          DISTINCT CHARACTER
        </p>
      </div>
    </section>
  );
}
