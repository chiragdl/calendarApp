const MONTH_NAMES = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE', 
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

// Function to validate input parameters
function validateInputs(month, year, startDay) {
    // Validate month
    if (month < 1 || month > 12) {
        console.error('Error: Month must be between 1 and 12');
        process.exit(1);
    }

    // Validate year
    if (year < 1980 || year > 2030) {
        console.error('Error: Year must be between 1980 and 2030');
        process.exit(1);
    }

    // Validate start day
    if (!WEEKDAYS.includes(startDay)) {
        console.error('Error: Start day must be one of: Su, Mo, Tu, We, Th, Fr, Sa');
        process.exit(1);
    }
}

// Function to generate the calendar
function generateCalendar(month, year, startDay) {
    // Adjust month to 0-indexed for Date object
    const date = new Date(year, month - 1, 1); // (0-Jan, 1-Feb,...., Dec-11)
    
    // Find the starting weekday index
    const startDayIndex = WEEKDAYS.indexOf(startDay); // start day is mapped to weekdays
    
    // Get the last day of the month
    const lastDay = new Date(year, month, 0).getDate(); // finds the last days of the months and automatically handles leap years.
    
    // Find the first day of the month's weekday
    let currentDayOfWeek = date.getDay();
    
    // Rotate the weekdays based on the start day
    const rotatedWeekdays = WEEKDAYS.slice(startDayIndex)
        .concat(WEEKDAYS.slice(0, startDayIndex));
    
    // Generate calendar header
    let calendar = `****${MONTH_NAMES[month - 1]} ${year}****\n`;
    calendar += rotatedWeekdays.join(' ') + '\n';
    
    // Track current day and weekday for formatting
    let currentDay = 1;
    let calendarLine = '';
    
    // Adjust initial spacing based on the first day of the month
    let initialOffset = (currentDayOfWeek - startDayIndex + 7) % 7; //Aliginning the first day of the month with the correct weekday
    calendarLine += ' '.repeat(initialOffset * 3);
    
    // Generate calendar body
    while (currentDay <= lastDay) { // Loop through days of month 
        // Add current day with padding
        calendarLine += currentDay.toString().padStart(2, '0') + ' '; // append it to calendarLine
        
        // Move to next line if week is complete
        if ((currentDay + initialOffset) % 7 === 0) {
            calendar += calendarLine.trimEnd() + '\n'; // move to next line when 7 days is completed
            calendarLine = '';
        }
        
        currentDay++;
    }
    
    // Add last line if not complete
    if (calendarLine.trim() !== '') {
        calendar += calendarLine.trimEnd(); // If the last week isn't complete, append the remaining days to the calendar.
    }
    
    return calendar;
}

// Main function
function main() {
    // Check if correct number of arguments are provided
    if (process.argv.length !== 5) {
        console.error('Usage: node calendarApp.js <month> <year> <startDay>');
        process.exit(1);
    }
    // inputs
    const month = parseInt(process.argv[2]);
    const year = parseInt(process.argv[3]);
    const startDay = process.argv[4];


    // Validate inputs
    validateInputs(month, year, startDay);

    // Generate and print calendar
    console.log(generateCalendar(month, year, startDay));

}

// Run main
main();