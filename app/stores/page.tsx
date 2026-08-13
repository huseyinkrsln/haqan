import type { Metadata } from "next";
import { MapPin, Phone, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Mağazalarımız",
  description: "Haqan Wear mağazalarını bulun. İstanbul, Ankara ve İzmir'deki şubelerimizi ziyaret edin.",
};

const stores = [
  {
    city: "İstanbul",
    district: "Nişantaşı",
    address: "Teşvikiye Cad. No:45, Şişli",
    phone: "+90 212 555 0101",
    hours: "Hft içi: 10:00 – 22:00 / Hft sonu: 11:00 – 22:00",
    mapUrl: "https://maps.google.com",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    featured: true,
  },
  {
    city: "İstanbul",
    district: "Kadıköy",
    address: "Moda Cad. No:12, Kadıköy",
    phone: "+90 216 555 0202",
    hours: "Hft içi: 10:00 – 22:00 / Hft sonu: 11:00 – 22:00",
    mapUrl: "https://maps.google.com",
    image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=80",
    featured: false,
  },
  {
    city: "İstanbul",
    district: "Zorlu AVM",
    address: "Zorlu Center, Kat 1",
    phone: "+90 212 555 0303",
    hours: "10:00 – 22:00 (Her gün)",
    mapUrl: "https://maps.google.com",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
    featured: false,
  },
  {
    city: "Ankara",
    district: "Çankaya",
    address: "Tunalı Hilmi Cad. No:78, Çankaya",
    phone: "+90 312 555 0404",
    hours: "Hft içi: 10:00 – 21:00 / Hft sonu: 11:00 – 21:00",
    mapUrl: "https://maps.google.com",
    image: "https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&q=80",
    featured: false,
  },
  {
    city: "İzmir",
    district: "Alsancak",
    address: "Kıbrıs Şehitleri Cad. No:22, Alsancak",
    phone: "+90 232 555 0505",
    hours: "Hft içi: 10:00 – 21:00 / Hft sonu: 11:00 – 21:00",
    mapUrl: "https://maps.google.com",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    featured: false,
  },
];

export default function StoresPage() {
  return (
    <main className="bg-[#F9F9FB]">
      {/* Header */}
      <section className="bg-zinc-950 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Haqan Wear</span>
          <h1 className="font-playfair text-4xl md:text-5xl font-bold text-white">Mağazalarımız</h1>
          <p className="text-zinc-400 mt-4 max-w-xl">
            Türkiye'nin dört bir yanında premium Haqan Wear deneyimi yaşayabileceğiniz mağazalarımızı keşfedin.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stores.map((store) => (
            <div key={`${store.city}-${store.district}`} className="bg-white border border-zinc-200 group overflow-hidden">
              <div className="relative h-52 overflow-hidden">
                <img
                  src={store.image}
                  alt={`${store.city} ${store.district} Mağazası`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {store.featured && (
                  <span className="absolute top-3 left-3 bg-zinc-900 text-white text-xs px-3 py-1 uppercase tracking-wider">
                    Amiral Mağaza
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h2 className="font-playfair text-xl font-bold text-zinc-900">{store.city}</h2>
                  <p className="text-[#a3b899] font-medium text-sm">{store.district}</p>
                </div>
                <div className="space-y-3 text-sm text-zinc-600">
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
                    <span>{store.address}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-4 w-4 text-zinc-400 shrink-0" />
                    <span>{store.phone}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-zinc-400 mt-0.5 shrink-0" />
                    <span className="text-xs">{store.hours}</span>
                  </div>
                </div>
                <a
                  href={store.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block text-xs tracking-wider uppercase text-zinc-900 border-b border-zinc-900 pb-0.5 hover:text-[#a3b899] hover:border-[#a3b899] transition-colors"
                >
                  Haritada Gör →
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
