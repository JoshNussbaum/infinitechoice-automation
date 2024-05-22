# Infinite Choice Web Automation Tests

## Run
- Clone the project
- In root directory run `npx playwright test --headed`

## Limitations / Future Fixes
- When running all browsers at once, we may run into a case where a request to book is made for the same hotel resulting in an error message in the web application
- It is possible there are no hotel reservations for our randomly selected date, in which case our tests will fail.
