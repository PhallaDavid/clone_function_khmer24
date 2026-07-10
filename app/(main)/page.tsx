"use client";

import Image from "next/image";
import { Carousel } from "@/components/application/carousel/carousel-base";
import { cx } from "@/utils/cx";

const ChevronLeftIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 18l-6-6 6-6" />
    </svg>
);

const ChevronRightIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18l6-6-6-6" />
    </svg>
);

const slides = [
  {
    title: "Seamless Cloud Integration",
    description: "Connect to any cloud database and build interactive applications in minutes.",
    bg: "bg-brand-secondary",
    tag: "Integrations"
  },
  {
    title: "Real-time Collaboration",
    description: "Work with your team in real-time, share queries, and build dashboards together.",
    bg: "bg-success-secondary",
    tag: "Collab"
  },
  {
    title: "Advanced AI Analytics",
    description: "Let Gemini analyze your data patterns and automatically generate insights.",
    bg: "bg-warning-secondary",
    tag: "AI Powered"
  }
];

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-secondary font-sans transition-colors duration-200 py-12">
      {/* Carousel Section */}
      <div className="w-full max-w-7xl mx-auto px-4 md:px-8 mb-12">
        <Carousel.Root opts={{ loop: true }} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-sm font-semibold text-brand-solid uppercase tracking-wider">Features</span>
              <h2 className="text-display-xs md:text-display-sm font-semibold text-primary mt-1">Discover our platform</h2>
              <p className="text-md text-secondary mt-1">Explore all the premium tools available at your fingertips.</p>
            </div>
            
            <div className="flex items-center gap-2">
              <Carousel.PrevTrigger className="flex size-10 items-center justify-center rounded-full border border-secondary bg-primary text-secondary transition-colors hover:bg-primary_hover disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronLeftIcon className="size-5" />
              </Carousel.PrevTrigger>
              <Carousel.NextTrigger className="flex size-10 items-center justify-center rounded-full border border-secondary bg-primary text-secondary transition-colors hover:bg-primary_hover disabled:opacity-50 disabled:cursor-not-allowed">
                <ChevronRightIcon className="size-5" />
              </Carousel.NextTrigger>
            </div>
          </div>

          <Carousel.Content className="-ml-4">
            {slides.map((slide, idx) => (
              <Carousel.Item key={idx} className="pl-4 basis-full">
                <div className="flex flex-col md:flex-row h-auto md:h-80 justify-between items-stretch rounded-3xl border border-secondary bg-primary overflow-hidden transition-all hover:shadow-lg group">
                  {/* Left content area */}
                  <div className="flex-1 flex flex-col justify-between p-8 md:p-12">
                    <div>
                      <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-secondary text-primary">
                        {slide.tag}
                      </span>
                      <h3 className="text-display-xs font-bold text-primary mt-4 group-hover:text-brand-solid transition-colors">
                        {slide.title}
                      </h3>
                      <p className="text-md text-secondary mt-2 max-w-xl">
                        {slide.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 mt-6">
                      <span className="text-xs text-tertiary">Banner {idx + 1} of {slides.length}</span>
                      <button className="text-sm font-semibold text-brand-solid hover:underline flex items-center gap-1">
                        Learn more <ChevronRightIcon className="size-4" />
                      </button>
                    </div>
                  </div>

                  {/* Right visual/decorative gradient area */}
                  <div className="hidden md:flex w-72 lg:w-96 bg-secondary relative overflow-hidden items-center justify-center border-l border-secondary">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-solid/10 to-brand-solid/30 opacity-50" />
                    <div className="absolute size-48 rounded-full bg-brand-solid/10 blur-2xl -top-12 -right-12" />
                    <div className="absolute size-48 rounded-full bg-success-solid/10 blur-2xl -bottom-12 -left-12" />
                    <div className="relative z-10 flex flex-col items-center justify-center p-6 text-center">
                      <div className="size-16 rounded-2xl bg-primary border border-secondary flex items-center justify-center shadow-md">
                        <svg className="size-8 text-brand-solid" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <span className="text-xs font-medium text-secondary mt-3">Platform Feature</span>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel.Content>

          <Carousel.IndicatorGroup className="flex items-center justify-center gap-2 mt-8">
            {({ index }) => (
              <Carousel.Indicator
                key={index}
                index={index}
                className={({ isSelected }) =>
                  cx(
                    "h-2 rounded-full transition-all duration-300",
                    isSelected ? "w-6 bg-brand-solid" : "w-2 bg-secondary hover:bg-primary_hover"
                  )
                }
              />
            )}
          </Carousel.IndicatorGroup>
        </Carousel.Root>
      </div>

      {/* Main Info Section */}
      <div className="w-full max-w-3xl mx-auto px-4 md:px-8">
        <main className="flex flex-col items-center justify-between py-16 px-8 bg-primary border border-secondary shadow-lg rounded-xl sm:items-start">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={100}
            height={20}
            priority
          />
          <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left mt-8">
            <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-primary">
              To get started, edit the page.tsx file.
            </h1>
            <p className="max-w-md text-lg leading-8 text-secondary">
              Looking for a starting point or more instructions? Head over to{" "}
              <a
                href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-brand-solid hover:underline"
              >
                Templates
              </a>{" "}
              or the{" "}
              <a
                href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                className="font-medium text-brand-solid hover:underline"
              >
                Learning
              </a>{" "}
              center.
            </p>
          </div>
          <div className="flex flex-col gap-4 text-base font-medium sm:flex-row mt-8 w-full sm:w-auto">
            <a
              className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-brand-solid px-5 text-white transition-colors hover:bg-brand-solid_hover md:w-[158px]"
              href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                className="invert"
                src="/vercel.svg"
                alt="Vercel logomark"
                width={16}
                height={16}
              />
              Deploy Now
            </a>
            <a
              className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-secondary px-5 transition-colors hover:bg-primary_hover text-primary md:w-[158px]"
              href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              target="_blank"
              rel="noopener noreferrer"
            >
              Documentation
            </a>
          </div>
        </main>
      </div>
    </div>
  );
}
