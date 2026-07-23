import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Heart, Gem, Crown, Moon, Flower2, Flame, Mountain } from "lucide-react";
import DigiServicesFooter from "../components/DigiServicesFooter";

const models = [
  {
    id: 1,
    name: "زمردي أنيق",
    nameEn: "Dark Emerald",
    icon: Gem,
    gradient: "from-emerald-900 to-[#0a1210]",
    ring: "ring-emerald-500/30",
    iconColor: "text-emerald-400/50",
    borderColor: "border-emerald-500/15",
    hoverBorder: "hover:border-emerald-400/40",
    bg: "bg-emerald-500/5",
  },
  {
    id: 2,
    name: "ذهبي ملكي",
    nameEn: "Royal Gold",
    icon: Crown,
    gradient: "from-amber-100 to-[#f5f0e1]",
    ring: "ring-amber-400/30",
    iconColor: "text-amber-500/50",
    borderColor: "border-amber-400/15",
    hoverBorder: "hover:border-amber-400/40",
    bg: "bg-amber-500/5",
  },
  {
    id: 3,
    name: "ليلي ساحر",
    nameEn: "Night Floral",
    icon: Moon,
    gradient: "from-purple-950 to-[#060610]",
    ring: "ring-purple-500/30",
    iconColor: "text-purple-400/50",
    borderColor: "border-purple-500/15",
    hoverBorder: "hover:border-purple-400/40",
    bg: "bg-purple-500/5",
  },
  {
    id: 4,
    name: "وردي رومانسي",
    nameEn: "Rose Gold",
    icon: Flower2,
    gradient: "from-rose-950 to-[#140a0e]",
    ring: "ring-rose-400/30",
    iconColor: "text-rose-400/50",
    borderColor: "border-rose-400/15",
    hoverBorder: "hover:border-rose-400/40",
    bg: "bg-rose-500/5",
  },
  {
    id: 5,
    name: "فوانيس مسائية",
    nameEn: "Floating Lanterns",
    icon: Flame,
    gradient: "from-amber-900 to-[#0c0a1a]",
    ring: "ring-amber-500/30",
    iconColor: "text-amber-400/50",
    borderColor: "border-amber-500/15",
    hoverBorder: "hover:border-amber-400/40",
    bg: "bg-amber-500/5",
  },
  {
    id: 6,
    name: "الشفق القطبي",
    nameEn: "Aurora Borealis",
    icon: Mountain,
    gradient: "from-cyan-900 to-[#020615]",
    ring: "ring-cyan-500/30",
    iconColor: "text-cyan-400/50",
    borderColor: "border-cyan-500/15",
    hoverBorder: "hover:border-cyan-400/40",
    bg: "bg-cyan-500/5",
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        <Heart className="w-6 h-6 text-white/10 mx-auto mb-4" aria-hidden="true" />
        <h1 className="font-aref text-white/70 text-2xl sm:text-3xl font-bold mb-2">
          حفل زفاف
        </h1>
        <p className="font-cairo text-white/25 text-xs tracking-wider">
          اختر تصميم الدعوة
        </p>
      </motion.div>

      {/* Model Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl w-full">
        {models.map((model, i) => {
          const Icon = model.icon;
          return (
            <motion.div
              key={model.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 * i, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={`/${model.id}`}
                className={`group block rounded-2xl border ${model.borderColor} ${model.hoverBorder} ${model.bg} backdrop-blur-sm p-6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(0,0,0,0.3)] focus-visible:outline-none focus-visible:ring-2 ${model.ring}`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${model.gradient} border ${model.borderColor} flex items-center justify-center shadow-lg`}>
                    <Icon className={`w-5 h-5 ${model.iconColor}`} />
                  </div>
                  <div>
                    <h2 className="font-aref text-white/60 text-lg font-bold group-hover:text-white/80 transition-colors duration-300">
                      {model.name}
                    </h2>
                    <p className="font-cairo text-white/20 text-[10px] tracking-wider group-hover:text-white/35 transition-colors duration-300">
                      {model.nameEn}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      {/* Footer */}
      <motion.p
        className="mt-12 font-cairo text-white/10 text-[10px] tracking-widest"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
      >
        08 · 08 · 2026
      </motion.p>

      <DigiServicesFooter />
    </div>
  );
}
