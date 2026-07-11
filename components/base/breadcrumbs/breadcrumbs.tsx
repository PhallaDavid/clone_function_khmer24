"use client";

import React from "react";
import Link from "next/link";
import { cx } from "@/utils/cx";

export interface BreadcrumbItem {
  label: string;
  href?: string;
  current?: boolean;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const HomeIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
  </svg>
);

const ChevronIcon = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

export const Breadcrumbs = ({ items, className }: BreadcrumbsProps) => {
  return (
    <nav aria-label="Breadcrumb" className={cx("flex items-center space-x-1.5 md:space-x-2 text-xs md:text-sm font-semibold select-none", className)}>
      <ol className="flex items-center flex-wrap gap-1.5 md:gap-2">
        <li className="flex items-center">
          <Link
            href="/"
            className="text-tertiary hover:text-primary transition-colors flex items-center gap-1 focus:outline-hidden"
          >
            <HomeIcon className="size-4 shrink-0" />
            <span className="sr-only">Home</span>
          </Link>
        </li>

        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const isLink = item.href && !isLast;

          return (
            <li key={index} className="flex items-center gap-1.5 md:gap-2">
              <ChevronIcon className="size-3.5 text-secondary/40 shrink-0 select-none" />
              {isLink ? (
                <Link
                  href={item.href!}
                  className="text-tertiary hover:text-primary transition-colors focus:outline-hidden truncate max-w-[120px] sm:max-w-none"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className="text-secondary select-text truncate max-w-[150px] sm:max-w-none font-bold"
                >
                  {item.label}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
