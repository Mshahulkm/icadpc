import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import confetti from "canvas-confetti";


type Winner = {
  name: string;
  department: string;
  points: number;
  accuracy: number;
};
type WinnersData = {
  champion: Winner;
  runnerup: Winner;
  third: Winner;
  topScorer: Winner;
  bestPredictor: Winner;
  luckyDraw: Winner;
  stats: {
    participants: number;
    countries: number;
    matches: number;
    avgAccuracy: number;
    highest: number;
  };
};

type Stage = "loading" | "hero" | "game" | "trophy" | "reveal" | "hall";

function Index() {
  const [stage, setStage] = useState<Stage>("loading");
  const [data, setData] = useState<WinnersData | null>(null);
  const [soundOn, setSoundOn] = useState(false);

  useEffect(() => {
    fetch("/winners.json")
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, []);

  return (
    <main className="relative min-h-screen text-foreground">
      <FloatingBalls />
      <SoundToggle on={soundOn} setOn={setSoundOn} />
      {stage === "loading" && <StadiumLoader onDone={() => setStage("hero")} />}
      {stage === "hero" && <Hero onStart={() => setStage("game")} />}
      {stage === "game" && <PenaltyGame onGoal={() => setStage("trophy")} />}
      {stage === "trophy" && <TrophyReveal onReveal={() => setStage("reveal")} />}
      {(stage === "reveal" || stage === "hall") && data && (
        <WinnersReveal data={data} onFinish={() => setStage("hall")} />
      )}
      {stage === "hall" && data && <PostReveal data={data} />}
    </main>
  );
}

/* ---------- Ambient ---------- */

function FloatingBalls() {
  const balls = useMemo(
    () =>
      Array.from({ length: 10 }, (_, i) => ({
        left: `${(i * 97) % 100}%`,
        top: `${(i * 53) % 100}%`,
        size: 12 + ((i * 7) % 22),
        delay: (i % 5) * 0.6,
        dur: 6 + (i % 4),
      })),
    [],
  );
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 opacity-40 scanline" />
      {balls.map((b, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white/10 blur-[1px] animate-float"
          style={{
            left: b.left,
            top: b.top,
            width: b.size,
            height: b.size,
            animationDelay: `${b.delay}s`,
            animationDuration: `${b.dur}s`,
          }}
        />
      ))}
    </div>
  );
}

function SoundToggle({ on, setOn }: { on: boolean; setOn: (b: boolean) => void }) {
  return (
    <button
      onClick={() => setOn(!on)}
      aria-label="Toggle stadium sound"
      className="fixed right-4 top-4 z-50 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-4 py-2 text-xs font-semibold uppercase tracking-widest text-white/80 backdrop-blur hover:border-primary hover:text-primary"
    >
      <span className="inline-block h-2 w-2 rounded-full" style={{ background: on ? "var(--wc-green)" : "var(--wc-red)" }} />
      {on ? "Stadium On" : "Muted"}
    </button>
  );
}

/* ---------- Loading ---------- */

function StadiumLoader({ onDone }: { onDone: () => void }) {
  const [count, setCount] = useState<number | "KICK OFF">(3);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const seq = [3, 2, 1, "KICK OFF" as const];
    let i = 0;
    setCount(seq[0]);
    const t = setInterval(() => {
      i++;
      if (i >= seq.length) {
        clearInterval(t);
        setTimeout(onDone, 900);
      } else {
        setCount(seq[i]);
      }
    }, 950);
    return () => clearInterval(t);
  }, [onDone]);

  useEffect(() => {
    if (!rootRef.current) return;
    gsap.fromTo(
      rootRef.current.querySelector(".count"),
      { scale: 0.4, opacity: 0, rotate: -20 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.5, ease: "back.out(2)" },
    );
  }, [count]);

  return (
    <section
      ref={rootRef}
      className="fixed inset-0 z-40 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.18 0.08 265) 0%, oklch(0.04 0.02 265) 70%)",
      }}
    >
      {/* stadium lights */}
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute top-0 h-[70vh] w-[10vw] origin-top animate-flicker"
          style={{
            left: `${10 + i * 14}%`,
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--wc-cyan) 30%, transparent), transparent)",
            transform: `rotate(${i % 2 === 0 ? -8 : 8}deg)`,
            animationDelay: `${i * 0.3}s`,
          }}
        />
      ))}
      {/* laser sweep */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent, color-mix(in oklab, var(--wc-cyan) 25%, transparent), transparent)",
          animation: "sweep 3s linear infinite",
          mixBlendMode: "screen",
        }}
      />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="text-xs uppercase tracking-[0.6em] text-white/60">Entering Stadium</div>
        <div
          key={String(count)}
          className="count text-champion font-display leading-none"
          style={{
            fontSize: typeof count === "number" ? "min(48vw, 22rem)" : "min(18vw, 10rem)",
            textShadow: "0 0 60px color-mix(in oklab, var(--wc-gold) 60%, transparent)",
          }}
        >
          {count}
        </div>
        <div className="h-1.5 w-64 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full"
            style={{
              background: "var(--gradient-gold)",
              width: count === "KICK OFF" ? "100%" : `${((3 - (count as number)) / 3) * 100}%`,
              transition: "width 0.9s ease",
            }}
          />
        </div>
      </div>

      {/* football spinning */}
      <div className="pointer-events-none absolute bottom-10 right-10 animate-spin-ball">
        <Football size={80} />
      </div>
    </section>
  );
}

