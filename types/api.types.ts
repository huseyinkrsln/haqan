export interface BaseEntity {
  id: number;
  createdDate?: string;
  updatedDate?: string;
  deletedDate?: string;
  isDeleted?: boolean;
}

// ─── Categories & Product Groups ─────────────────────────────────────────────

export interface Category extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  imageUrl1?: string;
  imageUrl2?: string;
  parentCategoryId?: number;
  subCategories?: Category[];
}

export interface ProductGroup extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  categoryId?: number;
  categoryName?: string;
}

// ─── Products & Variants ─────────────────────────────────────────────────────

export interface Color extends BaseEntity {
  name: string;
  hexCode: string;
}

export interface Size extends BaseEntity {
  name: string;
  displayOrder?: number;
}

export interface Brand extends BaseEntity {
  name: string;
  logoUrl?: string;
  description?: string;
}

export interface Feature extends BaseEntity {
  name: string;
  icon?: string;
  description?: string;
}

export interface ProductImage extends BaseEntity {
  productId: number;
  colorId?: number;
  imageUrl: string;
  displayOrder: number;
  isMain: boolean;
  isProductMain: boolean;
}

export interface ProductVariant extends BaseEntity {
  productId: number;
  colorId: number;
  sizeId: number;
  sku: string;
  barcode?: string;
  stockQuantity: number;
  priceDifference: number;
  colorName?: string;
  colorHexCode?: string;
  sizeName?: string;
}

export interface ProductColorItem {
  colorId: number;
  colorName: string;
  colorHexCode: string;
  images: ProductImage[];
}

export interface ProductColorSummary {
  colorId: number;
  colorName: string;
  hexCode: string;
  imageUrl?: string;
  images?: string[];
}

export interface Product extends BaseEntity {
  name: string;
  slug: string;
  description?: string;
  basePrice: number;
  discountPrice?: number;
  discountStartDate?: string;
  discountEndDate?: string;
  discountRequirementType?: string;
  discountRequirementValue?: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNewArrival: boolean;
  displayOrder: number;
  categoryId: number;
  categoryName?: string;
  productGroupId?: number;
  productGroupName?: string;
  brandId?: number;
  brandName?: string;
  variants?: ProductVariant[];
  images?: ProductImage[];
  features?: Feature[];
  featureIds?: number[];
  productColors?: ProductColorItem[];
  mainImageUrl?: string;
  colors?: ProductColorSummary[];
  sizes?: string[];
  inStock?: boolean;
}

// ─── Sliders ─────────────────────────────────────────────────────────────────

export interface Slider extends BaseEntity {
  title?: string;
  subTitle?: string;
  imageUrl: string;
  mobileImageUrl?: string;
  targetUrl?: string;
  buttonText?: string;
  displayOrder: number;
  startDate?: string;
  endDate?: string;
}

// ─── Cart & Wishlist ─────────────────────────────────────────────────────────

export interface CartItem extends BaseEntity {
  cartId: number;
  productVariantId: number;
  quantity: number;
  productId?: number;
  productName?: string;
  productCode?: string;
  colorName?: string;
  colorHexCode?: string;
  sizeName?: string;
  sku?: string;
  imageUrl?: string;
  price?: number;
}

export interface Cart extends BaseEntity {
  cartToken: string;
  userId?: number;
  userFullName?: string;
  userEmail?: string;
  expiresAt: string;
  cartItems?: CartItem[];
  items?: CartItem[];
}

export interface ProductFavorite extends BaseEntity {
  userId: number;
  productId: number;
  productName?: string;
  imageUrl?: string;
  price?: number;
  userFullName?: string;
  userEmail?: string;
  createdDate?: string;
}

// ─── Orders ──────────────────────────────────────────────────────────────────

export interface OrderItem extends BaseEntity {
  orderId: number;
  productVariantId: number;
  quantity: number;
  unitPrice: number;
  productId?: number;
  productName?: string;
  productCode?: string;
  colorName?: string;
  colorHexCode?: string;
  sizeName?: string;
  sku?: string;
  imageUrl?: string;
  returnStatus?: string;
  returnReason?: string;
  returnDate?: string;
  refundedAmount?: number;
  variantInfo?: string;
}

export interface Order extends BaseEntity {
  orderNumber: string;
  userId: number;
  shippingCarrierId: number;
  orderDate: string;
  estimatedDeliveryDate?: string;
  totalAmount: number;
  orderStatus: string;
  trackingNumber?: string;
  shippingFullName: string;
  shippingPhoneNumber: string;
  shippingAddressLine1: string;
  shippingAddressLine2?: string;
  shippingCountry: string;
  shippingCity: string;
  shippingDistrict: string;
  billingFullName: string;
  billingPhoneNumber: string;
  billingAddressLine1: string;
  billingAddressLine2?: string;
  billingCountry: string;
  billingCity: string;
  billingDistrict: string;
  orderItems?: OrderItem[];
}

export interface ShippingCarrier extends BaseEntity {
  name: string;
  basePrice?: number;
  trackingUrlTemplate?: string;
}

export interface Coupon extends BaseEntity {
  code: string;
  discountType: "Percentage" | "FixedAmount" | string;
  value: number;
  minOrderAmount: number;
  startDate: string;
  endDate: string;
  isShowcase?: boolean;
  usageLimit?: number | null;
  usageCount?: number;
  isSingleUsePerUser?: boolean;
}

// ─── Pagination ──────────────────────────────────────────────────────────────

export interface PaginatedResult<T> {
  data: T;
  success: boolean;
  message: string;
  pageNumber: number;
  pageSize: number;
  totalRecords: number;
  totalPages: number;
  firstPage?: number;
  lastPage?: number;
  nextPage?: number;
  previousPage?: number;
}
