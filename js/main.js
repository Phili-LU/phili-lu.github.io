/* ================================================
   Phili's Personal Website — main.js
   ================================================ */

// === 導覽列：滾動後加深背景 ===
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(13, 17, 23, 0.98)';
    } else {
        nav.style.background = 'rgba(13, 17, 23, 0.85)';
    }
}, { passive: true });

// === 手機選單開關 ===
const menuBtn = document.getElementById('menuBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    menuBtn.textContent = isOpen ? '✕' : '☰';
});

// 點擊選單連結後自動關閉
document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        menuBtn.textContent = '☰';
    });
});

// === 作品集 Tabs 切換 ===
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;

        // 移除所有 active
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

        // 啟動目標 tab
        btn.classList.add('active');
        document.getElementById('tab-' + tab).classList.add('active');
    });
});

// === 筆記區密碼保護 ===
// ⚠️ 修改密碼請改這裡
const NOTES_PASSWORD = 'phili2026';

const unlockBtn = document.getElementById('notesUnlock');
const passwordInput = document.getElementById('notesPassword');
const lockError = document.getElementById('lockError');

function checkPassword() {
    const input = passwordInput.value.trim();

    if (input === NOTES_PASSWORD) {
        // 密碼正確：隱藏鎖定畫面，顯示內容
        document.getElementById('notesLock').style.display = 'none';
        document.getElementById('notesContent').style.display = 'block';
        lockError.textContent = '';
    } else {
        // 密碼錯誤：顯示錯誤提示
        lockError.textContent = '密碼錯誤，請再試一次';
        passwordInput.value = '';
        passwordInput.focus();

        // 錯誤動畫
        passwordInput.style.borderColor = 'var(--accent)';
        setTimeout(() => {
            passwordInput.style.borderColor = '';
        }, 800);
    }
}

unlockBtn.addEventListener('click', checkPassword);
passwordInput.addEventListener('keydown', e => {
    if (e.key === 'Enter') checkPassword();
    if (lockError.textContent) lockError.textContent = '';
});

// === Scroll 淡入動畫 ===
const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // 觸發一次就夠，不需要重複觀察
            fadeObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
});

// 對卡片、時間軸項目、自介文字套用動畫
document.querySelectorAll('.card, .timeline-item, .about-text, .about-interests').forEach((el, i) => {
    el.classList.add('fade-in');
    // 讓卡片有輕微的錯開效果
    el.style.transitionDelay = `${(i % 4) * 0.07}s`;
    fadeObserver.observe(el);
});
