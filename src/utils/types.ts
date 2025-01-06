export type category = {
  id: number;
  title: string;
  imageUrl: string;
};


export type Item = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}


export type CategoryType = {
  title: string;
  items: Item[];
}