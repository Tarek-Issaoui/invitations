import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Calendar, ChevronDown, Clock, Heart, MapPin, Sparkles, Star, Mountain } from "lucide-react";
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

function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Base sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020615] via-[#050d1f] to-[#0a0a1a]" />

      {/* Aurora band 1 - cyan/green */}
      <motion.div
        className="absolute top-[10%] left-0 right-0 h-[40%] opacity-30"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(6,182,212,0.15) 20%, rgba(16,185,129,0.2) 40%, rgba(6,182,212,0.15) 60%, transparent 100%)",
          filter: "blur(60px)",
        }}
        animate={{ opacity: [0.15, 0.35, 0.15], scaleY: [0.8, 1.2, 0.8] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Aurora band 2 - purple/pink */}
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-[35%] opacity-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(139,92,246,0.15) 25%, rgba(236,72,153,0.12) 50%, rgba(139,92,246,0.1) 75%, transparent 100%)",
          filter: "blur(80px)",
        }}
        animate={{ opacity: [0.1, 0.25, 0.1], scaleY: [1, 0.7, 1], x: [-50, 50, -50] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Aurora band 3 - green/teal */}
      <motion.div
        className="absolute top-[5%] left-0 right-0 h-[30%] opacity-20"
        style={{
          background: "linear-gradient(180deg, transparent 0%, rgba(16,185,129,0.2) 30%, rgba(6,182,212,0.15) 60%, transparent 100%)",
          filter: "blur(50px)",
        }}
        animate={{ opacity: [0.1, 0.3, 0.1], x: [30, -30, 30] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 4 }}
      />

      {/* Mountain silhouette */}
      <svg className="absolute bottom-0 left-0 right-0 w-full" viewBox="0 0 1440 200" preserveAspectRatio="none" style={{ height: "15%" }}>
        <path d="M0,200 L0,140 Q120,80 240,120 Q360,60 480,100 Q600,40 720,90 Q840,30 960,80 Q1080,50 1200,100 Q1320,70 1440,110 L1440,200 Z" fill="#0a0a1a" />
        <path d="M0,200 L0,160 Q180,110 360,150 Q540,90 720,130 Q900,80 1080,120 Q1260,100 1440,140 L1440,200 Z" fill="#080812" opacity="0.7" />
      </svg>
    </div>
  );
}

