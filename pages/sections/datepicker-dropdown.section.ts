import { Page, Locator } from '@playwright/test';

export default class DatePickerDropDown {
    page: Page;
    readonly datePickerDropDown: Locator
    readonly nextMonthButton: Locator
    readonly calendarDayItem = (day: string) => this.datePickerDropDown.locator(`//td[@class='day'][text()=${day}]`)

    constructor(page: Page) {
        this.page = page;
        this.datePickerDropDown = this.page.locator("//div[contains(@class, 'datepicker-dropdown')]")
        this.nextMonthButton = this.datePickerDropDown.locator("//div[contains(@class, 'datepicker-days')]//th[@class='next']")
    }

    async clickNextMonthButton() {
        await this.nextMonthButton.click()
    }

    async clickCalendarDay(day: string) {
        await this.calendarDayItem(day).click()
    }

    public async selectCheckInDate(day: string) {
        await this.clickCalendarDay(day)
    }

    public async selectCheckOutDate(day: string) {
        await this.clickCalendarDay(day)
    }



}