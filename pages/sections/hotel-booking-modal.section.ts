import { Page, Locator } from '@playwright/test';
import DatePickerDropDown from './datepicker-dropdown.section';

export default class HotelBookingModalSection {
    page: Page;
    datePickerDropDown: DatePickerDropDown
    readonly modalContent: Locator
    readonly findRoomsButton: Locator
    readonly checkInDateInput: Locator
    readonly checkOutDateInput: Locator

    constructor(page: Page) {
        this.page = page;
        this.datePickerDropDown = new DatePickerDropDown(page)
        this.modalContent = this.page.locator("//div[@class='modal-content']")
        this.findRoomsButton = this.modalContent.getByRole('button', { name: 'Find Rooms' })
        this.checkInDateInput = this.modalContent.locator("//input[@id='check_in_view']")
        this.checkOutDateInput = this.modalContent.locator("//input[@id='check_out_view']")

    }

    public async selectCheckInDate(day: number) {
        await this.checkInDateInput.click()
        await this.datePickerDropDown.clickNextMonthButton()
        await this.datePickerDropDown.selectCheckInDate(day)
    }

    public async selectCheckOutDate(day: number) {
        await this.checkOutDateInput.click()
        await this.datePickerDropDown.selectCheckOutDate(day)
    }

    async clickFindRoomsButton() {
        await this.findRoomsButton.click()
    }


}