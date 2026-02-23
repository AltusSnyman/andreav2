import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import Image from 'next/image';
import Link from 'next/link';
import { ShieldCheck, ThumbsUp, Medal, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Hero
          title="NexGen Roofing And Construction"
          subtitle="Licensed And Insured For All Types Of Roofing Work. Serving the Northern Territory with pride."
          imageSrc="/images/img_home_hero.png"
        />

        {/* Introduction Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 mb-6">Reliable Roofing Specialists</h2>
              <p className="text-lg text-slate-600 font-body">
                We offer competitive rates on all our roofing services including new roof construction, roof maintenance and repairs. Whether you have a large-scale roof replacement project or you need your roof resealed, we can take care of your roof work.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <ThumbsUp size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Customer Satisfaction</h3>
                <p className="text-slate-600 font-body flex-grow">
                  We pride ourselves in our workmanship and our dedication to our individual clients.
                </p>
                <div className="mt-6 aspect-video relative rounded-lg overflow-hidden shrink-0">
                  <Image src="/images/img_home_feat_2.png" alt="Customer Satisfaction" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Licensed & Bonded</h3>
                <p className="text-slate-600 font-body flex-grow">
                  We are fully licensed, insured, and bonded, so that we can help you with any projects with complete peace of mind.
                </p>
                <div className="mt-6 aspect-[4/3] relative rounded-lg overflow-hidden shrink-0">
                  <Image src="/images/img_home_feat_3.png" alt="Storm Resistant Roof" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>

              <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
                <div className="w-14 h-14 bg-sky-100 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                  <Medal size={28} />
                </div>
                <h3 className="text-xl font-heading font-bold text-slate-900 mb-3">Quality & Efficiency</h3>
                <p className="text-slate-600 font-body flex-grow">
                  If you want a job done with excellent quality then do not hesitate to call us. We do it right the first time.
                </p>
                <div className="mt-6 aspect-video relative rounded-lg overflow-hidden shrink-0">
                  <Image src="/images/img_home_feat_1.png" alt="Quality Craftsmanship" fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          <div className="absolute inset-0 opacity-30">
            <Image src="/images/img_srv_feat_1.png" alt="Background Roofing" fill className="object-cover" sizes="100vw" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent z-0"></div>
          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">Ready to upgrade your roof?</h2>
            <p className="text-xl text-slate-300 font-body mb-10">
              Contact us today for a free, no-obligation quote from our expert team in Fannie Bay, NT.
            </p>
            <Link href="/contact" className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-sky-900 bg-white rounded-lg hover:bg-slate-100 transition-colors shadow-lg">
              Get in Touch Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
