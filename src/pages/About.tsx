import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Target, Eye, Star, Award, Zap, Heart } from "lucide-react";
import { FaInstagram, FaFacebookF, FaTwitter } from "react-icons/fa";
import { supabase } from "../lib/supabase";
import { getImageUrl } from "../lib/utils";

export default function About() {
  const [celebrities, setCelebrities] = useState<any[]>([]);

  useEffect(() => {
    async function fetchCelebrities() {
      const { data } = await supabase.from('celebrities').select('*').order('created_at', { ascending: false });
      if (data) setCelebrities(data);
    }
    fetchCelebrities();
  }, []);
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };



  return (
    <div className="bg-white dark:bg-[#111111] pt-24 md:pt-32">
      {/* Introduction */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="aspect-[4/5] bg-surface dark:bg-[#1a1a1a] relative z-10 overflow-hidden">
                <img 
                  src="/wder.webp" 
                  alt="Photography team" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-full h-full border-[3px] border-[#D4AF37] z-0 hidden md:block"></div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="lg:w-1/2"
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black dark:text-white mb-6">The Art of Visual Storytelling</h1>
              <div className="w-16 h-[2px] bg-primary mb-8"></div>
              <p className="text-lg text-muted-text dark:text-gray-400 mb-6 leading-relaxed">
                Whales Visual is a premium photography agency based in the heart of Lagos, Nigeria. Founded with a passion for authenticity, we specialize in capturing the nuanced beauty of human connection, the grandeur of celebrations, and the sharp aesthetics of modern brands.
              </p>
              <p className="text-lg text-muted-text dark:text-gray-400 mb-8 leading-relaxed">
                Over the past 5 years, we have redefined visual narratives in Lagos by merging editorial sensibilities with documentary-style authenticity. Our approach is not just about taking pictures, it's about preserving legacies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-surface dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-[#111111] p-10 border border-border"
            >
              <Target size={32} className="text-primary dark:text-white mb-6" />
              <h3 className="text-2xl font-serif text-black dark:text-white mb-4">Our Mission</h3>
              <p className="text-muted-text dark:text-gray-400 leading-relaxed">
                To provide unparalleled visual storytelling that elevates our clients' most significant moments. We strive to create images that evoke emotion, capture truth, and reflect the absolute highest standard of photographic excellence.
              </p>
            </motion.div>

            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white dark:bg-[#111111] p-10 border border-border"
            >
              <Eye size={32} className="text-primary dark:text-white mb-6" />
              <h3 className="text-2xl font-serif text-black dark:text-white mb-4">Our Vision</h3>
              <p className="text-muted-text dark:text-gray-400 leading-relaxed">
                To be the most sought-after premium photography brand in Africa, known for our artistic integrity, unwavering professionalism, and ability to transform fleeting moments into timeless masterpieces.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-24 bg-white dark:bg-[#111111]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">The Whales Visual Experience</h2>
            <p className="text-lg text-muted-text dark:text-gray-400 max-w-2xl mx-auto">What you can expect when you entrust us with your vision.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart size={24}/>, title: "You Get Comfort", desc: "We create a relaxed, guided environment so your true personality shines naturally." },
              { icon: <Star size={24}/>, title: "You Get Premium Quality", desc: "Industry-leading gear and lighting setups ensure every shot is magazine-ready." },
              { icon: <Zap size={24}/>, title: "You Get Speed", desc: "Same-day sneak peeks and industry-leading turnaround times for final galleries." },
              { icon: <Award size={24}/>, title: "You Leave With Art", desc: "Not just digital files, but meticulously retouched works of art you'll be proud to print." }
            ].map((benefit, i) => (
              <motion.div 
                key={i}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                custom={i}
                className="text-center p-6"
              >
                <div className="w-16 h-16 rounded-full bg-surface dark:bg-[#1a1a1a] text-primary dark:text-white flex items-center justify-center mx-auto mb-6">
                  {benefit.icon}
                </div>
                <h4 className="text-xl font-serif text-black dark:text-white mb-3">{benefit.title}</h4>
                <p className="text-muted-text dark:text-gray-400">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-20 border-t border-border bg-white dark:bg-[#111111]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="lg:w-1/3">
              <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white mb-6">What Sets Us Apart</h2>
              <p className="text-muted-text dark:text-gray-400 mb-6">We don't just point and shoot. We produce. Our agency-style approach ensures every detail is handled.</p>
            </div>
            <div className="lg:w-2/3">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {[
                  "Licensed studio space in Lagos",
                  "Expert in-house retouching team",
                  "Pre-shoot location scouting included",
                  "Styling and mood board consultation",
                  "Backup equipment on every shoot",
                  "Secure, long-term cloud backup of your files"
                ].map((item, i) => (
                  <motion.li 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-start"
                  >
                    <CheckCircle size={20} className="text-primary dark:text-white mt-1 mr-4 shrink-0" />
                    <span className="text-lg text-black dark:text-white">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the CEO */}
      <section className="py-24 bg-surface dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-2/5"
            >
              <div className="aspect-[3/4] overflow-hidden border-4 border-white shadow-lg">
                <img 
                  src="/walex.webp" 
                  alt="CEO Portrait" 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:w-3/5"
            >
              <span className="text-sm font-medium uppercase tracking-widest text-primary mb-2 block">Lead Photographer & Founder</span>
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-2">Walex</h2>
              
              <div className="flex space-x-4 mb-8">
                <a href="https://www.instagram.com/4rael_photo?igsh=MXUzZng3ZWdmM3F0cA%3D%3D&utm_source=qr" className="text-muted-text hover:text-black dark:hover:text-white transition-colors"><FaInstagram size={20} /></a>
                <a href="#" className="text-muted-text hover:text-black dark:hover:text-white transition-colors"><FaFacebookF size={20} /></a>
                <a href="#" className="text-muted-text hover:text-black dark:hover:text-white transition-colors"><FaTwitter size={20} /></a>
              </div>

              <blockquote className="border-l-4 border-primary pl-6 mb-8 py-2">
                <p className="text-2xl font-serif italic text-black dark:text-white">"Making memories a worthy experience is not just a tagline—it is my personal promise to every client who steps in front of my lens."</p>
              </blockquote>

              <div className="mb-8">
                <h4 className="font-serif text-xl mb-4 text-black dark:text-white">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {["Portrait Photography", "Event Coverage", "Studio Lighting", "Post-Production", "Brand Storytelling"].map(skill => (
                    <span key={skill} className="px-4 py-2 border border-border dark:border-white/10 text-sm text-black dark:text-white bg-white dark:bg-[#111111]">{skill}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Notable Works & Celebs */}
          <div className="mt-24">
            <h3 className="text-3xl font-serif text-black dark:text-white mb-8 text-center">Celebrity Spotlight & Notable Works</h3>
            <div className={`flex gap-6 overflow-x-auto snap-x snap-mandatory pb-4 hide-scrollbar ${celebrities.length <= 4 ? 'md:grid md:grid-cols-4 md:flex-none' : ''}`}>
              {celebrities.map((item, i) => (
                <motion.div 
                  key={item.id || i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`group relative overflow-hidden aspect-square border border-white shrink-0 snap-start ${celebrities.length <= 4 ? 'w-[75vw] sm:w-[45vw] md:w-auto' : 'w-[75vw] sm:w-[45vw] md:w-[300px]'}`}
                >
                  <img src={getImageUrl(item.img)} alt={item.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6">
                    <h4 className="text-white font-serif text-lg">{item.name}</h4>
                    <p className="text-white/80 text-sm">{item.title}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
