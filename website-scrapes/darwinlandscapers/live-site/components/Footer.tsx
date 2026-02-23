import Link from "next/link";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-surface-dark text-white pt-16 pb-8 border-t border-white/5">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="flex size-10 items-center justify-center rounded-full bg-primary text-text-main group-hover:scale-110 transition-transform">
                                <span className="font-bold text-xl">DL</span>
                            </div>
                            <span className="font-display font-bold text-xl tracking-tight">Darwin Landscapers</span>
                        </Link>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            Proudly serving Darwin and surrounding areas with top-tier landscaping solutions since 2010. Transforming your outdoor spaces into tropical paradises.
                        </p>
                        <div className="flex gap-4 pt-2">
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-text-main transition-colors">
                                <Facebook size={18} />
                            </a>
                            <a href="#" className="p-2 bg-white/5 rounded-full hover:bg-primary hover:text-text-main transition-colors">
                                <Instagram size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Our Services</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li><Link href="/services" className="hover:text-primary transition-colors">Landscape Design</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Garden Maintenance</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Irrigation Systems</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Paving & Retaining Walls</Link></li>
                            <li><Link href="/services" className="hover:text-primary transition-colors">Tree Lopping</Link></li>
                        </ul>
                    </div>

                    {/* Service Areas */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Service Areas</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li>Darwin City</li>
                            <li>Palmerston</li>
                            <li>Casuarina</li>
                            <li>Nightcliff</li>
                            <li>Berrimah</li>
                            <li>Fannie Bay</li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-white mb-6 text-sm uppercase tracking-wider">Contact Us</h4>
                        <ul className="space-y-4 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-primary mt-0.5 shrink-0" />
                                <span>Serving all of Darwin and Northern Territory</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-primary shrink-0" />
                                <a href="tel:0889001234" className="hover:text-white transition-colors">(08) 8900 1234</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-primary shrink-0" />
                                <a href="mailto:hello@darwinlandscapers.com" className="hover:text-white transition-colors">hello@darwin.com</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
                    <p>© {new Date().getFullYear()} Darwin Landscapers. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
