/* =============================================
   MajorFair — 메인 페이지 기능
   담당: 정민규
   
   [기능 목록]
   1. 스크롤 이벤트 처리
      - 네비게이션 스타일 변경 (scrolled 클래스)
      - 요소 등장 애니메이션 트리거
   2. 커스텀 모달 (팝업창)
      - openModal(id) / closeModal(id)
      - 오버레이 클릭으로 닫기
      - ESC 키로 닫기
      - 배경 스크롤 방지
   3. 모바일 햄버거 메뉴
   ============================================= */


/* ── 1. 스크롤 이벤트 처리 ── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  // 스크롤이 40px 이상이면 네비게이션에 그림자 추가
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // 화면에 들어오는 요소 등장 처리
  revealElements();
});

/**
 * 화면 안으로 들어온 요소에 'visible' 클래스를 추가해
 * CSS transition으로 부드럽게 등장시킴
 */
function revealElements() {
  const threshold = window.innerHeight - 72;

  // 소개 섹션 feature 아이템 (왼→오 슬라이드)
  document.querySelectorAll('.feature-item').forEach((el, i) => {
    if (el.getBoundingClientRect().top < threshold) {
      setTimeout(() => el.classList.add('visible'), i * 110);
    }
  });

  // 직군 카드 (아래→위 페이드)
  document.querySelectorAll('.major-card').forEach((el, i) => {
    if (el.getBoundingClientRect().top < threshold) {
      setTimeout(() => el.classList.add('visible'), i * 90);
    }
  });

  // 페르소나 카드 (아래→위 페이드)
  document.querySelectorAll('.persona-card').forEach((el, i) => {
    if (el.getBoundingClientRect().top < threshold) {
      setTimeout(() => el.classList.add('visible'), i * 110);
    }
  });
}

// 페이지 로드 시 1회 실행 (이미 화면에 보이는 요소 처리)
revealElements();

const hero = document.querySelector('.hero');
const codeFloats = document.querySelectorAll('.code-float');

if (hero && codeFloats.length > 0) {
  const repelRadius = 150;
  const maxPush = 44;

  hero.addEventListener('pointermove', (event) => {
    codeFloats.forEach((item) => {
      const rect = item.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = centerX - event.clientX;
      const dy = centerY - event.clientY;
      const distance = Math.hypot(dx, dy);

      if (distance < repelRadius) {
        const force = (repelRadius - distance) / repelRadius;
        const angle = Math.atan2(dy, dx);
        item.style.setProperty('--push-x', Math.cos(angle) * maxPush * force + 'px');
        item.style.setProperty('--push-y', Math.sin(angle) * maxPush * force + 'px');
        item.classList.add('is-repelled');
      } else {
        item.style.setProperty('--push-x', '0px');
        item.style.setProperty('--push-y', '0px');
        item.classList.remove('is-repelled');
      }
    });
  });

  hero.addEventListener('pointerleave', () => {
    codeFloats.forEach((item) => {
      item.style.setProperty('--push-x', '0px');
      item.style.setProperty('--push-y', '0px');
      item.classList.remove('is-repelled');
    });
  });
}


/* ── 2. 탭 전환 ── */

/**
 * 모달 안 탭 전환
 * @param {string} modalId  - 모달 ID (예: 'fe', 'be', 'ai')
 * @param {string} tabName  - 탭 이름 (예: 'skill', 'ability', 'cert')
 * @param {Element} btnEl   - 클릭된 버튼 요소
 */
function switchTab(modalId, tabName, btnEl) {
  const overlay = document.getElementById('modal-' + modalId);

  // 모든 탭 패널 숨기기
  overlay.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  // 모든 탭 버튼 비활성화
  overlay.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));

  // 선택한 탭 패널 보이기
  overlay.querySelector('#' + modalId + '-' + tabName).classList.add('active');
  // 선택한 버튼 활성화
  btnEl.classList.add('active');
}


/* ── 3. 커스텀 모달 ── */

/**
 * 모달 열기
 * @param {string} id - 모달 ID (예: 'fe', 'be', 'ai', 'form-info')
 */
function openModal(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; // 배경 스크롤 방지
}

/**
 * 모달 닫기
 * @param {string} id - 모달 ID
 */
function closeModal(id) {
  const overlay = document.getElementById('modal-' + id);
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = ''; // 배경 스크롤 복구
}

// 오버레이(배경) 클릭 시 닫기
document.querySelectorAll('.modal-overlay').forEach(overlay => {
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

// ESC 키로 열린 모달 닫기
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-overlay.open').forEach(overlay => {
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }
});
