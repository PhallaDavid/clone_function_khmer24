"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { RouterProvider } from "react-aria-components";
import { useRouter, usePathname } from "next/navigation";
import { LoginModal, RegisterModal } from "@/components/application/modals/auth-modals";
import { SearchModal } from "@/components/application/modals/search-modal";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
    theme: Theme;
    toggleTheme: () => void;
    isLoginOpen: boolean;
    setLoginOpen: (open: boolean) => void;
    isRegisterOpen: boolean;
    setRegisterOpen: (open: boolean) => void;
    isSearchOpen: boolean;
    setSearchOpen: (open: boolean) => void;
} | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>("light");
    const [isLoginOpen, setLoginOpen] = useState(false);
    const [isRegisterOpen, setRegisterOpen] = useState(false);
    const [isSearchOpen, setSearchOpen] = useState(false);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const segments = pathname.split("/");
        const currentLocale = ["en", "kh", "cn"].includes(segments[1]) ? segments[1] : "en";
        document.documentElement.lang = currentLocale;
        if (currentLocale === "kh") {
            document.documentElement.classList.add("font-khmer");
        } else {
            document.documentElement.classList.remove("font-khmer");
        }
    }, [pathname]);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

        setTheme(initialTheme);
        if (initialTheme === "dark") {
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === "light" ? "dark" : "light";
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
        if (newTheme === "dark") {
            document.documentElement.classList.add("dark-mode");
        } else {
            document.documentElement.classList.remove("dark-mode");
        }
    };

    const handleSwitchToRegister = () => {
        setLoginOpen(false);
        setTimeout(() => setRegisterOpen(true), 150); // Small delay for smooth overlay transition
    };

    const handleSwitchToLogin = () => {
        setRegisterOpen(false);
        setTimeout(() => setLoginOpen(true), 150);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, isLoginOpen, setLoginOpen, isRegisterOpen, setRegisterOpen, isSearchOpen, setSearchOpen }}>
            <RouterProvider navigate={router.push}>
                {children}
                <LoginModal isOpen={isLoginOpen} onOpenChange={setLoginOpen} onSwitchToRegister={handleSwitchToRegister} />
                <RegisterModal isOpen={isRegisterOpen} onOpenChange={setRegisterOpen} onSwitchToLogin={handleSwitchToLogin} />
                <SearchModal isOpen={isSearchOpen} onOpenChange={setSearchOpen} />
            </RouterProvider>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}

