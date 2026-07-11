"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { Breadcrumbs } from "@/components/base/breadcrumbs/breadcrumbs";
import { locationNames } from "@/utils/mock-data";
import { cx } from "@/utils/cx";

const profileTranslations: Record<string, Record<string, string>> = {
  en: {
    title: "My Profile Settings",
    subtitle: "Manage your personal account settings, check your listings history, and configure options.",
    tabActive: "My Listings",
    tabSaved: "Saved Ads",
    tabSettings: "Privacy Settings",
    personalInfo: "Personal Details",
    displayName: "Display Name",
    email: "Email Address",
    phone: "Contact Phone",
    location: "Default City",
    bio: "Short Bio",
    savesBtn: "Save Profile Changes",
    activeSince: "Member Since: June 2024",
    totalAds: "Total Listings: 2 Ads",
    saving: "Saving changes...",
    savedSuccess: "Profile changes saved successfully!",
    avatarChange: "Change photo",
    adActive: "Active",
    adPending: "Pending Review",
    // Mock Listings
    listing1: "iPad Pro 11-inch (M2 Chip, 128GB)",
    listing2: "Mechanical Keyboard Keychron K2",
    savedListing1: "iPhone 15 Pro Max - 256GB"
  },
  kh: {
    title: "លម្អិតគណនីរបស់ខ្ញុំ",
    subtitle: "គ្រប់គ្រងការកំណត់គណនីផ្ទាល់ខ្លួន ពិនិត្យប្រវត្តិទំនិញលក់ និងកំណត់ជម្រើសផ្សេងៗ។",
    tabActive: "ទំនិញលក់របស់ខ្ញុំ",
    tabSaved: "ទំនិញបានរក្សាទុក",
    tabSettings: "ការកំណត់ឯកជនភាព",
    personalInfo: "ព័ត៌មានលម្អិតផ្ទាល់ខ្លួន",
    displayName: "ឈ្មោះបង្ហាញ",
    email: "អាសយដ្ឋានអុីម៉ែល",
    phone: "លេខទូរស័ព្ទទំនាក់ទំនង",
    location: "រាជធានី/ខេត្ត",
    bio: "ជីវប្រវត្តិសង្ខេប",
    savesBtn: "រក្សាទុកការផ្លាស់ប្តូរ",
    activeSince: "សមាជិកតាំងពី៖ មិថុនា ២០២៤",
    totalAds: "ការផ្សព្វផ្សាយសរុប៖ ២ ទំនិញ",
    saving: "កំពុងរក្សាទុក...",
    savedSuccess: "ការផ្លាស់ប្តូរត្រូវបានរក្សាទុកដោយជោគជ័យ!",
    avatarChange: "ប្តូររូបថត",
    adActive: "កំពុងលក់",
    adPending: "កំពុងពិនិត្យ",
    // Mock Listings
    listing1: "iPad Pro 11-inch (M2 Chip, 128GB)",
    listing2: "Mechanical Keyboard Keychron K2",
    savedListing1: "iPhone 15 Pro Max - 256GB"
  },
  cn: {
    title: "个人账户设置",
    subtitle: "在此管理您在市场上的个人账户配置、核对名下发布的闲置物品及设置隐私偏好。",
    tabActive: "我发布的商品",
    tabSaved: "已收藏的宝贝",
    tabSettings: "权限与隐私配置",
    personalInfo: "用户基本材料",
    displayName: "显示昵称",
    email: "电子邮箱地址",
    phone: "手机联系电话",
    location: "常驻城市",
    bio: "个人简短说明",
    savesBtn: "保存账户修改",
    activeSince: "注册会员年份：2024 年 6 约",
    totalAds: "已发布宝贝：2 项",
    saving: "正在保存更改...",
    savedSuccess: "配置信息个人资料修改成功！",
    avatarChange: "修改个人头像",
    adActive: "正在出售中",
    adPending: "待后台审核",
    // Mock Listings
    listing1: "iPad Pro 11 英寸 (M2 芯片, 128GB)",
    listing2: "Keychron K2 蓝牙机械键盘",
    savedListing1: "苹果 iPhone 15 Pro Max 256GB"
  }
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
