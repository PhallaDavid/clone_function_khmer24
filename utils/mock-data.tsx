import React from "react";

export const translations: Record<string, Record<string, string>> = {
  en: {
    browseCatalog: "Browse Marketplace",
    browseSubtitle: "Explore the latest premium postings and top deals available across Cambodia.",
    allCategories: "All Categories",
    featuredAds: "Featured Ads",
    featuredSubtitle: "Check out the newest listings with details, prices, and locations.",
    viewAllAds: "View All Ads",
    urgent: "Urgent",
    negotiable: "Negotiable",
    contactSeller: "Contact",
    // Categories
    "Phones & Tablets": "Phones & Tablets",
    "Computers": "Computers",
    "Cars & Vehicles": "Cars & Vehicles",
    "Real Estate": "Real Estate",
    "Fashion & Beauty": "Fashion & Beauty",
    "Furniture & Decor": "Furniture & Decor",
    "Jobs": "Jobs",
    "Services": "Services",
  },
  kh: {
    browseCatalog: "ស្វែងរកទំនិញក្នុងផ្សារ",
    browseSubtitle: "ស្វែងរកការផ្សព្វផ្សាយថ្មីៗ និងការផ្តល់ជូនពិសេសៗនៅកម្ពុជា។",
    allCategories: "ចំណាត់ថ្នាក់ក្រុមទាំងអស់",
    featuredAds: "ការផ្សព្វផ្សាយពិសេស",
    featuredSubtitle: "សូមពិនិត្យមើលការផ្សព្វផ្សាយថ្មីៗបំផុត រួមជាមួយព័ត៌មានលម្អិត តម្លៃ និងទីតាំង។",
    viewAllAds: "មើលការផ្សាយទាំងអស់",
    urgent: "បន្ទាន់",
    negotiable: "ចរចាបាន",
    contactSeller: "ទំនាក់ទំនង",
    // Categories
    "Phones & Tablets": "ទូរស័ព្ទ និងថេប្លេត",
    "Computers": "កុំព្យូទ័រ",
    "Cars & Vehicles": "រថយន្ត និងយានយន្ត",
    "Real Estate": "អចលនព្យូហៈ",
    "Fashion & Beauty": "ម៉ូដ និងសម្រស់",
    "Furniture & Decor": "គ្រឿងសង្ហារឹម និងតុបតែង",
    "Jobs": "ការងារ",
    "Services": "សេវាកម្ម",
  },
  cn: {
    browseCatalog: "浏览市场",
    browseSubtitle: "探索柬埔寨各地最新的优质帖子和热门优惠。",
    allCategories: "所有类别",
    featuredAds: "特色广告",
    featuredSubtitle: "查看包含详细信息、价格和位置的最新房源。",
    viewAllAds: "查看所有广告",
    urgent: "加急",
    negotiable: "可议价",
    contactSeller: "联系商家",
    // Categories
    "Phones & Tablets": "手机与平板",
    "Computers": "电脑",
    "Cars & Vehicles": "汽车与交通工具",
    "Real Estate": "房地产",
    "Fashion & Beauty": "时尚美容",
    "Furniture & Decor": "家具与装饰",
    "Jobs": "招聘职位",
    "Services": "生活服务",
  }
};

export const locationNames: Record<string, Record<string, string>> = {
  "Phnom Penh": { en: "Phnom Penh", kh: "ភ្នំពេញ", cn: "金边" },
  "Siem Reap": { en: "Siem Reap", kh: "សៀមរាប", cn: "暹粒" },
  "Kandal": { en: "Kandal", kh: "កណ្តាល", cn: "干丹" },
  "Bat Dambang": { en: "Battambang", kh: "បាត់ដំបង", cn: "马德望" }
};

export const conditions: Record<string, Record<string, string>> = {
  "99% New": { en: "99% New", kh: "ថ្មី 99%", cn: "九九新" },
  "Brand New": { en: "Brand New", kh: "ថ្មីសន្លាង", cn: "全新" },
  "Used": { en: "Used", kh: "ប្រើរួច", cn: "二手" },
  "New Building": { en: "New Building", kh: "អគារថ្មី", cn: "新楼群" },
  "95% New": { en: "95% New", kh: "ថ្មី 95%", cn: "九五新" },
  "Like New": { en: "Like New", kh: "ដូចថ្មី", cn: "近全新" },
  "Professional": { en: "Professional", kh: "ជំនាញវិជ្ជាជីវៈ", cn: "专业服务" },
};

