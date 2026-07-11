"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { Bell01, MessageSquare01, Tag01, Trash01, Check } from "@untitledui/icons";
import { cx } from "@/utils/cx";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const translations: Record<string, Record<string, string>> = {
  en,
  kh,
  cn: zh,
};

type NotificationItem = {
  id: string;
  type: "unread" | "offers" | "system";
  titleEn: string;
  titleKh: string;
  titleCn: string;
  descEn: string;
  descKh: string;
  descCn: string;
  timeEn: string;
  timeKh: string;
  timeCn: string;
  read: boolean;
  image?: string;
  actionText?: string;
  actionUrl?: string;
  hasOfferActions?: boolean;
  price?: string;
};

const initialNotifications: NotificationItem[] = [
  {
    id: "1",
    type: "offers",
    titleEn: "New Offer Received",
    titleKh: "ទទួលបានការផ្តល់ជូនថ្មី",
    titleCn: "收到新报价",
    descEn: "Dara S. offered $950 for your iPhone 15 Pro Max (Asking price: $1,099)",
    descKh: "Dara S. បានផ្តល់ជូនតម្លៃ $950 សម្រាប់ iPhone 15 Pro Max របស់អ្នក (តម្លៃលក់: $1,099)",
    descCn: "Dara S. 为您的 iPhone 15 Pro Max 报价 $950 (售价: $1,099)",
    timeEn: "5 mins ago",
    timeKh: "5 នាទីមុន",
    timeCn: "5 分钟前",
    read: false,
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=120&auto=format&fit=crop",
    hasOfferActions: true,
    price: "$950"
  },
  {
    id: "2",
    type: "unread",
    titleEn: "Message from Sophy K.",
    titleKh: "សារពី Sophy K.",
    titleCn: "来自 Sophy K. 的消息",
    descEn: "\"Is the price negotiable? I can pick it up today.\"",
    descKh: "\"តើតម្លៃអាចចរចាបានទេ?  myការទៅយកថ្ងៃនេះបាន។\"",
    descCn: "\"价格可以便宜点吗？我今天可以去拿。\"",
    timeEn: "2 hours ago",
    timeKh: "2 ម៉ោងមុន",
    timeCn: "2 小时前",
    read: false,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
  },
  {
    id: "3",
    type: "system",
    titleEn: "Listing Approved",
    titleKh: "ការដាក់លក់ទំនិញត្រូវបានអនុម័ត",
    titleCn: "商品已通过审核",
    descEn: "Your listing 'MacBook Pro M3 Max' has been approved and is now live.",
    descKh: "ការដាក់លក់ 'MacBook Pro M3 Max' របស់អ្នកត្រូវបានអនុម័ត និងផ្សាយផ្ទាល់ហើយ។",
    descCn: "您的商品 'MacBook Pro M3 Max' 已通过审核，现已上架。",
    timeEn: "1 day ago",
    timeKh: "1 ថ្ងៃមុន",
    timeCn: "1 天前",
    read: true,
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "4",
    type: "offers",
    titleEn: "Offer Countered",
    titleKh: "ការតថ្លៃត្រឡប់មកវិញ",
    titleCn: "收到还价",
    descEn: "Vannak T. countered your offer with $420 on Sony WH-1000XM5.",
    descKh: "Vannak T. បានតថ្លៃត្រឡប់មកវិញចំនួន $420 លើ Sony WH-1000XM5។",
    descCn: "Vannak T. 针对索尼 WH-1000XM5 提出了 $420 的还价。",
    timeEn: "2 days ago",
    timeKh: "2 ថ្ងៃមុន",
    timeCn: "2 天前",
    read: true,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=120&auto=format&fit=crop"
  },
  {
    id: "5",
    type: "system",
    titleEn: "Account Security Alert",
    titleKh: "ការជូនដំណឹងអំពីសុវត្ថិភាពគណនី",
    titleCn: "账户安全警报",
    descEn: "A new login was detected from a Windows device in Phnom Penh.",
    descKh: "ការចូលគណនីថ្មីត្រូវបានរកឃើញពីឧបករណ៍ Windows នៅភ្នំពេញ។",
    descCn: "检测到来自金边 Windows 设备的新登录。",
    timeEn: "3 days ago",
    timeKh: "3 ថ្ងៃមុន",
    timeCn: "3 天前",
    read: true
  }
];

