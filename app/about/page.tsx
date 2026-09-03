import type { Metadata } from "next";
import Link from "next/link";
import { Sparkles, ArrowRight, ShieldCheck, Gem, Compass } from "lucide-react";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "HAQAN Wear — Sessiz Özgüven. Gösterişten uzak, güçlü ve ulaşılabilir erkek giyimi felsefemiz.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#FAF9F6] min-h-screen">
      {/* ─── 1. HERO ALANI ─── */}
      <section className="relative bg-zinc-950 text-white py-24 sm:py-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#4A5D3E_1px,transparent_1px)] [background-size:24px_24px] opacity-15" />
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-5">
          <span className="text-[#a3b899] text-xs sm:text-sm tracking-[0.4em] uppercase font-semibold inline-block">
            HAQAN Wear Felsefesi
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Sessiz Özgüven.
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Erkek giyimini gösterişten uzak, güçlü ve ulaşılabilir bir anlayışla yeniden yorumluyoruz.
          </p>
        </div>
      </section>

      {/* ─── 2. ANA FELSEFE ─── */}
      <section className="max-w-5xl mx-auto px-6 md:px-8 py-16 md:py-24 space-y-16">
        
        {/* Giriş Manifestosu */}
        <div className="bg-white rounded-3xl border border-gray-200/80 p-8 sm:p-12 shadow-xs text-center space-y-6">
          <p className="font-serif text-xl sm:text-2xl md:text-3xl text-gray-900 leading-snug max-w-3xl mx-auto font-medium">
            “Bizim için iyi giyinmek, dikkat çekmek için daha fazlasını giymek değil; kendini doğru ifade eden parçaları doğru şekilde taşımaktır.”
          </p>
          <div className="w-16 h-0.5 bg-[#4A5D3E] mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-3xl mx-auto">
            Kendini kanıtlamak için bağırmaya ihtiyaç duymayan, ne istediğini bilen ve kendi tarzını başkalarının beklentilerine göre değil, kendi karakterine göre oluşturan erkeklerin stil anlayışını temsil ediyoruz.
          </p>
        </div>

        {/* 3 Temel Sütun */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Tarzımız */}
          <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A5D3E]/10 flex items-center justify-center text-[#4A5D3E] font-bold mb-4">
              <Compass size={20} />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              Tarzımız
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Geçici trendlerin peşinden gitmek yerine günlük hayatta gerçekten kullanılabilecek, farklı parçalarla kolayca kombinlenebilecek ve erkeğin kendi stilini oluşturmasına alan bırakacak ürünlere odaklanıyoruz.
            </p>
            <p className="text-xs text-gray-800 font-semibold pt-2 border-t border-gray-100">
              Sadelik bizim için sıradanlık değildir.
            </p>
          </div>

          {/* Ulaşılabilir Erkek Giyimi */}
          <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A5D3E]/10 flex items-center justify-center text-[#4A5D3E] font-bold mb-4">
              <Gem size={20} />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              Ulaşılabilir Lüks
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              İyi görünmenin gereksiz derecede pahalı olması gerektiğine inanmıyoruz. Amacımız yalnızca düşük fiyat sunmak değil; müşterinin ödediği bedelin karşılığında tasarım, kullanım ve kalite açısından anlamlı bir değer elde etmesini sağlamaktır.
            </p>
            <p className="text-xs text-gray-800 font-semibold pt-2 border-t border-gray-100">
              Fiyat-performans marka kimliğimizdir.
            </p>
          </div>

          {/* Kendi Tarzını Oluştur */}
          <div className="bg-white p-7 sm:p-8 rounded-3xl border border-gray-200/80 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-2xl bg-[#4A5D3E]/10 flex items-center justify-center text-[#4A5D3E] font-bold mb-4">
              <Sparkles size={20} />
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-gray-900">
              Kendi Tarzını Oluştur
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              HAQAN Wear tek bir erkek tipi tanımlamaz. Aynı parça farklı insanlar tarafından tamamen farklı biçimlerde taşınabilir. Biz kıyafeti sunuyoruz; ona karakterini veren kişinin kendisidir.
            </p>
            <p className="text-xs text-gray-800 font-semibold pt-2 border-t border-gray-100">
              Sadece Giyinme. Kendini Taşı.
            </p>
          </div>
        </div>

        {/* ─── 3. BÜYÜK MANİFESTO PANELİ ─── */}
        <div className="bg-zinc-950 text-white rounded-3xl p-8 sm:p-14 text-center space-y-6 relative overflow-hidden">
          <div className="max-w-2xl mx-auto space-y-4">
            <p className="text-xs sm:text-sm uppercase tracking-[0.3em] text-[#a3b899] font-bold">
              HAQAN WEAR İÇİN STİL
            </p>
            <div className="space-y-2 font-serif text-xl sm:text-2xl md:text-3xl font-light text-zinc-200">
              <p>Gösterişe ihtiyaç duymayan bir duruş.</p>
              <p>Abartıya ihtiyaç duymayan bir stil.</p>
              <p className="font-semibold text-white">Onay beklemeyen bir özgüven.</p>
            </div>
            {/* <div className="pt-6">
              <Link
                href="/koleksiyon/erkek-giyim"
                className="inline-flex items-center gap-2 bg-white text-zinc-950 px-8 py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-zinc-100 transition-all cursor-pointer shadow-md"
              >
                <span>Koleksiyonu Keşfet</span>
                <ArrowRight size={14} />
              </Link>
            </div> */}
          </div>
        </div>

      </section>
    </main>
  );
}
