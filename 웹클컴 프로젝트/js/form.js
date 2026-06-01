const defaultChoices = ['매우 그렇다', '그렇다', '별로 아니다', '전혀 아니다'];

const questionPool = [
  // ── 공통 적합도 ──
  {
    id: 'C1',
    pool: [
      {
        q: '에러가 발생했을 때 나는?',
        choices: [
          '끝까지 원인을 찾는다',
          '일단 검색부터 한다',
          '주변에 물어본다',
          '포기하고 싶다',
        ],
      },
      {
        q: '문제가 생겼을 때 나는?',
        choices: [
          '직접 해결책을 찾는다',
          '비슷한 사례를 검색한다',
          '도움을 요청한다',
          '그냥 넘기고 싶다',
        ],
      },
      {
        q: '예상치 못한 오류를 만나면 나는?',
        choices: [
          '원인을 분석하고 해결한다',
          '검색으로 해답을 찾는다',
          '아는 사람에게 묻는다',
          '의욕이 사라진다',
        ],
      },
    ],
    field: '공통',
    weight: 1,
  },

  {
    id: 'C2',
    pool: [
      {
        q: '모르는 개념이 생기면 나는?',
        choices: [
          '직접 찾아서 이해한다',
          '나중에 보려고 메모만 한다',
          '아는 사람에게 묻는다',
          '그냥 넘어간다',
        ],
      },
      {
        q: '이해가 안 되는 내용이 있으면 나는?',
        choices: [
          '끝까지 파고들어 이해한다',
          '대략 이해하고 넘어간다',
          '설명해줄 사람을 찾는다',
          '포기한다',
        ],
      },
      {
        q: '새로운 것을 배울 때 나는?',
        choices: [
          '스스로 공부하며 익힌다',
          '강의나 자료를 찾아본다',
          '누군가 가르쳐주길 기다린다',
          '배우는 것이 귀찮다',
        ],
      },
    ],
    field: '공통',
    weight: 1,
  },

  {
    id: 'C3',
    pool: [
      {
        q: '반복적인 작업이 생기면 나는?',
        choices: [
          '자동화 방법을 찾는다',
          '그냥 반복한다',
          '누가 해줬으면 한다',
          '금방 지친다',
        ],
      },
      {
        q: '매번 같은 과정을 반복해야 할 때 나는?',
        choices: [
          '더 효율적인 방법을 고민한다',
          '익숙해진다',
          '다른 사람에게 맡기고 싶다',
          '하기 싫어진다',
        ],
      },
      {
        q: '같은 일을 여러 번 해야 할 때 나는?',
        choices: [
          '한 번에 처리할 방법을 만든다',
          '묵묵히 반복한다',
          '도움받을 방법을 찾는다',
          '의욕이 떨어진다',
        ],
      },
    ],
    field: '공통',
    weight: 1,
  },

  {
    id: 'C4',
    pool: [
      { q: '논리적으로 문제를 푸는 것이 좋다', choices: defaultChoices },
      {
        q: '복잡한 문제를 단계별로 쪼개어 푸는 게 재미있다',
        choices: defaultChoices,
      },
      {
        q: '이유를 따져가며 결론을 내리는 과정이 즐겁다',
        choices: defaultChoices,
      },
    ],
    field: '공통',
    weight: 1,
  },

  {
    id: 'C5',
    pool: [
      { q: '새로운 기술이나 트렌드에 관심이 많다', choices: defaultChoices },
      { q: '최신 기술 뉴스를 즐겨 찾아본다', choices: defaultChoices },
      {
        q: '새로운 도구나 방법이 나오면 써보고 싶어진다',
        choices: defaultChoices,
      },
    ],
    field: '공통',
    weight: 1,
  },

  // ── 웹 프론트엔드 ──
  {
    id: 'W1',
    pool: [
      { q: '결과물이 눈에 바로 보이는 것이 좋다', choices: defaultChoices },
      {
        q: '내가 만든 것이 화면에 바로 나타날 때 뿌듯하다',
        choices: defaultChoices,
      },
      {
        q: '작업 결과를 즉시 눈으로 확인할 수 있으면 좋겠다',
        choices: defaultChoices,
      },
    ],
    field: '웹',
    weight: 2,
  },

  {
    id: 'W2',
    pool: [
      {
        q: '사용자가 쓰기 편한 화면을 만드는 것이 좋다',
        choices: defaultChoices,
      },
      {
        q: '사람들이 편리하게 사용하는 서비스를 만들고 싶다',
        choices: defaultChoices,
      },
      { q: '디자인과 기능 둘 다 신경 쓰는 편이다', choices: defaultChoices },
    ],
    field: '웹',
    weight: 2,
  },

  // ── AI / 데이터 ──
  {
    id: 'A1',
    pool: [
      { q: '데이터 분석과 통계가 흥미롭다', choices: defaultChoices },
      {
        q: '숫자나 데이터에서 의미를 찾는 게 재미있다',
        choices: defaultChoices,
      },
      {
        q: '통계나 그래프를 보면 자세히 들여다보게 된다',
        choices: defaultChoices,
      },
    ],
    field: 'AI',
    weight: 2,
  },

  {
    id: 'A2',
    pool: [
      { q: '패턴을 찾거나 예측하는 것이 흥미롭다', choices: defaultChoices },
      { q: '데이터 속에서 규칙을 찾아내는 게 좋다', choices: defaultChoices },
      {
        q: '과거 데이터를 보고 미래를 예측하는 것이 흥미롭다',
        choices: defaultChoices,
      },
    ],
    field: 'AI',
    weight: 2,
  },

  // ── 백엔드 / 서버 ──
  {
    id: 'B1',
    pool: [
      { q: '서버 구조나 API 설계가 흥미롭다', choices: defaultChoices },
      {
        q: '눈에 보이지 않는 시스템 구조를 설계하는 게 재미있다',
        choices: defaultChoices,
      },
      {
        q: '데이터가 어떻게 흘러가는지 이해하고 싶다',
        choices: defaultChoices,
      },
    ],
    field: '백엔드',
    weight: 2,
  },

  {
    id: 'B2',
    pool: [
      {
        q: '많은 사람이 동시에 사용해도 안정적인 시스템에 관심이 있다',
        choices: defaultChoices,
      },
      {
        q: '서비스가 빠르고 안정적으로 동작하는 것이 중요하다고 생각한다',
        choices: defaultChoices,
      },
      {
        q: '데이터베이스 구조나 서버 성능에 흥미가 있다',
        choices: defaultChoices,
      },
    ],
    field: '백엔드',
    weight: 2,
  },

  // ── 임베디드 / 하드웨어 ──
  {
    id: 'E1',
    pool: [
      {
        q: '기계나 회로가 어떻게 동작하는지 궁금하다',
        choices: defaultChoices,
      },
      {
        q: '전자 기기 내부가 어떻게 작동하는지 관심이 있다',
        choices: defaultChoices,
      },
      {
        q: '하드웨어와 소프트웨어가 어떻게 연결되는지 흥미롭다',
        choices: defaultChoices,
      },
    ],
    field: '임베디드',
    weight: 2,
  },

  {
    id: 'E2',
    pool: [
      {
        q: '로봇이나 IoT 기기를 직접 만들어보고 싶다',
        choices: defaultChoices,
      },
      {
        q: '센서나 모터 같은 장치를 코드로 제어하는 것이 흥미롭다',
        choices: defaultChoices,
      },
      {
        q: '물리적인 기계를 프로그래밍으로 움직이는 것이 재미있을 것 같다',
        choices: defaultChoices,
      },
    ],
    field: '임베디드',
    weight: 2,
  },

  // ── 보안 ──
  {
    id: 'S1',
    pool: [
      { q: '취약점을 찾거나 방어하는 것이 흥미롭다', choices: defaultChoices },
      { q: '해킹 방어나 보안 시스템에 관심이 있다', choices: defaultChoices },
      {
        q: '시스템의 허점을 찾아내는 과정이 재미있을 것 같다',
        choices: defaultChoices,
      },
    ],
    field: '보안',
    weight: 2,
  },

  {
    id: 'S2',
    pool: [
      {
        q: '꼼꼼하게 확인하고 규칙을 잘 지키는 편이다',
        choices: defaultChoices,
      },
      { q: '작은 실수도 놓치지 않으려는 성격이다', choices: defaultChoices },
      { q: '세밀하고 꼼꼼한 작업을 잘 견디는 편이다', choices: defaultChoices },
    ],
    field: '보안',
    weight: 2,
  },

  // ── 앱 개발 ──
  {
    id: 'M1',
    pool: [
      { q: '모바일 앱을 직접 만들어보고 싶다', choices: defaultChoices },
      {
        q: '내 손으로 앱을 만들어 사람들이 쓰게 하고 싶다',
        choices: defaultChoices,
      },
      { q: '스마트폰 앱 개발에 관심이 있다', choices: defaultChoices },
    ],
    field: '앱',
    weight: 2,
  },

  {
    id: 'M2',
    pool: [
      {
        q: '사람들이 매일 쓰는 서비스를 만드는 것이 목표다',
        choices: defaultChoices,
      },
      {
        q: '내가 만든 것을 많은 사람이 사용하면 좋겠다',
        choices: defaultChoices,
      },
      {
        q: '모바일 환경에서 좋은 경험을 주는 서비스에 관심이 있다',
        choices: defaultChoices,
      },
    ],
    field: '앱',
    weight: 2,
  },
];

