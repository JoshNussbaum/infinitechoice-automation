import { Page, expect } from '@playwright/test';
import ConfirmYourBookingSection from './sections/confirm-your-booking.section';
import PaymentMethodSection from './sections/payment-method.section';


export default class HotelCheckoutPage {
    page: Page;
    confirmYourBookingSection: ConfirmYourBookingSection
    paymentMethodSection: PaymentMethodSection
    readonly infoMessage = (message: string) => this.page.getByText(message)


    constructor(page: Page) {
        this.page = page;
        this.confirmYourBookingSection = new ConfirmYourBookingSection(page)
        this.paymentMethodSection = new PaymentMethodSection(page)
    }

    async waitForLoad() {
        await this.page.waitForURL('**/hotelcheckout*')
    }

    async expectInfoMessage(message: string) {
        await expect(this.infoMessage(message)).toBeVisible()
    }

    async fillOutGuestInformation(roomNumber: number, firstName: string, lastName: string, email: string, phone: string, streetAddress: string, city: string, zipCode: string) {
        await this.confirmYourBookingSection.fillOutGuestInformation(roomNumber, firstName, lastName, email, phone, streetAddress, city, zipCode)
    }

    async payForReservation(firstName: string, lastName: string, creditCardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string) {
        await this.paymentMethodSection.payForReservation(firstName, lastName, creditCardNumber, expirationMonth, expirationYear, securityCode)
    }



}