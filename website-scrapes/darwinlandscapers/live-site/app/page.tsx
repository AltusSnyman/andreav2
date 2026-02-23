"use client";

import { Hero } from "@/components/Hero";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectShowcase } from "@/components/ProjectShowcase";
import { Testimonial } from "@/components/Testimonial";
import { Button } from "@/components/Button";
import { Users, Truck, Sparkles, Droplets, Scissors, Hammer } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  const services = [
    { title: "Lawn Care", icon: <Scissors size={24} />, description: "Expert mowing, edging, and fertilization for a lush green lawn." },
    { title: "Paving Solutions", icon: <Truck size={24} />, description: "Driveways, patios, and walkways built to last in Darwin's climate." },
    { title: "Irrigation", icon: <Droplets size={24} />, description: "Smart water systems saving you money and keeping plants healthy." },
    { title: "Garden Design", icon: <Sparkles size={24} />, description: "Full conceptual design and planting plans for your dream oasis." },
    { title: "Retaining Walls", icon: <Hammer size={24} />, description: "Structural and decorative walls to maximize your landscape." },
    { title: "Tree Lopping", icon: <Users size={24} />, description: "Professional pruning and removal for safety and aesthetics." },
  ];

  return (
    <div className="flex flex-col gap-0">
      {/* Hero Section */}
      <Hero
        title={`Transforming Darwin,\nOne Garden at a Time.`}
        subtitle="Professional landscaping, maintenance, and design services tailored for the Territory lifestyle."
        backgroundImage="/images/hero-home.png"
        showBadge={true}
      />

      {/* Services Grid */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-text-main dark:text-white mb-4 tracking-tight">
              We Do the <span className="text-primary">A-Z</span> of Landscaping
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              From Fannie Bay to Palmerston, we provide comprehensive garden solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/images/hero-about.png" alt="About Background" fill className="object-cover opacity-10" />
        </div>
        <div className="container mx-auto px-4 relative z-10 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 relative h-[500px] w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image src="/images/hero-about.png" alt="Our Team" fill className="object-cover" />
          </div>
          <div className="flex-1 space-y-6">
            <div className="inline-block px-3 py-1 bg-primary/10 text-primary font-bold rounded-full text-sm">About Us</div>
            <h2 className="text-4xl font-black text-text-main dark:text-white leading-tight">
              Locals You Can <span className="text-primary text-glow">Trust</span>
            </h2>
            <p className="text-lg text-gray-500 leading-relaxed">
              Frank and the team @ Darwin Landscapers understand the special needs of our region.
              Whether it&apos;s the Wet or the Dry, we know how to help your plants thrive.
              We service Darwin, Palmerston, Howard Springs, and beyond!
            </p>
            <ul className="space-y-4 pt-4">
              <li className="flex items-center gap-3 font-bold text-text-main dark:text-white">
                <span className="size-6 rounded-full bg-primary flex items-center justify-center text-white">✓</span>
                Free Quotes & Consultations
              </li>
              <li className="flex items-center gap-3 font-bold text-text-main dark:text-white">
                <span className="size-6 rounded-full bg-primary flex items-center justify-center text-white">✓</span>
                100% Customer Satisfaction
              </li>
              <li className="flex items-center gap-3 font-bold text-text-main dark:text-white">
                <span className="size-6 rounded-full bg-primary flex items-center justify-center text-white">✓</span>
                Experienced Local Team
              </li>
            </ul>
            <Button className="mt-4">Read Our Story</Button>
          </div>
        </div>
      </section>

      {/* Project Showcase */}
      <ProjectShowcase />

      {/* Testimonials */}
      <section className="py-20 bg-surface-light dark:bg-surface-dark">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Testimonial
              quote="Darwin Landscapers were great to work with. They did a full consultation, understanding our plans before perfectly executing the garden of our dreams."
              author="Jordan M"
              role="Palmerston Resident"
            />
            <Testimonial
              quote="Their team shows up on time, performing all of the maintenance we need. Our garden looks great once they're done!"
              author="Tony A"
              role="Fannie Bay"
            />
            <Testimonial
              quote="Highly professional. I couldn't imagine working with a more reliable and efficient team."
              author="Duncan H"
              role="Muirhead"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/patterns/noise.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10 space-y-8">
          <h2 className="text-4xl md:text-6xl font-black text-text-main mb-6">Ready to Transform Your Garden?</h2>
          <p className="text-xl text-text-main/80 max-w-2xl mx-auto font-medium">
            Get a free quote today and let us bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-gray-100 shadow-2xl">
              Get Free Quote
            </Button>
            <Button variant="outline" size="lg" className="border-text-main text-text-main hover:bg-text-main hover:text-white">
              Call (08) 8900 1234
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
