import { Page, Locator } from '@playwright/test';


export default class ConfirmYourBookingSection {
    page: Page;
    readonly roomGuestFirstName = (roomNumber: number) => this.page.locator(`//input[@id='guest_rooms[${roomNumber}][first_name]']`)
    readonly roomGuestLastName = (roomNumber: number) => this.page.locator(`//input[@id='guest_rooms[${roomNumber}][last_name]']`)
    readonly emailInput: Locator
    readonly phoneInput: Locator
    readonly streetAddressInput: Locator
    readonly cityAddressInput: Locator
    readonly zipCodeInput: Locator

    constructor(page: Page) {
        this.page = page;
        this.emailInput = this.page.locator("//input[@id='email']")
        this.phoneInput = this.page.locator("//input[@id='phone']")
        this.streetAddressInput = this.page.locator("//input[@id='bill_address']")
        this.cityAddressInput = this.page.locator("//input[@id='bill_city']")
        this.zipCodeInput = this.page.locator("//input[@id='bill_zip']")
    }

    public async fillOutGuestInformation(roomNumber: number, firstName: string, lastName: string, email: string, phone: string, streetAddress: string, city: string, zipCode: string) {
        await this.roomGuestFirstName(roomNumber).fill(firstName)
        await this.roomGuestLastName(roomNumber).fill(lastName)
        await this.emailInput.fill(email)
        await this.phoneInput.fill(phone)
        await this.streetAddressInput.fill(streetAddress)
        await this.cityAddressInput.fill(city)
        await this.zipCodeInput.fill(zipCode)
    }



}
