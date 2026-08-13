"use client";

import { useState } from "react";
import { Minus, Plus, ShoppingBag, Heart, LayoutGrid } from "lucide-react";
import StarRating from "@/components/ui/StarRating";
import { Product, formatPrice } from "@/lib/data";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useRouter } from "next/navigation";

interface ProductInfoProps {
  product: Product;
}

export default function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addItem } = useCart();
  const { toggleItem, isWishlisted } = useWishlist();
  const router = useRouter();
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Lütfen bir beden seçiniz.");
      return;
    }
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      size: selectedSize,
      color: selectedColor.name,
      quantity,
      slug: product.slug,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="space-y-5">
      {/* Title + SKU */}
      <div>
        <h1 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
          {product.name}
        </h1>
        <p className="text-sm text-gray-400 mt-1 tracking-widest">{product.sku}</p>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-3">
        <StarRating
          rating={product.rating}
          reviewCount={product.reviewCount}
        />
        <button className="text-sm text-[#4A5D3E] underline underline-offset-2">
          {product.reviewCount} yorum
        </button>
      </div>

      {/* Price */}
      <div>
        <span className="text-2xl md:text-3xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
      </div>

      {/* Color */}
      <div>
        <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-2.5">
          Renk: <span className="text-gray-900">{selectedColor.name}</span>
        </p>
        <div className="flex gap-2.5 flex-wrap">
          {product.colors.map((color) => (
            <button
              key={color.name}
              onClick={() => setSelectedColor(color)}
              title={color.name}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                selectedColor.name === color.name
                  ? "border-[#4A5D3E] scale-110 shadow-md"
                  : "border-gray-200 hover:border-gray-400"
              }`}
              style={{ backgroundColor: color.hex }}
              aria-label={color.name}
            />
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
            Beden
          </p>
          <button className="flex items-center gap-1 text-xs text-[#4A5D3E] hover:underline">
            <LayoutGrid size={12} />
            Beden Tablosu
          </button>
        </div>
        <div className="flex gap-2 flex-wrap">
          {product.sizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all ${
                selectedSize === size
                  ? "bg-[#4A5D3E] text-white border-[#4A5D3E]"
                  : "bg-white text-gray-700 border-gray-200 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Quantity + Add to Cart (Desktop) */}
      <div className="hidden md:flex gap-3 items-center">
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600"
            aria-label="Azalt"
          >
            <Minus size={16} />
          </button>
          <span className="px-5 py-2.5 text-sm font-semibold text-gray-900 border-x border-gray-200 min-w-[48px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2.5 hover:bg-gray-50 transition-colors text-gray-600"
            aria-label="Artır"
          >
            <Plus size={16} />
          </button>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3 px-6 rounded-xl font-semibold text-sm tracking-wider transition-all ${
            addedToCart
              ? "bg-green-600 text-white"
              : "bg-[#4A5D3E] hover:bg-[#3A4B30] text-white"
          }`}
        >
          <ShoppingBag size={16} />
          {addedToCart ? "SEPETE EKLENDİ ✓" : "SEPETE EKLE"}
        </button>
      </div>

      {/* Wishlist (Desktop) */}
      <button
        onClick={() => toggleItem(product)}
        className={`hidden md:flex w-full items-center justify-center gap-2 py-3 px-6 border rounded-xl text-sm font-medium transition-all ${
          wishlisted
            ? "border-[#4A5D3E] text-[#4A5D3E] bg-[#4A5D3E]/5"
            : "border-gray-200 text-gray-700 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
        }`}
      >
        <Heart size={16} fill={wishlisted ? "currentColor" : "none"} />
        {wishlisted ? "FAVORİLERDEN ÇIKAR" : "FAVORİLERE EKLE"}
      </button>

      {/* Mobile: Add to Cart + Wishlist side by side */}
      <div className="md:hidden flex gap-2">
        <button
          onClick={handleAddToCart}
          className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm tracking-wider transition-all ${
            addedToCart
              ? "bg-green-600 text-white"
              : "bg-[#4A5D3E] text-white"
          }`}
        >
          <ShoppingBag size={16} />
          {addedToCart ? "EKLENDİ ✓" : "SEPETE EKLE"}
        </button>
        <button
          onClick={() => toggleItem(product)}
          className={`w-14 flex items-center justify-center border rounded-xl transition-all ${
            wishlisted
              ? "border-[#4A5D3E] text-[#4A5D3E] bg-[#4A5D3E]/5"
              : "border-gray-200 text-gray-600 hover:border-[#4A5D3E] hover:text-[#4A5D3E]"
          }`}
          aria-label="Favorilere ekle"
        >
          <Heart size={18} fill={wishlisted ? "currentColor" : "none"} />
        </button>
      </div>

      {/* Mobile: Quantity selector */}
      <div className="md:hidden flex items-center gap-3">
        <span className="text-xs font-semibold tracking-widest text-gray-500 uppercase">Adet</span>
        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <Minus size={14} />
          </button>
          <span className="px-4 py-2 text-sm font-semibold text-gray-900 border-x border-gray-200 min-w-[40px] text-center">
            {quantity}
          </span>
          <button
            onClick={() => setQuantity((q) => q + 1)}
            className="px-3 py-2 hover:bg-gray-50 transition-colors text-gray-600"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
