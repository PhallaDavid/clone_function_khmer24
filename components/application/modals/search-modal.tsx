"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { cx } from "@/utils/cx";
import { categories, products, locationNames } from "@/utils/mock-data";

interface SearchModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const searchTranslations: Record<string, Record<string, string>> = {
  en: en.search,
  kh: kh.search,
  cn: zh.search,
};

const searchIcon = (
  <svg className="size-5 text-fg-quaternary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const closeIcon = (
  <svg className="size-4 text-fg-quaternary hover:text-primary transition-colors" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const recentSearchesMock = {
  en: ["iPhone 15 Pro", "Toyota Prius", "BKK1 Condo", "Rolex watch"],
  kh: ["iPhone 15 Pro", "Toyota Prius", "ខុនដូ BKK1", "នាឡិកាដៃ Rolex"],
  cn: ["iPhone 15 普罗", "普锐斯汽车", "BKK1公寓", "劳力士手表"]
};

export const SearchModal = ({ isOpen, onOpenChange }: SearchModalProps) => {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";

  const t = (key: string) => searchTranslations[locale]?.[key] || key;

  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Global keydown listener for Cmd+K or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!isOpen);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onOpenChange]);

  // Autofocus when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  // Normalize queries for search string matching
  const searchResults = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { categories: [], products: [], locations: [], total: 0 };
    }

    // Filter categories
    const matchedCategories = categories.filter((cat) => {
      return cat.name.toLowerCase().includes(trimmed);
    });

    // Filter products
    const matchedProducts = products.filter((p) => {
      const titleMatched = p.title.toLowerCase().includes(trimmed);
      const catMatched = p.category.toLowerCase().includes(trimmed);
      return titleMatched || catMatched;
    });

    // Filter locations
    const matchedLocations = Object.keys(locationNames).filter((locKey) => {
      const loc = locationNames[locKey];
      return (
        locKey.toLowerCase().includes(trimmed) ||
        loc.en.toLowerCase().includes(trimmed) ||
        loc.kh.toLowerCase().includes(trimmed) ||
        loc.cn.toLowerCase().includes(trimmed)
      );
    });

    const total = matchedCategories.length + matchedProducts.length + matchedLocations.length;

    return {
      categories: matchedCategories,
      products: matchedProducts,
      locations: matchedLocations,
      total
    };
  }, [query]);

  // Create flat selection list for keyboard navigation
  const flatItems = useMemo(() => {
    const items: Array<{
      type: "category" | "product" | "location";
      name: string;
      subtitle?: string;
      badge?: string;
      image?: string;
    }> = [];

    searchResults.categories.forEach((cat) => {
      items.push({
        type: "category",
        name: cat.name,
        badge: t("categories")
      });
    });

    searchResults.products.forEach((p) => {
      items.push({
        type: "product",
        name: p.title,
        subtitle: p.price,
        image: p.image,
        badge: t("products")
      });
    });

    searchResults.locations.forEach((locKey) => {
      const loc = locationNames[locKey];
      items.push({
        type: "location",
        name: loc[locale] || locKey,
        badge: t("locations")
      });
    });

    return items;
  }, [searchResults, locale, t]);

  // Reset selectedIndex if it goes out of bounds
  useEffect(() => {
    if (selectedIndex >= flatItems.length) {
      setSelectedIndex(0);
    }
  }, [flatItems, selectedIndex]);

  // Handle arrow key and enter keyboard navigation inside result list
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (flatItems.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      const activeItem = flatItems[selectedIndex];
      if (activeItem) {
        console.log("Selected Item:", activeItem);
        // Simulation path navigation trigger or queries
        onOpenChange(false);
      }
    }
  };

  const handleSelectRecent = (val: string) => {
    setQuery(val);
    inputRef.current?.focus();
  };

  return (
    <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange}>
      <Modal className="w-full max-w-xl border border-secondary shadow-2xl backdrop-blur-md rounded-lg overflow-hidden bg-primary/95">
        <Dialog className="p-0 select-none">
          {/* Header search bar */}
          <div className="flex items-center gap-3 px-4 py-3.5 border-b border-secondary">
            {searchIcon}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={t("placeholder")}
              className="flex-1 bg-transparent border-0 outline-hidden text-sm font-medium text-primary placeholder-fg-quaternary focus:ring-0"
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="p-1 rounded-md hover:bg-secondary transition-colors"
                aria-label="Clear search"
              >
                {closeIcon}
              </button>
            )}
            <kbd className="hidden sm:inline-flex items-center gap-0.5 px-2 py-0.5 rounded-sm border border-secondary bg-secondary text-[10px] font-medium text-tertiary">
              {t("escToClose")}
            </kbd>
          </div>

          {/* Results/Suggestion Lists Area */}
          <div className="max-h-[380px] overflow-y-auto p-4 space-y-5">
            {!query ? (
              <>
                {/* Recent Searches */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3">
                    {t("recentSearches")}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {(recentSearchesMock[locale] || recentSearchesMock.en).map((term, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectRecent(term)}
                        className="px-3 py-1.5 text-xs text-secondary bg-secondary hover:bg-primary_hover border border-secondary rounded-lg transition-colors font-medium cursor-pointer"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Popular Categories */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-secondary mb-3">
                    {t("popularCategories")}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.slice(0, 4).map((cat, i) => (
                      <button
                        key={i}
                        onClick={() => handleSelectRecent(cat.name)}
                        className="flex items-center gap-3 p-2.5 rounded-lg border border-secondary text-left text-xs font-semibold text-primary hover:border-brand-solid/40 hover:bg-secondary/40 transition-colors"
                      >
                        <div className={`size-8 rounded-lg bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white shrink-0`}>
                          {cat.icon("size-4")}
                        </div>
                        <span className="truncate">{cat.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : flatItems.length > 0 ? (
              <div className="space-y-1">
                {flatItems.map((item, idx) => {
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={idx}
                      onMouseEnter={() => setSelectedIndex(idx)}
                      onClick={() => onOpenChange(false)}
                      className={cx(
                        "flex items-center gap-3 p-3 rounded-lg border select-none transition-all cursor-pointer",
                        isSelected
                          ? "bg-brand-solid/5 border-brand-solid/30 text-brand-solid shadow-xs"
                          : "bg-transparent border-transparent text-primary hover:bg-secondary/40"
                      )}
                    >
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="size-10 rounded-lg object-cover bg-secondary border border-secondary shrink-0"
                        />
                      ) : (
                        <div className={cx(
                          "size-10 rounded-lg flex items-center justify-center shrink-0 border",
                          isSelected
                            ? "bg-brand-solid/10 border-brand-solid/20 text-brand-solid"
                            : "bg-secondary border-secondary text-secondary"
                        )}>
                          {item.type === "category" ? (
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                              <rect x="3" y="3" width="7" height="9" rx="1" />
                              <rect x="14" y="3" width="7" height="5" rx="1" />
                              <rect x="14" y="12" width="7" height="9" rx="1" />
                              <rect x="3" y="16" width="7" height="5" rx="1" />
                            </svg>
                          ) : (
                            <svg className="size-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          )}
                        </div>
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold truncate">
                            {item.name}
                          </span>
                          <span className={cx(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0",
                            isSelected
                              ? "bg-brand-solid/15 text-brand-solid"
                              : "bg-secondary text-tertiary"
                          )}>
                            {item.badge}
                          </span>
                        </div>
                        {item.subtitle && (
                          <div className="text-xs font-semibold text-brand-solid mt-0.5">
                            {item.subtitle}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="py-12 text-center">
                <div className="inline-flex size-12 rounded-full bg-secondary border border-secondary text-secondary items-center justify-center mb-3">
                  <svg className="size-6 text-fg-quaternary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-sm font-bold text-primary">
                  {t("noResults")} <span className="text-brand-solid">"{query}"</span>
                </h3>
                <p className="text-xs text-secondary mt-1 max-w-sm mx-auto">
                  {t("tryDifferent")}
                </p>
              </div>
            )}
          </div>
        </Dialog>
      </Modal>
    </ModalOverlay>
  );
};
