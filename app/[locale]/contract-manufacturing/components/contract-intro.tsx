"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { FlaskConical, Activity, Building2, ShieldCheck } from "lucide-react";
import { ScrollReveal } from "@/components/scroll-reveal";

const ContractIntro: React.FC = () => {
  const t = useTranslations("ContractManufacturing.intro");

  // Load paragraphs manually since we want bold text styling
  const p1 = t("paragraphs.0");
  const p2 = t("paragraphs.1");
  const p3 = t("paragraphs.2");

  // Helper to highlight specific words
  const renderStyledParagraph = (text: string) => {
    // We want to bold terms like: "research, development, pilot-scale validation, and contract manufacturing", "consistency, quality, and confidentiality."
    const highlights = [
      "research, development, pilot-scale validation, and contract manufacturing",
      "research, development, pilot-scale validation, und contract manufacturing",
      "consistency, quality, and confidentiality.",
      "Konsistenz, Qualität und Vertraulichkeit.",
      "Forschung, Entwicklung, Validierung im Pilotmaßstab und Auftragsherstellung",
    ];

    let result = text;
    highlights.forEach((term) => {
      if (text.includes(term)) {
        result = result.replace(term, `<strong>${term}</strong>`);
      }
    });

    return <p dangerouslySetInnerHTML={{ __html: result }} />;
  };

  return (
    <section className="bg-secondary text-text py-22">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Column */}
          <ScrollReveal className="text-left">
            <div className="mb-11">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
                {t("tag")}
              </div>
              <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white">
                {t("title")}<br />
                <span className="text-brand">{t("titleAccent")}</span>
              </h2>
            </div>

            <div className="space-y-5 text-[15px] text-text-muted dark:text-white/70 font-light leading-[1.82]">
              {renderStyledParagraph(p1)}
              {renderStyledParagraph(p2)}
              {renderStyledParagraph(p3)}
            </div>
          </ScrollReveal>

          {/* Right Cards Column */}
          <ScrollReveal delay={0.25} className="space-y-3.5">
            
            {/* Formulation Science */}
            <div className="relative group flex items-start gap-4 bg-secondary dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-lg p-5 transition-all duration-200 hover:border-brand/25 hover:shadow-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand before:scale-y-0 before:origin-bottom before:transition-transform before:duration-250 hover:before:scale-y-100">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <FlaskConical className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-sans text-[14px] font-bold text-header-text dark:text-white mb-1">
                  {t("cards.formulation.title")}
                </h3>
                <p className="text-[12px] text-text-muted dark:text-white/50 font-light leading-relaxed">
                  {t("cards.formulation.desc")}
                </p>
              </div>
            </div>

            {/* Process Optimisation */}
            <div className="relative group flex items-start gap-4 bg-secondary dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-lg p-5 transition-all duration-200 hover:border-brand/25 hover:shadow-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand before:scale-y-0 before:origin-bottom before:transition-transform before:duration-250 hover:before:scale-y-100">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <Activity className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-sans text-[14px] font-bold text-header-text dark:text-white mb-1">
                  {t("cards.optimisation.title")}
                </h3>
                <p className="text-[12px] text-text-muted dark:text-white/50 font-light leading-relaxed">
                  {t("cards.optimisation.desc")}
                </p>
              </div>
            </div>

            {/* Scalable Manufacturing */}
            <div className="relative group flex items-start gap-4 bg-secondary dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-lg p-5 transition-all duration-200 hover:border-brand/25 hover:shadow-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand before:scale-y-0 before:origin-bottom before:transition-transform before:duration-250 hover:before:scale-y-100">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <Building2 className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-sans text-[14px] font-bold text-header-text dark:text-white mb-1">
                  {t("cards.scalable.title")}
                </h3>
                <p className="text-[12px] text-text-muted dark:text-white/50 font-light leading-relaxed">
                  {t("cards.scalable.desc")}
                </p>
              </div>
            </div>

            {/* Confidentiality */}
            <div className="relative group flex items-start gap-4 bg-secondary dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-lg p-5 transition-all duration-200 hover:border-brand/25 hover:shadow-lg overflow-hidden before:content-[''] before:absolute before:left-0 before:top-0 before:bottom-0 before:w-[3px] before:bg-brand before:scale-y-0 before:origin-bottom before:transition-transform before:duration-250 hover:before:scale-y-100">
              <div className="w-[42px] h-[42px] rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-5 h-5 text-brand" />
              </div>
              <div>
                <h3 className="font-sans text-[14px] font-bold text-header-text dark:text-white mb-1">
                  {t("cards.confidentiality.title")}
                </h3>
                <p className="text-[12px] text-text-muted dark:text-white/50 font-light leading-relaxed">
                  {t("cards.confidentiality.desc")}
                </p>
              </div>
            </div>

          </ScrollReveal>

        </div>
      </div>
    </section>
  );
};

export default ContractIntro;
