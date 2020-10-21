import {Type} from "./Type";

export interface Product{
  id: number;
  name: string;
  type: Type;
  price: number;
  createdDate: Date;
}
