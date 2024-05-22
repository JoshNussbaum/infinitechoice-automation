export function getOneMonthAhead(currentDate: Date = new Date()): Date {
    var year = currentDate.getFullYear();
    let month = currentDate.getMonth() + 1; // Add 1 for next month

    // Handle cases where the new month overflows to the next year
    if (month === 12) {
        month = 0;
        year++;
    }

    // Create a new Date object with adjustments to avoid edge cases
    const newDate = new Date(year, month, 1);

    // Adjust the day if necessary to ensure the chosen date is valid
    if (newDate.getDate() !== 1) {
        newDate.setDate(0); // Set to the last day of the previous month
    }

    return newDate;
}