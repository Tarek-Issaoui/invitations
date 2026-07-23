import { useState, useEffect, useRef, useCallback } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Home, Menu, X, Music, Pause } from "lucide-react";
import OpenInvitation from "../components/OpenInvitation";
import WeddingInvitationModel1 from "../components/WeddingInvitationModel1";
import WeddingInvitationModel2 from "../components/WeddingInvitationModel2";
import WeddingInvitationModel3 from "../components/WeddingInvitationModel3";
import WeddingInvitationModel4 from "../components/WeddingInvitationModel4";
import WeddingInvitationModel5 from "../components/WeddingInvitationModel5";
import WeddingInvitationModel6 from "../components/WeddingInvitationModel6";

import audio1 from "../assets/audio/white_records-fun-wedding-day-accompanying-background-music-for-holiday-42-sec-157680.mp3";
import audio2 from "../assets/audio/the_mountain-wedding-ceremony-163870.mp3";
import audio3 from "../assets/audio/solarflex-award-awards-ceremony-music-569551.mp3";
import audio4 from "../assets/audio/monume-award-awards-ceremony-music-547932.mp3";
import audio5 from "../assets/audio/leberch-invitation-wedding-375839.mp3";
import audio6 from "../assets/audio/good_b_music-wedding-ceremony-long-154899.mp3";

const modelAudios = { 1: audio1, 2: audio2, 3: audio3, 4: audio4, 5: audio5, 6: audio6 };

const modelComponents = {
  1: WeddingInvitationModel1,
  2: WeddingInvitationModel2,
  3: WeddingInvitationModel3,
  4: WeddingInvitationModel4,
  5: WeddingInvitationModel5,
  6: WeddingInvitationModel6,
};

const modelNames = {
  1: { name: "زمردي أنيق", color: "text-emerald-400/60", dot: "bg-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", activeBg: "bg-emerald-500/20", activeBorder: "border-emerald-400/40" },
  2: { name: "ذهبي ملكي", color: "text-amber-400/60", dot: "bg-amber-400", bg: "bg-amber-500/10", border: "border-amber-400/20", activeBg: "bg-amber-500/20", activeBorder: "border-amber-400/40" },
  3: { name: "ليلي ساحر", color: "text-purple-400/60", dot: "bg-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", activeBg: "bg-purple-500/20", activeBorder: "border-purple-400/40" },
  4: { name: "وردي رومانسي", color: "text-rose-400/60", dot: "bg-rose-400", bg: "bg-rose-500/10", border: "border-rose-400/20", activeBg: "bg-rose-500/20", activeBorder: "border-rose-400/40" },
  5: { name: "فوانيس مسائية", color: "text-amber-300/60", dot: "bg-amber-300", bg: "bg-amber-500/10", border: "border-amber-500/20", activeBg: "bg-amber-500/20", activeBorder: "border-amber-300/40" },
  6: { name: "الشفق القطبي", color: "text-cyan-400/60", dot: "bg-cyan-400", bg: "bg-cyan-500/10", border: "border-cyan-500/20", activeBg: "bg-cyan-500/20", activeBorder: "border-cyan-400/40" },
};

const validIds = [1, 2, 3, 4, 5, 6];

