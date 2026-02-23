"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface Project {
    id: number;
    title: string;
    location: string;
    category: string;
    image: string;
}

const projects: Project[] = [
    {
        id: 1,
        title: "Modern Backyard Retreat",
        location: "Fannie Bay",
        category: "Hardscaping & Paving",
        image: "/images/project-1.png",
    },
    {
        id: 2,
        title: "Corporate Green Space",
        location: "Palmerston CBD",
        category: "Commercial Maintenance",
        image: "/images/project-2.png",
    },
    {
        id: 3,
        title: "Sustainable Irrigation",
        location: "Casuarina",
        category: "Eco-Friendly Systems",
        image: "/images/project-3.png",
    },
];

export function ProjectShowcase() {
    return (
        <section className="py-20 bg-background-light dark:bg-background-dark/50">
            <div className="container mx-auto px-4 mb-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col md:flex-row items-end justify-between gap-4"
                >
                    <div>
                        <h2 className="text-3xl md:text-4xl font-black text-text-main dark:text-white mb-2">
                            Recent Transformations
                        </h2>
                        <p className="text-gray-500 text-lg">
                            See how we&apos;re changing Darwin, one garden at a time.
                        </p>
                    </div>
                    <a
                        href="/projects"
                        className="text-primary font-bold hover:text-primary-dark transition-colors flex items-center gap-2"
                    >
                        View All Projects
                        <span className="text-xl">→</span>
                    </a>
                </motion.div>
            </div>

            {/* Horizontal Scroll Container */}
            <div className="flex gap-6 overflow-x-auto pb-8 px-4 snap-x snap-mandatory scrollbar-hide">
                {projects.map((project) => (
                    <motion.div
                        key={project.id}
                        className="min-w-[320px] md:min-w-[400px] snap-center group relative rounded-3xl overflow-hidden aspect-[4/3] shadow-lg cursor-pointer"
                        whileHover={{ y: -5 }}
                    >
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                        <div className="absolute bottom-0 left-0 p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
                            <span className="text-xs font-bold uppercase tracking-wider bg-primary text-text-main px-2 py-1 rounded-md mb-2 inline-block">
                                {project.category}
                            </span>
                            <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                            <p className="text-sm text-gray-300 flex items-center gap-1">
                                <span className="size-1.5 rounded-full bg-primary" />
                                {project.location}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
