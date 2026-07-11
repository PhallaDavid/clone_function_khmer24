"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { locationNames, conditions } from "@/utils/mock-data";
import { cx } from "@/utils/cx";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const postTranslations: Record<string, Record<string, string>> = {
  en: en.post,
  kh: kh.post,
  cn: zh.post,
};

const categoryOptions = [
  { name: "Phones & Tablets", icon: "📱", iconColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/20" },
  { name: "Computers", icon: "💻", iconColor: "text-violet-500 bg-violet-50 dark:bg-violet-950/20" },
  { name: "Cars & Vehicles", icon: "🚗", iconColor: "text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20" },
  { name: "Real Estate", icon: "🏠", iconColor: "text-amber-500 bg-amber-50 dark:bg-amber-950/20" },
  { name: "Fashion & Beauty", icon: "👜", iconColor: "text-pink-500 bg-pink-50 dark:bg-pink-950/20" },
  { name: "Furniture & Decor", icon: "🛋️", iconColor: "text-indigo-500 bg-indigo-50 dark:bg-indigo-950/20" },
  { name: "Jobs", icon: "💼", iconColor: "text-orange-500 bg-orange-50 dark:bg-orange-950/20" },
  { name: "Services", icon: "🛠️", iconColor: "text-cyan-500 bg-cyan-50 dark:bg-cyan-950/20" }
];

const mockUploadedImages = [
  "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=300&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?q=80&w=300&auto=format&fit=crop"
];

export default function PostAdPage() {
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => postTranslations[locale]?.[key] || key;

  // Form states
  const [selectedCategory, setSelectedCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [sellerName, setSellerName] = useState("");
  const [phone, setPhone] = useState("");
  
  // Custom mock photo upload flow
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [postedAd, setPostedAd] = useState<{ id: number; title: string } | null>(null);

  const handleSimulatedUpload = () => {
    if (uploadedPhotos.length >= 3) return;
    const nextPhoto = mockUploadedImages[uploadedPhotos.length];
    setUploadedPhotos((prev) => [...prev, nextPhoto]);
  };

  const handleRemovePhoto = (idx: number) => {
    setUploadedPhotos((prev) => prev.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCategory) return alert("Please select a category first.");
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setPostedAd({
        id: 9, // New simulated ID
        title: title || "New listing"
      });
    }, 2000);
  };

  const handleReset = () => {
    setSelectedCategory("");
    setTitle("");
    setDescription("");
    setPrice("");
    setNegotiable(true);
    setCondition("");
    setLocation("");
    setSellerName("");
    setPhone("");
    setUploadedPhotos([]);
    setPostedAd(null);
  };

  return (
    <div className="w-full bg-primary py-6">
      {/* Content center */}
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: t("pageTitle"), current: true }
          ]}
          className="py-1"
        />

        {/* Loading overlay panel */}
        {isLoading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/75 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center p-6 bg-secondary border border-secondary shadow-xl rounded-lg w-52 h-44 animate-scale-in">
              <svg className="animate-spin h-9 w-9 text-brand-solid" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              <span className="text-sm font-bold text-primary mt-4 tracking-wide">{t("postingAd")}</span>
            </div>
          </div>
        )}

        {/* Header Intro */}
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-primary">{t("pageTitle")}</h1>
          <p className="text-secondary text-xs sm:text-sm mt-1">
            {t("pageSubtitle")}
          </p>
        </div>

        {postedAd ? (
          /* Success Screen Card */
          <div className="border border-success-solid/20 bg-success-solid/5 rounded-lg p-6 sm:p-8 text-center space-y-6 animate-scale-in">
            <div className="size-16 bg-success-solid/10 text-success-solid rounded-full flex items-center justify-center mx-auto">
              <svg className="size-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-primary">{t("postSuccess")}</h2>
              <p className="text-secondary text-xs sm:text-sm font-semibold max-w-md mx-auto">
                {title} has been successfully added to the marketplace.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                onClick={() => router.push(`/${locale}/products/1`)}
                className="px-5 py-2.5 bg-brand-solid text-white font-bold rounded-lg text-sm hover:bg-brand-solid_hover cursor-pointer transition-colors shadow-xs"
              >
                {t("viewAd")}
              </button>
              <button
                onClick={handleReset}
                className="px-5 py-2.5 bg-primary border border-secondary text-secondary font-bold rounded-lg text-sm hover:bg-primary_hover cursor-pointer transition-colors"
              >
                {t("postAnother")}
              </button>
            </div>
          </div>
        ) : (
          /* Main listing creation form */
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* 1. Category grid selection cards */}
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("categorySelect")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {categoryOptions.map((opt) => (
                  <button
                    key={opt.name}
                    type="button"
                    onClick={() => setSelectedCategory(opt.name)}
                    className={cx(
                      "flex flex-col items-center justify-center p-4 rounded-lg border text-center transition-all cursor-pointer",
                      selectedCategory === opt.name
                        ? "border-brand-solid bg-brand-solid/5 shadow-xs"
                        : "border-secondary hover:border-brand-solid/35 bg-primary"
                    )}
                  >
                    <span className={cx("size-10 rounded-lg flex items-center justify-center text-lg mb-2 shadow-xs", opt.iconColor)}>
                      {opt.icon}
                    </span>
                    <span className="text-[11px] sm:text-xs font-bold text-primary truncate max-w-full">
                      {opt.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Ad Detail Inputs Fieldset */}
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("detailsTitle")}
              </h3>
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("titleLabel")} *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={t("titlePlaceholder")}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("descLabel")} *</label>
                  <textarea
                    required
                    rows={4}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder={t("descPlaceholder")}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* 3. Pricing and Conditions Fieldset */}
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("pricingTitle")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("priceLabel")} *</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder={t("pricePlaceholder")}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("conditionLabel")} *</label>
                  <select
                    required
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold cursor-pointer"
                  >
                    <option value="">{t("selectCondition")}</option>
                    {Object.keys(conditions).map((cond) => (
                      <option key={cond} value={cond}>
                        {conditions[cond]?.[locale] || cond}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Negotiable switch toggler */}
                <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-lg border border-secondary bg-secondary_alt/30 select-none">
                  <div className="space-y-0.5">
                    <div className="text-xs font-bold text-primary">{t("negotiableLabel")}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setNegotiable(!negotiable)}
                    className={cx(
                      "relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-hidden",
                      negotiable ? "bg-brand-solid" : "bg-black/25 dark:bg-white/20"
                    )}
                  >
                    <span
                      className={cx(
                        "pointer-events-none inline-block size-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out",
                        negotiable ? "translate-x-5" : "translate-x-0"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Upload photo grids */}
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("photosTitle")}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {/* Image upload simulator slots */}
                {uploadedPhotos.map((photo, index) => (
                  <div key={index} className="relative aspect-square rounded-lg border border-secondary overflow-hidden bg-secondary shadow-xs group animate-scale-in">
                    <img src={photo} alt="simulated upload" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => handleRemovePhoto(index)}
                      className="absolute top-1 right-1 size-6 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
                {uploadedPhotos.length < 3 && (
                  <button
                    type="button"
                    onClick={handleSimulatedUpload}
                    className="aspect-square border-2 border-dashed border-secondary hover:border-brand-solid/35 rounded-lg flex flex-col items-center justify-center text-center p-3 cursor-pointer bg-secondary_alt/10 hover:bg-secondary_alt/20 transition-all font-semibold"
                  >
                    <span className="text-xl mb-1">📸</span>
                    <span className="text-[10px] text-tertiary truncate max-w-full">{t("dragDrop")}</span>
                    <span className="text-[8px] text-fg-quaternary mt-1 truncate max-w-full">{t("uploadLimit")}</span>
                  </button>
                )}
              </div>
            </div>

            {/* 5. Contacts info */}
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-4">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("contactTitle")}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("nameLabel")} *</label>
                  <input
                    type="text"
                    required
                    value={sellerName}
                    onChange={(e) => setSellerName(e.target.value)}
                    placeholder={t("namePlaceholder")}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("locationLabel")} *</label>
                  <select
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold cursor-pointer"
                  >
                    <option value="">{t("selectLocation")}</option>
                    {Object.keys(locationNames).map((loc) => (
                      <option key={loc} value={loc}>
                        {locationNames[loc]?.[locale] || loc}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="text-xs font-bold text-secondary">{t("phoneLabel")} *</label>
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={t("phonePlaceholder")}
                    className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                  />
                </div>
              </div>
            </div>

            {/* Form submit button action */}
            <button
              type="submit"
              className="w-full py-3.5 bg-brand-solid text-white hover:bg-brand-solid_hover rounded-lg text-xs font-extrabold uppercase tracking-wider transition-colors cursor-pointer select-none shadow-sm"
            >
              {t("submitButton")}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
