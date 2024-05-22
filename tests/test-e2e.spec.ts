import { expect } from '@playwright/test';
import { test } from "../fixtures/test";
import User from '../models/user';
import PaymentInformation from '../models/payment-information';
import ReservationDetails from '../models/reservation-details';

const invalidUserReservationDetails = [
    new ReservationDetails('Aria hotel Las Vegas', 14, 20, 1, 0, 1, new User(1, 'Test', 'User', 'testguestuser@guestreservation.com', '1234567890', '1234 test street', 'San Fransisco', '12345', new PaymentInformation('4111111111111111', '01', '2025', '123', 'test', 'user', 'visa')))
]

invalidUserReservationDetails.forEach((reservationDetails) => {
    test(`Search for hotel on google, select guestreservations, checkout with user ID: ${reservationDetails.user.id} using test credit card, verify error message`, async ({ googlePage, hotelBookingPage, hotelCheckoutPage }) => {
        // Given
        const numberOfRooms = 1
        const randomStartDateBuffer = Math.floor(Math.random() * 5)
        const randomEndDateBuffer = Math.floor(Math.random() * 5)

        // When
        await googlePage.open();
        await googlePage.search(reservationDetails.hotelName);

        // If we don't see guestreservation link keep loading more results until we do or we reach end of results
        while (!(await googlePage.isSearchResultLinkVisible('guestreservations.com')) && !(await googlePage.endOfResults.isVisible())) {
            await googlePage.loadMoreResults();
        }
        await googlePage.clickSearchResultLink('guestreservations.com');

        await hotelBookingPage.selectDatesAndFindRooms(reservationDetails.checkInDate + randomStartDateBuffer, reservationDetails.checkOutDate + randomEndDateBuffer)
        await hotelBookingPage.waitForLoad();

        // If booking is no longer available we should try the next booking
        await hotelBookingPage.clickFirstBookNowButton();
        await hotelCheckoutPage.waitForLoad();

        await hotelCheckoutPage.fillOutGuestInformation(numberOfRooms, reservationDetails.user.firstName, reservationDetails.user.lastName, reservationDetails.user.email, reservationDetails.user.phone, reservationDetails.user.streetAddress, reservationDetails.user.city, reservationDetails.user.zipCode)

        await hotelCheckoutPage.payForReservation(reservationDetails.user.paymentInformation.cardHolderFirstName, reservationDetails.user.paymentInformation.cardHolderLastName, reservationDetails.user.paymentInformation.cardNumber, reservationDetails.user.paymentInformation.expirationMonth, reservationDetails.user.paymentInformation.expirationYear, reservationDetails.user.paymentInformation.cvv)

        // Then
        await hotelCheckoutPage.expectInfoMessage('Credit card is declined.')
    });
});