/* ---------- Football SVG ---------- */
function Football({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100">
      <defs>
        <radialGradient id="fball" cx="35%" cy="35%">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#c7c7c7" />
        </radialGradient>
      </defs>
      <circle cx="50" cy="50" r="46" fill="url(#fball)" stroke="#111" strokeWidth="2" />
      <polygon
        points="50,32 62,40 58,54 42,54 38,40"
        fill="#111"
        stroke="#111"
        strokeLinejoin="round"
      />
      <path d="M50 32 L50 18 M62 40 L74 32 M58 54 L70 62 M42 54 L30 62 M38 40 L26 32"
        stroke="#111" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

/* ---------- Hero ---------- */
function Hero({ onStart }: { onStart: () => void }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-line", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.12,
        ease: "power4.out",
      });
      gsap.from(".hero-ball", {
        scale: 0,
        opacity: 0,
        rotate: -360,
        duration: 1.3,
        ease: "back.out(1.8)",
        delay: 0.4,
      });
      gsap.fromTo(
        ".hero-cta",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 1.1, immediateRender: false },
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-24 text-center"
    >
      <CrowdRow />
      <Flags />

      <div className="text-xs uppercase tracking-[0.5em] text-accent hero-line">
        ICAD Presents
      </div>
      <h1
        className="hero-line mt-4 font-display text-[clamp(3.5rem,12vw,10rem)] leading-[0.9] text-white"
        style={{ textShadow: "0 4px 40px rgba(0,0,0,0.6)" }}
      >
        FIFA WORLD CUP
        <br />
        <span className="text-champion">2026</span>
      </h1>
      <div className="hero-line mt-4 font-display text-2xl md:text-4xl text-white/85">
        Prediction Contest · Winners Reveal
      </div>

      <div className="hero-ball my-10 animate-spin-ball">
        <Football size={140} />
      </div>

      <button
        onClick={onStart}
        className="hero-cta group relative overflow-hidden rounded-2xl border-2 border-primary bg-black/60 px-10 py-5 font-display text-2xl tracking-widest text-primary shadow-gold transition hover:scale-[1.03]"
      >
        <span className="absolute inset-0 -z-0 opacity-0 transition group-hover:opacity-100" style={{ background: "var(--gradient-champion)" }} />
        <span className="relative z-10 group-hover:text-black">▶ START THE MATCH</span>
      </button>
      <p className="hero-line mt-6 max-w-md text-sm text-white/60">
        Score a goal to unlock the champion reveal. Miss and the crowd goes silent.
      </p>

      <ScoreboardStrip />
    </section>
  );
}

function CrowdRow() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 flex h-40 items-end justify-center gap-[2px] overflow-hidden opacity-70">
      {Array.from({ length: 120 }).map((_, i) => (
        <div
          key={i}
          className="animate-flicker"
          style={{
            width: 6,
            height: 20 + ((i * 13) % 40),
            background: `oklch(${0.3 + ((i * 7) % 30) / 100} 0.12 ${(i * 37) % 360})`,
            borderRadius: "3px 3px 0 0",
            animation: `waveCrowd 2.4s ease-in-out ${(i % 20) * 0.08}s infinite`,
          }}
        />
      ))}
      <div
        className="absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(to top, var(--wc-ink), transparent)" }}
      />
    </div>
  );
}

