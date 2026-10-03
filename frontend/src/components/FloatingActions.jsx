import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle } from "lucide-react";
import { SITE } from "@/data/site";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a
        href={SITE.whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        data-testid="whatsapp-float-button"
        aria-label="Chat with Arnava Exim on WhatsApp"
        className="fixed bottom-6 left-6 z-40 group"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping [animation-duration:2.4s]" />
        <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
          <MessageCircle className="h-5 w-5" />
        </span>
      </a>

      <AnimatePresence>
        {showTop && (
          <motion.button
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            data-testid="back-to-top-button"
            aria-label="Back to top"
            onClick={() =>
              window.__lenis
                ? window.__lenis.scrollTo(0, { duration: 1.2 })
                : window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-lg shadow-navy/30 transition-colors duration-300 hover:bg-emerald-600"
          >
            <ArrowUp className="h-5 w-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
