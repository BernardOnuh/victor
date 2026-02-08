"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";

export default function Valentine() {
  const [stage, setStage] = useState<"ask" | "confirm" | "accepted">("ask");
  const [noCount, setNoCount] = useState(0);
  const [yesSize, setYesSize] = useState(1);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [clickedNoBefore, setClickedNoBefore] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3");
    audioRef.current.loop = true;
  }, []);

  const handleNo = () => {
    setClickedNoBefore(true);
    setNoCount((prev) => prev + 1);
    setYesSize((prev) => prev + 0.3);
    setNoPos({
      x: Math.random() * 250 - 125,
      y: Math.random() * 250 - 125,
    });
  };

  const handleYes = () => {
    if (!clickedNoBefore) {
      setStage("confirm");
    } else {
      setStage("accepted");
      audioRef.current?.play().catch(() => {});
    }
  };

  const handleConfirmYes = () => {
    setStage("accepted");
    audioRef.current?.play().catch(() => {});
  };

  const handleConfirmNo = () => {
    setStage("ask");
  };

  // 🎉 Accepted screen
  if (stage === "accepted") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-400 via-red-500 to-rose-600 flex flex-col items-center justify-center overflow-hidden relative px-4">
        {Array.from({ length: 30 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-3xl md:text-4xl animate-float pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          >
            {["❤️", "💕", "💖", "💗", "💘", "🌹", "✨", "🦋"][i % 8]}
          </span>
        ))}

        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-20"
          src="/valentine-bg.mp4"
        />

        <div className="relative z-10 flex flex-col items-center">
          <div className="animate-bounce mb-6">
            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-4 ring-pink-300/50 pulse-glow">
              <Image src="/ajokemi.jpg" alt="Ajokemi" width={192} height={192} className="object-cover w-full h-full" />
            </div>
          </div>

          <h1
            className="text-5xl md:text-8xl text-white mb-4 text-center drop-shadow-lg"
            style={{ fontFamily: "var(--font-great-vibes)" }}
          >
            Yaaay!! 🎉🥳
          </h1>

          <p
            className="text-2xl md:text-4xl text-white/90 text-center mb-6"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Ajokemi got herself a Valentine! 💕
          </p>

          <div className="max-w-lg mx-auto bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 border border-white/20 shadow-xl mb-6">
            <p
              className="text-xl md:text-2xl text-white text-center leading-relaxed"
              style={{ fontFamily: "var(--font-dancing)" }}
            >
              &ldquo;Every love story is beautiful, but ours is my favorite.
              From this moment on, I choose you — to laugh with, to dream with,
              and to build something beautiful together. 💕&rdquo;
            </p>
          </div>

          <p
            className="text-lg md:text-xl text-pink-100 text-center"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            Happy Valentine&apos;s Day ❤️
          </p>

          <p className="text-white/60 text-sm mt-6 text-center">
            🎵 Playing your song...
          </p>
        </div>
      </div>
    );
  }

  // 🤔 Confirmation screen
  if (stage === "confirm") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-400 via-pink-500 to-fuchsia-600 flex flex-col items-center justify-center p-4 overflow-hidden relative">
        <div className="absolute inset-0 animate-shimmer" />
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="absolute text-2xl opacity-20 animate-float pointer-events-none"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${4 + Math.random() * 6}s`,
            }}
          >
            💭
          </span>
        ))}
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-white/80 shadow-xl mb-6 pulse-glow">
            <Image src="/ajokemi.jpg" alt="Ajokemi" width={144} height={144} className="object-cover w-full h-full" />
          </div>
          <div className="text-5xl mb-4">🤔</div>
          <h2
            className="text-3xl md:text-5xl text-white mb-3 text-center drop-shadow-lg"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            Wait fr fr? 👀
          </h2>
          <p
            className="text-xl md:text-2xl text-white/90 mb-10 text-center"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            You sure you wanna be Ajokemi&apos;s Valentine? 💘
          </p>
          <div className="flex items-center gap-6">
            <button
              onClick={handleConfirmYes}
              className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 px-10 py-4 text-xl cursor-pointer transition-all"
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
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden">
      {/* Rich layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-rose-500 via-pink-600 to-fuchsia-700" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(255,200,200,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,100,150,0.3),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_80%,rgba(200,50,100,0.2),transparent_50%)]" />
      <div className="absolute inset-0 animate-shimmer" />

      {Array.from({ length: 15 }).map((_, i) => (
        <span
          key={i}
          className="absolute text-2xl md:text-3xl opacity-30 animate-float pointer-events-none"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }}
        >
          {["❤️", "🌹", "💕", "✨", "🦋"][i % 5]}
        </span>
      ))}

      <div className="relative z-10 flex flex-col items-center">
        <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-2xl mb-6 hover:scale-105 transition-transform ring-4 ring-pink-300/50 pulse-glow">
          <Image src="/ajokemi.jpg" alt="Ajokemi" width={192} height={192} className="object-cover w-full h-full" />
        </div>

        <div className="text-6xl mb-4">💌</div>

        <h1
          className="text-4xl md:text-7xl text-white mb-3 text-center drop-shadow-lg"
          style={{ fontFamily: "var(--font-great-vibes)" }}
        >
          Hey you...
        </h1>

        <p
          className="text-xl md:text-3xl text-white/90 mb-12 text-center"
          style={{ fontFamily: "var(--font-dancing)" }}
        >
          Will you be Ajokemi&apos;s Valentine? 💕
        </p>

        <div className="flex items-center gap-6 flex-wrap justify-center">
          <button
            onClick={handleYes}
            className="bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-full shadow-lg hover:shadow-xl active:scale-95 px-8 py-4 cursor-pointer transition-all"
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
            className="bg-white hover:bg-gray-100 text-gray-500 font-bold rounded-full shadow-md px-8 py-4 cursor-pointer transition-all"
            style={{
              transform: `translate(${noPos.x}px, ${noPos.y}px) scale(${Math.max(0.4, 1 - noCount * 0.1)})`,
              transition: "transform 0.15s ease",
              fontSize: `${Math.max(0.6, 1 - noCount * 0.08)}rem`,
            }}
          >
            No 💔
          </button>
        </div>

        {noCount >= 3 && (
          <p
            className="text-white/80 mt-8 text-lg animate-pulse text-center"
            style={{ fontFamily: "var(--font-dancing)" }}
          >
            Babe just click yes 😤💅
          </p>
        )}
        {noCount >= 5 && (
          <p
            className="text-white text-xl font-bold mt-2 animate-bounce text-center"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            THE YES BUTTON IS RIGHT THERE 😭👆
          </p>
        )}
        {noCount >= 8 && (
          <p
            className="text-pink-200 text-lg mt-2 text-center"
            style={{ fontFamily: "var(--font-pacifico)" }}
          >
            At this point you&apos;re just playing games bestie 🤡
          </p>
        )}
      </div>
    </div>
  );
}
