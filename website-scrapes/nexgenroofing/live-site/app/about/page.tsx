import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Image from 'next/image';

export default function About() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero
                    title="About NexGen Roofing"
                    subtitle="A TRUE local Territorian business, dedicated to quality and customer satisfaction."
                    imageSrc="/images/img_abt_hero.png"
                />

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">Our Story</h2>
                                <div className="prose prose-lg prose-slate font-body text-slate-600">
                                    <p className="mb-6">
                                        We are a TRUE local Territorian business, having many years experience within the Construction industry, spanning the Residential, Commercial, and Industrial sectors.
                                    </p>
                                    <p className="mb-6">
                                        Here at NEXGEN we pride ourselves on being knowledgeable, reliable, professional, and producing quality work. We take our motto <strong>"for a job done right the first time"</strong> seriously.
                                    </p>
                                    <p>
                                        We also have a specific network of licensed and qualified Tradesman that we work with to maintain our level of quality so you can rest assured we'll take care of anything you can throw at us, whether it be a full house reno, a small extension, or just a leaky roof.
                                    </p>
                                </div>
                            </div>
                            <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl">
                                <Image src="/images/img_abt_feat_1.png" alt="NexGen Team" fill className="object-cover shrink-0" sizes="(max-width: 1024px) 100vw, 50vw" />
                            </div>
                        </div>

                        <div className="relative aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mt-12 group">
                            <Image src="/images/img_home_feat_2.png" alt="Happy Customer" fill className="object-cover group-hover:scale-105 transition-transform duration-1000" sizes="100vw" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-12">
                                <h3 className="text-3xl font-heading font-bold text-white">Trust, Reliability, and Community.</h3>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
