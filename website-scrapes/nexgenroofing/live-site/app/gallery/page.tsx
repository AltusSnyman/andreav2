import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Image from 'next/image';

const images = [
    "/images/img_home_hero.png",
    "/images/img_home_feat_1.png",
    "/images/img_home_feat_2.png",
    "/images/img_home_feat_3.png",
    "/images/img_srv_hero.png",
    "/images/img_srv_feat_1.png",
    "/images/img_srv_feat_2.png",
    "/images/img_srv_feat_3.png",
    "/images/img_srv_feat_4.png",
    "/images/img_abt_hero.png",
    "/images/img_abt_feat_1.png",
    "/images/img_con_hero.png"
];

export default function Gallery() {
    return (
        <>
            <Navbar />
            <main className="flex-grow">
                <Hero
                    title="Project Gallery"
                    subtitle="Explore our recent premium roofing and construction projects."
                    imageSrc="/images/img_srv_feat_1.png"
                />

                <section className="py-24 bg-slate-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {images.map((src, idx) => (
                                <div key={idx} className="relative aspect-square rounded-xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group">
                                    <Image src={src} alt={`Project ${idx + 1}`} fill className="object-cover group-hover:scale-110 transition-transform duration-700" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw" />
                                    <div className="absolute inset-0 bg-sky-950/0 group-hover:bg-sky-950/20 transition-colors duration-500 mix-blend-overlay"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
