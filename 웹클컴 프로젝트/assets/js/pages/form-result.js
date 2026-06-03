const logoMap = {
  'AhnLab.svg': '../assets/images/AhnLab.svg',
  'Coupang.svg': '../assets/images/Coupang.svg',
  'Hyundai_Mobis.svg': '../assets/images/Hyundai_Mobis.svg',
  'Kakao.svg': '../assets/images/Kakao.svg',
  'Krafton_Logo.svg': '../assets/images/Krafton_Logo.svg',
  'LG_Electronics_logo.svg': '../assets/images/LG_Electronics_logo.svg',
  'LIG_Nex1.svg': '../assets/images/LIG_Nex1.svg',
  'LINE.svg': '../assets/images/LINE.svg',
  'Logo_of_Kakao_Games.png': '../assets/images/Logo_of_Kakao_Games.png',
  'Naver.svg': '../assets/images/Naver.svg',
  'Nexon.svg': '../assets/images/Nexon.svg',
  'Samsung_Electronics.svg': '../assets/images/Samsung_Electronics.svg',
  'sk_shielders.svg': '../assets/images/sk_shielders.svg',
  'Toss-logo.svg': '../assets/images/Toss-logo.svg',
  'wooah_brothers.svg': '../assets/images/wooah_brothers.svg',
};

const fields = [
  {
    id: '웹',
    icon: '🌐',
    name: '웹 프론트엔드',
    desc: 'HTML/CSS/JS로 사용자 화면을 만드는 분야. 결과물이 눈에 바로 보여서 성취감이 높아요.',
    companies: [
      { init: 'N', name: '네이버', logo: 'Naver.svg' },
      { init: 'K', name: '카카오', logo: 'Kakao.svg' },
      { init: 'T', name: '토스', logo: 'Toss-logo.svg' },
      { init: 'C', name: '쿠팡', logo: 'Coupang.svg' },
      { init: 'L', name: '라인', logo: 'LINE.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '이다원 교수님 랩실',
        link: 'https://w-dlee.github.io/',
      },
      {
        init: 'L',
        name: '윤상민 교수님 랩실',
        link: 'https://kookmin-hci.github.io/home/',
      },
    ],
  },
  {
    id: 'AI',
    icon: '🤖',
    name: 'AI / 데이터',
    desc: '머신러닝, 빅데이터, 분석을 다루는 분야. AI 시대의 핵심 직군이에요.',
    companies: [
      { init: 'N', name: '네이버', logo: 'Naver.svg' },
      { init: 'K', name: '카카오', logo: 'Kakao.svg' },
      { init: 'S', name: '삼성전자', logo: 'Samsung_Electronics.svg' },
      { init: 'L', name: 'LG전자', logo: 'LG_Electronics_logo.svg' },
      { init: 'K', name: '크래프톤', logo: 'Krafton_Logo.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '권은지 교수님 랩실',
        link: 'https://eaiclab.netlify.app/src/research',
      },
      {
        init: 'L',
        name: '김민규 교수님 랩실',
        link: 'https://mingyukim87.github.io/POML/',
      },
    ],
  },
  {
    id: '백엔드',
    icon: '⚙️',
    name: '백엔드 / 서버',
    desc: '서버, DB, API를 구축하는 분야. 눈에 보이지 않지만 서비스의 핵심을 담당해요.',
    companies: [
      { init: 'L', name: '라인', logo: 'LINE.svg' },
      { init: 'B', name: '배달의민족', logo: 'wooah_brothers.svg' },
      { init: 'C', name: '쿠팡', logo: 'Coupang.svg' },
      { init: 'K', name: '카카오', logo: 'Kakao.svg' },
      { init: 'T', name: '토스', logo: 'Toss-logo.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '임세민 교수님 랩실',
        link: 'http://mi.kookmin.ac.kr/',
      },
      {
        init: 'L',
        name: '박수현 교수님 랩실',
        link: 'https://scrc.kookmin.ac.kr/scrc/etc-board/system-development.do',
      },
    ],
  },
  {
    id: '임베디드',
    icon: '🔧',
    name: '임베디드 / 하드웨어',
    desc: '센서, 로봇, IoT 등 하드웨어와 소프트웨어를 연결하는 분야예요.',
    companies: [
      { init: 'S', name: '삼성전자', logo: 'Samsung_Electronics.svg' },
      { init: 'L', name: 'LG전자', logo: 'LG_Electronics_logo.svg' },
      { init: 'H', name: '현대모비스', logo: 'Hyundai_Mobis.svg' },
      { init: 'N', name: 'LIG넥스원', logo: 'LIG_Nex1.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '안인규 교수님 랩실',
        link: 'https://mairlab-km.github.io/',
      },
      {
        init: 'L',
        name: '김상철 교수님 랩실',
        link: 'https://sites.google.com/kookmin.ac.kr/mclab/home',
      },
    ],
  },
  {
    id: '보안',
    icon: '🔒',
    name: '보안',
    desc: '시스템 보안, 네트워크 방어를 다루는 분야. 꼼꼼하고 탐구적인 성향에 잘 맞아요.',
    companies: [
      { init: 'S', name: 'SK쉴더스', logo: 'sk_shielders.svg' },
      { init: 'A', name: '안랩', logo: 'AhnLab.svg' },
      { init: 'N', name: '네이버', logo: 'Naver.svg' },
      { init: 'K', name: '카카오', logo: 'Kakao.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '윤명근 교수님 랩실',
        link: 'https://infosec.kookmin.ac.kr/infosec/index.do',
      },
      {
        init: 'L',
        name: '박수현 교수님 랩실',
        link: 'https://scrc.kookmin.ac.kr/scrc/etc-board/system-development.do',
      },
    ],
  },
  {
    id: '앱',
    icon: '📱',
    name: '앱 개발',
    desc: 'iOS, 안드로이드 앱을 만드는 분야. 모바일 친숙도가 높은 분에게 적합해요.',
    companies: [
      { init: 'K', name: '카카오', logo: 'Kakao.svg' },
      { init: 'T', name: '토스', logo: 'Toss-logo.svg' },
      { init: 'N', name: '넥슨', logo: 'Nexon.svg' },
      { init: 'G', name: '카카오게임즈', logo: 'Logo_of_Kakao_Games.png' },
      { init: 'K', name: '크래프톤', logo: 'Krafton_Logo.svg' },
    ],
    labs: [
      {
        init: 'L',
        name: '김장호 교수님 랩실',
        link: 'https://jangho-kim.github.io/#',
      },
      {
        init: 'L',
        name: '김준호 교수님 랩실',
        link: 'https://sites.google.com/kookmin.ac.kr/junho/home',
      },
    ],
  },
];

