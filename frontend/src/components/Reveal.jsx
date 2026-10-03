import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 28, className }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.7, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const MaskedLine = ({ children, delay = 0, className }) => (
  <span className={`block overflow-hidden ${className || ""}`}>
    <motion.span
      className="block"
      initial={{ y: "110%" }}
      animate={{ y: 0 }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.span>
  </span>
);

export const Eyebrow = ({ children, light = false }) => (
  <span
    className={`inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.32em] ${
      light ? "text-emerald-400" : "text-emerald-600"
    }`}
  >
    <span className="h-px w-8 bg-emerald-500" />
    {children}
  </span>
);
