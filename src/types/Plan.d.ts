interface IPlan{
  name: string;
  price: number;
  description?: string;
  calories?: string;
  suitableFor?: string;
  highlights?: string[];
}
export type {IPlan};