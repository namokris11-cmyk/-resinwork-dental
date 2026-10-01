"use client";

import React from "react";
import { useTranslations } from "next-intl";

const ContractTicker: React.FC = () => {
  const t = useTranslations("ContractManufacturing");
  const items = t.raw("ticker") as string[];

  // Duplicate items array for seamless looping animation
  const doubledItems = [...items, ...items];

  return (
    <div className="bg-[#ff4712] relative -top-16 py-[14px] overflow-hidden select-none pointer-events-none">
      <div className="flex animate-ticker-marquee w-max">
        {doubledItems.map((item, idx) => (
          <span
            key={idx}
            className="inline-flex items-center gap-3 px-6 font-sans text-[10.5px] font-bold tracking-[0.14em] uppercase text-white/95 whitespace-nowrap"
          >
            {item}
            <span className="w.5 h.5 min-w-[3px] min-h-[3px] rounded-full bg-white/40" />
          </span>
        ))}
      </div>
    </div>
  );
};

export default ContractTicker;
