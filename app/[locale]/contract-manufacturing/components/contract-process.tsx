"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { ScrollReveal } from "@/components/scroll-reveal";

interface ProcessStepData {
  num: string;
  title: string;
  desc: string;
}

const ContractProcess: React.FC = () => {
  const t = useTranslations("ContractManufacturing.process");
  const steps = t.raw("steps") as ProcessStepData[];

  return (
    <section className="bg-secondary dark:bg-[#0c0c0c] py-22 overflow-hidden border-t border-[var(--border-color,#e8e2d8)] dark:border-white/5">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12 w-full">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("tag")}
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white text-center">
            {t("title")}<span className="text-brand">{t("titleAccent")}</span>
          </h2>
          <p className="text-[15px] text-text-muted dark:text-white/50 mt-3 font-light leading-[1.75] text-center">
            {t("sub")}
          </p>
        </ScrollReveal>

        {/* Process Steps List Container */}
        <div className="relative flex flex-col md:grid md:grid-cols-5 gap-8 md:gap-0 mt-14">
          
          {/* Horizontal Connecting Line (Only visible on Desktop md screens and above) */}
          <div 
            className="hidden md:block absolute top-[36px] left-[10%] right-[10%] h-[1px] text-[var(--border-color,#e8e2d8)] dark:text-white/10 z-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, currentColor 0, currentColor 12px, transparent 12px, transparent 26px)" }}
          />

          {/* Vertical Connecting Line (Only visible on Mobile screens) */}
          <div 
            className="block md:hidden absolute left-[36px] top-6 bottom-6 w-[1px] text-[var(--border-color,#e8e2d8)] dark:text-white/10 z-0 pointer-events-none"
            style={{ backgroundImage: "repeating-linear-gradient(180deg, currentColor 0, currentColor 12px, transparent 12px, transparent 26px)" }}
          />

          {steps.map((step, idx) => {
            const staggerDelay = 0.1 * idx;
            
            return (
              <ScrollReveal
                key={step.num}
                delay={staggerDelay}
                className="group relative z-10 flex flex-row md:flex-col items-center md:items-stretch gap-6 md:gap-0 text-left md:text-center cursor-pointer"
              >
                {/* Step Circle Indicator (72px) */}
                <div 
                  className="w-[72px] h-[72px] rounded-full flex flex-col items-center justify-center flex-shrink-0 transition-all duration-300 bg-white dark:bg-[#0c0c0c] border border-[var(--border-color,#e8e2d8)] dark:border-white/10 text-text-muted dark:text-white/40 group-hover:bg-brand group-hover:border-brand group-hover:text-white group-hover:shadow-[0_0_0_8px_rgba(255,71,18,0.12)]"
                  style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                  <span className="font-sans text-[12px] font-black tracking-wider leading-none">
                    {step.num}
                  </span>
                </div>

                {/* Step Content */}
                <div className="flex-1 md:mt-5 text-left md:text-center">
                  <h3 className="font-sans text-[13px] font-extrabold mb-1.5 text-header-text dark:text-white transition-colors duration-300 group-hover:text-brand">
                    {step.title}
                  </h3>
                  <p className="text-[11.5px] leading-relaxed max-w-full md:max-w-[150px] mx-auto font-light text-text-muted dark:text-white/40 transition-colors duration-300 group-hover:text-text-muted/90 dark:group-hover:text-white/70">
                    {step.desc}
                  </p>
                </div>
              </ScrollReveal>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default ContractProcess;
