import { Info } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import ProductCard from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { PRODUCTS } from "@/data/products";

export default function Products() {
  return (
    <>
      <Seo
        title="Psyllium Products | Psyllium Husk 95% & 99% Exporter India — Arnava Exim"
        description="Psyllium husk, psyllium husk powder, psyllium husk 95% and 99% purity grades exported from India by Arnava Exim. Specifications as per buyer requirement."
      />
      <PageHero
        eyebrow="Products"
        title="The Psyllium Collection"
        description="Psyllium husk and psyllium husk powder in commercial and high-purity grades — sourced and supplied according to buyer requirements."
      />

      <section className="bg-[#F8FAFC] py-20" data-testid="products-catalogue-section">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <Reveal>
            <div
              data-testid="spec-note-banner"
              className="mb-10 flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-5"
            >
              <Info className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
              <p className="text-sm leading-relaxed text-emerald-900">
                Product specifications vary by buyer requirement. Purity, mesh,
                moisture, packaging and documentation are confirmed against your
                specification before order finalization — request the current
                specification sheet for any product below.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS.map((p, i) => (
              <ProductCard key={p.slug} product={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
