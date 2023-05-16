export interface Product {
  id: number;
  name: string;
  price: number;
  pictureUrl: string;
  category: string;
  quantity?: number;
  stock: number;
}
