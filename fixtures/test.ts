import { test as base } from "@playwright/test";
import GooglePage from "../pages/google.page";
import HotelBookingPage from "../pages/hotel-booking.page";
import HotelCheckoutPage from "../pages/hotel-checkout.page";


export const test = base.extend<{
    googlePage: GooglePage;
    hotelBookingPage: HotelBookingPage;
    hotelCheckoutPage: HotelCheckoutPage
}>({
    googlePage: async ({ page }, use) => {
        const googlePage = new GooglePage(page);
        await use(googlePage);
    },
    hotelBookingPage: async ({ page }, use) => {
        const aboutTheHotelPage = new HotelBookingPage(page);
        await use(aboutTheHotelPage);
    },
    hotelCheckoutPage: async ({ page }, use) => {
        const hotelCheckoutPage = new HotelCheckoutPage(page);
        await use(hotelCheckoutPage);
    }
});