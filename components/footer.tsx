"use client";

import type React from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { LoaderCircle } from "lucide-react";
import { BsInstagram, BsLinkedin, BsTwitter } from "react-icons/bs";
import { useTranslations } from "next-intl";
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { ScrollReveal } from "@/components/scroll-reveal";

// Form validation schema
const contactFormSchema = z.object({
  phoneNumber: z.string().optional(),
  company: z.string().min(1, "Company is required"),
  name: z
    .string()
    .min(1, "Name is required")
    .regex(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  serviceRequired: z.string().optional(),
  applicationSegment: z.string().optional(),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Footer: React.FC = () => {
  const pathname = usePathname();
  const isDentalPage = pathname === "/dental" || pathname === "/dental/";
  const [loading, setLoading] = useState(false);
  const contactForm = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      phoneNumber: "",
      company: "",
      name: "",
      email: "",
      message: "",
      serviceRequired: "",
      applicationSegment: "",
    },
  });

  const t = useTranslations("Footer");
  const navT = useTranslations("Navigation");

  const onContactSubmit = async (data: ContactFormData) => {
    setLoading(true);
    const formData = {
      phone: data.phoneNumber,
      company: data.company,
      name: data.name,
      email: data.email,
      message: `${data.message}\n\nService: ${data.serviceRequired}\nSegment: ${data.applicationSegment}`,
    };

    try {
      const result = await emailjs.send(
        "service_h1bbf9r",
        "template_8r00hwy",
        formData,
        "98eufrAwkuETxdRPM",
      );

      if (result.text == "OK") {
        setLoading(false);
        toast(
          "Your message has been sent successfully. We will get back to you soon.",
        );
        contactForm.reset();
      } else {
        setLoading(false);
        toast(
          "There was an error sending your message. Please try again later.",
        );
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error);
      toast("There was an error sending your message. Please try again later.");
    }
  };

  return (
    <>
      {/* ═══ CONTACT ═══ */}
      {!isDentalPage && (
      <div className="py-[88px] bg-[#f0ece3] dark:bg-[#0c0c0c]" id="contact">
        <div className="max-w-[1160px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.15fr] gap-16 items-start">
            <div>
              <div className="mb-4">
                <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2.5 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
                  Get in touch
                </div>
                <div className="text-[clamp(26px,3.2vw,42px)] font-black leading-[1.05] tracking-tight text-[var(--text-primary)]">
                  Start the
                  <br />
                  <span className="text-brand">Conversation</span>
                </div>
              </div>
              <p className="text-[15px] text-[var(--text-secondary,#8a8070)] dark:text-white/60 leading-[1.8] font-light my-4 md:mt-4 md:mb-8">
                Whether you're a brand looking to launch a white-label resin, a
                manufacturer seeking a development partner, or a company needing
                scale-up support — tell us where you are and we'll map the right
                path forward.
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-[var(--border-color,#e8e2d8)] dark:bg-white/5 dark:border-white/10 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff4712"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.12 1.2 2 2 0 012.11 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary,#8a8070)] dark:text-white/40 mb-[3px]">
                      Toll Free
                    </div>
                    <div className="text-[13px] text-[var(--text-primary,#1a1714)] dark:text-white font-semibold">
                      1800 - 102 - 0525
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-[var(--border-color,#e8e2d8)] dark:bg-white/5 dark:border-white/10 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff4712"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary,#8a8070)] dark:text-white/40 mb-[3px]">
                      CDMO Enquiries
                    </div>
                    <div className="text-[13px] text-[var(--text-primary,#1a1714)] dark:text-white font-semibold">
                      cdmo@resinwork.com
                    </div>
                  </div>
                </div>
                {/* <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 shrink-0 rounded-lg bg-white border border-[var(--border-color,#e8e2d8)] dark:bg-white/5 dark:border-white/10 flex items-center justify-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#ff4712"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.1em] text-[var(--text-secondary,#8a8070)] dark:text-white/40 mb-[3px]">
                      India HQ
                    </div>
                    <div className="text-[13px] text-[var(--text-primary,#1a1714)] dark:text-white font-semibold">
                      3AKChemie Pvt. Ltd., TSIIC Automotive Park, Kallakal,
                      Telangana 502336
                    </div>
                  </div>
                </div> */}
              </div>

              {/* <div className="flex flex-col gap-2.5 mt-7">
                <a
                  href="#"
                  className="bg-brand text-white px-6 py-[13px] rounded-[4px] text-[13px] font-bold inline-flex items-center gap-2 transition-colors duration-200 hover:bg-[#cc3000] w-fit"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.723v6.554a1 1 0 01-1.447.894L15 14" />
                    <rect x="3" y="7" width="12" height="10" rx="2" />
                  </svg>
                  Connect Virtual Meet
                </a>
                <a
                  href="#"
                  className="bg-white text-[var(--text-primary,#1a1714)] px-5.5 py-3 rounded-[4px] text-[13px] font-semibold inline-flex items-center gap-2 border border-[var(--border-color,#e8e2d8)] dark:bg-transparent dark:text-white dark:border-white/20 transition-colors duration-200 hover:border-brand hover:text-brand w-fit"
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V9" />
                    <path d="M10 2v7h7" />
                    <line x1="12" y1="13" x2="12" y2="21" />
                    <polyline points="9 18 12 21 15 18" />
                  </svg>
                  Request Sample
                </a>
              </div> */}
              </div>

            <div
              className="bg-white border border-[var(--border-color,#e8e2d8)] dark:bg-white/5 dark:border-white/10 rounded-xl p-6 md:p-9 shadow-[0_8px_40px_rgba(0,0,0,0.05)]"
            >
              <div className=" text-xl font-extrabold text-[var(--text-primary,#1a1714)] dark:text-white mb-6">
                Send us an enquiry
              </div>
              <form onSubmit={contactForm.handleSubmit(onContactSubmit)}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                      Your Name *
                    </label>
                    <input
                      className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent placeholder:text-[#b8b0a0]"
                      type="text"
                      placeholder="Full name"
                      {...contactForm.register("name")}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                      Company *
                    </label>
                    <input
                      className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent placeholder:text-[#b8b0a0]"
                      type="text"
                      placeholder="Company name"
                      {...contactForm.register("company")}
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                      Email *
                    </label>
                    <input
                      className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent placeholder:text-[#b8b0a0]"
                      type="email"
                      placeholder="work@email.com"
                      {...contactForm.register("email")}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3.5">
                    <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                      Phone
                    </label>
                    <input
                      className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent placeholder:text-[#b8b0a0]"
                      type="tel"
                      placeholder="+91 ..."
                      {...contactForm.register("phoneNumber")}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5 mb-3.5">
                  <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                    Service required
                  </label>
                  <select
                    className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent cursor-pointer"
                    {...contactForm.register("serviceRequired")}
                  >
                    <option value="" className="dark:bg-[#141210]">
                      Select a service...
                    </option>
                    <option
                      value="Custom Resin Development"
                      className="dark:bg-[#141210]"
                    >
                      Custom Resin Development
                    </option>
                    <option
                      value="OEM / Private Label Manufacturing"
                      className="dark:bg-[#141210]"
                    >
                      OEM / Private Label Manufacturing
                    </option>
                    <option
                      value="Pilot Batch Production"
                      className="dark:bg-[#141210]"
                    >
                      Pilot Batch Production
                    </option>
                    <option
                      value="Scale-Up Support"
                      className="dark:bg-[#141210]"
                    >
                      Scale-Up Support
                    </option>
                    <option
                      value="Regulatory Documentation"
                      className="dark:bg-[#141210]"
                    >
                      Regulatory Documentation
                    </option>
                    <option
                      value="Packaging & Export"
                      className="dark:bg-[#141210]"
                    >
                      Packaging & Export
                    </option>
                    <option
                      value="Book Virtual Meet"
                      className="dark:bg-[#141210]"
                    >
                      Book Virtual Meet
                    </option>
                    <option
                      value="General Enquiry"
                      className="dark:bg-[#141210]"
                    >
                      General Enquiry
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mb-3.5">
                  <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                    Application segment
                  </label>
                  <select
                    className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent cursor-pointer"
                    {...contactForm.register("applicationSegment")}
                  >
                    <option value="" className="dark:bg-[#141210]">
                      Select segment...
                    </option>
                    <option value="Dental" className="dark:bg-[#141210]">
                      Dental
                    </option>
                    <option value="Jewellery" className="dark:bg-[#141210]">
                      Jewellery
                    </option>
                    <option
                      value="Engineering / Industrial"
                      className="dark:bg-[#141210]"
                    >
                      Engineering / Industrial
                    </option>
                    <option
                      value="Other / Not sure yet"
                      className="dark:bg-[#141210]"
                    >
                      Other / Not sure yet
                    </option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 mb-3.5">
                  <label className="text-[10.5px] font-extrabold uppercase tracking-[0.09em] text-[var(--text-secondary,#5a5448)] dark:text-white/60">
                    Brief / Message *
                  </label>
                  <textarea
                    className="bg-[var(--bg-primary,#faf8f4)] dark:bg-white/5 border border-[var(--border-color,#e8e2d8)] dark:border-white/10 rounded-md px-3.5 py-[11px] text-[var(--text-primary,#1a1714)] dark:text-white text-[13px] outline-none transition-colors duration-200 focus:border-brand focus:bg-white dark:focus:bg-transparent resize-y min-h-[90px] placeholder:text-[#b8b0a0]"
                    placeholder="Describe your resin requirements, target application, volumes, and current stage..."
                    {...contactForm.register("message")}
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-brand text-white py-3.5 rounded-md cursor-pointer text-[13px] font-bold tracking-[0.06em] uppercase transition-colors duration-200 hover:bg-[#cc3000]"
                  disabled={loading}
                >
                  {loading ? (
                    <LoaderCircle className="w-5 h-5 animate-spin mx-auto" />
                  ) : (
                    "Send Enquiry"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      )}

      {/* ═══ FOOTER ═══ */}
      <footer className="bg-[#141210] dark:bg-black text-white border-t border-white/5 pt-14 pb-0">
        <div className="max-w-[1160px] mx-auto px-6 md:px-12 pb-12 grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-8 md:gap-12">
          <div>
            <div className="flex flex-col justify-between col-span-3 order-1 ">
              <div className="flex justify-start">
                <Image
                  src="/logo.svg"
                  alt="Logo"
                  width={isDentalPage ? 100 : 180}
                  height={isDentalPage ? 33 : 60}
                  className={isDentalPage ? "mb-6 opacity-90" : "mb-6 lg:w-[80%] opacity-90"}
                />
              </div>
              <div className="text-[13px] text-white/35 font-medium mb-6 leading-[1.75]">
                <strong className="text-[var(--color-primary)]">
                  {t("mobileFooter.address.country")}
                </strong>
                <br />
                {t("mobileFooter.address.line1")}
                <br />
                {t("mobileFooter.address.line2")}
                <br />
                {t("mobileFooter.address.line3")}
                <br />
              </div>
            </div>
            <div className="flex gap-2">
              <a
                href="https://www.linkedin.com/"
                className="w-[34px] h-[34px] rounded-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 hover:border-brand hover:bg-brand/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsLinkedin className="w-4 h-4 text-white opacity-50" />
              </a>
              <a
                href="https://www.instagram.com/"
                className="w-[34px] h-[34px] rounded-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 hover:border-brand hover:bg-brand/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsInstagram className="w-4 h-4 text-white opacity-50" />
              </a>
              <a
                href="https://www.x.com/"
                className="w-[34px] h-[34px] rounded-md bg-white/5 border border-white/10 flex items-center justify-center transition-all duration-200 hover:border-brand hover:bg-brand/10"
                target="_blank"
                rel="noopener noreferrer"
              >
                <BsTwitter className="w-4 h-4 text-white opacity-50" />
              </a>
            </div>
          </div>
          <div>
            <div className=" text-[10.5px] font-extrabold tracking-[0.14em] uppercase text-white/80 mb-4.5">
              {t("contactUs.title")}
            </div>
            <ul className="list-none flex flex-col gap-2.5 p-0 m-0">
              <li>
                <a
                  href="tel:18001020525"
                  className="text-[13px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
                >
                  1800-102-0525
                </a>
              </li>
              {!isDentalPage && (
              <li>
                <a
                  href="mailto:cdmo@resinwork.com"
                  className="text-[13px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
                >
                  cdmo@resinwork.com
                </a>
              </li>
              )}
              <li>
                <a
                  href="mailto:sales@resinwork.com"
                  className="text-[13px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
                >
                  sales@resinwork.com
                </a>
              </li>
              <li>
                <span className="text-[13px] text-white/35 font-medium">
                  {isDentalPage ? "Mon - Fri: 10:00 - 19:00 (CET)" : t("contactUs.hours")}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 max-w-[1160px] mx-auto px-6 md:px-12 py-[18px] flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-[11px] text-white/35 font-medium">
            © 2025 3AKChemie Pvt. Ltd. — Resinwork®. All rights reserved.
          </div>
          <div className="flex gap-5 flex-wrap">
            <Link
              href="/privacy-policy"
              className="text-[11px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
            >
              {t("bottomLinks.privacyPolicy")}
            </Link>
            <Link
              href="/terms-conditions"
              className="text-[11px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
            >
              {t("bottomLinks.termsConditions")}
            </Link>
            <Link
              href="/cookie-policy"
              className="text-[11px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
            >
              {t("bottomLinks.cookiePolicy")}
            </Link>
            <Link
              href="/sitemap"
              className="text-[11px] text-white/35 font-medium transition-colors duration-200 hover:text-white/60 no-underline"
            >
              {t("bottomLinks.sitemap")}
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
