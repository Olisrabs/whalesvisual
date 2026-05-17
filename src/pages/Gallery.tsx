import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Maximize2, X, ChevronLeft, ChevronRight } from "lucide-react";
import { cn, getImageUrl } from "../lib/utils";
import { supabase } from "../lib/supabase";

// We will fetch these from Supabase now
// const categories = ["All", "Weddings", "Portraits", "Corporate", "Events", "Celebrities"];
// Initial data arrays are removed since we load dynamically.

export default function Gallery() {
  const [activeTab, setActiveTab] = useState("All");
  const [galleryData, setGalleryData] = useState<any[]>([]);
  const [albumsData, setAlbumsData] = useState<any[]>([]);
  const [filteredImages, setFilteredImages] = useState<any[]>([]);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);


  useEffect(() => {
    async function fetchData() {

      const [galleryRes, albumsRes] = await Promise.all([
        supabase.from('gallery_images').select('*').order('created_at', { ascending: false }),
        supabase.from('albums').select('*').order('created_at', { ascending: false })
      ]);
      
      if (galleryRes.data) {
        setGalleryData(galleryRes.data);
        setFilteredImages(galleryRes.data);
      }
      if (albumsRes.data) {
        setAlbumsData(albumsRes.data);
      }

    }
    fetchData();
  }, []);

  useEffect(() => {
    if (activeTab === "All") {
      setFilteredImages(galleryData);
    } else {
      setFilteredImages(galleryData.filter(img => img.category === activeTab));
    }
  }, [activeTab, galleryData]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % filteredImages.length);
  };
  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="bg-white dark:bg-[#111111] pt-24 md:pt-32 min-h-screen">
      {/* Header */}
      <section className="py-16 bg-surface dark:bg-[#1a1a1a] text-center px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black dark:text-gray-300 mb-6">Our Work</h1>
        <p className="text-lg text-muted-text dark:text-gray-400 max-w-2xl mx-auto mb-10">A curated collection of our finest moments, captured with intention and artful precision.</p>
        <Link to="/booking" className="btn-outline inline-block mt-4">Book a Shoot</Link>
      </section>

      {/* Gallery Filter */}
      <section className="py-12 border-b border-border dark:border-white/10">
        <div className="container mx-auto px-6 overflow-x-auto no-scrollbar">
          <div className="flex items-center justify-center space-x-2 md:space-x-4 min-w-max mx-auto">
            {["All", ...Array.from(new Set(galleryData.map(img => img.category)))].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={cn(
                  "px-6 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeTab === cat 
                    ? "bg-gradient-to-r from-[#D4AF37] to-[#b5952f] text-[#111111] font-bold shadow-md" 
                    : "bg-surface text-muted-text dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-800"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6 md:px-12">
          <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-6 pb-12">
            <AnimatePresence>
              {filteredImages.map((item, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  key={item.id}
                  className="break-inside-avoid inline-block w-full mb-6 relative group overflow-hidden cursor-pointer bg-gray-100 dark:bg-gray-800 rounded-sm"
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={getImageUrl(item.img)} 
                    alt={item.category} 
                    className="w-full h-auto block object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center">
                      <Maximize2 size={32} className="text-white mb-2" />
                      <span className="text-white font-medium tracking-wider uppercase text-sm">{item.category}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Client Albums */}
      <section className="py-24 bg-surface dark:bg-[#1a1a1a]">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="text-3xl md:text-4xl font-serif text-black dark:text-white mb-12 text-center">Client Albums</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {albumsData.map(album => (
              <div key={album.id} className="bg-white dark:bg-[#111111] border border-border dark:border-white/10 group cursor-pointer">
                <div className="aspect-[3/2] overflow-hidden relative">
                  <img src={getImageUrl(album.img)} alt={album.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy"/>
                  <div className="absolute bottom-4 right-4 bg-white dark:bg-[#111111] px-3 py-1 text-xs font-medium text-black dark:text-white">
                    {album.photos} Photos
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-serif text-black dark:text-white mb-2">{album.title}</h3>
                  <p className="text-sm text-muted-text dark:text-gray-400 uppercase tracking-wider">{album.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 dark:bg-black flex items-center justify-center p-4 md:p-12"
            onClick={closeLightbox}
          >
            <button className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors" onClick={closeLightbox}>
              <X size={32} />
            </button>
            <button className="absolute left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" onClick={prevImage}>
              <ChevronLeft size={48} />
            </button>
            <button className="absolute right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors" onClick={nextImage}>
              <ChevronRight size={48} />
            </button>

            <motion.img 
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={getImageUrl(filteredImages[lightboxIndex].img)} 
              alt="Lightbox View" 
              className="max-w-full max-h-full object-contain"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
