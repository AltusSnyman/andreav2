"use client";

import { Hero } from "@/components/Hero";
import { Button } from "@/components/Button";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert("Thank you for your message! We will get back to you shortly.");
        setFormData({ name: "", email: "", phone: "", message: "" });
    };

    return (
        <div>
            <Hero
                title="Get in Touch"
                subtitle="We're ready to help with your next landscaping project. Contact us for a free quote."
                backgroundImage="/images/hero-contact.png"
            />

            <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                        {/* Contact Info */}
                        <div>
                            <h2 className="text-3xl font-black mb-8 text-text-main dark:text-white">Contact Information</h2>
                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Phone size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Phone</h3>
                                        <p className="text-gray-500 mb-1">Mon-Fri from 8am to 5pm</p>
                                        <a href="tel:0889001234" className="text-xl font-bold text-primary hover:underline">(08) 8900 1234</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Mail size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Email</h3>
                                        <p className="text-gray-500 mb-1">Our friendly team is here to help.</p>
                                        <a href="mailto:hello@darwinlandscapers.com" className="text-xl font-bold text-primary hover:underline">hello@darwin.com</a>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Service Area</h3>
                                        <p className="text-gray-500">Darwin, Palmerston, and surrounding Northern Territory areas.</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg mb-1">Hours</h3>
                                        <p className="text-gray-500">Monday - Friday: 7:00 AM - 5:00 PM</p>
                                        <p className="text-gray-500">Saturday: By Appointment</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-white dark:bg-white/5 p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-white/10">
                            <h2 className="text-2xl font-bold mb-6 text-text-main dark:text-white">Send us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label htmlFor="name" className="text-sm font-bold text-gray-700 dark:text-gray-300">Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Your name"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-bold text-gray-700 dark:text-gray-300">Phone</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                            placeholder="Your phone number"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-gray-700 dark:text-gray-300">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                                        placeholder="your@email.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-gray-700 dark:text-gray-300">Message</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full p-4 rounded-xl border border-gray-200 dark:border-white/10 bg-surface-light dark:bg-black/20 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                                        placeholder="How can we help you?"
                                    />
                                </div>

                                <Button type="submit" size="lg" className="w-full">
                                    Send Message
                                </Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
