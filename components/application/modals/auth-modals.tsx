"use client";

import { useState } from "react";
import { Mail01, User01 } from "@untitledui/icons";
import { Modal, ModalOverlay, Dialog } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { UntitledLogo } from "@/components/foundations/logo/untitledui-logo";
import { cx } from "@/utils/cx";

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

const CloseIcon = ({ className }: { className?: string }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const IPhoneSpinner = ({ className }: { className?: string }) => (
    <div className={cx("relative size-8 animate-spin text-fg-quaternary", className)} style={{ animationDuration: '0.8s', animationTimingFunction: 'linear' }}>
        {[...Array(8)].map((_, i) => (
            <div
                key={i}
                className="absolute top-0 left-[45%] w-[10%] h-[30%] bg-current rounded-full origin-[50%_166%]"
                style={{
                    transform: `rotate(${i * 45}deg)`,
                    opacity: 1 - (i * 0.12),
                }}
            />
        ))}
    </div>
);

interface AuthModalProps {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    onSwitchToRegister?: () => void;
    onSwitchToLogin?: () => void;
}

export function LoginModal({ isOpen, onOpenChange, onSwitchToRegister }: AuthModalProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Login submit:", { email, password, rememberMe });
            onOpenChange(false);
        }, 2000);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal className="w-full max-w-md p-6 relative rounded-lg">
                <Dialog>
                    {({ close }) => (
                        <div className="flex flex-col">
                            {/* iPhone UI Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary/70 backdrop-blur-sm rounded-lg">
                                    <div className="flex flex-col items-center justify-center p-6 bg-secondary_alt/95 border border-secondary shadow-xl rounded-lg w-36 h-36">
                                        <IPhoneSpinner className="text-brand-solid size-9" />
                                        <span className="text-xs font-semibold text-secondary mt-4 select-none">Signing in...</span>
                                    </div>
                                </div>
                            )}

                            {/* Close button */}
                            <button
                                onClick={close}
                                className="absolute right-4 top-4 p-1.5 rounded-lg text-fg-quaternary hover:bg-secondary_hover hover:text-secondary transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon className="size-5" />
                            </button>

                            <div className="flex flex-col items-center text-center mt-4">
                                <UntitledLogo className="h-8 w-auto text-brand-solid" />
                                <h2 className="mt-6 text-2xl font-bold text-primary">
                                    Log in to your account
                                </h2>
                                <p className="mt-1 text-sm text-secondary">
                                    Welcome back! Please enter your details.
                                </p>
                            </div>

                            <div className="mt-6">
                                <div className="space-y-3">
                                    <Button
                                        color="secondary"
                                        className="w-full flex justify-center items-center gap-3 border border-secondary bg-primary hover:bg-primary_hover py-2 rounded-lg text-sm font-semibold"
                                        onClick={() => console.log("Google login")}
                                    >
                                        <GoogleIcon className="size-5" />
                                        Sign in with Google
                                    </Button>

                                    <div className="relative flex items-center py-1">
                                        <div className="flex-grow border-t border-secondary"></div>
                                        <span className="flex-shrink mx-3 text-[10px] text-tertiary uppercase tracking-wider font-semibold">Or email</span>
                                        <div className="flex-grow border-t border-secondary"></div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                    <Input
                                        label="Email"
                                        type="email"
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
                                        isRequired
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={setPassword}
                                        size="md"
                                    />

                                    <div className="flex items-center justify-between">
                                        <Checkbox
                                            isSelected={rememberMe}
                                            onChange={setRememberMe}
                                            label="Remember for 30 days"
                                            size="sm"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                console.log("Forgot password clicked");
                                                close();
                                            }}
                                            className="text-xs font-semibold text-brand-solid hover:underline"
                                        >
                                            Forgot password?
                                        </button>
                                    </div>

                                    <Button
                                        type="submit"
                                        color="primary"
                                        className="w-full bg-brand-solid text-white hover:bg-brand-solid_hover py-2 rounded-lg font-semibold text-sm"
                                    >
                                        Sign in
                                    </Button>
                                </form>

                                <p className="mt-6 text-center text-xs text-secondary">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setIsLoading(false);
                                            if (onSwitchToRegister) onSwitchToRegister();
                                        }}
                                        className="font-semibold text-brand-solid hover:underline"
                                    >
                                        Sign up
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

export function RegisterModal({ isOpen, onOpenChange, onSwitchToLogin }: AuthModalProps) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            console.log("Register submit:", { name, email, password, agreeTerms });
            onOpenChange(false);
        }, 2000);
    };

    return (
        <ModalOverlay isOpen={isOpen} onOpenChange={onOpenChange}>
            <Modal className="w-full max-w-md p-6 relative rounded-lg">
                <Dialog>
                    {({ close }) => (
                        <div className="flex flex-col">
                            {/* iPhone UI Loading Overlay */}
                            {isLoading && (
                                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-primary/70 backdrop-blur-sm rounded-lg">
                                    <div className="flex flex-col items-center justify-center p-6 bg-secondary_alt/95 border border-secondary shadow-xl rounded-lg w-36 h-36">
                                        <IPhoneSpinner className="text-brand-solid size-9" />
                                        <span className="text-xs font-semibold text-secondary mt-4 select-none">Signing up...</span>
                                    </div>
                                </div>
                            )}

                            {/* Close button */}
                            <button
                                onClick={close}
                                className="absolute right-4 top-4 p-1.5 rounded-lg text-fg-quaternary hover:bg-secondary_hover hover:text-secondary transition-colors"
                                aria-label="Close modal"
                            >
                                <CloseIcon className="size-5" />
                            </button>

                            <div className="flex flex-col items-center text-center mt-4">
                                <UntitledLogo className="h-8 w-auto text-brand-solid" />
                                <h2 className="mt-6 text-2xl font-bold text-primary">
                                    Create an account
                                </h2>
                                <p className="mt-1 text-sm text-secondary">
                                    Start your free 30-day trial today.
                                </p>
                            </div>

                            <div className="mt-6">
                                <div className="space-y-3">
                                    <Button
                                        color="secondary"
                                        className="w-full flex justify-center items-center gap-3 border border-secondary bg-primary hover:bg-primary_hover py-2 rounded-lg text-sm font-semibold"
                                        onClick={() => console.log("Google registration")}
                                    >
                                        <GoogleIcon className="size-5" />
                                        Sign up with Google
                                    </Button>

                                    <div className="relative flex items-center py-1">
                                        <div className="flex-grow border-t border-secondary"></div>
                                        <span className="flex-shrink mx-3 text-[10px] text-tertiary uppercase tracking-wider font-semibold">Or email</span>
                                        <div className="flex-grow border-t border-secondary"></div>
                                    </div>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                                    <Input
                                        label="Name"
                                        type="text"
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
                                        isRequired
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={setPassword}
                                        size="md"
                                        hint="Must be at least 8 characters."
                                    />

                                    <div className="flex items-center">
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
                                        className="w-full bg-brand-solid text-white hover:bg-brand-solid_hover py-2 rounded-lg font-semibold text-sm"
                                    >
                                        Get started
                                    </Button>
                                </form>

                                <p className="mt-6 text-center text-xs text-secondary">
                                    Already have an account?{" "}
                                    <button
                                        onClick={() => {
                                            setIsLoading(false);
                                            if (onSwitchToLogin) onSwitchToLogin();
                                        }}
                                        className="font-semibold text-brand-solid hover:underline"
                                    >
                                        Log in
                                    </button>
                                </p>
                            </div>
                        </div>
                    )}
                </Dialog>
            </Modal>
        </ModalOverlay>
    );
}