function HeroSection() {
  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 100, damping: 30, mass: 1 });

  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      x: Math.random() * 100,
      y: Math.random() * 70,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 5,
      duration: 2 + Math.random() * 3,
    })), []
  );

  const scrollToContent = () => heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: smoothBgY }}>
        <AuroraBackground />
      </motion.div>

      {/* Stars */}
      {stars.map((s, i) => (
        <motion.div key={i} className="absolute rounded-full bg-white pointer-events-none"
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.size, height: s.size }}
          animate={reduced ? {} : { opacity: [0.1, 0.8, 0.1] }}
          transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
          aria-hidden="true"
        />
      ))}

      <motion.div className="relative z-10 text-center px-6 max-w-3xl mx-auto" style={{ y: smoothTextY, opacity: smoothOpacity }}>
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <p className="font-amiri text-cyan-200/60 text-lg md:text-xl mb-2 tracking-wide">بسم الله الرحمن الرحيم</p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/40" />
            <Star className="w-4 h-4 text-cyan-300 animate-pulse" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/40" />
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <p className="font-amiri text-cyan-100/50 text-base md:text-lg leading-relaxed mb-8 italic">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
          <div className="relative inline-block">
            <h1 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-teal-200 to-emerald-200 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              حسناء
            </h1>
            <div className="flex items-center justify-center gap-4 my-3">
              <span className="h-px w-8 sm:w-12 bg-cyan-400/30" />
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-300 fill-cyan-300/30 animate-pulse" />
              <span className="h-px w-8 sm:w-12 bg-cyan-400/30" />
            </div>
            <h1 className="font-aref text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 text-4xl sm:text-5xl md:text-7xl font-bold leading-tight">
              و كريم
            </h1>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.4 }}>
          <p className="font-cairo text-cyan-200/30 text-sm mt-6 tracking-wider">08 / 08 / 2026</p>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-4"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="اسحب للأسفل"
      >
        <span className="font-cairo text-cyan-200/40 text-xs">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-cyan-400/40" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <AuroraBackground />
      <motion.div className="relative z-10 max-w-2xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        <motion.div variants={fadeUp} className="bg-black/40 backdrop-blur-md border border-cyan-500/10 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(6,182,212,0.05)]">
          <Mountain className="w-6 h-6 text-cyan-400/60 mx-auto mb-4" />
          <p className="font-cairo text-cyan-100/50 text-sm md:text-base leading-loose">يتشرف عائلتا</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 my-4">
            <p className="font-aref text-cyan-200/80 text-xl md:text-2xl">السيد حمادي بوخيشة</p>
            <span className="font-cairo text-cyan-200/25 hidden sm:inline">&</span>
            <p className="font-aref text-cyan-200/80 text-xl md:text-2xl">السيد محمد لحبيب لاغي</p>
          </div>
          <p className="font-cairo text-cyan-100/50 text-sm md:text-base leading-loose">بدعوتكم لحضور حفل زفاف ابنيهما</p>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/30" />
            <Sparkles className="w-4 h-4 text-cyan-400/40" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/30" />
          </div>
          <p className="font-amiri text-cyan-100/60 text-lg md:text-xl">حسناء و كريم</p>
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
      <AuroraBackground />
      <motion.div className="relative z-10 max-w-3xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-cyan-400 mx-auto mb-3" />
          <h2 className="font-aref text-cyan-200/80 text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-cyan-200/35 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit) => (
            <motion.div key={unit.label} variants={scaleIn} className="bg-black/40 backdrop-blur-md border border-cyan-500/10 rounded-3xl p-5 md:p-6 shadow-[0_0_30px_rgba(6,182,212,0.04)] hover:shadow-[0_0_40px_rgba(6,182,212,0.1)] hover:border-cyan-500/20 transition-all duration-500">
              <AnimatePresence mode="popLayout">
                <motion.span key={unit.value} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 20, opacity: 0 }} transition={{ duration: 0.3 }} className="block font-aref text-cyan-200/80 text-4xl md:text-5xl font-bold">
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-cyan-200/35 text-xs mt-2 block">{unit.label}</span>
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
    window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - حسناء و كريم")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`, "_blank");
  };
  return (
    <section className="relative py-24 px-6">
      <AuroraBackground />
      <motion.div className="relative z-10 max-w-3xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-cyan-400 mx-auto mb-3" />
          <h2 className="font-aref text-cyan-200/80 text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-cyan-200/35 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>
        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div key={i} variants={fadeUp} dir="rtl" className="bg-black/40 backdrop-blur-md border border-cyan-500/10 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(6,182,212,0.04)] hover:border-cyan-500/20 transition-all duration-500">
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-cyan-200/80 text-2xl md:text-3xl font-bold">{event.title}</h3>
                  <p className="font-cairo text-cyan-200/30 text-xs mb-3">{event.subtitle}</p>
                  <div className="space-y-1.5 mb-4">
                    <p className="font-cairo text-cyan-100/50 text-sm flex items-center justify-start gap-2"><Calendar className="w-3.5 h-3.5 text-cyan-400/40 flex-shrink-0" /><span>{event.date}</span></p>
                    <p className="font-cairo text-cyan-100/50 text-sm flex items-center justify-start gap-2"><Clock className="w-3.5 h-3.5 text-cyan-400/40 flex-shrink-0" /><span>{event.time}</span></p>
                    <p className="font-cairo text-cyan-100/50 text-sm flex items-center justify-start gap-2"><MapPin className="w-3.5 h-3.5 text-cyan-400/40 flex-shrink-0" /><span>{event.venue}</span></p>
                  </div>
                  <div className="flex items-center justify-end gap-3">
                    <button onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")} className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200/70 font-cairo text-xs hover:bg-cyan-500/20 hover:border-cyan-500/35 cursor-pointer ${btnBase}`}>
                      <span>الموقع</span><MapPin className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => addToCalendar(event)} className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-200/70 font-cairo text-xs hover:bg-cyan-500/20 hover:border-cyan-500/35 cursor-pointer ${btnBase}`}>
                      <span>التقويم</span><Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/10 flex items-center justify-center">
                  <span className="font-aref text-cyan-200/70 text-xl font-bold">{i + 1}</span>
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
      <AuroraBackground />
      <motion.div className="relative z-10 max-w-4xl mx-auto" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={stagger}>
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Heart className="w-7 h-7 text-cyan-400 mx-auto mb-3" />
          <h2 className="font-aref text-cyan-200/80 text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-cyan-200/35 text-sm">ذكريات عطرة</p>
        </motion.div>
        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div key={i} variants={scaleIn} className={`${photo.span} rounded-2xl overflow-hidden border border-cyan-500/10 group relative`}>
              <img src={photo.url} alt="صورة من حفل الزفاف" width={photo.w} height={photo.h} className="w-full h-full object-cover gallery-img transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020615]/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
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
      <AuroraBackground />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020408] via-transparent to-transparent" />
      <motion.div className="relative z-10 max-w-2xl mx-auto text-center" initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
        <motion.div variants={fadeUp}>
          <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-400/20" />
            <Star className="w-4 h-4 text-cyan-400/30" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-400/20" />
          </div>
          <div className="mb-6">
            <h3 className="font-aref text-cyan-200/80 text-3xl md:text-4xl mb-1">حسناء</h3>
            <Heart className="w-5 h-5 text-cyan-400/40 mx-auto my-2 fill-cyan-400/15" />
            <h3 className="font-aref text-cyan-200/80 text-3xl md:text-4xl">كريم</h3>
          </div>
        </motion.div>
        <motion.div variants={fadeUp}>
          <p className="font-amiri text-cyan-100/40 text-base md:text-lg leading-relaxed mb-8 italic">ولكم العاقبة في الأفراح والمسرات</p>
        </motion.div>
        <motion.div variants={fadeIn}>
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-cyan-400/15" />
            <Sparkles className="w-3 h-3 text-cyan-400/20" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-cyan-400/15" />
          </div>
          <p className="font-cairo text-cyan-200/20 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel6() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#020615]">
      <HeroSection />
      <FamilyBanner />
      <Countdown />
      <EventSchedule />
      <PhotoGallery />
      <Footer />
      <DigiServicesFooter />
      <AudioPlayer />
    </div>
  );
}
