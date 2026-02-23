"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { clsx } from "clsx";

export function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "About", href: "/about" },
        { name: "Services", href: "/services" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <>
            <header
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
                    isScrolled
                        ? "bg-surface-light/80 dark:bg-surface-dark/80 backdrop-blur-md py-3 border-gray-200 dark:border-white/10 shadow-sm"
                        : "bg-transparent py-5 border-transparent"
                )}
            >
                <div className="container mx-auto px-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="flex size-10 items-center justify-center rounded-full bg-primary text-text-main group-hover:scale-110 transition-transform">
                            <span className="font-bold text-xl">DL</span>
                        </div>
                        <span className={clsx("font-display font-bold text-xl tracking-tight transition-colors", isScrolled ? "text-text-main dark:text-white" : "text-white")}>
                            Darwin Landscapers
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={clsx(
                                    "text-sm font-medium transition-colors hover:text-primary relative",
                                    pathname === link.href
                                        ? "text-primary font-bold"
                                        : isScrolled ? "text-text-main dark:text-gray-200" : "text-gray-100"
                                )}
                            >
                                {link.name}
                                {pathname === link.href && (
                                    <motion.div
                                        layoutId="underline"
                                        className="absolute left-0 right-0 -bottom-1 h-0.5 bg-primary"
                                    />
                                )}
                            </Link>
                        ))}
                        <a
                            href="tel:0889001234"
                            className={clsx(
                                "flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all",
                                isScrolled
                                    ? "bg-primary text-text-main hover:bg-primary-dark"
                                    : "bg-white/10 text-white backdrop-blur-sm border border-white/20 hover:bg-white hover:text-primary"
                            )}
                        >
                            <Phone size={16} />
                            <span>(08) 8900 1234</span>
                        </a>
                    </nav>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden p-2 text-primary"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-surface-light dark:bg-surface-dark pt-24 px-4 md:hidden"
                    >
                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={clsx(
                                        "text-2xl font-bold border-b border-gray-100 dark:border-white/10 pb-4",
                                        pathname === link.href ? "text-primary" : "text-text-main dark:text-white"
                                    )}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="flex flex-col gap-4 mt-4">
                                <a
                                    href="tel:0889001234"
                                    className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-primary text-text-main font-bold"
                                >
                                    <Phone size={20} />
                                    Call Now
                                </a>
                            </div>
                        </nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
