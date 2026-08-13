import { Leaf, Shirt, Wind, Sun } from "lucide-react";

const iconMap: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Leaf,
  Shirt,
  Wind,
  Sun,
};

interface Badge {
  icon: string;
  label: string;
}

interface ProductDetailBadgesProps {
  description: string;
  badges: Badge[];
}

export default function ProductDetailBadges({
  description,
  badges,
}: ProductDetailBadgesProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-100 p-4 h-full flex flex-col">
      <h3 className="text-xs font-bold tracking-widest text-gray-700 uppercase mb-2">
        Ürün Detayı
      </h3>
      <p className="text-xs text-gray-500 leading-relaxed mb-4 flex-1">
        {description}
      </p>
      <div className="grid grid-cols-2 gap-2">
        {badges.map((badge) => {
          const Icon = iconMap[badge.icon] || Leaf;
          return (
            <div
              key={badge.label}
              className="flex flex-col items-center gap-1.5 p-2 rounded-lg bg-gray-50 text-center"
            >
              <Icon size={18} className="text-[#4A5D3E]" />
              <span className="text-[10px] font-medium text-gray-700 leading-tight">
                {badge.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
