"use client";

import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialProps {
    quote: string;
    author: string;
    role?: string;
    rating?: number;
    avatar?: string;
}

export function Testimonial({ quote, author, role = "Local Resident", rating = 5, avatar }: TestimonialProps) {
    return (
        <div className="relative p-8 rounded-3xl bg-surface-light dark:bg-white/5 border border-gray-100 dark:border-white/10 shadow-sm">
            <Quote className="absolute top-6 left-6 text-primary/20 size-12 -rotate-12" />

            <div className="relative z-10">
                <div className="flex gap-1 mb-6">
                    {[...Array(rating)].map((_, i) => (
                        <Star key={i} size={16} className="fill-primary text-primary" />
                    ))}
                </div>

                <p className="text-lg font-medium text-text-main dark:text-gray-200 leading-relaxed mb-6 italic">
                    &quot;{quote}&quot;
                </p>

                <div className="flex items-center gap-4">
                    <div className="size-12 rounded-full bg-gray-200 overflow-hidden relative">
                        {avatar ? (
                            <Image src={avatar} alt={author} fill className="object-cover" />
                        ) : (
                            <div className="size-full flex items-center justify-center bg-primary/10 text-primary font-bold text-lg">
                                {author.charAt(0)}
                            </div>
                        )}

                    </div>
                    <div>
                        <h4 className="font-bold text-text-main dark:text-white">{author}</h4>
                        <p className="text-sm text-gray-500">{role}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