function Flags() {
  const flags: { code: string; colors: [string, string, string] }[] = [
    { code: "ARG", colors: ["#75AADB", "#FFFFFF", "#75AADB"] },
    { code: "BRA", colors: ["#009C3B", "#FFDF00", "#002776"] },
    { code: "FRA", colors: ["#0055A4", "#FFFFFF", "#EF4135"] },
    { code: "GER", colors: ["#000000", "#DD0000", "#FFCE00"] },
    { code: "ESP", colors: ["#AA151B", "#F1BF00", "#AA151B"] },
    { code: "POR", colors: ["#006600", "#FF0000", "#FFD700"] },
    { code: "ENG", colors: ["#FFFFFF", "#CE1124", "#FFFFFF"] },
    { code: "ITA", colors: ["#009246", "#FFFFFF", "#CE2B37"] },
    { code: "NED", colors: ["#AE1C28", "#FFFFFF", "#21468B"] },
    { code: "JPN", colors: ["#FFFFFF", "#BC002D", "#FFFFFF"] },
  ];
  return (
    <div className="pointer-events-none absolute inset-x-0 top-16 flex justify-around px-4 opacity-90">
      {flags.map((f, i) => (
        <div
          key={i}
          className="animate-float flex flex-col items-center gap-1"
          style={{ animationDelay: `${i * 0.3}s` }}
        >
          <div
            className="h-6 w-10 overflow-hidden rounded-sm border border-white/30 shadow"
            style={{
              background: `linear-gradient(180deg, ${f.colors[0]} 0 33%, ${f.colors[1]} 33% 66%, ${f.colors[2]} 66% 100%)`,
            }}
          />
          <span className="font-display text-[10px] tracking-widest text-white/80">{f.code}</span>
        </div>
      ))}
    </div>
  );
}

function ScoreboardStrip() {
  return (
    <div className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-lg border border-primary/40 bg-black px-4 py-2 font-display text-sm tracking-widest text-primary shadow-gold">
      LIVE · ICAD ARENA · 2026 · CEREMONY
    </div>
  );
}

