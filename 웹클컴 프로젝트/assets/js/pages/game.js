/* =============================================================================
 * game.js  —  게임 페이지 로직
 * 담당자 : 정원우
 *
 * 구조
 *   1) GameEngine     : 게임 공통 엔진 — 루프 / 타이머 / 점수 / 결과 / 최고점수
 *   2) MothCatchGame  : 나방 잡기 (버그 잡기)        ※ "게임 모듈 규약" 구현
 *   3) DodgeBulletGame: 버그 피하기 (방향키 탄막)     ※ "게임 모듈 규약" 구현
 *   4) GAME_REGISTRY  : 미니게임 등록소
 *   5) 부팅
 *
 * ── 게임 모듈 규약(interface) ──────────────────────────────────────────────
 *   {
 *     id          : string               // 고유 식별자
 *     name        : string               // 표시용 이름(페이지 제목)
 *     shortName   : string  [선택]        // 토글 버튼용 짧은 이름
 *     duration    : number               // 제한시간(초). Infinity면 생존형
 *     timeLabel   : string  [선택]        // 시간 라벨('남은 시간'/'생존 시간')
 *     infoHTML    : string  [선택]        // 게임 방법 본문(모드별 교체)
 *     setup(api)                          // 1회 초기화 (게임 로드 시)
 *     start(api)                          // 게임 시작
 *     update(dtMs, api)                   // 매 프레임 호출 (dtMs: 직전 프레임 경과 ms)
 *     teardown(api)                       // 정리 (캔버스/리스너/타이머 제거)
 *     onPointerDown(x, y, e, api)  [선택] // 캔버스 클릭/터치 시작 좌표 전달
 *     onPointerMove(x, y, e, api)  [선택] // 캔버스 드래그 좌표 전달
 *     onPointerUp(x, y, e, api)    [선택] // 캔버스 클릭/터치 종료 좌표 전달
 *     onKeyDown(e, api)            [선택] // 키 입력 (예: 방향키 게임)
 *     onKeyUp(e, api)              [선택]
 *     getResult(score)            [선택]  // 결과 뱃지/멘트 커스터마이즈
 *     loadHighScore() / saveHighScore(v) [선택] // 모드별 최고점수 저장소
 *   }
 *
 *   api:
 *     api.canvas              : 게임 캔버스 DOM
 *     api.addScore(n)         : 점수 가산
 *     api.endGame()           : 게임 강제 종료(예: 피격) — 생존형 게임이 사용
 *     api.getTimeLeft()       : 남은/생존 시간(초)
 *     api.getElapsedMs()      : 시작 후 경과(ms)
 *     api.getState()          : 현재 상태 스냅샷
 * ========================================================================== */


/* =============================================================================
 * 1) GameEngine — 게임 공통 엔진
 *    어떤 미니게임이든 동일한 루프/타이머/점수/결과/최고점수 처리를 제공한다.
 * ========================================================================== */
