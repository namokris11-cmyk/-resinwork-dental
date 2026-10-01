"use client";

import React from "react";
import { useTranslations } from "next-intl";

import { ScrollReveal } from "@/components/scroll-reveal";

interface DifferentiatorRowData {
  num: string;
  title: string;
  head: string;
  body: string;
  tags: string[];
}

const ContractDifferentiators: React.FC = () => {
  const t = useTranslations("ContractManufacturing.differentiators");

  const rows = t.raw("rows") as DifferentiatorRowData[];

  return (
    <section className="bg-primary dark:bg-[#141210] py-22 text-[#1a1714] dark:text-white border-t border-[#e8e2d8] dark:border-[#2e2924] transition-colors duration-200">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-16">
          <div className="inline-flex items-center justify-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("tag")}
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white text-center">
            {t("title")}
            <span className="text-brand">{t("titleAccent")}</span>
          </h2>
        </ScrollReveal>

        {/* Differentiators Grid Table */}
        <ScrollReveal
          delay={0.25}
          className="flex flex-col border border-[#e8e2d8] dark:border-[#2e2924] rounded-xl overflow-hidden shadow-2xl"
        >
          {rows.map((row) => (
            <div
              key={row.num}
              className="grid grid-cols-1 lg:grid-cols-[220px_1fr_1fr] bg-secondary/40 dark:bg-[#1c1a16] border-b border-[#e8e2d8] dark:border-[#2e2924] last:border-b-0 hover:bg-secondary/80 dark:hover:bg-[#23201b]/70 transition-colors duration-200"
            >
              {/* Col 1: Label (Num & Title) */}
              <div className="p-7 lg:p-8 lg:border-r border-[#e8e2d8] dark:border-[#2e2924] flex items-center gap-4.5 border-b lg:border-b-0 border-[#e8e2d8] dark:border-[#2e2924]">
                <span className="font-sans text-[28px] font-black text-brand leading-none flex-shrink-0">
                  {row.num}
                </span>
                <span className="font-sans text-[12px] font-bold text-[#1a1714] dark:text-white tracking-wide uppercase leading-snug">
                  {row.title}
                </span>
              </div>

              {/* Col 2: Content (What this means) */}
              <div className="p-7 lg:p-8 lg:border-r border-[#e8e2d8] dark:border-[#2e2924] text-left border-b lg:border-b-0 border-[#e8e2d8] dark:border-[#2e2924]">
                <div className="text-[10px] font-bold tracking-[0.08em] uppercase text-[#8a8070] dark:text-white/40 mb-2">
                  {row.head}
                </div>
                <p className="text-[13px] text-[#5c564f] dark:text-white/55 font-light leading-relaxed">
                  {row.body}
                </p>
              </div>

              {/* Col 3: Tags / Extra highlights */}
              <div className="p-7 lg:p-8 flex items-center justify-start text-left">
                <div className="flex gap-2 flex-wrap">
                  {row.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="bg-brand/12 border border-brand/20 text-brand/80 rounded-full px-3 py-1.5 font-semibold whitespace-nowrap uppercase text-[9.5px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContractDifferentiators;
