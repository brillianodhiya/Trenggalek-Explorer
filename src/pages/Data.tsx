"use client";

import { 
  LineChart, Line, BarChart, Bar, PieChart, Pie, AreaChart, Area, 
  XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell
} from 'recharts';
import { 
  useGetDataOverview, 
  useGetDataPopulasi, 
  useGetDataAnggaran, 
  useGetDataKecamatan,
  useGetDataPembangunan 
} from "@workspace/api-client-react";
import { TrendingUp, Users, Building, Activity, ShieldCheck, Landmark } from "lucide-react";
import { motion } from "framer-motion";

export default function Data() {
  const { data: overview, isLoading: load1 } = useGetDataOverview();
  const { data: populasi, isLoading: load2 } = useGetDataPopulasi();
  const { data: anggaran, isLoading: load3 } = useGetDataAnggaran();
  const { data: kecamatan, isLoading: load4 } = useGetDataKecamatan();
  const { data: pembangunan, isLoading: load5 } = useGetDataPembangunan();

  const isLoading = load1 || load2 || load3 || load4 || load5;

  const COLORS = ['#126B33', '#DB7B26', '#0DA2B3', '#E6C229', '#8E44AD', '#E74C3C', '#34495E'];

  if (isLoading) {
    return (
      <div className="pt-24 pb-20 min-h-screen bg-background container mx-auto px-4">
        <div className="h-16 w-1/3 bg-muted animate-pulse rounded-lg mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="h-32 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({length: 4}).map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  // Prepare data for infrastructure chart
  const infraData = pembangunan?.reduce((acc: any[], curr) => {
    const existingYear = acc.find(item => item.tahun === curr.tahun);
    if (existingYear) {
      existingYear[curr.kategori] = curr.nilai;
    } else {
      acc.push({ tahun: curr.tahun, [curr.kategori]: curr.nilai });
    }
    return acc;
  }, []) || [];

  return (
    <div className="w-full pt-24 pb-24 bg-background min-h-screen">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-sm mb-4">
            <Activity className="w-4 h-4" /> Statistik Terbuka {overview?.tahun}
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-foreground mb-4">
            Data Daerah Trenggalek
          </h1>
          <p className="text-lg text-muted-foreground">
            Transparansi informasi pembangunan, kependudukan, dan anggaran Kabupaten Trenggalek untuk masyarakat luas.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Total Penduduk</h3>
              <div className="p-2 bg-primary/10 rounded-lg text-primary"><Users className="w-5 h-5" /></div>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground mb-1">
              {overview?.total_penduduk.toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-green-600 font-medium flex items-center gap-1">
              <TrendingUp className="w-3 h-3" /> +1.2% dari tahun lalu
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">APBD {overview?.tahun}</h3>
              <div className="p-2 bg-accent/10 rounded-lg text-accent"><Landmark className="w-5 h-5" /></div>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground mb-1">
              Rp {overview?.apbd_total.toLocaleString('id-ID')} M
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Alokasi total daerah
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Kecamatan</h3>
              <div className="p-2 bg-secondary/10 rounded-lg text-secondary"><Building className="w-5 h-5" /></div>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground mb-1">
              {overview?.total_kecamatan}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Mencakup {overview?.total_desa} Desa/Kelurahan
            </p>
          </div>

          <div className="bg-card border border-border p-6 rounded-2xl shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-muted-foreground uppercase tracking-wider text-xs">Luas Wilayah</h3>
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600"><ShieldCheck className="w-5 h-5" /></div>
            </div>
            <p className="text-3xl font-serif font-bold text-foreground mb-1">
              {overview?.luas_wilayah_km2.toLocaleString('id-ID')}
            </p>
            <p className="text-sm text-muted-foreground font-medium">
              Kilometer persegi
            </p>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Populasi Line Chart */}
          <motion.div 
            className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">Tren Pertumbuhan Penduduk</h3>
            <p className="text-sm text-muted-foreground mb-8">Perkembangan jumlah populasi 5 tahun terakhir</p>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={populasi} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="tahun" tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} axisLine={false} tickLine={false} />
                  <YAxis 
                    tickFormatter={(value) => `${(value/1000).toFixed(0)}k`} 
                    tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(value: number) => new Intl.NumberFormat('id-ID').format(value)}
                    labelStyle={{ fontWeight: 'bold', color: 'hsl(var(--foreground))', marginBottom: '8px' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Line type="monotone" dataKey="laki_laki" name="Laki-laki" stroke="#0DA2B3" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="perempuan" name="Perempuan" stroke="#DB7B26" strokeWidth={3} dot={{r: 4, strokeWidth: 2}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Anggaran Bar Chart */}
          <motion.div 
            className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">Realisasi Anggaran {overview?.tahun}</h3>
            <p className="text-sm text-muted-foreground mb-8">Alokasi vs Realisasi per Sektor (Miliar Rupiah)</p>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={anggaran} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="sektor" tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} axisLine={false} tickLine={false} />
                  <YAxis 
                    tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <RechartsTooltip 
                    cursor={{fill: 'hsl(var(--muted))', opacity: 0.4}}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                    formatter={(value: number) => [`Rp ${value} M`, undefined]}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="alokasi_miliar" name="Alokasi" fill="#4A90E2" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="realisasi_miliar" name="Realisasi" fill="#126B33" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Area Chart Infra */}
          <motion.div 
            className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">Pembangunan Infrastruktur</h3>
            <p className="text-sm text-muted-foreground mb-8">Panjang Jalan Baik (KM) & Jumlah Jembatan Baru</p>
            
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={infraData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <defs>
                    <linearGradient id="colorJalan" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#126B33" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#126B33" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="tahun" tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} axisLine={false} tickLine={false} />
                  <YAxis 
                    tick={{fontSize: 12, fill: "hsl(var(--muted-foreground))"}} 
                    axisLine={false} 
                    tickLine={false} 
                  />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Area type="monotone" dataKey="Jalan Baik (KM)" name="Jalan Kondisi Baik" stroke="#126B33" strokeWidth={3} fillOpacity={1} fill="url(#colorJalan)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* Pie Chart Kecamatan */}
          <motion.div 
            className="bg-card border border-border p-6 md:p-8 rounded-3xl shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-serif font-bold text-foreground mb-1">Distribusi Penduduk</h3>
            <p className="text-sm text-muted-foreground mb-8">Proporsi populasi 5 kecamatan terbesar</p>
            
            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={kecamatan?.slice(0, 5)}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="jumlah_penduduk"
                    nameKey="nama"
                  >
                    {kecamatan?.slice(0, 5).map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    formatter={(value: number) => new Intl.NumberFormat('id-ID').format(value)}
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}
                  />
                  <Legend layout="vertical" verticalAlign="middle" align="right" wrapperStyle={{ fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
