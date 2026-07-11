"use client";

import React, { useState, useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { products, productTitles, locationNames, conditions } from "@/utils/mock-data";
import { cx } from "@/utils/cx";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton } from "react-aria-components";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const translations: Record<string, any> = {
  en: en.products,
  kh: kh.products,
  cn: zh.products,
};

export default function ProductsPage() {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => translations[locale]?.[key] || key;

  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [selectedCondition, setSelectedCondition] = useState("All");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const getLocalizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path === "/" ? "" : path}`;
  };

  // Get unique categories, locations, and conditions from products for filter options
  const categoryList = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return ["All", ...Array.from(cats)];
  }, []);

  const locationList = useMemo(() => {
    const locs = new Set(products.map((p) => p.location));
    return ["All", ...Array.from(locs)];
  }, []);

  const conditionList = useMemo(() => {
    const conds = new Set(products.map((p) => p.condition));
    return ["All", ...Array.from(conds)];
  }, []);

  // Filtered Products
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Localized Title search
      const titleObj = productTitles[p.title];
      const titleText = (titleObj?.[locale] || titleObj?.en || p.title).toLowerCase();
      const matchesSearch = titleText.includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory = selectedCategory === "All" || p.category === selectedCategory;

      // Location filter
      const matchesLocation = selectedLocation === "All" || p.location === selectedLocation;

      // Condition filter
      const matchesCondition = selectedCondition === "All" || p.condition === selectedCondition;

      // Price filter
      const priceVal = parseFloat(p.price.replace(/[^0-9.]/g, ""));
      const minVal = minPrice ? parseFloat(minPrice) : null;
      const maxVal = maxPrice ? parseFloat(maxPrice) : null;
      
      const matchesMinPrice = minVal === null || priceVal >= minVal;
      const matchesMaxPrice = maxVal === null || priceVal <= maxVal;

      return matchesSearch && matchesCategory && matchesLocation && matchesCondition && matchesMinPrice && matchesMaxPrice;
    });
  }, [searchQuery, selectedCategory, selectedLocation, selectedCondition, minPrice, maxPrice, locale]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setSelectedLocation("All");
    setSelectedCondition("All");
    setMinPrice("");
    setMaxPrice("");
    setShowMobileFilters(false);
  };

  return (
    <div className="w-full bg-secondary py-8 min-h-[calc(100dvh-64px)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs items={[{ label: t("title"), current: true }]} />

        {/* Heading */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-display-xs font-extrabold text-primary">{t("title")}</h1>
            <p className="text-secondary text-sm mt-1">{t("subtitle")}</p>
          </div>
          <button
            onClick={clearFilters}
            className="text-xs font-bold text-brand-solid hover:text-brand-solid_hover underline shrink-0 cursor-pointer self-start md:self-auto"
          >
            {t("clearAll")}
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Panel: Sidebar Filters */}
          <div className={cx(
            "lg:col-span-1 space-y-6 bg-primary border border-secondary rounded-xl p-5 shadow-xs h-fit",
            showMobileFilters ? "block" : "hidden lg:block"
          )}>
            <h3 className="text-sm font-extrabold text-primary pb-3 border-b border-secondary flex items-center justify-between">
              <span>{t("filters")}</span>
              <svg className="size-4 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 01-.659 1.591l-5.432 5.432a2.25 2.25 0 00-.659 1.591v2.927a2.25 2.25 0 01-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 00-.659-1.591L3.659 7.41A2.25 2.25 0 013 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0112 3z" />
              </svg>
            </h3>

            {/* Search query input */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary">{t("searchPlaceholder")}</label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-3 pr-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-tertiary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary">{t("category")}</label>
              <Dropdown.Root>
                <AriaButton className="w-full flex items-center justify-between px-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary outline-hidden font-semibold cursor-pointer shadow-xs">
                  <span>{selectedCategory === "All" ? t("allCategories") : (en.common[selectedCategory] || selectedCategory)}</span>
                  <svg className="size-3 text-secondary/60 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </AriaButton>
                <Dropdown.Popover placement="bottom start" className="w-56 max-h-60 overflow-y-auto">
                  <Dropdown.Menu selectionMode="single" selectedKeys={[selectedCategory]} onAction={(key) => setSelectedCategory(key as string)}>
                    {categoryList.map((cat) => (
                      <Dropdown.Item
                        key={cat}
                        id={cat}
                        label={cat === "All" ? t("allCategories") : (en.common[cat] || cat)}
                        selectionIndicator="checkmark"
                      />
                    ))}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
            </div>

            {/* Location Select */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary">{t("location")}</label>
              <Dropdown.Root>
                <AriaButton className="w-full flex items-center justify-between px-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary outline-hidden font-semibold cursor-pointer shadow-xs">
                  <span>{selectedLocation === "All" ? t("allLocations") : (locationNames[selectedLocation]?.[locale] || locationNames[selectedLocation]?.en || selectedLocation)}</span>
                  <svg className="size-3 text-secondary/60 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </AriaButton>
                <Dropdown.Popover placement="bottom start" className="w-56 max-h-60 overflow-y-auto">
                  <Dropdown.Menu selectionMode="single" selectedKeys={[selectedLocation]} onAction={(key) => setSelectedLocation(key as string)}>
                    {locationList.map((loc) => {
                      const locLabel = loc === "All" 
                        ? t("allLocations") 
                        : (locationNames[loc]?.[locale] || locationNames[loc]?.en || loc);
                      return (
                        <Dropdown.Item
                          key={loc}
                          id={loc}
                          label={locLabel}
                          selectionIndicator="checkmark"
                        />
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
            </div>

            {/* Condition Select */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary">{t("condition")}</label>
              <Dropdown.Root>
                <AriaButton className="w-full flex items-center justify-between px-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary outline-hidden font-semibold cursor-pointer shadow-xs">
                  <span>{selectedCondition === "All" ? t("allConditions") : (conditions[selectedCondition]?.[locale] || conditions[selectedCondition]?.en || selectedCondition)}</span>
                  <svg className="size-3 text-secondary/60 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </AriaButton>
                <Dropdown.Popover placement="bottom start" className="w-56 max-h-60 overflow-y-auto">
                  <Dropdown.Menu selectionMode="single" selectedKeys={[selectedCondition]} onAction={(key) => setSelectedCondition(key as string)}>
                    {conditionList.map((cond) => {
                      const condLabel = cond === "All"
                        ? t("allConditions")
                        : (conditions[cond]?.[locale] || conditions[cond]?.en || cond);
                      return (
                        <Dropdown.Item
                          key={cond}
                          id={cond}
                          label={condLabel}
                          selectionIndicator="checkmark"
                        />
                      );
                    })}
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.Root>
            </div>

            {/* Price Range */}
            <div className="space-y-2">
              <label className="text-xs font-extrabold text-secondary">{t("priceRange")}</label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  placeholder={t("minPrice")}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-tertiary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                />
                <input
                  type="number"
                  placeholder={t("maxPrice")}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-tertiary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Right Panel: Listings Grid */}
          <div className="lg:col-span-3 space-y-4">
            <div className="flex items-center justify-between gap-4 bg-primary border border-secondary rounded-xl px-4 py-3 shadow-xs">
              <div className="text-xs font-extrabold text-secondary">
                {filteredProducts.length} {t("resultsFound")}
              </div>
              <button
                onClick={() => setShowMobileFilters(!showMobileFilters)}
                className="lg:hidden flex items-center gap-1.5 px-3 py-2 text-xs font-bold border border-secondary rounded-lg bg-secondary hover:bg-primary_hover transition-colors cursor-pointer select-none"
              >
                <svg className="size-3.5 text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                </svg>
                <span>{t("filters")}</span>
              </button>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="bg-primary border border-secondary rounded-xl p-12 text-center space-y-3">
                <div className="text-3xl">🔍</div>
                <h4 className="text-sm font-extrabold text-primary">{t("resultsFound")} (0)</h4>
                <p className="text-xs text-secondary max-w-sm mx-auto">{t("noResults")}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((p) => {
                  const titleObj = productTitles[p.title];
                  const localTitle = titleObj?.[locale] || titleObj?.en || p.title;
                  const localCondition = conditions[p.condition]?.[locale] || conditions[p.condition]?.en || p.condition;
                  const localLocation = locationNames[p.location]?.[locale] || locationNames[p.location]?.en || p.location;

                  return (
                    <Link
                      key={p.id}
                      href={getLocalizedLink(`/products/${p.id}`)}
                      className="group bg-primary border border-secondary rounded-xl overflow-hidden hover:border-brand-solid/40 hover:shadow-md transition-all flex flex-col cursor-pointer"
                    >
                      {/* Image container */}
                      <div className="aspect-[4/3] w-full bg-secondary relative overflow-hidden shrink-0">
                        <img
                          src={p.image}
                          alt={localTitle}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        {/* Urgent tag */}
                        {p.urgent && (
                          <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-error-solid text-white text-[9px] font-extrabold uppercase tracking-wider shadow-xs">
                            {t("urgent")}
                          </span>
                        )}
                        {/* Condition tag */}
                        <span className="absolute bottom-2.5 left-2.5 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold">
                          {localCondition}
                        </span>
                      </div>

                      {/* Content panel */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div className="space-y-1">
                          <span className="text-[10px] font-extrabold text-brand-solid uppercase tracking-wider">
                            {en.common[p.category] || p.category}
                          </span>
                          <h4 className="text-xs font-extrabold text-primary line-clamp-2 leading-snug group-hover:text-brand-solid transition-colors">
                            {localTitle}
                          </h4>
                        </div>

                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1 text-[10px] font-semibold text-tertiary">
                            <span className="truncate">{localLocation}</span>
                            <span className="whitespace-nowrap">{p.time}</span>
                          </div>
                          
                          <div className="flex items-center justify-between gap-2 pt-2 border-t border-secondary/50 shrink-0">
                            <span className="text-sm font-extrabold text-brand-solid">
                              {p.price}
                            </span>
                            <span className="text-[9px] font-semibold text-secondary">
                              {p.negotiable ? t("negotiable") : t("fixedPrice")}
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
