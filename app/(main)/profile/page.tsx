"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { locationNames } from "@/utils/mock-data";
import { cx } from "@/utils/cx";

import en from "@/locales/en.json";
import kh from "@/locales/kh.json";
import zh from "@/locales/zh.json";

const profileTranslations: Record<string, Record<string, string>> = {
  en: en.profile,
  kh: kh.profile,
  cn: zh.profile,
};

const mockAvatars = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&auto=format&fit=crop"
];

export default function ProfilePage() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";
  const t = (key: string) => profileTranslations[locale]?.[key] || key;

  const [activeTab, setActiveTab] = useState<"listings" | "saved" | "settings">("listings");
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [displayName, setDisplayName] = useState("Sophia L.");
  const [email, setEmail] = useState("sophia.l@example.com");
  const [phone, setPhone] = useState("099 888 777");
  const [location, setLocation] = useState("Phnom Penh");
  const [bio, setBio] = useState("Gadget lover and software developer cataloging tech deals in Phnom Penh.");

  const [isSaving, setIsSaving] = useState(false);
  const [toasts, setToasts] = useState<{ id: number; message: string; type: "success" | "error" }[]>([]);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      const newId = Date.now();
      setToasts((prev) => [...prev, { id: newId, message: t("savedSuccess"), type: "success" }]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== newId));
      }, 4000);
    }, 1200);
  };

  const handleAvatarRoll = () => {
    setAvatarIndex((prev) => (prev + 1) % mockAvatars.length);
  };

  return (
    <div className="w-full bg-primary py-6">
      <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6">
        <Breadcrumbs
          items={[
            { label: t("title"), current: true }
          ]}
          className="py-1"
        />

        {/* Setup profile headers */}
        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-b border-secondary pb-6">
          <div className="flex items-center gap-4">
            <div className="relative group size-20 rounded-full border border-secondary overflow-hidden bg-secondary shrink-0 select-none">
              <img
                src={mockAvatars[avatarIndex]}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={handleAvatarRoll}
                className="absolute inset-0 bg-black/60 text-white flex items-center justify-center text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer duration-150"
              >
                {t("avatarChange")}
              </button>
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-primary">{displayName}</h1>
              <p className="text-xs text-tertiary font-semibold space-y-0.5 mt-0.5">
                <span>{t("activeSince")}</span>
                <span className="block">{t("totalAds")}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Profile layout sections splits */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Col Left: Form fields */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-primary border border-secondary rounded-lg p-6 space-y-6">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-secondary">
                {t("personalInfo")}
              </h3>
              <form onSubmit={handleSave} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary">{t("displayName")}</label>
                    <input
                      type="text"
                      required
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary">{t("email")}</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary">{t("phone")}</label>
                    <input
                      type="text"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary">{t("location")}</label>
                    <select
                      required
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold cursor-pointer"
                    >
                      {Object.keys(locationNames).map((loc) => (
                        <option key={loc} value={loc}>
                          {locationNames[loc]?.[locale] || loc}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="sm:col-span-2 space-y-1.5">
                    <label className="text-xs font-bold text-secondary">{t("bio")}</label>
                    <textarea
                      rows={3}
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full p-2.5 text-xs bg-secondary border border-secondary rounded-lg text-primary placeholder-fg-quaternary focus:ring-1 focus:ring-brand-solid outline-hidden font-semibold"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isSaving}
                    className="px-5 py-2.5 bg-brand-solid text-white hover:bg-brand-solid_hover text-xs font-bold rounded-lg transition-colors cursor-pointer select-none disabled:opacity-50"
                  >
                    {isSaving ? t("saving") : t("savesBtn")}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Col Right: Listings & Activity Tabs */}
          <div className="space-y-6">
            <div className="bg-primary border border-secondary rounded-lg overflow-hidden flex flex-col h-full shadow-xs">
              <div className="flex border-b border-secondary">
                <button
                  onClick={() => setActiveTab("listings")}
                  className={cx(
                    "flex-1 py-3 text-xs font-bold text-center border-b-2 outline-hidden cursor-pointer",
                    activeTab === "listings" ? "border-brand-solid text-brand-solid" : "border-transparent text-secondary hover:text-primary"
                  )}
                >
                  {t("tabActive")}
                </button>
                <button
                  onClick={() => setActiveTab("saved")}
                  className={cx(
                    "flex-1 py-3 text-xs font-bold text-center border-b-2 outline-hidden cursor-pointer",
                    activeTab === "saved" ? "border-brand-solid text-brand-solid" : "border-transparent text-secondary hover:text-primary"
                  )}
                >
                  {t("tabSaved")}
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={cx(
                    "flex-1 py-3 text-xs font-bold text-center border-b-2 outline-hidden cursor-pointer",
                    activeTab === "settings" ? "border-brand-solid text-brand-solid" : "border-transparent text-secondary hover:text-primary"
                  )}
                >
                  {t("tabSettings")}
                </button>
              </div>

              <div className="p-6 flex-1 min-h-[300px]">
                {activeTab === "listings" && (
                  <div className="space-y-4 animate-scale-in">
                    {/* Active list ad item 1 */}
                    <div className="border border-secondary rounded-lg p-3 bg-secondary flex gap-3 h-24">
                      <div className="size-16 rounded-md bg-primary flex items-center justify-center font-bold text-lg select-none">
                        📱
                      </div>
                      <div className="flex-1 min-w-0 pr-2 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-primary truncate">{t("listing1")}</h4>
                          <span className="text-[10px] font-bold text-brand-solid mt-0.5 block">$750</span>
                        </div>
                        <span className="text-[9px] font-bold self-start bg-success-solid/10 text-success-solid px-2 py-0.5 rounded-full border border-success-solid/10">
                          {t("adActive")}
                        </span>
                      </div>
                    </div>

                    {/* Active list ad item 2 */}
                    <div className="border border-secondary rounded-lg p-3 bg-secondary flex gap-3 h-24">
                      <div className="size-16 rounded-md bg-primary flex items-center justify-center font-bold text-lg select-none">
                        ⌨️
                      </div>
                      <div className="flex-1 min-w-0 pr-2 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-primary truncate">{t("listing2")}</h4>
                          <span className="text-[10px] font-bold text-brand-solid mt-0.5 block">$90</span>
                        </div>
                        <span className="text-[9px] font-bold self-start bg-warning-solid/10 text-warning-solid px-2 py-0.5 rounded-full border border-warning-solid/10">
                          {t("adPending")}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "saved" && (
                  <div className="space-y-4 animate-scale-in">
                    <div className="border border-secondary rounded-lg p-3 bg-secondary flex gap-3 h-24">
                      <div className="size-16 rounded-md bg-primary flex items-center justify-center font-bold text-lg select-none">
                        📱
                      </div>
                      <div className="flex-1 min-w-0 pr-2 flex flex-col justify-between">
                        <div>
                          <h4 className="text-xs font-bold text-primary truncate">{t("savedListing1")}</h4>
                          <span className="text-[10px] font-bold text-brand-solid mt-0.5 block">$1,450</span>
                        </div>
                        <span className="text-[9px] text-tertiary font-semibold">Saved on July 8</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-4 animate-scale-in">
                    <div className="flex items-center justify-between p-3 border border-secondary rounded-lg bg-secondary">
                      <div>
                        <h4 className="text-xs font-bold text-primary">Show Phone Number</h4>
                        <p className="text-[9px] text-tertiary font-semibold mt-0.5">Let visitors view phone in listings</p>
                      </div>
                      <input type="checkbox" defaultChecked className="size-4 outline-hidden cursor-pointer" />
                    </div>
                    <div className="flex items-center justify-between p-3 border border-secondary rounded-lg bg-secondary">
                      <div>
                        <h4 className="text-xs font-bold text-primary">Newsletter Alerts</h4>
                        <p className="text-[9px] text-tertiary font-semibold mt-0.5">Opt-in weekly emails alerts</p>
                      </div>
                      <input type="checkbox" defaultChecked className="size-4 outline-hidden cursor-pointer" />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Toasts Portal */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="pointer-events-auto bg-primary border border-secondary p-4 rounded-lg shadow-lg flex items-center gap-3 animate-scale-in"
          >
            <div className="size-5 rounded-full bg-success-solid/10 text-success-solid flex items-center justify-center font-bold text-xs select-none">
              ✓
            </div>
            <div className="flex-1 text-xs font-bold text-primary pr-2">{toast.message}</div>
            <button
              onClick={() => setToasts((prev) => prev.filter((t) => t.id !== toast.id))}
              className="text-tertiary hover:text-primary text-[10px] font-extrabold px-1 cursor-pointer"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