/* ---------- Penalty Game ---------- */
function PenaltyGame({ onGoal }: { onGoal: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"aim" | "shot" | "goal" | "miss">("aim");
  const [power, setPower] = useState(0);
  const [aim, setAim] = useState(0); // -1..1
  const powerDir = useRef(1);
  const rafRef = useRef<number>(0);
  const keeperX = useRef(0);
  const keeperDir = useRef(1);

  // power meter oscillation
  useEffect(() => {
    if (status !== "aim") return;
    let last = performance.now();
    const loop = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setPower((p) => {
        let next = p + powerDir.current * dt * 1.4;
        if (next >= 1) {
          next = 1;
          powerDir.current = -1;
        }
        if (next <= 0) {
          next = 0;
          powerDir.current = 1;
        }
        return next;
      });
      keeperX.current += keeperDir.current * dt * 0.9;
      if (keeperX.current > 0.7) keeperDir.current = -1;
      if (keeperX.current < -0.7) keeperDir.current = 1;
      draw();
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line
  }, [status, aim]);

  const draw = () => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const W = c.width;
    const H = c.height;
    ctx.clearRect(0, 0, W, H);

    // sky
    const sky = ctx.createLinearGradient(0, 0, 0, H);
    sky.addColorStop(0, "#0a1233");
    sky.addColorStop(1, "#1a2b6b");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, W, H);

    // pitch
    const pitchTop = H * 0.55;
    ctx.fillStyle = "#0e5c2a";
    ctx.fillRect(0, pitchTop, W, H - pitchTop);
    for (let i = 0; i < 8; i++) {
      ctx.fillStyle = i % 2 === 0 ? "#0e5c2a" : "#0c5024";
      ctx.fillRect(0, pitchTop + i * ((H - pitchTop) / 8), W, (H - pitchTop) / 8);
    }

    // goal
    const goalW = W * 0.7;
    const goalH = H * 0.35;
    const goalX = (W - goalW) / 2;
    const goalY = pitchTop - goalH + 20;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 6;
    ctx.strokeRect(goalX, goalY, goalW, goalH);
    // net
    ctx.strokeStyle = "rgba(255,255,255,0.25)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= goalW; x += 14) {
      ctx.beginPath();
      ctx.moveTo(goalX + x, goalY);
      ctx.lineTo(goalX + x, goalY + goalH);
      ctx.stroke();
    }
    for (let y = 0; y <= goalH; y += 14) {
      ctx.beginPath();
      ctx.moveTo(goalX, goalY + y);
      ctx.lineTo(goalX + goalW, goalY + y);
      ctx.stroke();
    }

    // keeper
    const kx = goalX + goalW / 2 + keeperX.current * (goalW / 2 - 40);
    const ky = goalY + goalH * 0.55;
    ctx.fillStyle = "#ffcf3a";
    ctx.beginPath();
    ctx.arc(kx, ky - 40, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(kx - 18, ky - 30, 36, 46);
    ctx.fillStyle = "#111";
    ctx.fillRect(kx - 18, ky + 16, 14, 26);
    ctx.fillRect(kx + 4, ky + 16, 14, 26);

    // aim indicator
    const ballX = W / 2 + aim * (W * 0.35);
    const ballY = H * 0.82;
    ctx.strokeStyle = "rgba(255,255,255,0.5)";
    ctx.setLineDash([6, 6]);
    ctx.beginPath();
    ctx.moveTo(W / 2, ballY);
    ctx.lineTo(ballX, goalY + goalH / 2);
    ctx.stroke();
    ctx.setLineDash([]);

    // ball
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(W / 2, ballY, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = "#111";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.fillStyle = "#111";
    ctx.beginPath();
    ctx.arc(W / 2, ballY, 5, 0, Math.PI * 2);
    ctx.fill();
  };

  const shoot = () => {
    if (status !== "aim") return;
    cancelAnimationFrame(rafRef.current);
    setStatus("shot");
    const c = canvasRef.current!;
    const W = c.width;
    const H = c.height;
    const goalW = W * 0.7;
    const goalX = (W - goalW) / 2;
    const goalY = H * 0.55 - H * 0.35 + 20;
    const goalH = H * 0.35;

    const targetX = W / 2 + aim * (W * 0.35);
    const targetY = goalY + goalH / 2;
    const startX = W / 2;
    const startY = H * 0.82;

    const keeperFinal = keeperX.current;
    const kx = goalX + goalW / 2 + keeperFinal * (goalW / 2 - 40);
    const powerFactor = 0.4 + power * 0.6;

    const scored =
      Math.abs(targetX - kx) > 60 && targetX > goalX + 20 && targetX < goalX + goalW - 20;

    // animate ball
    const obj = { t: 0 };
    gsap.to(obj, {
      t: 1,
      duration: 0.8 * (1.4 - powerFactor),
      ease: "power2.in",
      onUpdate: () => {
        const ctx = c.getContext("2d")!;
        draw();
        const x = startX + (targetX - startX) * obj.t;
        const y = startY + (targetY - startY) * obj.t - Math.sin(obj.t * Math.PI) * 60;
        ctx.fillStyle = "#fff";
        ctx.beginPath();
        ctx.arc(x, y, 14 - obj.t * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = "#111";
        ctx.stroke();
      },
      onComplete: () => {
        if (scored) {
          setStatus("goal");
          confetti({
            particleCount: 220,
            spread: 120,
            origin: { y: 0.6 },
            colors: ["#ffd700", "#00e5ff", "#00ff7f", "#ff2d55"],
          });
          setTimeout(() => {
            confetti({ particleCount: 300, spread: 160, origin: { y: 0.4 } });
          }, 400);
          setTimeout(onGoal, 2400);
        } else {
          setStatus("miss");
          setTimeout(() => {
            setStatus("aim");
            setAim(0);
            setPower(0);
          }, 1400);
        }
      },
    });
  };

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const resize = () => {
      const rect = c.getBoundingClientRect();
      c.width = rect.width * devicePixelRatio;
      c.height = rect.height * devicePixelRatio;
      c.getContext("2d")!.scale(devicePixelRatio, devicePixelRatio);
      c.width = rect.width;
      c.height = rect.height;
      draw();
    };
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
    // eslint-disable-next-line
  }, []);

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-start px-4 py-16">
      <div className="mb-2 text-xs uppercase tracking-[0.5em] text-accent">Penalty Shootout</div>
      <h2 className="mb-6 font-display text-4xl md:text-6xl text-white">
        Score to unlock the reveal
      </h2>

      <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-neon">
        <canvas ref={canvasRef} className="h-[60vh] w-full" />
        {status === "goal" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm">
            <div
              className="font-display text-6xl md:text-8xl text-champion animate-pulse-glow"
              style={{ textShadow: "0 0 40px rgba(255,215,0,0.7)" }}
            >
              G O A L !!!
            </div>
          </div>
        )}
        {status === "miss" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
            <div className="font-display text-5xl text-destructive">SAVED! Try Again</div>
          </div>
        )}
      </div>

      <div className="mt-6 w-full max-w-3xl space-y-4">
        <div>
          <div className="mb-1 flex justify-between text-xs uppercase tracking-widest text-white/60">
            <span>Aim</span>
            <span>← Left · Right →</span>
          </div>
          <input
            type="range"
            min={-100}
            max={100}
            value={aim * 100}
            disabled={status !== "aim"}
            onChange={(e) => setAim(Number(e.target.value) / 100)}
            className="w-full accent-[oklch(0.82_0.17_210)]"
          />
        </div>
        <div>
          <div className="mb-1 flex justify-between text-xs uppercase tracking-widest text-white/60">
            <span>Power Meter</span>
            <span>{Math.round(power * 100)}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border border-white/20 bg-black/50">
            <div
              className="h-full transition-none"
              style={{
                width: `${power * 100}%`,
                background:
                  "linear-gradient(90deg, var(--wc-green), var(--wc-gold), var(--wc-red))",
              }}
            />
          </div>
        </div>
        <button
          onClick={shoot}
          disabled={status !== "aim"}
          className="w-full rounded-xl border-2 border-primary bg-black py-4 font-display text-3xl tracking-widest text-primary shadow-gold transition hover:scale-[1.01] disabled:opacity-50"
        >
          ⚽ SHOOT
        </button>
      </div>
    </section>
  );
}

