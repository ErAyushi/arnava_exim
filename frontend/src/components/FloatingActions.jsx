import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageCircle, X } from "lucide-react";
import { SITE } from "@/data/site";
import { useProducts } from "@/hooks/useProducts";

export default function FloatingActions() {
  const [showTop, setShowTop] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const { pathname } = useLocation();
  const { products } = useProducts();

  const message = useMemo(() => {
    const m = pathname.match(/^\/products\/([^/]+)/);
    const product = m ? products.find((p) => p.slug === m[1]) : null;
    return product
      ? `Hello Arnava Exim, I'm interested in ${product.name}. Please share the specification and pricing.`
      : "Hello Arnava Exim, I'd like to discuss a product requirement.";
  }, [pathname, products]);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setPickerOpen(false), [pathname]);

  return (
    <>
      <div className="fixed bottom-6 left-6 z-40">
        <AnimatePresence>
          {pickerOpen && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.96 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              data-testid="whatsapp-picker"
              className="absolute bottom-16 left-0 w-72 rounded-2xl border border-slate-200 bg-white p-4 shadow-2xl shadow-navy/20"
            >
              <div className="flex items-center justify-between">
                <p className="font-display text-sm font-bold text-navy">Chat with our export team</p>
                <button
                  onClick={() => setPickerOpen(false)}
                  data-testid="whatsapp-picker-close"
                  aria-label="Close chat picker"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-slate-400 transition-colors hover:bg-slate-100 hover:text-navy"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1 text-xs text-slate-500">Choose who you'd like to message:</p>
              <div className="mt-3 space-y-2">
                {SITE.whatsappContacts.map((c) => (
                  <a
                    key={c.name}
                    href={`${c.link}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`whatsapp-contact-${c.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-colors duration-300 hover:border-emerald-500 hover:bg-emerald-50"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                      <MessageCircle className="h-4 w-4" />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy">{c.name}</span>
                      <span className="block font-mono text-[11px] text-slate-500">{c.display}</span>
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setPickerOpen((v) => !v)}
          data-testid="whatsapp-float-button"
          aria-label="Chat with Arnava Exim on WhatsApp"
          className="group relative block"
        >
          <span className="absolute inset-0 rounded-full bg-emerald-500/40 animate-ping [animation-duration:2.4s]" />
          <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition-transform duration-300 group-hover:scale-110">
            <MessageCircle className="h-5 w-5" />
          </span>
        </button>
      </div>

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
