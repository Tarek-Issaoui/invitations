import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ChevronDown, Mail, Sparkles, Star, Flower2, Moon, Sun, Gem, Compass, Flame, Mountain } from "lucide-react";

function useScrollLock(locked) {
  useEffect(() => {
    if (locked) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [locked]);
}

/* ─── MODEL 1: ENVELOPE CONCEPT ─── */
function EnvelopeOpen({ onOpen }) {
  const [phase, setPhase] = useState(0); // 0=sealed, 1=opening, 2=revealed

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 1200);
    const t2 = setTimeout(() => setPhase(2), 2200);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Ambient particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full bg-gold/10 pointer-events-none"
          style={{ left: `${12 + i * 11}%`, top: `${15 + (i % 3) * 25}%`, width: 4 + (i % 3) * 2, height: 4 + (i % 3) * 2 }}
          animate={{ y: [0, -25, 0], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}

      {/* Envelope body */}
      <motion.div className="relative w-[320px] sm:w-[380px] h-[220px] sm:h-[260px]" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, type: "spring" }}>
        {/* Back of envelope */}
        <div className="absolute inset-0 rounded-2xl border border-gold/20 bg-gradient-to-br from-[#1a2420] to-[#0f1715] shadow-[0_0_60px_rgba(212,175,55,0.08)]" />

        {/* Envelope flap (triangle) */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-full origin-top"
          animate={phase >= 1 ? { rotateX: 180, opacity: 0 } : { rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          style={{ transformStyle: "preserve-3d", zIndex: 2 }}
        >
          <svg viewBox="0 0 380 260" className="w-full h-full">
            <path d="M0,0 L190,130 L380,0 Z" fill="#0f1715" stroke="#d4af37" strokeWidth="0.5" opacity="0.6" />
            <path d="M0,0 L190,130 L380,0 Z" fill="none" stroke="#d4af37" strokeWidth="1" opacity="0.3" />
          </svg>
        </motion.div>

        {/* Letter sliding out */}
        <motion.div
          className="absolute left-[15px] right-[15px] top-[15px] bottom-[15px] rounded-xl bg-gradient-to-b from-[#0a1210] to-[#0f1715] border border-gold/15 flex flex-col items-center justify-center overflow-hidden"
          animate={phase >= 1 ? { y: -40 } : { y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        >
          <motion.div animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ duration: 0.6, delay: 0.2 }} className="text-center">
            <p className="font-amiri text-gold-light/50 text-xs mb-2">بسم الله الرحمن الرحيم</p>
            <Gem className="w-4 h-4 text-gold/40 mx-auto mb-2" />
            <h2 className="font-aref text-gold text-3xl sm:text-4xl font-bold">ياسمين</h2>
            <div className="flex items-center justify-center gap-2 my-1.5" aria-hidden="true">
              <span className="h-px w-8 bg-gold/20" />
              <Heart className="w-3.5 h-3.5 text-gold/30 fill-gold/20" />
              <span className="h-px w-8 bg-gold/20" />
            </div>
            <h2 className="font-aref text-gold text-3xl sm:text-4xl font-bold">و عمر</h2>
            <p className="font-cairo text-ivory/40 text-[10px] mt-2 tracking-wider">08 · 08 · 2026</p>
          </motion.div>
        </motion.div>

        {/* Wax seal */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 z-10"
          style={{ top: "35%" }}
          animate={phase >= 1 ? { scale: 0, opacity: 0, rotate: 90 } : { scale: 1, opacity: 1, rotate: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold/30 to-gold-dark/40 border border-gold/40 flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <span className="font-aref text-gold text-lg">♥</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Open button below envelope */}
      <motion.button
        onClick={onOpen}
        className="absolute bottom-[12%] sm:bottom-[15%] inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gold/10 border border-gold/30 hover:bg-gold/20 hover:border-gold/50 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/40 active:scale-95"
        initial={{ opacity: 0, y: 20 }}
        animate={phase >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.97 }}
        aria-label="فتح الدعوة"
      >
        <Mail className="w-4 h-4 text-gold" />
        <span className="font-cairo text-gold text-xs font-medium">فتح الدعوة</span>
      </motion.button>
    </div>
  );
}

/* ─── MODEL 2: ROYAL PARCHMENT CONCEPT ─── */
function ParchmentOpen({ onOpen }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 800); return () => clearTimeout(t); }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Floating petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ left: `${10 + i * 15}%` }}
          animate={{ y: ["0vh", "100vh"], rotate: [0, 360], opacity: [0, 0.25, 0] }}
          transition={{ duration: 10 + i * 2, repeat: Infinity, delay: i * 1.5, ease: "linear" }}
        >
          <Flower2 className="text-[#c9a84c]/20" style={{ width: 12 + (i % 3) * 6, height: 12 + (i % 3) * 6 }} />
        </motion.div>
      ))}

      {/* Ornamental card */}
      <motion.div
        className="relative w-[340px] sm:w-[400px]"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Double border frame */}
        <div className="absolute -inset-3 rounded-3xl border border-[#c9a84c]/15" aria-hidden="true" />
        <div className="absolute -inset-1.5 rounded-2xl border border-[#c9a84c]/10" aria-hidden="true" />

        <div className="relative bg-white/70 backdrop-blur-sm rounded-2xl border border-[#c9a84c]/20 p-8 sm:p-10 shadow-[0_8px_40px_rgba(201,168,76,0.08)]">
          {/* Corner ornaments */}
          {["top-2 right-2", "top-2 left-2 rotate-90", "bottom-2 left-2 rotate-180", "bottom-2 right-2 -rotate-90"].map((pos, i) => (
            <svg key={i} className={`absolute ${pos} w-5 h-5 text-[#c9a84c]/25`} viewBox="0 0 20 20" aria-hidden="true">
              <path d="M0,0 Q10,0 10,10 Q10,0 20,0" fill="none" stroke="currentColor" strokeWidth="1" />
            </svg>
          ))}

          <motion.div animate={revealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="font-amiri text-[#8b7355]/50 text-xs text-center mb-4">بسم الله الرحمن الرحيم</p>

            <div className="text-center mb-5">
              <Compass className="w-5 h-5 text-[#c9a84c]/40 mx-auto mb-3" />
              <p className="font-cairo text-[#6b5a3e]/60 text-xs leading-relaxed">
                يتشرف عائلتا بدعوتكم لحضور حفل زفاف
              </p>
            </div>

            {/* Names with gold line */}
            <div className="text-center mb-5">
              <h2 className="font-aref text-[#c9a84c] text-4xl sm:text-5xl font-bold">ليلى</h2>
              <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
                <span className="h-px w-12 bg-[#c9a84c]/30" />
                <Heart className="w-4 h-4 text-[#c9a84c]/30 fill-[#c9a84c]/15" />
                <span className="h-px w-12 bg-[#c9a84c]/30" />
              </div>
              <h2 className="font-aref text-[#c9a84c] text-4xl sm:text-5xl font-bold">و أحمد</h2>
            </div>

            <p className="font-cairo text-[#8b7355]/40 text-[10px] text-center tracking-[0.25em] mb-6">08 / 08 / 2026</p>

            {/* Divider */}
            <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
              <span className="h-px w-14 bg-gradient-to-l from-transparent to-[#c9a84c]/25" />
              <Sparkles className="w-3 h-3 text-[#c9a84c]/30" />
              <span className="h-px w-14 bg-gradient-to-r from-transparent to-[#c9a84c]/25" />
            </div>

            <motion.button
              onClick={onOpen}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#c9a84c]/40 active:scale-[0.98]"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              aria-label="فتح الدعوة"
            >
              <Mail className="w-4 h-4 text-[#c9a84c]" />
              <span className="font-cairo text-[#c9a84c] text-xs font-medium">فتح الدعوة</span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MODEL 3: COSMIC CONSTELLATION CONCEPT ─── */
function CosmicOpen({ onOpen }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 600); return () => clearTimeout(t); }, []);

  const stars = [
    { x: 20, y: 15, s: 2, d: 0 }, { x: 75, y: 12, s: 1.5, d: 1.2 },
    { x: 35, y: 80, s: 2.5, d: 0.5 }, { x: 82, y: 75, s: 1.5, d: 2 },
    { x: 50, y: 8, s: 1, d: 1.5 }, { x: 12, y: 55, s: 2, d: 0.8 },
    { x: 88, y: 45, s: 1.5, d: 1.8 }, { x: 60, y: 90, s: 2, d: 0.3 },
    { x: 40, y: 25, s: 1, d: 2.2 }, { x: 65, y: 60, s: 1.5, d: 1 },
  ];

  const constellationLines = [
    { x1: 20, y1: 15, x2: 35, y2: 25 },
    { x1: 35, y1: 25, x2: 50, y2: 8 },
    { x1: 50, y1: 8, x2: 65, y2: 20 },
    { x1: 65, y1: 20, x2: 75, y2: 12 },
    { x1: 35, y1: 80, x2: 50, y2: 90 },
    { x1: 50, y1: 90, x2: 65, y2: 60 },
  ];

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* Starfield */}
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: 2.5 + i * 0.3, repeat: Infinity, delay: s.d }}
        />
      ))}

      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden="true">
        {constellationLines.map((l, i) => (
          <motion.line key={i} x1={`${l.x1}%`} y1={`${l.y1}%`} x2={`${l.x2}%`} y2={`${l.y2}%`}
            stroke="rgba(147,112,219,0.12)" strokeWidth="0.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={revealed ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 1.5, delay: i * 0.15 }}
          />
        ))}
      </svg>

      {/* Central orb */}
      <motion.div className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(147,112,219,0.08) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <motion.div className="relative z-10 text-center px-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <Moon className="w-5 h-5 text-purple-300/30 mx-auto mb-4" />

        <p className="font-amiri text-white/35 text-xs mb-4">بسم الله الرحمن الرحيم</p>

        <h2 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-pink-200 to-purple-200 text-4xl sm:text-5xl font-bold leading-tight">
          نورة
        </h2>
        <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
          <span className="h-px w-10 bg-purple-400/20" />
          <Heart className="w-4 h-4 text-pink-300/30 fill-pink-400/15" />
          <span className="h-px w-10 bg-purple-400/20" />
        </div>
        <h2 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 text-4xl sm:text-5xl font-bold leading-tight">
          و سليمان
        </h2>

        <p className="font-cairo text-white/20 text-[10px] mt-4 tracking-[0.3em]">08 · 08 · 2026</p>

        <motion.button
          onClick={onOpen}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-purple-500/10 border border-purple-500/20 hover:bg-purple-500/20 hover:border-purple-500/35 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/40 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="فتح الدعوة"
        >
          <Mail className="w-4 h-4 text-purple-200/60" />
          <span className="font-cairo text-purple-200/60 text-xs font-medium">فتح الدعوة</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ─── MODEL 4: ROMANTIC PETAL SHOWER CONCEPT ─── */