/* ---------- Trophy Reveal ---------- */
function TrophyReveal({ onReveal }: { onReveal: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".trophy-el", { scale: 0.2, opacity: 0, duration: 1.2, ease: "back.out(1.6)" });
      gsap.from(".trophy-h", { y: 40, opacity: 0, duration: 0.8, delay: 0.6 });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={ref}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center"
      style={{
        background:
          "radial-gradient(ellipse at center, oklch(0.15 0.06 268) 0%, oklch(0.03 0.01 268) 70%)",
      }}
    >
      {/* spotlight */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 40vw 60vh at center, color-mix(in oklab, var(--wc-gold) 25%, transparent), transparent 60%)",
        }}
      />
      {/* gold particles */}
      {Array.from({ length: 30 }).map((_, i) => (
        <div
          key={i}
          className="pointer-events-none absolute animate-float rounded-full"
          style={{
            width: 4 + (i % 3) * 2,
            height: 4 + (i % 3) * 2,
            background: "var(--wc-gold-hot)",
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            animationDelay: `${(i % 5) * 0.4}s`,
            filter: "drop-shadow(0 0 6px var(--wc-gold-hot))",
          }}
        />
      ))}

      <div className="trophy-el animate-spin-ball" style={{ animationDuration: "12s" }}>
        <TrophySVG />
      </div>
      <div className="trophy-h mt-8 text-xs uppercase tracking-[0.6em] text-accent">
        Congratulations
      </div>
      <h2 className="trophy-h mt-2 font-display text-6xl md:text-8xl text-champion animate-pulse-glow">
        THE TROPHY IS YOURS
      </h2>
      <button
        onClick={onReveal}
        className="trophy-h mt-10 rounded-2xl border-2 border-primary bg-black/60 px-10 py-5 font-display text-2xl tracking-widest text-primary shadow-gold hover:scale-[1.03]"
      >
        REVEAL CHAMPIONS →
      </button>
    </section>
  );
}

function TrophySVG() {
  return (
    <svg width="220" height="280" viewBox="0 0 220 280">
      <defs>
        <linearGradient id="tg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff3a8" />
          <stop offset="50%" stopColor="#f5c542" />
          <stop offset="100%" stopColor="#a67102" />
        </linearGradient>
      </defs>
      <ellipse cx="110" cy="60" rx="70" ry="22" fill="url(#tg)" />
      <path d="M50 60 C40 140, 80 170, 110 170 C 140 170, 180 140, 170 60 Z" fill="url(#tg)" />
      <rect x="90" y="170" width="40" height="30" fill="url(#tg)" />
      <rect x="60" y="200" width="100" height="20" rx="4" fill="url(#tg)" />
      <rect x="40" y="220" width="140" height="30" rx="6" fill="url(#tg)" />
      <ellipse cx="110" cy="55" rx="55" ry="10" fill="rgba(255,255,255,0.4)" />
    </svg>
  );
}

/* ---------- Winners Reveal ---------- */

