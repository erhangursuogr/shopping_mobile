import { ProductModel } from "../../product/models/product-model";

export class BasketModel{
    id?: number;
    productId?: number;
    quantity?: number;
    product?: ProductModel;
}