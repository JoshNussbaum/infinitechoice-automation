import { Page, Locator, expect } from '@playwright/test';
import HotelBookingModalSection from './sections/hotel-booking-modal.section';

export default class HotelBookingPage {
    page: Page;
    hotelBookingModal: HotelBookingModalSection
    readonly loadingPage: Locator
    readonly bookingCheckRates: Locator
    readonly bookNowButtons: Locator

    constructor(page: Page) {
        this.page = page;
        this.hotelBookingModal = new HotelBookingModalSection(page)
        this.loadingPage = this.page.locator("//body[@class='booking-crloader-page']")
        this.bookingCheckRates = this.page.locator("//body[contains(@class, 'booking-checkrates')]")
        this.bookNowButtons = this.page.locator("//a[text()='Book now']")
    }

    async waitForLoad() {
        await expect(this.loadingPage).toHaveCount(0)
    }

    async selectDatesAndFindRooms(checkInDay: number, checkOutDay: number) {
        await this.hotelBookingModal.selectCheckInDate(checkInDay)
        await this.hotelBookingModal.selectCheckOutDate(checkOutDay)
        await this.hotelBookingModal.clickFindRoomsButton()
    }

    async clickFirstBookNowButton() {
        await this.bookNowButtons.first().click()
    }

}