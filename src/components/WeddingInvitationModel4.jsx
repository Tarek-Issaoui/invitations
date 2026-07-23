import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Calendar,
  Heart,
  Clock,
  ChevronDown,
  Sparkles,
  Star,
  Flower2,
  Sun,
  Compass,
} from "lucide-react";

import DigiServicesFooter from "./DigiServicesFooter";

const WEDDING_DATE = new Date("2026-08-08T17:00:00");

const btnBase =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-300/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a0f14] active:scale-95 transition-transform";

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

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.88 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.15 } },
};

function RoseGoldDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
      <span className="h-px w-28 bg-gradient-to-l from-transparent via-rose-300/40 to-transparent" />
      <Flower2 className="w-5 h-5 text-rose-300/50" />
      <span className="h-px w-28 bg-gradient-to-r from-transparent via-rose-300/40 to-transparent" />
    </div>
  );
}

function Bokeh({ count, reducedMotion = false }) {
  const circles = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      left: (i * 23 + 7) % 100,
      top: (i * 17 + 11) % 100,
      size: 60 + (i % 3) * 30,
      r: 180 + (i % 4) * 20,
      g: 120 + (i % 3) * 20,
      b: 120 + (i % 2) * 20,
      duration: 5 + (i % 3) * 2,
      delay: (i * 0.8) % 3,
    })), [count]
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {circles.map((c, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: `${c.left}%`,
            top: `${c.top}%`,
            width: c.size,
            height: c.size,
            background: `radial-gradient(circle, rgba(${c.r},${c.g},${c.b},0.08) 0%, transparent 70%)`,
          }}
          animate={reducedMotion ? {} : { scale: [1, 1.15, 1], opacity: [0.3, 0.55, 0.3] }}
          transition={reducedMotion ? {} : { duration: c.duration, repeat: Infinity, delay: c.delay }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 180]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reducedMotion ? 0 : 80]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothRotate = useSpring(useTransform(scrollYProgress, [0, 0.8], [0, reducedMotion ? 0 : -2]), { stiffness: 80, damping: 30, mass: 1 });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div className="absolute inset-0" style={{ y: smoothBgY }}>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1920&q=80')" }}
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a0f14]/85 via-[#1a0f14]/65 to-[#1a0f14]/95" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(220,150,140,0.12)_0%,transparent_60%)]" aria-hidden="true" />
      </div>

      <Bokeh count={3} reducedMotion={reducedMotion} />

      <motion.div className="relative z-10 text-center px-6 max-w-4xl mx-auto" style={{ y: smoothTextY, opacity: smoothOpacity }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative inline-block mb-6">
            <Sun className="w-10 h-10 text-amber-300/30 mx-auto" aria-hidden="true" />
            <motion.div
              className="absolute inset-0"
              animate={reducedMotion ? {} : { rotate: 360 }}
              transition={reducedMotion ? {} : { duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <Star className="w-10 h-10 text-rose-300/15 absolute top-0 left-0" aria-hidden="true" />
            </motion.div>
          </div>
          <p className="font-amiri text-rose-100/50 text-lg md:text-xl mb-3 tracking-wide">
            بسم الله الرحمن الرحيم
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <RoseGoldDivider />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
          <p className="font-amiri text-rose-100/55 text-sm md:text-base leading-loose mb-10 italic max-w-lg mx-auto">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div style={{ rotate: smoothRotate }}>
          <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.9 }}>
            <h1 className="font-aref text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
              style={{
                background: "linear-gradient(135deg, #f4c6c6, #e8a87c, #d4a574, #c9956c)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 20px rgba(220,150,140,0.3))",
              }}
            >
              فاطمة
            </h1>
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-5" aria-hidden="true">
              <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-rose-300/30" />
              <motion.div animate={reducedMotion ? {} : { scale: [1, 1.3, 1], rotate: [0, 5, -5, 0] }} transition={reducedMotion ? {} : { duration: 3, repeat: Infinity }}>
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-rose-300/50 fill-rose-400/20" />
              </motion.div>
              <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-rose-300/30" />
            </div>
            <h1 className="font-aref text-4xl sm:text-5xl md:text-7xl font-bold leading-tight"
              style={{
                background: "linear-gradient(135deg, #c9956c, #e8a87c, #f4c6c6)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                filter: "drop-shadow(0 4px 20px rgba(220,150,140,0.3))",
              }}
            >
              و يوسف
            </h1>
          </motion.div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
          <p className="font-cairo text-rose-200/50 text-sm mt-10 tracking-[0.3em]">08 · 08 · 2026</p>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-10 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
        aria-label="اسحب للأسفل"
        animate={{ y: reducedMotion ? 0 : [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: reducedMotion ? 0 : Infinity }}
      >
        <span className="font-cairo text-rose-200/50 text-xs pointer-events-none">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-rose-300/40 pointer-events-none" aria-hidden="true" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  const reducedMotion = useReducedMotion();
  return (
    <section className="relative py-24 px-6 bg-[#1a0f14]">
      <Bokeh count={3} reducedMotion={reducedMotion} />
      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="relative bg-gradient-to-br from-[#2a1a22]/80 to-[#1a0f14]/80 backdrop-blur-xl border border-rose-300/10 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_60px_rgba(220,150,140,0.05)] overflow-hidden"
        >
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" aria-hidden="true" />
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/30 to-transparent" aria-hidden="true" />

          <Compass className="w-5 h-5 text-rose-300/40 mx-auto mb-5" aria-hidden="true" />
          <p className="font-cairo text-rose-100/40 text-sm md:text-base leading-loose">
            يتشرف عائلتا
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 my-6">
            <p className="font-aref text-rose-200/70 text-xl md:text-2xl">السيد حمادي بوخيشة</p>
            <span className="font-cairo text-rose-300/25 hidden sm:inline">&</span>
            <p className="font-aref text-rose-200/70 text-xl md:text-2xl">السيد محمد لحبيب لاغي</p>
          </div>
          <p className="font-cairo text-rose-100/40 text-sm md:text-base leading-loose">
            بدعوتكم لحضور حفل زفاف ابنيهما
          </p>
          <RoseGoldDivider />
          <p className="font-amiri text-amber-200/50 text-lg md:text-xl italic">فاطمة و يوسف</p>
        </motion.div>
      </motion.div>
    </section>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const calc = () => {
      const diff = WEDDING_DATE.getTime() - Date.now();
      if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      return {
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff / 3600000) % 24),
        minutes: Math.floor((diff / 60000) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      };
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
    <section className="relative py-24 px-6 bg-[#1a0f14]">
      <Bokeh count={2} reducedMotion={reducedMotion} />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-rose-300/40 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-rose-200/70 text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-rose-100/50 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              variants={scaleIn}
              className="relative bg-gradient-to-br from-[#2a1a22]/60 to-[#1a0f14]/60 backdrop-blur-xl border border-rose-300/10 rounded-2xl p-6 shadow-[0_4px_30px_rgba(220,150,140,0.04)] hover:shadow-[0_8px_40px_rgba(220,150,140,0.1)] hover:border-rose-300/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/20 to-transparent" aria-hidden="true" />
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block font-aref text-4xl md:text-5xl font-bold"
                  style={{
                    background: "linear-gradient(135deg, #f4c6c6, #e8a87c)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-rose-100/45 text-xs mt-2 block">{unit.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function EventSchedule() {
  const reducedMotion = useReducedMotion();
  const events = [
    {
      title: "عقد القران",
      subtitle: "Marriage Contract",
      date: "الجمعة 07 أغسطس 2026",
      time: "الساعة 10:00 صباحاً",
      venue: "مسجد الرحمة - بوزرعة",
      mapsQuery: "mosquee+de+la+misericorde+bozouza",
    },
    {
      title: "حفل الزفاف",
      subtitle: "Wedding Reception",
      date: "السبت 08 أغسطس 2026",
      time: "الساعة 05:00 مساءً",
      venue: "قاعة الأفراح Royale Roselyne - سليمان",
      mapsQuery: "Royale+Roselyne+salle+des+fetes+Slimane",
    },
  ];

  const addToCalendar = (event) => {
    const start = event.title.includes("قران") ? "20260807T100000" : "20260808T170000";
    const end = event.title.includes("قران") ? "20260807T130000" : "20260808T230000";
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - فاطمة و يوسف")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative py-24 px-6 bg-[#1a0f14]">
      <Bokeh count={2} reducedMotion={reducedMotion} />
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-rose-300/40 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-rose-200/70 text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-rose-100/50 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              dir="rtl"
              className="relative bg-gradient-to-br from-[#2a1a22]/60 to-[#1a0f14]/60 backdrop-blur-xl border border-rose-300/10 rounded-3xl p-8 md:p-10 shadow-[0_4px_40px_rgba(220,150,140,0.04)] hover:border-rose-300/20 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/20 to-transparent" aria-hidden="true" />
              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-rose-300/15 to-transparent" aria-hidden="true" />

              <div className="flex items-start gap-5">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-2xl md:text-3xl font-bold mb-1"
                    style={{ background: "linear-gradient(135deg, #f4c6c6, #e8a87c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                  >
                    {event.title}
                  </h3>
                  <p className="font-cairo text-rose-100/40 text-xs mb-4">{event.subtitle}</p>

                  <div className="space-y-2 mb-5">
                    <p className="font-cairo text-rose-100/45 text-sm flex items-center justify-start gap-2">
                      <Calendar className="w-4 h-4 text-rose-300/30 flex-shrink-0" aria-hidden="true" />
                      <span>{event.date}</span>
                    </p>
                    <p className="font-cairo text-rose-100/45 text-sm flex items-center justify-start gap-2">
                      <Clock className="w-4 h-4 text-rose-300/30 flex-shrink-0" aria-hidden="true" />
                      <span>{event.time}</span>
                    </p>
                    <p className="font-cairo text-rose-100/45 text-sm flex items-center justify-start gap-2">
                      <MapPin className="w-4 h-4 text-rose-300/30 flex-shrink-0" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-rose-400/10 border border-rose-300/15 text-rose-200/60 font-cairo text-xs hover:bg-rose-400/20 hover:border-rose-300/30 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>الموقع</span>
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => addToCalendar(event)}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-rose-400/10 border border-rose-300/15 text-rose-200/60 font-cairo text-xs hover:bg-rose-400/20 hover:border-rose-300/30 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>التقويم</span>
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-rose-400/10 border border-rose-300/15 flex items-center justify-center" aria-hidden="true">
                  <span className="font-aref text-rose-200/60 text-xl font-bold">{i + 1}</span>
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
  const reducedMotion = useReducedMotion();
  const photos = [
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80", span: "col-span-2 row-span-2", w: 800, h: 600 },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", span: "col-span-1 row-span-2", w: 600, h: 800 },
    { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
  ];

  return (
    <section className="relative py-24 px-6 bg-[#1a0f14]">
      <Bokeh count={2} reducedMotion={reducedMotion} />
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Flower2 className="w-7 h-7 text-rose-300/40 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-rose-200/70 text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-rose-100/50 text-sm">ذكريات عطرة</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div key={i} variants={scaleIn} className={`${photo.span} rounded-2xl overflow-hidden border border-rose-300/8 group relative`}>
              <img src={photo.url} alt="" className="gallery-img w-full h-full object-cover transition-all duration-700 group-hover:scale-105 opacity-60 group-hover:opacity-90" loading="lazy" width={photo.width} height={photo.height} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a0f14]/80 via-transparent to-transparent will-change-[opacity]" />
              <div className="absolute inset-0 border border-rose-300/0 group-hover:border-rose-300/15 rounded-2xl transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  const reducedMotion = useReducedMotion();
  return (
    <footer className="relative py-24 px-6 bg-[#120a0f]">
      <Bokeh count={3} reducedMotion={reducedMotion} />
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <RoseGoldDivider />
          <div className="mb-8">
            <h3 className="font-aref text-3xl md:text-4xl font-bold mb-1"
              style={{ background: "linear-gradient(135deg, #f4c6c6, #e8a87c)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              فاطمة
            </h3>
            <Heart className="w-6 h-6 text-rose-300/25 mx-auto my-3 fill-rose-400/10" aria-hidden="true" />
            <h3 className="font-aref text-3xl md:text-4xl font-bold"
              style={{ background: "linear-gradient(135deg, #e8a87c, #f4c6c6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
            >
              يوسف
            </h3>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="font-amiri text-rose-100/50 text-base md:text-lg leading-relaxed mb-10 italic">
            ولكم العاقبة في الأفراح والمسرات
          </p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <RoseGoldDivider />
          <p className="font-cairo text-rose-100/40 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel4() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#1a0f14]">
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
