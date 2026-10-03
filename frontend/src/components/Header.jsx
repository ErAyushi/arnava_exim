import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";

export const NAV_ITEMS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Quality & Sourcing", to: "/quality-sourcing" },
  { label: "Export Process", to: "/export-process" },
  { label: "Contact", to: "/contact" },
];

const testId = (label) => `nav-link-${label.toLowerCase().replace(/[^a-z]+/g, "-")}`;

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-[0_8px_30px_-12px_rgba(11,25,44,0.15)]"
          : "bg-white/60 backdrop-blur-md border-b border-white/40"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="flex h-[72px] items-center justify-between">
          <Link to="/" aria-label="Arnava Exim home" data-testid="header-logo-link">
            <Logo />
          </Link>

          <nav className="hidden lg:flex items-center gap-7" aria-label="Primary">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                data-testid={testId(item.label)}
                className={({ isActive }) =>
                  `relative text-[13px] font-semibold tracking-wide transition-colors duration-300 ${
                    isActive ? "text-emerald-600" : "text-navy/80 hover:text-navy"
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              data-testid="header-send-inquiry-button"
              className="group hidden sm:inline-flex items-center gap-2 rounded-full bg-navy px-5 py-2.5 text-[13px] font-semibold text-white transition-colors duration-300 hover:bg-emerald-600"
            >
              Send Inquiry
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              data-testid="mobile-menu-toggle"
              onClick={() => setOpen((v) => !v)}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-navy"
              aria-label="Toggle navigation menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden overflow-hidden border-t border-slate-100 bg-white/95 backdrop-blur-xl"
            aria-label="Mobile"
          >
            <div className="px-5 py-4 flex flex-col gap-1">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  data-testid={`mobile-${testId(item.label)}`}
                  className={({ isActive }) =>
                    `rounded-lg px-3 py-3 text-sm font-semibold ${
                      isActive ? "bg-emerald-50 text-emerald-700" : "text-navy/80"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                data-testid="mobile-send-inquiry-button"
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white"
              >
                Send Inquiry <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
