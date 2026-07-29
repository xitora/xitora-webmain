# xitora — Digital Maker

흰색, 검은색, 진한 파랑의 세 가지 색과 거친 입자감을 중심으로 만든 xitora 포트폴리오입니다.

## 실행

```bash
npm install
npm run dev
```

프로덕션 빌드는 `npm run build`로 확인합니다.

## 프로젝트 추가

프로젝트 콘텐츠는 `src/data/projects.ts` 한 곳에서 관리합니다. `projects` 배열에 새 객체를 추가하면 필터, 카드, 상세 다이얼로그에 자동 반영됩니다.

- `category`: 프로젝트 필터
- `visual`: 카드의 비주얼 스타일
- `size`: 데스크톱 그리드 크기
- `href`: 공개 링크가 있을 때만 입력

## 이미지

- `hero-banner.png`, `profile-art.png`: xitora 제공 원본
- `signal-field.png`: 첨부 이미지의 색상과 입자감만 참고해 생성한 추상 배경
- `noise.svg`: 모든 주요 배경 이미지 위에 겹쳐지는 노이즈 레이어
