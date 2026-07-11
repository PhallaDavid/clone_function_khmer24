"use client";

import { type FC, type ReactNode } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Bell01, LifeBuoy01, SearchLg, Settings01 } from "@untitledui/icons";
import { TabList, Tabs } from "@/components/application/tabs/tabs";
import { BadgeWithDot } from "@/components/base/badges/badges";
import { DropdownAccountButton } from "@/components/base/dropdown/dropdown-account-button";
import { Input } from "@/components/base/input/input";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { Dropdown } from "@/components/base/dropdown/dropdown";
import { Button as AriaButton, Dialog as AriaDialog, DialogTrigger as AriaDialogTrigger, Popover as AriaPopover } from "react-aria-components";
import { AvatarLabelGroup } from "@/components/base/avatar/avatar-label-group";
import { Button } from "@/components/base/buttons/button";
import { RadioButtonBase } from "@/components/base/radio-buttons/radio-buttons";
import { useBreakpoint } from "@/hooks/use-breakpoint";
import { cx } from "@/utils/cx";
import { useTheme } from "@/components/theme-provider";
import { MobileNavigationHeader } from "./base-components/mobile-header";
import { NavAccountCard } from "./base-components/nav-account-card";
import { NavButton } from "./base-components/nav-button";
import { NavItemBase } from "./base-components/nav-item";
import { NavList } from "./base-components/nav-list";

const SunIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
);

const MoonIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
);

type NavItem = {
    /** Label text for the nav item. */
    label: string;
    /** URL to navigate to when the nav item is clicked. */
    href: string;
    /** Override the auto-detected active state. When omitted, derived from `activeUrl`. */
    current?: boolean;
    /** Icon component to display. */
    icon?: FC<{ className?: string }>;
    /** Badge to display. */
    badge?: ReactNode;
    /** List of sub-items to display. */
    items?: NavItem[];
};

/** Returns true if `href` matches `activeUrl` (exact or prefix for nested routes). */
const isItemActive = (href: string, activeUrl?: string) => {
    if (!activeUrl || !href) return false;
    if (href === activeUrl) return true;
    if (href !== "/" && activeUrl.startsWith(href + "/")) return true;
    return false;
};

interface HeaderNavigationBaseProps {
    /** URL of the currently active item. */
    activeUrl?: string;
    /** List of items to display. */
    items: NavItem[];
    /** List of sub-items to display. */
    subItems?: NavItem[];
    /** Whether to hide the bottom border. */
    hideBorder?: boolean;

    /**
     * Replaces the entire right-side actions (icon buttons + account dropdown).
     * When provided, the default actions are ignored.
     */
    actions?: ReactNode;

    /**
      * Centers the primary nav items between the logo and actions.
      * @default false
      */
    centered?: boolean;

    /**
     * Controls how the secondary header renders sub-items.
     * - "buttons" — NavButton pills (default)
     * - "tabs" — Underline tabs
     * @default "buttons"
     */
    secondaryType?: "buttons" | "tabs";
}