export const timeTranslations: Record<string, Record<string, string>> = {
  "2 hours ago": { en: "2 hours ago", kh: "2 ម៉ោងមុន", cn: "2 小时前" },
  "3 hours ago": { en: "3 hours ago", kh: "3 ម៉ោងមុន", cn: "3 小时前" },
  "4 hours ago": { en: "4 hours ago", kh: "4 ម៉ោងមុន", cn: "4 小时前" },
  "5 hours ago": { en: "5 hours ago", kh: "5 ម៉ោងមុន", cn: "5 小时前" },
  "1 day ago": { en: "1 day ago", kh: "1 ថ្ងៃមុន", cn: "1 天前" },
  "3 days ago": { en: "3 days ago", kh: "3 ថ្ងៃមុន", cn: "3 天前" },
  "Yesterday": { en: "Yesterday", kh: "ម្សិលមិញ", cn: "昨天" },
  "2 days ago": { en: "2 days ago", kh: "2 ថ្ងៃមុន", cn: "2 天前" },
};

export const productTitles: Record<string, Record<string, string>> = {
  "iPhone 15 Pro Max - 256GB (Like New 99%)": {
    en: "iPhone 15 Pro Max - 256GB (Like New 99%)",
    kh: "iPhone 15 Pro Max - 256GB (ស្ទើរតែថ្មី 99%)",
    cn: "苹果iPhone 15 Pro Max - 256GB (99新)"
  },
  "MacBook Pro 14\" M3 Chip Space Black": {
    en: "MacBook Pro 14\" M3 Chip Space Black",
    kh: "MacBook Pro 14អ៊ីញ M3 Chip ពណ៌ខ្មៅអវកាស",
    cn: "苹果MacBook Pro 14寸 M3芯片 深空黑"
  },
  "Toyota Prius 2010 Option 4 Full Specs (No Hit)": {
    en: "Toyota Prius 2010 Option 4 Full Specs (No Hit)",
    kh: "Toyota Prius 2010 Option 4 Specsពេញ (អត់បុក)",
    cn: "丰田普锐斯 2010款 顶配超凡性能级 (无事故)"
  },
  "Modern 1-Bedroom Condo for Sale (BKK1 Area)": {
    en: "Modern 1-Bedroom Condo for Sale (BKK1 Area)",
    kh: "ខុនដូទំនើបបន្ទប់គេង1សម្រាប់លក់ (តំបន់ BKK1)",
    cn: "现代一居室公寓出售 (BKK1豪宅区)"
  },
  "Sony WH-1000XM5 Wireless Headphones (Black)": {
    en: "Sony WH-1000XM5 Wireless Headphones (Black)",
    kh: "កាសឥតខ្សែកម្រិតខ្ពស់ Sony WH-1000XM5 (ពណ៌ខ្មៅ)",
    cn: "索尼 WH-1000XM5 旗舰无线降噪头戴式耳机 (黑色)"
  },
  "Rolex Submariner Date 41mm Oystersteel 2022": {
    en: "Rolex Submariner Date 41mm Oystersteel 2022",
    kh: "នាឡិកាដៃ Rolex Submariner Date 41mm Oystersteel 2022",
    cn: "劳力士潜航者日历型 41毫米 蚝式钢 2022款"
  },
  "Ergonomic Office Chair with Adjustable Lumbar Support": {
    en: "Ergonomic Office Chair with Adjustable Lumbar Support",
    kh: "កៅអីការិយាល័យ Ergonomic ផាសុកភាព (អាចសារ៉េកម្ពស់បាន)",
    cn: "人体工学办公椅 带可调节腰托"
  },
  "Professional Translation Service (Khmer-English-Chinese)": {
    en: "Professional Translation Service (Khmer-English-Chinese)",
    kh: "សេវាកម្មបកប្រែអាជីព (ខ្មែរ-អង់គ្លេស-ចិន)",
    cn: "专业翻译服务 (柬-英-中)"
  }
};

export const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=2070&auto=format&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop",
  },
  {
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop",
  },
];

