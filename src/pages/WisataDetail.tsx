"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { motion } from "framer-motion";
import { MapPin, Clock, Ticket, Star, ArrowLeft, Leaf, Compass } from "lucide-react";
import { useGetWisata, useListWisata, getGetWisataQueryKey } from "@workspace/api-client-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// Fix Leaflet default icon paths
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function WisataDetail({ id: propId }: { id?: string }) {
  const params = useParams();
  // Handle case where params.id might be string[] from Next.js
  const routeId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const idValue = propId || routeId || "0";
  const id = parseInt(idValue, 10);
  
  const { data: wisata, isLoading } = useGetWisata(id, { 
    query: { enabled: !!id, queryKey: getGetWisataQueryKey(id) } 
  });
  
  const { data: allWisata } = useListWisata();
  
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setActivePhoto(0);
  }, [id]);

  if (isLoading || !wisata) {
    return (
      <div className="pt-20 min-h-screen bg-background flex flex-col">
        <div className="h-[50vh] bg-muted animate-pulse w-full" />
        <div className="container mx-auto px-4 md:px-8 py-12 max-w-5xl">
          <div className="h-10 bg-muted animate-pulse w-1/2 mb-6" />
          <div className="h-4 bg-muted animate-pulse w-1/4 mb-12" />
          <div className="space-y-4">
            <div className="h-4 bg-muted animate-pulse w-full" />
            <div className="h-4 bg-muted animate-pulse w-full" />
            <div className="h-4 bg-muted animate-pulse w-3/4" />
          </div>
        </div>
      </div>
    );
  }

  const similarWisata = allWisata
    ?.filter(w => w.kategori === wisata.kategori && w.id !== wisata.id)
    .slice(0, 3);

  const customIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="w-full bg-background min-h-screen pb-24">
      {/* Hero Image Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full mt-20 group">
        <img 
          src={wisata.foto[activePhoto]} 
          alt={wisata.nama} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-black/20 to-black/40" />
        
        {/* Top bar inside image */}
        <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-20">
          <Link href="/wisata">
            <Button variant="outline" size="sm" className="bg-white/10 backdrop-blur hover:bg-white/20 text-white border-white/20 rounded-full h-10 px-4">
              <ArrowLeft className="w-4 h-4 mr-2" /> Kembali ke Wisata
            </Button>
          </Link>
        </div>

        {/* Thumbnail selector */}
        {wisata.foto.length > 1 && (
          <div className="absolute bottom-32 left-0 w-full z-20 flex justify-center gap-3 px-4">
            {wisata.foto.map((f, i) => (
              <button 
                key={i} 
                onClick={() => setActivePhoto(i)}
                className={`w-16 h-12 md:w-24 md:h-16 rounded-lg overflow-hidden border-2 transition-all ${activePhoto === i ? 'border-white scale-110 shadow-lg' : 'border-white/40 opacity-70 hover:opacity-100'}`}
              >
                <img src={f} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="container mx-auto px-4 md:px-8 -mt-24 relative z-30 max-w-6xl">
        <div className="bg-card border border-border rounded-3xl p-8 md:p-12 shadow-xl mb-12">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8 pb-8 border-b border-border">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                  {wisata.kategori.replace('_', ' ')}
                </Badge>
                {wisata.highlight && (
                  <Badge className="bg-accent/10 text-accent border-accent/20 hover:bg-accent/20 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-widest">
                    Pilihan Utama
                  </Badge>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
                {wisata.nama}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-muted-foreground font-medium">
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                  <MapPin className="w-4 h-4 text-primary" /> {wisata.kecamatan}, Trenggalek
                </span>
                <span className="flex items-center gap-2 bg-muted/50 px-3 py-1.5 rounded-lg">
                  <Star className="w-4 h-4 text-accent fill-accent" /> {wisata.rating.toFixed(1)} / 5.0
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-3 min-w-[200px] bg-muted/30 p-5 rounded-2xl border border-border/50">
              <div className="flex items-start gap-3">
                <Ticket className="w-5 h-5 text-accent mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Tiket Masuk</p>
                  <p className="text-foreground font-bold">{wisata.tiket_masuk || "Gratis"}</p>
                </div>
              </div>
              <div className="h-px w-full bg-border/50 my-1" />
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-secondary mt-0.5" />
                <div>
                  <p className="text-xs text-muted-foreground font-semibold uppercase">Jam Operasional</p>
                  <p className="text-foreground font-bold">{wisata.jam_buka || "Buka 24 Jam"}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-10">
              <section>
                <h3 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                  <Compass className="w-6 h-6 text-primary" /> Tentang Destinasi
                </h3>
                <div className="prose prose-lg dark:prose-invert text-muted-foreground font-light leading-relaxed">
                  <p>{wisata.deskripsi}</p>
                </div>
              </section>

              {wisata.fasilitas && wisata.fasilitas.length > 0 && (
                <section>
                  <h3 className="text-2xl font-serif font-bold text-foreground mb-4 flex items-center gap-2">
                    <Leaf className="w-6 h-6 text-primary" /> Fasilitas
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {wisata.fasilitas.map((fasilitas, i) => (
                      <div key={i} className="flex items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border/50">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <span className="font-medium text-foreground text-sm">{fasilitas}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar Map */}
            <div className="space-y-6">
              <h3 className="text-xl font-serif font-bold text-foreground mb-4 border-b border-border pb-2">Lokasi Peta</h3>
              <div className="h-[300px] rounded-2xl overflow-hidden border border-border shadow-inner">
                <MapContainer 
                  center={[wisata.latitude, wisata.longitude]} 
                  zoom={14} 
                  scrollWheelZoom={false}
                  className="w-full h-full z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={[wisata.latitude, wisata.longitude]} icon={customIcon}>
                    <Popup>
                      <div className="font-bold">{wisata.nama}</div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              <Button className="w-full rounded-xl bg-secondary hover:bg-secondary/90 text-white font-semibold">
                Dapatkan Petunjuk Arah <MapPin className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Wisata */}
        {similarWisata && similarWisata.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-serif font-bold text-foreground mb-8">Destinasi Serupa</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarWisata.map((w) => (
                <Link key={w.id} href={`/wisata/${w.id}`} className="block group">
                  <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-all h-[300px] flex flex-col">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={w.foto[0]} 
                        alt={w.nama} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                        {w.nama}
                      </h3>
                      <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                        {w.deskripsi}
                      </p>
                      <div className="mt-auto flex items-center text-xs text-primary font-bold">
                        Lihat Detail <ArrowLeft className="ml-1 w-3 h-3 rotate-180" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
