import PaymentInformation from './payment-information';

export default class User {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    streetAddress: string;
    city: string;
    zipCode: string;
    paymentInformation: PaymentInformation;

    constructor(id: number, firstName: string, lastName: string, email: string, phone: string, streetAddress: string, city: string, zipCode: string, paymentInformation: PaymentInformation) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.streetAddress = streetAddress;
        this.city = city;
        this.zipCode = zipCode;
        this.paymentInformation = paymentInformation;
    }


}