const GameEngine = (() => {

  /* ── 최고점수 (모드별) ─────────────────────────────────────────────────────
   * 최고점수는 게임 "모드별"로 따로 저장한다.
   *   각 게임 모듈이 loadHighScore()/saveHighScore(v)를 제공하면 거기에 위임한다.
   *     · 나방 잡기  : 변수 MothCatch_gameHighScore   → MothCatchGame
   *     · 버그 피하기: 변수 Danmaku_gameHighScore     → DodgeBulletGame
   *   제공하지 않는 게임은 아래 메모리 폴백(_memHigh)에 id별로 보관.
   * ------------------------------------------------------------------------ */
  const _memHigh = {};
  function getHigh(game) {
    if (game && typeof game.loadHighScore === 'function') return game.loadHighScore() || 0;
    return (game && _memHigh[game.id]) || 0;
  }
  function setHigh(game, value) {
    if (!game) return;
    if (typeof game.saveHighScore === 'function') { game.saveHighScore(value); return; }
    _memHigh[game.id] = value;
  }

  const state = {
    running: false,
    score: 0,
    highScore: 0,
    timeLeft: 0,     // 남은 시간(초) 또는 생존 시간(초, 생존형)
    totalTime: 0,    // 전체 제한시간(초). Infinity면 생존형(무한)
    elapsedMs: 0,    // 시작 후 경과(ms)
  };

  const dom = {};
  let activeGame = null;
  let rafId = null;
  let lastTs = 0;

  /* 게임 모듈에 넘겨줄 도구 모음 */
  const api = {
    get canvas() { return dom.canvas; },
    addScore,
    endGame: () => end(),  //  모듈이 직접 종료(피격 등)
    getTimeLeft: () => state.timeLeft,
    getElapsedMs: () => state.elapsedMs,
    getState: () => ({ ...state }),
  };

  function addScore(n) {
    state.score += n;
    updateHUD();
  }

  function updateHUD() {
    if (dom.score)     dom.score.textContent = state.score;
    if (dom.highScore) dom.highScore.textContent = state.highScore;
    if (dom.time)      dom.time.textContent = state.timeLeft;
  }

  function setControls(running) {
    if (dom.startBtn)  dom.startBtn.disabled  = running;
    if (dom.toggleBtn) dom.toggleBtn.disabled = running;
  }

  function clearCanvas() {
    if (dom.canvas) dom.canvas.innerHTML = '';
  }

  /* 미니게임 로드 (게임 전환 지점) */
  function loadGame(id) {
    activeGame = GAME_REGISTRY[id] || null;
    if (!activeGame) {
      console.error('[GameEngine] 등록되지 않은 게임 id:', id);
      return;
    }
    if (typeof activeGame.setup === 'function') activeGame.setup(api);

    state.totalTime = activeGame.duration;
    //  생존형(Infinity)은 0부터 카운트업, 일반 게임은 제한시간부터 카운트다운
    state.timeLeft  = isFinite(activeGame.duration) ? activeGame.duration : 0;
    state.score     = 0;
    state.elapsedMs = 0;
    state.highScore = getHigh(activeGame);

    if (dom.gameTitle) dom.gameTitle.textContent = activeGame.name;
    if (dom.timeLabel) dom.timeLabel.textContent = activeGame.timeLabel || '남은 시간';
    if (dom.gameInfo && activeGame.infoHTML) dom.gameInfo.innerHTML = activeGame.infoHTML;
    if (dom.toggleBtn) {
      const label = activeGame.shortName || activeGame.name;
      dom.toggleBtn.textContent = label;
      dom.toggleBtn.setAttribute('aria-label', '게임 모드 전환 (현재: ' + label + ')');
    }

    clearCanvas();
    hideResult();
    updateHUD();
  }

  /* 모드 토글 — 등록된 게임을 순서대로 순환 전환 (플레이 중에는 무시) */
  function toggleGame() {
    if (state.running) return;
    const ids = Object.keys(GAME_REGISTRY);
    if (ids.length < 2) return;
    const curIdx = activeGame ? ids.indexOf(activeGame.id) : -1;
    const nextId = ids[(curIdx + 1) % ids.length];
    loadGame(nextId);
  }

  function start() {
    if (!activeGame || state.running) return;
    state.running   = true;
    state.score     = 0;
    state.elapsedMs = 0;
    state.totalTime = activeGame.duration;
    state.timeLeft  = isFinite(activeGame.duration) ? activeGame.duration : 0;

    clearCanvas();
    hideResult();
    updateHUD();
    setControls(true);

    if (typeof activeGame.start === 'function') activeGame.start(api);

    lastTs = performance.now();
    rafId = requestAnimationFrame(loop);
  }

  function loop(ts) {
    if (!state.running) return;

    let dt = ts - lastTs;
    lastTs = ts;
    if (dt > 100) dt = 100;            // 탭 비활성 등으로 인한 큰 점프 방지
    state.elapsedMs += dt;

    //  시간 표시 — 일반 게임은 카운트다운, 생존형은 카운트업
    if (isFinite(state.totalTime)) {
      const newTimeLeft = Math.max(0, state.totalTime - Math.floor(state.elapsedMs / 1000));
      if (newTimeLeft !== state.timeLeft) { state.timeLeft = newTimeLeft; updateHUD(); }
    } else {
      const secs = Math.floor(state.elapsedMs / 1000);
      if (secs !== state.timeLeft) { state.timeLeft = secs; updateHUD(); }
    }

    if (typeof activeGame.update === 'function') activeGame.update(dt, api);

    if (!state.running) return;

    // 종료 판정 (생존형은 시간으로 끝나지 않음)
    if (isFinite(state.totalTime) && state.elapsedMs / 1000 >= state.totalTime) {
      end();
      return;
    }
    rafId = requestAnimationFrame(loop);
  }

  function end() {
    if (!state.running) return;
    state.running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;

    if (typeof activeGame.teardown === 'function') activeGame.teardown(api);

    let isNewRecord = false;
    if (state.score > state.highScore) {
      state.highScore = state.score;
      setHigh(activeGame, state.highScore);
      isNewRecord = true;
    }

    updateHUD();
    setControls(false);
    showResult(isNewRecord);
  }

  function reset() {
    state.running = false;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;

    if (activeGame && typeof activeGame.teardown === 'function') activeGame.teardown(api);

    state.score     = 0;
    state.elapsedMs = 0;
    //  생존형은 0, 일반 게임은 제한시간으로 복귀
    state.timeLeft  = activeGame ? (isFinite(activeGame.duration) ? activeGame.duration : 0) : 0;

    clearCanvas();
    hideResult();
    updateHUD();
    setControls(false);
  }

  /* ── 결과 모달 ─────────────────────────────────────────────────────────── */
  function defaultResult(score) {
    return { badge: '', message: '점수: ' + score };
  }

  function showResult(isNewRecord) {
    const result = (activeGame && typeof activeGame.getResult === 'function')
      ? activeGame.getResult(state.score)
      : defaultResult(state.score);

    if (dom.resultBadge)  dom.resultBadge.textContent  = result.badge || '';
    if (dom.modalTitle)   dom.modalTitle.textContent   = isNewRecord ? '새로운 기록!' : '게임 종료';
    if (dom.finalScore)   dom.finalScore.textContent   = state.score;
    if (dom.modalMessage) dom.modalMessage.textContent = result.message || '';
    if (dom.resultModal)  dom.resultModal.classList.add('active');
  }

  function hideResult() {
    if (dom.resultModal) dom.resultModal.classList.remove('active');
  }

  /* ── 초기화 ────────────────────────────────────────────────────────────── */
  function init() {
    dom.canvas       = document.getElementById('gameCanvas');
    dom.score        = document.getElementById('currentScore');
    dom.highScore    = document.getElementById('highScore');
    dom.time         = document.getElementById('timeLeft');
    dom.timeLabel    = document.getElementById('timeLabel');
    dom.gameTitle    = document.getElementById('gameTitle');
    dom.gameInfo     = document.getElementById('gameInfo');
    dom.startBtn     = document.getElementById('startBtn');
    dom.toggleBtn    = document.getElementById('modeToggleBtn');
    dom.resultModal  = document.getElementById('resultModal');
    dom.resultBadge  = document.getElementById('resultBadge');
    dom.modalTitle   = document.getElementById('modalTitle');
    dom.finalScore   = document.getElementById('finalScore');
    dom.modalMessage = document.getElementById('modalMessage');
    dom.restartBtn   = document.getElementById('restartBtn');
    dom.homeBtn      = document.getElementById('homeBtn');


    if (dom.startBtn)   dom.startBtn.addEventListener('click', start);
    if (dom.toggleBtn)  dom.toggleBtn.addEventListener('click', toggleGame);
    if (dom.restartBtn) dom.restartBtn.addEventListener('click', () => { reset(); start(); });
    if (dom.homeBtn)    dom.homeBtn.addEventListener('click', reset);   // 시작 화면으로 복귀(초기화)

    // 캔버스 클릭/터치/드래그 → 활성 게임으로 좌표 전달
    if (dom.canvas) {
      const getCanvasPoint = (e) => {
        const rect = dom.canvas.getBoundingClientRect();
        return { x: e.clientX - rect.left, y: e.clientY - rect.top };
      };

      dom.canvas.addEventListener('pointerdown', (e) => {
        if (!state.running || !activeGame || typeof activeGame.onPointerDown !== 'function') return;
        const point = getCanvasPoint(e);
        activeGame.onPointerDown(point.x, point.y, e, api);
      });
      dom.canvas.addEventListener('pointermove', (e) => {
        if (!state.running || !activeGame || typeof activeGame.onPointerMove !== 'function') return;
        const point = getCanvasPoint(e);
        activeGame.onPointerMove(point.x, point.y, e, api);
      });
      dom.canvas.addEventListener('pointerup', (e) => {
        if (!activeGame || typeof activeGame.onPointerUp !== 'function') return;
        const point = getCanvasPoint(e);
        activeGame.onPointerUp(point.x, point.y, e, api);
      });
      dom.canvas.addEventListener('pointerleave', (e) => {
        if (!activeGame || typeof activeGame.onPointerUp !== 'function') return;
        const point = getCanvasPoint(e);
        activeGame.onPointerUp(point.x, point.y, e, api);
      });
    }
    // 키 입력 → 활성 게임으로 전달 (방향키 게임 등)
    window.addEventListener('keydown', (e) => {
      if (state.running && activeGame && typeof activeGame.onKeyDown === 'function') activeGame.onKeyDown(e, api);
    });
    window.addEventListener('keyup', (e) => {
      if (state.running && activeGame && typeof activeGame.onKeyUp === 'function') activeGame.onKeyUp(e, api);
    });

    updateHUD();
  }

  return { init, start, reset, loadGame, toggleGame };
})();


