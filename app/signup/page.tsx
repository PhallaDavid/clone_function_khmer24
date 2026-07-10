"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail01, User01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";

const GoogleIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <g transform="matrix(1, 0, 0, 1, 0, 0)">
            <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.48C21.68,11.89 21.56,11.47 21.35,11.1z" fill="#4285F4" />
            <path d="M12,20.62c2.43,0 4.47,-0.8 5.96,-2.19l-3.3,-2.58c-0.91,0.61 -2.08,0.98 -3.3,0.98c-2.34,0 -4.32,-1.58 -5.03,-3.7H2.94v2.66C4.42,18.73 8.01,20.62 12,20.62z" fill="#34A853" />
            <path d="M6.97,13.13c-0.18,-0.54 -0.28,-1.11 -0.28,-1.7s0.1,-1.16 0.28,-1.7V7.07H2.94C2.33,8.28 2,9.66 2,11.43s0.33,3.15 0.94,4.36L6.97,13.13z" fill="#FBBC05" />
            <path d="M12,5.2c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,2.46 14.42,1.5 12,1.5C8.01,1.5 4.42,3.39 2.94,6.31l4.03,3.12C7.68,6.78 9.66,5.2 12,5.2z" fill="#EA4335" />
        </g>
    </svg>
);

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ name, email, password, agreeTerms });
    };

    return (
        <div className="flex min-h-screen w-full bg-primary text-primary transition-colors duration-200">
            {/* Left side: Register Form */}
            <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div className="mx-auto w-full max-w-sm lg:w-96">
                        <div>
                            <Link href="/">
                                <UntitledLogo className="h-8 w-auto text-brand-solid" />
                            </Link>
                            <h2 className="mt-8 text-3xl font-bold tracking-tight text-primary">
                                Create an account
                            </h2>
                            <p className="mt-2 text-sm text-secondary">
                                Start your free 30-day trial today.
                            </p>
                        </div>

                        <div className="mt-8">
                            <div className="space-y-4">
                                <Button
                                    color="secondary"
                                    className="w-full flex justify-center items-center gap-3 border border-secondary bg-primary hover:bg-primary_hover py-2.5 rounded-lg"
                                    onClick={() => console.log("Google registration")}
                                >
                                    <GoogleIcon className="size-5" />
                                    Sign up with Google
                                </Button>

                                <div className="relative flex items-center py-2">
                                    <div className="flex-grow border-t border-secondary"></div>
                                    <span className="flex-shrink mx-4 text-xs text-tertiary uppercase tracking-wider font-semibold">Or email</span>
                                    <div className="flex-grow border-t border-secondary"></div>
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-5">
                                <Input
                                    label="Name"
                                    type="text"
                                    name="name"
                                    autocomplete="name"
                                    isRequired
                                    placeholder="Enter your name"
                                    value={name}
                                    onChange={setName}
                                    icon={User01}
                                    size="md"
                                />

                                <Input
                                    label="Email"
                                    type="email"
                                    name="email"
                                    autocomplete="email"
                                    isRequired
                                    placeholder="Enter your email"
                                    value={email}
                                    onChange={setEmail}
                                    icon={Mail01}
                                    size="md"
                                />

                                <Input
                                    label="Password"
                                    type="password"
                                    name="password"
                                    autocomplete="new-password"
                                    isRequired
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={setPassword}
                                    size="md"
                                    hint="Must be at least 8 characters."
                                />

                                <div className="flex items-center justify-between">
                                    <Checkbox
                                        isSelected={agreeTerms}
                                        onChange={setAgreeTerms}
                                        label="I agree to the Terms & Conditions"
                                        size="sm"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    color="primary"
                                    className="w-full bg-brand-solid text-white hover:bg-brand-solid_hover py-2.5 rounded-lg font-semibold"
                                >
                                    Get started
                                </Button>
                            </form>

                            <p className="mt-8 text-center text-sm text-secondary">
                                Already have an account?{" "}
                                <Link
                                    href="/login"
                                    className="font-semibold text-brand-solid hover:underline"
                                >
                                    Log in
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Right side: Modern Visual Panel */}
                <div className="relative hidden w-0 flex-1 lg:block bg-secondary overflow-hidden border-l border-secondary">
                    <div className="absolute inset-0 bg-gradient-to-tr from-brand-solid/10 to-brand-solid/30 opacity-70" />
                    <div className="absolute size-96 rounded-full bg-brand-solid/10 blur-3xl -top-24 -right-24" />
                    <div className="absolute size-96 rounded-full bg-success-solid/10 blur-3xl -bottom-24 -left-24" />

                    <div className="absolute inset-0 flex flex-col justify-between p-16 text-primary z-10">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold tracking-wider text-brand-solid uppercase">Ahacambodia</span>
                        </div>

                        <div className="max-w-2xl">
                            {/* A premium preview UI block */}
                            <div className="mb-8 p-6 rounded-2xl border border-secondary bg-primary shadow-2xl relative overflow-hidden backdrop-blur-md">
                                <div className="flex items-center justify-between pb-4 border-b border-secondary">
                                    <div className="flex items-center gap-2">
                                        <div className="size-3 rounded-full bg-fg-error-primary" />
                                        <div className="size-3 rounded-full bg-fg-warning-secondary" />
                                        <div className="size-3 rounded-full bg-fg-success-primary" />
                                    </div>
                                    <div className="px-3 py-1 rounded bg-secondary text-[10px] font-mono text-secondary">
                                        localhost:3000
                                    </div>
                                </div>
                                <div className="space-y-3 mt-4">
                                    <div className="h-4 w-1/3 rounded bg-secondary" />
                                    <div className="h-8 w-full rounded bg-secondary_alt" />
                                    <div className="h-4 w-3/4 rounded bg-secondary" />
                                </div>
                            </div>

                            <blockquote className="space-y-3">
                                <p className="text-display-xs font-semibold leading-9">
                                    “This platform has completely transformed how we manage database access and query logging. It's lightning fast and beautifully designed.”
                                </p>
                                <footer className="mt-6 flex items-center gap-3">
                                    <div className="size-10 rounded-full bg-brand-solid/25 flex items-center justify-center font-bold text-brand-solid">
                                        OR
                                    </div>
                                    <div>
                                        <div className="text-md font-semibold text-primary">Olivia Rhye</div>
                                        <div className="text-sm text-secondary">Product Manager, ahacambodia</div>
                                    </div>
                                </footer>
                            </blockquote>
                        </div>

                        <div className="flex justify-between text-xs text-tertiary">
                            <span>© ahacambodia 2026</span>
                            <div className="flex gap-4">
                                <a href="#" className="hover:underline">Privacy Policy</a>
                                <a href="#" className="hover:underline">Terms of Service</a>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}
