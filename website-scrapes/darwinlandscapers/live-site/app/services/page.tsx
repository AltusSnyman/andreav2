"use client";

import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { Scissors, Truck, Droplets, Sparkles, User, Hammer, TreeDeciduous, Shovel } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesPage() {
    const services = [
        { title: "Lawn Care", icon: <Scissors size={24} />, description: "Expert mowing, edging, and fertilization plans to keep your lawn lush and weed-free year-round." },
        { title: "Paving Solutions", icon: <Truck size={24} />, description: "Custom driveways, patios, and walkways designed to withstand the Darwin climate and enhance curb appeal." },
        { title: "Irrigation Systems", icon: <Droplets size={24} />, description: "Design, installation, and repair of efficient irrigation systems to save water and keep plants healthy." },
        { title: "Garden Design", icon: <Sparkles size={24} />, description: "Full conceptual design services, selecting the right plants for your soil and aesthetic preferences." },
        { title: "Retaining Walls", icon: <Hammer size={24} />, description: "Structural and decorative retaining walls built from concrete, timber, or stone to define your space." },
        { title: "Tree Lopping", icon: <TreeDeciduous size={24} />, description: "Professional tree pruning, trimming, and removal services to ensure safety and property protection." },
        { title: "Garden Maintenance", icon: <Shovel size={24} />, description: "Regular scheduled maintenance including weeding, pruning, and debris removal for a pristine garden." },
        { title: "Turf Laying", icon: <User size={24} />, description: "Expert turf installation, from soil preparation to laying and aftercare advice." },
    ];

    return (
        <div>
            <Hero
                title="Comprehensive Landscaping Services"
                subtitle="From design to maintenance, we handle it all with professionalism and care."
                backgroundImage="/images/hero-services.png"
            />

            <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {services.map((service, index) => (
                            <motion.div
                                key={service.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ServiceCard {...service} />
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 text-center">
                        <h3 className="text-2xl font-bold mb-4">Need something specific?</h3>
                        <p className="text-gray-500 mb-8 max-w-2xl mx-auto">
                            We offer custom solutions for both residential and commercial properties.
                            Contact us to discuss your unique requirements.
                        </p>
                        <a href="/contact" className="inline-flex items-center justify-center px-8 py-4 bg-primary text-text-main font-bold rounded-xl hover:bg-white hover:text-primary transition-colors shadow-lg shadow-primary/20">
                            Get a Custom Quote
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
}
