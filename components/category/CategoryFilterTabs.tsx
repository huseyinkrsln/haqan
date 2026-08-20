"use client";

export interface TabItem {
  id: string | number;
  slug?: string;
  name: string;
  count?: number;
}

interface CategoryFilterTabsProps {
  items: TabItem[];
  activeId: string | number;
  onSelect: (id: any) => void;
  allLabel?: string;
}

export default function CategoryFilterTabs({
  items,
  activeId,
  onSelect,
  allLabel = "Tümü",
}: CategoryFilterTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
      <button
        onClick={() => onSelect("")}
        className={`shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
          !activeId || activeId === ""
            ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-xs"
            : "bg-white text-gray-600 border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
        }`}
      >
        {allLabel}
      </button>

      {items.map((item) => {
        const itemId = item.id || item.slug;
        const isActive = String(activeId) === String(itemId);

        return (
          <button
            key={String(itemId)}
            onClick={() => onSelect(itemId)}
            className={`flex items-center gap-1.5 shrink-0 px-4 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isActive
                ? "bg-[#4A5D3E] text-white border-[#4A5D3E] shadow-xs"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
            }`}
          >
            {item.name}
            {typeof item.count === "number" && (
              <span
                className={`text-[10px] font-semibold px-1.5 py-0.2 rounded-full ${
                  isActive ? "bg-white/20 text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                {item.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