const REVEAL_ORDER: {
  key: keyof Omit<WinnersData, "stats">;
  label: string;
  medal: string;
  place: string;
  tint: string;
}[] = [
  { key: "topScorer", label: "Golden Boot", medal: "🥇", place: "Top Scorer", tint: "var(--wc-orange)" },
  { key: "third", label: "Third Place", medal: "🥉", place: "3rd", tint: "var(--wc-cyan)" },
  { key: "runnerup", label: "Runner-Up", medal: "🥈", place: "2nd", tint: "var(--wc-purple)" },
  { key: "champion", label: "Champion", medal: "🏆", place: "1st", tint: "var(--wc-gold)" },
];

function WinnersReveal({ data, onFinish }: { data: WinnersData; onFinish: () => void }) {
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const current = REVEAL_ORDER[idx];
  const isChampion = current?.key === "champion";

  useEffect(() => {
    setRevealed(false);
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { y: 200, opacity: 0, rotateX: -30, scale: 0.8 },
        { y: 0, opacity: 1, rotateX: 0, scale: 1, duration: 1.1, ease: "power4.out" },
      );
    });
    const t = setTimeout(() => setRevealed(true), 900);
    return () => {
      ctx.revert();
      clearTimeout(t);
    };
  }, [idx]);

  useEffect(() => {
    if (revealed && isChampion) {
      confetti({
        particleCount: 400,
        spread: 180,
        origin: { y: 0.4 },
        colors: ["#ffd700", "#ffb700", "#fff2a8"],
      });
      const burst = setInterval(() => {
        confetti({ particleCount: 80, spread: 100, origin: { x: Math.random(), y: 0.3 } });
      }, 700);
      setTimeout(() => clearInterval(burst), 4000);
    } else if (revealed) {
      confetti({ particleCount: 120, spread: 100, origin: { y: 0.5 } });
    }
  }, [revealed, isChampion]);

  const next = () => {
    if (idx < REVEAL_ORDER.length - 1) setIdx(idx + 1);
    else onFinish();
  };

  if (!current) return null;
  const winner = data[current.key];

  return (
    <section
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-16"
      style={{
        background: isChampion
          ? "radial-gradient(ellipse at center, oklch(0.15 0.1 85) 0%, oklch(0.03 0.02 265) 70%)"
          : "radial-gradient(ellipse at center, oklch(0.15 0.08 265) 0%, oklch(0.04 0.02 265) 80%)",
      }}
    >
      <LEDScoreboard label={current.label} step={`${idx + 1} / ${REVEAL_ORDER.length}`} />

      <div className="mt-8 text-xs uppercase tracking-[0.5em] text-accent">Winner Reveal</div>
      <h2 className="mt-2 font-display text-4xl md:text-6xl text-white">{current.place}</h2>

      <div ref={cardRef} className="mt-8 [perspective:1000px]">
        <PlayerCard
          winner={winner}
          medal={current.medal}
          tint={current.tint}
          isChampion={isChampion}
          revealed={revealed}
        />
      </div>

      {isChampion && revealed && (
        <h3 className="mt-6 font-display text-5xl md:text-7xl text-champion animate-pulse-glow">
          🏆 CHAMPION 🏆
        </h3>
      )}

      <button
        onClick={next}
        className="mt-10 rounded-xl border-2 border-primary bg-black/60 px-8 py-4 font-display text-xl tracking-widest text-primary shadow-gold hover:scale-105"
      >
        {idx < REVEAL_ORDER.length - 1 ? "NEXT REVEAL →" : "ENTER HALL OF FAME →"}
      </button>
    </section>
  );
}

function LEDScoreboard({ label, step }: { label: string; step: string }) {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-primary/40 bg-black px-6 py-3 font-display text-sm tracking-widest text-primary shadow-gold">
      <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-destructive" />
      LIVE · {label} · {step}
    </div>
  );
}

