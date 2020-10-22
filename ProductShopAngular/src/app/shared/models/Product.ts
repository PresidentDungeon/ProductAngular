import {Type} from "./Type";
import {ProductColors} from "./ProductColors";

export interface Product{
  id: number;
  name: string;
  type: Type;
  productColors: ProductColors[];
  price: number;
  createdDate: Date;
}
