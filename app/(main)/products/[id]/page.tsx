"use client";

import React, { useState, useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { products, productTitles, locationNames, conditions, timeTranslations } from "@/utils/mock-data";
import { cx } from "@/utils/cx";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const detailTranslations: Record<string, Record<string, string>> = {
  en: en.detail,
  kh: kh.detail,
  cn: zh.detail,
};

export default function ProductDetailPage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => detailTranslations[locale]?.[key] || key;

  const id = Number(params?.id);
  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [activeImage, setActiveImage] = useState<string>(product?.image || "");
  const [showPhone, setShowPhone] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  const [likes, setLikes] = useState(14);
  const [hasLiked, setHasLiked] = useState(false);

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <h2 className="text-xl font-bold text-primary mb-2">Product Not Found</h2>
        <p className="text-secondary text-sm mb-6">The listing you are looking for does not exist or has been removed.</p>
        <Link href="/" className="px-4 py-2 bg-brand-solid text-white rounded-lg font-semibold hover:bg-brand-solid_hover transition-colors text-sm">
          {t("backToHome")}
        </Link>
      </div>
    );
  }

  // Pre-selected gallery lists
  const gallery = [
    product.image,
    "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop"
  ];

  // Specific spec properties mapping
  const specs = {
    "Phones & Tablets": { [t("brand")]: "Apple", [t("model")]: "15 Pro Max", [t("year")]: "2023" },
    Computers: { [t("brand")]: "Apple", [t("model")]: "MacBook Pro M3", [t("year")]: "2023" },
    "Cars & Vehicles": { [t("brand")]: "Toyota", [t("model")]: "Prius Option 4", [t("year")]: "2010" },
    "Real Estate": { [t("brand")]: "BKK1 Condo", [t("model")]: "1 Bed Style", [t("year")]: "2021" },
    Electronics: { [t("brand")]: "Sony", [t("model")]: "WH-1000XM5", [t("year")]: "2022" },
    "Fashion & Beauty": { [t("brand")]: "Rolex", [t("model")]: "Submariner 41", [t("year")]: "2022" },
    "Furniture & Decor": { [t("brand")]: "Modern Ltd", [t("model")]: "Ergonomic Lumbar", [t("year")]: "2023" },
    Services: { [t("brand")]: "Aha Trans", [t("model")]: "Khmer-En-Cn", [t("year")]: "2024" },
  }[product.category] || { [t("brand")]: "Generic", [t("model")]: "Standard Model", [t("year")]: "2022" };

  const related = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 3);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    setMessageSent(true);
    setMessage("");
    setTimeout(() => setMessageSent(false), 3000);
  };

  const handleLike = () => {
    if (hasLiked) {
      setLikes((prev) => prev - 1);
      setHasLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setHasLiked(true);
    }
  };

  // Get locale translations
  const translatedTitle = productTitles[product.title]?.[locale] || product.title;
  const translatedLocation = locationNames[product.location]?.[locale] || product.location;
  const translatedCondition = conditions[product.condition]?.[locale] || product.condition;
  const translatedTime = timeTranslations[product.time]?.[locale] || product.time;

  return (
    <div className="w-full bg-primary py-6">
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        {/* Custom Breadcrumbs component */}
        <Breadcrumbs
          items={[
            { label: t("productDetails"), href: "#" },
            { label: product.category, href: "/" },
            { label: translatedTitle, current: true }
          ]}
          className="py-2"
        />

        {/* Product Grid splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Main Visuals & Specifications Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Gallery card panel */}
            <div className="bg-primary border border-secondary rounded-lg overflow-hidden shadow-xs">
              {/* Primary viewport image */}
              <div className="relative aspect-4/3 w-full bg-secondary select-none">
                <img
                  src={activeImage || product.image}
                  alt={product.title}
                  className="w-full h-full object-cover transition-all"
                />
                {product.isUrgent && (
                  <div className="absolute top-4 left-4 inline-flex px-3 py-1 rounded bg-fg-error-primary text-white text-[10px] sm:text-xs font-bold uppercase tracking-wider shadow-md">
                    {t("urgent")}
                  </div>
                )}
                {/* Like buttons float */}
                <button
                  onClick={handleLike}
                  className="absolute top-4 right-4 size-10 rounded-full border border-secondary bg-primary/90 flex items-center justify-center cursor-pointer shadow-sm hover:scale-105 active:scale-95 transition-all text-secondary"
                >
                  <svg
                    className={cx("size-5 transition-colors", hasLiked ? "fill-red-500 stroke-red-500" : "currentColor")}
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Thumbnails row selection */}
              <div className="flex gap-2 p-3 bg-secondary_alt/50 border-t border-secondary overflow-x-auto">
                {gallery.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImage(img)}
                    className={cx(
                      "size-16 sm:size-20 rounded-lg overflow-hidden border-2 shrink-0 transition-all cursor-pointer bg-secondary",
                      activeImage === img ? "border-brand-solid" : "border-transparent opacity-70 hover:opacity-100"
                    )}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Info and specifications card grid */}
            <div className="border border-secondary bg-primary rounded-lg p-6 space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-primary pt-1">
                  {translatedTitle}
                </h1>
                <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 text-xs font-semibold text-secondary">
                  <span className="flex items-center gap-1">
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {translatedTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {120 + product.id} {t("viewAd")}
                  </span>
                  <span className="flex items-center gap-1">
                    <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {likes} Likes
                  </span>
                </div>
              </div>

              {/* Price section bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg bg-secondary_alt/30 border border-secondary">
                <div className="space-y-1">
                  <div className="text-2xl sm:text-3xl font-extrabold text-brand-solid">
                    {product.price}
                  </div>
                  <div className="text-xs font-semibold text-tertiary">
                    {product.isNegotiable ? t("negotiable") : t("fixedPrice")}
                  </div>
                </div>
                {product.isNegotiable && (
                  <span className="px-3 py-1 text-xs font-bold text-brand-solid bg-brand-solid/10 rounded-full select-none">
                    {t("negotiable")}
                  </span>
                )}
              </div>

              {/* Specs Grid list */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-secondary border-b border-secondary pb-3 mb-4">
                  {t("specifications")}
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="p-3 bg-secondary rounded-lg border border-secondary">
                    <div className="text-[10px] uppercase font-bold text-tertiary">{t("condition")}</div>
                    <div className="text-sm font-extrabold text-primary mt-1">{translatedCondition}</div>
                  </div>
                  <div className="p-3 bg-secondary rounded-lg border border-secondary">
                    <div className="text-[10px] uppercase font-bold text-tertiary">{t("location")}</div>
                    <div className="text-sm font-extrabold text-primary mt-1">{translatedLocation}</div>
                  </div>
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="p-3 bg-secondary rounded-lg border border-secondary">
                      <div className="text-[10px] uppercase font-bold text-tertiary">{key}</div>
                      <div className="text-sm font-extrabold text-primary mt-1">{value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Seller Profile & Quick Message Block */}
          <div className="space-y-6">
            {/* Seller profile panel */}
            <div className="border border-secondary bg-primary rounded-lg p-6 space-y-6 shadow-xs">
              <Link
                href={`/${locale}/user/${product.seller.name.toLowerCase().replace(/\s+/g, "-")}`}
                className="flex items-center gap-4 hover:opacity-85 transition-opacity"
              >
                <img
                  src={product.seller.avatar}
                  alt={product.seller.name}
                  className="size-14 rounded-full border border-secondary bg-secondary shrink-0 object-cover"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold text-primary hover:text-brand-solid transition-colors">{product.seller.name}</span>
                    {product.seller.isVerified && (
                      <svg className="size-4 text-brand-solid" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523 4.25 4.25 0 00-.05 8.5 3.75 3.75 0 006.183 2.923 4.002 4.002 0 004.81-4.81 3.75 3.75 0 00-2.923-6.183zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd"/>
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                      </svg>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5 text-xs text-secondary font-semibold">
                    <span className="size-2 rounded-full bg-success-solid animate-pulse" />
                    {t("sellerStatus")}
                  </div>
                </div>
              </Link>

              {/* Reveal Phone Actions */}
              <div className="space-y-3">
                <button
                  onClick={() => setShowPhone(!showPhone)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-lg border border-brand-solid bg-brand-solid text-white hover:bg-brand-solid_hover text-sm font-semibold select-none cursor-pointer transition-colors shadow-xs"
                >
                  <svg className="size-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                  </svg>
                  <span>{showPhone ? "+855 12 345 678" : t("showPhone")}</span>
                </button>
              </div>

              <hr className="border-secondary" />

              {/* Chat action form */}
              <form onSubmit={handleSendMessage} className="space-y-3">
                <div className="text-xs font-bold text-secondary uppercase tracking-wider">
                  {t("contactSeller")}
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("messageSellerPlaceholder")}
                  rows={3}
                  className="w-full p-3 text-xs bg-secondary border border-secondary rounded-lg outline-hidden text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg border border-secondary bg-primary hover:bg-primary_hover text-xs font-semibold text-secondary transition-colors cursor-pointer"
                >
                  {t("sendMessage")}
                </button>
                {messageSent && (
                  <div className="p-2 py-1.5 border border-success-solid/25 bg-success-solid/10 text-success-solid rounded-lg text-[10px] sm:text-xs font-semibold text-center animate-fade-in">
                    {t("messageSuccess")}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Related listings segment */}
        <div className="border border-secondary bg-primary rounded-lg p-6 space-y-5">
          <h3 className="text-base font-extrabold text-primary">
            {t("relatedProducts")}
          </h3>
          {related.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {related.map((prod) => {
                const relTitle = productTitles[prod.title]?.[locale] || prod.title;
                const relLoc = locationNames[prod.location]?.[locale] || prod.location;
                return (
                  <Link
                    key={prod.id}
                    href={`/${locale}/products/${prod.id}`}
                    onClick={() => {
                      // Reset states
                      setActiveImage(prod.image);
                      setShowPhone(false);
                    }}
                    className="group flex flex-col bg-secondary border border-secondary rounded-lg overflow-hidden hover:border-brand-solid/35 transition-all select-none"
                  >
                    <div className="relative aspect-4/3 w-full bg-secondary overflow-hidden shrink-0">
                      <img
                        src={prod.image}
                        alt={prod.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-3.5 flex flex-col flex-1 min-w-0 justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-brand-solid uppercase tracking-wider">
                          {prod.category}
                        </span>
                        <h4 className="text-xs font-bold text-primary truncate max-w-full group-hover:text-brand-solid transition-colors pt-0.5">
                          {relTitle}
                        </h4>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-4 pt-1 border-t border-secondary">
                        <span className="text-sm font-extrabold text-brand-solid">{prod.price}</span>
                        <span className="text-[10px] font-semibold text-tertiary select-text">{relLoc}</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="py-8 text-center text-xs font-semibold text-tertiary">
              {t("noRelated")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
