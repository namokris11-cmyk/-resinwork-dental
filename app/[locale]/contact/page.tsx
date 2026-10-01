"use client";

import React from "react";
import ContactHero from "./components/contact-hero";
import RegionalContacts from "./components/regional-contacts";

export default function ContactPage() {
  return (
    <div className="min-h-screen">
      {/* ═══ HERO / INTRO SECTION ═══ */}
      <ContactHero />

      {/* ═══ REGIONAL ACCORDIONS SECTION ═══ */}
      <RegionalContacts />
    </div>
  );
}
