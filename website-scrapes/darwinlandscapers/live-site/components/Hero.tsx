"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "./Button";

interface HeroProps {
    title: string;
    subtitle: string;
    backgroundImage: string;
    showBadge?: boolean;
}

export function Hero({ title, subtitle, backgroundImage, showBadge = false }: HeroProps) {
    return (
        <section className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none">
                <Image
                    src={backgroundImage}
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                    quality={90}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
            </div>

            {/* Content */}
            <div className="container relative z-10 px-4 pt-20 text-center flex flex-col items-center gap-6 max-w-4xl mx-auto">
                {showBadge && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium"
                    >
                        <CheckCircle size={16} className="text-primary" />
                        <span>Licensed & Insured Landscape Professionals</span>
                    </motion.div>
                )}

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-tight tracking-tight drop-shadow-xl"
                >
                    {title.replace(/\\n/g, "\n").split("\n").map((line, i) => (
                        <span key={i} className="block">
                            {line}
                        </span>
                    ))}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-lg md:text-xl text-gray-200 max-w-2xl font-medium leading-relaxed drop-shadow-md"
                >
                    {subtitle}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 mt-4"
                >
                    <Button size="lg" className="w-full sm:w-auto shadow-xl shadow-primary/20">
                        Get a Free Quote
                        <ArrowRight size={20} />
                    </Button>
                    <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                        View Our Services
                    </Button>
                </motion.div>
            </div>
        </section>
    );
}