function PlayerCard({
  winner,
  medal,
  tint,
  isChampion,
  revealed,
}: {
  winner: Winner;
  medal: string;
  tint: string;
  isChampion: boolean;
  revealed: boolean;
}) {
  return (
    <div
      className="relative w-[300px] md:w-[360px] overflow-hidden rounded-3xl border-2 p-6 text-center transition-all duration-700"
      style={{
        borderColor: tint,
        background: isChampion
          ? "linear-gradient(160deg, oklch(0.3 0.15 85), oklch(0.1 0.05 60))"
          : `linear-gradient(160deg, color-mix(in oklab, ${tint} 40%, black), oklch(0.08 0.03 265))`,
        boxShadow: `0 30px 80px -20px ${tint}, 0 0 60px color-mix(in oklab, ${tint} 40%, transparent)`,
      }}
    >
      {/* sweep shine */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.3) 50%, transparent 60%)",
          animation: revealed ? "sweep 2s ease-in-out infinite" : "none",
        }}
      />
      <div className="relative flex items-center justify-between font-display">
        <div className="text-4xl">{medal}</div>
        <div className="text-lg" style={{ color: tint }}>
          {winner.points} PTS
        </div>
      </div>
      <div className="relative mx-auto my-4 flex h-32 w-32 items-center justify-center rounded-full border-4"
        style={{ borderColor: tint, background: "rgba(0,0,0,0.4)" }}>
        <span className="font-display text-5xl text-white">
          {winner.name
            .split(" ")
            .map((s) => s[0])
            .join("")
            .slice(0, 2)}
        </span>
      </div>
      <div className="relative">
        <div
          className={`font-display leading-tight ${isChampion ? "text-4xl md:text-5xl text-champion" : "text-3xl text-white"}`}
          style={{ textShadow: "0 2px 20px rgba(0,0,0,0.6)" }}
        >
          {winner.name.toUpperCase()}
        </div>
        <div className="mt-1 text-xs uppercase tracking-widest text-white/70">
          {winner.department}
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2 text-left">
          <Stat label="Accuracy" value={`${winner.accuracy}%`} />
          <Stat label="Points" value={String(winner.points)} />
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-black/40 px-3 py-2">
      <div className="text-[10px] uppercase tracking-widest text-white/50">{label}</div>
      <div className="font-display text-xl text-primary">{value}</div>
    </div>
  );
}

/* ---------- Hall of Fame + rest ---------- */
function PostReveal({ data }: { data: WinnersData }) {
  return (
    <>
      <HallOfFame data={data} />
      <StatsSection stats={data.stats} />
      <Timeline />
      <Footer />
    </>
  );
}