export default function NotificationsPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const currentLocale = ["en", "kh", "cn"].includes(segments[1]) ? segments[1] : "en";
  const t = translations[currentLocale] || translations.en;

  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [activeTab, setActiveTab] = useState<"all" | "unread" | "offers" | "system">("all");

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: !n.read } : n));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeTab === "all") return true;
    if (activeTab === "unread") return !n.read;
    return n.type === activeTab;
  });

  const getBreadcrumbsItems = () => {
    return [
      { label: currentLocale === "kh" ? "ទំព័រដើម" : currentLocale === "cn" ? "首页" : "Home", href: `/${currentLocale}` },
      { label: t.title, href: `/${currentLocale}/notifications` },
    ];
  };

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "offers":
        return <Tag01 className="size-5 text-brand-solid" />;
      case "system":
        return <Bell01 className="size-5 text-indigo-500" />;
      default:
        return <MessageSquare01 className="size-5 text-blue-500" />;
    }
  };

  return (
    <div className="w-full bg-primary py-8 min-h-[calc(100vh-64px)]">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        {/* Breadcrumbs */}
        <div className="mb-6">
          <Breadcrumbs items={getBreadcrumbsItems()} />
        </div>

        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-secondary mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary">{t.title}</h1>
            <p className="mt-1.5 text-sm text-tertiary">{t.subtitle}</p>
          </div>
          {notifications.length > 0 && (
            <div className="flex items-center gap-3 self-start md:self-auto">
              <button
                onClick={markAllRead}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-solid hover:text-brand-solid_hover px-3 py-1.5 rounded-lg border border-brand-solid/35 transition-colors cursor-pointer bg-brand-solid/5"
              >
                <Check className="size-3.5" />
                {t.markAllRead}
              </button>
              <button
                onClick={clearAll}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-error hover:text-error/80 px-3 py-1.5 rounded-lg border border-error/35 transition-colors cursor-pointer bg-error/5"
              >
                <Trash01 className="size-3.5" />
                {t.clearAll}
              </button>
            </div>
          )}
        </div>

        {/* Content Wrapper */}
        <div className="flex flex-col gap-6">
          {/* Tabs Filter */}
          <div className="flex border-b border-secondary overflow-x-auto whitespace-nowrap gap-1">
            {(["all", "unread", "offers", "system"] as const).map((tab) => {
              const count = tab === "all" 
                ? notifications.length 
                : tab === "unread" 
                  ? notifications.filter(n => !n.read).length
                  : notifications.filter(n => n.type === tab).length;

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cx(
                    "px-4 py-2.5 text-sm font-semibold border-b-2 transition-colors cursor-pointer relative",
                    activeTab === tab
                      ? "border-brand-solid text-brand-solid"
                      : "border-transparent text-tertiary hover:text-secondary hover:border-secondary"
                  )}
                >
                  {t[tab]}
                  {count > 0 && (
                    <span className={cx(
                      "ml-1.5 px-1.5 py-0.5 text-xxs font-bold rounded-full",
                      tab === "unread" || (tab === "all" && notifications.some(n => !n.read))
                        ? "bg-brand-solid text-white animate-pulse"
                        : "bg-secondary text-secondary"
                    )}>
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Notifications List */}
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 px-4 border border-secondary border-dashed rounded-xl bg-primary_hover/10">
              <div className="size-12 rounded-full bg-secondary/40 flex items-center justify-center mb-4">
                <Bell01 className="size-6 text-tertiary" />
              </div>
              <h3 className="text-lg font-bold text-primary">{t.emptyTitle}</h3>
              <p className="text-sm text-tertiary mt-1 text-center max-w-xs">{t.emptySubtitle}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {filteredNotifications.map((notif) => {
                const title = currentLocale === "kh" ? notif.titleKh : currentLocale === "cn" ? notif.titleCn : notif.titleEn;
                const desc = currentLocale === "kh" ? notif.descKh : currentLocale === "cn" ? notif.descCn : notif.descEn;
                const time = currentLocale === "kh" ? notif.timeKh : currentLocale === "cn" ? notif.timeCn : notif.timeEn;

                return (
                  <div
                    key={notif.id}
                    className={cx(
                      "group flex items-start gap-4 p-4 rounded-xl border transition-all relative overflow-hidden",
                      notif.read
                        ? "bg-primary border-secondary"
                        : "bg-brand-solid/5 border-brand-solid/25 shadow-xs"
                    )}
                  >
                    {/* Unread indicator dot */}
                    {!notif.read && (
                      <span className="absolute top-4 right-4 size-2 rounded-full bg-brand-solid" />
                    )}

                    {/* Icon wrapper */}
                    <div className="size-10 rounded-lg bg-secondary/50 flex items-center justify-center shrink-0">
                      {getNotificationIcon(notif.type)}
                    </div>

                    {/* Text Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-2 pr-6">
                        <h4 className={cx("text-sm font-bold text-primary", !notif.read && "text-brand-solid")}>
                          {title}
                        </h4>
                        <span className="text-xxs text-quaternary shrink-0">{time}</span>
                      </div>
                      <p className="text-xs text-secondary mt-1 leading-relaxed">
                        {desc}
                      </p>

                      {/* Custom offer actions */}
                      {notif.hasOfferActions && (
                        <div className="flex items-center gap-2 mt-3.5">
                          <button className="px-3.5 py-1.5 rounded-lg bg-brand-solid text-white hover:bg-brand-solid_hover text-xs font-bold transition-colors cursor-pointer shadow-xs">
                            {t.accept}
                          </button>
                          <button className="px-3.5 py-1.5 rounded-lg border border-secondary bg-primary hover:bg-primary_hover text-xs font-semibold text-secondary transition-colors cursor-pointer">
                            {t.decline}
                          </button>
                        </div>
                      )}

                      {/* View details action */}
                      {notif.image && !notif.hasOfferActions && (
                        <div className="mt-3.5 flex items-center gap-2.5">
                          <img
                            src={notif.image}
                            alt=""
                            className="size-8 object-cover rounded-md border border-secondary"
                          />
                          <button className="text-xs font-semibold text-brand-solid hover:underline">
                            {t.viewListing}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Delete and Mark/Unread Quick Actions */}
                    <div className="flex flex-col gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity absolute right-3 top-3 md:relative md:opacity-100 md:right-0 md:top-0">
                      <button
                        onClick={() => toggleRead(notif.id)}
                        title={notif.read ? "Mark as unread" : "Mark as read"}
                        className="p-1.5 rounded-md hover:bg-primary_hover text-tertiary hover:text-secondary transition-colors cursor-pointer"
                      >
                        <Check className="size-4" />
                      </button>
                      <button
                        onClick={() => deleteNotification(notif.id)}
                        title="Delete"
                        className="p-1.5 rounded-md hover:bg-error/15 text-tertiary hover:text-error transition-colors cursor-pointer"
                      >
                        <Trash01 className="size-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
