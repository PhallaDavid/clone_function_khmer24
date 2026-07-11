"use client";

import React, { useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { products, translations, locationNames } from "@/utils/mock-data";
import { cx } from "@/utils/cx";

const sellerTranslations: Record<string, Record<string, string>> = {
  en: {
    memberSince: "Member since: ",
    verifiedSeller: "Verified Seller",
    callSeller: "Call Seller",
    shareProfile: "Share Profile",
    activeListings: "Active Ads",
    noListings: "No active listings found for this seller.",
    copiedMessage: "Profile link copied to clipboard!",
    ratingLabel: "Seller Rating",
    notFoundTitle: "Seller Showroom Not Found",
    notFoundDesc: "The seller profile you are looking for does not exist, or has been deactivated.",
    backToMarket: "Back to Marketplace"
  },
  kh: {
    memberSince: "សមាជិកតាំងពី៖ ",
    verifiedSeller: "អ្នកលក់ដែលបានបញ្ជាក់អត្តសញ្ញាណ",
    callSeller: "ទូរស័ព្ទទៅអ្នកលក់",
    shareProfile: "ចែករំលែកប្រវត្តិរូប",
    activeListings: "ការផ្សព្វផ្សាយលក់",
    noListings: "មិនមានការផ្សព្វផ្សាយរបស់អ្នកលក់នេះទេ។",
    copiedMessage: "តំណភ្ជាប់ត្រូវបានចម្លងទុក!",
    ratingLabel: "ការវាយតម្លៃរបស់អ្នកលក់",
    notFoundTitle: "មិនរកឃើញទំព័រអ្នកលក់ទេ",
    notFoundDesc: "ប្រវត្តិរូបអ្នកលក់ដែលអ្នកកំពុងស្វែងរកមិនមាន ឬត្រូវបានបិទដំណើរការ។",
    backToMarket: "ត្រឡប់ទៅទំព័រដើមវិញ"
  },
  cn: {
    memberSince: "注册会员年份：",
    verifiedSeller: "实名认证商家",
    callSeller: "拨打电话找商家",
    shareProfile: "分享商家主页",
    activeListings: "在售宝贝广告",
    noListings: "该商家暂无发布中的宝贝宝贝。",
    copiedMessage: "商家主页链接已复制到剪贴板！",
    ratingLabel: "商家信誉评分",
    notFoundTitle: "商家展示厅未找到",
    notFoundDesc: "您所寻找的商家可能未注销或已下线。",
    backToMarket: "返回商城主页"
  }
};

const cleanString = (str: string) => {
  return str.toLowerCase().replace(/[^a-z0-9]/g, "").trim();
};

export default function UserPublicProfilePage() {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => sellerTranslations[locale]?.[key] || key;
  const gl = (key: string) => translations[locale]?.[key] || key;

  // Retrieve current username parameter
  const usernameParam = params.username as string || "";
  const cleanedUsername = cleanString(usernameParam);

  // Find matching seller details from product list using robust matching
  const activeProduct = products.find(
    (p) => cleanString(p.seller.name) === cleanedUsername
  );

  // If no matching seller is found, display a clean "Not Found" UI instead of incorrect fallback details
  if (!activeProduct) {
    return (
      <div className="w-full bg-primary py-12">
        <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
          <Breadcrumbs
            items={[
              { label: t("notFoundTitle"), current: true }
            ]}
            className="py-1"
          />

          <div className="bg-secondary border border-secondary rounded-lg p-12 text-center max-w-xl mx-auto space-y-4 shadow-xs select-none">
            <div className="text-4xl">👤🚫</div>
            <h1 className="text-lg font-extrabold text-primary">{t("notFoundTitle")}</h1>
            <p className="text-xs text-secondary font-semibold max-w-md mx-auto">{t("notFoundDesc")}</p>
            <button
              onClick={() => router.push(`/${locale}`)}
              className="mt-2 px-5 py-2.5 bg-brand-solid text-white hover:bg-brand-solid_hover font-bold text-xs rounded-lg transition-colors cursor-pointer select-none"
            >
              {t("backToMarket")}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const seller = {
    name: activeProduct.seller.name,
    avatar: activeProduct.seller.avatar,
    isVerified: activeProduct.seller.isVerified,
    phone: "+855 12 345 678",
    joined: "June 2021",
    rating: 4.8,
    location: activeProduct.location
  };

  // Filter listings published by this seller using robust matching
  const sellerListings = products.filter(
    (p) => cleanString(p.seller.name) === cleanedUsername
  );

  // States
  const [showPhone, setShowPhone] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="w-full bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: seller.name, current: true }
          ]}
          className="py-1"
        />

        {/* Seller Info Widget Card */}
        <div className="bg-secondary border border-secondary rounded-lg p-6 sm:p-8 flex flex-col md:flex-row gap-6 md:items-center justify-between shadow-xs select-text">
          <div className="flex items-center gap-4">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="size-16 sm:size-20 rounded-full border border-secondary object-cover bg-primary shrink-0 select-none"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-extrabold text-primary tracking-tight">{seller.name}</h1>
                {seller.isVerified && (
                  <span className="inline-flex items-center gap-1 text-[10px] bg-brand-solid/10 text-brand-solid px-2 py-0.5 rounded-full border border-brand-solid/10 font-bold select-none">
                    <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a.75.75 0 00-.708-.523 4.25 4.25 0 00-.05 8.5 3.75 3.75 0 006.183 2.923 4.002 4.002 0 004.81-4.81 3.75 3.75 0 00-2.923-6.183zM10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" clipRule="evenodd"/>
                      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"/>
                    </svg>
                    {t("verifiedSeller")}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 text-xs text-secondary font-semibold">
                <span className="flex text-amber-500 font-bold">★ {seller.rating}</span>
                <span className="text-tertiary">•</span>
                <span>{t("memberSince")}{seller.joined}</span>
                <span className="text-tertiary">•</span>
                <span>{locationNames[seller.location]?.[locale] || seller.location}</span>
              </div>
            </div>
          </div>

          {/* Connect actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowPhone(!showPhone)}
              className="px-5 py-2.5 bg-brand-solid text-white hover:bg-brand-solid_hover font-bold text-xs rounded-lg transition-colors cursor-pointer select-none shadow-xs flex items-center justify-center gap-2"
            >
              <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.824-1.806-5.122-4.104-6.926-6.927l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
              </svg>
              <span>{showPhone ? seller.phone : t("callSeller")}</span>
            </button>
            <div className="relative">
              <button
                onClick={handleShare}
                className="w-full sm:w-auto px-5 py-2.5 bg-primary hover:bg-primary_hover border border-secondary text-secondary font-bold text-xs rounded-lg transition-colors cursor-pointer select-none flex items-center justify-center gap-2"
              >
                <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186l5.308-3.032m-5.308 3.032l5.308 3.033m-5.308-3.033a2.25 2.25 0 113.488 2.186m0-2.186a2.25 2.25 0 103.488-2.186m0 2.186l-5.308-3.033m5.308 3.033a2.25 2.25 0 113.488 2.186" />
                </svg>
                <span>{t("shareProfile")}</span>
              </button>
              {copied && (
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 whitespace-nowrap text-[9px] font-bold text-white bg-black/85 px-2 py-1 rounded-sm shadow-sm animate-scale-in">
                  {t("copiedMessage")}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Listings Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-extrabold text-primary border-b border-secondary pb-3 tracking-wide">
            {t("activeListings")} ({sellerListings.length})
          </h2>

          {sellerListings.length === 0 ? (
            <div className="text-center py-16 text-xs font-bold text-tertiary">
              {t("noListings")}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {sellerListings.map((p) => {
                const translatedCondition = p.condition;
                const translatedLocation = locationNames[p.location]?.[locale] || p.location;

                return (
                  <Link
                    key={p.id}
                    href={`/${locale}/products/${p.id}`}
                    className="group flex flex-col bg-secondary border border-secondary rounded-lg overflow-hidden hover:border-brand-solid/35 transition-all duration-200 cursor-pointer shadow-xs"
                  >
                    {/* Media Aspect */}
                    <div className="relative aspect-video w-full overflow-hidden bg-primary select-none">
                      <img
                        src={p.image}
                        alt={p.title}
                        className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                        loading="lazy"
                      />
                      {p.isUrgent && (
                        <span className="absolute top-2 left-2 text-[9px] bg-red-solid/90 text-white font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider select-none shadow-sm">
                          {gl("urgent")}
                        </span>
                      )}
                    </div>

                    {/* Display info details */}
                    <div className="p-4 flex-1 flex flex-col justify-between space-y-3 select-text">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between gap-1 text-[9px] font-bold text-tertiary uppercase select-none">
                          <span>{translatedCondition}</span>
                          <span>{translatedLocation}</span>
                        </div>
                        <h3 className="text-xs sm:text-sm font-extrabold text-primary group-hover:text-brand-solid transition-colors line-clamp-2">
                          {p.title}
                        </h3>
                      </div>

                      <div className="flex items-center justify-between border-t border-secondary/50 pt-3 select-none">
                        <span className="text-sm font-extrabold text-brand-solid">${p.price.toLocaleString()}</span>
                        {p.isNegotiable && (
                          <span className="text-[9px] bg-brand-solid/10 text-brand-solid font-bold px-2 py-0.5 rounded-full border border-brand-solid/10">
                            {gl("negotiable")}
                          </span>
                        )}
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
  );
}