function MobileNav({ modelId, modelNames, validIds }) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const current = modelNames[modelId];

  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  return (
    <div className="md:hidden" ref={menuRef}>
      {/* Trigger button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full pl-3 pr-2.5 py-2 shadow-[0_8px_32px_rgba(0,0,0,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-95 transition-transform cursor-pointer"
        whileTap={{ scale: 0.95 }}
        aria-label="اختر التصميم"
        aria-expanded={open}
      >
        <span className={`w-2.5 h-2.5 rounded-full ${current.dot}`} />
        <span className="font-cairo text-white/50 text-[10px]">{current.name}</span>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-3.5 h-3.5 text-white/40" />
            </motion.div>
          ) : (
            <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <Menu className="w-3.5 h-3.5 text-white/40" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Dropdown */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="absolute top-full right-0 mt-2 w-52 bg-black/70 backdrop-blur-xl border border-white/10 rounded-2xl p-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.5)]"
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              to="/"
              className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-white/40 hover:text-white/70 hover:bg-white/5 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
              onClick={() => setOpen(false)}
            >
              <Home className="w-3.5 h-3.5" />
              <span className="font-cairo text-xs">الرئيسية</span>
            </Link>

            <div className="h-px bg-white/5 mx-2 my-1" />

            {validIds.map((nid) => {
              const n = modelNames[nid];
              const isActive = nid === modelId;
              return (
                <Link
                  key={nid}
                  to={`/${nid}`}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-xl font-cairo text-xs transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
                    isActive ? `${n.activeBg} ${n.color}` : "text-white/35 hover:text-white/60 hover:bg-white/5"
                  }`}
                >
                  <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${isActive ? n.dot : "bg-white/15"}`} />
                  <span>{n.name}</span>
                  {isActive && <span className="mr-auto text-[9px] text-white/20">●</span>}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DesktopNav({ modelId, modelNames, validIds }) {
  return (
    <div className="hidden md:flex items-center gap-1.5 bg-black/60 backdrop-blur-xl border border-white/10 rounded-full px-2 py-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      <Link
        to="/"
        className="flex items-center justify-center w-8 h-8 rounded-full text-white/40 hover:text-white/70 hover:bg-white/10 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
        aria-label="العودة للرئيسية"
      >
        <Home className="w-3.5 h-3.5" />
      </Link>

      <span className="w-px h-4 bg-white/10 mx-0.5" aria-hidden="true" />

      {validIds.map((nid) => {
        const n = modelNames[nid];
        const isActive = nid === modelId;
        return (
          <Link
            key={nid}
            to={`/${nid}`}
            className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-full font-cairo text-[10px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 ${
              isActive ? `${n.activeBg} ${n.activeBorder} border ${n.color}` : "text-white/30 hover:text-white/60 border border-transparent hover:bg-white/5"
            }`}
          >
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? n.dot : "bg-white/10"} border ${isActive ? n.activeBorder : "border-white/15"}`} />
            <span>{n.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default function ModelPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const modelId = parseInt(id, 10);
  const [isOpen, setIsOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    setIsOpen(false);
    setPlaying(false);
    window.scrollTo(0, 0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [modelId]);

  useEffect(() => {
    if (isOpen && audioRef.current) {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [isOpen]);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    }
  }, [playing]);

  if (!validIds.includes(modelId)) {
    navigate("/", { replace: true });
    return null;
  }

  const ActiveComponent = modelComponents[modelId];

  return (
    <div className="relative">
      {/* Audio */}
      <audio ref={audioRef} loop preload="auto">
        <source src={modelAudios[modelId]} type="audio/mpeg" />
      </audio>

      {/* Music Toggle */}
      <AnimatePresence>
        {isOpen && (
          <motion.button
            onClick={toggleAudio}
            aria-label={playing ? "إيقاف الموسيقى" : "تشغيل الموسيقى"}
            aria-pressed={playing}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ delay: 0.8, duration: 0.3 }}
            className="fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full bg-black/50 backdrop-blur-md border border-white/15 flex items-center justify-center shadow-[0_4px_20px_rgba(0,0,0,0.3)] hover:bg-black/70 hover:border-white/25 transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 active:scale-90"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {playing ? (
                <motion.div key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Pause className="w-4 h-4 text-white/60" />
                </motion.div>
              ) : (
                <motion.div key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                  <Music className="w-4 h-4 text-white/60" />
                </motion.div>
              )}
            </AnimatePresence>
            {playing && (
              <div className="absolute inset-0" aria-hidden="true">
                {[...Array(3)].map((_, i) => (
                  <motion.span key={i} className="absolute w-0.5 bg-white/40 rounded-full" style={{ bottom: "25%", left: `${35 + i * 12}%` }} animate={{ height: [3, 10, 3] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                ))}
              </div>
            )}
          </motion.button>
        )}
      </AnimatePresence>

      {/* Model Selector Nav */}
      <motion.div
        className="fixed top-4 left-0 right-0 z-[100] flex justify-center md:justify-center px-4"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: isOpen ? 0 : -60, opacity: isOpen ? 1 : 0 }}
        transition={{ delay: isOpen ? 0.5 : 0, duration: 0.6 }}
      >
        <div className="relative">
          <MobileNav modelId={modelId} modelNames={modelNames} validIds={validIds} />
          <DesktopNav modelId={modelId} modelNames={modelNames} validIds={validIds} />
        </div>
      </motion.div>

      {/* Open Invitation Gate */}
      <AnimatePresence>
        {!isOpen && (
          <OpenInvitation
            activeModel={modelId}
            onOpen={() => setIsOpen(true)}
          />
        )}
      </AnimatePresence>

      {/* Model Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={modelId}
          initial={{ opacity: 0 }}
          animate={{ opacity: isOpen ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <ActiveComponent />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
