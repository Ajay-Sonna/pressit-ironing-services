import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

const steps = [
  { key: "pickup", title: "Laundry Pickup", subtitle: "We come to you", description: "Schedule a pickup at your convenience. We ring the doorbell, collect your garments and tag each item for care." },
  { key: "ironing", title: "Professional Ironing", subtitle: "Care & craft", description: "Our pros treat each fabric with the right temperature and technique so your clothes return crisp and cared-for." },
  { key: "delivery", title: "Fast Delivery", subtitle: "Back to your door", description: "We fold, bag and deliver on time. Open your door to fresh-smelling, ready-to-wear clothes." },
];

const cardVariants = {
  offscreen: { opacity: 0, y: 28, scale: 0.98 },
  onscreen: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: "easeOut" } },
};

function StepGraphic({ type, active, reduced }) {
  const icons = { pickup: "mdi:truck-delivery", ironing: "mdi:iron", delivery: "mdi:package-variant-closed" };
  const icon = icons[type] ?? "mdi:information";

  return (
    <div className="relative w-24 h-24 flex items-start justify-start">
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 84,
          height: 84,
          left: -8,
          top: -8,
          background: "linear-gradient(135deg, #06b6d4 0%, #7c3aed 40%, #facc15 80%)",
          filter: "blur(18px)",
          opacity: 0.95,
        }}
        animate={active && !reduced ? { scale: [1, 1.08, 1], rotate: [0, 8, 0] } : {}}
        transition={{ duration: 2.2, repeat: active && !reduced ? Infinity : 0, ease: "easeInOut" }}
        aria-hidden
      />
      <div className="relative z-10 pl-1 pt-1">
        <Icon icon={icon} width="48" height="48" className="text-white drop-shadow-md" />
      </div>
    </div>
  );
}

export default function HowItWorks() {
  const containerRef = useRef(null);
  const refs = useRef([]);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const setRefAt = (i) => (el) => {
    refs.current[i] = el || null;
  };

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mq?.matches ?? false);
    update();
    mq?.addEventListener?.("change", update);
    return () => mq?.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    let rafId = 0;

    const computeActive = () => {
      if (!refs.current.length) return;
      const viewportCenter = window.innerHeight / 2;
      let bestIndex = 0;
      let bestDist = Infinity;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < bestDist) {
          bestDist = dist;
          bestIndex = i;
        }
      });
      if (activeRef.current !== bestIndex) {
        activeRef.current = bestIndex;
        setActive(bestIndex);
      }
    };

    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(computeActive);
    };

    window.addEventListener("scroll", handler, { passive: true });
    window.addEventListener("resize", handler, { passive: true });

    handler();

    return () => {
      window.removeEventListener("scroll", handler);
      window.removeEventListener("resize", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const progressPct = steps.length > 1 ? (active / (steps.length - 1)) * 100 : 100;
  const reduced = prefersReducedMotion;

  return (
    <section ref={containerRef} aria-labelledby="howitworks" className="relative py-10 bg-gradient-to-b from-slate-50 via-cyan-50 to-yellow-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <h2 id="howitworks" className="text-4xl font-extrabold text-center mb-6">How it works — A simple story</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          From your doorstep to a fresh closet — three steps that turn laundry into a delightful routine.
        </p>

        <div className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Sticky sidebar */}
          <aside className="md:col-span-3 hidden md:block sticky top-28 self-start">
            <div className="p-6 rounded-xl shadow-md bg-gradient-to-br from-teal-100 via-cyan-100 to-violet-100">
              <h3 className="text-lg font-semibold text-teal-700">Our story</h3>
              <p className="mt-2 text-sm text-teal-600">{steps[active].subtitle}</p>
              <div className="mt-6">
                <span className="text-sm text-teal-500">Step</span>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-teal-700">{String(active + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-teal-500">of {steps.length}</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Cards */}
          <div className="md:col-span-9 relative">
            {/* Progress line */}
            <div className="hidden md:block absolute left-6 top-6 bottom-6 w-0.5 bg-gray-200" aria-hidden="true" />
            <motion.div
              aria-hidden
              className="hidden md:block absolute left-6 top-6 w-0.5 origin-top"
              style={{ background: "linear-gradient(to bottom, #06b6d4, #7c3aed)" }}
              animate={{ height: `${progressPct}%` }}
              transition={{ duration: reduced ? 0 : 0.45, ease: "easeOut" }}
            />

            {/* Desktop & mobile cards */}
            <div className="space-y-8 md:space-y-0 md:space-x-0 md:grid md:grid-cols-1 md:gap-8">
              {steps.map((step, i) => (
                <motion.article
                  key={step.key}
                  ref={setRefAt(i)}
                  className="relative md:grid md:grid-cols-12 md:items-start md:gap-6"
                  initial="offscreen"
                  whileInView="onscreen"
                  viewport={{ once: false, amount: 0.35 }}
                  variants={cardVariants}
                  tabIndex={0}
                  aria-labelledby={`step-${i}`}
                >
                  {/* Step marker */}
                  <div className="hidden md:flex md:col-span-1 items-start justify-center relative">
                    <div className="h-4 w-4 rounded-full bg-white border-4 border-gray-200 shadow-sm -translate-x-1/2" style={{ left: 24 }} />
                    <div className={`absolute -left-6 top-0 w-3 h-3 rounded-full transition-colors ${active === i ? "bg-teal-400" : "bg-gray-300"}`} />
                  </div>

                  {/* Step icon */}
                  <div className="md:col-span-2 flex items-start">
                    <div className="pl-2">
                      <StepGraphic type={step.key} active={active === i} reduced={reduced} />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="md:col-span-9">
                    <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 border-2 border-transparent hover:border-gradient-to-r
                    bg-gradient-to-br from-white via-cyan-50 to-yellow-50">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <h4 id={`step-${i}`} className="text-xl font-semibold">{step.title}</h4>
                          <p className="text-sm text-gray-500 mt-1">{step.subtitle}</p>
                        </div>
                      </div>
                      <p className="mt-4 text-gray-600">{step.description}</p>

                      <div className="mt-4 flex items-center justify-between">
                        <span className="text-sm text-gray-500">Estimated turn-around: 24-48 hrs</span>
                        <button className="inline-flex items-center px-3 py-1.5 bg-teal-500 text-white rounded-md text-sm hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200">
                          Learn more
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Mobile horizontal scroll */}
            <div className="md:hidden mt-6 overflow-x-auto flex gap-6 snap-x snap-mandatory">
              {steps.map((step, i) => (
                <div key={step.key} className="min-w-[80%] snap-center flex-shrink-0">
                  <div className="p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow transform hover:-translate-y-2 border-2 border-transparent hover:border-gradient-to-r
                  bg-gradient-to-br from-white via-cyan-50 to-yellow-50">
                    <StepGraphic type={step.key} active={active === i} reduced={reduced} />
                    <h4 className="text-xl font-semibold mt-2">{step.title}</h4>
                    <p className="text-sm text-gray-500">{step.subtitle}</p>
                    <p className="mt-2 text-gray-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA button */}
        <div className="mt-12 text-center">
          <a
            href="#book"
            className="inline-block px-8 py-3 bg-teal-500 text-white rounded-full font-semibold shadow-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-200"
          >
            Book a Pickup — It's Easy
          </a>
        </div>
      </div>
    </section>
  );
}
