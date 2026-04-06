import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, Map, Compass, BarChart3, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const location = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Beranda", icon: <Compass className="w-4 h-4" /> },
    { href: "/wisata", label: "Wisata", icon: <Leaf className="w-4 h-4" /> },
    { href: "/peta", label: "Peta Wisata", icon: <Map className="w-4 h-4" /> },
    { href: "/data", label: "Data Daerah", icon: <BarChart3 className="w-4 h-4" /> },
  ];

  const isHome = location === "/";
  const navBg = isHome && !isScrolled ? "bg-transparent text-white" : "bg-background/90 backdrop-blur-md text-foreground border-b border-border shadow-sm";

  return (
    <div className="min-h-screen flex flex-col w-full font-sans">
      <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", navBg)}>
        <div className="container mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group z-50">
            <div className={cn("flex items-center justify-center w-10 h-10 rounded-full transition-colors", isHome && !isScrolled ? "bg-white/20 text-white" : "bg-primary text-primary-foreground")}>
              <Leaf className="w-6 h-6" />
            </div>
            <span className="font-serif text-xl font-bold tracking-tight">Trenggalek<span className="text-accent font-sans">.</span></span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 text-sm font-medium transition-colors hover:text-accent",
                    active ? "text-accent" : "",
                    isHome && !isScrolled && !active ? "text-white/80 hover:text-white" : ""
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden z-50"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-background z-40 flex flex-col items-center justify-center gap-8 md:hidden">
            {navLinks.map((link) => {
              const active = location === link.href || (link.href !== "/" && location.startsWith(link.href));
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-3 text-2xl font-serif font-bold transition-colors",
                    active ? "text-accent" : "text-foreground"
                  )}
                >
                  {link.icon}
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </header>

      <main className="flex-1 flex flex-col relative">
        {children}
      </main>

      <footer className="bg-foreground text-background py-12 mt-auto">
        <div className="container mx-auto px-4 md:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground">
                <Leaf className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl font-bold">Trenggalek.</span>
            </Link>
            <p className="text-muted/60 max-w-sm">
              Menjelajahi keindahan alam, kekayaan budaya, dan pesona pariwisata Kabupaten Trenggalek, Jawa Timur.
            </p>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-accent">Navigasi</h4>
            <ul className="space-y-2 text-muted/80">
              <li><Link href="/" className="hover:text-white transition-colors">Beranda</Link></li>
              <li><Link href="/wisata" className="hover:text-white transition-colors">Wisata</Link></li>
              <li><Link href="/peta" className="hover:text-white transition-colors">Peta Interaktif</Link></li>
              <li><Link href="/data" className="hover:text-white transition-colors">Data Daerah</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif font-bold text-lg mb-4 text-accent">Kontak</h4>
            <ul className="space-y-2 text-muted/80">
              <li>Dinas Pariwisata & Kebudayaan</li>
              <li>Kabupaten Trenggalek</li>
              <li>Jawa Timur, Indonesia</li>
            </ul>
          </div>
        </div>
        <div className="container mx-auto px-4 md:px-8 mt-12 pt-8 border-t border-white/10 text-center text-sm text-muted/50">
          &copy; {new Date().getFullYear()} Trenggalek All-In-One. Hak Cipta Dilindungi.
        </div>
      </footer>
    </div>
  );
}
