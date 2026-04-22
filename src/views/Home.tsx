"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Users, LandPlot, Building, Palmtree } from "lucide-react";
import { useGetFeaturedWisata, useGetDataOverview, useListGaleri } from "@workspace/api-client-react";
import heroImg from "@/assets/images/hero.png";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data: featuredWisata, isLoading: isFeaturedLoading } = useGetFeaturedWisata();
  const { data: overview, isLoading: isOverviewLoading } = useGetDataOverview();
  const { data: galeri, isLoading: isGaleriLoading } = useListGaleri();

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[100dvh] w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/40 z-10" />
          <img 
            src={heroImg.src} 
            alt="Trenggalek Landscape" 
            className="w-full h-full object-cover object-center scale-105 animate-in slide-in-from-bottom-4 duration-1000 zoom-in-100"
          />
        </div>
        
        <div className="relative z-20 text-center text-white px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-sm font-medium tracking-wider mb-6 text-white/90">
              JAWA TIMUR, INDONESIA
            </span>
          </motion.div>
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-6 leading-tight drop-shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Jelajahi <span className="text-accent italic">Pesona</span> Trenggalek
          </motion.h1>
          
          <motion.p 
            className="text-lg md:text-2xl mb-10 text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            Gerbang selatan Jawa yang menyimpan keindahan pantai eksotis, pegunungan hijau, dan kekayaan budaya yang autentik.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link href="/wisata">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold text-lg px-8 h-14 rounded-full w-full sm:w-auto shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                Mulai Petualangan
              </Button>
            </Link>
            <Link href="/peta">
              <Button size="lg" variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/30 font-semibold text-lg px-8 h-14 rounded-full w-full sm:w-auto backdrop-blur-md transition-all">
                Buka Peta Wisata <MapPin className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <span className="text-xs font-medium tracking-widest uppercase opacity-70">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/70 to-transparent" />
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background border-b border-border/50">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {[
              { label: "Penduduk", value: overview?.total_penduduk.toLocaleString('id-ID') || "731.000", icon: <Users className="w-6 h-6 text-primary" /> },
              { label: "Kecamatan", value: overview?.total_kecamatan.toString() || "14", icon: <Building className="w-6 h-6 text-primary" /> },
              { label: "Luas Wilayah", value: `${overview?.luas_wilayah_km2.toLocaleString('id-ID') || "1.261"} km²`, icon: <LandPlot className="w-6 h-6 text-primary" /> },
              { label: "Destinasi Wisata", value: overview?.total_wisata.toString() || "40+", icon: <Palmtree className="w-6 h-6 text-primary" /> },
            ].map((stat, i) => (
              <motion.div 
                key={i} 
                className="flex flex-col items-center text-center gap-3 p-6 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <div className="p-3 bg-primary/10 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <h3 className="text-3xl font-serif font-bold text-foreground mb-1">{stat.value}</h3>
                  <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Wisata Section */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Destinasi Pilihan</h2>
              <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Sorotan Trenggalek</h3>
              <p className="mt-4 text-lg text-muted-foreground">Tempat-tempat menakjubkan yang wajib Anda kunjungi saat berada di bumi Trenggalek.</p>
            </div>
            <Link href="/wisata">
              <Button variant="outline" className="rounded-full group">
                Lihat Semua Destinasi
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isFeaturedLoading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-96 bg-muted rounded-3xl animate-pulse" />
              ))
            ) : (
              featuredWisata?.slice(0, 3).map((wisata, i) => (
                <motion.div 
                  key={wisata.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  <Link href={`/wisata/${wisata.id}`} className="block group h-full">
                    <div className="relative h-96 rounded-3xl overflow-hidden shadow-md group-hover:shadow-xl transition-all duration-500">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 opacity-80 group-hover:opacity-100 transition-opacity" />
                      <img 
                        src={wisata.foto[0] || heroImg.src} 
                        alt={wisata.nama} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute bottom-0 left-0 p-8 z-20 w-full">
                        <span className="inline-block px-3 py-1 bg-accent text-white text-xs font-bold uppercase tracking-wider rounded-full mb-3 shadow-sm">
                          {wisata.kategori.replace('_', ' ')}
                        </span>
                        <h4 className="text-2xl font-serif font-bold text-white mb-2">{wisata.nama}</h4>
                        <div className="flex items-center text-white/80 text-sm">
                          <MapPin className="w-4 h-4 mr-1" />
                          {wisata.kecamatan}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-4 md:px-8 mb-12 text-center">
          <h2 className="text-sm font-bold text-accent uppercase tracking-widest mb-2">Galeri Visual</h2>
          <h3 className="text-4xl md:text-5xl font-serif font-bold text-foreground">Potret Daerah</h3>
        </div>
        
        <div className="flex gap-4 px-4 overflow-x-auto pb-8 snap-x snap-mandatory hide-scrollbar">
          {isGaleriLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="min-w-[300px] md:min-w-[400px] h-[300px] bg-muted rounded-2xl animate-pulse flex-shrink-0" />
            ))
          ) : (
            galeri?.map((photo, i) => (
              <motion.div 
                key={photo.id}
                className="min-w-[300px] md:min-w-[500px] h-[300px] md:h-[400px] rounded-2xl overflow-hidden relative flex-shrink-0 snap-center group"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <img 
                  src={photo.url} 
                  alt={photo.judul} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                  <div>
                    <h4 className="text-white font-bold text-xl">{photo.judul}</h4>
                    <p className="text-white/70 text-sm flex items-center gap-1 mt-1">
                      <MapPin className="w-3 h-3" /> {photo.lokasi}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-accent blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center max-w-3xl">
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">Mulai Eksplorasi Anda</h2>
          <p className="text-xl text-primary-foreground/80 mb-10">Temukan data mendalam tentang Kabupaten Trenggalek atau langsung telusuri destinasi wisata di peta interaktif kami.</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/data">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto">
                Lihat Data Daerah
              </Button>
            </Link>
            <Link href="/peta">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full h-14 px-8 text-lg font-bold w-full sm:w-auto">
                Buka Peta Interaktif
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
