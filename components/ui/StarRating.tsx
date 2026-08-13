import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 14,
}: StarRatingProps) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            className={
              star <= Math.round(rating)
                ? "fill-[#4A5D3E] text-[#4A5D3E]"
                : "fill-gray-200 text-gray-200"
            }
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-gray-800">{rating}</span>
      {reviewCount !== undefined && (
        <span className="text-sm text-gray-400">({reviewCount})</span>
      )}
    </div>
  );
}