/* =============================================================================
 * 3) MothCatchGame — 나방 잡기 (버그 잡기)
 * ========================================================================== */
/* 나방 잡기 최고 점수 — 메모리 변수에 보관(새로고침 시 초기화) */
let MothCatch_gameHighScore = 0;

const MothCatchGame = {
  id: 'moth-catch',
  name: '디버깅 타임어택: 나방을 잡아라!',
  shortName: '버그 잡기',
  duration: 30,                          // 제한시간 30초
  timeLabel: '남은 시간',
  //  모드 전환 시 복원할 게임 방법 본문 (현재 HTML과 동일 내용)
  infoHTML: `
      <ul>
        <li>제한 시간 안에 나타나는 나방(버그)을 클릭해서 잡으세요!</li>
        <li>나방은 잠시 후 사라지므로, 빨리 잡을수록 더 많은 점수를 얻습니다.</li>
        <li>시간이 지날수록 나방이 더 자주 나타나 난이도가 올라갑니다.</li>
        <li>최고 점수를 갱신하고 나만의 개발자 성향을 확인해 보세요!</li>
      </ul>`,

  /* ── 튜닝 상수 ──────────────────────────────────────────────────────────── */
  SCORE_PER_BUG: 50,
  BUG_LIFETIME: 1400,
  SPAWN_START: 1500,
  SPAWN_MIN: 350,
  SPAWN_RAMP: 50,

  /* ── 내부 상태 ──────────────────────────────────────────────────────────── */
  _bugs: [],
  _spawnTimer: 0,
  _spawnInterval: 0,
  _caught: 0,

  setup(api) {},

  start(api) {
    this._bugs = [];
    this._caught = 0;
    this._spawnInterval = this.SPAWN_START;
    this._spawnTimer = this.SPAWN_START;   // 시작 약 1.5초 후 첫 나방 등장
  },

  update(dtMs, api) {
    // (1) 나방 수명 차감 → 만료 시 소멸(놓침)
    for (let i = this._bugs.length - 1; i >= 0; i--) {
      const bug = this._bugs[i];
      if (bug.caught) continue;
      bug.lifeLeft -= dtMs;
      if (bug.lifeLeft <= 0) {
        this._removeBugAt(i);
      } else {
        bug.el.style.setProperty('--life-ratio', (bug.lifeLeft / bug.lifeTotal).toFixed(3));
      }
    }

    // (2) 스폰 타이머
    this._spawnTimer -= dtMs;
    if (this._spawnTimer <= 0) {
      this._spawn(api);
      this._spawnInterval = Math.max(this.SPAWN_MIN, this.SPAWN_START - this._caught * this.SPAWN_RAMP);
      this._spawnTimer = this._spawnInterval;
    }
  },

  _spawn(api) {
    const canvas = api.canvas;
    if (!canvas) return;

    const el = document.createElement('button');
    el.type = 'button';
    el.className = 'bug';
    el.textContent = '🐛';
    el.setAttribute('aria-label', '나방 잡기');

    canvas.appendChild(el);
    const w = el.offsetWidth || 40;
    const h = el.offsetHeight || 40;
    const maxX = Math.max(0, canvas.clientWidth - w);
    const maxY = Math.max(0, canvas.clientHeight - h);
    el.style.left = (Math.random() * maxX) + 'px';
    el.style.top  = (Math.random() * maxY) + 'px';

    const bug = { el, lifeLeft: this.BUG_LIFETIME, lifeTotal: this.BUG_LIFETIME, caught: false };
    el.addEventListener('click', (e) => {
      e.stopPropagation();
      this._catch(bug, api);
    });
    this._bugs.push(bug);
  },

  _catch(bug, api) {
    if (bug.caught) return;
    bug.caught = true;

    const ratio = Math.max(0, bug.lifeLeft / bug.lifeTotal);
    const gained = Math.max(1, Math.ceil(this.SCORE_PER_BUG * ratio));
    api.addScore(gained);
    this._caught++;

    this._showScorePopup(api.canvas, bug.el, gained);

    bug.el.classList.add('clicked');
    bug.el.disabled = true;
    const el = bug.el;
    setTimeout(() => { if (el && el.parentNode) el.remove(); }, 300);

    const idx = this._bugs.indexOf(bug);
    if (idx > -1) this._bugs.splice(idx, 1);
  },

  _removeBugAt(i) {
    const bug = this._bugs[i];
    if (bug && bug.el && bug.el.parentNode) bug.el.remove();
    this._bugs.splice(i, 1);
  },

  _showScorePopup(canvas, refEl, gained) {
    if (!canvas) return;
    const popup = document.createElement('span');
    popup.className = 'score-popup';
    popup.textContent = '+' + gained;
    popup.style.left = refEl.style.left;
    popup.style.top  = refEl.style.top;
    canvas.appendChild(popup);
    setTimeout(() => { if (popup.parentNode) popup.remove(); }, 600);
  },

  teardown(api) {
    this._bugs.forEach(bug => { if (bug.el && bug.el.parentNode) bug.el.remove(); });
    this._bugs = [];
    if (api.canvas) api.canvas.querySelectorAll('.score-popup').forEach(n => n.remove());
  },

  getResult(score) {
    if (score >= 500) return { badge: '천재형 개발자', message: '뛰어난 집중력과 반응속도를 가지고 있습니다! 적성과 성향이 딱 맞아요. 🎉' };
    if (score >= 350) return { badge: '성장형 개발자', message: '개발자의 감각이 있어요! 충분한 가능성을 가지고 있습니다. 💪' };
    if (score >= 150) return { badge: '탐색형 개발자', message: '생각보다 개발에 대한 적성이 있어요! 몰랐던 적성을 발견할 수도 있습니다. 📈' };
    return { badge: '협력형', message: '개발자의 든든한 협력자형! 다른 역할에서도 충분히 빛날 수 있습니다. 🚀' };
  },

  /* 최고점수 보관 — 메모리 변수(MothCatch_gameHighScore) 사용 */
  loadHighScore() { return MothCatch_gameHighScore; },
  saveHighScore(value) { MothCatch_gameHighScore = value; },
};


