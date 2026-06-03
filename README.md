# KMUCS MajorFair

국민대학교 소프트웨어융합대학 전공 탐색 박람회를 위한 정적 웹사이트입니다. 개발 직군 소개, 커리큘럼 안내, 미니게임, 적성검사 폼을 통해 신입생과 전공 탐색 중인 학생들이 소프트웨어 분야를 가볍게 체험할 수 있도록 구성했습니다.

## 실행 방법

별도 빌드 도구나 외부 라이브러리 없이 HTML, CSS, JavaScript만 사용합니다.

```text
웹클컴 프로젝트/pages/main.html
```

위 파일을 브라우저에서 열면 메인 페이지를 확인할 수 있습니다.

## 페이지 구성

- `pages/main.html`: 메인 페이지, 직군 소개, 체험 CTA
- `pages/team.html`: 팀 소개 및 팀원 GitHub 링크
- `pages/curriculum.html`: 학년별/역량별 커리큘럼 맵, 과목 소개 모달
- `pages/game.html`: 버그 잡기 게임, 버그 피하기 게임
- `pages/form.html`: 개발자 적성검사 설문 폼
- `pages/form-result.html`: 적성검사 결과 및 인쇄용 리포트

## 폴더 구조

```text
웹클컴 프로젝트/
├── pages/
│   ├── main.html
│   ├── team.html
│   ├── curriculum.html
│   ├── game.html
│   ├── form.html
│   └── form-result.html
└── assets/
    ├── css/
    │   ├── base.css
    │   ├── layout.css
    │   ├── components.css
    │   └── pages/
    ├── js/
    │   ├── common.js
    │   └── pages/
    ├── images/
    ├── logo/
    └── font/
```

## 주요 기능

- 공통 헤더와 모바일 메뉴
- 반응형 페이지 레이아웃
- 메인 hero 코드 모션 인터랙션
- 팀원 프로필 카드와 GitHub 아이콘 링크
- HTML/CSS 기반 커리큘럼 맵과 과목 모달
- 키보드/모바일 드래그를 지원하는 미니게임
- 실제 `<form>` 기반 적성검사와 결과 페이지
- `window.print()` 기반 인쇄용 결과 리포트

## 기술 스택

- HTML
- CSS
- Vanilla JavaScript

외부 프레임워크나 라이브러리는 사용하지 않았습니다.
