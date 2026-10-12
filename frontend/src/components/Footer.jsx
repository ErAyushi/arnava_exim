import { Link } from "react-router-dom";
import { Mail, MapPin, Globe, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { SITE } from "@/data/site";

const QUICK_LINKS = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Contact", to: "/contact" },
];

export default function Footer() {
  return (
    <footer data-testid="site-footer" className="relative bg-navy text-slate-300 grain">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 pt-16 pb-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo light />
            <p className="mt-5 font-display text-lg font-medium text-white leading-snug">
              {SITE.tagline}
            </p>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              India-based import-export company specializing in psyllium husk and
              related psyllium products for international B2B buyers.
            </p>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              Quick Links
            </h3>
            <ul className="mt-5 space-y-3">
              {QUICK_LINKS.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    data-testid={`footer-link-${l.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                    className="text-sm text-slate-300 transition-colors hover:text-emerald-400"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <span data-testid="footer-address">{SITE.location}</span>
              </li>
              <li>
                <a
                  href={`mailto:${SITE.email}`}
                  data-testid="footer-email-link"
                  className="flex items-center gap-2.5 transition-colors hover:text-emerald-400"
                >
                  <Mail className="h-4 w-4 shrink-0 text-emerald-400" />
                  {SITE.email}
                </a>
              </li>
              <li>
                <a
                  href={SITE.websiteUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-testid="footer-website-link"
                  className="flex items-center gap-2.5 transition-colors hover:text-emerald-400"
                >
                  <Globe className="h-4 w-4 shrink-0 text-emerald-400" />
                  {SITE.website}
                </a>
              </li>
              {SITE.whatsappContacts.map((c, i) => (
                <li key={c.name}>
                  <a
                    href={c.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid={`footer-whatsapp-link-${i + 1}`}
                    className="flex items-center gap-2.5 transition-colors hover:text-emerald-400"
                  >
                    <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                    <span>
                      {c.display} <span className="text-slate-500">· {c.name}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-400">
              Company Information
            </h3>
            <ul className="mt-5 space-y-3 text-sm">
              <li data-testid="footer-iec" className="flex items-center gap-2.5">
                <span className="font-mono text-xs text-slate-400">IEC</span>
                <span className="font-mono text-xs tracking-widest text-white">{SITE.iec}</span>
              </li>
              <li data-testid="footer-msme" className="text-sm">{SITE.msme}</li>
              <li className="text-sm text-slate-400">Ahmedabad · Gujarat · India</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-xs text-slate-500" data-testid="footer-copyright">
            © 2026 Arnava Exim. All Rights Reserved.
          </p>
          <Link
            to="/admin/login"
            data-testid="footer-admin-link"
            className="text-xs text-slate-600 transition-colors hover:text-slate-400"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
