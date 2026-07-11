"use client";

import React, { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { cx } from "@/utils/cx";

const chatTranslations: Record<string, Record<string, string>> = {
  en: {
    title: "Messages",
    subtitle: "Chat with buyers and sellers directly.",
    searchPlaceholder: "Search conversations...",
    typeMessage: "Type a message...",
    send: "Send",
    today: "Today",
    yesterday: "Yesterday",
    online: "Online",
    offline: "Offline",
    noConversation: "Select a conversation to start messaging",
    emptySearch: "No conversations found",
    you: "You",
    listing: "Listing",
    viewListing: "View Listing",
  },
  kh: {
    title: "សារ",
    subtitle: "ជជែកជាមួយអ្នកទិញ និងអ្នកលក់ដោយផ្ទាល់",
    searchPlaceholder: "ស្វែងរកការសន្ទនា...",
    typeMessage: "វាយសារ...",
    send: "ផ្ញើ",
    today: "ថ្ងៃនេះ",
    yesterday: "ម្សិលមិញ",
    online: "អনឡាញ",
    offline: "គ្មានការតភ្ជាប់",
    noConversation: "ជ្រើសរើសសន្ទនាដើម្បីចាប់ផ្តើម",
    emptySearch: "រកមិនឃើញការសន្ទនា",
    you: "អ្នក",
    listing: "ទំនិញ",
    viewListing: "មើលទំនិញ",
  },
  cn: {
    title: "消息",
    subtitle: "直接与买家和卖家联系。",
    searchPlaceholder: "搜索对话...",
    typeMessage: "输入消息...",
    send: "发送",
    today: "今天",
    yesterday: "昨天",
    online: "在线",
    offline: "离线",
    noConversation: "选择一个对话开始聊天",
    emptySearch: "未找到对话",
    you: "我",
    listing: "商品",
    viewListing: "查看商品",
  },
};

type Message = {
  id: number;
  text: string;
  fromMe: boolean;
  time: string;
};

type Conversation = {
  id: number;
  name: string;
  avatar: string;
  isOnline: boolean;
  lastMessage: string;
  time: string;
  unread: number;
  listingTitle: string;
  listingPrice: string;
  listingImage: string;
  listingId: number;
  messages: Message[];
};

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: "Dara S.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dara",
    isOnline: true,
    lastMessage: "Is the iPhone still available?",
    time: "2m ago",
    unread: 2,
    listingTitle: "iPhone 15 Pro Max - 256GB",
    listingPrice: "$1,099",
    listingImage: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=120&auto=format&fit=crop",
    listingId: 1,
    messages: [
      { id: 1, text: "Hello! Is the iPhone still available?", fromMe: false, time: "10:01 AM" },
      { id: 2, text: "Yes, it is! Brand new condition.", fromMe: true, time: "10:03 AM" },
      { id: 3, text: "Great! Can we meet tomorrow at BKK1?", fromMe: false, time: "10:05 AM" },
      { id: 4, text: "Sure, what time works for you?", fromMe: true, time: "10:06 AM" },
      { id: 5, text: "Is the iPhone still available?", fromMe: false, time: "10:12 AM" },
    ],
  },
  {
    id: 2,
    name: "Lida N.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lida",
    isOnline: true,
    lastMessage: "What is the lowest price for the Rolex?",
    time: "1h ago",
    unread: 0,
    listingTitle: "Rolex Submariner 41mm 2022",
    listingPrice: "$12,400",
    listingImage: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=120&auto=format&fit=crop",
    listingId: 6,
    messages: [
      { id: 1, text: "Hi! I saw your Rolex listing.", fromMe: false, time: "9:00 AM" },
      { id: 2, text: "Hello Lida! Yes, it is still available.", fromMe: true, time: "9:02 AM" },
      { id: 3, text: "What is the lowest price?", fromMe: false, time: "9:05 AM" },
      { id: 4, text: "Best I can do is $12,000.", fromMe: true, time: "9:07 AM" },
      { id: 5, text: "What is the lowest price for the Rolex?", fromMe: false, time: "9:10 AM" },
    ],
  },
  {
    id: 3,
    name: "Rithy P.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rithy",
    isOnline: false,
    lastMessage: "I will call you tomorrow about the car.",
    time: "Yesterday",
    unread: 0,
    listingTitle: "Toyota Prius 2010",
    listingPrice: "$14,800",
    listingImage: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=120&auto=format&fit=crop",
    listingId: 3,
    messages: [
      { id: 1, text: "Is the Prius still for sale?", fromMe: true, time: "Yesterday 3:00 PM" },
      { id: 2, text: "Yes! Full option, no accident.", fromMe: false, time: "Yesterday 3:05 PM" },
      { id: 3, text: "Can you drop the price a little?", fromMe: true, time: "Yesterday 3:09 PM" },
      { id: 4, text: "I will call you tomorrow about the car.", fromMe: false, time: "Yesterday 3:15 PM" },
    ],
  },
  {
    id: 4,
    name: "Vanna T.",
    avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Vanna",
    isOnline: false,
    lastMessage: "Does the chair come with delivery?",
    time: "2d ago",
    unread: 1,
    listingTitle: "Ergonomic Office Chair",
    listingPrice: "$85",
    listingImage: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=120&auto=format&fit=crop",
    listingId: 7,
    messages: [
      { id: 1, text: "Hello, I want the chair.", fromMe: false, time: "Mon 10:00 AM" },
      { id: 2, text: "Hi Vanna! Yes it is available.", fromMe: true, time: "Mon 10:02 AM" },
      { id: 3, text: "Does the chair come with delivery?", fromMe: false, time: "Mon 10:05 AM" },
    ],
  },
];

