# 앱티핏 리빌딩

![Banner Image](./public/assets/aptifit.png)

> 실무에서 마주했던 문제들을 되짚고, 더 나은 설계로 다시 구현하는 프로젝트

|  |  |
| :--- | :---- |
| 프로젝트 기간 | 2026년 01월 03일 ~ 현재 진행 중 |
| 상세 문서 | [Notion 프로젝트 문서](https://jinuong.notion.site/2e0173d3ffd68082a574e109c6987c6a?source=copy_link) |

<br/>

## 프로젝트 동기

주식회사 앱티마이저의 메인 서비스 '앱티핏'을 개발하면서 풀지 못했던 문제들이 있었다.

| 기존 프로젝트에서의 문제 | 리빌딩에서의 접근 |
| :--- | :--- |
| 클라이언트 상태와 서버 상태의 경계가 모호해 불필요한 리렌더링 발생 | Zustand(클라이언트)와 TanStack Query(서버)로 역할을 명확히 분리 |
| 토큰 만료 시 사용자 경험이 끊기는 문제 | Middleware 레벨에서 Silent Refresh를 수행해 끊김 없는 인증 유지 |
| Server Action과 API Route의 사용 기준이 불명확 | 각각의 적합한 사용처를 정리하고 기준을 세워 적용 |
| 기능이 커질수록 컴포넌트 간 의존 관계가 복잡해짐 | Feature-Driven Architecture로 기능 단위의 독립적인 모듈 구성 |

본 프로젝트의 목적은 단순히 같은 것을 다시 만드는 것이 아니라, **프론트엔드 개발에서 마주치는 문제들을 어떻게 해결했는지**를 정리하는 것이다.

<br/>

## 기술 스택

| 분류 | 기술 | 선택 이유 |
| :--- | :--- | :--- |
| 프레임워크 | Next.js 16, React 19 | Server Component, Server Action 등 서버-클라이언트 경계를 명확히 다루기 위해 |
| 언어 | TypeScript | 타입 안전성 확보 및 개발 생산성 향상 |
| 서버 상태 관리 | TanStack Query | 캐싱, 무한스크롤, 서버 상태의 선언적 관리 |
| 클라이언트 상태 관리 | Zustand | 보일러플레이트 없이 간결한 전역 상태 관리 (모달, 사용자 정보) |
| 스타일링 | Tailwind CSS 4 | 유틸리티 기반의 빠른 UI 구성 |
| 유효성 검증 | Zod | FormData 파싱과 스키마 기반 런타임 검증 |
| 인증 | Jose (JWT) | 서버 환경에서의 토큰 생성/검증 |

<br/>

## 아키텍처

### 프로젝트 구조

```
├── app/                    # 라우트 전용 디렉토리
│   ├── (public)/           #   공개 라우트 (홈, 로그인)
│   ├── (private)/          #   인증 필요 라우트 (대시보드, 검사, 결과)
│   └── api/                #   API 레이어
│       ├── frontend/       #     프론트엔드 프록시 (인증 처리 위임)
│       ├── backend/        #     가상 백엔드 (비즈니스 로직)
│       └── database/       #     가상 데이터베이스 (JSON 기반)
├── feature/                # 기능별 독립 모듈 (login, register, logout 등)
├── entities/               # 도메인 엔티티 (test, product — type, ui, api, util)
├── widget/                 # 복합 UI 위젯 (NavigationBar, TestList 등)
└── shared/                 # 공통 유틸리티, 타입, 스토어, UI
```

**의존 방향**: `app` → `widget` / `feature` → `entities` → `shared`

상위 레이어는 하위 레이어를 참조할 수 있지만, 하위 레이어는 상위 레이어를 참조하지 않는다.

<br/>

### 기술적 의사결정

#### 1. 3-Layer API 구조

프론트엔드만으로 구성된 프로젝트이지만, 실제 서비스의 통신 구조를 재현하기 위해 API를 세 개의 레이어로 분리했다.

```
[Browser] → /api/frontend/* → /api/backend/* → /api/database/*
               프록시 서버          비즈니스 로직        데이터 저장소
```

- **frontend**: 브라우저에서의 요청을 받아 인증 처리를 위임하는 프록시
- **backend**: 토큰 검증, 비즈니스 로직 처리, 응답 생성
- **database**: JSON 파일 기반의 가상 DB (읽기/쓰기 유틸리티 포함)

이 구조를 통해 프론트엔드 개발자가 백엔드와 협업할 때 필요한 **통신 흐름, 에러 처리, 인증 위임** 등을 직접 경험하고 정리할 수 있었다.

#### 2. 다층 인증 플로우

인증은 하나의 레이어가 아니라 여러 레이어에서 협력한다.

```
[Middleware]  →  토큰 존재 여부 확인, Silent Refresh 수행
      ↓
[Server Client]  →  서버 컴포넌트에서 쿠키의 Access Token으로 직접 API 호출
[Browser Client]  →  클라이언트 컴포넌트에서 /api/frontend 프록시를 통해 호출
      ↓
[Server Action]  →  폼 제출 시 서버에서 인증 처리, 쿠키에 토큰 저장
```

- Access Token(1시간)은 httpOnly 쿠키에, 사용자 정보는 Zustand + localStorage에 저장
- Refresh Token(7일)이 유효한 동안 Middleware에서 자동으로 Access Token을 갱신
- 서버 컴포넌트는 `serverClient`로 직접 호출, 클라이언트 컴포넌트는 `browserClient`로 프록시를 경유

#### 3. Feature-Driven 모듈 구성

각 기능(로그인, 검사 제출, 주문 내역 등)을 독립적인 모듈로 구성했다.

```
feature/login/
├── action/     # Server Action (loginAction)
├── hook/       # 클라이언트 훅 (useLogin)
├── model/      # 타입, Zod 스키마
└── ui/         # UI 컴포넌트 (LoginForm)
```

- **action**: `'use server'` 디렉티브로 서버에서 실행되는 로직
- **hook**: `useActionState`로 Server Action의 상태를 관리하고 클라이언트 사이드 이펙트(라우팅, 스토어 업데이트)를 처리
- **model**: Zod 스키마로 FormData 검증, 타입 정의
- **ui**: 순수 UI 컴포넌트

기능이 추가되거나 변경될 때 해당 모듈만 수정하면 되므로 **변경의 영향 범위가 명확**하다.

#### 4. 상태 관리 전략

| 구분 | 도구 | 사용처 |
| :--- | :--- | :--- |
| 서버 상태 | TanStack Query | 검사 목록, 주문 내역, 상품 정보 등 API 데이터 |
| 클라이언트 상태 (휘발) | Zustand | 모달 열림/닫힘 상태 |
| 클라이언트 상태 (영속) | Zustand + persist | 로그인 사용자 정보 (localStorage) |
| 폼 상태 | useActionState | Server Action 기반 폼 제출 상태 |

서버에서 오는 데이터와 클라이언트에서만 필요한 데이터를 분리함으로써, 각각에 최적화된 캐싱 및 갱신 전략을 적용할 수 있었다.

<br/>

## 주요 기능

| 기능 | 설명 |
| :--- | :--- |
| 로그인 / 회원가입 | Zod 스키마 기반 검증, Server Action을 통한 인증 처리 |
| 대시보드 | 구매한 검사 목록, 진행 상태(미시작/진행중/완료) 요약 |
| 검사 구매 | 상품 목록 조회, 주문 처리 |
| 검사 진행 | 섹션별(강점/흥미/성격/가치/지식) 단계적 검사 수행 |
| 결과 조회 | 완료된 검사의 결과 확인 |
| 주문 내역 | TanStack Query 무한스크롤로 주문 이력 조회 |

<br/>

## 실행 방법

```bash
git clone https://github.com/jinuscript/aptifit-rebuilding.git
cd aptifit-rebuilding
npm install
npm run dev
```

`.env` 파일이 필요합니다:

```
BASE_URL=http://localhost:3000/api
JWT_SECRET=JWT_SECRET
```

<br/>

## 진행 상황

- [x] 인증 시스템 (로그인, 회원가입, 로그아웃, Silent Refresh)
- [x] 대시보드 (검사 목록, 요약 통계)
- [x] 검사 구매 및 주문 내역
- [x] 검사 진행 및 결과 조회
- [ ] 반응형 UI 보완
- [ ] 테스트 코드 작성
