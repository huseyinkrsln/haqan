"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { X, ShieldCheck, Check, SlidersHorizontal, Info } from "lucide-react";

type CookieTab =
  | "privacy"
  | "necessary"
  | "preferences"
  | "analytics"
  | "marketing"
  | "social";

interface CookiePreferences {
  necessary: boolean;
  preferences: boolean;
  analytics: boolean;
  marketing: boolean;
  social: boolean;
}

export default function CookieConsentBanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<CookieTab>("privacy");

  // Çerez tercihleri state'i
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true, // Her zaman açık
    preferences: true,
    analytics: true,
    marketing: true,
    social: true,
  });

  useEffect(() => {
    // Daha önce yapılmış seçim kontrolü
    const saved = localStorage.getItem("haqan_cookie_consent_preferences");
    if (!saved) {
      const timer = setTimeout(() => setIsOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  // 1. Tümünü Kabul Et
  const handleAcceptAll = () => {
    const allAccepted: CookiePreferences = {
      necessary: true,
      preferences: true,
      analytics: true,
      marketing: true,
      social: true,
    };
    localStorage.setItem(
      "haqan_cookie_consent_preferences",
      JSON.stringify({ status: "all", preferences: allAccepted, date: new Date().toISOString() })
    );
    localStorage.setItem("haqan_cookie_consent", "accepted");
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  // 2. Yalnızca Gerekli Çerezler
  const handleNecessaryOnly = () => {
    const necessaryOnly: CookiePreferences = {
      necessary: true,
      preferences: false,
      analytics: false,
      marketing: false,
      social: false,
    };
    localStorage.setItem(
      "haqan_cookie_consent_preferences",
      JSON.stringify({ status: "necessary", preferences: necessaryOnly, date: new Date().toISOString() })
    );
    localStorage.setItem("haqan_cookie_consent", "necessary_only");
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  // 3. Özelleştirilmiş Ayarları Kaydet
  const handleSaveCustom = () => {
    localStorage.setItem(
      "haqan_cookie_consent_preferences",
      JSON.stringify({ status: "custom", preferences: prefs, date: new Date().toISOString() })
    );
    localStorage.setItem("haqan_cookie_consent", "custom");
    setIsOpen(false);
    setIsSettingsOpen(false);
  };

  const togglePref = (key: keyof Omit<CookiePreferences, "necessary">) => {
    setPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  if (!isOpen && !isSettingsOpen) return null;

  return (
    <>
      {/* ─── TIER 1: ANA ÇEREZ ONAY MODALI (Mango / Zara Stili) ─── */}
      {isOpen && !isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-300">
          <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-2xl max-w-3xl w-full p-6 sm:p-10 text-center animate-in zoom-in-95 duration-200">
            <h2 className="font-serif text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wider text-gray-900 mb-4">
              ÇEREZLER ALIŞVERİŞ DENEYİMİNİZİ İYİLEŞTİRİR
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed max-w-2xl mx-auto mb-8">
              Analitik amaçlar ve gezinme alışkanlıklarınızdan oluşturulan bir profile göre size kişiselleştirilmiş reklam ve içerik göstermek için kendi çerezlerimizi ve üçüncü taraf çerezlerini kullanıyoruz. Ayarlar panelinden tüm çerezleri kabul edebilir veya tercihlerinizi yönetebilirsiniz. Daha fazla bilgi için{" "}
              <Link href="/cookies" className="text-gray-900 font-semibold underline hover:text-[#4A5D3E]">
                Çerez Politikası
              </Link>
              {" ve "}
              <Link href="/kvkk" className="text-gray-900 font-semibold underline hover:text-[#4A5D3E]">
                KVKK Aydınlatma Metni
              </Link>
              ’ne göz atın.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="py-3 px-4 rounded-xl border border-gray-300 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-gray-50 transition-all cursor-pointer shadow-2xs"
              >
                Çerezleri Ayarla
              </button>
              <button
                onClick={handleNecessaryOnly}
                className="py-3 px-4 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-2xs"
              >
                Yalnızca Gerekli Çerezler
              </button>
              <button
                onClick={handleAcceptAll}
                className="py-3 px-4 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-2xs"
              >
                Tümünü Kabul Et
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── TIER 2: DETAYLI ÇEREZ AYARLARI MERKEZİ (Mango Çerez Ayarları) ─── */}
      {isSettingsOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white border border-gray-100 rounded-2xl sm:rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <SlidersHorizontal size={20} className="text-[#4A5D3E]" />
                <h2 className="font-serif text-lg sm:text-xl font-bold uppercase tracking-wider text-gray-900">
                  ÇEREZ AYARLARI
                </h2>
              </div>
              <button
                onClick={() => setIsSettingsOpen(false)}
                className="text-gray-400 hover:text-gray-900 p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                title="Kapat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body: Split Layout (Tabs + Details) */}
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
              {/* Sol Sekme Menüsü */}
              <div className="w-full md:w-1/3 border-b md:border-b-0 md:border-r border-gray-100 overflow-x-auto md:overflow-y-auto bg-gray-50/50 p-2 sm:p-3 flex md:flex-col gap-1 shrink-0">
                <button
                  onClick={() => setActiveTab("privacy")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer ${
                    activeTab === "privacy"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  GİZLİLİĞİNİZ
                </button>
                <button
                  onClick={() => setActiveTab("necessary")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center justify-between gap-2 ${
                    activeTab === "necessary"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span>ZORUNLU ÇEREZLER</span>
                  <span className="text-[10px] text-[#4A5D3E] font-semibold">Zorunlu</span>
                </button>
                <button
                  onClick={() => setActiveTab("preferences")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center justify-between gap-2 ${
                    activeTab === "preferences"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span>TERCİH VE KİŞİSELLEŞTİRME</span>
                  <span className={`w-2 h-2 rounded-full ${prefs.preferences ? "bg-[#4A5D3E]" : "bg-gray-300"}`} />
                </button>
                <button
                  onClick={() => setActiveTab("analytics")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center justify-between gap-2 ${
                    activeTab === "analytics"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span>ANALİZ ÇEREZLERİ</span>
                  <span className={`w-2 h-2 rounded-full ${prefs.analytics ? "bg-[#4A5D3E]" : "bg-gray-300"}`} />
                </button>
                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center justify-between gap-2 ${
                    activeTab === "marketing"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span>DAVRANIŞSAL REKLAM ÇEREZLERİ</span>
                  <span className={`w-2 h-2 rounded-full ${prefs.marketing ? "bg-[#4A5D3E]" : "bg-gray-300"}`} />
                </button>
                <button
                  onClick={() => setActiveTab("social")}
                  className={`text-left px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap cursor-pointer flex items-center justify-between gap-2 ${
                    activeTab === "social"
                      ? "bg-white text-gray-900 shadow-2xs border border-gray-200/80"
                      : "text-gray-500 hover:text-gray-900 hover:bg-gray-100/70"
                  }`}
                >
                  <span>SOSYAL MEDYA ÇEREZLERİ</span>
                  <span className={`w-2 h-2 rounded-full ${prefs.social ? "bg-[#4A5D3E]" : "bg-gray-300"}`} />
                </button>
              </div>

              {/* Sağ Detay İçerik Alanı */}
              <div className="flex-1 p-5 sm:p-8 overflow-y-auto space-y-5 text-gray-700">
                
                {/* 1. GİZLİLİĞİNİZ */}
                {activeTab === "privacy" && (
                  <div className="space-y-3">
                    <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                      GİZLİLİĞİNİZ
                    </h3>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu web sitesi, gezindiğinizde bilgi depolayan ve alan çerezler ve/veya benzer teknolojiler kullanır. Genel olarak bu teknolojiler, örneğin sizi bir kullanıcı olarak tanımak, tarama alışkanlıklarınız hakkında bilgi edinmek veya içeriğin görüntülenme şeklini özelleştirmek gibi çeşitli amaçlar için kullanılabilir.
                    </p>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bazı çerez türlerini engellemenin sitedeki deneyiminizi ve sunabileceğimiz hizmetleri etkileyebileceğini lütfen unutmayın.
                    </p>
                  </div>
                )}

                {/* 2. ZORUNLU ÇEREZLER */}
                {activeTab === "necessary" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                        ZORUNLU ÇEREZLER
                      </h3>
                      <span className="text-xs font-bold text-[#4A5D3E] bg-[#4A5D3E]/10 px-3 py-1 rounded-full">
                        Her Zaman Etkin
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu çerezler web sitemizin çalışması için gereklidir ve sistemlerimizde kapatılamaz. Bunlar genellikle yalnızca sizin tarafınızdan yapılan ve gizlilik tercihlerinizi belirleme, oturum açma veya form doldurma gibi hizmet taleplerine karşılık olarak ayarlanır.
                    </p>
                    <p className="text-xs text-gray-500">
                      Tarayıcınızı bu çerezleri engelleyecek veya sizi uyaracak şekilde ayarlayabilirsiniz, ancak bu durumda sitenin bazı bölümleri (sepet, ödeme) çalışmayacaktır.
                    </p>
                  </div>
                )}

                {/* 3. TERCİH VE KİŞİSELLEŞTİRME ÇEREZLERİ */}
                {activeTab === "preferences" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                        TERCİH VEYA KİŞİSELLEŞTİRME ÇEREZLERİ
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prefs.preferences}
                          onChange={() => togglePref("preferences")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A5D3E]" />
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu çerezler, web sitemizin gelişmiş işlevsellik ve kişiselleştirme sağlamasına olanak tanır. Bunlar bizim tarafımızdan veya sayfalarımıza hizmetlerini eklediğimiz üçüncü taraf sağlayıcılar tarafından ayarlanabilir.
                    </p>
                  </div>
                )}

                {/* 4. ANALİZ ÇEREZLERİ */}
                {activeTab === "analytics" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                        ANALİZ ÇEREZLERİ
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prefs.analytics}
                          onChange={() => togglePref("analytics")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A5D3E]" />
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu çerezler, sitemizin performansını ölçebilmemiz ve iyileştirebilmemiz için ziyaretleri ve trafik kaynaklarını saymamıza olanak tanır. Hangi sayfaların en çok ve en az popüler olduğunu bilmemize ve ziyaretçilerin sitede nasıl gezindiğini görmemize yardımcı olurlar.
                    </p>
                  </div>
                )}

                {/* 5. DAVRANIŞSAL REKLAM ÇEREZLERİ */}
                {activeTab === "marketing" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                        DAVRANIŞSAL REKLAM ÇEREZLERİ
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prefs.marketing}
                          onChange={() => togglePref("marketing")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A5D3E]" />
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu çerezler, reklam ortaklarımız tarafından sitemiz üzerinden ayarlanabilir. Bu şirketler tarafından ilgi alanlarınızın profilini oluşturmak ve diğer sitelerde size ilgili reklamları göstermek için kullanılabilirler.
                    </p>
                  </div>
                )}

                {/* 6. SOSYAL MEDYA ÇEREZLERİ */}
                {activeTab === "social" && (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                      <h3 className="font-serif text-base sm:text-lg font-bold uppercase tracking-wider text-gray-900">
                        SOSYAL MEDYA ÇEREZLERİ
                      </h3>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={prefs.social}
                          onChange={() => togglePref("social")}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4A5D3E]" />
                      </label>
                    </div>
                    <p className="text-xs sm:text-sm leading-relaxed text-gray-600">
                      Bu çerezler, içeriğimizi arkadaşlarınız ve ağlarınızla paylaşmanıza olanak sağlamak için siteye eklediğimiz bir dizi sosyal medya hizmeti tarafından ayarlanır. Diğer sitelerde tarayıcınızı izleyebilir ve ilgi alanlarınızın profilini oluşturabilirler.
                    </p>
                  </div>
                )}

              </div>
            </div>

            {/* Modal Bottom Buttons */}
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col sm:flex-row items-center justify-end gap-3">
              <button
                onClick={handleSaveCustom}
                className="w-full sm:w-auto py-3 px-6 rounded-xl border border-gray-300 bg-white text-gray-900 text-xs font-bold uppercase tracking-wider hover:bg-gray-100 transition-all cursor-pointer shadow-2xs text-center"
              >
                Ayarları Kaydet
              </button>
              <button
                onClick={handleNecessaryOnly}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-2xs text-center"
              >
                Yalnızca Gerekli Çerezler
              </button>
              <button
                onClick={handleAcceptAll}
                className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gray-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-black transition-all cursor-pointer shadow-2xs text-center"
              >
                Tümünü Kabul Et
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
