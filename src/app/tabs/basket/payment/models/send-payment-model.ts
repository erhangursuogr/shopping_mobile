import { BasketModel } from "../../models/basket-model";
import { PaymentModel } from "./payment-model";

export class SendPaymentModel{

    payment: PaymentModel = new PaymentModel();
    baskets: BasketModel[] = [];

}
