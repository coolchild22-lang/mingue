const curriculumCourses = [
  {
    program: 'software',
    track: '전공기초',
    year: '1학년 1학기',
    title: 'S-TEAM Class',
    required: true,
    desc: '소프트웨어 전공 학습을 시작하기 전 팀 활동과 문제 해결 방식을 익히는 입문형 수업입니다.'
  },
  {
    program: 'software',
    track: '전공기초',
    year: '1학년 1학기',
    title: '소프트웨어프로젝트 I',
    required: true,
    desc: '작은 서비스를 직접 만들며 기획, 구현, 발표까지의 기본 프로젝트 흐름을 경험합니다.'
  },
  {
    program: 'software',
    track: '전공기초',
    year: '1학년 2학기',
    title: '객체지향프로그래밍',
    required: true,
    desc: '클래스, 객체, 상속, 캡슐화 같은 개념을 통해 규모 있는 프로그램을 설계하는 방법을 배웁니다.'
  },
  {
    program: 'software',
    track: '전공기초',
    year: '2학년 1학기',
    title: '자료구조',
    required: true,
    desc: '리스트, 스택, 큐, 트리, 그래프 등 데이터를 효율적으로 저장하고 다루는 핵심 구조를 학습합니다.'
  },
  {
    program: 'software',
    track: '전공기초',
    year: '2학년 2학기',
    title: '데이터과학',
    required: false,
    desc: '데이터 수집과 정제, 탐색적 분석, 시각화의 기본 흐름을 익혀 데이터 기반 사고를 기릅니다.'
  },
  {
    program: 'software',
    track: '전공심화',
    year: '2학년 1학기',
    title: '컴퓨터구조',
    required: true,
    desc: 'CPU, 메모리, 명령어 처리 방식 등 컴퓨터가 실제로 프로그램을 실행하는 원리를 배웁니다.'
  },
  {
    program: 'software',
    track: '전공심화',
    year: '3학년 1학기',
    title: '데이터베이스',
    required: true,
    desc: '관계형 데이터 모델과 SQL, 정규화, 트랜잭션을 중심으로 서비스 데이터 설계의 기초를 다집니다.'
  },
  {
    program: 'software',
    track: '전공심화',
    year: '3학년 1학기',
    title: '알고리즘',
    required: true,
    desc: '정렬, 탐색, 동적 계획법, 그래프 알고리즘 등 문제를 효율적으로 해결하는 전략을 학습합니다.'
  },
  {
    program: 'software',
    track: '전공심화',
    year: '3학년 1학기',
    title: '운영체제',
    required: true,
    desc: '프로세스, 스레드, 메모리 관리, 파일 시스템을 통해 컴퓨터 자원 관리 원리를 이해합니다.'
  },
  {
    program: 'software',
    track: '전공심화',
    year: '3학년 1학기',
    title: '컴퓨터네트워크',
    required: true,
    desc: 'TCP/IP, 라우팅, 애플리케이션 프로토콜을 중심으로 인터넷 서비스가 연결되는 방식을 배웁니다.'
  },
  {
    program: 'software',
    track: '빅데이터·머신러닝',
    year: '3학년 2학기',
    title: '인공지능',
    required: false,
    desc: '탐색, 추론, 학습 모델의 기본 개념을 통해 지능형 소프트웨어의 토대를 이해합니다.'
  },
  {
    program: 'software',
    track: '미디어·엔터테인먼트',
    year: '3학년 2학기',
    title: '게임소프트웨어',
    required: false,
    desc: '게임 시스템 구조, 이벤트 처리, 그래픽 요소를 다루며 인터랙티브 콘텐츠 개발을 경험합니다.'
  },
  {
    program: 'software',
    track: 'IoT융합',
    year: '4학년 1학기',
    title: '시스템최신기술',
    required: false,
    desc: '임베디드, 클라우드, 분산 시스템 등 최신 시스템 기술의 흐름과 적용 사례를 살펴봅니다.'
  },
  {
    program: 'software',
    track: '웹·정보보호',
    year: '4학년 1학기',
    title: '웹서버컴퓨팅',
    required: false,
    desc: '웹 서버, 백엔드 로직, 요청 처리 구조를 이해하며 실제 웹 서비스 운영 관점을 익힙니다.'
  },
  {
    program: 'software',
    track: '엔터프라이즈SW',
    year: '4학년 2학기',
    title: '소프트웨어아키텍처',
    required: false,
    desc: '복잡한 소프트웨어를 모듈, 계층, 패턴 관점에서 설계하고 유지보수 가능한 구조를 고민합니다.'
  },
  {
    program: 'software',
    track: '실습형 교육',
    year: '3학년 / 4학년',
    title: '실전프로젝트 I / II',
    required: false,
    desc: '팀 기반으로 실제 문제를 정의하고 구현 결과물을 완성해보는 종합 프로젝트형 수업입니다.'
  },
  {
    program: 'ai',
    track: '전공기초',
    year: '1학년 1학기',
    title: 'S-TEAM Class',
    required: true,
    desc: 'AI와 데이터 분야 학습에 필요한 팀 기반 문제 해결 태도와 전공 탐색 경험을 쌓습니다.'
  },
  {
    program: 'ai',
    track: '전공기초',
    year: '1학년 2학기',
    title: '머신러닝기초',
    required: true,
    desc: '지도학습과 비지도학습의 기본 개념을 배우며 데이터로 예측 모델을 만드는 첫 단계를 경험합니다.'
  },
  {
    program: 'ai',
    track: '전공기초',
    year: '2학년 1학기',
    title: '자료구조',
    required: true,
    desc: 'AI 시스템 구현에 필요한 데이터 저장 방식과 기본 알고리즘 사고를 함께 다집니다.'
  },
  {
    program: 'ai',
    track: '전공기초',
    year: '2학년 2학기',
    title: '데이터과학',
    required: true,
    desc: '데이터 분석 프로젝트의 기본 흐름을 배우고, 통계와 시각화를 활용해 인사이트를 도출합니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '2학년 1학기',
    title: '딥러닝기초',
    required: true,
    desc: '신경망 구조와 학습 원리를 배우며 이미지, 텍스트 등 복잡한 데이터 처리의 기반을 다집니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '3학년 1학기',
    title: '인공지능플랫폼',
    required: false,
    desc: 'AI 서비스를 만들기 위한 개발 환경, 모델 배포, 플랫폼 활용 방식을 프로젝트 관점에서 다룹니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '3학년 1학기',
    title: '자연어처리',
    required: false,
    desc: '문장과 문서를 컴퓨터가 이해하도록 표현하고, 분류·검색·생성 모델의 기본 원리를 배웁니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '3학년 2학기',
    title: '컴퓨터비전',
    required: false,
    desc: '이미지와 영상에서 객체, 패턴, 의미를 인식하는 모델과 응용 사례를 학습합니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '4학년 1학기',
    title: '강화학습',
    required: false,
    desc: '보상과 행동 선택을 바탕으로 에이전트가 스스로 전략을 학습하는 방식을 다룹니다.'
  },
  {
    program: 'ai',
    track: '전공심화',
    year: '4학년 2학기',
    title: '생성형AI',
    required: false,
    desc: '대규모 언어 모델과 이미지 생성 모델의 원리, 활용 방식, 한계와 윤리적 쟁점을 함께 살펴봅니다.'
  },
  {
    program: 'ai',
    track: '실습형 교육',
    year: '3학년 / 4학년',
    title: '다학제간 캡스톤디자인',
    required: true,
    desc: '여러 전공 지식을 결합해 실제 산업 문제를 정의하고 AI 기반 해결책을 설계하는 프로젝트 수업입니다.'
  },
  {
    program: 'ai',
    track: '실습형 교육',
    year: '3학년 / 4학년',
    title: '샌드위치프로젝트',
    required: true,
    desc: '장기 인턴십 성격의 실무 연계 프로젝트로, 산업 현장의 데이터 문제를 직접 경험합니다.'
  }
];

