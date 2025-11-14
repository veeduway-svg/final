import { useEffect, useRef } from "react";
import { useProblemModal } from "@/contexts/ProblemModalProvider";

const Hero = () => {
  const { open } = useProblemModal();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const prefersReduced =
      window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      sectionRef.current.classList.add("is-inview");
      return;
    }

    const el = sectionRef.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-inview");
        } else {
          el.classList.remove("is-inview");
        }
      },
      { root: null, threshold: 0.35 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-[#E9F1FF] via-[#F8FAFC] to-[#F8FAFC] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,#0074D915_0%,transparent_55%)]" />

      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center px-6">
        <div>
          <h1 className="bg-gradient-to-b from-slate-900 to-slate-700 bg-clip-text text-transparent text-4xl md:text-6xl font-extrabold leading-tight">
            Build your home without the stress, scams, or confusion.
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-700 max-w-2xl">
            Get a clear, step-by-step guide to navigate Tamil Nadu's home construction process — from permits to move-in, stress-free.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={() => open()}
              className="btn-glow bg-[#0074D9] hover:bg-[#005BB5] text-white rounded-full px-6 py-3 font-semibold shadow-[0_0_0_4px_#0074D920] hover:shadow-[0_0_0_6px_#0074D940] transition"
            >
              Get Your Free Guideline
            </button>
            <span className="text-sm text-slate-500">No spam. Curated by experts.</span>
          </div>
        </div>

        <figure className="relative hero-figure">
          <div className="absolute -inset-4 md:-inset-6 rounded-3xl bg-white/40 blur-2xl opacity-60 pointer-events-none" />
          <div
            aria-hidden="true"
            className="
              blueprint-overlay pointer-events-none absolute inset-0 rounded-3xl
              bg-[url('/patterns/blueprint.svg')]
              bg-center bg-cover opacity-0
            "
          />
          <img
            src="/Whisk_7e0f6495b6e4b88a6e44dfa569b50171dr (1).jpeg"
            alt="Happy family receiving house keys in front of their new home"
            className="relative z-[1] w-full h-auto rounded-3xl shadow-2xl ring-1 ring-blue-100 object-cover"
            loading="eager"
            decoding="async"
            sizes="(min-width: 1024px) 560px, (min-width: 768px) 48vw, 100vw"
          />
          <figcaption className="sr-only">
            VeeduWay guides first-time homeowners through approvals to move-in with clarity.
          </figcaption>
        </figure>
      </div>
    </section>
  );
};

export default Hero;