const types = [
  {
    min: 90,
    badge: '천재형 개발자',
    title: '타고난 개발자 DNA!',
    desc: '문제를 끝까지 파고드는 집중력과 논리적 사고가 뛰어나요. 개발자로서 필요한 태도와 성향이 잘 갖춰져 있어서 어떤 분야를 선택해도 빠르게 성장할 수 있을 거예요.',
    mentorNote:
      '자기 주도적 학습 능력이 높고 문제 해결 성향이 강함. 구체적인 분야 방향성 설정이 필요한 단계.',
  },
  {
    min: 70,
    badge: '성장형 개발자',
    title: '개발자의 감각이 있어요!',
    desc: '개발자적인 사고방식을 갖추고 있고 관심도 충분해요. 아직 경험이 부족할 수 있지만 조금씩 실습해나가면 금방 실력이 붙을 거예요.',
    mentorNote:
      '기본 성향은 갖춰져 있으나 실전 경험 부족. 입문 프로젝트나 학습 로드맵 안내가 효과적.',
  },
  {
    min: 50,
    badge: '탐색형',
    title: '개발, 생각보다 잘 맞을 수도 있어요!',
    desc: '아직 개발이 낯설게 느껴질 수 있지만 충분한 가능성이 있어요. 관심 있는 분야부터 가볍게 시작해보면 생각보다 잘 맞는다는 걸 느낄 수도 있어요.',
    mentorNote:
      '개발에 대한 경험이 적거나 자신감이 부족한 상태. 흥미 위주의 가벼운 입문 활동 권장.',
  },
  {
    min: 0,
    badge: '협력형',
    title: '개발자의 든든한 협력자형!',
    desc: '직접 개발보다는 개발자와 함께 일하는 기획, 디자인, PM 같은 역할이 더 잘 맞을 수 있어요. 개발을 이해하는 비개발 직군도 IT 업계에서 매우 중요한 역할이에요.',
    mentorNote:
      '개발 적합도보다 협업·기획 성향이 강함. IT 업계 내 비개발 직군(PM, UX, 기획) 방향 안내 고려.',
  },
];

// URL 파싱
const params = new URLSearchParams(location.search);
const score = parseInt(params.get('score')) || 70;
const topFields = params.get('fields')
  ? params.get('fields').split(',')
  : ['웹', 'AI', '백엔드'];
