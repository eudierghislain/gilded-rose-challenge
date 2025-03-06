export const DEFAULT_NUMBER_OF_DAYS: number = 2;
export const commandLineArgs: string[] = process.argv;
export const userProvidedArg: string | undefined = commandLineArgs.slice(2)[0];
export const userProvidedDays: number = Number(userProvidedArg);
export const isValidNumber: boolean = !isNaN(userProvidedDays);
export const isPositiveNumber: boolean = userProvidedDays >= 0;

const quitInventoryReport = (): void => process.exit(1);
export const isNotLastDay = (index: number, nbDays: number[]): boolean => index < nbDays.length - 1;
export const getUserInput = (): number[] => {
    let numberOfDays: number;

    if (isValidNumber && isPositiveNumber) {
        numberOfDays = userProvidedDays;
    } else {
        if (userProvidedArg !== undefined) {
            if (!isValidNumber) {
                console.log(`The argument '${userProvidedArg}' is not a valid number.`);
                quitInventoryReport();
            } else if (!isPositiveNumber) {
                console.log(`The argument '${userProvidedDays}' is negative. Please provide a positive number or zero.`);
                quitInventoryReport();
            }
        }
        console.log(`User didn't provide a number of days, Using the default number :  '${DEFAULT_NUMBER_OF_DAYS}'`);
        numberOfDays = DEFAULT_NUMBER_OF_DAYS;
    }

    return Array.from({ length: numberOfDays + 1 }, (_, index: number): number => index);
};

export const showDayIndication = (currentDay: number, requestedDays: number[]): void => {
    const lastDay: number = requestedDays.length - 1;
    const baseDayIndicator: string = `Day ${currentDay}`;
    const dayIndicator: string = currentDay === 0
        ? `${baseDayIndicator} (initial inventory)`
        : currentDay === lastDay
            ? `${baseDayIndicator} (final inventory)`
            : baseDayIndicator;

    console.log(`-------- ${dayIndicator} --------`);
}