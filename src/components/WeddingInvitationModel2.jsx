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
  GlassWater,
  Gem,
} from "lucide-react";

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

const btnBase = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 transition-all duration-200";

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};
const slideRight = {
  hidden: { opacity: 0, x: -60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};
const slideLeft = {
  hidden: { opacity: 0, x: 60 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

function OrnamentalBorder() {
  return (
    <div className="flex items-center justify-center gap-4 my-8" aria-hidden="true">
      <span className="h-px w-24 bg-gradient-to-l from-transparent via-[#c9a84c]/60 to-transparent" />
      <Gem className="w-5 h-5 text-[#c9a84c] animate-pulse-gold" />
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-[#c9a84c]/60 to-transparent" />
    </div>
  );
}

function FloatingPetal({ delay, left, size, rotation, reduced }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      aria-hidden="true"
      style={{ left: `${left}%` }}
      initial={{ y: -20, opacity: 0, rotate: 0 }}
      animate={reduced ? {} : {
        y: ["0vh", "100vh"],
        opacity: [0, 0.3, 0.5, 0.3, 0],
        rotate: [0, rotation],
      }}
      transition={{
        duration: 12 + Math.random() * 8,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    >
      <Flower2 className="text-[#c9a84c]/30" style={{ width: size, height: size }} />
    </motion.div>
  );
}

function HeroSection() {
  const heroRef = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 80, damping: 30, mass: 1 });
  const smoothScale = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0.95]), { stiffness: 80, damping: 30, mass: 1 });

  const petals = useMemo(() =>
    Array.from({ length: 5 }, (_, i) => ({
      delay: i * 2,
      left: 15 + i * 16,
      size: 12 + (i % 3) * 5,
      rotation: i * 72,
    })), []
  );

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={{ y: reduced ? 0 : smoothBgY }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920&q=80')",
          }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-[#faf8f0]/90 via-[#faf8f0]/70 to-[#faf8f0]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(250,248,240,0.6)_70%)]" aria-hidden="true" />

      {petals.map((p, i) => (
        <FloatingPetal
          key={i}
          delay={p.delay}
          left={p.left}
          size={p.size}
          rotation={p.rotation}
          reduced={reduced}
        />
      ))}

      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#faf8f0] to-transparent z-10" aria-hidden="true" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
        style={{ y: reduced ? 0 : smoothTextY, opacity: reduced ? 1 : smoothOpacity, scale: reduced ? 1 : smoothScale }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-block border-2 border-[#c9a84c]/30 rounded-full px-8 py-3 mb-8">
            <p className="font-amiri text-[#8b7355] text-lg md:text-xl tracking-wider">
              بسم الله الرحمن الرحيم
            </p>
          </div>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.4 }}>
          <OrnamentalBorder />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.6 }}>
          <p className="font-amiri text-[#6b5a3e] text-base md:text-lg leading-loose mb-10 italic max-w-xl mx-auto">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.9 }}>
          <div className="relative">
            <h1 className="font-aref text-[#c9a84c] text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(201,168,76,0.2)]">
              ليلى
            </h1>
            <div className="flex items-center justify-center gap-4 sm:gap-6 my-4" aria-hidden="true">
              <span className="h-px w-10 sm:w-20 bg-gradient-to-l from-transparent to-[#c9a84c]/50" />
              <motion.div
                animate={reduced ? {} : { scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Heart className="w-6 h-6 sm:w-8 sm:h-8 text-[#c9a84c] fill-[#c9a84c]/20" />
              </motion.div>
              <span className="h-px w-10 sm:w-20 bg-gradient-to-r from-transparent to-[#c9a84c]/50" />
            </div>
            <h1 className="font-aref text-[#c9a84c] text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_2px_10px_rgba(201,168,76,0.2)]">
              و أحمد
            </h1>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.5 }}>
          <p className="font-cairo text-[#8b7355]/80 text-sm mt-8 tracking-[0.3em] uppercase">
            08 . 08 . 2026
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        className="absolute bottom-10 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" })}
        animate={reduced ? {} : { y: [0, 10, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        aria-label="اسحب للأسفل"
      >
        <span className="font-cairo text-[#8b7355]/60 text-xs tracking-wider">اكتشف المزيد</span>
        <ChevronDown className="w-5 h-5 text-[#c9a84c]/60" aria-hidden="true" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  return (
    <section className="relative py-24 px-6 bg-[#faf8f0]">
      <div className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=30')",
          backgroundSize: "500px",
        }}
      />

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="bg-white/60 backdrop-blur-sm border border-[#c9a84c]/20 rounded-3xl p-10 md:p-14 text-center shadow-[0_8px_40px_rgba(201,168,76,0.08)]"
        >
          <Star className="w-6 h-6 text-[#c9a84c] mx-auto mb-5" aria-hidden="true" />
          <p className="font-cairo text-[#6b5a3e] text-sm md:text-base leading-loose">
            يتشرف عائلتا
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-8 my-6">
            <p className="font-aref text-[#c9a84c] text-xl md:text-2xl">
              السيد حمادي بوخيشة
            </p>
            <span className="font-cairo text-[#c9a84c]/60 hidden sm:inline text-lg" aria-hidden="true">&</span>
            <p className="font-aref text-[#c9a84c] text-xl md:text-2xl">
              السيد محمد لحبيب لاغي
            </p>
          </div>
          <p className="font-cairo text-[#6b5a3e] text-sm md:text-base leading-loose">
            بدعوتكم لحضور حفل زفاف ابنيهما
          </p>
          <OrnamentalBorder />
          <p className="font-amiri text-[#8b7355] text-lg md:text-xl italic">
            ليلى و أحمد
          </p>
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
    <section className="relative py-24 px-6 bg-[#faf8f0]">
      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-[#c9a84c] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-[#c9a84c] text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-[#8b7355]/80 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-5">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              variants={scaleIn}
              className="bg-white/70 backdrop-blur-sm border border-[#c9a84c]/20 rounded-2xl p-6 shadow-[0_4px_24px_rgba(201,168,76,0.06)] hover:shadow-[0_8px_32px_rgba(201,168,76,0.12)] transition-shadow duration-500"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 15, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="block font-aref text-[#c9a84c] text-4xl md:text-5xl font-bold"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-[#8b7355]/80 text-xs mt-2 block">{unit.label}</span>
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
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - ليلى و أحمد")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative py-24 px-6 bg-[#faf8f0]">
      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-[#c9a84c] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-[#c9a84c] text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-[#8b7355]/80 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>

        <div className="space-y-8">
          {events.map((event, i) => (
            <motion.div
              key={i}
              variants={i === 0 ? slideRight : slideLeft}
              dir="rtl"
              className="bg-white/60 backdrop-blur-sm border border-[#c9a84c]/20 rounded-3xl p-8 md:p-10 shadow-[0_4px_30px_rgba(201,168,76,0.06)] hover:border-[#c9a84c]/35 transition-colors duration-500"
            >
              <div className="flex items-start gap-5">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-[#c9a84c] text-2xl md:text-3xl font-bold mb-1">
                    {event.title}
                  </h3>
                  <p className="font-cairo text-[#8b7355]/60 text-xs mb-4">{event.subtitle}</p>

                  <div className="space-y-2 mb-5">
                    <p className="font-cairo text-[#6b5a3e] text-sm flex items-center justify-start gap-2">
                      <Calendar className="w-4 h-4 text-[#c9a84c]/50 flex-shrink-0" aria-hidden="true" />
                      <span>{event.date}</span>
                    </p>
                    <p className="font-cairo text-[#6b5a3e] text-sm flex items-center justify-start gap-2">
                      <Clock className="w-4 h-4 text-[#c9a84c]/50 flex-shrink-0" aria-hidden="true" />
                      <span>{event.time}</span>
                    </p>
                    <p className="font-cairo text-[#6b5a3e] text-sm flex items-center justify-start gap-2">
                      <MapPin className="w-4 h-4 text-[#c9a84c]/50 flex-shrink-0" aria-hidden="true" />
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] font-cairo text-xs hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>الموقع</span>
                      <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                    <button
                      onClick={() => addToCalendar(event)}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/30 text-[#c9a84c] font-cairo text-xs hover:bg-[#c9a84c]/20 hover:border-[#c9a84c]/50 transition-all duration-300 cursor-pointer ${btnBase}`}
                    >
                      <span>التقويم</span>
                      <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                </div>

                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#c9a84c]/10 border border-[#c9a84c]/25 flex items-center justify-center" aria-hidden="true">
                  <span className="font-aref text-[#c9a84c] text-xl font-bold">{i + 1}</span>
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
    <section className="relative py-24 px-6 bg-[#faf8f0]">
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Heart className="w-7 h-7 text-[#c9a84c] mx-auto mb-3" aria-hidden="true" />
          <h2 className="font-aref text-[#c9a84c] text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-[#8b7355]/80 text-sm">ذكريات عطرة</p>
        </motion.div>

        <motion.div
          variants={stagger}
          className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]"
        >
          {photos.map((photo, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              className={`${photo.span} rounded-2xl overflow-hidden border border-[#c9a84c]/15 group relative`}
            >
              <img src={photo.url} alt="" width={photo.w} height={photo.h} className="gallery-img w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#faf8f0]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative py-24 px-6 bg-[#f5f0e1]">
      <div className="absolute inset-0 opacity-[0.03]"
        aria-hidden="true"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&q=30')", backgroundSize: "400px" }}
      />
      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <OrnamentalBorder />
          <div className="mb-8">
            <h3 className="font-aref text-[#c9a84c] text-3xl md:text-4xl mb-1">ليلى</h3>
            <Heart className="w-6 h-6 text-[#c9a84c]/40 mx-auto my-3 fill-[#c9a84c]/15" aria-hidden="true" />
            <h3 className="font-aref text-[#c9a84c] text-3xl md:text-4xl">أحمد</h3>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="font-amiri text-[#6b5a3e]/70 text-base md:text-lg leading-relaxed mb-10 italic">
            ولكم العاقبة في الأفراح والمسرات
          </p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <OrnamentalBorder />
          <p className="font-cairo text-[#8b7355]/60 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel2() {
  return (
    <div dir="rtl" className="min-h-screen bg-[#faf8f0]">
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
