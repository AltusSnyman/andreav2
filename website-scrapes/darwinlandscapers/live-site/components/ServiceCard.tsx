"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { clsx } from "clsx";

interface ServiceCardProps {
    title: string;
    icon: React.ReactNode;
    description?: string;
    colorClass?: string;
    href?: string;
}

export function ServiceCard({ title, icon, description, colorClass = "bg-primary/10 text-primary", href = "/services" }: ServiceCardProps) {
    return (
        <Link href={href}>
            <motion.div
                whileHover={{ y: -5 }}
                className="group relative h-full p-6 rounded-2xl bg-white dark:bg-card-dark border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
                <div className={clsx("absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-primary")}>
                    <ArrowRight size={20} className="-rotate-45" />
                </div>

                <div className="flex flex-col gap-4">
                    <div className={clsx("size-14 rounded-2xl flex items-center justify-center transition-colors duration-300 group-hover:scale-110", colorClass)}>
                        {icon}
                    </div>

                    <div>
                        <h3 className="text-lg font-bold text-text-main dark:text-white mb-2 group-hover:text-primary transition-colors">
                            {title}
                        </h3>
                        {description && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed font-medium">
                                {description}
                            </p>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}
