"use client";

import { Hero } from "@/components/Hero";

export default function AboutPage() {
    return (
        <div>
            <Hero
                title="Locals You Can Trust"
                subtitle="Serving Darwin and the Northern Territory with pride since 2010."
                backgroundImage="/images/hero-about.png"
            />

            <section className="py-20 bg-surface-light dark:bg-surface-dark">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="prose prose-lg dark:prose-invert mx-auto">
                        <h2 className="text-3xl font-bold text-primary mb-6">Our Story</h2>
                        <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8">
                            Frank and the team @ Darwin Landscapers are the locals you can trust to understand all of your garden design & maintenance needs.
                        </p>
                        <p className="mb-6">
                            Our experienced gardeners and landscapers are knowledgeable about the special needs of our region, helping plants grow and thrive whether it’s wet or dry season. We service Darwin, Palmerston, Howard Springs and even other parts of NT if required!
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12 not-prose">
                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                                <h3 className="text-xl font-bold mb-2 text-primary">Local Expertise</h3>
                                <p className="text-gray-500">We know the soil, the climate, and the plants that thrive in the Top End.</p>
                            </div>
                            <div className="bg-white dark:bg-white/5 p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-white/10">
                                <h3 className="text-xl font-bold mb-2 text-primary">Reliable Service</h3>
                                <p className="text-gray-500">We show up on time, every time, and leave your property looking immaculate.</p>
                            </div>
                        </div>

                        <h2 className="text-3xl font-bold text-primary mb-6">Why Choose Us?</h2>
                        <p>
                            In providing the best landscape and tree services in our area, our satisfied customers are able to better enjoy their yards and commercial landscaping. From Fannie Bay to Rapid Creek and Nightcliff, we are Darwin locals and are ready to transform your garden!
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
