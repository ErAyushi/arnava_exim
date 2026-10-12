import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight, Check, FileText, Send } from "lucide-react";
import Seo from "@/components/Seo";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { useProducts } from "@/hooks/useProducts";

const specRows = (product) => [
  ["Origin", "India"],
  ["Purity", product.purity || "As per buyer requirement"],
  ["Mesh", "Subject to buyer requirement"],
  ["Moisture", "As per agreed specification — shared on inquiry"],
  ["Ash", "As per agreed specification — shared on inquiry"],
  ["Foreign Matter", "As per agreed specification — shared on inquiry"],
  ["Packaging", "Subject to buyer requirement"],
  ["Shelf Life", "Available upon inquiry"],
  ["Certifications / Documentation", "Provided per product, supplier and destination country requirements"],
  ["Minimum Order Quantity", "Available upon inquiry"],
  ["Custom Specifications", "Available — share your specification sheet"],
];

export default function ProductDetail() {
  const { slug } = useParams();
  const { products, loading } = useProducts();
  const product = products.find((p) => p.slug === slug);

  if (!loading && !product) return <Navigate to="/products" replace />;
  if (!product) {
    return <div className="min-h-screen bg-[#F8FAFC]" data-testid="product-detail-loading" />;
  }

  const others = products.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <Seo
        title={`${product.name} | Psyllium Husk Supplier India — Arnava Exim`}
        description={`${product.name} exported from India by Arnava Exim. ${product.short} Specifications as per buyer requirement.`}
      />

      <section className="bg-navy pb-14 pt-36 grain relative overflow-hidden" data-testid="product-detail-hero">
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <Link
            to="/products"
            data-testid="back-to-products-link"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-slate-400 transition-colors hover:text-emerald-400"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-1" />
            All Products
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <h1 className="font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {product.name}
            </h1>
            {product.badge && (
              <span className="rounded-full bg-emerald-500/15 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-emerald-400">
                {product.badge}
              </span>
            )}
          </div>
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-16">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-5 lg:px-8">
          <Reveal className="lg:col-span-2">
            <div className="lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-navy/5">
                <img
                  src={product.image}
                  alt={product.alt || product.name}
                  className="aspect-[4/3] w-full object-cover"
                  data-testid="product-detail-image"
                />
              </div>
              <div className="mt-5 flex flex-col gap-3">
                <Link
                  to={`/contact?product=${product.slug}`}
                  data-testid="detail-send-inquiry-button"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-300 hover:bg-emerald-600"
                >
                  <Send className="h-4 w-4" /> Send Inquiry
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
                <Link
                  to={`/contact?product=${product.slug}&request=spec`}
                  data-testid="detail-request-spec-button"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-navy/20 bg-white px-7 py-3.5 text-sm font-semibold text-navy transition-colors duration-300 hover:border-navy"
                >
                  <FileText className="h-4 w-4" /> Request Specification Sheet
                </Link>
              </div>
            </div>
          </Reveal>

          <div className="lg:col-span-3">
            <Reveal>
              {product.tier && (
                <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-emerald-600">
                  {product.tier}
                </span>
              )}
              <p className="mt-4 text-base leading-relaxed text-slate-600 md:text-lg">
                {product.description}
              </p>
              {product.points && product.points.length > 0 && (
                <ul className="mt-6 space-y-2.5">
                  {product.points.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5 text-sm text-slate-700">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </Reveal>

            <Reveal delay={0.1}>
              <h2 className="mt-12 font-display text-xl font-bold text-navy">
                Specification Overview
              </h2>
              <div className="mt-5 overflow-hidden rounded-2xl border border-slate-200 bg-white" data-testid="product-spec-table">
                <table className="w-full text-left text-sm">
                  <tbody>
                    {specRows(product).map(([k, v], i) => (
                      <tr key={k} className={i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}>
                        <th className="w-2/5 px-5 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-slate-500">
                          {k}
                        </th>
                        <td className="px-5 py-3.5 font-semibold text-navy">{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-xs leading-relaxed text-slate-400">
                Exact specifications vary by lot and buyer requirement. Please
                request the current specification sheet before order confirmation.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20" data-testid="related-products-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-bold tracking-tight text-navy sm:text-3xl">
              More from the collection
            </h2>
          </Reveal>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