export const categories = [
  {
    name: "Phones & Tablets",
    count: 1250,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <rect x="5" y="2" width="14" height="20" rx="2.5" />
        <line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-blue-500 to-indigo-600 shadow-[0_6px_16px_rgba(59,130,246,0.25)]",
  },
  {
    name: "Computers",
    count: 840,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" strokeLinecap="round" />
        <line x1="12" y1="17" x2="12" y2="21" strokeLinecap="round" />
      </svg>
    ),
    gradient: "from-violet-500 to-fuchsia-600 shadow-[0_6px_16px_rgba(139,92,246,0.25)]",
  },
  {
    name: "Cars & Vehicles",
    count: 3120,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9C2 11.1 2 11.3 2 11.5V16c0 .6.4 1 1 1h2m0 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0zm11 0a3 3 0 1 0 6 0 3 3 0 0 0-6 0z" />
      </svg>
    ),
    gradient: "from-emerald-500 to-teal-600 shadow-[0_6px_16px_rgba(16,185,129,0.25)]",
  },
  {
    name: "Real Estate",
    count: 2450,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    gradient: "from-amber-500 to-orange-600 shadow-[0_6px_16px_rgba(245,158,11,0.25)]",
  },
  {
    name: "Fashion & Beauty",
    count: 1890,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.38 3.46L16 2a4 4 0 00-8 0L3.62 3.46a2 2 0 00-1.34 2.23l1.58 9.47a2 2 0 001.2 1.54l6.44 2.8a2 2 0 001.7 0l6.44-2.8a2 2 0 001.2-1.54l1.58-9.47a2 2 0 00-1.34-2.23z" />
      </svg>
    ),
    gradient: "from-pink-500 to-rose-600 shadow-[0_6px_16px_rgba(236,72,153,0.25)]",
  },
  {
    name: "Furniture & Decor",
    count: 950,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 18v3M20 18v3M19 12v3H5v-3M5 7h14a2 2 0 0 1 2 2v3H3V9a2 2 0 0 1 2-2z" />
      </svg>
    ),
    gradient: "from-indigo-500 to-purple-600 shadow-[0_6px_16px_rgba(99,102,241,0.25)]",
  },
  {
    name: "Jobs",
    count: 620,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    gradient: "from-orange-400 to-red-500 shadow-[0_6px_16px_rgba(251,146,60,0.25)]",
  },
  {
    name: "Services",
    count: 1150,
    icon: (className?: string) => (
      <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    gradient: "from-cyan-500 to-blue-600 shadow-[0_6px_16px_rgba(6,182,212,0.25)]",
  }
];

export const products = [
  {
    id: 1,
    title: "iPhone 15 Pro Max - 256GB (Like New 99%)",
    price: "$1,099",
    category: "Phones & Tablets",
    condition: "99% New",
    isNegotiable: true,
    location: "Phnom Penh",
    time: "2 hours ago",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop",
    isUrgent: true,
    seller: {
      name: "Dara S.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Dara",
      isVerified: true
    }
  },
  {
    id: 2,
    title: "MacBook Pro 14\" M3 Chip Space Black",
    price: "$1,599",
    category: "Computers",
    condition: "Brand New",
    isNegotiable: false,
    location: "Siem Reap",
    time: "4 hours ago",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Sopheap K.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sopheap",
      isVerified: false
    }
  },
  {
    id: 3,
    title: "Toyota Prius 2010 Option 4 Full Specs (No Hit)",
    price: "$14,800",
    category: "Cars & Vehicles",
    condition: "Used",
    isNegotiable: true,
    location: "Phnom Penh",
    time: "5 hours ago",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?q=80&w=600&auto=format&fit=crop",
    isUrgent: true,
    seller: {
      name: "Rithy P.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Rithy",
      isVerified: true
    }
  },
  {
    id: 4,
    title: "Modern 1-Bedroom Condo for Sale (BKK1 Area)",
    price: "$78,000",
    category: "Real Estate",
    condition: "New Building",
    isNegotiable: true,
    location: "Phnom Penh",
    time: "1 day ago",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Borey Dev",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Borey",
      isVerified: true
    }
  },
  {
    id: 5,
    title: "Sony WH-1000XM5 Wireless Headphones (Black)",
    price: "$280",
    category: "Electronics",
    condition: "95% New",
    isNegotiable: false,
    location: "Kandal",
    time: "3 hours ago",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Cheat S.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Cheat",
      isVerified: false
    }
  },
  {
    id: 6,
    title: "Rolex Submariner Date 41mm Oystersteel 2022",
    price: "$12,400",
    category: "Fashion & Beauty",
    condition: "Like New",
    isNegotiable: false,
    location: "Phnom Penh",
    time: "3 days ago",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Lida N.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Lida",
      isVerified: true
    }
  },
  {
    id: 7,
    title: "Ergonomic Office Chair with Adjustable Lumbar Support",
    price: "$85",
    category: "Furniture & Decor",
    condition: "Used",
    isNegotiable: true,
    location: "Siem Reap",
    time: "Yesterday",
    image: "https://images.unsplash.com/photo-1580481072645-022f9a6dbf27?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Vanna T.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Vanna",
      isVerified: false
    }
  },
  {
    id: 8,
    title: "Professional Translation Service (Khmer-English-Chinese)",
    price: "$15/page",
    category: "Services",
    condition: "Professional",
    isNegotiable: true,
    location: "Bat Dambang",
    time: "2 days ago",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
    isUrgent: false,
    seller: {
      name: "Sokha L.",
      avatar: "https://api.dicebear.com/7.x/adventurer/svg?seed=Sokha",
      isVerified: true
    }
  }
];
