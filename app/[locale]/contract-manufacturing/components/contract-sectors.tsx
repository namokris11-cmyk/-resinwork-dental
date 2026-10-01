"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import { ScrollReveal } from "@/components/scroll-reveal";

interface SectorCardData {
  num: string;
  title: string;
  desc: string;
}

const ContractSectors: React.FC = () => {
  const t = useTranslations("ContractManufacturing.sectors");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const cards = t.raw("list") as SectorCardData[];

  const bgImages = [
    "/product-img/Model 4 Drama 1.jpg",
    "/product-img/Jewellery Contract mfg.png",
    "/product-img/Engineering Resins.png",
  ];

  return (
    <section className="bg-primary dark:bg-[#0c0c0c] py-22 overflow-hidden">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12">
        {/* Section Header */}
        <ScrollReveal className="text-left mb-10">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("tag")}
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white">
            {t("title")}
            <br />
            <span className="text-brand">{t("titleAccent")}</span>
          </h2>
          <p className="text-[15px] text-text-muted dark:text-white/50 mt-3 font-light leading-[1.75]">
            {t("sub")}
          </p>
        </ScrollReveal>

        {/* Sectors Dynamic Carousel */}
        <ScrollReveal delay={0.2} direction="none">
          <div
            className="flex flex-col md:flex-row gap-4 min-h-[300px] md:h-[480px] w-full"
            onMouseLeave={() => setHoveredIdx(null)}
          >
            {cards.map((card, idx) => {
              const isHovered = hoveredIdx === idx;
              const isSomeHovered = hoveredIdx !== null;

              // Calculate flex values
              let flexValue = 1;
              if (isSomeHovered) {
                flexValue = isHovered ? 2.1 : 0.45;
              }

              return (
                <motion.div
                  key={idx}
                  layout
                  onMouseEnter={() => setHoveredIdx(idx)}
                  animate={{
                    flex: flexValue,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 150,
                    damping: 20,
                    mass: 0.8,
                  }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer shadow-lg min-h-[320px] md:min-h-0 flex flex-col justify-end p-6 md:p-8"
                >
                  {/* Background Zoom Image */}
                  <motion.div
                    animate={{
                      scale: isHovered ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className={`absolute inset-0 bg-cover bg-center`}
                    style={{
                      backgroundImage: `url("${bgImages[idx]}")`,
                    }}
                  />

                  {/* Gradients overlays */}
                  <motion.div
                    animate={{
                      opacity: isHovered ? 0.95 : 0.85,
                    }}
                    className="absolute inset-0 bg-gradient-to-t from-[#141210] via-[#141210]/30 to-transparent pointer-events-none"
                  />

                  {/* Card Content */}
                  <div className="relative z-10 text-left w-[260px] md:w-[280px]">
                    <div className="text-[9.5px] font-bold tracking-[0.14em] text-brand/90 mb-1.5 uppercase">
                      {card.num}
                    </div>

                    <div
                      className={`overflow-hidden transition-all ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        !isSomeHovered || isHovered
                          ? "max-h-[220px] opacity-100 duration-500 delay-150"
                          : "max-h-0 opacity-0 duration-100 delay-0"
                      }`}
                    >
                      <h3 className="font-sans text-xl font-black text-white tracking-tight leading-snug">
                        {card.title}
                      </h3>
                      <p className="text-[12px] text-white/60 font-light leading-relaxed mt-2">
                        {card.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom Border Accent Line */}
                  <motion.div
                    animate={{
                      scaleX: isHovered ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute bottom-0 inset-x-0 h-[3px] bg-brand origin-left"
                  />
                </motion.div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContractSectors;
