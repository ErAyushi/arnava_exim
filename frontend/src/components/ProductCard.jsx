import { Link } from "react-router-dom";
import { FileText, Send } from "lucide-react";
import { Reveal } from "@/components/Reveal";

export default function ProductCard({ product, index = 0 }) {
  return (
    <Reveal delay={index * 0.06} className="h-full">
      <div
        data-testid={`product-card-${product.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-navy/10"
      >
        <Link
          to={`/products/${product.slug}`}
          data-testid={`product-image-link-${product.slug}`}
          className="relative block aspect-[4/3] overflow-hidden bg-slate-100"
        >
          <img
            src={product.image}
            alt={product.alt}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-full bg-navy/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white backdrop-blur">
            {product.badge}
          </span>
        </Link>
        <div className="flex flex-1 flex-col p-5">
          <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-emerald-600">
            {product.tier}
          </span>
          <h3 className="mt-2 font-display text-lg font-bold text-navy">
            <Link to={`/products/${product.slug}`} className="transition-colors hover:text-emerald-700">
              {product.name}
            </Link>
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">{product.short}</p>
          <div className="mt-auto flex gap-2 pt-5">
            <Link
              to={`/products/${product.slug}`}
              data-testid={`request-spec-button-${product.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full border border-navy/20 px-3 py-2.5 text-xs font-semibold text-navy transition-colors duration-300 hover:border-navy hover:bg-navy hover:text-white"
            >
              <FileText className="h-3.5 w-3.5" />
              Request Specification
            </Link>
            <Link
              to={`/contact?product=${product.slug}`}
              data-testid={`send-inquiry-button-${product.slug}`}
              className="inline-flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy px-3 py-2.5 text-xs font-semibold text-white transition-colors duration-300 hover:bg-emerald-600"
            >
              <Send className="h-3.5 w-3.5" />
              Send Inquiry
            </Link>
          </div>
        </div>
      </div>
    </Reveal>
  );
}
