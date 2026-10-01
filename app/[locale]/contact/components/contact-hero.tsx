"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Package, Tag, Hammer } from "lucide-react";

interface InquiryCard {
  title: string;
  desc: string;
  linkText: string;
  icon: React.ReactNode;
}

const ContactHero: React.FC = () => {
  const t = useTranslations("ContactPage");

  const cardsData = t.raw("cards") as {
    title: string;
    desc: string;
    linkText: string;
  }[];

  const icons = [
    <Package className="w-5 h-5 text-brand" key="package" />,
    <Tag className="w-5 h-5 text-brand" key="tag" />,
    <Hammer className="w-5 h-5 text-brand" key="hammer" />,
  ];

  return (
    <section className="bg-primary dark:bg-[#141210] py-22 text-[#1a1714] dark:text-white transition-colors duration-200" id="contact-intro">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <ScrollReveal className="text-left mb-11">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("hero.tag")}
          </div>
          <h1 className="font-sans text-[clamp(32px,4vw,56px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white">
            {t("hero.title")}
            <span className="text-brand">{t("hero.titleAccent")}</span>
          </h1>
          <p className="text-[15px] text-text-muted dark:text-white/48 mt-4 font-light leading-[1.78] max-w-[680px]">
            {t("hero.desc")}
          </p>
        </ScrollReveal>

        {/* Inquiry Grid */}
        <ScrollReveal delay={0.2} className="grid grid-cols-1 md:grid-cols-3 mt-11 gap-0 dark:gap-[1px] bg-transparent dark:bg-[#2e2924] rounded-xl overflow-hidden shadow-md dark:border dark:border-[#2e2924]">
          {cardsData.map((card, idx) => (
            <div
              key={idx}
              className="bg-white dark:bg-[#1c1a16] p-8 flex flex-col justify-between hover:bg-gray-50 dark:hover:bg-[#211e19] transition-all duration-200 group border-b md:border-b-0 md:border-r border-black/[0.08] dark:border-none last:border-b-0 md:last:border-r-0"
            >
              <div>
                {/* Icon wrapper */}
                <div className="w-11 h-11 rounded-lg bg-brand/10 border border-brand/25 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
                  {icons[idx] || icons[0]}
                </div>
                <h3 className="font-sans text-base font-extrabold text-[#1a1714] dark:text-white mb-2.5">
                  {card.title}
                </h3>
                <p className="text-[13px] text-text-muted dark:text-white/45 font-light leading-[1.68] mb-6">
                  {card.desc}
                </p>
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-brand hover:translate-x-1 transition-transform duration-200"
              >
                {card.linkText}
              </a>
            </div>
          ))}
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ContactHero;
