"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FlaskConical, Box, Wrench, Activity, FileSpreadsheet, Phone } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";

interface ServiceCardData {
  title: string;
  desc: string;
  tags: string[];
}

const ContractServices: React.FC = () => {
  const t = useTranslations("ContractManufacturing.services");

  // Fetch list of services as raw objects
  const rawList = t.raw("list") as Record<string, ServiceCardData>;

  const servicesData = [
    {
      num: "01",
      icon: <FlaskConical className="w-5.5 h-5.5 text-brand" />,
      featured: false,
      ...rawList["1"]
    },
    {
      num: "02",
      icon: <Box className="w-5.5 h-5.5 text-brand" />,
      featured: true,
      ...rawList["2"]
    },
    {
      num: "03",
      icon: <Wrench className="w-5.5 h-5.5 text-brand" />,
      featured: false,
      ...rawList["3"]
    },
    {
      num: "04",
      icon: <Activity className="w-5.5 h-5.5 text-brand" />,
      featured: false,
      ...rawList["4"]
    },
    {
      num: "05",
      icon: <FileSpreadsheet className="w-5.5 h-5.5 text-brand" />,
      featured: false,
      ...rawList["5"]
    },
    {
      num: "06",
      icon: <Phone className="w-5.5 h-5.5 text-brand" />,
      featured: false,
      ...rawList["6"]
    }
  ];

  return (
    <section className="bg-primary dark:bg-black py-22">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <ScrollReveal className="text-center max-w-[600px] mx-auto mb-12">
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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {servicesData.map((service, idx) => {
            const staggerDelay = 0.1 * (idx % 3);
            return (
              <ScrollReveal
                key={service.num}
                delay={staggerDelay}
                className={`relative bg-secondary dark:bg-white/5 border rounded-xl p-7 transition-all duration-220 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(0,0,0,0.06)] ${
                  service.featured 
                    ? "border-brand/50 dark:border-brand/40 shadow-sm" 
                    : "border-[var(--border-color,#e8e2d8)] dark:border-white/10 hover:border-brand/45 dark:hover:border-brand/45"
                }`}
              >
                {/* Core Badge for Featured Service */}
                {service.featured && (
                  <span className="absolute top-4 right-4 bg-brand/12 text-brand dark:bg-brand/20 text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full">
                    Core
                  </span>
                )}

                {/* Service Number */}
                <div className="font-sans text-[11px] font-bold tracking-[0.12em] text-[#ff4712]/35 mb-4">
                  {service.num}
                </div>

                {/* Service Icon */}
                <div className="w-[44px] h-[44px] rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                  {service.icon}
                </div>

                {/* Service Title */}
                <h3 className="font-sans text-base font-extrabold text-header-text dark:text-white mb-2.5 tracking-tight">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="text-[13px] text-text-muted dark:text-white/50 font-light leading-[1.67] mb-5">
                  {service.desc}
                </p>

                {/* Tags List */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-[var(--border-color,#e8e2d8)] dark:border-white/10">
                  {service.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="bg-primary dark:bg-white/5 rounded-full px-2.5 py-1 text-[10px] text-text-muted dark:text-white/60 font-semibold"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </ScrollReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default ContractServices;