function RomanticOpen({ onOpen }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 600); return () => clearTimeout(t); }, []);

  const petals = Array.from({ length: 12 }, (_, i) => ({
    delay: i * 0.8,
    startX: 10 + (i * 7.5) % 80,
    size: 8 + (i % 4) * 4,
    rotation: i * 30,
    duration: 8 + (i % 3) * 3,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Falling petals */}
      {petals.map((p, i) => (
        <motion.div key={i} className="absolute pointer-events-none"
          style={{ left: `${p.startX}%`, top: "-5%" }}
          animate={{ y: ["0vh", "110vh"], x: [0, Math.sin(i) * 30, 0], rotate: [0, p.rotation, p.rotation * 2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "linear" }}
        >
          <svg width={p.size} height={p.size} viewBox="0 0 20 20" style={{ opacity: 0.2 }}>
            <path d="M10,0 C14,4 20,10 10,20 C0,10 6,4 10,0Z" fill="#f4c6c6" />
          </svg>
        </motion.div>
      ))}

      {/* Warm radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(220,150,140,0.1) 0%, transparent 65%)" }} aria-hidden="true" />

      {/* Content card */}
      <motion.div className="relative z-10 w-[320px] sm:w-[380px]"
        initial={{ opacity: 0, y: 30 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="relative rounded-3xl border border-rose-300/10 bg-gradient-to-b from-[#1e1218]/80 to-[#1a0f14]/80 backdrop-blur-xl p-8 sm:p-10 overflow-hidden">
          {/* Top/bottom gradient lines */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/20 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/20 to-transparent" aria-hidden="true" />

          <p className="font-amiri text-rose-100/35 text-xs text-center mb-5">بسم الله الرحمن الرحيم</p>

          <div className="text-center mb-5">
            <Sun className="w-5 h-5 text-amber-300/20 mx-auto mb-3" />

            <h2 className="font-aref text-4xl sm:text-5xl font-bold leading-tight"
              style={{ background: "linear-gradient(135deg, #f4c6c6, #e8a87c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              فاطمة
            </h2>
            <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
              <span className="h-px w-10 bg-rose-300/15" />
              <Heart className="w-4 h-4 text-rose-300/25 fill-rose-400/10" />
              <span className="h-px w-10 bg-rose-300/15" />
            </div>
            <h2 className="font-aref text-4xl sm:text-5xl font-bold leading-tight"
              style={{ background: "linear-gradient(135deg, #e8a87c, #f4c6c6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              يوسف
            </h2>
          </div>

          <p className="font-cairo text-rose-100/25 text-[10px] text-center tracking-[0.2em] mb-6">08 · 08 · 2026</p>

          <div className="flex items-center justify-center gap-2 mb-6" aria-hidden="true">
            <span className="h-px w-12 bg-gradient-to-l from-transparent to-rose-300/15" />
            <Flower2 className="w-3 h-3 text-rose-300/20" />
            <span className="h-px w-12 bg-gradient-to-r from-transparent to-rose-300/15" />
          </div>

          <motion.button
            onClick={onOpen}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-rose-400/10 border border-rose-300/15 hover:bg-rose-400/20 hover:border-rose-300/30 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/30 active:scale-[0.98]"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label="فتح الدعوة"
          >
            <Mail className="w-4 h-4 text-rose-200/50" />
            <span className="font-cairo text-rose-200/50 text-xs font-medium">فتح الدعوة</span>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}

/* ─── MODEL 5: FLOATING LANTERN CONCEPT ─── */
function LanternOpen({ onOpen }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 600); return () => clearTimeout(t); }, []);

  const lanterns = Array.from({ length: 6 }, (_, i) => ({
    delay: i * 1.2,
    left: 10 + i * 14,
    size: 24 + (i % 3) * 6,
    duration: 10 + (i % 3) * 3,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Rising lanterns */}
      {lanterns.map((l, i) => (
        <motion.div key={i} className="absolute pointer-events-none" style={{ left: `${l.left}%`, bottom: "-8%" }}
          animate={{ y: [0, -window.innerHeight * 1.1], x: [0, Math.sin(i) * 15, 0], rotate: [-2, 2, -2] }}
          transition={{ duration: l.duration, repeat: Infinity, delay: l.delay, ease: "linear" }}
        >
          <svg width={l.size} height={l.size * 1.3} viewBox="0 0 30 40" style={{ opacity: 0.35 }}>
            <ellipse cx="15" cy="22" rx="12" ry="16" fill="url(#oLanternGlow)" opacity="0.2" />
            <path d="M8,12 Q8,4 15,3 Q22,4 22,12 L24,32 Q24,38 15,39 Q6,38 6,32 Z" fill="#78350f" stroke="#f59e0b" strokeWidth="0.4" opacity="0.85" />
            <ellipse cx="15" cy="14" rx="2.5" ry="4" fill="#fbbf24" opacity="0.7" />
            <ellipse cx="15" cy="13" rx="1" ry="2" fill="#fff7ed" opacity="0.5" />
            <defs><radialGradient id="oLanternGlow" cx="50%" cy="40%" r="50%"><stop offset="0%" stopColor="#fbbf24" stopOpacity="0.3" /><stop offset="100%" stopColor="#f59e0b" stopOpacity="0" /></radialGradient></defs>
          </svg>
        </motion.div>
      ))}

      {/* Warm glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at center, rgba(245,158,11,0.06) 0%, transparent 65%)" }} aria-hidden="true" />

      <motion.div className="relative z-10 text-center px-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        <Flame className="w-5 h-5 text-amber-400/30 mx-auto mb-4" />
        <p className="font-amiri text-amber-200/40 text-xs mb-4">بسم الله الرحمن الرحيم</p>

        <h2 className="font-aref text-amber-300 text-4xl sm:text-5xl font-bold leading-tight">مريم</h2>
        <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
          <span className="h-px w-10 bg-amber-400/20" />
          <Heart className="w-4 h-4 text-amber-400/25 fill-amber-400/10" />
          <span className="h-px w-10 bg-amber-400/20" />
        </div>
        <h2 className="font-aref text-amber-300 text-4xl sm:text-5xl font-bold leading-tight">و علي</h2>

        <p className="font-cairo text-amber-200/25 text-[10px] mt-4 tracking-[0.3em]">08 · 08 · 2026</p>

        <motion.button
          onClick={onOpen}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-500/10 border border-amber-500/20 hover:bg-amber-500/20 hover:border-amber-500/35 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/40 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="فتح الدعوة"
        >
          <Mail className="w-4 h-4 text-amber-300/60" />
          <span className="font-cairo text-amber-200/60 text-xs font-medium">فتح الدعوة</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ─── MODEL 6: AURORA CONSTELLATION CONCEPT ─── */
function AuroraOpen({ onOpen }) {
  const [revealed, setRevealed] = useState(false);
  useEffect(() => { const t = setTimeout(() => setRevealed(true), 600); return () => clearTimeout(t); }, []);

  const stars = Array.from({ length: 20 }, (_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 1.5, delay: Math.random() * 4,
  }));

  return (
    <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.05, 0.5, 0.05] }}
          transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, delay: s.delay }}
        />
      ))}

      {/* Aurora bands */}
      <motion.div className="absolute top-[15%] left-0 right-0 h-[35%] pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(6,182,212,0.1) 30%, rgba(16,185,129,0.12) 50%, rgba(6,182,212,0.08) 70%, transparent)", filter: "blur(50px)" }}
        animate={{ opacity: [0.1, 0.3, 0.1], scaleY: [0.8, 1.1, 0.8] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute top-[25%] left-0 right-0 h-[25%] pointer-events-none"
        style={{ background: "linear-gradient(180deg, transparent, rgba(139,92,246,0.08) 40%, rgba(236,72,153,0.06) 60%, transparent)", filter: "blur(60px)" }}
        animate={{ opacity: [0.05, 0.2, 0.05], x: [-30, 30, -30] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Mountain silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full pointer-events-none" viewBox="0 0 100 30" preserveAspectRatio="none" style={{ height: "12%" }} aria-hidden="true">
        <path d="M0,30 L0,22 Q15,12 30,18 Q45,8 60,15 Q75,5 90,14 L100,16 L100,30 Z" fill="rgba(2,6,21,0.8)" />
      </svg>

      <motion.div className="relative z-10 text-center px-6 max-w-sm mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={revealed ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, delay: 0.4 }}
      >
        <Mountain className="w-5 h-5 text-cyan-400/25 mx-auto mb-4" />
        <p className="font-amiri text-cyan-200/30 text-xs mb-4">بسم الله الرحمن الرحيم</p>

        <h2 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-200 text-4xl sm:text-5xl font-bold leading-tight">حسناء</h2>
        <div className="flex items-center justify-center gap-3 my-2" aria-hidden="true">
          <span className="h-px w-10 bg-cyan-400/15" />
          <Heart className="w-4 h-4 text-cyan-300/20 fill-cyan-400/10" />
          <span className="h-px w-10 bg-cyan-400/15" />
        </div>
        <h2 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 text-4xl sm:text-5xl font-bold leading-tight">و كريم</h2>

        <p className="font-cairo text-cyan-200/20 text-[10px] mt-4 tracking-[0.3em]">08 · 08 · 2026</p>

        <motion.button
          onClick={onOpen}
          className="mt-8 inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 hover:bg-cyan-500/20 hover:border-cyan-500/35 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40 active:scale-95"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          aria-label="فتح الدعوة"
        >
          <Mail className="w-4 h-4 text-cyan-200/50" />
          <span className="font-cairo text-cyan-200/50 text-xs font-medium">فتح الدعوة</span>
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ─── MAIN COMPONENT ─── */
export default function OpenInvitation({ activeModel, onOpen }) {
  const [isExiting, setIsExiting] = useState(false);
  useScrollLock(true);

  const handleOpen = () => {
    setIsExiting(true);
    setTimeout(() => onOpen(), 800);
  };

  const themes = {
    1: { bg: "from-[#0a1210] via-[#0f1715] to-[#0a1210]", glow: "rgba(212,175,55,0.08)" },
    2: { bg: "from-[#f5f0e1] via-[#faf8f0] to-[#f5f0e1]", glow: "rgba(201,168,76,0.06)" },
    3: { bg: "from-[#060610] via-[#0a0a12] to-[#060610]", glow: "rgba(147,112,219,0.06)" },
    4: { bg: "from-[#140a0e] via-[#1a0f14] to-[#140a0e]", glow: "rgba(220,150,140,0.06)" },
    5: { bg: "from-[#0c0a1a] via-[#110e24] to-[#0c0a1a]", glow: "rgba(245,158,11,0.06)" },
    6: { bg: "from-[#020615] via-[#050d1f] to-[#020615]", glow: "rgba(6,182,212,0.06)" },
  };

  const theme = themes[activeModel] || themes[1];
  const components = { 1: EnvelopeOpen, 2: ParchmentOpen, 3: CosmicOpen, 4: RomanticOpen, 5: LanternOpen, 6: AuroraOpen };
  const Content = components[activeModel] || EnvelopeOpen;

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          className={`fixed inset-0 z-[200] bg-gradient-to-b ${theme.bg} overflow-hidden`}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Radial glow */}
          <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${theme.glow} 0%, transparent 70%)` }} aria-hidden="true" />

          {/* Top line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" aria-hidden="true" />

          <Content onOpen={handleOpen} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
