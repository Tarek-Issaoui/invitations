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
  Moon,
  Leaf,
} from "lucide-react";

import DigiServicesFooter from "./DigiServicesFooter";

const WEDDING_DATE = new Date("2026-08-08T17:00:00");

const btnBase = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 transition-all duration-200";

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
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.2 } },
};

function NeonDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
      <span className="h-px w-20 bg-gradient-to-l from-transparent via-purple-400/30 to-transparent" />
      <Moon className="w-4 h-4 text-purple-300/60" />
      <span className="h-px w-20 bg-gradient-to-r from-transparent via-purple-400/30 to-transparent" />
    </div>
  );
}

function FloatingOrb({ delay, left, size, color }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none blur-sm"
      style={{ left: `${left}%`, width: size, height: size, backgroundColor: color }}
      animate={reduced ? {} : {
        y: [0, -60, 0],
        opacity: [0.15, 0.4, 0.15],
      }}
      transition={reduced ? {} : { duration: 8, repeat: Infinity, delay, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function StarField() {
  const stars = useMemo(() =>
    Array.from({ length: 12 }, (_, i) => ({
      left: (i * 8.5 + 2) % 100,
      top: (i * 13.7 + 5) % 100,
      size: 1 + (i % 3) * 0.5,
      duration: 2 + (i % 4),
      delay: (i * 0.7) % 4,
    })), []
  );
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {stars.map((s, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ opacity: [0.1, 0.7, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
        />
      ))}
    </div>
  );
}

function HeroSection() {
  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 120]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 80, damping: 30, mass: 1 });

  const orbs = useMemo(() =>
    Array.from({ length: 3 }, (_, i) => ({
      delay: i * 1.5,
      left: 15 + i * 25,
      size: 50 + (i % 2) * 30,
      color: i % 2 === 0 ? "rgba(147,112,219,0.3)" : "rgba(200,100,150,0.25)",
    })), []
  );

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0a0a12]">
      <motion.div className="absolute inset-0" style={{ y: smoothBgY }}>
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80')" }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a12]/95 via-[#0a0a12]/70 to-[#0a0a12]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,80,200,0.15)_0%,transparent_60%)]" aria-hidden="true" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(200,100,150,0.08)_0%,transparent_50%)]" aria-hidden="true" />
      </motion.div>

      <StarField />

      {orbs.map((o, i) => (
        <FloatingOrb key={i} delay={o.delay} left={o.left} size={o.size} color={o.color} />
      ))}

      <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ y: smoothTextY, opacity: smoothOpacity }}>
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <p className="font-amiri text-purple-200/60 text-lg md:text-xl mb-2">
            بسم الله الرحمن الرحيم
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <NeonDivider />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <p className="font-amiri text-white/60 text-sm md:text-base leading-loose mb-10 italic max-w-lg mx-auto">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
          <div className="relative inline-block">
            <h1 className="font-aref text-transparent bg-clip-text bg-gradient-to-l from-purple-300 via-pink-200 to-purple-300 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              نورة
            </h1>
            <div className="flex items-center justify-center gap-3 sm:gap-5 my-4" aria-hidden="true">
              <span className="h-px w-10 sm:w-16 bg-gradient-to-l from-transparent to-purple-400/30" />
              <motion.div animate={reduced ? {} : { rotate: [0, 10, -10, 0] }} transition={reduced ? {} : { duration: 4, repeat: Infinity }}>
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-pink-300/60 fill-pink-400/20" />
              </motion.div>
              <span className="h-px w-10 sm:w-16 bg-gradient-to-r from-transparent to-purple-400/30" />
            </div>
            <h1 className="font-aref text-transparent bg-clip-text bg-gradient-to-l from-pink-300 via-purple-200 to-pink-300 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              و سليمان
            </h1>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.4 }}>
          <p className="font-cairo text-white/50 text-sm mt-8 tracking-[0.4em]">08 · 08 · 2026</p>
        </motion.div>
      </motion.div>

      <motion.button
        className={`absolute bottom-8 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer ${btnBase}`}
        onClick={() => {
          document.getElementById("family-banner")?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
        }}
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={reduced ? {} : { duration: 2.5, repeat: Infinity }}
        aria-label="اسحب للأسفل"
      >
        <span className="font-cairo text-white/50 text-xs">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-purple-300/40" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  return (
    <section id="family-banner" className="relative py-24 px-6 bg-[#0a0a12]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.06)_0%,transparent_70%)]" aria-hidden="true" />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="bg-white/[0.03] backdrop-blur-xl border border-purple-500/10 rounded-3xl p-10 md:p-14 text-center shadow-[0_0_60px_rgba(120,80,200,0.06)]"
        >
          <Sparkles className="w-5 h-5 text-purple-300/50 mx-auto mb-5" aria-hidden="true" />
          <p className="font-cairo text-white/60 text-sm md:text-base leading-loose">
            يتشرف عائلتا
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 my-6">
            <p className="font-aref text-purple-200/80 text-xl md:text-2xl">السيد حمادي بوخيشة</p>
            <span className="font-cairo text-purple-300/30 hidden sm:inline" aria-hidden="true">&</span>
            <p className="font-aref text-purple-200/80 text-xl md:text-2xl">السيد محمد لحبيب لاغي</p>
          </div>
          <p className="font-cairo text-white/60 text-sm md:text-base leading-loose">
            بدعوتكم لحضور حفل زفاف ابنيهما
          </p>
          <NeonDivider />
          <p className="font-amiri text-purple-200/70 text-lg md:text-xl italic">نورة و سليمان</p>
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
    <section className="relative py-24 px-6 bg-[#0a0a12]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(200,100,150,0.05)_0%,transparent_60%)]" aria-hidden="true" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-purple-300/50 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-purple-200/80 text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-white/50 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              variants={scaleIn}
              className="bg-white/[0.03] backdrop-blur-xl border border-purple-500/10 rounded-2xl p-6 shadow-[0_0_30px_rgba(120,80,200,0.04)] hover:shadow-[0_0_40px_rgba(120,80,200,0.1)] hover:border-purple-500/20 transition-all duration-500"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block font-aref text-transparent bg-clip-text bg-gradient-to-b from-purple-200 to-pink-200 text-4xl md:text-5xl font-bold"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-white/50 text-xs mt-2 block">{unit.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function EventSchedule() {
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
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - نورة و سليمان")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative py-24 px-6 bg-[#0a0a12]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,80,200,0.04)_0%,transparent_60%)]" aria-hidden="true" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-purple-300/50 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-purple-200/80 text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-white/50 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              dir="rtl"
              className="bg-white/[0.03] backdrop-blur-xl border border-purple-500/10 rounded-3xl p-8 md:p-10 shadow-[0_0_40px_rgba(120,80,200,0.04)] hover:border-purple-500/20 transition-all duration-500 group"
            >
              <div className="flex items-start gap-5">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-transparent bg-clip-text bg-gradient-to-l from-purple-200 to-pink-200 text-2xl md:text-3xl font-bold mb-1">
                    {event.title}
                  </h3>
                  <p className="font-cairo text-white/40 text-xs mb-4">{event.subtitle}</p>

                  <div className="space-y-2 mb-5">
                    <p className="font-cairo text-white/60 text-sm flex items-center justify-start gap-2">
                      <Calendar className="w-4 h-4 text-purple-300/40 flex-shrink-0" />
                      <span>{event.date}</span>
                    </p>
                    <p className="font-cairo text-white/60 text-sm flex items-center justify-start gap-2">
                      <Clock className="w-4 h-4 text-purple-300/40 flex-shrink-0" />
                      <span>{event.time}</span>
                    </p>
                    <p className="font-cairo text-white/60 text-sm flex items-center justify-start gap-2">
                      <MapPin className="w-4 h-4 text-purple-300/40 flex-shrink-0" />
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200/70 font-cairo text-xs hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>الموقع</span>
                      <MapPin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCalendar(event)}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-200/70 font-cairo text-xs hover:bg-purple-500/20 hover:border-purple-500/30 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>التقويم</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-purple-500/10 border border-purple-500/15 flex items-center justify-center group-hover:shadow-[0_0_20px_rgba(120,80,200,0.15)] transition-shadow duration-500">
                  <span className="font-aref text-purple-200/70 text-xl font-bold">{i + 1}</span>
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
    <section className="relative py-24 px-6 bg-[#0a0a12]">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Leaf className="w-7 h-7 text-purple-300/50 mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-purple-200/80 text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-white/50 text-sm">ذكريات عطرة</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div key={i} variants={scaleIn} className={`${photo.span} rounded-2xl overflow-hidden border border-purple-500/10 group relative`}>
              <img src={photo.url} alt="" width={photo.w} height={photo.h} className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a12]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
              <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/15 rounded-2xl transition-all duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-24 px-6 bg-[#08080f]">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,80,200,0.04)_0%,transparent_60%)]" aria-hidden="true" />
      <StarField />
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <NeonDivider />
          <div className="mb-8">
            <h3 className="font-aref text-transparent bg-clip-text bg-gradient-to-l from-purple-300 via-pink-200 to-purple-300 text-3xl md:text-4xl mb-1">نورة</h3>
            <Heart className="w-5 h-5 text-pink-300/30 mx-auto my-3 fill-pink-400/10" aria-hidden="true" />
            <h3 className="font-aref text-transparent bg-clip-text bg-gradient-to-l from-pink-300 via-purple-200 to-pink-300 text-3xl md:text-4xl">سليمان</h3>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="font-amiri text-white/50 text-base md:text-lg leading-relaxed mb-10 italic">
            ولكم العاقبة في الأفراح والمسرات
          </p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <NeonDivider />
          <p className="font-cairo text-white/40 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel3() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#0a0a12]">
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
