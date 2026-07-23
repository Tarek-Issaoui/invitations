import { AnimatePresence, motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Calendar,
  ChevronDown,
  Clock,
  Heart,
  MapPin,
  Sparkles,
  Star,
} from "lucide-react";
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

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1 } },
};
const scaleIn = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.7, ease: "easeOut" } },
};
const stagger = {
  visible: { transition: { staggerChildren: 0.18 } },
};

const btnBase = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-current focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-95 transition-all duration-200";

function GoldDivider() {
  return (
    <div className="flex items-center justify-center gap-3 my-6" aria-hidden="true">
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-gold/60" />
      <Sparkles className="w-4 h-4 text-gold animate-pulse-gold" />
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

function FloatingParticle({ delay, left, size }) {
  return (
    <motion.div
      className="absolute rounded-full bg-gold/20 pointer-events-none"
      style={{ left: `${left}%`, width: size, height: size }}
      animate={{ y: [0, -80, 0], opacity: [0, 0.6, 0] }}
      transition={{ duration: 6, repeat: Infinity, delay, ease: "easeInOut" }}
      aria-hidden="true"
    />
  );
}

function HeroSection() {
  const reduced = useReducedMotion();
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const smoothBgY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 150]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothTextY = useSpring(useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]), { stiffness: 100, damping: 30, mass: 1 });
  const smoothOpacity = useSpring(useTransform(scrollYProgress, [0, 0.8], [1, 0]), { stiffness: 100, damping: 30, mass: 1 });

  const particles = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      delay: i * 1.2,
      left: 10 + i * 15,
      size: 3 + (i % 3) * 2,
    })), []
  );

  const scrollToContent = () => {
    heroRef.current?.nextElementSibling?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: smoothBgY }}>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80')" }}
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep/80 via-emerald-deep/60 to-emerald-deep" />
      <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep via-transparent to-emerald-deep/40" />

      {particles.map((p, i) => (
        <FloatingParticle key={i} delay={p.delay} left={p.left} size={p.size} />
      ))}

      <motion.div
        className="relative z-10 text-center px-6 max-w-3xl mx-auto"
        style={{ y: smoothTextY, opacity: smoothOpacity }}
      >
        <motion.div variants={fadeIn} initial="hidden" animate="visible">
          <p className="font-amiri text-gold-light text-lg md:text-xl mb-2 tracking-wide">
            بسم الله الرحمن الرحيم
          </p>
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
          <GoldDivider />
        </motion.div>

        <motion.div variants={fadeUp} initial="hidden" animate="visible" transition={{ delay: 0.5 }}>
          <p className="font-amiri text-ivory/80 text-base md:text-lg leading-relaxed mb-8 italic">
            ﴿ بارك الله لهما وبارك عليهما وجمع بينهما في خير ﴾
          </p>
        </motion.div>

        <motion.div variants={scaleIn} initial="hidden" animate="visible" transition={{ delay: 0.8 }}>
          <div className="relative inline-block">
            <h1 className="font-aref text-gold text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              ياسمين
            </h1>
            <div className="flex items-center justify-center gap-4 my-3">
              <span className="h-px w-8 sm:w-12 bg-gold/40" />
              <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-gold fill-gold/40 animate-pulse" />
              <span className="h-px w-8 sm:w-12 bg-gold/40" />
            </div>
            <h1 className="font-aref text-gold text-4xl sm:text-5xl md:text-7xl font-bold leading-tight drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">
              و عمر
            </h1>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} initial="hidden" animate="visible" transition={{ delay: 1.4 }}>
          <p className="font-cairo text-ivory/60 text-sm mt-6 tracking-wider">
            08 / 08 / 2026
          </p>
        </motion.div>
      </motion.div>

      <motion.button
        onClick={scrollToContent}
        className="absolute bottom-8 inset-x-0 mx-auto w-fit z-10 flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none p-4"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        aria-label="اسحب للأسفل"
      >
        <span className="font-cairo text-ivory/60 text-xs">اسحب للأسفل</span>
        <ChevronDown className="w-5 h-5 text-gold/60" />
      </motion.button>
    </section>
  );
}

