import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Camera, Image as ImageIcon, Users, Briefcase, ChevronRight, Star, StarHalf, ChevronDown } from "lucide-react";
import { supabase } from "../lib/supabase";
import { getImageUrl } from "../lib/utils";

export default function Home() {
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [featuredImages, setFeaturedImages] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const [imagesRes, testRes] = await Promise.all([
        supabase.from('gallery_images').select('img').limit(6).order('created_at', { ascending: false }),
        supabase.from('testimonials').select('*').order('created_at', { ascending: false })
      ]);
      if (imagesRes.data) setFeaturedImages(imagesRes.data);
      if (testRes.data) setTestimonials(testRes.data);
    }
    fetchData();
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const services = [
    {
      icon: <Users size={28} className="text-primary dark:text-white" />,
      title: "Wedding Photography",
      desc: "Capturing the magic and emotion of your special day with timeless elegance."
    },
    {
      icon: <ImageIcon size={28} className="text-primary dark:text-white" />,
      title: "Portrait Sessions",
      desc: "Professional and creative portraits that highlight your unique personality."
    },
    {
      icon: <Briefcase size={28} className="text-primary dark:text-white" />,
      title: "Corporate Events",
      desc: "Comprehensive coverage for corporate gatherings, conferences, and brand activations."
    },
    {
      icon: <Camera size={28} className="text-primary dark:text-white" />,
      title: "Brand Photography",
      desc: "Elevating your brand identity with striking, high-quality visual storytelling."
    }
  ];

  return (
    <div className="bg-white dark:bg-[#111111]">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=2070&auto=format&fit=crop" 
            alt="Photography Hero" 
            className="w-full h-full object-cover"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-[#1a1a1a]/55 mix-blend-multiply"></div>
        </div>
        
        <div className="container relative z-10 mx-auto px-6 md:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl mx-auto"
          >
            <span className="block text-white/80 uppercase tracking-widest text-sm font-medium mb-6">Lagos, Nigeria</span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-8 leading-tight">
              We Capture Moments <br className="hidden md:block"/>That Last Forever
            </h1>
            <p className="text-lg md:text-xl text-white/90 font-light mb-10 max-w-2xl mx-auto">
              Premium photography and visual storytelling that elevates your brand and preserves your most cherished memories.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link to="/booking" className="btn-primary w-full sm:w-auto">
                Book a Shoot
              </Link>
              <Link to="/gallery" className="btn-outline flex items-center justify-center w-full sm:w-auto group">
                View Our Work 
                <ChevronRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-24 md:py-32 bg-surface dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">Our Expertise</h2>
            <div className="w-20 h-[2px] bg-primary"></div>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {services.map((service, index) => (
              <motion.div key={index} variants={fadeInUp} className="bg-white dark:bg-[#111111] p-8 border-t-4 border-primary shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300">
                <div className="mb-6">{service.icon}</div>
                <h3 className="text-xl font-serif text-black dark:text-white mb-3">{service.title}</h3>
                <p className="text-muted-text dark:text-gray-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#111111]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={fadeInUp}
              className="lg:w-1/2"
            >
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6 leading-tight">
                An Unrelenting Focus on Aesthetic Excellence
              </h2>
              <p className="text-lg text-muted-text dark:text-gray-400 mb-8 leading-relaxed">
                We believe that every subject has a unique story waiting to be told. Through meticulous attention to light, composition, and authentic emotion, we deliver images that stand the test of time.
              </p>
              <Link to="/about" className="inline-flex items-center text-primary dark:text-white font-medium hover:text-ctaHover transition-colors group border-b border-primary dark:border-white pb-1">
                More about our approach
                <ChevronRight size={18} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
            
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="lg:w-1/2 grid grid-cols-2 gap-6 w-full"
            >
              {[
                { stat: "200+", label: "Shoots Completed" },
                { stat: "8 Years", label: "Experience" },
                { stat: "50+", label: "Celebrity Clients" },
                { stat: "#1 Rated", label: "In Lagos" }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeInUp} className="border border-border dark:border-white/10 p-8 flex flex-col justify-center">
                  <span className="text-4xl font-serif text-primary dark:text-white mb-2 block">{item.stat}</span>
                  <span className="text-sm text-muted-text dark:text-gray-400 font-medium uppercase tracking-wider">{item.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Work Teaser */}
      <section className="py-24 md:py-32 bg-surface dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex justify-between items-end mb-16">
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
            >
              <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">Selected Works</h2>
              <div className="w-20 h-[2px] bg-primary"></div>
            </motion.div>
            <Link to="/gallery" className="hidden md:flex items-center text-primary font-medium hover:text-ctaHover transition-colors group">
              See Full Gallery
              <ChevronRight size={20} className="ml-1 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {featuredImages.map((imgItem, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="relative aspect-[4/5] overflow-hidden group bg-gray-200 dark:bg-gray-800"
              >
                <img src={getImageUrl(imgItem.img)} alt="Gallery feature" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />

              </motion.div>
            ))}
          </div>
          
          <div className="md:hidden text-center mt-12">
            <Link to="/gallery" className="inline-flex items-center text-primary font-medium border-b border-primary pb-1">
              See Full Gallery
              <ChevronRight size={18} className="ml-1" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 md:py-32 bg-white dark:bg-[#111111]">
        <div className="container mx-auto px-6 md:px-12">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="text-center mb-16 md:mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-4">Client Stories</h2>
            <div className="w-20 h-[2px] bg-primary mx-auto"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.slice(0, showAllTestimonials ? testimonials.length : 3).map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flex flex-col"
              >
                {/* Chat Bubble Card */}
                <div className="relative bg-white dark:bg-[#111111] p-8 rounded-2xl shadow-[0_4px_20px_-10px_rgba(0,0,0,0.08)] mb-8 border border-border dark:border-white/10">
                  <p className="text-lg font-serif italic text-black dark:text-white leading-relaxed mb-6">"{t.quote}"</p>
                  <div className="flex space-x-1">
                    {[...Array(Math.floor(t.rating))].map((_, idx) => (
                      <Star key={`full-${idx}`} size={16} className="fill-primary text-primary dark:fill-white dark:text-white" />
                    ))}
                    {t.rating % 1 !== 0 && (
                      <StarHalf size={16} className="fill-primary text-primary dark:fill-white dark:text-white" />
                    )}
                    {[...Array(5 - Math.ceil(t.rating))].map((_, idx) => (
                      <Star key={`empty-${idx}`} size={16} className="text-primary dark:text-white" />
                    ))}
                  </div>
                  {/* Bubble Tail */}
                  <div className="absolute -bottom-3 left-8 w-6 h-6 bg-white dark:bg-[#111111] border-b border-r border-border dark:border-white/10 transform rotate-45"></div>
                </div>
                
                {/* Avatar and Info */}
                <div className="flex items-center space-x-4 px-4">
                  <img src={getImageUrl(t.avatar_url)} alt={t.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                  <div>
                    <p className="font-medium text-black dark:text-white">{t.name}</p>
                    <p className="text-sm text-muted-text dark:text-gray-400 mt-0.5">{t.event}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {!showAllTestimonials && (
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-12"
            >
              <button 
                onClick={() => setShowAllTestimonials(true)} 
                className="flex flex-col items-center text-primary dark:text-white hover:text-ctaHover dark:hover:text-gray-300 transition-colors focus:outline-none group"
              >
                <span className="text-sm font-medium mb-2 uppercase tracking-widest group-hover:underline">More Stories</span>
                <ChevronDown size={28} className="animate-bounce" />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="bg-[#111111] py-24 border-t border-primary/20">
        <div className="container mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl md:text-5xl font-serif text-white mb-8 max-w-3xl mx-auto leading-tight">
            Ready to create something beautiful together?
          </h2>
          <Link to="/booking" className="btn-primary inline-block">
            Book Your Session
          </Link>
        </div>
      </section>
    </div>
  );
}
