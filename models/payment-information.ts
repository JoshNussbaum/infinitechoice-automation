export default class PaymentInformation {
    cardNumber: string;
    expirationMonth: string;
    expirationYear: string;
    cvv: string;
    cardHolderFirstName: string;
    cardHolderLastName: string;
    cardType: string;


    constructor(cardNumber: string, expirationMonth: string, expirationYear: string, cvv: string, cardHolderFirstName: string, cardHolderLastName: string, cardType: string) {
        this.cardNumber = cardNumber;
        this.expirationMonth = expirationMonth;
        this.expirationYear = expirationYear;
        this.cvv = cvv;
        this.cardHolderFirstName = cardHolderFirstName;
        this.cardHolderLastName = cardHolderLastName;
        this.cardType = cardType;
    }

}