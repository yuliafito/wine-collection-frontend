export type Product = {
  id: number;
  name: string;
  volume: number;
  description: string;
  image: string;
  price: number;
  country: string;
  inStock: boolean;
  mood: string;
  purpose: string;
  category: string;
  type: string;

  moodId?: string;
  purposeId?: string;
  categoryId?: string;
  wineTypeId?: string;
};
