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
    category: "Mouse",
    name: "VXE MAD R MAJOR+",
    detail: "-",
  },
  {
    index: "02",
    category: "Keyboard",
    name: "우팅 60HE+",
    detail: "Geonworks Raptor HE switches",
  },
  {
    index: "03",
    category: "Mouse pad",
    name: "겜용이 GB5050 브레이킹",
    detail: "-",
  },
  {
    index: "04",
    category: "In-ear monitors",
    name: "수월우 카토",
    detail: "Cable: Moondrop Line K",
  },
  {
    index: "05",
    category: "Microphone",
    name: "슈어 SM7B",
    detail: "-",
  },
  {
    index: "06",
    category: "Audio interface",
    name: "오디언트 ID14 mk2",
    detail: "-",
  },
  {
    index: "07",
    category: "Mic preamp",
    name: "트리톤 FetHead Germanium",
    detail: "-",
  },
  {
    index: "08",
    category: "Speakers",
    name: "에디파이어 MR4",
    detail: "-",
  },
];
