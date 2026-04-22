"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { MapPin, Filter, Star, Clock, Ticket } from "lucide-react";
import { useListWisata, WisataKategori } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";

export default function Wisata() {
  const { data: wisataList, isLoading } = useListWisata();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const categories = [
    { id: "semua", label: "Semua Kategori", value: null },
    { id: WisataKategori.pantai, label: "Pantai", value: WisataKategori.pantai },
    { id: WisataKategori.air_terjun, label: "Air Terjun", value: WisataKategori.air_terjun },
    { id: WisataKategori.gunung, label: "Gunung", value: WisataKategori.gunung },
    { id: WisataKategori.budaya, label: "Budaya", value: WisataKategori.budaya },
    { id: WisataKategori.religi, label: "Religi", value: WisataKategori.religi },
    { id: WisataKategori.alam, label: "Alam", value: WisataKategori.alam },
  ];

  const filteredWisata = wisataList?.filter((w) => 
    activeCategory ? w.kategori === activeCategory : true
  );

  return (
    <div className="w-full pt-20 pb-24 bg-background min-h-screen">
      {/* Header */}
      <div className="bg-primary/5 border-b border-border">
        <div className="container mx-auto px-4 md:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-serif font-bold text-foreground mb-4">
              Destinasi <span className="text-primary italic">Wisata</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Temukan surga tersembunyi di Trenggalek. Dari pantai berpasir putih hingga pegunungan yang menyejukkan.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-12 pb-6 border-b border-border overflow-x-auto hide-scrollbar">
          <div className="flex items-center gap-2 text-muted-foreground mr-2 font-medium">
            <Filter className="w-4 h-4" /> Filter:
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.value)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
                activeCategory === cat.value
                  ? "bg-primary text-white shadow-md"
                  : "bg-card border border-border text-foreground hover:border-primary/50 hover:bg-primary/5"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm h-[400px]">
                <div className="h-48 bg-muted animate-pulse" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-muted animate-pulse rounded w-2/3" />
                  <div className="h-4 bg-muted animate-pulse rounded w-1/2" />
                  <div className="h-20 bg-muted animate-pulse rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filteredWisata && filteredWisata.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredWisata.map((wisata, i) => (
              <motion.div
                key={wisata.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
              >
                <Link href={`/wisata/${wisata.id}`} className="block h-full group">
                  <div className="rounded-2xl overflow-hidden border border-border bg-card hover:border-primary/30 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                    <div className="relative h-56 overflow-hidden">
                      <div className="absolute top-4 right-4 z-10">
                        <span className="flex items-center gap-1 bg-white/90 backdrop-blur text-foreground px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                          <Star className="w-3 h-3 text-accent fill-accent" /> {wisata.rating.toFixed(1)}
                        </span>
                      </div>
                      <img 
                        src={wisata.foto[0]} 
                        alt={wisata.nama} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                          {wisata.kategori.replace('_', ' ')}
                        </span>
                      </div>
                      <h3 className="font-serif text-xl font-bold text-foreground mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {wisata.nama}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4 flex-grow">
                        {wisata.deskripsi}
                      </p>
                      
                      <div className="pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground font-medium">
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5" />
                          {wisata.kecamatan}
                        </span>
                        <span className="flex items-center text-primary font-bold">
                          Detail <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-card rounded-3xl border border-border border-dashed">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">Tidak ada wisata ditemukan</h3>
            <p className="text-muted-foreground mb-6">Coba ubah filter kategori Anda.</p>
            <Button onClick={() => setActiveCategory(null)} variant="outline">
              Reset Filter
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