const fscores = params.get('fscores')
  ? params.get('fscores').split(',').map(Number)
  : [80, 70, 60, 50, 40, 30];

// 유형 판정
let type = types[types.length - 1];
for (let i = 0; i < types.length; i++) {
  if (score >= types[i].min) {
    type = types[i];
    break;
  }
}

document.getElementById('resultBadge').textContent = type.badge;
document.getElementById('resultTitle').textContent = type.title;
document.getElementById('resultDesc').textContent = type.desc;

// 점수 카운터 애니메이션 (토스 스타일)
const scoreEl = document.getElementById('resultScore');
let currentScore = 0;
const step = Math.ceil(score / 60);
const scoreTimer = setInterval(function () {
  currentScore += step;
  if (currentScore >= score) {
    currentScore = score;
    clearInterval(scoreTimer);
  }
  scoreEl.textContent = currentScore;
}, 20);

// 분야 정렬 및 별 계산
const sortedFields = fields.slice().sort(function (a, b) {
  let ai = topFields.indexOf(a.id);
  let bi = topFields.indexOf(b.id);
  if (ai === -1) ai = 999;
  if (bi === -1) bi = 999;
  return ai - bi;
});

function getStars(fieldId) {
  const idx = topFields.indexOf(fieldId);
  if (idx === 0) return '★★★';
  if (idx === 1) return '★★';
  if (idx === 2) return '★';
  return '';
}

// 아코디언 렌더
const recList = document.getElementById('recList');
const otherList = document.getElementById('otherList');

sortedFields.forEach(function (f, idx) {
  const stars = getStars(f.id);
  const isRec = stars !== '';
  const item = document.createElement('div');
  item.className = 'acc-item' + (idx === 0 ? ' open' : '');

  const nameClass = idx === 0 || isRec ? 'acc-name' : 'acc-name-c';
  const starsHtml = stars ? '<span class="acc-stars">' + stars + '</span>' : '';

  let chipsHtml = '';
  f.companies.forEach(function (c) {
    const logoHtml =
      c.logo && logoMap[c.logo]
        ? '<img src="' +
          logoMap[c.logo] +
          '" alt="' +
          c.name +
          '" class="chip-logo">'
        : '<div class="chip-dot">' + c.init + '</div>';
    chipsHtml +=
      '<div class="chip">' +
      logoHtml +
      c.name +
      '<div class="tooltip"><div class="tooltip-name">' +
      c.name +
      '</div><div class="tooltip-type">관련 기업</div></div></div>';
  });
  f.labs.forEach(function (l) {
    const linkAttr = l.link
      ? ' onclick="window.open(\'' + l.link + "', '_blank')\""
      : '';
    chipsHtml +=
      '<div class="chip"' +
      linkAttr +
      '><div class="chip-dot chip-lab">' +
      l.init +
      '</div>' +
      l.name +
      '<div class="tooltip"><div class="tooltip-name">' +
      l.name +
      '</div><div class="tooltip-type">연구실 방문 ↗</div></div></div>';
  });

  item.innerHTML =
    '<div class="acc-head">' +
    '<span class="' +
    nameClass +
    '">' +
    f.icon +
    ' ' +
    f.name +
    starsHtml +
    '</span>' +
    '<span class="acc-chev">∨</span>' +
    '</div>' +
    '<div class="acc-body">' +
    '<div class="acc-desc">' +
    f.desc +
    '</div>' +
    '<div class="chip-row">' +
    chipsHtml +
    '</div>' +
    '</div>';

  if (idx === 0) item.querySelector('.acc-chev').textContent = '∧';

  item.querySelector('.acc-head').addEventListener('click', function () {
    let isOpen = item.classList.contains('open');
    document.querySelectorAll('.acc-item').forEach(function (a) {
      a.classList.remove('open');
      a.querySelector('.acc-chev').textContent = '∨';
    });
    if (!isOpen) {
      item.classList.add('open');
      item.querySelector('.acc-chev').textContent = '∧';
    }
  });

  // 모바일 롱프레스
  item.querySelectorAll('.chip').forEach(function (chip) {
    let timer;
    chip.addEventListener('touchstart', function () {
      timer = setTimeout(function () {
        chip.classList.add('longpress');
      }, 500);
    });
    chip.addEventListener('touchend', function () {
      clearTimeout(timer);
      setTimeout(function () {
        chip.classList.remove('longpress');
      }, 1500);
    });
  });

  if (isRec) {
    recList.appendChild(item);
  } else {
    otherList.appendChild(item);
  }
});

