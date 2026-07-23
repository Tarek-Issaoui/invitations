import { Phone, Mail, ExternalLink } from "lucide-react";

export default function DigiServicesFooter() {
  return (
    <div className="relative py-12 px-6 border-t border-white/5">
      <div className="max-w-2xl mx-auto text-center">
        <p className="font-cairo text-white/20 text-xs mb-4">صُنع بواسطة</p>
        <p className="font-aref text-white/40 text-lg font-bold mb-5">DigiServices</p>

        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* WhatsApp / Call */}
          <a
            href="https://wa.me/21658851008"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/35 hover:text-white/60 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-cairo text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="WhatsApp"
          >
            <Phone className="w-3 h-3" />
            <span dir="ltr">+216 58 851 008</span>
          </a>

          {/* Email */}
          <a
            href="mailto:digiservices852@gmail.com"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/35 hover:text-white/60 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-cairo text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Email"
          >
            <Mail className="w-3 h-3" />
            <span>digiservices852@gmail.com</span>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com/share/1F1G54RwHm/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/35 hover:text-white/60 hover:bg-white/10 hover:border-white/20 transition-all duration-300 font-cairo text-[10px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            aria-label="Facebook"
          >
            <ExternalLink className="w-3 h-3" />
            <span>Facebook</span>
          </a>
        </div>
      </div>
    </div>
  );
}
