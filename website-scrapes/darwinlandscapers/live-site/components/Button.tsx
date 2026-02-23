"use client";

import * as React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ButtonProps extends HTMLMotionProps<"button"> {
    variant?: "primary" | "secondary" | "outline" | "ghost";
    size?: "sm" | "md" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
        const variants = {
            primary:
                "bg-primary text-text-main font-bold shadow-[0_4px_14px_0_rgba(19,236,19,0.39)] hover:bg-white hover:text-primary active:scale-95",
            secondary:
                "bg-white/10 text-white backdrop-blur-md border border-white/20 hover:bg-white/20 active:scale-95",
            outline:
                "border-2 border-primary text-primary hover:bg-primary hover:text-text-main active:scale-95",
            ghost: "text-text-main dark:text-white hover:bg-primary/10 active:scale-95",
        };

        const sizes = {
            sm: "h-9 px-4 text-sm rounded-lg",
            md: "h-12 px-6 text-base rounded-xl",
            lg: "h-14 px-8 text-lg rounded-2xl",
        };

        return (
            <motion.button
                ref={ref}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                    "inline-flex items-center justify-center gap-2 transition-colors duration-200 disabled:opacity-50 disabled:pointer-events-none",
                    variants[variant],
                    sizes[size],
                    className
                )}
                {...props}
            >
                {children}
            </motion.button>
        );
    }
);
Button.displayName = "Button";

export { Button };
