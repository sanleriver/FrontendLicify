import { Product } from "./product.model";

export interface Invoice {
  id: string,
  totalValue: number,
  totalIva: number,
  items: Product[],
  pagada: boolean
}
