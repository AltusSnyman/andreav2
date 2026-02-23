"use client";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface HeroTextProps {
    text?: string;
    className?: string;
}

export default function HeroText({
    text = "IMMERSE",
    className = "",
}: HeroTextProps) {
    const [count, setCount] = useState(0);
    const words = text.split(" ");
    let globalIndex = 0;

    return (
        <div className={cn("relative flex flex-col items-start justify-center w-full transition-colors duration-700", className)}>
            <div className="relative z-10 w-full flex flex-col items-start">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={count}
                        className="flex flex-wrap items-center justify-start w-full gap-x-4 md:gap-x-6 gap-y-2 md:gap-y-4"
                    >
                        {words.map((word, wordIdx) => (
                            <div key={wordIdx} className="flex whitespace-nowrap">
                                {word.split("").map((char, charIdx) => {
                                    const i = globalIndex++;
                                    return (
                                        <div
                                            key={charIdx}
                                            className="relative px-[1px] md:px-[2px] overflow-hidden group"
                                        >
                                            {/* Main Character - Using standard responsive sizing */}
                                            <motion.span
                                                initial={{ opacity: 0, filter: "blur(10px)" }}
                                                animate={{ opacity: 1, filter: "blur(0px)" }}
                                                transition={{ delay: i * 0.04 + 0.3, duration: 0.8 }}
                                                className="text-[clamp(2.5rem,8vw,5.5rem)] leading-none font-black text-white tracking-tighter"
                                            >
                                                {char}
                                            </motion.span>

                                            {/* Top Slice Layer */}
                                            <motion.span
                                                initial={{ x: "-100%", opacity: 0 }}
                                                animate={{ x: "100%", opacity: [0, 1, 0] }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: i * 0.04,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 text-[clamp(2.5rem,8vw,5.5rem)] leading-none font-black text-sky-400 z-10 pointer-events-none"
                                                style={{ clipPath: "polygon(0 0, 100% 0, 100% 35%, 0 35%)" }}
                                            >
                                                {char}
                                            </motion.span>

                                            {/* Middle Slice Layer */}
                                            <motion.span
                                                initial={{ x: "100%", opacity: 0 }}
                                                animate={{ x: "-100%", opacity: [0, 1, 0] }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: i * 0.04 + 0.1,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 text-[clamp(2.5rem,8vw,5.5rem)] leading-none font-black text-sky-200 z-10 pointer-events-none"
                                                style={{
                                                    clipPath: "polygon(0 35%, 100% 35%, 100% 65%, 0 65%)",
                                                }}
                                            >
                                                {char}
                                            </motion.span>

                                            {/* Bottom Slice Layer */}
                                            <motion.span
                                                initial={{ x: "-100%", opacity: 0 }}
                                                animate={{ x: "100%", opacity: [0, 1, 0] }}
                                                transition={{
                                                    duration: 0.7,
                                                    delay: i * 0.04 + 0.2,
                                                    ease: "easeInOut",
                                                }}
                                                className="absolute inset-0 text-[clamp(2.5rem,8vw,5.5rem)] leading-none font-black text-sky-400 z-10 pointer-events-none"
                                                style={{
                                                    clipPath: "polygon(0 65%, 100% 65%, 100% 100%, 0 100%)",
                                                }}
                                            >
                                                {char}
                                            </motion.span>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
