import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { gearItems } from "./data/gear";

gsap.registerPlugin(ScrollTrigger);

const githubUrl = "https://github.com/xitora";
type Navigate = (path: string) => void;

const profileFacts = [
  ["Alias", "xitora"],
  ["Based", "UTC +09 / Korea"],
  ["Focus", "Interactive web & motion"],
  ["Language", "Korean / English"],
  ["Plays", "FPS / Rhythm games"],
  ["Mode", "Curious, precise, always iterating"],
] as const;

const signals = [
  {
    index: "01",
    label: "Design",
    title: "Clarity with an edge",
    copy: "Restrained systems, deliberate contrast, and details that reward a second look.",
  },
  {
    index: "02",
    label: "Interaction",
    title: "Motion with purpose",
    copy: "Transitions and responses are tuned to guide attention without slowing the experience.",
  },
  {
    index: "03",
    label: "Culture",
    title: "Games shape the rhythm",
    copy: "FPS precision and rhythm-game timing influence how every interface should feel.",
  },
] as const;

function InternalLink({
  href,
  onNavigate,
  children,
  className,
}: {
  href: string;
  onNavigate: Navigate;
  children: ReactNode;
  className?: string;
}) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    event.preventDefault();
    onNavigate(href);
  };

  return (
    <a className={className} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}

function Mark({ onNavigate }: { onNavigate: Navigate }) {
  return (
    <InternalLink className="mark" href="/" onNavigate={onNavigate}>
      <span className="mark__avatar">
        <img src="/assets/profile-art.png" alt="" />
      </span>
      <span className="mark__word">
        xitora<span>.</span>
      </span>
    </InternalLink>
  );
}

