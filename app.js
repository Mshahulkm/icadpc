// ICAD FIFA World Cup 2026 - Winners Reveal (static, vanilla JS)
(function(){
  const app = document.getElementById('app');
  let winners = null;
  const STAGES = ['loading','welcome','game','trophy','fourth','third','runnerup','champion','hall','stats','timeline','gallery','credits'];
  let stage = 'loading';

  const IMG = {
    stadium:'./assets/stadium.jpg', trophy:'./assets/trophy.jpg',
    champion:'./assets/winner-champion.jpg', runnerup:'./assets/winner-runnerup.jpg',
    third:'./assets/winner-third.jpg', topScorer:'./assets/winner-topscorer.jpg'
  };

  fetch('./winners.json').then(r=>r.json()).then(d=>{winners=d;render();}).catch(()=>{
    winners = { champion:{name:"Ahmed Ali",department:"Finance",points:298,accuracy:94},
      runnerup:{name:"Muhammed Shahul",department:"Operations",points:281,accuracy:89},
      third:{name:"Abdullah",department:"IT",points:264,accuracy:84},
      topScorer:{name:"Faisal",department:"Sales",points:251,accuracy:81}}; render();
  });

  function next(){ const i=STAGES.indexOf(stage); if(i<STAGES.length-1){stage=STAGES[i+1]; render();} }

  function h(tag, attrs={}, ...kids){
    const el=document.createElement(tag);
    for(const k in attrs){
      if(k==='class') el.className=attrs[k];
      else if(k==='style') el.setAttribute('style',attrs[k]);
      else if(k.startsWith('on')) el.addEventListener(k.slice(2).toLowerCase(),attrs[k]);
      else el.setAttribute(k,attrs[k]);
    }
    kids.flat().forEach(k=>{ if(k==null||k===false)return;
      el.appendChild(typeof k==='string'||typeof k==='number'?document.createTextNode(k):k);});
    return el;
  }

  function floats(){
    const w = h('div',{class:'floats'});
    for(let i=0;i<8;i++){
      const s=16+(i%4)*8;
      w.appendChild(h('div',{class:'b',style:`left:${(i*13+5)%95}%;width:${s}px;height:${s}px;animation-delay:${i*1.7}s;animation-duration:${10+(i%4)*3}s`}));
    }
    return w;
  }

  function confetti(dense){
    const w = h('div',{class:'confetti-wrap'});
    const n = dense?100:50;
    const colors=['#f7c948','#33e0ff','#38ff9c','#7a3cff','#ff4d4d'];
    for(let i=0;i<n;i++){
      const c=colors[i%colors.length];
      const dur=(2+Math.random()*2).toFixed(2), del=(Math.random()*0.8).toFixed(2);
      w.appendChild(h('span',{class:'confetti',style:`left:${Math.random()*100}%;background:${c};animation-duration:${dur}s;animation-delay:${del}s`}));
    }
    return w;
  }

  function playerCard(title,d,imgSrc,extra){
    return h('div',{class:'player-card rise'},
      h('div',{class:'pc-top'},
        h('div',{class:'display',style:'font-size:2.6rem'},String(d.points)),
        h('div',{style:'text-align:right'},
          h('div',{class:'display',style:'font-size:1.5rem'},'ICAD'),
          h('div',{style:'font-size:.7rem;text-transform:uppercase;letter-spacing:.15em'},d.department))
      ),
      h('div',{class:'pc-img'}, h('img',{src:imgSrc,alt:d.name,loading:'lazy'})),
      h('div',{class:'pc-name'},d.name),
      h('div',{class:'pc-stats'},
        h('div',{},h('div',{class:'display',style:'font-size:1.2rem'},d.accuracy+'%'),'Accuracy'),
        h('div',{},h('div',{class:'display',style:'font-size:1.2rem'},d.points),'Points'),
        h('div',{},h('div',{class:'display',style:'font-size:1.2rem'},extra||'★★★'),'Rating'))
    );
  }

  // ---------- Stages ----------
  function loadingStage(){
    const section = h('section',{class:'section stadium-bg'});
    const lights = h('div',{class:'tunnel-lights'});
    for(let i=0;i<6;i++) lights.appendChild(h('span',{style:`left:${i*18}%`}));
    section.appendChild(lights);
    const box = h('div',{style:'position:relative;z-index:2'});
    const tag = h('p',{class:'tag text-cyan',style:'margin-bottom:1rem'},'STADIUM TUNNEL · READY');
    const num = h('div',{class:'count gold-shine'},'3');
    const btn = h('button',{class:'btn pulse-glow',style:'margin-top:2rem;display:none',onClick:next},'Enter Stadium');
    box.append(tag,num,btn);
    section.appendChild(box);
    let n=3;
    const t=setInterval(()=>{
      n--; if(n>0){num.textContent=String(n);}
      else if(n===0){num.textContent='2';}
      else if(n===-1){num.textContent='1';}
      else if(n===-2){num.textContent='KICK OFF';btn.style.display='inline-flex';clearInterval(t);}
    },900);
    num.textContent='3';
    return section;
  }

  function welcomeStage(){
    const s = h('section',{class:'section stadium-bg'});
    s.append(
      h('p',{class:'tag text-cyan rise'},'ICAD PRESENTS'),
      h('h1',{class:'title rise',style:'margin:.5rem 0'},'FIFA WORLD CUP ', h('span',{class:'gold-shine'},'2026')),
      h('p',{class:'subtitle text-cyan rise'},'PREDICTION CONTEST'),
      h('p',{class:'subtitle text-neon rise',style:'letter-spacing:.2em'},'— WINNER REVEAL —'),
      h('div',{class:'ball-hero spin-slow'}),
      h('button',{class:'btn pulse-glow',onClick:next},'⚽ Start The Match'),
      h('p',{class:'muted',style:'margin-top:1.5rem;font-size:.9rem'},'Score a penalty to unlock the winners.')
    );
    return s;
  }

  function gameStage(){
    const s = h('section',{class:'section grad-hero'});
    s.append(
      h('h2',{class:'title'},'Penalty Shoot-out'),
      h('p',{class:'tag text-cyan',style:'margin:.5rem 0 1.5rem'},'SCORE TO UNLOCK · CHOOSE DIRECTION · HOLD TO CHARGE')
    );
    const pitch = h('div',{class:'pitch-wrap pitch-bg'});
    const frame = h('div',{class:'goal-frame'});
    const keeper = h('div',{class:'keeper',style:'left:50%;transform:translateX(-50%)'});
    const ball = h('div',{class:'ball',style:'left:50%;transform:translate(-50%,0)'});
    pitch.append(frame,keeper,ball);
    s.appendChild(pitch);

    const controls = h('div',{class:'controls'});
    const dirBtns = ['L','C','R'].map(d=>h('button',{class:'dir-btn',onClick:()=>{dir=d;updateDirBtns();ball.style.left=(d==='L'?'22%':d==='R'?'78%':'50%');}},
      d==='L'?'◀ LEFT':d==='C'?'● CENTER':'RIGHT ▶'));
    const powerBar = h('div',{class:'power-bar'}, h('div',{class:'power-fill'}));
    const powerWrap = h('div',{class:'power-wrap'}, powerBar, h('p',{class:'muted',style:'font-size:.7rem;letter-spacing:.2em;margin:.3rem 0 0'},'POWER 0%'));
    const shootBtn = h('button',{class:'btn'},'HOLD TO SHOOT');
    controls.append(h('div',{style:'display:flex;gap:.5rem'},...dirBtns), powerWrap, shootBtn);
    s.appendChild(controls);

    let dir='C', keeperDir='C', power=0, charging=false, shot=null;
    function updateDirBtns(){ dirBtns.forEach((b,i)=>{ b.classList.toggle('active', ['L','C','R'][i]===dir); }); }
    updateDirBtns();
    dirBtns[1].classList.add('active');

    // EASY keeper: slow moves
    const keeperTimer = setInterval(()=>{
      keeperDir = ['L','C','R'][Math.floor(Math.random()*3)];
      keeper.style.left = keeperDir==='L'?'20%':keeperDir==='R'?'80%':'50%';
    }, 1400);

    let powerTimer=null;
    function startCharge(){
      if(shot) return;
      charging=true; power=0;
      powerTimer=setInterval(()=>{
        power=Math.min(100,power+6);
        powerBar.firstChild.style.width=power+'%';
        powerWrap.lastChild.textContent='POWER '+power+'%';
      },40);
      shootBtn.textContent='RELEASE!';
    }
    function shoot(){
      if(!charging||shot) return;
      charging=false; clearInterval(powerTimer);
      shootBtn.textContent='HOLD TO SHOOT';
      if(power<10) return;
      // EASY: only miss if same direction AND low power
      const blocked = dir===keeperDir && power<55;
      shot = blocked?'miss':'goal';
      if(shot==='goal'){
        ball.style.transition='all .8s'; ball.style.transform='translate(-50%,-260%) scale(.8)';
        clearInterval(keeperTimer);
        const overlay=h('div',{style:'position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;z-index:6'},
          h('div',{style:'position:absolute;inset:0;background:rgba(255,255,255,.3)',class:'flash'}),
          h('div',{class:'title gold-shine rise',style:'font-size:clamp(3rem,10vw,7rem);text-shadow:0 0 30px #f7c948'},'GOAAAL!'),
          confetti(true));
        pitch.appendChild(overlay);
        setTimeout(next,2200);
      } else {
        ball.style.transition='all .8s'; ball.style.transform='translate(-50%,-220%) rotate(120deg)';
        setTimeout(()=>{
          shot=null; power=0; ball.style.transition='all .3s';
          ball.style.transform='translate(-50%,0)';
          powerBar.firstChild.style.width='0%'; powerWrap.lastChild.textContent='POWER 0%';
        },1200);
      }
    }
    shootBtn.addEventListener('mousedown',startCharge);
    shootBtn.addEventListener('mouseup',shoot);
    shootBtn.addEventListener('mouseleave',()=>{if(charging)shoot();});
    shootBtn.addEventListener('touchstart',e=>{e.preventDefault();startCharge();});
    shootBtn.addEventListener('touchend',e=>{e.preventDefault();shoot();});
    return s;
  }

  function trophyStage(){
    const s = h('section',{class:'section',style:'background:#000'});
    s.appendChild(h('div',{style:'position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(247,201,72,.3),transparent 60%)'}));
    s.append(
      h('p',{class:'tag text-cyan rise'},'CONGRATULATIONS'),
      h('h2',{class:'title gold-shine rise',style:'margin:1rem 0 2rem'},'The Trophy Awaits'),
      h('img',{src:IMG.trophy,alt:'Trophy',class:'trophy-img pulse-glow'}),
      h('button',{class:'btn',style:'margin-top:2.5rem',onClick:next},'Reveal Champions')
    );
    return s;
  }

  function revealStage(title,data,img,label){
    const s = h('section',{class:'section grad-hero'});
    s.append(confetti(),
      h('p',{class:'subtitle rise',style:'color:var(--cyan);letter-spacing:.2em;margin-bottom:1.5rem'},title),
      playerCard(title,data,img,label),
      h('button',{class:'btn',style:'margin-top:2.5rem',onClick:next},'Next Reveal')
    );
    return s;
  }

  function championStage(){
    const s = h('section',{class:'section',style:'background:#000'});
    s.appendChild(h('div',{style:'position:absolute;inset:0;background:radial-gradient(ellipse at center,rgba(30,20,90,.6),black 70%)'}));
    const box = h('div',{style:'position:relative;text-align:center;z-index:2'});
    const label = h('p',{class:'tag text-cyan',style:'margin-bottom:1rem'},'CHAMPION INCOMING');
    const num = h('div',{class:'count gold-shine pulse-glow'},'3');
    box.append(label,num);
    s.appendChild(box);
    let n=3;
    const t=setInterval(()=>{
      n--; if(n>0){num.textContent=String(n);}
      else{
        clearInterval(t);
        box.remove();
        const wrap = h('div',{class:'rise',style:'position:relative;z-index:2;display:flex;flex-direction:column;align-items:center'});
        wrap.appendChild(confetti(true));
        wrap.append(
          h('p',{class:'subtitle gold-shine',style:'letter-spacing:.3em'},'— CHAMPION —'),
          h('div',{style:'transform:scale(1.1);margin:1.5rem 0'}, playerCard('Champion',winners.champion,IMG.champion,'🏆')),
          h('h1',{class:'title gold-shine',style:'margin-top:1rem'},'CHAMPION!'),
          h('button',{class:'btn',style:'margin-top:2rem',onClick:next},'Hall of Fame')
        );
        s.appendChild(wrap);
      }
    },1000);
    return s;
  }

  function hallStage(){
    const items = [
      {t:'Champion',d:winners.champion,i:IMG.champion,e:'🏆'},
      {t:'Runner-up',d:winners.runnerup,i:IMG.runnerup,e:'🥈'},
      {t:'Third Place',d:winners.third,i:IMG.third,e:'🥉'},
      {t:'Top Scorer',d:winners.topScorer,i:IMG.topScorer,e:'⚽'}];
    const s = h('section',{class:'section grad-hero'});
    s.append(
      h('h2',{class:'title gold-shine'},'Hall of Fame'),
      h('p',{class:'tag text-cyan',style:'margin:.75rem 0 2.5rem'},'THE ICAD LEGENDS OF 2026')
    );
    const grid = h('div',{class:'grid grid-4'});
    items.forEach(it=>{
      const wrap = h('div',{style:'display:flex;flex-direction:column;align-items:center;gap:.75rem'});
      wrap.appendChild(playerCard(it.t,it.d,it.i,it.e));
      wrap.appendChild(h('div',{class:'tag text-gold'},it.t));
      grid.appendChild(wrap);
    });
    s.appendChild(grid);
    s.appendChild(h('button',{class:'btn',style:'margin-top:2.5rem',onClick:next},'View Statistics'));
    return s;
  }

  function statsStage(){
    const items=[
      {l:'Participants',v:1284},{l:'Countries',v:32},{l:'Matches Predicted',v:64},
      {l:'Avg. Accuracy',v:76,x:'%'},{l:'Highest Score',v:298}];
    const s = h('section',{class:'section',style:'background:var(--bg)'});
    s.appendChild(h('h2',{class:'title gold-shine',style:'margin-bottom:2.5rem'},'Tournament Stats'));
    const grid = h('div',{class:'grid grid-3'});
    items.forEach(it=>{
      const card = h('div',{class:'stat-card'});
      const num = h('div',{class:'stat-num'},'0');
      card.append(num, h('div',{class:'muted',style:'font-size:.75rem;letter-spacing:.2em;text-transform:uppercase;margin-top:.5rem'},it.l));
      grid.appendChild(card);
      const start=performance.now(), dur=1500;
      requestAnimationFrame(function tick(t){
        const p=Math.min(1,(t-start)/dur);
        num.textContent=Math.round(it.v*(1-Math.pow(1-p,3)))+(it.x||'');
        if(p<1) requestAnimationFrame(tick);
      });
    });
    s.appendChild(grid);
    s.appendChild(h('button',{class:'btn',style:'margin-top:3rem',onClick:next},'The Journey'));
    return s;
  }

  function timelineStage(){
    const stages=['Group Stage','Round of 16','Quarter Final','Semi Final','The Final'];
    const s = h('section',{class:'section grad-hero'});
    s.appendChild(h('h2',{class:'title',style:'margin-bottom:2.5rem'},'The Journey'));
    const tl = h('div',{class:'tl'});
    stages.forEach((st,i)=>{
      tl.appendChild(h('div',{class:'tl-row rise',style:`animation-delay:${i*100}ms`},
        h('div',{class:'tl-num'},String(i+1)),
        h('div',{class:'tl-body'},st)));
    });
    s.appendChild(tl);
    s.appendChild(h('button',{class:'btn',style:'margin-top:2.5rem',onClick:next},'Open Gallery'));
    return s;
  }

  function galleryStage(){
    const s = h('section',{class:'section',style:'background:var(--bg)'});
    s.appendChild(h('h2',{class:'title gold-shine',style:'margin-bottom:2rem'},'Moments'));
    const g = h('div',{class:'gal'});
    [IMG.stadium,IMG.trophy,IMG.champion,IMG.runnerup,IMG.third,IMG.topScorer].forEach(src=>{
      g.appendChild(h('div',{class:'gal-item'}, h('img',{src,alt:'',loading:'lazy'})));
    });
    s.appendChild(g);
    s.appendChild(h('button',{class:'btn',style:'margin-top:2.5rem',onClick:next},'Credits'));
    return s;
  }

  function creditsStage(){
    const s = h('section',{class:'section',style:'background:#000'});
    s.append(
      h('p',{class:'tag text-cyan'},'ORGANIZED BY'),
      h('h2',{class:'title gold-shine',style:'font-size:clamp(4rem,15vw,10rem);margin:.5rem 0 2rem'},'ICAD'),
      h('p',{class:'muted',style:'max-width:520px;margin:0 auto 1.5rem'},'A heartfelt thanks to the committee, every participant, and our sponsors who made the ICAD FIFA World Cup 2026 Prediction Contest an unforgettable celebration of football.'),
      h('div',{},
        ...['Committee','Participants','Sponsors','Volunteers'].map(t=>h('span',{class:'tag-pill'},t))),
      h('div',{class:'credits-footer'},'⚽ Full Time · See you in the next season ⚽'),
      h('p',{class:'muted',style:'font-size:.75rem;margin-top:2rem'},'© 2026 ICAD · FIFA World Cup Prediction Contest')
    );
    return s;
  }

  const RENDERERS = {loading:loadingStage,welcome:welcomeStage,game:gameStage,trophy:trophyStage,
    fourth:()=>revealStage('4th · Top Scorer',winners.topScorer,IMG.topScorer,'⚽'),
    third:()=>revealStage('Third Place',winners.third,IMG.third,'🥉'),
    runnerup:()=>revealStage('Runner-up',winners.runnerup,IMG.runnerup,'🥈'),
    champion:championStage,hall:hallStage,stats:statsStage,timeline:timelineStage,
    gallery:galleryStage,credits:creditsStage};

  function render(){
    app.innerHTML='';
    app.appendChild(floats());
    app.appendChild(RENDERERS[stage]());
    window.scrollTo({top:0,behavior:'instant'});
  }
})();
