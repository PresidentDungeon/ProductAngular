import {Type} from "../../types/shared/Type";
import {ProductColors} from "../../colors/shared/ProductColors";

export interface Product{
  id: number;
  name: string;
  type: Type;
  productColors: ProductColors[];
  price: number;
  createdDate: Date;
}
