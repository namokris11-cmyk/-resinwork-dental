"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { ScrollReveal } from "@/components/scroll-reveal";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { Link } from "@/i18n/navigation";
import { dentalProducts } from "@/public/data/dental";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

interface ProductCardProps {
  id: string;
  navic_id: string;
  name: string;
  subTitle: string;
  images: { id: number; img: string; color?: string; colorName?: string }[];
  ratingLabel: string;
  newArrivalTag: string;
  learnMoreBtn: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  navic_id,
  name,
  subTitle,
  images,
  ratingLabel,
  newArrivalTag,
  learnMoreBtn,
}) => {
  // Use state to track the active color image
  const [selectedImage, setSelectedImage] = useState(() => {
    // Default to the first image in the array
    return images[0];
  });

  // Check if there are color options
  const hasColors = images.some((img) => img.color);
  // Is this model considered a new arrival?
  const isNewArrival = ["model_4", "model_3", "model_2"].includes(navic_id);

  return (
    <div className="bg-white dark:bg-white/15 border border-[#ece7de] dark:border-white/10 rounded-xl shadow-xs hover:shadow-md hover:border-brand/40 dark:hover:border-brand/40 transition-all duration-300 flex flex-col group h-full relative">
      {/* 3D Ribbon - Newly Added (Render conditionally only for newer model resins) */}
      {isNewArrival && (
        <div className="absolute top-4 -left-1.5 z-20">
          <span className="relative bg-brand text-white px-2.5 py-1 rounded-r text-[9px] font-black uppercase tracking-widest shadow-md block">
            {newArrivalTag}
            {/* Under-fold Triangle for 3D depth */}
            <span className="absolute top-full left-0 w-1.5 h-1.5 bg-[#a34407] dark:bg-[#6b2503] [clip-path:polygon(100%_0,0_0,100%_100%)]"></span>
          </span>
        </div>
      )}

      {/* Image Wrapper */}
      <div className="relative aspect-[4/3.5] w-full bg-white dark:bg-black/10 flex items-center justify-center p-4 border-b border-[#ece7de] dark:border-white/10 rounded-t-xl overflow-hidden">
        {/* Glassmorphic Ratings Badge */}
        <span className="absolute top-3 right-3 bg-white dark:bg-black border border-[#ece7de]/80 dark:border-white/15 px-2.5 py-1 rounded text-[10.5px] font-bold z-10 flex items-center gap-1 shadow-xs">
          <span className="text-[#f59e0b] fill-[#f59e0b]">★</span>
          <span className="text-[#8a8070] dark:text-white/80">
            {ratingLabel.replace("★", "").trim()}
          </span>
        </span>

        {/* Product Image - Zoom effect with rounded corners */}
        <div className="relative border border-[#ece7de]/80 dark:border-white/15 w-full h-full rounded-lg overflow-hidden">
          <img
            src={selectedImage.img}
            alt={name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          />
        </div>
      </div>

      {/* Info Details */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="font-sans text-[15px] font-extrabold text-[#1a1714] dark:text-white mb-0.5 leading-tight tracking-tight">
          {name}
        </h3>
        <p className="text-[11px] font-medium text-brand mb-4">{subTitle}</p>

        {/* Color Options Area replacing Pricing */}
        <div className="border-t border-[#ece7de]/60 dark:border-white/10 pt-4 mt-auto">
          {hasColors ? (
            <div className="flex items-center justify-between mb-4 h-8">
              <span className="text-[11px] font-bold text-[#8a8070] dark:text-white/60 uppercase tracking-wider">
                Colours{selectedImage.colorName ? `: ${selectedImage.colorName}` : ""}
              </span>
              <div className="flex gap-2.5 items-center">
                {images
                  .filter((img) => img.color)
                  .map((img, idx) => {
                    const isSelected = selectedImage.id === img.id;
                    return (
                      <div
                        key={`color-${id}-${idx}`}
                        className="relative flex flex-col items-center"
                      >
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setSelectedImage(img);
                          }}
                          className={`w-5 h-5 rounded-full transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? "ring-2 ring-offset-2 ring-brand dark:ring-offset-[#1a1714]"
                              : "border border-gray-300 dark:border-white/20 hover:border-brand"
                          }`}
                          style={{ backgroundColor: img.color }}
                          aria-label={`Select ${img.colorName} color`}
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between mb-4 h-8">
              <span className="text-[11px] font-bold text-[#8a8070] dark:text-white/60 uppercase tracking-wider">
                Colours: Standard
              </span>
            </div>
          )}

          {/* Learn More Link (navigates to specific section on the dental page) */}
          <Link
            href={`/dental#${navic_id}`}
            className="w-full bg-[#1c1714] dark:bg-white text-white dark:text-black py-2.5 rounded-lg text-xs font-bold tracking-wider uppercase transition-all duration-250 hover:bg-brand dark:hover:bg-brand hover:text-white dark:hover:text-white flex items-center justify-center gap-1.5 shadow-xs cursor-pointer"
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
            {learnMoreBtn}
          </Link>
        </div>
      </div>
    </div>
  );
};

const ProductsSection: React.FC = () => {
  const t = useTranslations("ProductsSection");
  const dentalT = useTranslations("DentalProducts");

  return (
    <section className="py-20 md:py-28 border-t border-b border-[#ece7de] dark:border-white/5 overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-[10px] font-bold tracking-[0.16em] uppercase text-brand mb-2 before:content-[''] before:w-[18px] before:h-[1.5px] before:bg-brand">
                {t("newArrival")}
              </div>
              <h2 className="text-[clamp(28px,4vw,38px)] font-black tracking-tight text-[#1a1714] dark:text-white leading-[1.1] mb-3">
                {t("title")}
              </h2>
              <p className="text-[14px] text-[#8a8070] dark:text-white/60 font-light max-w-[620px] leading-relaxed">
                {t("description")}
              </p>
            </div>

            {/* Custom Navigation Buttons for Slider */}
            <div className="flex items-center justify-center gap-3">
              <button className="swiper-button-prev-custom flex items-center justify-center w-11 h-11 rounded-full border border-[#ece7de] dark:border-white/10 bg-white dark:bg-white/5 text-[#1a1714] dark:text-white hover:border-brand dark:hover:border-brand hover:bg-brand hover:text-white dark:hover:text-white transition-all duration-300 shadow-xs cursor-pointer">
                <ChevronLeft className="size-5" />
              </button>
              <button className="swiper-button-next-custom flex items-center justify-center w-11 h-11 rounded-full border border-[#ece7de] dark:border-white/10 bg-white dark:bg-white/5 text-[#1a1714] dark:text-white hover:border-brand dark:hover:border-brand hover:bg-brand hover:text-white dark:hover:bg-brand transition-all duration-300 shadow-xs cursor-pointer">
                <ChevronRight className="size-5" />
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Swiper Slider Wrapper (Responsive layout for all viewport widths) */}
        <ScrollReveal delay={0.15}>
          <div className="w-full relative">
            <Swiper
              modules={[Autoplay, Pagination, Navigation]}
              spaceBetween={16}
              slidesPerView={1.2}
              autoplay={{
                delay: 4000,
                disableOnInteraction: true,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={{
                prevEl: ".swiper-button-prev-custom",
                nextEl: ".swiper-button-next-custom",
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="product-swiper pb-16!"
            >
              {dentalProducts.map((product) => (
                <SwiperSlide key={product.id} className="h-auto">
                  <ProductCard
                    id={String(product.id)}
                    navic_id={product.navic_id}
                    name={dentalT(`${product.navic_id}.name`)}
                    subTitle={dentalT(`${product.navic_id}.subTitle`)}
                    images={product.images}
                    ratingLabel={t("ratingLabel")}
                    newArrivalTag={t("newArrival")}
                    learnMoreBtn={t("learnMore")}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ProductsSection;
