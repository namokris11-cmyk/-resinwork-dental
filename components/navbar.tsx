"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Search,
  Menu,
  ChevronRight,
  ShoppingBag,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Separator } from "./ui/separator";
import { useNavigation } from "@/hooks/useNavigation";
import SearchOverlay from "./search-overlay";
import { useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import LanguageSelect from "./language-select";

interface Product {
  id: number;
  name: string;
  navic_id: string;
  description: string;
  image?: string;
}

interface NavItem {
  name: string;
  href: string;
  hasSubmenu: boolean;
  image?: string;
  products?: Product[];
  isShop?: boolean;
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const t = useTranslations("Navigation");
  const rawNavItems: NavItem[] = t.raw("navItems");

  // Find the translated Dental item to keep its products submenu
  const dentalItem =
    rawNavItems.find(
      (item) =>
        item.href === "/dental" || item.name.toLowerCase().includes("dental"),
    ) || rawNavItems[0];

  // Restructured navItems: Home, Contract Mfg, Dental, DIY, Resources
  const navItems: NavItem[] = [
    {
      name: t("home"),
      href: "/",
      hasSubmenu: false,
    },
    {
      name: t("contractMfg"),
      href: "/contract-manufacturing",
      hasSubmenu: false,
    },
    {
      ...dentalItem,
      hasSubmenu: true,
    },
    {
      name: t("resources"),
      href: "/#contact",
      hasSubmenu: false,
    },
    {
      name: t("contactUs"),
      href: "/contact",
      hasSubmenu: false,
    },
  ];

  /*
  // Commented out legacy navigation items to preserve them:
  // - Jewellery / Schmuck:
  //   rawNavItems.find(item => item.name === "Jewellery" || item.name === "Schmuck")
  // - Functionality / Funktionalität:
  //   rawNavItems.find(item => item.name === "Functionality" || item.name === "Funktionalität")
  // - Filaments:
  //   rawNavItems.find(item => item.name === "Filaments")
  // - Company / Unternehmen:
  //   rawNavItems.find(item => item.name === "Company" || item.name === "Unternehmen")
  */
  const router = useRouter();
  const pathname = usePathname();
  const isDentalPage = pathname === "/dental";
  const [bannerImage, setBannerImage] = useState("");

  const { handleSectionClick, isNavigating } = useNavigation({
    debug: process.env.NODE_ENV === "development",
  });

  const handlePartnerWithUs = () => {
    handleNavClick();
    window.open(
      "https://outlook.office.com/book/Resinwork@3akchemie.com/?ismsaljsauthenabled",
      "_blank",
    );
  };

  const handleNavClick = () => {
    setIsOpen(false);
    setOpenSubmenu(null);
  };

  const handleSubmenuEnter = (itemName: string) => {
    setOpenSubmenu(itemName);
  };

  const handleSubmenuLeave = () => {
    setOpenSubmenu(null);
  };

  const handleProductClick = (basePath: string, sectionId: string) => {
    handleNavClick();

    // For static builds, use direct navigation
    const targetUrl = `${basePath}#${sectionId}`;
    console.log(`🚀 Navigating to ${targetUrl}`);

    // Use router.push for navigation
    router.push(targetUrl);
  };

  const handleSearch = (query: string) => {
    router.push(`/products/${encodeURIComponent(query)}`);
  };

  return (
    <header className="fixed top-0 z-50 w-full">
      <nav className="border-b border-white/30 bg-black/50 backdrop-blur-[3rem] shadow-sm">
        <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-17">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image
                  src="/logo.svg"
                  alt="Resin Work"
                  width={200}
                  height={48}
                  quality={100}
                />
              </Link>
            </div>

            {/* Desktop Navigation */}
            {!isDentalPage && (
            <div className="hidden lg:flex items-center space-x-6 xl:space-x-14 px-6">
              <div className="flex space-x-2 xl:space-x-4 items-center">
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() =>
                      item.hasSubmenu && handleSubmenuEnter(item.name)
                    }
                    onMouseLeave={() => item.hasSubmenu && handleSubmenuLeave()}
                  >
                    <Link
                      href={item.href}
                      className={`flex items-center rounded-md text-sm transition-colors group gap-1.5 ${
                        item.isShop
                          ? "border border-brand text-brand hover:bg-brand/20 font-semibold  px-3 py-1.5"
                          : "text-white hover:text-brand px-3 py-2"
                      }`}
                    >
                      {item.isShop && <ShoppingCart className="size-4" />}
                      {item.name}
                      {item.hasSubmenu && (
                        <ChevronRight
                          className={`ml-1 h-3 w-3 transition-transform duration-300 ${
                            openSubmenu === item.name ? "rotate-90" : "rotate-0"
                          }`}
                        />
                      )}
                    </Link>
                    {item.hasSubmenu && item.products && (
                      <div
                        className={`fixed left-0 right-0 bg-black/70 backdrop-blur-lg h-screen shadow-lg transition-all duration-500 z-50 ${
                          openSubmenu === item.name
                            ? "opacity-100 translate-y-0 pointer-events-auto"
                            : "opacity-0 -translate-y-3 pointer-events-none"
                        }`}
                      >
                        <div className="w-full mx-auto px-16 py-16 bg-[var(--bg-primary)]">
                          <div className="grid grid-cols-12 gap-8">
                            <div className="col-span-4 flex justify-start items-center">
                              {item.image && (
                                <div className="relative w-full aspect-[4/3]">
                                  <Image
                                    src={
                                      bannerImage ||
                                      item.image ||
                                      "/placeholder.svg"
                                    }
                                    alt={item.name}
                                    fill
                                    className="rounded-lg object-cover"
                                  />
                                </div>
                              )}
                            </div>
                            <div className="col-span-8 grid grid-cols-3 grid-rows-2 gap-6">
                              {item.products.slice(0, 6).map((product) => (
                                <div
                                  key={product.id}
                                  onClick={() =>
                                    handleProductClick(
                                      item.href,
                                      product.navic_id,
                                    )
                                  }
                                  onMouseEnter={() =>
                                    setBannerImage(product?.image || "")
                                  }
                                  onMouseLeave={() => setBannerImage("")}
                                  className={`block h-full cursor-pointer transition-all duration-200 ${
                                    isNavigating
                                      ? "opacity-50 pointer-events-none scale-95"
                                      : "hover:opacity-80 hover:scale-105"
                                  }`}
                                >
                                  <div className="bg-[var(--bg-accent)] rounded-2xl h-full p-8 transition-all duration-200">
                                    <h3 className="text-[var(--color-primary)] text-[1.62rem] font-semibold">
                                      {product.name}
                                    </h3>
                                    {product.description && (
                                      <p className="text-[13px] leading-[23px] text-[#848484] line-clamp-3">
                                        {product.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div
                          onMouseEnter={handleSubmenuLeave}
                          className="h-full w-full"
                        ></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Right side - Desktop */}
              <div className="flex items-center space-x-3 xl:space-x-4">
                <LanguageSelect />
                <Button
                  variant="ghost"
                  className="p-0 cursor-pointer text-white hover:bg-transparent"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Open search"
                >
                  <Search className="size-5" />
                </Button>

                <Button
                  onClick={handlePartnerWithUs}
                  className="text-xs cursor-pointer bg-brand text-white px-4 py-2 rounded-md border border-brand transition-colors hover:bg-transparent hover:border-white"
                >
                  {t("partnerWithUs")}
                </Button>
              </div>
            </div>
            )}

            {/* Mobile Actions */}
            {!isDentalPage && (
            <div className="lg:hidden flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10"
                onClick={() => setSearchOpen(true)}
              >
                <Search className="size-5" />
              </Button>
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                  >
                    <Menu className="size-6" />
                    <span className="sr-only">Open menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="top"
                  className="w-full h-screen bg-black/60 backdrop-blur-[3rem] border-b border-white/20 text-white shadow-2xl"
                >
                  <SheetHeader className="border-b border-white/10 px-6 py-5">
                    <SheetTitle className="sr-only">Resin Work</SheetTitle>
                    <div className="flex items-center justify-start">
                      <Link href="/" onClick={handleNavClick}>
                        <Image
                          src="/logo2.svg"
                          alt="Resin Work"
                          width={200}
                          height={48}
                          quality={100}
                          className="opacity-90 hover:opacity-100 transition-opacity"
                        />
                      </Link>
                    </div>
                  </SheetHeader>
                  <div className="px-2 py-8 overflow-y-scroll">
                    <div className="space-y-2 mb-8">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider px-4 mb-4">
                        {t("navigation")}
                      </h3>
                      {navItems.filter((item) => !item.isShop).map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          onClick={handleNavClick}
                          className="flex items-center px-4 py-4 text-lg font-medium rounded-xl transition-all duration-200 group gap-2 text-white hover:text-brand hover:bg-white/10"
                        >
                          <span className="group-hover:translate-x-1 transition-transform duration-200">
                            {item.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                    <Separator className="my-8 bg-white/20" />
                    <div className="mb-8">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider px-4 mb-4">
                        {t("settings")}
                      </h3>
                      <LanguageSelect isMobile />
                    </div>
                    <Separator className="my-8 bg-white/20" />
                    <div className="px-4">
                      <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">
                        {t("getStarted")}
                      </h3>
                      <div className="flex flex-col gap-3">
                        <Button
                          className="w-full bg-brand hover:bg-brand/90 text-white font-semibold py-6 px-4 rounded-md transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                          onClick={handlePartnerWithUs}
                        >
                          {t("partnerWithUs")}
                        </Button>
                        {navItems.find((item) => item.isShop) && (
                          <Button
                            variant="ghost"
                            className="w-full border border-brand text-brand hover:bg-brand/10 font-semibold py-6 px-4 rounded-md transition-all duration-200 hover:text-brand flex items-center justify-center gap-2 cursor-pointer"
                            onClick={() => {
                              handleNavClick();
                              const shopItem = navItems.find((item) => item.isShop);
                              if (shopItem) router.push(shopItem.href);
                            }}
                          >
                            <ShoppingCart className="size-4" />
                            {t("shop")}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div className="h-8"></div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
            )}
          </div>
        </div>
      </nav>
      {/* Search Overlay */}
      {!isDentalPage && (
        <SearchOverlay
          isOpen={searchOpen}
          onClose={() => setSearchOpen(false)}
          onSearch={handleSearch}
        />
      )}
    </header>
  );
}
