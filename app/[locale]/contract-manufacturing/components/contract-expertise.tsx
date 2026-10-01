"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ScrollReveal } from "@/components/scroll-reveal";

interface SegmentData {
  title: string;
  desc: string;
}

interface ProductDetail {
  image: string;
  capabilities: string[];
}

const segmentDetails: Record<"en" | "de", ProductDetail[]> = {
  en: [
    {
      image: "/product-img/Model 4 Drama 1.jpg",
      capabilities: [
        "Vacuum thermoforming dental resins customized for ultra-high temperature resistance and high rigid strength.",
        "Custom shrinkage & dimensional accuracy optimization matching specific projection engine wavelengths.",
        "Custom packaging options (1kg / 5kg / 25kg UN-rated packaging) with global compliance.",
      ],
    },
    {
      image: "/product-img/Jewellery Contract mfg.png",
      capabilities: [
        "Highly precise zero-ash direct casting photopolymers with optimized melt flow profiles.",
        "High-definition detail capture with low-viscosity resins tailored for fast printing speeds.",
        "Advanced validation with major display/DLP engine systems (385nm & 405nm).",
      ],
    },
    {
      image: "/product-img/Engineering Resins.png",
      capabilities: [
        "High impact, high tensile, and functional engineering grade photopolymer formulations.",
        "Tailored mechanical property adjustment (Elongation at break, Izod impact, Heat deflection temp).",
        "Expert raw material supply security with active formulation scale-up validation.",
      ],
    },
  ],
  de: [
    {
      image: "/product-img/Model 4 Drama 1.jpg",
      capabilities: [
        "Vakuum-Tiefziehhartze, maßgeschneidert für ultrahohe Temperaturbeständigkeit und hohe Festigkeit.",
        "Individuelle Optimierung der Schrumpfung und Maßgenauigkeit für spezifische Wellenlängen.",
        "Kundenspezifische Verpackungsoptionen (1 kg / 5 kg / 25 kg UN-zertifiziert) mit globaler Konformität.",
      ],
    },
    {
      image: "/product-img/Jewellery Contract mfg.png",
      capabilities: [
        "Hochpräzise, aschefreie direkt ausbrennbare Photopolymere mit optimiertem Schmelzflussprofil.",
        "Hochauflösende Detailerfassung mit niedrigviskosen Harzen für schnelle Druckgeschwindigkeiten.",
        "Fortgeschrittene Validierung mit gängigen Belichtungs- und DLP-Systemen (385 nm & 405 nm).",
      ],
    },
    {
      image: "/product-img/Engineering Resins.png",
      capabilities: [
        "Schlagfeste, hochfeste und funktionale Photopolymer-Formulierungen in Industriequalität.",
        "Maßgeschneiderte Anpassung mechanischer Eigenschaften (Reißdehnung, Kerbschlagzähigkeit, Wärmeformbeständigkeit).",
        "Zuverlässige Rohstoffsicherung mit aktiver Validierung der Formulierungsskalierung.",
      ],
    },
  ],
};

const ContractExpertise: React.FC = () => {
  const t = useTranslations("ContractManufacturing.expertise");
  const params = useParams();
  const locale = params?.locale || "en";

  const [activeIdx, setActiveIdx] = useState(0);

  const segments = t.raw("segments") as SegmentData[];
  const currentDetails =
    segmentDetails[locale as "en" | "de"] || segmentDetails.en;
  const activeDetail = currentDetails[activeIdx] || currentDetails[0];

  return (
    <section className="bg-secondary dark:bg-[#141210] py-22 text-[#1a1714] dark:text-white transition-colors duration-200">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-left mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("tag")}
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white">
            {t("title")}
            <span className="text-brand">{t("titleAccent")}</span>
          </h2>
          <p className="text-[15px] text-text-muted dark:text-white/48 mt-3 font-light leading-[1.75] max-w-[540px]">
            {t("sub")}
          </p>
        </ScrollReveal>

        {/* Expertise Grid Box */}
        <ScrollReveal
          delay={0.25}
          className="grid grid-cols-1 lg:grid-cols-2 border border-[#e8e2d8] dark:border-[#2e2924] rounded-xl overflow-hidden shadow-xl"
        >
          {/* Left Column */}
          <div className="bg-secondary dark:bg-[#141210] p-8 md:p-14 flex flex-col justify-center text-left">
            <div className="mb-5">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
                {t("left.tag")}
              </div>
              <h3 className="font-sans text-[28px] font-black leading-[1.1] text-header-text dark:text-white">
                {t("left.title")}
                <br />
                <span className="text-brand">{t("left.titleAccent")}</span>
              </h3>
            </div>

            <p className="text-[14px] text-text-muted dark:text-white/50 font-light leading-[1.78] mb-7">
              {t("left.body")}
            </p>

            <div className="space-y-3.5">
              {segments.map((seg, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIdx(idx)}
                    className={`w-full flex items-center gap-4.5 p-3.5 px-4 rounded-lg text-left transition-all duration-200 cursor-pointer ${
                      isActive
                        ? "bg-white dark:bg-white/[0.08] border border-[#ff4712]/40 shadow-[0_4px_20px_rgba(255,71,18,0.06)] dark:shadow-[0_4px_20px_rgba(255,71,18,0.1)]"
                        : "bg-primary/50 dark:bg-white/[0.04] border border-[#e8e2d8] dark:border-white/[0.05] opacity-70 hover:opacity-100 hover:bg-primary/70 dark:hover:bg-white/[0.05]"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 transition-all duration-200 ${
                        isActive
                          ? "bg-brand ring-2 ring-brand/30 ring-offset-2 ring-offset-transparent"
                          : "bg-brand/40"
                      }`}
                    />
                    <div>
                      <h4 className="font-sans text-[13px] font-semibold text-[#1a1714] dark:text-white">
                        {seg.title}
                      </h4>
                      <p className="text-[11.5px] text-[#8a8070] dark:text-white/42 mt-0.5 font-light">
                        {seg.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column */}
          <div className="bg-primary/50 dark:bg-[#1c1a16] flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#e8e2d8] dark:border-[#2e2924]">
            {/* Header Image */}
            <div className="h-[280px] overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeIdx}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  src={activeDetail.image}
                  alt={segments[activeIdx]?.title || "Capabilities"}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#f2f2f3]/20 to-[#f2f2f3] dark:via-[#1c1a16]/20 dark:to-[#1c1a16] pointer-events-none" />
            </div>

            {/* Capabilities List */}
            <div className="p-9 md:p-12 pt-6 flex-1 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
                {t("right.tag")}
              </div>

              <div className="min-h-[200px] flex flex-col justify-start">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="space-y-3.5"
                  >
                    {activeDetail.capabilities.map((cap, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand flex-shrink-0 mt-2" />
                        <p className="text-[13px] text-[#5c564f] dark:text-white/55 font-light leading-relaxed">
                          {cap}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContractExpertise;