function PageMotion({
  pageRef,
  pageKey,
}: {
  pageRef: React.RefObject<HTMLElement | null>;
  pageKey: string;
}) {
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    let lenis: Lenis | undefined;
    let animationFrame = 0;

    if (!reduceMotion) {
      lenis = new Lenis({
        duration: 1.15,
        lerp: 0.085,
        smoothWheel: true,
        wheelMultiplier: 0.92,
      });
      lenis.on("scroll", ScrollTrigger.update);

      const updateLenis = (time: number) => {
        lenis?.raf(time);
        animationFrame = window.requestAnimationFrame(updateLenis);
      };

      animationFrame = window.requestAnimationFrame(updateLenis);
    }

    const context = gsap.context(() => {
      if (reduceMotion) return;

      const tiltTargets =
        page.querySelectorAll<HTMLElement>("[data-tilt]");
      const wordTargets =
        page.querySelectorAll<HTMLElement>("[data-word]");
      const gearTargets =
        page.querySelectorAll<HTMLElement>("[data-gear]");

      if (tiltTargets.length) {
        gsap.set(tiltTargets, {
          force3D: true,
          rotateX: 0,
          rotateY: 0,
          transformOrigin: "50% 50%",
          transformPerspective: 900,
        });
      }

      gsap.from("[data-intro]", {
        y: 24,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1.2,
        stagger: 0.085,
        delay: 0.16,
        clearProps: "filter",
        ease: "power3.out",
      });

      if (wordTargets.length) {
        gsap.from(wordTargets, {
          yPercent: 118,
          rotate: 2.5,
          duration: 1.25,
          stagger: 0.07,
          delay: 0.12,
          ease: "power4.out",
        });
      }

      if (gearTargets.length) {
        gsap.from(gearTargets, {
          x: 22,
          opacity: 0,
          duration: 1,
          stagger: 0.08,
          delay: 0.28,
          ease: "power3.out",
        });
      }

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
        gsap.from(element, {
          y: 58,
          opacity: 0,
          filter: "blur(12px)",
          duration: 1.15,
          clearProps: "filter",
          ease: "power3.out",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((element) => {
        gsap.from(element, {
          scaleX: 0,
          transformOrigin: "left",
          duration: 1.25,
          ease: "power4.out",
          scrollTrigger: {
            trigger: element,
            start: "top 90%",
            once: true,
          },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((element) => {
        gsap.to(element, {
          yPercent: -16,
          ease: "none",
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });
      });
    }, page);

    const tiltElements = Array.from(
      page.querySelectorAll<HTMLElement>("[data-tilt]"),
    );
    const tiltCleanups = tiltElements.map((element) => {
      const handlePointerMove = (event: PointerEvent) => {
        if (event.pointerType === "touch" || reduceMotion) return;
        const bounds = element.getBoundingClientRect();
        const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
        const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

        gsap.to(element, {
          rotateY: horizontal * 5,
          rotateX: vertical * -4,
          x: horizontal * 5,
          y: vertical * 5,
          duration: 0.7,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      const handlePointerLeave = () => {
        if (reduceMotion) return;

        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          overwrite: "auto",
        });
      };

      element.addEventListener("pointermove", handlePointerMove, {
        passive: true,
      });
      element.addEventListener("pointerleave", handlePointerLeave);

      return () => {
        element.removeEventListener("pointermove", handlePointerMove);
        element.removeEventListener("pointerleave", handlePointerLeave);
      };
    });

    window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      tiltCleanups.forEach((cleanup) => cleanup());
      window.cancelAnimationFrame(animationFrame);
      lenis?.destroy();
      context.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [pageKey, pageRef]);

  return null;
}

function GlobalCursor() {
  const auraRef = useRef<HTMLDivElement>(null);
  const coreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const aura = auraRef.current;
    const core = coreRef.current;
    const supportsCustomCursor = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    if (!aura || !core || !supportsCustomCursor) return;

    const moveAuraX = gsap.quickTo(aura, "x", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveAuraY = gsap.quickTo(aura, "y", {
      duration: 0.5,
      ease: "power3.out",
    });
    const moveCoreX = gsap.quickTo(core, "x", {
      duration: 0.06,
      ease: "none",
    });
    const moveCoreY = gsap.quickTo(core, "y", {
      duration: 0.06,
      ease: "none",
    });

    const handlePointerMove = (event: PointerEvent) => {
      moveAuraX(event.clientX);
      moveAuraY(event.clientY);
      moveCoreX(event.clientX);
      moveCoreY(event.clientY);
      gsap.to([aura, core], { opacity: 1, duration: 0.2 });
    };

    const handlePointerLeave = () => {
      gsap.to([aura, core], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.documentElement.addEventListener(
      "pointerleave",
      handlePointerLeave,
    );

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      document.documentElement.removeEventListener(
        "pointerleave",
        handlePointerLeave,
      );
    };
  }, []);

  return (
    <>
      <div className="pointer-aura" ref={auraRef} aria-hidden="true" />
      <div className="cursor-core" ref={coreRef} aria-hidden="true" />
    </>
  );
}

function CyberScrollbar() {
  const railRef = useRef<HTMLButtonElement>(null);
  const outputRef = useRef<HTMLOutputElement>(null);

  useEffect(() => {
    const rail = railRef.current;
    const output = outputRef.current;
    if (!rail || !output) return;

    let dragging = false;
    let animationFrame = 0;

    const update = () => {
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maximum > 0 ? window.scrollY / maximum : 0;
      rail.style.setProperty(
        "--scroll-progress",
        String(Math.min(1, Math.max(0, progress))),
      );
      rail.style.setProperty(
        "--scroll-thumb-y",
        `${progress * Math.max(0, rail.clientHeight - 28)}px`,
      );
      output.value = String(Math.round(progress * 100)).padStart(3, "0");
      animationFrame = 0;
    };

    const requestUpdate = () => {
      if (!animationFrame) {
        animationFrame = window.requestAnimationFrame(update);
      }
    };

    const scrollFromPointer = (clientY: number) => {
      const bounds = rail.getBoundingClientRect();
      const progress = Math.min(
        1,
        Math.max(0, (clientY - bounds.top) / bounds.height),
      );
      const maximum =
        document.documentElement.scrollHeight - window.innerHeight;
      window.scrollTo({ top: maximum * progress, behavior: "auto" });
    };

    const handlePointerDown = (event: PointerEvent) => {
      dragging = true;
      rail.setPointerCapture(event.pointerId);
      scrollFromPointer(event.clientY);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (dragging) scrollFromPointer(event.clientY);
    };

    const handlePointerUp = (event: PointerEvent) => {
      dragging = false;
      if (rail.hasPointerCapture(event.pointerId)) {
        rail.releasePointerCapture(event.pointerId);
      }
    };

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate, { passive: true });
    rail.addEventListener("pointerdown", handlePointerDown);
    rail.addEventListener("pointermove", handlePointerMove);
    rail.addEventListener("pointerup", handlePointerUp);
    rail.addEventListener("pointercancel", handlePointerUp);
    update();

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      rail.removeEventListener("pointerdown", handlePointerDown);
      rail.removeEventListener("pointermove", handlePointerMove);
      rail.removeEventListener("pointerup", handlePointerUp);
      rail.removeEventListener("pointercancel", handlePointerUp);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <aside className="cyber-scrollbar" aria-label="Page scroll position">
      <span className="cyber-scrollbar__label">SCROLL</span>
      <button
        className="cyber-scrollbar__rail"
        ref={railRef}
        type="button"
        aria-label="Drag or click to scroll"
      >
        <span className="cyber-scrollbar__progress" />
        <span className="cyber-scrollbar__thumb" />
        <span className="cyber-scrollbar__ticks" />
      </button>
      <output className="cyber-scrollbar__value" ref={outputRef}>
        000
      </output>
    </aside>
  );
}

function HomePage({ onNavigate }: { onNavigate: Navigate }) {
  const pageRef = useRef<HTMLElement>(null);

  return (
    <section className="page page--home" ref={pageRef}>
      <div
        className="page-backdrop page-backdrop--home"
        aria-hidden="true"
      />
      <PageMotion pageRef={pageRef} pageKey="home" />

      <header className="topbar" data-intro>
        <Mark onNavigate={onNavigate} />
        <nav aria-label="Primary navigation">
          <InternalLink href="/gear" onNavigate={onNavigate}>
            Gear
          </InternalLink>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>

      <main className="home-main">
        <section className="home-hero" id="top">
          <div className="home-copy">
            <p className="eyebrow" data-intro>
              Designer, developer &amp; gamer
            </p>
            <h1 aria-label="Welcome to my profile">
              {["Welcome", "to", "my", "profile"].map((word) => (
                <span className="hero-word-mask" key={word}>
                  <span data-word>{word}</span>
                </span>
              ))}
            </h1>
            <p className="home-description" data-intro>
              I&apos;m xitora — building expressive digital experiences
              between precise systems, motion, and game culture.
            </p>
            <div className="home-links" data-intro>
              <InternalLink
                className="primary-link"
                href="/gear"
                onNavigate={onNavigate}
              >
                Explore my gear <span>↗</span>
              </InternalLink>
              <a className="text-link" href="#profile">
                Read profile <span>↓</span>
              </a>
            </div>
          </div>

          <div className="hero-system" data-intro data-parallax aria-hidden="true">
            <div className="hero-system__ring hero-system__ring--outer" />
            <div className="hero-system__ring hero-system__ring--inner" />
            <div className="hero-system__axis hero-system__axis--x" />
            <div className="hero-system__axis hero-system__axis--y" />
            <div className="hero-system__core">X</div>
            <span className="hero-system__coordinate">37.5665° N</span>
            <span className="hero-system__status">PROFILE / ONLINE</span>
          </div>
          <a className="scroll-cue" href="#profile" data-intro>
            <span>Scroll to explore</span>
            <i />
          </a>
        </section>

        <section className="profile-section" id="profile">
          <div className="section-heading" data-reveal>
            <p className="section-index">01 / PROFILE DATA</p>
            <h2>Personal, not private.</h2>
            <p>
              A compact public snapshot. Enough context to know the person,
              without turning a profile into a form.
            </p>
          </div>
          <div className="section-rule" data-line />
          <div className="profile-records">
            {profileFacts.map(([label, value], index) => (
              <article
                className="profile-record"
                data-reveal
                data-tilt
                key={label}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{label}</p>
                <h3>{value}</h3>
              </article>
            ))}
          </div>
        </section>

        <div className="kinetic-strip" aria-hidden="true">
          <div>
            <span>DESIGN / MOTION / CODE / GAMES /</span>
            <span>DESIGN / MOTION / CODE / GAMES /</span>
          </div>
        </div>

        <section className="signals-section" id="signals">
          <div className="section-heading section-heading--compact" data-reveal>
            <p className="section-index">02 / SIGNALS</p>
            <h2>How I see digital work.</h2>
          </div>
          <div className="section-rule" data-line />
          <div className="signal-list">
            {signals.map((signal) => (
              <article className="signal-row" key={signal.index} data-reveal>
                <span className="signal-row__index">{signal.index}</span>
                <p>{signal.label}</p>
                <h3>{signal.title}</h3>
                <p className="signal-row__copy">{signal.copy}</p>
                <span className="signal-row__pulse" aria-hidden="true" />
              </article>
            ))}
          </div>
        </section>

        <section className="closing-section" data-reveal>
          <p className="section-index">03 / NEXT</p>
          <h2>See the tools behind the play.</h2>
          <div className="closing-section__actions">
            <InternalLink
              className="primary-link primary-link--blue"
              href="/gear"
              onNavigate={onNavigate}
            >
              Open equipment list <span>↗</span>
            </InternalLink>
            <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub profile <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="page-footer" data-reveal>
        <span>© 2026 xitora.cc</span>
        <a href="#top">Back to top ↑</a>
      </footer>
    </section>
  );
}

function GearPage({ onNavigate }: { onNavigate: Navigate }) {
  const pageRef = useRef<HTMLElement>(null);

  return (
    <section className="page page--gear" ref={pageRef}>
      <div
        className="page-backdrop page-backdrop--gear"
        aria-hidden="true"
      />
      <PageMotion pageRef={pageRef} pageKey="gear" />

      <header className="topbar topbar--light" data-intro>
        <Mark onNavigate={onNavigate} />
        <nav aria-label="Primary navigation">
          <InternalLink href="/" onNavigate={onNavigate}>
            Home
          </InternalLink>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>

      <main className="gear-main">
        <div className="gear-heading">
          <p className="eyebrow eyebrow--light" data-intro>
            Equipment archive
          </p>
          <h1 data-intro>My gear</h1>
          <p data-intro>
            A living list of the equipment currently in use.
          </p>
        </div>

        <div className="gear-list" aria-label="Equipment list">
          {gearItems.map((item) => (
            <article className="gear-row" key={item.category} data-gear>
              <span className="gear-row__index">{item.index}</span>
              <div className="gear-row__identity">
                <p>{item.category}</p>
                <h2>{item.name}</h2>
              </div>
              <p className="gear-row__detail">{item.detail}</p>
              <span className="gear-row__arrow" aria-hidden="true">
                ↗
              </span>
            </article>
          ))}
        </div>
      </main>

      <footer className="page-footer page-footer--light" data-intro>
        <span>Last updated — 2026.08.01</span>
        <InternalLink href="/" onNavigate={onNavigate}>
          ← Back home
        </InternalLink>
      </footer>
    </section>
  );
}

function currentPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function App() {
  const [path, setPath] = useState(currentPath);
  const pathRef = useRef(path);
  const transitionRef = useRef<HTMLDivElement>(null);
  const transitionRunningRef = useRef(false);
  const isGearPage = path === "/gear";

  const navigate = useCallback((nextPath: string, pushHistory = true) => {
    const normalizedPath = nextPath.replace(/\/+$/, "") || "/";
    if (
      normalizedPath === pathRef.current ||
      transitionRunningRef.current
    ) {
      return;
    }

    const updatePage = () => {
      if (pushHistory) {
        window.history.pushState({}, "", normalizedPath);
      }

      pathRef.current = normalizedPath;
      setPath(normalizedPath);
      window.scrollTo(0, 0);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transition = transitionRef.current;
    const transitionArt = transition?.querySelector<HTMLElement>(
      "[data-transition-art]",
    );

    if (reduceMotion || !transition || !transitionArt) {
      updatePage();
      return;
    }

    transitionRunningRef.current = true;
    transition.dataset.tone =
      normalizedPath === "/gear" ? "dark" : "light";
    const direction = normalizedPath === "/gear" ? 1 : -1;

    gsap
      .timeline({
        onComplete: () => {
          transitionRunningRef.current = false;
        },
      })
      .set(transition, {
        autoAlpha: 1,
      })
      .set(transitionArt, {
        force3D: true,
        rotate: direction * 1.2,
        scale: 1.04,
        xPercent: -50 + direction * 2,
        yPercent: 50,
      })
      .to(
        transitionArt,
        {
          rotate: direction * -0.8,
          scale: 1,
          xPercent: -50 - direction * 2,
          yPercent: -50,
          duration: 1.42,
          ease: "power4.inOut",
        },
        0,
      )
      .add(updatePage, 0.71)
      .set(transition, {
        autoAlpha: 0,
      });
  }, []);

  useEffect(() => {
    const handlePopState = () => navigate(currentPath(), false);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  useEffect(() => {
    document.title = isGearPage
      ? "Gear — xitora"
      : "xitora — Designer & Developer";
  }, [isGearPage]);

  return (
    <>
      <svg
        className="filter-definitions"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <filter
            id="atmospheric-smear"
            x="-8%"
            y="-8%"
            width="116%"
            height="116%"
            colorInterpolationFilters="sRGB"
          >
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.003 0.018"
              numOctaves="2"
              seed="11"
              result="grain-flow"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="grain-flow"
              scale="30"
              xChannelSelector="R"
              yChannelSelector="B"
              result="displaced"
            />
            <feGaussianBlur
              in="displaced"
              stdDeviation="4.8 1.4"
              result="smeared"
            />
            <feBlend
              in="smeared"
              in2="SourceGraphic"
              mode="soft-light"
            />
          </filter>
        </defs>
      </svg>
      {isGearPage ? (
        <GearPage onNavigate={navigate} />
      ) : (
        <HomePage onNavigate={navigate} />
      )}
      <div className="page-transition" ref={transitionRef} aria-hidden="true">
        <div
          className="page-transition__art"
          data-transition-art
        />
      </div>
      <CyberScrollbar />
      <GlobalCursor />
    </>
  );
}

export default App;
