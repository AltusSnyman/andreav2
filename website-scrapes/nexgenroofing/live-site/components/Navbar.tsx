"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Phone } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Services', href: '/services' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Gallery', href: '/gallery' },
];

export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed w-full z-50 glass border-b border-white/20 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="font-heading font-bold text-2xl tracking-tighter text-slate-900">
                            NexGen <span className="text-sky-700">Roofing</span>
                        </Link>
                    </div>

                    <div className="hidden md:flex space-x-8 items-center">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={cn(
                                    "font-body font-medium transition-colors hover:text-sky-700 text-sm tracking-wide uppercase",
                                    pathname === link.href ? "text-sky-700" : "text-slate-700"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a href="tel:0448159254" className="flex items-center space-x-2 bg-slate-900 text-white px-5 py-2.5 rounded-full hover:bg-sky-700 transition-colors shadow-[0_4px_14px_0_rgb(15,23,42,39%)] hover:shadow-[0_6px_20px_rgba(3,105,161,23%)]">
                            <Phone size={16} />
                            <span className="font-semibold text-sm">0448 159 254</span>
                        </a>
                    </div>

                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-slate-700 hover:text-sky-700 focus:outline-none"
                        >
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden glass absolute top-20 left-0 w-full border-b border-white/20 shadow-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col items-start bg-white/90">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setIsOpen(false)}
                                className={cn(
                                    "block px-3 py-2 rounded-md font-body font-medium text-base w-full text-left",
                                    pathname === link.href ? "text-sky-700 bg-slate-100" : "text-slate-700 hover:bg-slate-100"
                                )}
                            >
                                {link.name}
                            </Link>
                        ))}
                        <a href="tel:0448159254" className="flex items-center space-x-2 bg-sky-700 text-white px-4 py-3 rounded-md w-full mt-2">
                            <Phone size={18} />
                            <span className="font-semibold">Call 0448 159 254</span>
                        </a>
                    </div>
                </div>
            )}
        </nav>
    );
}
