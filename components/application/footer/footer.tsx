"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const footerTranslations: Record<string, Record<string, string>> = {
  en: en.footer,
  kh: kh.footer,
  cn: zh.footer,
};

export const Footer = () => {
  const pathname = usePathname();
  
  // Do not render footer on chat pages
  if (pathname.endsWith("/chat") || pathname.includes("/chat/")) {
    return null;
  }

  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => footerTranslations[locale]?.[key] || key;

  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail("");
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer className="w-full bg-secondary border-t border-secondary mt-auto">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-16 space-y-12">
        {/* Top area splits */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Intro col */}
          <div className="lg:col-span-2 space-y-4">
            <UntitledLogo className="h-8" />
            <p className="text-secondary text-sm max-w-sm leading-relaxed">
              {t("description")}
            </p>
            {/* Social widgets */}
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="size-8 rounded-lg bg-primary hover:bg-primary_hover border border-secondary flex items-center justify-center text-secondary transition-colors cursor-pointer" aria-label="Facebook">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/></svg>
              </a>
              <a href="#" className="size-8 rounded-lg bg-primary hover:bg-primary_hover border border-secondary flex items-center justify-center text-secondary transition-colors cursor-pointer" aria-label="Telegram">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2A10 10 0 0 0 2 12a10 10 0 0 0 10 10 10 10 0 0 0 10-10A10 10 0 0 0 12 2zm4.56 7.64l-1.39 6.54c-.1.45-.37.56-.75.35l-2.12-1.56-1.02 1c-.11.11-.21.2-.42.2l.15-2.19 3.99-3.6c.17-.15-.04-.24-.26-.09l-4.93 3.1-2.13-.67c-.46-.15-.47-.46.1-.68l8.3-3.2c.38-.14.72.09.58.73z"/></svg>
              </a>
              <a href="#" className="size-8 rounded-lg bg-primary hover:bg-primary_hover border border-secondary flex items-center justify-center text-secondary transition-colors cursor-pointer" aria-label="YouTube">
                <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.53 3.545 12 3.545 12 3.545s-7.53 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.018 0 12 0 12s0 3.982.502 5.837a3.003 3.003 0 002.11 2.11c1.858.507 9.388.507 9.388.507s7.53 0 9.388-.507a3.003 3.003 0 002.11-2.11C24 15.982 24 12 24 12s0-3.982-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="space-y-4">
            <h4 className="text-secondary font-bold text-xs uppercase tracking-wider">{t("categories")}</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("phones")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("computers")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("cars")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("realEstate")}
                </Link>
              </li>
              <li>
                <Link href="/" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("services")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="space-y-4">
            <h4 className="text-secondary font-bold text-xs uppercase tracking-wider">{t("company")}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("aboutUs")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("careers")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("press")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("contactUs")}
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="space-y-4">
            <h4 className="text-secondary font-bold text-xs uppercase tracking-wider">{t("support")}</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("helpCenter")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("safetyTips")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("avoidScams")}
                </a>
              </li>
              <li>
                <a href="#" className="text-tertiary hover:text-primary transition-colors text-sm font-semibold">
                  {t("faq")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-secondary" />

        {/* Newsletter Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center bg-primary border border-secondary p-6 rounded-lg select-text shadow-xs">
          <div className="lg:col-span-2 space-y-1.5">
            <h4 className="text-base font-extrabold text-primary">{t("newsletterTitle")}</h4>
            <p className="text-secondary text-xs sm:text-sm font-semibold">
              {t("newsletterSubtitle")}
            </p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t("emailPlaceholder")}
              className="flex-1 min-w-0 p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
            />
            <button
              type="submit"
              className="px-4 py-2.5 bg-brand-solid text-white hover:bg-brand-solid_hover text-xs font-bold rounded-lg transition-colors cursor-pointer select-none"
            >
              {t("subscribe")}
            </button>
          </form>
          {subscribed && (
            <div className="lg:col-span-3 text-center text-xs font-bold text-success-solid border border-success-solid/15 bg-success-solid/10 p-2.5 rounded-lg">
              {t("subscribedSuccess")}
            </div>
          )}
        </div>

        {/* Lower footer copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-secondary pt-8 text-[11px] font-bold text-tertiary">
          <span>{t("copyright")}</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition-colors">{t("terms")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("privacy")}</a>
            <a href="#" className="hover:text-primary transition-colors">{t("cookies")}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
