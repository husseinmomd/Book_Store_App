export interface Image {
  url: string;
  _id: string;
}
export interface Category {
  _id: string;
  name: string;
}

export interface Language {
  _id: string;
  name: string;
}
export interface Book {
  _id: string;
  title: string;
  description: string;
  isFeatured: boolean;
  isArchived: boolean;
  author: string;
  quantity: number;
  language: Language;
  categories?: Category[];
  price: number;
  images: Image[];
}

export interface Order {
  // _id: string;
  orderItems: OrderItem[];
  fullName: string;
  totalPrice: number;
  address: string;
  currencyType: string;
  phoneNumber: string;
  paymentMethod: string;
  deliveryOption: string;
  orderDate: string;
}

export interface OrderItem {
  // _id: string;
  book: Book;
  qty: number;
}

export interface Config {
  _id: string;
  exchangeRate: number;
}


export interface HistoryItem  {
  _id: string;
  orderItems: OrderItem[];
  fullName: string;
  totalPrice: number;
  address: string;
  currencyType: string;
  phoneNumber: string;
  paymentMethod: string;
  deliveryOption: string;
  orderDate: Date;
};


export type CartItem = Omit<OrderItem, '_id'>;