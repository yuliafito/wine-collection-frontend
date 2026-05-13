export type WineListItemApi = {
  id: number;
  name: string;
  volume: string;
  price: string;
  image: string;
};

export type WineApi = WineListItemApi & {
  description?: string;

  country?: {
    id: number;
    name: string;
  };
  wine_type?: {
    id: number;
    name: string;
  };
  category?: {
    id: number;
    name: string;
  };
  moods?: {
    id: number;
    name: string;
  }[];
  in_stock: boolean;
  stock?: number;
  created_at?: string;
  purpose?: {
    id: number;
    name: string;
  };
};

export type WinesListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: WineListItemApi[];
};
