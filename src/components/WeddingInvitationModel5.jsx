import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, ChevronDown, Clock, Heart, MapPin, Sparkles, Flame } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import DigiServicesFooter from "./DigiServicesFooter";

const WEDDING_DATE = new Date("2026-08-08T17:00:00");

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } } };
const fadeIn = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 1 } } };
const scaleIn = { hidden: { opacity: 0, scale: 0.85 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } } };
const stagger = { visible: { transition: { staggerChildren: 0.18 } } };

const btnBase = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 transition-all duration-200";

const COLORS = {
  amber: "#f59e0b",
  amberLight: "#fbbf24",
  amberDark: "#b45309",
  bg: "#0c0a1a",
  bgMid: "#110e24",
};

function LanternSVG({ size = 40, glow = false }) {
  return (
    <svg width={size} height={size * 1.4} viewBox="0 0 40 56" fill="none">
      {/* Glow */}
      {glow && <ellipse cx="20" cy="30" rx="18" ry="22" fill="url(#lanternGlow)" opacity="0.3" />}
      {/* Body */}
      <path d="M12,18 Q12,8 20,6 Q28,8 28,18 L30,42 Q30,50 20,52 Q10,50 10,42 Z" fill="url(#lanternBody)" stroke="#f59e0b" strokeWidth="0.5" opacity="0.9" />
      {/* Top ring */}
      <ellipse cx="20" cy="7" rx="5" ry="2" fill="none" stroke="#f59e0b" strokeWidth="0.8" opacity="0.6" />
      {/* Vertical ribs */}
      <path d="M15,10 Q14,30 15,48" fill="none" stroke="#f59e0b" strokeWidth="0.3" opacity="0.3" />
      <path d="M20,6 Q20,30 20,52" fill="none" stroke="#f59e0b" strokeWidth="0.3" opacity="0.3" />
      <path d="M25,10 Q26,30 25,48" fill="none" stroke="#f59e0b" strokeWidth="0.3" opacity="0.3" />
      {/* Flame */}
      <ellipse cx="20" cy="20" rx="3" ry="5" fill="#fbbf24" opacity="0.8" />
      <ellipse cx="20" cy="19" rx="1.5" ry="3" fill="#fff7ed" opacity="0.6" />
      <defs>
        <radialGradient id="lanternGlow" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="lanternBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#92400e" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#78350f" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#451a03" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function HeroSection() {
  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 100, damping: 30, mass: 1 });

  const lanterns = useMemo(() =>
    Array.from({ length: 8 }, (_, i) => ({
      delay: i * 1.5,
      left: 5 + i * 12,
      size: 28 + (i % 3) * 8,
      duration: 12 + (i % 4) * 3,
    })), []
  );

  const scrollToContent = () => heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: smoothBgY }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1920&q=80')" }} />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a]/90 via-[#0c0a1a]/70 to-[#0c0a1a]" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a] via-transparent to-[#0c0a1a]/60" />

      {/* Floating lanterns */}
      {lanterns.map((l, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: `${l.left}%`, bottom: "-10%" }}
          animate={reduced ? {} : { y: [0, -window.innerHeight * 1.2], x: [0, Math.sin(i) * 20, 0], rotate: [-3, 3, -3] }}
          transition={{ duration: l.duration, repeat: Infinity, delay: l.delay, ease: "linear" }}
          aria-hidden="true"
        >
          <LanternSVG size={l.size} glow />
        </motion.div>
      ))}

      <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ y: smoothTextY, opacity: smoothOpacity }}>
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <p className="font-amiri text-amber-200/70 text-lg md:text-xl mb-2 tracking-wide">بسم الله الرحمن الرحيم</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/50" />
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/50" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <p className="font-amiri text-amber-100/60 text-base md:text-lg leading-relaxed mb-8 italic">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
          <div className="relative inline-block">
            <h1 className="font-aref text-amber-300 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              مريم
            </h1>
            <div className="flex items-center justify-center gap-4 my-3">
              <span className="h-px w-8 sm:w-12 bg-amber-400/40" />
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400 fill-amber-400/40 animate-pulse" />
              <span className="h-px w-8 sm:w-12 bg-amber-400/40" />
            </div>
            <h1 className="font-aref text-amber-300 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_0_30px_rgba(245,158,11,0.3)]">
              و علي
            </h1>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.4 }}>
          <p className="font-cairo text-amber-200/40 text-sm mt-6 tracking-wider">08 / 08 / 2026</p>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-4"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="اسحب للأسفل"
      >
        <span className="font-cairo text-amber-200/50 text-xs">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-amber-400/50" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a] via-[#110e24] to-[#0c0a1a]" />
      <motion.div className="relative z-10 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-md border border-amber-500/15 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(245,158,11,0.06)]">
          <Flame className="w-6 h-6 text-amber-400 mx-auto mb-4" />
          <p className="font-cairo text-amber-100/60 text-sm md:text-base leading-loose">يتشرف عائلتا</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 my-4">
            <p className="font-aref text-amber-300 text-xl md:text-2xl">السيد حمادي بوخيشة</p>
            <span className="font-cairo text-amber-200/30 hidden sm:inline">&</span>
            <p className="font-aref text-amber-300 text-xl md:text-2xl">السيد محمد لحبيب لاغي</p>
          </div>
          <p className="font-cairo text-amber-100/60 text-sm md:text-base leading-loose">بدعوتكم لحضور حفل زفاف ابنيهما</p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/40" />
            <Sparkles className="w-4 h-4 text-amber-400/60" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/40" />
          </div>
          <p className="font-amiri text-amber-200/70 text-lg md:text-xl">مريم و علي</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return { days: Math.floor(diff / 86400000), hours: Math.floor((diff / 3600000) % 24), minutes: Math.floor((diff / 60000) % 60), seconds: Math.floor((diff / 1000) % 60) };
    };
    setTimeLeft(calc());
    const id = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(id);
  }, []);
  const units = [
    { label: "يوم", value: timeLeft.days },
    { label: "ساعة", value: timeLeft.hours },
    { label: "دقيقة", value: timeLeft.minutes },
    { label: "ثانية", value: timeLeft.seconds },
  ];
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a] via-[#110e24] to-[#0c0a1a]" />
      <motion.div className="relative z-10 max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-amber-400 mx-auto mb-3" />
          <h2 className="font-aref text-amber-300 text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-amber-200/40 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit) => (
            <motion.div key={unit.label} variants={scaleIn} className="bg-black/40 backdrop-blur-md border border-amber-500/15 rounded-3xl p-5 md:p-6 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:shadow-[0_0_40px_rgba(245,158,11,0.12)] hover:border-amber-500/25 transition-all duration-500">
              <AnimatePresence mode="popLayout">
                <motion.span key={unit.value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }} className="block font-aref text-amber-300 text-4xl md:text-5xl font-bold">
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-amber-200/40 text-xs mt-2 block">{unit.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function EventSchedule() {
  const events = [
    { title: "عقد القران", subtitle: "Marriage Contract", date: "الجمعة 07 أغسطس 2026", time: "الساعة 10:00 صباحاً", venue: "مسجد الرحمة - بوزرعة", mapsQuery: "mosquee+de+la+misericorde+bozouza" },
    { title: "حفل الزفاف", subtitle: "Wedding Reception", date: "السبت 08 أغسطس 2026", time: "الساعة 05:00 مساءً", venue: "قاعة الأفراح Royale Roselyne - سليمان", mapsQuery: "Royale+Roselyne+salle+des+fetes+Slimane" },
  ];
  const addToCalendar = (event) => {
    const start = event.title.includes("قران") ? "20260807T100000" : "20260808T170000";
    const end = event.title.includes("قران") ? "20260807T130000" : "20260808T230000";
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - مريم و علي")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`, "_blank");
  };
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a] via-[#0e0c20] to-[#0c0a1a]" />
      <motion.div className="relative z-10 max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-amber-400 mx-auto mb-3" />
          <h2 className="font-aref text-amber-300 text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-amber-200/40 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>
        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div key={i} variants={fadeUp} dir="rtl" className="bg-black/40 backdrop-blur-md border border-amber-500/15 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(245,158,11,0.05)] hover:border-amber-500/25 transition-all duration-500">
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-amber-300 text-2xl md:text-3xl font-bold">{event.title}</h3>
                  <p className="font-cairo text-amber-200/35 text-xs mb-3">{event.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    <p className="font-cairo text-amber-100/60 text-sm flex items-center justify-start gap-2"><Calendar className="w-3.5 h-3.5 text-amber-400/50 flex-shrink-0" /><span>{event.date}</span></p>
                    <p className="font-cairo text-amber-100/60 text-sm flex items-center justify-start gap-2"><Clock className="w-3.5 h-3.5 text-amber-400/50 flex-shrink-0" /><span>{event.time}</span></p>
                    <p className="font-cairo text-amber-100/60 text-sm flex items-center justify-start gap-2"><MapPin className="w-3.5 h-3.5 text-amber-400/50 flex-shrink-0" /><span>{event.venue}</span></p>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")} className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 font-cairo text-xs hover:bg-amber-500/20 hover:border-amber-500/40 cursor-pointer ${btnBase}`}>
                      <span>الموقع</span><MapPin className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => addToCalendar(event)} className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-amber-500/10 border border-amber-500/25 text-amber-300 font-cairo text-xs hover:bg-amber-500/20 hover:border-amber-500/40 cursor-pointer ${btnBase}`}>
                      <span>التقويم</span><Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center">
                  <span className="font-aref text-amber-300 text-xl font-bold">{i + 1}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

function PhotoGallery() {
  const photos = [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", span: "col-span-2 row-span-2", w: 800, h: 600 },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", span: "col-span-1 row-span-2", w: 600, h: 800 },
    { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
  ];
  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0c0a1a] via-[#110e24] to-[#0c0a1a]" />
      <motion.div className="relative z-10 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Heart className="w-7 h-7 text-amber-400 mx-auto mb-3" />
          <h2 className="font-aref text-amber-300 text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-amber-200/40 text-sm">ذكريات عطرة</p>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div key={i} variants={scaleIn} className={`${photo.span} rounded-2xl overflow-hidden border border-amber-500/10 group relative`}>
              <img src={photo.url} alt="صورة من حفل الزفاف" width={photo.w} height={photo.h} className="w-full h-full object-cover gallery-img transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0c0a1a]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-[#06050f] via-[#0c0a1a] to-[#0c0a1a]" />
      <motion.div className="relative z-10 max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400/30" />
            <Flame className="w-4 h-4 text-amber-400/40" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-amber-400/30" />
          </div>
          <div className="mb-6">
            <h3 className="font-aref text-amber-300 text-3xl md:text-4xl mb-1">مريم</h3>
            <Heart className="w-5 h-5 text-amber-400/50 mx-auto my-2 fill-amber-400/20" />
            <h3 className="font-aref text-amber-300 text-3xl md:text-4xl">علي</h3>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="font-amiri text-amber-100/50 text-base md:text-lg leading-relaxed mb-8 italic">ولكم العاقبة في الأفراح والمسرات</p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-amber-400/20" />
            <Sparkles className="w-3 h-3 text-amber-400/30" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-amber-400/20" />
          </div>
          <p className="font-cairo text-amber-200/30 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel5() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#0c0a1a]">
      <HeroSection />
      <FamilyBanner />
      <Countdown />
      <EventSchedule />
      <PhotoGallery />
      <Footer />
      <DigiServicesFooter />
    </div>
  );
}