/* =============================================================================
 * 4) DodgeBulletGame — 버그 피하기 (방향키 탄막)
 *    · 사방에서 날아오는 버그를 방향키로 피하는 생존형 게임.
 *    · 버그는 발사되는 "순간" 플레이어 위치를 한 번 조준하고 그 방향으로 직선 비행.
 *    · 점수: 생존 시간에 따라 초당 20점 → 40점으로 가중.
 *    · 피격 시 종료. 캔버스/점수보드는 잡기 모드와 공유, 최고점수만 별도 변수.
 * ========================================================================== */

/* 버그 피하기(탄막) 최고 점수 — 메모리 변수에 보관(새로고침 시 초기화) */
let Danmaku_gameHighScore = 0;

const DodgeBulletGame = {
  id: 'dodge-bullet',
  name: '디버깅 타임어택: 버그를 피해라!',
  shortName: '버그 피하기',
  duration: Infinity,            // 생존형: 제한시간 없음(피격 시 종료)
  timeLabel: '생존 시간',
  infoHTML: `
      <ul>
        <li>사방에서 날아오는 버그를 PC에서는 <strong>방향키(↑ ↓ ← →)</strong>, 모바일에서는 <strong>캐릭터 드래그</strong>로 피하세요!</li>
        <li>버그는 발사되는 순간 당신의 위치를 향해 직선으로 날아옵니다.</li>
        <li>오래 버틸수록 점수가 빨라집니다 (초당 20점 → 최대 40점).</li>
        <li>버그에 닿으면 게임 종료! 최고 생존 점수에 도전하세요.</li>
      </ul>`,

  /* ── 튜닝 상수 (난이도/점수는 여기서 조절) ───────────────────────────────── */
  PLAYER_EMOJI: '🧑‍💻',
  PLAYER_SIZE: 40,               // px (CSS .player와 일치, JS가 실제 크기 측정)
  PLAYER_SPEED_FACTOR: 0.55,     // 플레이어 초당 이동거리 = 캔버스폭 × 이 값
  BUG_SIZE: 40,                  // px (CSS .bug와 일치, JS가 실제 크기 측정)
  BUG_SPEED_BASE: 0.30,          // 버그 초당 속도 = 캔버스폭 × (BASE + 가중)
  BUG_SPEED_GROWTH: 0.012,       // 생존 1초당 속도 가중치
  BUG_SPEED_RAMP_CAP: 30,        // 속도 가중 상한 시간(초)
  SPAWN_START: 700,              // 스폰 간격 시작(ms)
  SPAWN_MIN: 200,                // 최소 스폰 간격(ms)
  SPAWN_DECAY: 14,               // 생존 1초당 스폰 간격 단축(ms)
  HIT_FACTOR: 0.62,             // 충돌 판정 반경 비율(작을수록 관대)
  SCORE_RATE_MIN: 20,            // 초당 최소 점수
  SCORE_RATE_MAX: 40,            // 초당 최대 점수
  SCORE_RATE_RAMP: 30,           // 최대 점수율 도달까지 걸리는 시간(초)

  /* ── 내부 상태 ──────────────────────────────────────────────────────────── */
  _player: null,                 // { el, x, y, size }
  _bugs: [],                     // [{ el, x, y, vx, vy, size }]
  _keys: { up: false, down: false, left: false, right: false },
  _spawnTimer: 0,
  _spawnInterval: 0,
  _survival: 0,                  // 생존 시간(초, 실수)
  _scoreAcc: 0,                  // 점수 누적(실수 → 정수만 가산)
  _dragging: false,
  _dragOffsetX: 0,
  _dragOffsetY: 0,

  setup(api) {},

  start(api) {
    const canvas = api.canvas;
    this._bugs = [];
    this._keys = { up: false, down: false, left: false, right: false };
    this._spawnInterval = this.SPAWN_START;
    this._spawnTimer = 600;        // 시작 직후 약간의 유예
    this._survival = 0;
    this._scoreAcc = 0;
    this._dragging = false;
    this._dragOffsetX = 0;
    this._dragOffsetY = 0;

    if (canvas) canvas.classList.add('is-dodge');   // 커서 등 모드 표시

    // 플레이어 생성 (캔버스 중앙)
    const el = document.createElement('div');
    el.className = 'player';
    el.textContent = this.PLAYER_EMOJI;
    el.setAttribute('aria-hidden', 'true');
    if (canvas) canvas.appendChild(el);

    const size = el.offsetWidth || this.PLAYER_SIZE;
    const cw = canvas ? canvas.clientWidth : 0;
    const ch = canvas ? canvas.clientHeight : 0;
    const x = Math.max(0, (cw - size) / 2);
    const y = Math.max(0, (ch - size) / 2);
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
    this._player = { el, x, y, size };
  },

  update(dtMs, api) {
    const canvas = api.canvas;
    if (!canvas || !this._player) return;
    const dt = dtMs / 1000;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    const pSize = this._player.size;

    this._survival += dt;

    // (1) 점수 누적: 초당 20 → 40 (생존 시간에 따라 선형 가중)
    const rate = this.SCORE_RATE_MIN +
      (this.SCORE_RATE_MAX - this.SCORE_RATE_MIN) *
      Math.min(this._survival / this.SCORE_RATE_RAMP, 1);
    this._scoreAcc += rate * dt;
    const whole = Math.floor(this._scoreAcc);
    if (whole > 0) { api.addScore(whole); this._scoreAcc -= whole; }

    // (2) 플레이어 이동 (방향키 또는 모바일 드래그)
    let dx = (this._keys.right ? 1 : 0) - (this._keys.left ? 1 : 0);
    let dy = (this._keys.down ? 1 : 0) - (this._keys.up ? 1 : 0);
    if (dx && dy) { const inv = Math.SQRT1_2; dx *= inv; dy *= inv; }  // 대각선 보정
    const pSpeed = cw * this.PLAYER_SPEED_FACTOR;
    let px = this._player.x + dx * pSpeed * dt;
    let py = this._player.y + dy * pSpeed * dt;
    px = Math.max(0, Math.min(px, cw - pSize));
    py = Math.max(0, Math.min(py, ch - pSize));
    this._player.x = px;
    this._player.y = py;
    this._player.el.style.left = px + 'px';
    this._player.el.style.top  = py + 'px';
    const pcx = px + pSize / 2;
    const pcy = py + pSize / 2;

    // (3) 스폰 (생존 시간 따라 간격 단축, 후반엔 2마리)
    this._spawnTimer -= dtMs;
    if (this._spawnTimer <= 0) {
      this._spawnBug(api);
      this._spawnInterval = Math.max(this.SPAWN_MIN, this.SPAWN_START - this._survival * this.SPAWN_DECAY);
      this._spawnTimer = this._spawnInterval;
      if (this._survival > 15 && Math.random() < 0.5) this._spawnBug(api);
    }

    // (4) 버그 이동 → 충돌 판정 → 화면 밖 제거
    for (let i = this._bugs.length - 1; i >= 0; i--) {
      const b = this._bugs[i];
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      const bcx = b.x + b.size / 2;
      const bcy = b.y + b.size / 2;
      const hitDist = (pSize / 2 + b.size / 2) * this.HIT_FACTOR;
      const ddx = bcx - pcx;
      const ddy = bcy - pcy;
      if (ddx * ddx + ddy * ddy <= hitDist * hitDist) {
        api.endGame();             // 피격 → 종료
        return;
      }

      const m = b.size + 20;       // 화면 밖 여유
      if (b.x < -m || b.x > cw + m || b.y < -m || b.y > ch + m) {
        if (b.el && b.el.parentNode) b.el.remove();
        this._bugs.splice(i, 1);
        continue;
      }
      b.el.style.left = b.x + 'px';
      b.el.style.top  = b.y + 'px';
    }
  },

  _spawnBug(api) {
    const canvas = api.canvas;
    if (!canvas || !this._player) return;
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;

    const el = document.createElement('div');
    el.className = 'bug bug--danmaku';   // 잡기 모드와 동일한 버그 비주얼 재사용
    el.textContent = '🐛';
    el.setAttribute('aria-hidden', 'true');
    canvas.appendChild(el);
    const size = el.offsetWidth || this.BUG_SIZE;

    // 가장자리 한 곳에서 출현 (0:상 1:하 2:좌 3:우)
    let x, y;
    const edge = Math.floor(Math.random() * 4);
    if (edge === 0)      { x = Math.random() * Math.max(0, cw - size); y = -size; }
    else if (edge === 1) { x = Math.random() * Math.max(0, cw - size); y = ch; }
    else if (edge === 2) { x = -size; y = Math.random() * Math.max(0, ch - size); }
    else                 { x = cw;    y = Math.random() * Math.max(0, ch - size); }

    // 발사 순간 플레이어 위치를 "한 번"만 조준 → 이후 직선 비행
    const pcx = this._player.x + this._player.size / 2;
    const pcy = this._player.y + this._player.size / 2;
    let dirX = pcx - (x + size / 2);
    let dirY = pcy - (y + size / 2);
    const len = Math.hypot(dirX, dirY) || 1;
    dirX /= len;
    dirY /= len;

    const speed = cw * (this.BUG_SPEED_BASE +
      Math.min(this._survival, this.BUG_SPEED_RAMP_CAP) * this.BUG_SPEED_GROWTH);

    el.style.left = x + 'px';
    el.style.top  = y + 'px';

    this._bugs.push({ el, x, y, vx: dirX * speed, vy: dirY * speed, size });
  },

  onKeyDown(e, api) {
    const k = this._mapKey(e.key);
    if (!k) return;
    e.preventDefault();            // 방향키로 인한 페이지 스크롤 방지
    this._keys[k] = true;
  },
  onKeyUp(e, api) {
    const k = this._mapKey(e.key);
    if (!k) return;
    this._keys[k] = false;
  },
  onPointerDown(x, y, e, api) {
    if (!this._player || !api.canvas) return;

    const centerX = this._player.x + this._player.size / 2;
    const centerY = this._player.y + this._player.size / 2;
    const grabRadius = this._player.size * 1.2;
    const dist = Math.hypot(x - centerX, y - centerY);
    if (dist > grabRadius) return;

    e.preventDefault();
    this._dragging = true;
    this._dragOffsetX = x - this._player.x;
    this._dragOffsetY = y - this._player.y;
    if (api.canvas.setPointerCapture && e.pointerId != null) {
      api.canvas.setPointerCapture(e.pointerId);
    }
  },
  onPointerMove(x, y, e, api) {
    if (!this._dragging || !this._player || !api.canvas) return;
    e.preventDefault();
    this._setPlayerPosition(x - this._dragOffsetX, y - this._dragOffsetY, api.canvas);
  },
  onPointerUp(x, y, e, api) {
    if (!this._dragging) return;
    this._dragging = false;
    if (api.canvas && api.canvas.releasePointerCapture && e.pointerId != null) {
      try { api.canvas.releasePointerCapture(e.pointerId); } catch (err) {}
    }
  },
  _setPlayerPosition(x, y, canvas) {
    if (!this._player || !canvas) return;
    const maxX = Math.max(0, canvas.clientWidth - this._player.size);
    const maxY = Math.max(0, canvas.clientHeight - this._player.size);
    const px = Math.max(0, Math.min(x, maxX));
    const py = Math.max(0, Math.min(y, maxY));
    this._player.x = px;
    this._player.y = py;
    this._player.el.style.left = px + 'px';
    this._player.el.style.top = py + 'px';
  },
  _mapKey(key) {
    switch (key) {
      case 'ArrowUp':    return 'up';
      case 'ArrowDown':  return 'down';
      case 'ArrowLeft':  return 'left';
      case 'ArrowRight': return 'right';
      default: return null;
    }
  },

  teardown(api) {
    this._bugs.forEach(b => { if (b.el && b.el.parentNode) b.el.remove(); });
    this._bugs = [];
    if (this._player && this._player.el && this._player.el.parentNode) this._player.el.remove();
    this._player = null;
    this._keys = { up: false, down: false, left: false, right: false };
    this._dragging = false;
    if (api.canvas) api.canvas.classList.remove('is-dodge');
  },

  // 결과 뱃지/멘트 (생존 점수 구간 기준 — 임계값은 자유롭게 조정 가능)
  getResult(score) {
    if (score >= 900) return { badge: '천재형 개발자', message: '버그 폭격 속에서도 살아남는 압도적 반응속도! 디버깅 본능이 남다릅니다. 🎯' };
    if (score >= 450) return { badge: '성장형 개발자', message: '날아드는 버그를 척척 피하네요. 개발자의 감각이 보입니다! 💪' };
    if (score >= 180) return { badge: '탐색형 개발자', message: '점점 감을 잡고 있어요. 조금만 더 버티면 고수! 📈' };
    return { badge: '협력형', message: '버그 회피는 연습이 답! 다른 강점으로도 충분히 빛날 수 있어요. 🚀' };
  },

  /* 최고점수 보관 — 메모리 변수(Danmaku_gameHighScore) 사용 */
  loadHighScore() { return Danmaku_gameHighScore; },
  saveHighScore(value) { Danmaku_gameHighScore = value; },
};


/* =============================================================================
 * 4) GAME_REGISTRY — 미니게임 등록소
 *    토글 버튼은 이 등록 순서대로 순환 전환됩니다.
 * ========================================================================== */
const GAME_REGISTRY = {
  [MothCatchGame.id]: MothCatchGame,
  [DodgeBulletGame.id]: DodgeBulletGame,
};
const DEFAULT_GAME_ID = MothCatchGame.id;


/* =============================================================================
 * 5) 부팅
 * ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
  GameEngine.init();
  GameEngine.loadGame(DEFAULT_GAME_ID);

  // 콘솔에서 수동 전환 가능: window.GameEngine.toggleGame() / loadGame('id')
  window.GameEngine = GameEngine;
});
