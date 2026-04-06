"use client";

import { useState } from "react";
import Link from "next/link";
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from "react-leaflet";
import L from "leaflet";
import { MapPin, Star, Navigation } from "lucide-react";
import { useListWisata, WisataKategori } from "@workspace/api-client-react";

// Fix Leaflet default icon paths
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

export default function PetaWisata() {
  const { data: wisataList, isLoading } = useListWisata();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Center of Trenggalek
  const trenggalekCenter: [number, number] = [-8.0614, 111.7147];

  const categories = [
    { id: "semua", label: "Semua", value: null, color: "#126B33" },
    { id: WisataKategori.pantai, label: "Pantai", value: WisataKategori.pantai, color: "#0DA2B3" },
    { id: WisataKategori.air_terjun, label: "Air Terjun", value: WisataKategori.air_terjun, color: "#4A90E2" },
    { id: WisataKategori.gunung, label: "Gunung", value: WisataKategori.gunung, color: "#DB7B26" },
    { id: WisataKategori.budaya, label: "Budaya", value: WisataKategori.budaya, color: "#8E44AD" },
  ];

  const filteredWisata = wisataList?.filter((w) => 
    activeCategory ? w.kategori === activeCategory : true
  );

  const getMarkerIcon = (kategori: string) => {
    // Generate different colored icons based on category
    let color = "blue";
    if (kategori === WisataKategori.pantai) color = "grey";
    if (kategori === WisataKategori.gunung) color = "orange";
    if (kategori === WisataKategori.air_terjun) color = "blue";
    if (kategori === WisataKategori.budaya || kategori === WisataKategori.religi) color = "violet";
    if (kategori === WisataKategori.alam) color = "green";

    return new L.Icon({
      iconUrl: `https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-${color}.png`,
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41]
    });
  };

  return (
    <div className="w-full h-screen pt-20 flex flex-col bg-background relative overflow-hidden">
      
      {/* Map Header Overlay */}
      <div className="absolute top-24 left-4 right-4 md:left-8 md:right-auto md:w-96 z-[400] pointer-events-none">
        <div className="bg-card/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-border pointer-events-auto">
          <h1 className="text-2xl font-serif font-bold text-foreground flex items-center gap-2 mb-2">
            <MapPin className="w-6 h-6 text-primary" /> Peta Wisata
          </h1>
          <p className="text-sm text-muted-foreground mb-4">
            Jelajahi sebaran titik-titik pariwisata di Kabupaten Trenggalek.
          </p>
          
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Kategori</h4>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors border ${
                    activeCategory === cat.value
                      ? "bg-primary text-white border-primary"
                      : "bg-background text-foreground border-border hover:border-primary/50"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
            <span>Total: {filteredWisata?.length || 0} Lokasi</span>
            <span className="flex items-center gap-1"><Navigation className="w-3 h-3" /> Interaktif</span>
          </div>
        </div>
      </div>

      <div className="flex-1 w-full relative z-0">
        <MapContainer 
          center={trenggalekCenter} 
          zoom={11} 
          className="w-full h-full z-0"
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          />
          <ZoomControl position="bottomright" />
          
          {!isLoading && filteredWisata?.map((wisata) => (
            <Marker 
              key={wisata.id} 
              position={[wisata.latitude, wisata.longitude]}
              icon={getMarkerIcon(wisata.kategori)}
            >
              <Popup className="rounded-xl overflow-hidden custom-popup p-0">
                <div className="w-64 flex flex-col m-0 p-0">
                  <div className="h-32 w-full m-0 p-0 relative">
                    <img src={wisata.foto[0]} alt={wisata.nama} className="w-full h-full object-cover rounded-t-xl m-0" />
                    <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-xs font-bold flex items-center gap-1 shadow-sm m-0">
                      <Star className="w-3 h-3 text-accent fill-accent" /> {wisata.rating.toFixed(1)}
                    </div>
                  </div>
                  <div className="p-4 m-0">
                    <span className="text-[10px] font-bold uppercase text-primary tracking-wider mb-1 block">
                      {wisata.kategori.replace('_', ' ')}
                    </span>
                    <h3 className="font-serif font-bold text-lg leading-tight mb-1 text-gray-900">{wisata.nama}</h3>
                    <p className="text-xs text-gray-500 mb-3 flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {wisata.kecamatan}
                    </p>
                    <Link href={`/wisata/${wisata.id}`} className="block w-full">
                      <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2 rounded-lg text-xs transition-colors">
                        Lihat Detail
                      </button>
                    </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      
      {/* Add global styles to fix leaflet popup paddings which are annoying */}
      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          padding: 0;
          border-radius: 0.75rem;
          overflow: hidden;
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
          width: auto !important;
        }
        .custom-popup .leaflet-popup-close-button {
          color: white !important;
          text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          z-index: 10;
        }
      `}</style>
    </div>
  );
}