const questions = questionPool.map((item) => {
  const picked = item.pool[Math.floor(Math.random() * item.pool.length)];
  return {
    q: picked.q,
    choices: picked.choices,
    field: item.field,
    weight: item.weight,
    id: item.id,
  };
});

let current = 0;
const answers = [];
const total = questions.length;

function handleBeforeUnload(e) {
  let hasAnswer = false;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i] !== undefined) {
      hasAnswer = true;
      break;
    }
  }
  if (hasAnswer) {
    e.preventDefault();
    e.returnValue = '';
  }
}
window.addEventListener('beforeunload', handleBeforeUnload);

function renderSeg() {
  const bar = document.getElementById('segBar');
  bar.innerHTML = '';
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div');
    if (i < current) {
      seg.className = 'seg done';
    } else if (i === current) {
      seg.className = 'seg current';
    } else {
      seg.className = 'seg';
    }
    bar.appendChild(seg);
  }
  document.getElementById('segLabel').textContent = current + 1 + ' / ' + total;
}

function render() {
  renderSeg();
  document.getElementById('qText').textContent = questions[current].q;

  const choicesEl = document.getElementById('choices');
  choicesEl.innerHTML = '';
  questions[current].choices.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'choice-btn' + (answers[current] === i ? ' selected' : '');
    btn.textContent = c;
    btn.addEventListener('click', () => {
      answers[current] = i;
      document
        .querySelectorAll('.choice-btn')
        .forEach((b) => b.classList.remove('selected'));
      btn.classList.add('selected');
      document.getElementById('warning').classList.remove('show');
    });
    btn.addEventListener('touchstart', () => {
      btn.style.opacity = '0.6';
    });
    btn.addEventListener('touchend', () => {
      btn.style.opacity = '1';
    });
    btn.addEventListener('touchcancel', () => {
      btn.style.opacity = '1';
    });
    choicesEl.appendChild(btn);
  });

  document.getElementById('prevBtn').style.visibility =
    current === 0 ? 'hidden' : 'visible';
  document.getElementById('nextBtn').textContent =
    current === total - 1 ? '결과 보기' : '다음 →';
}

