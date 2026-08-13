import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "Haqan Wear'ın kuruluş hikayesi, vizyonu ve değerleri hakkında bilgi edinin.",
};

const values = [
  {
    title: "Kalite",
    description: "Her ürünümüzde kullandığımız kumaşlar, dünyanın en prestijli tekstil üreticilerinden özenle seçilir. Dikişten düğmeye, her detay titizlikle kontrol edilir.",
    icon: "✦",
  },
  {
    title: "Özgünlük",
    description: "Trendleri takip etmek yerine kendi tarzımızı yaratıyoruz. Haqan Wear tasarımları, yıllar sonra da gardırobunuzun vazgeçilmezi olmaya devam eder.",
    icon: "◈",
  },
  {
    title: "Sürdürülebilirlik",
    description: "Üretim süreçlerimizde çevreye duyarlı yöntemler benimsiyoruz. Gelecek nesillere daha temiz bir dünya bırakmak en büyük sorumluluğumuzdur.",
    icon: "◉",
  },
  {
    title: "Şeffaflık",
    description: "Üretimden tüketiciye uzanan zincirde hiçbir şeyi gizlemiyoruz. Ürünlerimizin nereden geldiğini, nasıl üretildiğini her zaman açıkça paylaşırız.",
    icon: "◎",
  },
];

const team = [
  { name: "Hasan Kaya", role: "Kurucu & Kreatif Direktör", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80" },
  { name: "Mert Öztürk", role: "Baş Tasarımcı", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80" },
  { name: "Selin Arslan", role: "Ürün Direktörü", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80" },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F9F9FB]">
      {/* Hero */}
      <section className="relative h-[50vh] overflow-hidden bg-zinc-900">
        <Image
          src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=1600&q=85"
          alt="Hakkımızda"
          fill
          className="object-cover opacity-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/70" />
        <div className="relative h-full flex items-end pb-16 max-w-7xl mx-auto px-6 md:px-8">
          <div>
            <span className="text-zinc-400 text-xs tracking-[0.4em] uppercase mb-3 block">Haqan Wear</span>
            <h1 className="font-playfair text-4xl md:text-6xl font-bold text-white">Hikayemiz</h1>
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-4 block">2018'den Bu Yana</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-zinc-900 mb-6">
              Premium erkek giyiminde yeni bir sayfa
            </h2>
            <div className="space-y-4 text-zinc-600 leading-relaxed">
              <p>
                Haqan Wear, 2018 yılında İstanbul'un kalbinde, tek bir inançla doğdu: Türk erkeği, dünya standartlarında kaliteyi hakediyor.
              </p>
              <p>
                Kuruluşumuzdan bu yana, her koleksiyonumuzda zamansız tasarımı üstün kaliteyle buluşturuyoruz. Hızlı moda trendlerine değil, gardırobunuzda yıllarca kalacak parçalara yatırım yapıyoruz.
              </p>
              <p>
                Bugün Türkiye genelindeki mağazalarımız ve online platformumuzla binlerce erkeğin tarzını şekillendirmeye devam ediyoruz.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-none overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=85"
              alt="Haqan Wear Atölyesi"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-zinc-950 py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center mb-14">
            <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Biz Kimiz</span>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold text-white">Değerlerimiz</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v) => (
              <div key={v.title} className="border border-zinc-800 p-8 hover:border-zinc-600 transition-colors">
                <span className="text-3xl text-[#a3b899] mb-4 block">{v.icon}</span>
                <h3 className="font-playfair text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="max-w-7xl mx-auto px-6 md:px-8 py-20">
        <div className="text-center mb-14">
          <span className="text-[#a3b899] text-xs tracking-[0.4em] uppercase mb-3 block">Arkamızdaki İnsanlar</span>
          <h2 className="font-playfair text-3xl md:text-4xl font-bold text-zinc-900">Ekibimiz</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-10 max-w-3xl mx-auto">
          {team.map((member) => (
            <div key={member.name} className="text-center group">
              <div className="relative h-64 mb-4 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                />
              </div>
              <h3 className="font-semibold text-zinc-900">{member.name}</h3>
              <p className="text-zinc-500 text-sm">{member.role}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