const DefaultActions = ({ activeUrl }: { activeUrl?: string }) => {
    const { theme, toggleTheme, setLoginOpen, setRegisterOpen, setSearchOpen } = useTheme();
    const pathname = usePathname();
    const router = useRouter();

    const segments = pathname.split("/");
    const currentLocale = ["en", "kh", "cn"].includes(segments[1]) ? segments[1] : "en";

    const changeLocale = (newLocale: string) => {
        let newPathname = pathname;
        const currentSegments = pathname.split("/");

        if (["en", "kh", "cn"].includes(currentSegments[1])) {
            currentSegments[1] = newLocale;
            newPathname = currentSegments.join("/");
        } else {
            newPathname = `/${newLocale}${pathname === "/" ? "" : pathname}`;
        }

        router.push(newPathname || "/");
    };

    return (
        <>
            {/* Language Selection Dropdown */}
            <div className="xl:mr-3 mr-1.5 shrink-0">
                <Dropdown.Root>
                    <AriaButton className="inline-flex items-center gap-1 px-2 py-1.5 rounded-lg border border-secondary bg-primary hover:bg-primary_hover text-xs font-semibold text-secondary transition-all outline-hidden cursor-pointer shadow-xs">
                        <span>{currentLocale === "kh" ? "ខ្មែរ (KH)" : currentLocale === "cn" ? "中文 (ZH)" : "English (EN)"}</span>
                        <svg className="size-3 text-secondary/60 transition-transform duration-200" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>
                    </AriaButton>
                    <Dropdown.Popover placement="bottom end" className="w-36">
                        <Dropdown.Menu selectionMode="single" selectedKeys={[currentLocale]} onAction={(key) => changeLocale(key as string)}>
                            <Dropdown.Item id="en" label="English" selectionIndicator="checkmark" />
                            <Dropdown.Item id="kh" label="ភាសាខ្មែរ" selectionIndicator="checkmark" />
                            <Dropdown.Item id="cn" label="中文 (简体)" selectionIndicator="checkmark" />
                        </Dropdown.Menu>
                    </Dropdown.Popover>
                </Dropdown.Root>
            </div>

            <div className="flex gap-0.5 xl:mr-2 mr-1">
                <NavButton
                    onClick={(e) => {
                        e.preventDefault();
                        toggleTheme();
                    }}
                    icon={theme === "dark" ? SunIcon : MoonIcon}
                    label={theme === "dark" ? "Light Mode" : "Dark Mode"}
                    tooltipPlacement="bottom"
                />
                <NavButton
                    current={activeUrl === "/search"}
                    icon={SearchLg}
                    label="Search"
                    onClick={(e) => {
                        e.preventDefault();
                        setSearchOpen(true);
                    }}
                    tooltipPlacement="bottom"
                />
                <NavButton
                    href={`/${currentLocale}/chat`}
                    icon={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                        </svg>
                    )}
                    label="Messages"
                    tooltipPlacement="bottom"
                />
            </div>

            <div className="flex items-center xl:gap-2 gap-1">
                <Button
                    color="primary"
                    size="sm"
                    className="bg-brand-solid text-white hover:bg-brand-solid_hover font-bold"
                    iconLeading={(props) => (
                        <svg {...props} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                    )}
                    onClick={(e) => {
                        e.preventDefault();
                        router.push(`/${currentLocale}/post`);
                    }}
                >
                    {currentLocale === "kh" ? "លក់ទំនិញ" : currentLocale === "cn" ? "发布商品" : "Sell"}
                </Button>
                <Button
                    color="secondary"
                    size="sm"
                    onClick={(e) => {
                        e.preventDefault();
                        setLoginOpen(true);
                    }}
                >
                    Log in
                </Button>
                <Button
                    color="primary"
                    size="sm"
                    className="bg-transparent border border-secondary text-primary hover:bg-primary_hover/30"
                    onClick={(e) => {
                        e.preventDefault();
                        setRegisterOpen(true);
                    }}
                >
                    Register
                </Button>
                {/* Simulated profile dropdown button */}
                <div className="ml-1 shrink-0">
                    <Dropdown.Root>
                        <AriaButton
                            className="size-8 rounded-full border border-secondary overflow-hidden hover:opacity-85 transition-opacity cursor-pointer shrink-0 focus:ring-1 focus:ring-brand-solid outline-hidden"
                            aria-label="My Profile"
                        >
                            <img
                                className="w-full h-full object-cover"
                                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop"
                                alt="Sophia Profile View"
                            />
                        </AriaButton>
                        <Dropdown.Popover placement="bottom end" className="w-48">
                            <Dropdown.Menu onAction={(key) => {
                                if (key === "profile") router.push(`/${currentLocale}/profile`);
                                if (key === "listings") router.push(`/${currentLocale}/profile?tab=listings`);
                                if (key === "settings") router.push(`/${currentLocale}/profile?tab=settings`);
                            }}>
                                <Dropdown.Item id="profile" label={currentLocale === "kh" ? "ប្រវត្តិរូបផ្ទាល់ខ្លួន" : currentLocale === "cn" ? "个人资料" : "My Profile"} />
                                <Dropdown.Item id="listings" label={currentLocale === "kh" ? "ទំនិញលក់របស់ខ្ញុំ" : currentLocale === "cn" ? "我发布的商品" : "My Listings"} />
                                <Dropdown.Item id="settings" label={currentLocale === "kh" ? "ការកំណត់គណនី" : currentLocale === "cn" ? "账户隐私设置" : "Account Settings"} />
                                <Dropdown.Item id="logout" label={currentLocale === "kh" ? "ចាកចេញ" : currentLocale === "cn" ? "退出登录" : "Log out"} />
                            </Dropdown.Menu>
                        </Dropdown.Popover>
                    </Dropdown.Root>
                </div>
            </div>
        </>
    );
};

