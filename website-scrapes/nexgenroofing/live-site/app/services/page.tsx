import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import { Hammer, Wrench, Building2, Droplets } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        title: "Roof Plumbing",
        icon: <Wrench size={32} />,
        description: "Specializing in all aspects of roofing including repairs, maintenance, new Colorbond roofs, roof conversions, cladding, guttering, downpipes, fascias, and skylight installation.",
        image: "/images/img_srv_feat_1.png"
    },
    {
        title: "Carpentry",
        icon: <Hammer size={32} />,
        description: "Timber and metal trusses, wall frames, pergolas, stairs, verandahs, decking, CFC sheeting, steel structural works and welding.",
        image: "/images/img_srv_feat_2.png"
    },
    {
        title: "Project Management",
        icon: <Building2 size={32} />,
        description: "Expert project managing for renovations, extensions, and general property maintenance to ensure your job is done right the first time.",
        image: "/images/img_srv_feat_3.png"
    },
    {
        title: "Property Maintenance & Demolition",
        icon: <Droplets size={32} />,
        description: "Up to 2-storey residential demolition, concreting, tiling, painting, fencing, water blasting, and comprehensive roofing maintenance.",
        image: "/images/img_srv_feat_4.png"
    }
];

export default function Services() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero
                    title="Our Premium Services"
                    subtitle="From minor roof repairs to full-scale restorations and carpentry, we have the expertise to handle it all."
                    imageSrc="/images/img_srv_hero.png"
                />

                <section className="py-24 bg-white">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">Comprehensive Construction Solutions</h2>
                            <p className="text-lg text-slate-600 font-body">
                                We are equipped to handle projects of all sizes across the residential, commercial, and industrial sectors in the Northern Territory.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            {services.map((service, index) => (
                                <div key={index} className="flex flex-col bg-slate-50 rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow group">
                                    <div className="relative h-64 w-full overflow-hidden">
                                        <Image src={service.image} alt={service.title} fill className="object-cover group-hover:scale-105 transition-transform duration-700" sizes="(max-width: 768px) 100vw, 50vw" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                                        <div className="absolute bottom-6 left-6 w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white border border-white/20">
                                            {service.icon}
                                        </div>
                                    </div>
                                    <div className="p-8">
                                        <h3 className="text-2xl font-heading font-bold text-slate-900 mb-4">{service.title}</h3>
                                        <p className="text-slate-600 font-body leading-relaxed text-lg">
                                            {service.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-20 rounded-3xl overflow-hidden relative aspect-[21/9] shadow-2xl">
                            <Image src="/images/img_home_hero.png" alt="Colorbond Roofing Finishing Touch" fill className="object-cover shrink-0" sizes="100vw" />
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