const programLabels = {
  software: '소프트웨어학부',
  ai: 'AI빅데이터융합경영학과'
};

const courseCount = document.getElementById('courseCount');
const modal = document.getElementById('courseModal');
const modalMeta = document.getElementById('modalMeta');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');
const modalYear = document.getElementById('modalYear');
const modalTrack = document.getElementById('modalTrack');

function renderCourseCount() {
  courseCount.textContent = curriculumCourses.length;
}

function openCourseModal(course) {
  modalMeta.textContent = programLabels[course.program] + ' · ' + (course.required ? '전공선택필수' : '전공선택');
  modalTitle.textContent = course.title;
  modalDesc.textContent = course.desc;
  modalYear.textContent = course.year;
  modalTrack.textContent = course.track;
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
}

modal.querySelectorAll('[data-close-modal]').forEach((element) => {
  element.addEventListener('click', closeCourseModal);
});

document.querySelectorAll('.map-course[data-course]').forEach((courseButton) => {
  courseButton.addEventListener('click', () => {
    const course = curriculumCourses.find((item) => (
      item.program === courseButton.dataset.program && item.title === courseButton.dataset.course
    ));
    if (course) openCourseModal(course);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && !modal.hasAttribute('hidden')) {
    closeCourseModal();
  }
});

renderCourseCount();