function FamilyBanner() {
  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-emerald-deep/95 to-emerald-deep" />
      <div className="absolute inset-0 opacity-5" aria-hidden="true">
        <div
          className="w-full h-full bg-repeat"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518882570513-3f3390b0bad4?w=800&q=40')", backgroundSize: "400px" }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div
          variants={fadeUp}
          className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl p-8 md:p-12 text-center shadow-[0_0_40px_rgba(212,175,55,0.08)]"
        >
          <Star className="w-6 h-6 text-gold mx-auto mb-4 animate-pulse-gold" />
          <p className="font-cairo text-ivory/70 text-sm md:text-base leading-loose">
            يتشرف عائلتا
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 my-4">
            <p className="font-aref text-gold text-xl md:text-2xl">السيد حمادي بوخيشة</p>
            <span className="font-cairo text-ivory/40 hidden sm:inline">&</span>
            <p className="font-aref text-gold text-xl md:text-2xl">السيد محمد لحبيب لاغي</p>
          </div>
          <p className="font-cairo text-ivory/70 text-sm md:text-base leading-loose">
            بدعوتكم لحضور حفل زفاف ابنيهما
          </p>
          <GoldDivider />
          <p className="font-amiri text-gold-light/80 text-lg md:text-xl">ياسمين و عمر</p>
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
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-[#0a1a14] to-emerald-deep" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <Clock className="w-7 h-7 text-gold mx-auto mb-3" />
          <h2 className="font-aref text-gold text-3xl md:text-4xl mb-2">العد التنازلي</h2>
          <p className="font-cairo text-ivory/60 text-sm mb-10">متبقي من حفل الزفاف</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6">
          {units.map((unit) => (
            <motion.div
              key={unit.label}
              variants={scaleIn}
              className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl p-5 md:p-6 shadow-[0_0_30px_rgba(212,175,55,0.06)] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] hover:border-amber-500/30 transition-all duration-500"
            >
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={unit.value}
                  initial={{ y: -20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="block font-aref text-gold text-4xl md:text-5xl font-bold"
                >
                  {String(unit.value).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
              <span className="font-cairo text-ivory/60 text-xs mt-2 block">{unit.label}</span>
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
    const url = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title + " - ياسمين و عمر")}&dates=${start}/${end}&details=${encodeURIComponent(event.venue)}&location=${encodeURIComponent(event.venue)}`;
    window.open(url, "_blank");
  };

  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-emerald-deep/98 to-emerald-deep" />

      <motion.div
        className="relative z-10 max-w-3xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Calendar className="w-7 h-7 text-gold mx-auto mb-3" />
          <h2 className="font-aref text-gold text-3xl md:text-4xl mb-2">برنامج الحفل</h2>
          <p className="font-cairo text-ivory/60 text-sm">مواعيد وأماكن الفعاليات</p>
        </motion.div>

        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              dir="rtl"
              className="bg-black/40 backdrop-blur-md border border-amber-500/20 rounded-3xl p-6 md:p-8 shadow-[0_0_30px_rgba(212,175,55,0.06)] hover:border-amber-500/30 transition-all duration-500"
            >
              <div className="flex items-start gap-4 flex-row-reverse">
                <div className="flex-1 text-right">
                  <h3 className="font-aref text-gold text-2xl md:text-3xl font-bold">{event.title}</h3>
                  <p className="font-cairo text-ivory/50 text-xs mb-3">{event.subtitle}</p>

                  <div className="space-y-1.5 mb-4">
                    <p className="font-cairo text-ivory/70 text-sm flex items-center justify-start gap-2">
                      <Calendar className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                      <span>{event.date}</span>
                    </p>
                    <p className="font-cairo text-ivory/70 text-sm flex items-center justify-start gap-2">
                      <Clock className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                      <span>{event.time}</span>
                    </p>
                    <p className="font-cairo text-ivory/70 text-sm flex items-center justify-start gap-2">
                      <MapPin className="w-3.5 h-3.5 text-gold/60 flex-shrink-0" />
                      <span>{event.venue}</span>
                    </p>
                  </div>

                  <div className="flex items-center justify-end gap-3">
                    <button
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.mapsQuery)}`, "_blank")}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-gold/10 border border-gold/30 text-gold font-cairo text-xs hover:bg-gold/20 hover:border-gold/50 cursor-pointer ${btnBase}`}
                    >
                      <span>الموقع</span>
                      <MapPin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => addToCalendar(event)}
                      className={`flex items-center gap-2 px-5 py-3 min-h-[44px] rounded-xl bg-gold/10 border border-gold/30 text-gold font-cairo text-xs hover:bg-gold/20 hover:border-gold/50 cursor-pointer ${btnBase}`}
                    >
                      <span>التقويم</span>
                      <Calendar className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-gold/10 border border-gold/20 flex items-center justify-center">
                  <span className="font-aref text-gold text-xl font-bold">{i + 1}</span>
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
    { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&q=80", span: "col-span-2 row-span-2", w: 800, h: 600 },
    { url: "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
    { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=600&q=80", span: "col-span-1 row-span-2", w: 600, h: 800 },
    { url: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=600&q=80", span: "col-span-1 row-span-1", w: 600, h: 400 },
  ];

  return (
    <section className="relative py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-emerald-deep via-[#0a1a14] to-emerald-deep" />

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="text-center mb-14">
          <Heart className="w-7 h-7 text-gold mx-auto mb-3" />
          <h2 className="font-aref text-gold text-3xl md:text-4xl mb-2">لقطات من القلب</h2>
          <p className="font-cairo text-ivory/60 text-sm">ذكريات عطرة</p>
        </motion.div>

        <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[220px]">
          {photos.map((photo, i) => (
            <motion.div key={i} variants={scaleIn} className={`${photo.span} rounded-2xl overflow-hidden border border-amber-500/15 group relative`}>
              <img
                src={photo.url}
                alt="صورة من حفل الزفاف"
                width={photo.w}
                height={photo.h}
                className="w-full h-full object-cover gallery-img transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-deep/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 will-change-[opacity]" />
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
      <div className="absolute inset-0 bg-gradient-to-t from-[#050d0a] via-emerald-deep to-emerald-deep" />
      <div className="absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="w-full h-full bg-repeat" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1518882570513-3f3390b0bad4?w=600&q=30')", backgroundSize: "300px" }} />
      </div>

      <motion.div
        className="relative z-10 max-w-2xl mx-auto text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={stagger}
      >
        <motion.div variants={fadeUp}>
          <GoldDivider />
          <div className="mb-6">
            <h3 className="font-aref text-gold text-3xl md:text-4xl mb-1">ياسمين</h3>
            <Heart className="w-5 h-5 text-gold/60 mx-auto my-2 fill-gold/30" />
            <h3 className="font-aref text-gold text-3xl md:text-4xl">عمر</h3>
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <p className="font-amiri text-ivory/60 text-base md:text-lg leading-relaxed mb-8 italic">
            ولكم العاقبة في الأفراح والمسرات
          </p>
        </motion.div>

        <motion.div variants={fadeIn}>
          <div className="flex items-center justify-center gap-3 mb-4" aria-hidden="true">
            <span className="h-px w-20 bg-gradient-to-r from-transparent to-gold/30" />
            <Sparkles className="w-3 h-3 text-gold/40" />
            <span className="h-px w-20 bg-gradient-to-l from-transparent to-gold/30" />
          </div>
          <p className="font-cairo text-ivory/50 text-xs">© 2026 — صنع بكل الحب</p>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function WeddingInvitationModel1() {
  return (
    <div dir="rtl" className="min-h-screen bg-emerald-deep">
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
