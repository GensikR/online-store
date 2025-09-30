// types/index.ts
export type Product = {
  id: string;           // always string
  name: string;         // now required
  title: string;        // required
  description?: string;
  desc?: string;
  details?: string;
  price: number;        // always number
  quantity?: number;
  images: string[];     // always array
  category?: string;
};
