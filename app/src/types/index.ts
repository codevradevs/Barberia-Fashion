export interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  brand: string;
  images: string[];
  sizes: { size: string; stock: number }[];
  description: string;
  features?: string[];
  isFeatured?: boolean;
  isNewArrival?: boolean;
  isOnSale?: boolean;
  tags?: string[];
  rating?: number;
  reviewCount?: number;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  image: string;
}

export interface Order {
  _id: string;
  orderNumber: string;
  customerName: string;
  phone: string;
  email?: string;
  location: string;
  address: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  totalAmount: number;
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: 'mpesa' | 'cod' | 'bank_transfer';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  notes?: string;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  role: 'superadmin' | 'admin' | 'manager';
}

export interface Category {
  _id: string;
  count: number;
}
