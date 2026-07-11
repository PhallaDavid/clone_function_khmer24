"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
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
  hasOfferActions?: boolean;
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
    hasOfferActions: true
  },
  {
    id: "2",
    type: "unread",
    titleEn: "Message from Sophy K.",
    titleKh: "សារពី Sophy K.",
    titleCn: "来自 Sophy K. 的消息",
    descEn: "\"Is the price negotiable? I can pick it up today.\"",
    descKh: "\"តើតម្លៃអាចចរចាបានទេ? ខ្ញុំអាចទៅយកថ្ងៃនេះបាន។\"",
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
];

export const NotificationDropdownContent = ({ onClose }: { onClose?: () => void }) => {
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

  const getNotificationIcon = (type: NotificationItem["type"]) => {
    switch (type) {
      case "offers":
        return <Tag01 className="size-4.5 text-brand-solid" />;
      case "system":
        return <Bell01 className="size-4.5 text-indigo-500" />;
      default:
        return <MessageSquare01 className="size-4.5 text-blue-500" />;
    }
  };

  return (
    <div className="p-4 bg-primary text-primary">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-secondary">
        <div>
          <h2 className="text-sm font-bold text-primary flex items-center gap-1.5">
            <Bell01 className="size-4 text-brand-solid animate-bounce" />
            {t.title}
          </h2>
          <p className="text-[10px] text-tertiary">{t.subtitle}</p>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-primary_hover text-tertiary transition-colors cursor-pointer"
          >
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Quick Actions */}
      {notifications.length > 0 && (
        <div className="flex items-center justify-end gap-2.5 py-2">
          <button
            onClick={markAllRead}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-brand-solid hover:underline cursor-pointer bg-transparent border-0"
          >
            <Check className="size-3" />
            {t.markAllRead}
          </button>
          <span className="text-quaternary text-[10px]">|</span>
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 text-[10px] font-bold text-error hover:underline cursor-pointer bg-transparent border-0"
          >
            <Trash01 className="size-3" />
            {t.clearAll}
          </button>
        </div>
      )}

      {/* Tabs Filter */}
      <div className="flex border-b border-secondary whitespace-nowrap gap-0.5 mb-3">
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
                "px-2.5 py-1.5 text-[10px] font-bold border-b-2 transition-colors cursor-pointer relative bg-transparent border-t-0 border-x-0",
                activeTab === tab
                  ? "border-brand-solid text-brand-solid"
                  : "border-transparent text-tertiary hover:text-secondary hover:border-secondary"
              )}
            >
              {t[tab]}
              {count > 0 && (
                <span className={cx(
                  "ml-1 px-1 py-0.2 text-[9px] font-extrabold rounded-full",
                  tab === "unread" || (tab === "all" && notifications.some(n => !n.read))
                    ? "bg-brand-solid text-white"
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
      <div className="max-h-[280px] overflow-y-auto pr-0.5 flex flex-col gap-2.5">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 border border-secondary border-dashed rounded-lg bg-primary_hover/10">
            <div className="size-8 rounded-full bg-secondary/40 flex items-center justify-center mb-2">
              <Bell01 className="size-4 text-tertiary" />
            </div>
            <h3 className="text-xs font-bold text-primary">{t.emptyTitle}</h3>
            <p className="text-[10px] text-tertiary mt-0.5 text-center max-w-[200px]">{t.emptySubtitle}</p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const title = currentLocale === "kh" ? notif.titleKh : currentLocale === "cn" ? notif.titleCn : notif.titleEn;
            const desc = currentLocale === "kh" ? notif.descKh : currentLocale === "cn" ? notif.descCn : notif.descEn;
            const time = currentLocale === "kh" ? notif.timeKh : currentLocale === "cn" ? notif.timeCn : notif.timeEn;

            return (
              <div
                key={notif.id}
                className={cx(
                  "group flex items-start gap-2.5 p-2.5 rounded-lg border transition-all relative overflow-hidden",
                  notif.read
                    ? "bg-primary border-secondary"
                    : "bg-brand-solid/5 border-brand-solid/20 shadow-xxs"
                )}
              >
                {!notif.read && (
                  <span className="absolute top-2.5 right-2.5 size-1.5 rounded-full bg-brand-solid" />
                )}

                <div className="size-7.5 rounded-md bg-secondary/50 flex items-center justify-center shrink-0">
                  {getNotificationIcon(notif.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline justify-between gap-1.5 pr-3">
                    <h4 className={cx("text-[11px] font-bold text-primary truncate", !notif.read && "text-brand-solid")}>
                      {title}
                    </h4>
                    <span className="text-[9px] text-quaternary shrink-0">{time}</span>
                  </div>
                  <p className="text-[10px] text-secondary mt-0.5 leading-normal">
                    {desc}
                  </p>

                  {notif.hasOfferActions && (
                    <div className="flex items-center gap-1 mt-2">
                      <button className="px-2 py-1 rounded bg-brand-solid text-white hover:bg-brand-solid_hover text-[9px] font-extrabold transition-colors cursor-pointer border-0">
                        {t.accept}
                      </button>
                      <button className="px-2 py-1 rounded border border-secondary bg-primary hover:bg-primary_hover text-[9px] font-bold text-secondary transition-colors cursor-pointer">
                        {t.decline}
                      </button>
                    </div>
                  )}

                  {notif.image && !notif.hasOfferActions && (
                    <div className="mt-2 flex items-center gap-1.5">
                      <img
                        src={notif.image}
                        alt=""
                        className="size-6 object-cover rounded border border-secondary"
                      />
                      <button className="text-[9px] font-bold text-brand-solid hover:underline bg-transparent border-0 cursor-pointer">
                        {t.viewListing}
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity absolute right-1 top-1">
                  <button
                    onClick={() => toggleRead(notif.id)}
                    className="p-0.5 rounded hover:bg-primary_hover text-tertiary hover:text-secondary cursor-pointer border-0 bg-transparent"
                  >
                    <Check className="size-3" />
                  </button>
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    className="p-0.5 rounded hover:bg-error/15 text-tertiary hover:text-error cursor-pointer border-0 bg-transparent"
                  >
                    <Trash01 className="size-3" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