function calcScores() {
  let raw = 0;
  let maxRaw = 0;
  answers.forEach((a, i) => {
    const w = questions[i].weight || 1;
    raw += (3 - a) * w;
    maxRaw += 3 * w;
  });

  const totalScore = Math.round(50 + (raw / maxRaw) * 50);

  const fieldScore = { 웹: 0, AI: 0, 백엔드: 0, 임베디드: 0, 보안: 0, 앱: 0 };
  const fieldMax = { 웹: 0, AI: 0, 백엔드: 0, 임베디드: 0, 보안: 0, 앱: 0 };
  questions.forEach((q, i) => {
    if (fieldScore[q.field] !== undefined) {
      const w = q.weight || 1;
      fieldScore[q.field] += (3 - answers[i]) * w;
      fieldMax[q.field] += 3 * w;
    }
  });

  const fieldResult = [];
  Object.keys(fieldScore).forEach((f) => {
    if (fieldMax[f] > 0) {
      const s = Math.round(50 + (fieldScore[f] / fieldMax[f]) * 50);
      fieldResult.push({ name: f, score: s });
    }
  });
  fieldResult.sort((a, b) => b.score - a.score);

  const answerSummary = questions.map((q, i) => ({
    q: q.q,
    a: q.choices[answers[i]],
    score: 3 - answers[i],
    field: q.field,
  }));

  return { totalScore, fieldResult, answerSummary };
}

