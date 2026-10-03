import { useSearchParams } from "react-router-dom";
import { Globe, Mail, MapPin, MessageCircle } from "lucide-react";
import Seo from "@/components/Seo";
import PageHero from "@/components/PageHero";
import InquiryForm from "@/components/InquiryForm";
import { Eyebrow, Reveal } from "@/components/Reveal";
import { productBySlug } from "@/data/products";
import { SITE } from "@/data/site";

export default function Contact() {
  const [params] = useSearchParams();
  const productParam = params.get("product");
  const product = productParam ? productBySlug(productParam) : null;
  const isSpecRequest = params.get("request") === "spec";

  const defaultProduct = product ? product.name : "";
  const defaultMessage =
    product && isSpecRequest
      ? `Please share the current specification sheet for ${product.name}.`
      : "";

  return (
    <>
      <Seo
        title="Contact | Send a B2B Inquiry — Arnava Exim, Ahmedabad India"
        description="Contact Arnava Exim for psyllium husk export inquiries. Email Sales@arnavaexim.com or send a B2B inquiry with your product, purity, quantity and destination port requirements."
      />
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your requirement."
        description="Send a B2B inquiry and our export team will respond with availability, specifications and a quotation."
      />

      <section className="bg-[#F8FAFC] py-24" data-testid="contact-section">
        <div className="mx-auto grid max-w-7xl items-start gap-10 px-5 lg:grid-cols-5 lg:px-8">
          <div className="space-y-5 lg:col-span-2">
            <Reveal>
              <div className="rounded-2xl bg-navy p-7 grain relative overflow-hidden">
                <h2 className="font-mono text-[10px] uppercase tracking-[0.3em] text-emerald-400">
                  Reach Us Directly
                </h2>
                <ul className="mt-6 space-y-5 text-sm">
                  <li>
                    <a
                      href={`mailto:${SITE.email}`}
                      data-testid="contact-email-cta"
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-navy-950">
                        <Mail className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-400">Email</span>
                        <span className="font-semibold text-white">{SITE.email}</span>
                      </span>
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="contact-whatsapp-cta"
                      className="group flex items-center gap-4"
                    >
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400 transition-colors duration-300 group-hover:bg-emerald-500 group-hover:text-navy-950">
                        <MessageCircle className="h-5 w-5" />
                      </span>
                      <span>
                        <span className="block text-xs text-slate-400">WhatsApp</span>
                        <span className="font-semibold text-white">{SITE.whatsappDisplay}</span>
                        <span className="mt-0.5 block text-[11px] italic text-slate-500">
                          Placeholder number — being updated shortly
                        </span>
                      </span>
                    </a>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                      <MapPin className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-slate-400">Location</span>
                      <span className="font-semibold text-white" data-testid="contact-location">{SITE.location}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-emerald-400">
                      <Globe className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-xs text-slate-400">Website</span>
                      <span className="font-semibold text-white">{SITE.website}</span>
                    </span>
                  </li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white" data-testid="contact-map">
                <iframe
                  title="Arnava Exim location — Ahmedabad, Gujarat, India"
                  src="https://www.google.com/maps?q=Ahmedabad%2C%20Gujarat%2C%20India&output=embed"
                  className="h-72 w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <p className="px-5 py-3 text-xs text-slate-400">
                  Ahmedabad, Gujarat, India — exact address shared on business correspondence.
                </p>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.15} className="lg:col-span-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xl shadow-navy/5 sm:p-9">
              <Eyebrow>B2B Inquiry</Eyebrow>
              <h2 className="mt-3 font-display text-xl font-bold text-navy sm:text-2xl">
                Request a Quote
              </h2>
              <p className="mt-2 text-sm text-slate-500">
                Fields marked * are required. The more detail you share, the more
                precise our quotation.
              </p>
              <div className="mt-7">
                <InquiryForm
                  idPrefix="contact-inquiry"
                  defaultProduct={defaultProduct}
                  defaultMessage={defaultMessage}
                  formType={isSpecRequest ? "spec" : "inquiry"}
                  key={`${defaultProduct}-${isSpecRequest}`}
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
