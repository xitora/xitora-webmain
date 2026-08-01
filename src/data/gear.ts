export interface GearItem {
  index: string;
  category: string;
  name: string;
  detail: string;
}

// Update name and detail when the actual gear models are available.
export const gearItems: GearItem[] = [
  {
    index: "01",
    category: "마우스",
    name: "VXE MAD R MAJOR+",
    detail: "-",
  },
  {
    index: "02",
    category: "키보드",
    name: "우팅 60HE+",
    detail: "Geonworks Raptor HE 스위치",
  },
  {
    index: "03",
    category: "마우스패드",
    name: "겜용이 GB5050 브레이킹",
    detail: "-",
  },
  {
    index: "04",
    category: "이어폰",
    name: "수월우 카토",
    detail: "케이블: Moondrop Line K",
  },
  {
    index: "05",
    category: "마이크",
    name: "슈어 SM7B",
    detail: "-",
  },
  {
    index: "06",
    category: "오디오 인터페이스",
    name: "오디언트 ID14 mk2",
    detail: "-",
  },
  {
    index: "07",
    category: "마이크 프리앰프",
    name: "트리톤 FetHead Germanium",
    detail: "-",
  },
  {
    index: "08",
    category: "스피커",
    name: "에디파이어 MR4",
    detail: "-",
  },
];
