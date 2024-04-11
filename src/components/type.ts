export interface HotelListItemProps {
  hotel?: {
    id: string;
    name: string;
    freeBreakfast: boolean;
    favorite: boolean;
    description?: string;
    image: string;
    price: number;
    location: string;
  };
}
