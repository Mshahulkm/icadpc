(function () {
  const stadium = document.getElementById('stadium');
  const football = document.getElementById('football');
  const hero = document.getElementById('hero');
  const goalPost = document.getElementById('goalPost');
  const flash = document.getElementById('flash');
  const confetti = document.getElementById('confetti');
  const goalText = document.getElementById('goalText');
  const reveal = document.getElementById('reveal');
  const video = document.getElementById('revealVideo');
  const replay = document.getElementById('replay');

  let audioCtx = null;
  let busy = false;

  function getCtx() {
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (Ctx) audioCtx = new Ctx();
    }
    return audioCtx;
  }

  function playKick() {
    const ctx = getCtx(); if (!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'triangle';
    o.frequency.setValueAtTime(180, ctx.currentTime);
    o.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.15);
    g.gain.setValueAtTime(0.4, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 0.2);
  }

  function playHorn() {
    const ctx = getCtx(); if (!ctx) return;
    const o = ctx.createOscillator(); const g = ctx.createGain();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(220, ctx.currentTime);
    g.gain.setValueAtTime(0.25, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
    o.connect(g).connect(ctx.destination);
    o.start(); o.stop(ctx.currentTime + 1.2);
  }

  function spawnConfetti() {
    const colors = ['#f0c14b', '#7fdbff', '#ffffff', '#3ddc84', '#ff4d6d'];
    confetti.innerHTML = '';
    for (let i = 0; i < 70; i++) {
      const p = document.createElement('span');
      p.className = 'confetti-piece';
      p.style.left = Math.random() * 100 + '%';
      p.style.background = colors[i % colors.length];
      p.style.animationDelay = (Math.random() * 0.6) + 's';
      p.style.animationDuration = (1.6 + Math.random() * 1.8) + 's';
      p.style.transform = 'rotate(' + Math.random() * 360 + 'deg)';
      confetti.appendChild(p);
    }
  }

  function kick() {
    if (busy) return;
    busy = true;
    playKick();
    hero.classList.add('is-hidden');
    football.classList.add('is-kicking');
    football.disabled = true;

    setTimeout(() => {
      football.classList.add('is-done');
      goalPost.classList.add('is-scored');
      stadium.classList.add('is-shake');
      flash.classList.add('is-flash');
      goalText.hidden = false;
      spawnConfetti();
      playHorn();
      setTimeout(() => stadium.classList.remove('is-shake'), 500);
      setTimeout(() => flash.classList.remove('is-flash'), 600);
    }, 900);

    setTimeout(() => {
      reveal.classList.add('is-open');
      if (video) {
        const p = video.play();
        if (p && p.catch) p.catch(() => {});
      }
    }, 2400);
  }

  function reset() {
    busy = false;
    football.classList.remove('is-kicking', 'is-done');
    football.disabled = false;
    hero.classList.remove('is-hidden');
    goalPost.classList.remove('is-scored');
    goalText.hidden = true;
    confetti.innerHTML = '';
    reveal.classList.remove('is-open');
    if (video) { video.pause(); video.currentTime = 0; }
  }

  football.addEventListener('click', kick);
  football.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); kick(); }
  });
  replay.addEventListener('click', reset);
})();
