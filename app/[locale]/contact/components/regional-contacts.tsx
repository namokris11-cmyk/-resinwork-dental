"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ChevronDown, Phone, Mail, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface CountryContact {
  name: string;
  isHq?: boolean;
  contactName: string;
  phone: string;
  phoneRaw: string;
  email: string;
}

interface RegionItem {
  num: string;
  name: string;
  hasContact: boolean;
  countries?: CountryContact[];
}

const RegionalContacts: React.FC = () => {
  const t = useTranslations("ContactPage.regions");
  const items = t.raw("items") as RegionItem[];

  // Track currently active region index. First item (Asia) is open by default.
  const [activeIdx, setActiveIdx] = useState<number | null>(0);

  const toggleIdx = (idx: number) => {
    setActiveIdx((prev) => (prev === idx ? null : idx));
  };

  return (
    <section className="bg-secondary dark:bg-[#0c0c0c] py-22 text-[#1a1714] dark:text-white transition-colors duration-200" id="regional-contacts">
      <div className="max-w-[1160px] mx-auto px-6 md:px-12 w-full">
        {/* Section Header */}
        <ScrollReveal className="text-left mb-11">
          <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
            {t("tag")}
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-header-text dark:text-white">
            {t("title")}
            <span className="text-brand">{t("titleAccent")}</span>
          </h2>
          <p className="text-[15px] text-text-muted dark:text-white/48 mt-3 font-light leading-[1.78] max-w-[620px]">
            {t("sub")}
          </p>
        </ScrollReveal>

        {/* Accordions */}
        <ScrollReveal delay={0.2} className="flex flex-col gap-[1px] bg-white dark:bg-[#2e2924] border border-black/[0.08] dark:border-[#2e2924] rounded-xl overflow-hidden mt-11 shadow-lg">
          {items.map((item, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div key={idx} className="bg-primary dark:bg-[#1c1a16] transition-colors duration-200">
                {/* Header */}
                <button
                  onClick={() => toggleIdx(idx)}
                  className="w-full flex items-center justify-between py-6 px-8 cursor-pointer hover:bg-black/[0.02] dark:hover:bg-[#23201b]/70 transition-colors duration-200 text-left outline-none"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-sans text-xs font-bold text-brand/60 tracking-wider">
                      {item.num}
                    </span>
                    <span className="font-sans text-base font-extrabold text-[#1a1714] dark:text-white">
                      {item.name}
                    </span>
                  </div>
                  <div
                    className={`w-[26px] h-[26px] rounded-full border border-[#1a1714]/12 dark:border-white/12 flex items-center justify-center transition-all duration-300 ${
                      isOpen ? "rotate-180 border-brand text-brand" : "text-[#1a1714]/60 dark:text-white/60"
                    }`}
                  >
                    <ChevronDown className="w-3.5 h-3.5" />
                  </div>
                </button>

                {/* Body Container */}
                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  {item.hasContact && item.countries ? (
                    <div className="pb-8 px-8 pt-2 grid grid-cols-1 md:grid-cols-2 gap-5 border-t border-black/[0.06] dark:border-white/5">
                      {item.countries.map((country, cIdx) => (
                        <div
                          key={cIdx}
                          className="bg-secondary dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow duration-200"
                        >
                          <div className="flex items-center gap-2 mb-4">
                            <span className="font-sans text-[13.5px] font-bold text-[#1a1714] dark:text-white">
                              {country.name}
                            </span>
                            {country.isHq && (
                              <span className="bg-brand text-white text-[8px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full">
                                HQ
                              </span>
                            )}
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-start gap-2.5">
                              <div className="w-[26px] h-[26px] shrink-0 rounded-md bg-brand/10 flex items-center justify-center">
                                <User className="w-3.5 h-3.5 text-brand" />
                              </div>
                              <div>
                                <div className="text-[9px] font-bold uppercase tracking-wider text-text-muted dark:text-white/32">
                                  Contact
                                </div>
                                <div className="text-[12.5px] text-[#1a1714]/85 dark:text-white/82 font-semibold">
                                  {country.contactName}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <div className="w-[26px] h-[26px] shrink-0 rounded-md bg-brand/10 flex items-center justify-center">
                                <Phone className="w-3.5 h-3.5 text-brand" />
                              </div>
                              <div>
                                <div className="text-[9px] font-bold uppercase tracking-wider text-text-muted dark:text-white/32">
                                  Phone
                                </div>
                                <div className="text-[12.5px] text-[#1a1714]/85 dark:text-white/82 font-semibold">
                                  <a href={`tel:${country.phoneRaw}`} className="hover:text-brand transition-colors duration-200">
                                    {country.phone}
                                  </a>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-start gap-2.5">
                              <div className="w-[26px] h-[26px] shrink-0 rounded-md bg-brand/10 flex items-center justify-center">
                                <Mail className="w-3.5 h-3.5 text-brand" />
                              </div>
                              <div>
                                <div className="text-[9px] font-bold uppercase tracking-wider text-text-muted dark:text-white/32">
                                  Email
                                </div>
                                <div className="text-[12.5px] text-[#1a1714]/85 dark:text-white/82 font-semibold">
                                  <a href={`mailto:${country.email}`} className="hover:text-brand transition-colors duration-200">
                                    {country.email}
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="pb-8 px-8 pt-2 border-t border-black/[0.06] dark:border-white/5">
                      <div className="inline-block text-[11px] font-bold tracking-wider uppercase text-text-muted/50 border border-dashed border-black/[0.12] dark:border-white/12 bg-secondary dark:bg-white/[0.03] rounded-full px-[18px] py-2 mt-2">
                        {t("comingSoon")}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>
            );
          })}
        </ScrollReveal>
        <p className="text-[11.5px] text-text-muted/60 dark:text-white/28 font-light italic mt-4.5">
          {t("hint")}
        </p>
      </div>
    </section>
  );
};

export default RegionalContacts;