export const HeaderNavigationBase = ({
    activeUrl,
    items,
    subItems,
    hideBorder = false,
    actions,
    centered = false,
    secondaryType = "buttons",
}: HeaderNavigationBaseProps) => {
    const { theme, toggleTheme, setSearchOpen } = useTheme();
    const isActive = (item: NavItem) => item.current ?? isItemActive(item.href, activeUrl);

    const activeParent = items.find((item) => isActive(item) || item.items?.some((sub) => isItemActive(sub.href, activeUrl)));
    const activeSubNavItems = subItems || activeParent?.items;

    const showSecondaryNav = activeSubNavItems && activeSubNavItems.length > 0;

    const hasCustomActions = actions !== undefined;

    const tabItems = showSecondaryNav
        ? activeSubNavItems.map((item) => ({
              id: item.label,
              children: item.label,
          }))
        : [];

    const activeTabKey = activeSubNavItems?.find((item) => isActive(item))?.label;

    return (
        <div className="sticky top-0 z-50 w-full bg-primary">
            <MobileNavigationHeader>
                <aside className="flex h-full max-w-full flex-col justify-between overflow-auto bg-primary pt-4">
                    <div className="flex flex-col gap-5 px-4">
                        <UntitledLogo className="h-6" />

                        <div onClick={() => setSearchOpen(true)} className="cursor-pointer">
                            <Input size="md" aria-label="Search" placeholder="Search" icon={SearchLg} isReadOnly />
                        </div>
                    </div>

                    <NavList items={items} />

                    <div className="mt-auto flex flex-col gap-3 p-4">
                        <div className="flex flex-col">
                            <NavItemBase
                                type="link"
                                href="#"
                                icon={theme === "dark" ? SunIcon : MoonIcon}
                                onClick={(e) => {
                                    e.preventDefault();
                                    toggleTheme();
                                }}
                            >
                                {theme === "dark" ? "Light Mode" : "Dark Mode"}
                            </NavItemBase>
                            <NavItemBase type="link" href="#" icon={LifeBuoy01}>
                                Support
                            </NavItemBase>
                            <NavItemBase
                                type="link"
                                href="#"
                                icon={Settings01}
                                badge={
                                    <BadgeWithDot color="success" type="modern" size="sm">
                                        Online
                                    </BadgeWithDot>
                                }
                            >
                                Settings
                            </NavItemBase>
                            <NavItemBase type="link" href="https://www.untitledui.com/" icon={Settings01}>
                                Open in browser
                            </NavItemBase>
                        </div>

                        <NavAccountCard />
                    </div>
                </aside>
            </MobileNavigationHeader>

            <header className="max-lg:hidden">
                <section
                    className={cx("flex h-16 w-full items-center justify-center bg-primary", (!hideBorder || showSecondaryNav) && "border-b border-secondary")}
                >
                    <div className={cx("flex w-full max-w-7xl mx-auto items-center pr-3 pl-4 md:px-8", centered && "gap-8")}>
                        <div className={cx("flex items-center", centered ? "flex-1" : "mr-4")}>
                            <a
                                aria-label="Go to homepage"
                                href="/"
                                className="rounded-xs outline-focus-ring focus-visible:outline-2 focus-visible:outline-offset-2"
                            >
                                <UntitledLogo className="h-6" />
                            </a>
                        </div>

                        <nav>
                            <ul className="flex items-center gap-0.5">
                                {items.map((item) => (
                                    <li key={item.label}>
                                        <NavButton current={isActive(item)} href={item.href}>
                                            {item.label}
                                        </NavButton>
                                    </li>
                                ))}
                            </ul>
                        </nav>

                        <div className={cx("flex items-center gap-3", centered ? "flex-1 justify-end" : "ml-auto")}>
                            {hasCustomActions ? actions : <DefaultActions activeUrl={activeUrl} />}
                        </div>
                    </div>
                </section>

                {showSecondaryNav && (
                    <section className={cx("flex w-full items-center justify-center bg-primary", !hideBorder && "border-b border-secondary")}>
                        {secondaryType === "tabs" ? (
                            <div className="w-full max-w-7xl mx-auto px-8 pt-3">
                                <Tabs selectedKey={activeTabKey}>
                                    <TabList size="sm" type="underline" items={tabItems} className="-mb-px before:hidden" />
                                </Tabs>
                            </div>
                        ) : (
                            <div className={cx("flex h-16 w-full max-w-7xl mx-auto items-center gap-8 px-8", centered ? "justify-center" : "justify-between")}>
                                <nav>
                                    <ul className={cx("flex items-center gap-0.5", centered && "justify-center")}>
                                        {activeSubNavItems.map((item) => (
                                            <li key={item.label}>
                                                <NavButton href={item.href} current={isActive(item)}>
                                                    {item.label}
                                                </NavButton>
                                            </li>
                                        ))}
                                    </ul>
                                </nav>

                                {!centered && (
                                    <div onClick={() => setSearchOpen(true)} className="cursor-pointer w-full max-w-70">
                                        <Input shortcut aria-label="Search" placeholder="Search" icon={SearchLg} size="sm" isReadOnly />
                                    </div>
                                )}
                            </div>
                        )}
                    </section>
                )}
            </header>
        </div>
    );
};



