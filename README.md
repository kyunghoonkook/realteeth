## 프로젝트 실행 방법

### 의존성 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`으로 접속하면 됩니다.

### 빌드

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

---

## 구현한 기능

### 현재 위치 기반 날씨 조회
앱에 처음 들어오면 브라우저의 Geolocation API를 통해 현재 위치를 감지하고, 그 위치의 날씨 정보를 바로 보여줍니다. 위치 권한이 거부되면 서울시청 좌표를 기본값으로 사용합니다.

### 장소 검색
시, 군, 구, 동 어떤 단위로든 검색할 수 있습니다. "서울특별시", "종로구", "청운동" 처럼 자유롭게 검색하면 매칭되는 장소 목록이 나타나고, 선택하면 해당 위치의 날씨를 조회합니다. 검색 데이터는 제공된 `korea_districts.json` 파일을 활용했습니다.

### 날씨 정보 표시
- 현재 기온과 체감 온도
- 당일 최저/최고 기온
- 시간별 기온 예보 (3시간 간격, 24시간)
- 5일간 일별 예보
- 습도, 풍속, 일출/일몰 시간

### 즐겨찾기
자주 확인하는 장소를 최대 6개까지 즐겨찾기에 추가할 수 있습니다. 각 즐겨찾기 카드에는 현재 날씨와 최저/최고 기온이 표시되고, 클릭하면 상세 페이지로 이동합니다. 별칭 수정과 삭제도 가능합니다. 즐겨찾기 데이터는 localStorage에 저장되어 브라우저를 닫아도 유지됩니다.

### 반응형 디자인
데스크탑과 모바일 환경 모두에서 최적화된 UI를 제공합니다.

---

## 기술적 의사결정 및 이유

### FSD (Feature Sliced Design) 아키텍처
프로젝트의 확장성과 유지보수성을 고려해서 FSD 아키텍처를 적용했습니다. 레이어별로 명확한 책임을 나누어서 코드의 의존성 방향이 일관되게 유지됩니다.

```
src/
├── app/          # 앱 초기화, 프로바이더, 라우팅
├── pages/        # 라우트별 페이지 컴포넌트
├── widgets/      # 독립적인 UI 블록 (검색바, 날씨카드 등)
├── features/     # 사용자 상호작용 기능 (검색, 즐겨찾기 등)
├── entities/     # 비즈니스 엔티티 (location, weather)
└── shared/       # 공유 유틸리티, UI 컴포넌트, API
```

### Tanstack Query
서버 상태 관리에 Tanstack Query를 사용했습니다. 자동 캐싱, 백그라운드 리페치, 에러 처리 등을 선언적으로 처리할 수 있어서 날씨 데이터를 효율적으로 관리할 수 있었습니다. 같은 좌표의 날씨 정보는 5분간 캐시됩니다.

### OpenWeatherMap API
무료 tier에서도 충분한 기능을 제공하고, 한국어 응답을 지원해서 선택했습니다. Current Weather와 5-day Forecast API를 조합해서 사용했습니다.

### 검색 구현 방식
제공된 JSON 데이터가 단순 문자열 배열이라서 별도의 좌표 정보가 없었습니다. 검색어로 선택한 장소를 OpenWeatherMap의 Geocoding API에 전달해서 좌표를 얻는 방식으로 해결했습니다.

### localStorage 활용
즐겨찾기 데이터는 별도의 백엔드 없이 localStorage에 저장합니다. 브라우저별로 독립적인 데이터가 유지되고, 간단한 CRUD 작업에 적합합니다.

---

## 사용한 기술 스택

| 구분 | 기술 |
|------|------|
| **Framework** | React 18 |
| **Language** | TypeScript |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS |
| **State Management** | Tanstack Query v5 |
| **Routing** | React Router v6 |
| **Icons** | Lucide React |
| **Weather API** | OpenWeatherMap |

---

## 폴더 구조

```
src/
├── app/
│   ├── providers/       # QueryClient 등 프로바이더
│   ├── router/          # 라우팅 설정
│   ├── styles/          # 전역 스타일
│   └── App.tsx
├── pages/
│   ├── home/            # 메인 페이지
│   └── detail/          # 상세 페이지
├── widgets/
│   ├── search-bar/      # 검색 위젯
│   ├── weather-display/ # 날씨 표시 위젯
│   ├── favorite-card/   # 즐겨찾기 카드
│   └── favorites-list/  # 즐겨찾기 목록
├── features/
│   ├── search-location/ # 장소 검색 기능
│   ├── get-weather/     # 날씨 조회 기능
│   ├── get-location/    # 위치 감지 기능
│   └── manage-favorites/# 즐겨찾기 관리 기능
├── entities/
│   ├── location/        # 위치 엔티티
│   └── weather/         # 날씨 엔티티
├── shared/
│   ├── api/             # API 클라이언트
│   ├── config/          # 환경 설정
│   ├── lib/             # 유틸리티 함수
│   └── ui/              # 공통 UI 컴포넌트
└── main.tsx
```