export default function ChatPage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => chatTranslations[locale]?.[key] || key;

  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedId, setSelectedId] = useState<number | null>(1);
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  const filtered = conversations.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.listingTitle.toLowerCase().includes(search.toLowerCase())
  );

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [selectedId, conversations]);

  const sendMessage = () => {
    const text = input.trim();
    if (!text || !selectedId) return;
    const newMsg: Message = {
      id: Date.now(),
      text,
      fromMe: true,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, newMsg], lastMessage: text, time: "now", unread: 0 }
          : c
      )
    );
    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full bg-primary py-6 min-h-[calc(100dvh-64px)]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-4">
        <Breadcrumbs items={[{ label: t("title"), current: true }]} className="py-1" />

        <div className="flex h-[calc(100dvh-200px)] min-h-[560px] border border-secondary rounded-lg overflow-hidden bg-primary shadow-xs">

          {/* ===== Left Panel: Conversation List ===== */}
          <div className="w-full max-w-[300px] flex-shrink-0 flex flex-col border-r border-secondary">
            {/* Header */}
            <div className="p-4 border-b border-secondary">
              <h2 className="text-sm font-extrabold text-primary mb-3">{t("title")}</h2>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 111 11a6 6 0 0116 0z" />
                </svg>
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-tertiary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                />
              </div>
            </div>

            {/* Conversation items */}
            <div className="flex-1 overflow-y-auto">
              {filtered.length === 0 ? (
                <div className="p-6 text-center text-xs font-bold text-tertiary">{t("emptySearch")}</div>
              ) : (
                filtered.map((conv) => (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setSelectedId(conv.id);
                      // Clear unread on select
                      setConversations((prev) => prev.map((c) => c.id === conv.id ? { ...c, unread: 0 } : c));
                    }}
                    className={cx(
                      "w-full flex items-start gap-3 p-4 text-left border-b border-secondary/50 hover:bg-secondary transition-colors cursor-pointer outline-hidden",
                      selectedId === conv.id && "bg-secondary border-l-2 border-l-brand-solid"
                    )}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img src={conv.avatar} alt={conv.name} className="size-10 rounded-full border border-secondary bg-secondary object-cover" />
                      <span className={cx("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-primary", conv.isOnline ? "bg-success-solid" : "bg-secondary")} />
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-extrabold text-primary truncate">{conv.name}</span>
                        <span className="text-[9px] font-semibold text-tertiary whitespace-nowrap">{conv.time}</span>
                      </div>
                      <p className="text-[10px] text-secondary font-semibold truncate mt-0.5">{conv.lastMessage}</p>
                    </div>
                    {/* Unread badge */}
                    {conv.unread > 0 && (
                      <span className="size-4 rounded-full bg-brand-solid text-white text-[9px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                        {conv.unread}
                      </span>
                    )}
                  </button>
                ))
              )}
            </div>
          </div>

          {/* ===== Right Panel: Chat window ===== */}
          {selected ? (
            <div className="flex-1 flex flex-col min-w-0">
              {/* Chat Header */}
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-secondary bg-primary shrink-0">
                <div className="relative shrink-0">
                  <img src={selected.avatar} alt={selected.name} className="size-9 rounded-full border border-secondary object-cover" />
                  <span className={cx("absolute bottom-0 right-0 size-2.5 rounded-full border-2 border-primary", selected.isOnline ? "bg-success-solid" : "bg-secondary")} />
                </div>
                <div className="flex-1 min-w-0">
                  <Link href={`/${locale}/user/${selected.name.toLowerCase().replace(/\s+/g, "-")}`} className="text-sm font-extrabold text-primary hover:text-brand-solid transition-colors">
                    {selected.name}
                  </Link>
                  <p className="text-[10px] font-semibold text-tertiary mt-0.5">
                    {selected.isOnline ? t("online") : t("offline")}
                  </p>
                </div>
                {/* Listing mini card */}
                <Link
                  href={`/${locale}/products/${selected.listingId}`}
                  className="hidden sm:flex items-center gap-2.5 border border-secondary rounded-lg p-2 bg-secondary hover:border-brand-solid/40 transition-colors shrink-0 max-w-[220px]"
                >
                  <img src={selected.listingImage} alt={selected.listingTitle} className="size-9 rounded-md object-cover bg-primary shrink-0" />
                  <div className="min-w-0">
                    <p className="text-[9px] font-bold text-tertiary uppercase">{t("listing")}</p>
                    <p className="text-[10px] font-extrabold text-primary truncate">{selected.listingTitle}</p>
                    <p className="text-[10px] font-extrabold text-brand-solid">{selected.listingPrice}</p>
                  </div>
                </Link>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3 bg-secondary/30">
                {/* Day separator */}
                <div className="flex items-center gap-3 py-2">
                  <div className="flex-1 border-t border-secondary" />
                  <span className="text-[9px] font-bold text-tertiary uppercase">{t("today")}</span>
                  <div className="flex-1 border-t border-secondary" />
                </div>

                {selected.messages.map((msg) => (
                  <div key={msg.id} className={cx("flex gap-2.5 max-w-[75%]", msg.fromMe ? "ml-auto flex-row-reverse" : "")}>
                    {!msg.fromMe && (
                      <img src={selected.avatar} alt={selected.name} className="size-7 rounded-full border border-secondary object-cover shrink-0 self-end" />
                    )}
                    <div className={cx(
                      "rounded-lg px-3.5 py-2.5 text-xs font-semibold leading-relaxed max-w-xs break-words",
                      msg.fromMe
                        ? "bg-brand-solid text-white rounded-br-sm"
                        : "bg-primary border border-secondary text-primary rounded-bl-sm"
                    )}>
                      {msg.text}
                      <span className={cx("block text-[9px] mt-1 font-normal", msg.fromMe ? "text-white/60 text-right" : "text-tertiary")}>{msg.time}</span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input bar */}
              <div className="px-4 py-3.5 border-t border-secondary bg-primary flex items-end gap-3 shrink-0">
                <textarea
                  rows={1}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t("typeMessage")}
                  className="flex-1 resize-none p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-tertiary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold max-h-28 overflow-y-auto"
                  style={{ lineHeight: "1.5" }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim()}
                  className="shrink-0 px-4 py-2.5 bg-brand-solid text-white hover:bg-brand-solid_hover font-bold text-xs rounded-lg transition-colors cursor-pointer select-none disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <svg className="size-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  {t("send")}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center gap-3 bg-secondary/20 p-8">
              <div className="size-14 rounded-full bg-secondary border border-secondary flex items-center justify-center text-2xl select-none">💬</div>
              <p className="text-sm font-bold text-secondary">{t("noConversation")}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
