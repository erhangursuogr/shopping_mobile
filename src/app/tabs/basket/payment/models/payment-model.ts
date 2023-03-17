export class PaymentModel{
    id: number = 0;
    date: Date = new Date();
    cardNumber: string = '';
    cardOwner: string = '';
    expirationDate: string = '';
    cvv: string = '';
}