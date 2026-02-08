"use client";

import { useState, useRef, useEffect, useCallback } from "react";

// Deterministic pseudo-random based on seed to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const noMessages = [
  "Babe just click yes 😤💅",
  "You're actually unserious rn 🙄",
  "Bestie the yes button is BEGGING you 😩",
  "Khadijah doesn't accept rejection 💀",
  "This is giving delulu... just say yes 🤡",
  "Your finger is literally hovering over yes rn 👀",
  "Even your phone wants you to click yes 📱💕",
  "SubhanAllah, just say yes already 🙏",
  "Allah made you for each other... click yes 🤲",
  "Plot twist: you already said yes in your heart 💖",
];

export default function Valentine() {
  const [stage, setStage] = useState<"ask" | "confirm" | "accepted">("ask");
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [clickedNoBefore, setClickedNoBefore] = useState(false);
  const [confetti, setConfetti] = useState<Array<{ id: number; left: number; color: string; delay: number; duration: number }>>([]);
  const [sparkles, setSparkles] = useState<Array<{ id: number; x: number; y: number }>>([]);
  const [typedText, setTypedText] = useState("");
  const [showQuote, setShowQuote] = useState(false);
  const [sassShake, setSassShake] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sparkleId = useRef(0);

  const fullQuote =
    "And among His signs is that He created for you mates from among yourselves, that you may dwell in tranquility with them, and He has put love and mercy between your hearts. — Quran 30:21 🤲💕";

  useEffect(() => {
    // Maher Zain - Baraka Allahu Lakuma (romantic Islamic nasheed)
    audioRef.current = new Audio("https://ia600605.us.archive.org/18/items/MaherZainBarakaAllahu/Maher%20Zain%20-%20Baraka%20Allahu%20Lakuma.mp3");
    audioRef.current.loop = true;
  }, []);

  // Typewriter effect for the accepted screen quote
  useEffect(() => {
    if (stage !== "accepted" || !showQuote) return;
    if (typedText.length >= fullQuote.length) return;

    const timeout = setTimeout(() => {
      setTypedText(fullQuote.slice(0, typedText.length + 1));
    }, 30);
    return () => clearTimeout(timeout);
  }, [stage, showQuote, typedText, fullQuote]);

  // Sparkle trail on mouse move (only on ask screen)
  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (stage !== "ask") return;
      const id = sparkleId.current++;
      setSparkles((prev) => [...prev.slice(-12), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 600);
    },
    [stage]
  );

  const spawnConfetti = () => {
    const colors = ["#ff6b8a", "#ff85a1", "#ffc2d1", "#fff0f3", "#C4A265", "#2D6A4F", "#a855f7", "#D4AF37"];
    const pieces = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 0.8,
      duration: 2 + Math.random() * 2,
    }));
    setConfetti(pieces);
    setTimeout(() => setConfetti([]), 5000);
  };

  const handleNo = () => {
    setClickedNoBefore(true);
    setNoCount((prev) => prev + 1);
    setYesSize((prev) => prev + 0.3);
    setNoPos({
      x: Math.random() * 250 - 125,
      y: Math.random() * 250 - 125,
    });
    setSassShake(true);
    setTimeout(() => setSassShake(false), 500);
  };

  const handleYes = () => {
    if (!clickedNoBefore) {
      setStage("confirm");
    } else {
      setStage("accepted");
      spawnConfetti();
      setTimeout(() => setShowQuote(true), 800);
      audioRef.current?.play().catch(() => {});
    }
  };

  const handleConfirmYes = () => {
    setStage("accepted");
    spawnConfetti();
    setTimeout(() => setShowQuote(true), 800);
    audioRef.current?.play().catch(() => {});
  };

  const handleConfirmNo = () => {
    setStage("ask");
  };

  // Get the current sass message based on noCount
  const getSassMessage = () => {
    if (noCount < 3) return null;
    const index = Math.min(noCount - 3, noMessages.length - 1);
    return noMessages[index];
  };

  // 🎉 Accepted screen
  if (stage === "accepted") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-emerald-950 flex flex-col items-center justify-center overflow-hidden relative px-4">
        {/* Confetti */}
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className="confetti-piece"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              animationDuration: `${piece.duration}s`,
            }}
          />
        ))}

        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl md:text-4xl animate-float pointer-events-none"
            style={{
              left: `${seededRandom(i + 100) * 100}%`,
              animationDelay: `${seededRandom(i + 200) * 3}s`,
              animationDuration: `${3 + seededRandom(i + 300) * 4}s`,
            }}
          >
            {["🌙", "💕", "⭐", "💖", "🤲", "🌹", "✨", "☪️"][i % 8]}
          </span>
        ))}

        {/* Background video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-15"
          src="/rokeeb-bg.mp4"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-bounce mb-6">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl ring-4 ring-emerald-400/50 pulse-glow">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="object-cover w-full h-full"
                src="/khadijah.mp4"
              />
            </div>
          </div>

          <h1
            className="text-5xl md:text-8xl text-white mb-4 text-center drop-shadow-lg animate-slide-up"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Yaaay!! 🎉🥳
          </h1>

          <p
            className="text-2xl md:text-4xl text-amber-200/90 text-center mb-6 animate-slide-up"
            style={{ fontFamily: "var(--font-dancing)", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            Rokeeb got himself a Valentine! 💕
          </p>

          <div className="max-w-lg mx-auto bg-emerald-800/30 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-amber-400/30 shadow-xl mb-6 animate-slide-up" style={{ animationDelay: "0.4s", opacity: 0, animationFillMode: "forwards" }}>
            <p className="text-amber-300/80 text-sm text-center mb-2">☪️ From the Holy Quran</p>
            <p
              className={`text-xl md:text-2xl text-white text-center leading-relaxed ${showQuote && typedText.length < fullQuote.length ? "typewriter-cursor" : ""}`}
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              &ldquo;{showQuote ? typedText : ""}&rdquo;
            </p>
          </div>

          <p
            className="text-lg md:text-xl text-amber-200 text-center animate-slide-up"
            style={{ fontFamily: "var(--font-pacifico)", animationDelay: "0.6s", opacity: 0, animationFillMode: "forwards" }}
          >
            Happy Valentine&apos;s Day 🌙❤️
          </p>

          <p className="text-white/50 text-sm mt-6 text-center">
            🎵 Playing Baraka Allahu Lakuma...
          </p>
        </div>
      </div>
    );
  }

  // 🤔 Confirmation screen
  if (stage === "confirm") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-800 via-teal-800 to-emerald-900 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 animate-shimmer" />
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 animate-float pointer-events-none"
            style={{
              left: `${seededRandom(i + 400) * 100}%`,
              animationDelay: `${seededRandom(i + 500) * 5}s`,
              animationDuration: `${4 + seededRandom(i + 600) * 6}s`,
            }}
          >
            🌙
          </span>
        ))}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-amber-400/80 shadow-xl mb-6 pulse-glow">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="object-cover w-full h-full"
              src="/khadijah.mp4"
            />
          </div>
          <div className="text-5xl mb-4 animate-heartbeat">🤔</div>
          <h2
            className="text-3xl md:text-5xl text-white mb-3 text-center drop-shadow-lg animate-slide-up"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            Wait fr fr? 👀
          </h2>
          <p
            className="text-xl md:text-2xl text-amber-200/90 mb-10 text-center animate-slide-up"
            style={{ fontFamily: "var(--font-dancing)", animationDelay: "0.2s", opacity: 0, animationFillMode: "forwards" }}
          >
            You sure you wanna be Rokeeb&apos;s Valentine? 💘
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={handleConfirmYes}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 px-10 py-4 text-xl cursor-pointer transition-all hover:scale-105"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              Yes I&apos;m sure! 💖
            </button>
            <button
              onClick={handleConfirmNo}
              className="bg-white hover:bg-gray-100 text-gray-600 font-bold rounded-full shadow-md px-10 py-4 text-xl cursor-pointer transition-all"
            >
              Hmm nah 🙄
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 💌 Main ask screen
  return (
    <div
      className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* Sparkle trail */}
      {sparkles.map((s) => (
        <div
          key={s.id}
          className="sparkle text-xl"
          style={{ left: s.x - 10, top: s.y - 10 }}
        >
          ✨
        </div>
      ))}

      {/* Rich layered background - emerald/Islamic green tones */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-emerald-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(196,162,101,0.15),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(16,185,129,0.2),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(212,175,55,0.1),transparent_50%)]" />
      <div className="absolute inset-0 animate-shimmer" />

      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl md:text-3xl opacity-30 animate-float pointer-events-none"
          style={{
            left: `${seededRandom(i + 700) * 100}%`,
            animationDelay: `${seededRandom(i + 800) * 5}s`,
            animationDuration: `${4 + seededRandom(i + 900) * 6}s`,
          }}
        >
          {["🌙", "🌹", "💕", "⭐", "☪️"][i % 5]}
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center">
        {/* GIF/Video in circle */}
        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-amber-400 shadow-2xl mb-6 hover:scale-105 transition-transform ring-4 ring-emerald-400/50 pulse-glow">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="object-cover w-full h-full"
            src="/khadijah.mp4"
          />
        </div>

        <div className="text-6xl mb-4 animate-heartbeat">🌙💌</div>

        <h1
          className="text-4xl md:text-7xl text-white mb-3 text-center drop-shadow-lg"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Hey Khadijah...
        </h1>

        <p
          className="text-xl md:text-3xl text-amber-200/90 mb-12 text-center"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Will you be Rokeeb&apos;s Valentine? 🌹💕
        </p>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          <button
            onClick={handleYes}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 px-8 py-4 cursor-pointer transition-all"
            style={{
              transform: `scale(${yesSize})`,
              transition: "transform 0.3s ease",
              fontSize: `${Math.min(1.2 + (yesSize - 1) * 0.3, 2.5)}rem`,
              fontFamily: "var(--font-dancing)",
            }}
          >
            Yes! 💖
          </button>

          <button
            onClick={handleNo}
            className={`bg-white hover:bg-gray-100 text-gray-500 font-bold rounded-full shadow-md px-8 py-4 cursor-pointer transition-all ${sassShake ? "animate-sass-shake" : ""}`}
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${Math.max(0.4, 1 - noCount * 0.1)})`,
              transition: "transform 0.15s ease",
              fontSize: `${Math.max(0.6, 1 - noCount * 0.08)}rem`,
            }}
          >
            No 💔
          </button>
        </div>

        {/* Dynamic sass messages */}
        {getSassMessage() && (
          <p
            key={noCount}
            className="text-amber-200/90 mt-8 text-lg md:text-xl text-center animate-slide-up"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            {getSassMessage()}
          </p>
        )}

        {noCount >= 7 && (
          <p
            className="text-emerald-300/80 text-sm mt-4 text-center animate-pulse"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            The No button is literally disappearing... take the hint bestie 👋
          </p>
        )}
      </div>
    </div>
  );
}