// 멘토 리포트 생성 및 인쇄
function buildMentorReport() {
  const rptParams = new URLSearchParams(location.search);
  const summaryRaw = rptParams.get('summary');
  const answerSummary = summaryRaw
    ? JSON.parse(decodeURIComponent(summaryRaw))
    : [];

  const fieldNames = topFields;
  const fieldScores = rptParams.get('fscores')
    ? rptParams.get('fscores').split(',').map(Number)
    : [];

  let barRows = '';
  fieldNames.forEach(function (name, i) {
    let s = fieldScores[i] || 0;
    let filled = Math.round(s / 10);
    let bar = '';
    for (let b = 0; b < 10; b++) bar += b < filled ? '■' : '□';
    barRows +=
      '<tr><td class="rpt-field-name">' +
      name +
      '</td>' +
      '<td class="rpt-bar">' +
      bar +
      '</td>' +
      '<td class="rpt-score">' +
      s +
      '점</td></tr>';
  });

  let qRows = '';
  answerSummary.forEach(function (it, i) {
    qRows +=
      '<tr>' +
      '<td class="rpt-qnum">Q' +
      (i + 1) +
      '</td>' +
      '<td class="rpt-qtxt">' +
      it.q +
      '</td>' +
      '<td class="rpt-ans">' +
      it.a +
      '</td>' +
      '</tr>';
  });

  const today = new Date();
  const dateStr =
    today.getFullYear() +
    '.' +
    String(today.getMonth() + 1).padStart(2, '0') +
    '.' +
    String(today.getDate()).padStart(2, '0');
  const mentorNote = type.mentorNote || '';

  const reportHtml =
    '<div class="rpt-page rpt-front">' +
    '<div class="rpt-header">' +
    '<div class="rpt-title">개발자 적합도 검사 결과 리포트</div>' +
    '<div class="rpt-date">' +
    dateStr +
    ' &nbsp;|&nbsp; 국민대학교 소프트웨어학부</div>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">종합 결과</div>' +
    '<table class="rpt-summary-table"><tr>' +
    '<td><span class="rpt-badge">' +
    type.badge +
    '</span></td>' +
    '<td class="rpt-main-title">' +
    type.title +
    '</td>' +
    '<td class="rpt-main-score">' +
    score +
    '<span class="rpt-score-unit">점</span></td>' +
    '</tr></table>' +
    '<div class="rpt-type-desc">' +
    type.desc +
    '</div>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">분야별 점수</div>' +
    '<table class="rpt-bar-table">' +
    barRows +
    '</table>' +
    '<div class="rpt-bar-note">■ 채워진 칸이 많을수록 해당 분야 적합도가 높음 (10칸 = 100점)</div>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">문항별 응답</div>' +
    '<table class="rpt-q-table">' +
    qRows +
    '</table>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">멘토 참고 사항</div>' +
    '<div class="rpt-mentor-note">' +
    mentorNote +
    '</div>' +
    '<div class="rpt-comment-box"></div>' +
    '</div>' +
    '</div>' +
    '<div class="rpt-page rpt-back">' +
    '<div class="rpt-header">' +
    '<div class="rpt-title">상담 메모</div>' +
    '<div class="rpt-date">' +
    dateStr +
    '</div>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">추천 분야 및 다음 단계</div>' +
    '<div class="rpt-rec-box">' +
    '<div class="rpt-rec-label">주 추천 분야</div>' +
    '<div class="rpt-rec-fields">' +
    fieldNames.slice(0, 3).join(' &nbsp;/&nbsp; ') +
    '</div>' +
    '</div>' +
    '</div>' +
    '<div class="rpt-section">' +
    '<div class="rpt-section-title">추가 메모 및 상담 내용</div>' +
    '<div class="rpt-lines">' +
    (function () {
      let lines = '';
      for (let l = 0; l < 16; l++) lines += '<div class="rpt-line"></div>';
      return lines;
    })() +
    '</div>' +
    '</div>' +
    '</div>';

  return reportHtml;
}

document.getElementById('captureBtn').addEventListener('click', function () {
  document.getElementById('mentorReport').innerHTML = buildMentorReport();
  window.print();
});

// 다시 검사하기
document.getElementById('retryBtn').addEventListener('click', function () {
  location.href = 'form.html';
});

// 모바일 탭바 버튼
document.getElementById('retryBtnMob').addEventListener('click', function () {
  location.href = 'form.html';
});
document.getElementById('captureBtnMob').addEventListener('click', function () {
  document.getElementById('captureBtn').click();
});
