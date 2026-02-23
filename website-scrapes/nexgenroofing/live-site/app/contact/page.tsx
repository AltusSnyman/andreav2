import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';

export default function Contact() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero
                    title="Contact Us"
                    subtitle="Get in touch with NexGen Roofing for a free quote or to discuss your next project."
                    imageSrc="/images/img_con_hero.png"
                />

                <section className="py-24 bg-white relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-3xl font-heading font-bold text-slate-900 mb-8">Get In Touch</h2>

                                <div className="space-y-8">
                                    <div className="flex items-start flex-col gap-4">
                                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 shrink-0">
                                            <Phone size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-lg text-slate-900">Phone</h3>
                                            <a href="tel:0448159254" className="text-slate-600 font-body text-xl hover:text-sky-600 transition-colors">0448 159 254</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start flex-col gap-4">
                                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 shrink-0">
                                            <Mail size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-lg text-slate-900">Email</h3>
                                            <a href="mailto:aaron@nexgenroofing.com.au" className="text-slate-600 text-xl font-body hover:text-sky-600 transition-colors">aaron@nexgenroofing.com.au</a>
                                        </div>
                                    </div>

                                    <div className="flex items-start flex-col gap-4">
                                        <div className="w-12 h-12 bg-sky-100 rounded-full flex items-center justify-center text-sky-600 shrink-0">
                                            <MapPin size={24} />
                                        </div>
                                        <div>
                                            <h3 className="font-heading font-bold text-lg text-slate-900">Location</h3>
                                            <p className="text-slate-600 text-xl font-body">Fannie Bay, NT 0820, Australia</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 shadow-xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 w-64 h-64 bg-sky-200/50 rounded-full blur-3xl -mr-20 -mt-20 z-0"></div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-heading font-bold text-slate-900 mb-6">Send us a message</h3>
                                    <form className="space-y-6">
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">Full Name</label>
                                            <input type="text" id="name" className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow" placeholder="John Doe" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                                            <input type="email" id="email" className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow" placeholder="john@example.com" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                                            <textarea id="message" rows={4} className="w-full px-4 py-3 bg-white rounded-lg border border-slate-200 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-shadow" placeholder="How can we help you?"></textarea>
                                        </div>
                                        <button type="button" className="w-full py-4 px-6 bg-sky-600 hover:bg-sky-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all">
                                            Send Message
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
