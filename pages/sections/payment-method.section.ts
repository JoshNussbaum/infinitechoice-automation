import { Page, Locator } from '@playwright/test'

export default class PaymentMethodSection {
    page: Page;
    readonly firstNameInput: Locator
    readonly lastNameInput: Locator
    readonly creditCardNumber: Locator
    readonly cardTypeButton: Locator
    readonly cardTypeSelection = (cardType: string = "visa") => this.page.locator(`//button[@data-option='${cardType}']`)
    readonly creditCardExpirationMonthButton: Locator
    readonly creditCardExpirationYearButton: Locator
    readonly creditCardExpirationYearSelection = (year: string = "2025") => this.page.locator(`//button[@data-option='${year}']`)
    readonly creditCardSecurityCodeInput: Locator
    readonly completeReservationButton: Locator


    constructor(page: Page) {
        this.page = page;
        this.firstNameInput = this.page.locator("//input[@id='bill_first']")
        this.lastNameInput = this.page.locator("//input[@id='bill_last']")
        this.creditCardNumber = this.page.locator("//input[@id='credit_card_number']")
        this.cardTypeButton = this.page.locator("//button[@id='cc_brand']")
        this.creditCardExpirationMonthButton = this.page.locator("//button[@id='cc_expmonth']")
        this.creditCardExpirationYearButton = this.page.locator("//button[@id='cc_expyear']")
        this.creditCardSecurityCodeInput = this.page.locator("//input[@id='credit_card_verification']")
        this.completeReservationButton = this.page.locator("//p[contains(@class, 'cc-button')]//button")

    }


    public async payForReservation(firstName: string, lastName: string, creditCardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string) {
        await this.fillOutPaymentInformation(firstName, lastName, creditCardNumber, expirationMonth, expirationYear, securityCode)
        await this.clickCompleteReservationButton()
    }

    public async fillOutPaymentInformation(firstName: string, lastName: string, creditCardNumber: string, expirationMonth: string, expirationYear: string, securityCode: string) {
        await this.firstNameInput.fill(firstName)
        await this.lastNameInput.fill(lastName)
        await this.creditCardNumber.fill(creditCardNumber)
        await this.cardTypeButton.click()
        await this.cardTypeSelection().click()
        await this.creditCardExpirationYearButton.click()
        await this.creditCardExpirationYearSelection(expirationYear).click()
        await this.creditCardSecurityCodeInput.fill(securityCode)
    }

    public async clickCompleteReservationButton() {
        await this.completeReservationButton.click()
    }

}