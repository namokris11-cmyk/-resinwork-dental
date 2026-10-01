"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
import { Video, FileText, Download, Check } from "lucide-react";
import { motion } from "framer-motion";

const containerWidths = {
  en: "max-w-[1200px]",
  de: "max-w-[1400px]",
};

const ContractHero: React.FC = () => {
  const t = useTranslations("ContractManufacturing.hero");
  const pathname = usePathname();

  // Extract locale from the first path segment (e.g. /de/contract-manufacturing -> "de")
  const pathSegments = pathname.split("/");
  const locale = pathSegments[1] === "de" ? "de" : "en";

  const maxWidthClass =
    containerWidths[locale as "en" | "de"] || "max-w-[1200px]";

  // Typecast translation list
  const listItems = t.raw("card.list") as string[];

  return (
    <section className="relative min-h-[calc(100vh)] -top-16 flex items-center bg-[#faf8f4] dark:bg-[#141210] overflow-hidden pt-30 pb-24 transition-colors duration-200">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0 bg-[url('https://resinwork.com/product-img/Model%204%20Drama%201.jpg')] bg-center bg-cover opacity-28 scale-[1.04] pointer-events-none"
        style={{ opacity: 0.18 }}
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-r from-[#faf8f4]/95 via-[#faf8f4]/70 to-transparent dark:from-[#141210]/95 dark:via-[#141210]/70 dark:to-transparent pointer-events-none" />
      <div className="absolute inset-0 z-[1] bg-gradient-to-t from-[#faf8f4] via-transparent to-transparent dark:from-[#141210] dark:via-transparent dark:to-transparent pointer-events-none" />
      
      {/* Decorative diagonal accent lines */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] right-[18%] w-[1px] h-[140%] rotate-[-12deg]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255, 71, 18, 0.18), transparent)",
          }}
        />
        <div
          className="absolute top-[-20%] right-[22%] w-[0.5px] h-[140%] rotate-[-12deg]"
          style={{
            background:
              "linear-gradient(to bottom, transparent, rgba(255, 71, 18, 0.08), transparent)",
          }}
        />
      </div>
      
      <div
        className={`relative z-10 mx-auto px-6 md:px-12 w-full ${maxWidthClass}`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-14 xl:gap-18 items-end">
          {/* Left Hero Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.215, 0.61, 0.355, 1.0] }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 bg-[#ff4712]/12 border border-[#ff4712]/30 rounded-full px-4 py-1.5 mb-7 text-[10.5px] font-bold tracking-[0.14em] uppercase text-brand">
              <span className="w-1.5 h-1.5 rounded-full bg-brand animate-pulse" />
              {t("pill")}
            </div>

            <h1 className="font-sans text-[clamp(36px,5.8vw,78px)] font-black leading-[0.97] tracking-tight text-header-text dark:text-white mb-7">
              {t("titlePart1")}
              <br />
              {t("titlePart2")}
              <em className="text-brand">{t("titlePart2Italic")}</em>
              <br />
              <span
                className="text-transparent italic text-[#1a1714]/20 dark:text-white/20"
                style={{ WebkitTextStroke: "1px currentColor" }}
              >
                {t("titlePart3")}
              </span>
            </h1>

            <p className="text-[15px] text-text-muted dark:text-white/55 font-light leading-[1.78] max-w-[520px] mb-9">
              {t("description")}
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#contact"
                className="bg-brand text-white px-6 py-3 rounded-[4px] text-[12.5px] font-bold tracking-[0.06em] uppercase flex items-center gap-2 transition-all duration-200 hover:bg-brand/90 hover:-translate-y-0.5"
              >
                <Video className="w-3.5 h-3.5 stroke-[2.5]" />
                {t("connectBtn")}
              </a>
              <div className="flex gap-3">
                <a
                  href="#contact"
                  className="bg-transparent text-header-text dark:text-white px-5 py-3 rounded-[4px] text-[12.5px] font-normal border border-header-text/20 dark:border-white/20 flex items-center gap-2 transition-colors duration-200 hover:border-header-text/50 dark:hover:border-white/50"
                >
                  <FileText className="w-3.5 h-3.5" />
                  {t("quoteBtn")}
                </a>
                <a
                  href="#"
                  className="bg-transparent text-header-text dark:text-white px-5 py-3 rounded-[4px] text-[12.5px] font-normal border border-header-text/20 dark:border-white/20 flex items-center gap-2 transition-colors duration-200 hover:border-header-text/50 dark:hover:border-white/50"
                >
                  <Download className="w-3.5 h-3.5" />
                  {t("deckBtn")}
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.25,
              ease: [0.215, 0.61, 0.355, 1.0],
            }}
            className="relative bg-white/60 dark:bg-white/5 border border-[#e8e2d8] dark:border-white/10 rounded-xl p-8 backdrop-blur-md overflow-hidden before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-[2px] before:bg-gradient-to-r before:from-brand before:via-brand/30 before:to-transparent"
          >
            <div className="text-[9.5px] font-bold tracking-[0.16em] uppercase text-brand mb-3.5">
              {t("card.label")}
            </div>
            <h2 className="font-sans text-base font-extrabold text-header-text dark:text-white mb-3.5 leading-snug">
              {t("card.title")}
            </h2>
            <p className="text-[13px] text-text-muted dark:text-white/50 font-light leading-[1.72] mb-5.5">
              {t("card.body")}
            </p>

            <ul className="space-y-2.5">
              {listItems.map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2.5 text-[12.5px] text-[#1a1714]/75 dark:text-white/65"
                >
                  <div className="w-[18px] h-[18px] rounded-full bg-brand/10 dark:bg-brand/15 border border-brand/20 dark:border-brand/30 flex items-center justify-center flex-shrink-0">
                    <Check className="w-2.5 h-2.5 text-brand stroke-[3]" />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContractHero;
