"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroText from "@/components/ui/hero-shutter-text";

interface HeroProps {
    title: string;
    subtitle: string;
    imageSrc: string;
}

export default function Hero({ title, subtitle, imageSrc }: HeroProps) {
    const [isVideoPlaying, setIsVideoPlaying] = useState(true);

    return (
        <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden min-h-[80vh] flex items-center">
            {/* Background Image & Video */}
            <div className="absolute inset-0 z-0 bg-slate-900">
                {/* Static Background Image (always remains underneath) */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{ backgroundImage: `url(${imageSrc})` }}
                />

                {/* Hero Background Video - Plays once and fades out */}
                <video
                    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${isVideoPlaying ? 'opacity-100' : 'opacity-0 z-[-1]'}`}
                    autoPlay
                    muted
                    playsInline
                    onEnded={() => setIsVideoPlaying(false)}
                >
                    <source src="/videos/rooftimelaps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-slate-950/60 pointer-events-none" />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="inline-block mb-4 px-4 py-1.5 rounded-full bg-sky-500/20 border border-sky-400/30 backdrop-blur-sm"
                    >
                        <span className="text-sky-300 font-semibold text-sm tracking-wide uppercase">
                            Premium Roofing Specialists
                        </span>
                    </motion.div>

                    <div className="mb-6 -ml-4 flex justify-start w-full">
                        <HeroText text={title} className="!w-auto !h-auto !items-start" />
                    </div>

                    <p className="text-xl md:text-2xl text-slate-200 font-body mb-10 max-w-2xl leading-relaxed">
                        {subtitle}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-sky-600 rounded-lg hover:bg-sky-500 transition-all duration-300 shadow-[0_0_20px_rgba(3,105,161,0.4)] hover:shadow-[0_0_30px_rgba(14,165,233,0.6)] group"
                        >
                            Get a Free Quote
                            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                        <Link
                            href="/services"
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-lg transition-all duration-300"
                        >
                            Our Services
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
