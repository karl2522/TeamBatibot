// Simple menu logic for main menu, levels, and options
window.addEventListener('load', () => {
    const menu = document.getElementById('menu');
    const gameRoot = document.getElementById('gameRoot');
    const btnPlay = document.getElementById('btnPlay');
    const btnLevels = document.getElementById('btnLevels');
    const btnOptions = document.getElementById('btnOptions');
    const mainButtons = document.querySelector('.menu-buttons');
    const menuContent = document.querySelector('.menu-content');
    const levelsPanel = document.getElementById('levelsPanel');
    const optionsPanel = document.getElementById('optionsPanel');
    const btnBackFromLevels = document.getElementById('btnBackFromLevels');
    const btnBackFromOptions = document.getElementById('btnBackFromOptions');
    const musicToggle = document.getElementById('musicToggle');
    const bgm = document.getElementById('bgm');

    // Restore music toggle from localStorage
    const savedMusicEnabled = localStorage.getItem('musicEnabled');
    const musicEnabled = savedMusicEnabled === null ? true : savedMusicEnabled === 'true';
    musicToggle.checked = musicEnabled;
    updateMusic();

    // Button handlers
    btnPlay.addEventListener('click', () => {
        forcePlayAudio();
        // Show difficulty selection instead of immediately starting
        levelsPanel.classList.remove('hidden');
        optionsPanel.classList.add('hidden');
        mainButtons.classList.add('hidden');
        menuContent.classList.add('panel-open');
    });

    btnLevels.addEventListener('click', () => {
        levelsPanel.classList.remove('hidden');
        optionsPanel.classList.add('hidden');
        mainButtons.classList.add('hidden');
        menuContent.classList.add('panel-open');
    });

    btnOptions.addEventListener('click', () => {
        optionsPanel.classList.remove('hidden');
        levelsPanel.classList.add('hidden');
        mainButtons.classList.add('hidden');
        menuContent.classList.add('panel-open');
    });

    btnBackFromLevels.addEventListener('click', () => {
        levelsPanel.classList.add('hidden');
        mainButtons.classList.remove('hidden');
        menuContent.classList.remove('panel-open');
    });

    btnBackFromOptions.addEventListener('click', () => {
        optionsPanel.classList.add('hidden');
        mainButtons.classList.remove('hidden');
        menuContent.classList.remove('panel-open');
    });

    // Level buttons
    levelsPanel.querySelectorAll('[data-level]').forEach(btn => {
        btn.addEventListener('click', () => {
            const level = parseInt(btn.getAttribute('data-level'), 10);
            forcePlayAudio();
            start(level);
        });
    });

    // Music toggle
    musicToggle.addEventListener('change', () => {
        localStorage.setItem('musicEnabled', musicToggle.checked ? 'true' : 'false');
        updateMusic();
    });

    function updateMusic() {
        if (!musicToggle.checked) {
            if (bgm) {
                bgm.pause();
                bgm.currentTime = 0;
            }
            stopWebTone();
            return;
        }

        // First try HTMLAudio
        if (bgm) {
            bgm.volume = 0.35;
            const p = bgm.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {
                    // Fallback to WebAudio tone if streaming blocked
                    startWebTone();
                });
            }
        } else {
            startWebTone();
        }
    }

    // --- Web Audio fallback: simple ambient chord ---
    let audioCtx = null;
    let oscNodes = [];
    function startWebTone() {
        try {
            if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
            stopWebTone();
            const freqs = [196.00, 246.94, 293.66]; // G-B-D chord
            freqs.forEach((f, i) => {
                const osc = audioCtx.createOscillator();
                const gain = audioCtx.createGain();
                osc.type = i === 0 ? 'sine' : 'triangle';
                osc.frequency.value = f;
                gain.gain.value = 0.04;
                osc.connect(gain).connect(audioCtx.destination);
                osc.start();
                oscNodes.push({ osc, gain });
            });
        } catch (_) {}
    }

    function stopWebTone() {
        oscNodes.forEach(({ osc, gain }) => {
            try { gain.gain.exponentialRampToValueAtTime(0.0001, (audioCtx?.currentTime || 0) + 0.2); } catch(_) {}
            try { osc.stop((audioCtx?.currentTime || 0) + 0.25); } catch(_) {}
        });
        oscNodes = [];
    }

    function forcePlayAudio() {
        if (!bgm) return;
        try {
            bgm.currentTime = Math.min(bgm.currentTime || 0, 0.01);
            bgm.volume = 0.35;
            const p = bgm.play();
            if (p && typeof p.catch === 'function') {
                p.catch(() => {/* ignore */});
            }
        } catch (_) {}
    }

    function start(startLevel) {
        // Hide menu, show game
        menu.classList.add('hidden');
        gameRoot.classList.remove('hidden');
        if (typeof window.startGame === 'function') {
            window.startGame(startLevel);
        }
        updateMusic();
    }
});


