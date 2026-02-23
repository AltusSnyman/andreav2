import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="font-heading font-bold text-2xl tracking-tighter text-white mb-4">
                            NexGen <span className="text-sky-500">Roofing</span>
                        </h3>
                        <p className="font-body text-sm mb-4 max-w-sm">
                            We are a TRUE local Territorian business, having many years experience within the Construction industry, in Residential, Commercial, and Industrial sectors.
                        </p>
                        <p className="font-body text-sm italic">"For a job done right the first time"</p>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4 uppercase text-sm tracking-wider">Quick Links</h4>
                        <ul className="space-y-2 font-body text-sm">
                            <li><Link href="/" className="hover:text-sky-400 transition-colors">Home</Link></li>
                            <li><Link href="/services" className="hover:text-sky-400 transition-colors">Services</Link></li>
                            <li><Link href="/about" className="hover:text-sky-400 transition-colors">About Us</Link></li>
                            <li><Link href="/contact" className="hover:text-sky-400 transition-colors">Contact</Link></li>
                            <li><Link href="/gallery" className="hover:text-sky-400 transition-colors">Gallery</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-heading font-semibold text-white mb-4 uppercase text-sm tracking-wider">Contact Info</h4>
                        <ul className="space-y-3 font-body text-sm">
                            <li className="flex flex-col">
                                <span className="font-semibold text-slate-400 text-xs uppercase tracking-wide">Phone</span>
                                <a href="tel:0448159254" className="text-white hover:text-sky-400 transition-colors">0448 159 254</a>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-slate-400 text-xs uppercase tracking-wide">Email</span>
                                <a href="mailto:aaron@nexgenroofing.com.au" className="text-white hover:text-sky-400 transition-colors">aaron@nexgenroofing.com.au</a>
                            </li>
                            <li className="flex flex-col">
                                <span className="font-semibold text-slate-400 text-xs uppercase tracking-wide">Location</span>
                                <span>Fannie Bay, NT 0820, Australia</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm font-body text-slate-500">
                    <p>&copy; {new Date().getFullYear()} NexGen Roofing And Construction. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