function goNext() {
  if (answers[current] === undefined) {
    const warning = document.getElementById('warning');
    warning.classList.remove('show');
    setTimeout(() => {
      warning.classList.add('show');
    }, 10);
    return;
  }
  if (current < total - 1) {
    current++;
    render();
  } else {
    const unanswered = [];
    for (let i = 0; i < total; i++) {
      if (answers[i] === undefined) unanswered.push(i + 1);
    }
    if (unanswered.length > 0) {
      alert(unanswered.join(', ') + '번 문항에 아직 답하지 않았습니다.');
      current = unanswered[0] - 1;
      render();
      return;
    }

    const result = calcScores();
    const topFields = result.fieldResult.map((f) => f.name).join(',');
    const fscores = result.fieldResult.map((f) => f.score).join(',');
    const summary = encodeURIComponent(JSON.stringify(result.answerSummary));

    window.removeEventListener('beforeunload', handleBeforeUnload);
    location.href =
      'form_result.html?score=' +
      result.totalScore +
      '&fields=' +
      topFields +
      '&fscores=' +
      fscores +
      '&summary=' +
      summary;
  }
}

function goPrev() {
  if (current > 0) {
    current--;
    render();
  }
}

document.getElementById('prevBtn').addEventListener('click', goPrev);
document.getElementById('nextBtn').addEventListener('click', goNext);

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') goPrev();
  if (e.key === 'ArrowRight') goNext();
  if (e.key === 'Enter') {
    if (answers[current] !== undefined) goNext();
  }
  if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
    e.preventDefault();
    const choiceCount = questions[current].choices.length;
    let selected = answers[current] !== undefined ? answers[current] : -1;
    if (e.key === 'ArrowDown') {
      selected = selected < choiceCount - 1 ? selected + 1 : 0;
    } else {
      selected = selected > 0 ? selected - 1 : choiceCount - 1;
    }
    answers[current] = selected;
    document.querySelectorAll('.choice-btn').forEach((btn, i) => {
      btn.classList.toggle('selected', i === selected);
    });
  }
});

const origRender = render;
render = () => {
  history.pushState({ step: current }, '');
  origRender();
};

window.addEventListener('popstate', (e) => {
  if (e.state && e.state.step !== undefined) {
    current = e.state.step;
    origRender();
  } else if (current > 0) {
    current--;
    origRender();
  }
});

const overlay = document.getElementById('overlay');
document.getElementById('hamburgerBtn').addEventListener('click', () => {
  overlay.classList.add('open');
});
document.getElementById('closeBtn').addEventListener('click', () => {
  overlay.classList.remove('open');
});
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) overlay.classList.remove('open');
});

['prevBtn', 'nextBtn'].forEach((id) => {
  const btn = document.getElementById(id);
  btn.addEventListener('touchstart', () => {
    btn.style.opacity = '0.6';
  });
  btn.addEventListener('touchend', () => {
    btn.style.opacity = '1';
  });
  btn.addEventListener('touchcancel', () => {
    btn.style.opacity = '1';
  });
});

render();
