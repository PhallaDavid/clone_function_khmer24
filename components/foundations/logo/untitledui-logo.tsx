"use client";

import type { HTMLAttributes } from "react";
import { cx } from "@/utils/cx";
import { UntitledLogoMinimal } from "./untitledui-logo-minimal";

export const UntitledLogo = (props: HTMLAttributes<HTMLDivElement>) => {
    return (
        <div {...props} className={cx("flex h-8 items-center gap-2 select-none", props.className)}>
            {/* Minimal logo (custom SVG logomark) */}
            <UntitledLogoMinimal className="h-full w-auto shrink-0" />

            {/* Website name with premium styling */}
            <span className="font-extrabold text-lg tracking-tight text-primary leading-none">
                Quick<span className="text-[#9333ea]">Sell</span>
            </span>
        </div>
    );
};
