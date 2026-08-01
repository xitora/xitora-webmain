import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { flushSync } from "react-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { gearItems } from "./data/gear";

gsap.registerPlugin(ScrollTrigger);

const githubUrl = "https://github.com/xitora";
type Navigate = (path: string) => void;

const profileFacts = [
  ["활동명", "xitora"],
  ["위치", "UTC +09 / 대한민국"],
  ["관심 분야", "인터랙티브 웹과 모션"],
  ["언어", "한국어 / 영어"],
  ["플레이", "FPS / 리듬 게임"],
  ["작업 방식", "호기심을 갖고, 정교하게, 계속 개선하기"],
] as const;

const signals = [
  {
    index: "01",
    label: "디자인",
    title: "절제 속의 선명함",
    copy: "정돈된 시스템과 의도적인 대비, 다시 볼수록 발견되는 디테일을 추구합니다.",
  },
  {
    index: "02",
    label: "인터랙션",
    title: "목적이 있는 움직임",
    copy: "경험의 흐름을 늦추지 않으면서 시선을 안내하도록 전환과 반응을 조율합니다.",
  },
  {
    index: "03",
    label: "문화",
    title: "게임이 만드는 리듬",
    copy: "FPS의 정밀함과 리듬 게임의 타이밍을 인터페이스의 감각으로 연결합니다.",
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

      const wordTargets =
        page.querySelectorAll<HTMLElement>("[data-word]");
      const gearTargets =
        page.querySelectorAll<HTMLElement>("[data-gear]");

      gsap.from("[data-intro]", {
        y: 24,
        opacity: 0,
        duration: 1.2,
        stagger: 0.085,
        delay: 0.16,
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
          duration: 1.15,
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

      const sectionOffset = window.innerWidth <= 620 ? 42 : 110;
      gsap.utils.toArray<HTMLElement>("[data-section]").forEach((section) => {
        gsap.fromTo(
          section,
          {
            y: sectionOffset,
            opacity: 0.28,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 96%",
              end: "top 54%",
              scrub: 1.05,
            },
          },
        );
      });
    }, page);

    window.requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
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
    <aside className="cyber-scrollbar" aria-label="페이지 스크롤 위치">
      <span className="cyber-scrollbar__label">스크롤</span>
      <button
        className="cyber-scrollbar__rail"
        ref={railRef}
        type="button"
        aria-label="드래그하거나 클릭해 스크롤"
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
        <nav aria-label="주요 메뉴">
          <InternalLink href="/gear" onNavigate={onNavigate}>
            장비
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
              디자이너 · 개발자 · 게이머
            </p>
            <h1 aria-label="내 프로필에 오신 걸 환영합니다">
              {["내", "프로필에", "오신", "걸", "환영합니다"].map((word) => (
                <span className="hero-word-mask" key={word}>
                  <span data-word>{word}</span>
                </span>
              ))}
            </h1>
            <p className="home-description" data-intro>
              정교한 시스템과 모션, 게임 문화 사이에서 표현력 있는 디지털
              경험을 만드는 xitora입니다.
            </p>
            <div className="home-links" data-intro>
              <InternalLink
                className="primary-link"
                href="/gear"
                onNavigate={onNavigate}
              >
                사용 장비 살펴보기 <span>↗</span>
              </InternalLink>
              <a className="text-link" href="#profile">
                프로필 읽기 <span>↓</span>
              </a>
            </div>
          </div>

          <figure className="hero-profile" data-intro>
            <img
              src="/assets/profile-art.png"
              alt="xitora 프로필 이미지"
            />
          </figure>
          <a className="scroll-cue" href="#profile" data-intro>
            <span>아래로 탐색</span>
            <i />
          </a>
        </section>

        <section className="profile-section" id="profile" data-section>
          <div className="section-heading" data-reveal>
            <p className="section-index">01 / 프로필 정보</p>
            <h2>개인적이되, 사적이지 않게.</h2>
            <p>
              나를 이해하는 데 필요한 맥락만 담은 간결한 공개 프로필입니다.
              형식적인 소개보다 사람의 결을 보여줍니다.
            </p>
          </div>
          <div className="section-rule" data-line />
          <div className="profile-records">
            {profileFacts.map(([label, value], index) => (
              <article
                className="profile-record"
                data-reveal
                key={label}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{label}</p>
                <h3>{value}</h3>
              </article>
            ))}
          </div>
        </section>

        <section className="signals-section" id="signals" data-section>
          <div className="section-heading section-heading--compact" data-reveal>
            <p className="section-index">02 / 관점</p>
            <h2>디지털 작업을 바라보는 방식.</h2>
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

        <section className="closing-section" data-section>
          <p className="section-index">03 / 다음</p>
          <h2>사용하는 장비를 확인해보세요.</h2>
          <div className="closing-section__actions">
            <InternalLink
              className="primary-link primary-link--blue"
              href="/gear"
              onNavigate={onNavigate}
            >
              장비 목록 열기 <span>↗</span>
            </InternalLink>
            <a className="text-link" href={githubUrl} target="_blank" rel="noreferrer">
              GitHub 프로필 <span>↗</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="page-footer" data-reveal>
        <span>© 2026 xitora.cc</span>
        <a href="#top">맨 위로 ↑</a>
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
        <nav aria-label="주요 메뉴">
          <InternalLink href="/" onNavigate={onNavigate}>
            홈
          </InternalLink>
          <a href={githubUrl} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
        </nav>
      </header>

      <main className="gear-main">
        <div className="gear-heading">
          <p className="eyebrow eyebrow--light" data-intro>
            장비 아카이브
          </p>
          <h1 data-intro>나의 장비</h1>
          <p data-intro>
            현재 사용 중인 장비를 계속 업데이트하는 목록입니다.
          </p>
        </div>

        <div className="gear-list" aria-label="장비 목록">
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
        <span>최종 업데이트 — 2026.08.01</span>
        <InternalLink href="/" onNavigate={onNavigate}>
          ← 홈으로 돌아가기
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
  const transitionRunningRef = useRef(false);
  const isGearPage = path === "/gear";

  useEffect(() => {
    [
      "/assets/home-background-soft.jpg",
      "/assets/gear-background-soft.jpg",
    ].forEach((source) => {
      const image = new Image();
      image.src = source;
    });
  }, []);

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
      flushSync(() => setPath(normalizedPath));
      window.scrollTo(0, 0);
    };

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const transitionDocument = document as Document & {
      startViewTransition?: (update: () => void) => {
        finished: Promise<void>;
      };
    };

    if (reduceMotion || !transitionDocument.startViewTransition) {
      updatePage();
      return;
    }

    transitionRunningRef.current = true;
    document.documentElement.dataset.pageTransition =
      normalizedPath === "/gear" ? "forward" : "back";

    const transition = transitionDocument.startViewTransition(updatePage);
    void transition.finished
      .catch(() => undefined)
      .finally(() => {
        transitionRunningRef.current = false;
        delete document.documentElement.dataset.pageTransition;
      });
  }, []);

  useEffect(() => {
    const handlePopState = () => navigate(currentPath(), false);
    window.addEventListener("popstate", handlePopState);

    return () => window.removeEventListener("popstate", handlePopState);
  }, [navigate]);

  useEffect(() => {
    document.title = isGearPage
      ? "장비 — xitora"
      : "xitora — 디자이너 & 개발자";
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
      <CyberScrollbar />
      <GlobalCursor />
    </>
  );
}

export default App;