function HallOfFame({ data }: { data: WinnersData }) {
  // Podium order: shortest on the far edges, tallest (champion) in center.
  // Left side ascending → Champion (center) → Right side descending.
  const row = [
    { title: "Lucky Draw", w: data.luckyDraw, tint: "var(--wc-red)", img: "/winners/luckydraw.jpg", offset: 80, scale: 0.82 },
    { title: "Third Place", w: data.third, tint: "var(--wc-cyan)", img: "/winners/third.jpg", offset: 40, scale: 0.9 },
    { title: "Runner-Up", w: data.runnerup, tint: "var(--wc-purple)", img: "/winners/runnerup.jpg", offset: 20, scale: 0.95 },
    { title: "Champion", w: data.champion, tint: "var(--wc-gold)", img: "/winners/champion.jpg", offset: 0, scale: 1.15, isChampion: true },
    { title: "Golden Boot", w: data.topScorer, tint: "var(--wc-orange)", img: "/winners/topscorer.jpg", offset: 20, scale: 0.95 },
    { title: "Best Predictor", w: data.bestPredictor, tint: "var(--wc-green)", img: "/winners/bestpredictor.jpg", offset: 60, scale: 0.88 },
  ];
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!rootRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".podium-card", {
        y: 120,
        opacity: 0,
        scale: 0.6,
        duration: 0.9,
        stagger: { each: 0.12, from: "center" },
        ease: "back.out(1.6)",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);
  return (
    <section ref={rootRef} className="px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <div className="text-xs uppercase tracking-[0.5em] text-accent">Hall of Fame</div>
          <h2 className="mt-2 font-display text-5xl md:text-7xl text-champion">The Legends</h2>
          <p className="mt-3 text-sm text-white/60">All six winners standing together on the podium.</p>
        </div>

        <div className="relative mt-20 flex items-end justify-center gap-3 md:gap-6 overflow-x-auto pb-6">
          {row.map((it) => (
            <div
              key={it.title}
              className="podium-card group relative flex flex-col items-center shrink-0"
              style={{ marginTop: `${it.offset}px`, transform: `scale(${it.scale})`, transformOrigin: "bottom center" }}
            >
              {it.isChampion && (
                <div className="mb-3 font-display text-xl text-champion animate-float">👑 CHAMPION</div>
              )}
              <div
                className="relative w-40 md:w-48 overflow-hidden rounded-2xl border-4 backdrop-blur transition duration-500 group-hover:-translate-y-3"
                style={{
                  borderColor: it.tint,
                  boxShadow: `0 25px 60px -15px ${it.tint}, 0 0 40px -10px ${it.tint} inset`,
                  background:
                    "linear-gradient(160deg, rgba(255,255,255,0.05), rgba(255,255,255,0.01))",
                }}
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.w.name}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                      background: `linear-gradient(180deg, transparent 40%, ${it.tint}55 100%)`,
                    }}
                  />
                  <div
                    className="absolute left-2 top-2 rounded-full px-2 py-1 text-[9px] font-bold uppercase tracking-widest text-black"
                    style={{ background: it.tint }}
                  >
                    {it.title}
                  </div>
                </div>
                <div className="p-3 text-center">
                  <div
                    className={`font-display leading-tight ${it.isChampion ? "text-2xl text-champion" : "text-lg text-white"}`}
                  >
                    {it.w.name.toUpperCase()}
                  </div>
                  <div className="mt-0.5 text-[10px] uppercase tracking-widest text-white/60">
                    {it.w.department}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-white/70">{it.w.accuracy}%</span>
                    <span className="font-display text-base" style={{ color: it.tint }}>
                      {it.w.points} PTS
                    </span>
                  </div>
                </div>
              </div>
              {/* podium block */}
              <div
                className="mt-4 w-32 md:w-40 rounded-t-md border-t-2"
                style={{
                  height: `${140 - it.offset}px`,
                  borderColor: it.tint,
                  background: `linear-gradient(180deg, ${it.tint}30, transparent)`,
                }}
              >
                <div
                  className="mx-auto mt-3 h-1 w-10 rounded-full"
                  style={{ background: it.tint }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsSection({ stats }: { stats: WinnersData["stats"] }) {
  const items = [
    { label: "Participants", val: stats.participants },
    { label: "Countries", val: stats.countries },
    { label: "Matches Predicted", val: stats.matches },
    { label: "Avg Accuracy", val: stats.avgAccuracy, suffix: "%" },
    { label: "Highest Score", val: stats.highest },
  ];
  return (
    <section className="border-y border-white/10 bg-black/40 px-6 py-20">
      <div className="mx-auto max-w-6xl">
        <div className="text-xs uppercase tracking-[0.5em] text-accent">The Numbers</div>
        <h2 className="mt-2 font-display text-5xl text-white">Tournament Dashboard</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((s) => (
            <Counter key={s.label} target={s.val} label={s.label} suffix={s.suffix} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Counter({ target, label, suffix }: { target: number; label: string; suffix?: string }) {
  const [n, setN] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    const obj = { v: 0 };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            gsap.to(obj, {
              v: target,
              duration: 1.6,
              ease: "power2.out",
              onUpdate: () => setN(Math.round(obj.v)),
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.4 },
    );
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return (
    <div
      ref={ref}
      className="rounded-xl border border-primary/30 bg-black/60 p-6 text-center shadow-gold"
    >
      <div className="font-display text-5xl text-primary">
        {n}
        {suffix ?? ""}
      </div>
      <div className="mt-2 text-xs uppercase tracking-widest text-white/60">{label}</div>
    </div>
  );
}

function Timeline() {
  const stages = ["Group Stage", "Round of 16", "Quarter Final", "Semi Final", "Final"];
  return (
    <section className="px-6 py-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-xs uppercase tracking-[0.5em] text-accent">The Journey</div>
        <h2 className="mt-2 font-display text-5xl text-white">Road to Glory</h2>
        <div className="mt-10 space-y-4">
          {stages.map((s, i) => (
            <div
              key={s}
              className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/40 p-6"
            >
              <div
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary font-display text-2xl text-primary"
                style={{ background: "rgba(0,0,0,0.6)" }}
              >
                {i + 1}
              </div>
              <div>
                <div className="font-display text-2xl text-white">{s}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">
                  Match Stage · Completed
                </div>
              </div>
              <div className="ml-auto h-2 flex-1 max-w-[200px] rounded-full bg-pitch" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-black px-6 py-16 text-center">
      <div className="absolute inset-0 -z-10 bg-pitch opacity-30" />
      <div className="mx-auto max-w-3xl">
        <div className="text-xs uppercase tracking-[0.5em] text-accent">Organized By</div>
        <div className="mt-2 font-display text-5xl text-champion">ICAD</div>
        <p className="mt-4 text-sm text-white/70">
          Special thanks to the Committee, all Participants, and Sponsors who made
          ICAD FIFA World Cup 2026 Prediction Contest unforgettable.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          {["fb", "ig", "yt", "x"].map((n) => (
            <div
              key={n}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/40 bg-black text-primary shadow-gold"
            >
              <Football size={22} />
            </div>
          ))}
        </div>
        <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-white/40">
          © 2026 ICAD · Built for the love of the game
        </div>
      </div>
    </footer>
  );
}
export default Index;
