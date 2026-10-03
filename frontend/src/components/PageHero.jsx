import { Eyebrow, MaskedLine } from "@/components/Reveal";

export default function PageHero({ eyebrow, title, description, image }) {
  return (
    <section className="grain relative overflow-hidden bg-navy pb-20 pt-40">
      {image && (
        <>
          <img
            src={image}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40" />
        </>
      )}
      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <MaskedLine>
          <Eyebrow light>{eyebrow}</Eyebrow>
        </MaskedLine>
        <h1 className="mt-5 font-display text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          <MaskedLine delay={0.1}>{title}</MaskedLine>
        </h1>
        {description && (
          <MaskedLine delay={0.22}>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-slate-300 md:text-lg">
              {description}
            </p>
          </MaskedLine>
        )}
      </div>
    </section>
  );
}
