export type ProjectCategory =
  | "Product"
  | "Web"
  | "Tool"
  | "Mobile"
  | "Experiment";

export type ProjectVisual =
  | "signal"
  | "portrait"
  | "blueprint"
  | "void"
  | "paper"
  | "grid"
  | "banner"
  | "orbit";

export interface Project {
  id: string;
  index: string;
  title: string;
  year: string;
  category: ProjectCategory[];
  label: string;
  summary: string;
  description: string;
  stack: string[];
  visual: ProjectVisual;
  size: "wide" | "compact" | "half";
  href?: string;
}

/*
 * 새 프로젝트를 추가할 때 이 배열에 항목 하나만 더하면 됩니다.
 * category는 필터에, visual과 size는 카드 표현에 자동으로 반영됩니다.
 */
export const projects: Project[] = [
  {
    id: "chunitora",
    index: "01",
    title: "Chunitora",
    year: "2026",
    category: ["Product", "Web"],
    label: "RHYTHM GAME PLATFORM",
    summary: "플레이 기록과 커뮤니티를 하나의 흐름으로 연결한 리듬게임 플랫폼.",
    description:
      "복잡한 기록은 빠르게 읽히고, 사람 사이의 교류는 자연스럽게 이어지도록 정보 구조와 인터랙션을 함께 설계했습니다.",
    stack: ["Product Design", "TypeScript", "Community"],
    visual: "signal",
    size: "wide",
    href: "https://chuni.xitora.cc",
  },
  {
    id: "arius",
    index: "02",
    title: "ARiUS",
    year: "2026",
    category: ["Web", "Experiment"],
    label: "ARTIST EXPERIENCE",
    summary: "음악과 비주얼 아이덴티티를 한 호흡으로 경험하는 아티스트 웹 공간.",
    description:
      "콘텐츠보다 장식이 앞서지 않도록 타이포그래피, 움직임, 여백의 밀도를 조율해 고유한 무드를 웹으로 번역했습니다.",
    stack: ["Art Direction", "Motion", "Web"],
    visual: "void",
    size: "compact",
    href: "https://arius.xitora.cc",
  },
  {
    id: "smart-cafe",
    index: "03",
    title: "Smart Cafe",
    year: "2026",
    category: ["Product", "Web"],
    label: "AI OPERATIONS",
    summary: "수요 예측으로 재고, 폐기량, 운영 리포트를 연결하는 관리 플랫폼.",
    description:
      "매일 쌓이는 운영 데이터를 행동 가능한 정보로 바꾸는 데 집중했습니다. 예측 결과와 현황을 같은 화면에서 비교할 수 있습니다.",
    stack: ["Dashboard", "Forecasting", "Data UI"],
    visual: "blueprint",
    size: "compact",
  },
  {
    id: "xitora-main",
    index: "04",
    title: "xitora.cc",
    year: "2026",
    category: ["Web", "Experiment"],
    label: "DIGITAL IDENTITY",
    summary: "코드와 이미지 사이에서 계속 갱신되는 xitora의 디지털 정체성.",
    description:
      "한 가지 형식에 고정되지 않는 작업을 담기 위해, 강한 시각 언어와 유연한 아카이브 구조를 함께 구축했습니다.",
    stack: ["Identity", "Interaction", "Editorial"],
    visual: "portrait",
    size: "wide",
    href: "https://xitora.cc",
  },
  {
    id: "toolkit",
    index: "05",
    title: "xitora Tools",
    year: "2026",
    category: ["Tool", "Web"],
    label: "UTILITY COLLECTION",
    summary: "반복 작업을 한 번의 실행으로 줄이는 작고 빠른 웹 도구 모음.",
    description:
      "설명서 없이도 바로 쓸 수 있는 도구를 목표로, 단순한 흐름과 즉각적인 피드백을 중심에 두었습니다.",
    stack: ["JavaScript", "Utility", "Automation"],
    visual: "grid",
    size: "half",
    href: "https://tools.xitora.cc",
  },
  {
    id: "card",
    index: "06",
    title: "xitora Card",
    year: "2026",
    category: ["Product", "Web"],
    label: "PERSONAL HUB",
    summary: "링크와 프로필을 한 화면에 정리한 가볍고 직접적인 개인 허브.",
    description:
      "작은 화면에서도 중요한 링크가 먼저 보이도록 계층을 정리하고, 개인의 분위기는 남길 수 있는 카드형 경험을 만들었습니다.",
    stack: ["Responsive", "Information Design", "Web"],
    visual: "paper",
    size: "half",
    href: "https://card.xitora.cc",
  },
  {
    id: "mobile-companion",
    index: "07",
    title: "Mobile Companion",
    year: "2026",
    category: ["Mobile", "Product"],
    label: "NATIVE APP",
    summary: "웹에서 이어진 경험을 손안의 빠른 흐름으로 재구성한 모바일 컴패니언.",
    description:
      "자주 확인하는 정보와 짧은 행동을 중심으로 화면을 줄이고, 이동 중에도 부담 없이 사용할 수 있는 구조를 탐구했습니다.",
    stack: ["Kotlin", "Mobile UX", "Prototype"],
    visual: "orbit",
    size: "half",
  },
  {
    id: "beyond-the-stars",
    index: "08",
    title: "Beyond the Stars",
    year: "2026",
    category: ["Experiment", "Web"],
    label: "WEB EXPERIMENT",
    summary: "공간감, 빛, 움직임으로 이야기를 전개하는 인터랙티브 웹 실험.",
    description:
      "읽는 페이지와 보는 장면 사이의 경계를 탐색했습니다. 스크롤 리듬에 맞춰 장면과 정보의 밀도가 달라집니다.",
    stack: ["Creative Coding", "Motion", "Narrative"],
    visual: "banner",
    size: "half",
  },
];

export const projectFilters = [
  "All",
  "Product",
  "Web",
  "Tool",
  "Mobile",
  "Experiment",
] as const;

export type ProjectFilter = (typeof projectFilters)[number];
