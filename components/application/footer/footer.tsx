"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const footerTranslations: Record<string, Record<string, string>> = {
  en: {
    description: "Cambodia's premier dynamic marketplace to buy and sell premium products, vehicles, properties, electronics, and jobs.",
    newsletterTitle: "Subscribe to our newsletter",
    newsletterSubtitle: "Get the latest updates on new listings, popular tech, and exclusive deals.",
    emailPlaceholder: "Enter your email",
    subscribe: "Subscribe",
    subscribedSuccess: "Thank you for subscribing!",
    copyright: "© 2026 Khmer24 Clone. Built with love using Untitled UI style guide.",
    // Headers
    categories: "Browse Categories",
    company: "Company",
    support: "Help & Support",
    legal: "Legal Links",
    // Company Links
    aboutUs: "About Us",
    careers: "Careers",
    press: "Press Kit",
    contactUs: "Contact Us",
    // Support Links
    helpCenter: "Help Center",
    safetyTips: "Safety Guidelines",
    pricing: "Pricing Plans",
    faq: "FAQ & Support",
    // Legal Links
    terms: "Terms of Service",
    privacy: "Privacy Policy",
    cookies: "Cookie Settings",
    avoidScams: "Avoid Scams",
    // Categories Link terms
    phones: "Phones & Tablets",
    computers: "Computers",
    cars: "Cars & Vehicles",
    realEstate: "Real Estate",
    services: "Professional Services"
  },
  kh: {
    description: "ទីផ្សារពាណិជ្ជកម្មឈានមុខគេនៅកម្ពុជាសម្រាប់ទិញនិងលក់ទូរស័ព្ទ ឡាន ផ្ទះ គ្រឿងអេឡិចត្រូនិច និងការងារ។",
    newsletterTitle: "ចុះឈ្មោះទទួលបានព័ត៌មានថ្មីៗ",
    newsletterSubtitle: "ទទួលបានព័ត៌មានលម្អិតអំពីទំនិញថ្មីៗ គ្រឿងបច្ចេកវិទ្យាល្បីៗ និងការផ្តល់ជូនពិសេស។",
    emailPlaceholder: "បញ្ចូលអុីម៉ែលរបស់អ្នក",
    subscribe: "ចុះឈ្មោះ",
    subscribedSuccess: "សូមអរគុណសម្រាប់ការចុះឈ្មោះរបស់អ្នក!",
    copyright: "© ២០២៦ Khmer24 ជំនាន់ទី២។ បង្កើតឡើងដោយក្តីស្រឡាញ់ ស្របតាមរចនាបថ Untitled UI។",
    // Headers
    categories: "ស្វែងរកតាមចំណាត់ថ្នាក់",
    company: "អំពីក្រុមហ៊ុន",
    support: "ជំនួយ និងការគាំទ្រ",
    legal: "តំណភ្ជាប់ផ្លូវច្បាប់",
    // Company Links
    aboutUs: "អំពីយើង",
    careers: "ឱកាសការងារ",
    press: "ព័ត៌មានសារព័ត៌មាន",
    contactUs: "ទាក់ទងមកយើង",
    // Support Links
    helpCenter: "មជ្ឈមណ្ឌលជំនួយ",
    safetyTips: "គោលការណ៍សុវត្ថិភាព",
    pricing: "កញ្ចប់សេវាកម្ម",
    faq: "សំណួរ និងចម្លើយ",
    // Legal Links
    terms: "លក្ខខណ្ឌប្រើប្រាស់",
    privacy: "នយោបាយឯកជនភាព",
    cookies: "ការកំណត់ឃុកឃី",
    avoidScams: "គេចផុតពីការបោកប្រាស់",
    // Categories Link terms
    phones: "ទូរស័ព្ទ និងថេប្លេត",
    computers: "កុំព្យូទ័រ",
    cars: "រថយន្ត និងយានយន្ត",
    realEstate: "អចលនទ្រព្យ",
    services: "សេវាកម្មអាជីព"
  },
  cn: {
    description: "柬埔寨领先的高端在线市场，可购买与销售手机、二手车、高端公寓、电子配饰和求职招聘。",
    newsletterTitle: "订阅我们的时事通讯",
    newsletterSubtitle: "获取最新发布的商品信息、爆款硬件及独家特惠优惠推送。",
    emailPlaceholder: "输入您的邮箱地址",
    subscribe: "立即订阅",
    subscribedSuccess: "感谢您的订阅！",
    copyright: "© 2026 柬埔寨Khmer24克隆版。致敬 Untitled UI 体验设计。",
    // Headers
    categories: "分类浏览",
    company: "关于我们公司",
    support: "客户帮助中心",
    legal: "法律条款合规",
    // Company Links
    aboutUs: "关于我们",
    careers: "诚聘英才",
    press: "媒体新闻稿",
    contactUs: "联系我们",
    // Support Links
    helpCenter: "帮助中心",
    safetyTips: "安全交易指南",
    pricing: "服务定价价格表",
    faq: "常见问题解答",
    // Legal Links
    terms: "使用服务协议",
    privacy: "隐私保护政策",
    cookies: "Cookies个性化配置",
    avoidScams: "防范诈骗指南",
    // Categories Link terms
    phones: "手机与平板配件",
    computers: "笔记本与台式机",
    cars: "轿车与各类载具",
    realEstate: "房屋店铺租赁",
    services: "专业生活服务"
  }
};

export const Footer = () => {
  const pathname = usePathname();
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
            <div className="flex items-center gap-2">
              <div className="size-8 rounded-lg bg-brand-solid flex items-center justify-center text-white font-extrabold text-lg shadow-sm">
                K
              </div>
              <span className="text-lg font-extrabold text-primary tracking-tight">
                Khmer24<span className="text-brand-solid">.</span>
              </span>
            </div>
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
