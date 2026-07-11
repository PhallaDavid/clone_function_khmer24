"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { cx } from "@/utils/cx";

const ChevronLeftIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 18l6-6-6-6" />
  </svg>
);

import {
  translations,
  locationNames,
  conditions,
  timeTranslations,
  productTitles,
  slides,
  categories,
  products
} from "@/utils/mock-data";

export default function Home() {
  const pathname = usePathname();
  const segments = pathname.split("/");
  const locale = ["en", "kh", "cn"].includes(segments[1]) ? (segments[1] as "en" | "kh" | "cn") : "en";

  const t = (key: string) => {
    return translations[locale]?.[key] || key;
  };

  const getLocalizedLink = (path: string) => {
    if (locale === "en") return path;
    return `/${locale}${path === "/" ? "" : path}`;
  };

  return (
    <div className="flex flex-col flex-1 bg-secondary font-sans transition-colors duration-200 py-12">
      {/* Carousel Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <Carousel.Root opts={{ loop: true }} className="w-full">
          <div className="relative group/carousel">
            <Carousel.Content className="-ml-4">
              {slides.map((slide, idx) => (
                <Carousel.Item key={idx} className="pl-4 basis-full">
                  <div className="h-[350px] sm:h-[450px] md:h-[550px] w-full rounded-lg overflow-hidden relative border border-secondary shadow-sm">
                    <img
                      src={slide.image}
                      alt={`Banner ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </Carousel.Item>
              ))}
            </Carousel.Content>

            <div className="absolute top-1/2 -translate-y-1/2 left-2 md:left-4 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <Carousel.PrevTrigger className="flex size-10 items-center justify-center rounded-full border border-secondary bg-primary/95 backdrop-blur-md text-primary transition-colors hover:bg-primary_hover disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                <ChevronLeftIcon className="size-5" />
              </Carousel.PrevTrigger>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-2 md:right-4 z-10 opacity-0 group-hover/carousel:opacity-100 transition-opacity">
              <Carousel.NextTrigger className="flex size-10 items-center justify-center rounded-full border border-secondary bg-primary/95 backdrop-blur-md text-primary transition-colors hover:bg-primary_hover disabled:opacity-50 disabled:cursor-not-allowed shadow-md">
                <ChevronRightIcon className="size-5" />
              </Carousel.NextTrigger>
            </div>
          </div>

          <Carousel.IndicatorGroup className="flex items-center justify-center gap-2 mt-8">
            {({ index }) => (
              <Carousel.Indicator
                key={index}
                index={index}
                className={({ isSelected }) =>
                  cx(
                    "h-2 rounded-full transition-all duration-300",
                    isSelected
                      ? "w-6 bg-brand-solid"
                      : "w-2 bg-secondary hover:bg-primary_hover",
                  )
                }
              />
            )}
          </Carousel.IndicatorGroup>
        </Carousel.Root>
      </div>

      {/* Categories Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-display-xs font-bold text-primary">{t("browseCatalog")}</h2>
            <p className="text-sm md:text-md text-secondary mt-1 max-w-xl">
              {t("browseSubtitle")}
            </p>
          </div>
          <a
            href={getLocalizedLink("/categories")}
            className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-brand-solid hover:text-brand-solid_hover transition-colors"
          >
            {t("allCategories")}
            <svg className="size-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5">
          {categories.map((cat, idx) => (
            <a
              key={idx}
              href={getLocalizedLink(`/categories/${cat.name.toLowerCase().replace(/ & /g, "-").replace(/ /g, "-")}`)}
              className="flex flex-col items-center p-6 rounded-lg border border-secondary bg-primary hover:border-brand-solid/40 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 group text-center aspect-[4/5] justify-center"
            >
              <div className={`size-14 rounded-full bg-gradient-to-br ${cat.gradient} flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                {cat.icon("size-6")}
              </div>
              <span className="text-sm font-bold text-primary group-hover:text-brand-solid transition-colors duration-300 line-clamp-1">
                {t(cat.name)}
              </span>
              <span className="mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-semibold text-tertiary bg-secondary group-hover:bg-brand-solid/10 group-hover:text-brand-solid transition-all duration-300">
                {locale === "kh" ? `${cat.count.toLocaleString()} ការផ្សាយ` : locale === "cn" ? `${cat.count.toLocaleString()} 商品` : `${cat.count.toLocaleString()} ads`}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-display-xs font-bold text-primary">{t("featuredAds")}</h2>
            <p className="text-sm md:text-md text-secondary mt-1 max-w-xl">
              {t("featuredSubtitle")}
            </p>
          </div>
          <button className="text-sm font-semibold text-brand-solid hover:text-brand-solid_hover transition-colors">
            {t("viewAllAds")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/${locale}/products/${product.id}`}
              className="group flex flex-col rounded-lg border border-secondary bg-primary overflow-hidden hover:shadow-xl hover:border-brand-solid/35 transition-all duration-300 relative cursor-pointer"
            >
              {/* Image area */}
              <div className="h-52 w-full overflow-hidden bg-secondary relative">
                <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                  {product.isUrgent && (
                    <span className="px-2.5 py-0.5 rounded-full text-[9px] font-extrabold text-white bg-error-solid shadow-xs uppercase tracking-wider animate-pulse">
                      {t("urgent")}
                    </span>
                  )}
                  <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold text-white bg-black/60 backdrop-blur-md shadow-xs uppercase tracking-wider">
                    {conditions[product.condition]?.[locale] || product.condition}
                  </span>
                </div>
                
                <button 
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("Favorite clicked:", product.id);
                  }}
                  className="absolute top-3 right-3 z-10 size-8 rounded-full bg-white/80 hover:bg-white dark:bg-black/60 dark:hover:bg-black/90 backdrop-blur-md flex items-center justify-center text-secondary hover:text-error-solid active:scale-90 transition-all duration-200"
                  aria-label="Add to favorites"
                >
                  <svg className="size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                
                <img
                  src={product.image}
                  alt={productTitles[product.title]?.[locale] || product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info area */}
              <div className="flex-1 flex flex-col justify-between p-5">
                <div>
                  <span className="text-xs font-semibold text-brand-solid uppercase tracking-wider">
                    {t(product.category)}
                  </span>
                  <h3 className="text-sm font-bold text-primary mt-2 line-clamp-2 leading-snug group-hover:text-brand-solid transition-colors duration-300">
                    {productTitles[product.title]?.[locale] || product.title}
                  </h3>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="text-lg font-extrabold text-brand-solid">
                      {product.price}
                    </div>
                    {product.isNegotiable && (
                      <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 dark:text-emerald-400 px-2 py-0.5 rounded-md">
                        {t("negotiable")}
                      </span>
                    )}
                  </div>
                </div>
                
                {/* Meta details footer */}
                <div className="mt-4 pt-4 border-t border-secondary flex items-center gap-3">
                  <img
                    src={product.seller.avatar}
                    alt={product.seller.name}
                    className="size-7 rounded-full bg-secondary border border-secondary shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1">
                      <span className="text-[11px] font-bold text-primary truncate">
                        {product.seller.name}
                      </span>
                      {product.seller.isVerified && (
                        <svg className="size-3 text-blue-500 fill-blue-500 shrink-0" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                        </svg>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-[10px] text-tertiary mt-0.5">
                      <span className="truncate">{locationNames[product.location]?.[locale] || product.location}</span>
                      <span>•</span>
                      <span className="shrink-0">{timeTranslations[product.time]?.[locale] || product.time}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
