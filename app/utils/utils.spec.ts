import { isNotLastDay, showDayIndication } from './index';

import * as index from './index';

describe('getUserInput', () => {
    const originalConsoleLog = console.log;
    let consoleLogMock: jest.Mock;

    const originalProcessExit = process.exit;
    let processExitMock: jest.Mock;

    let originalModule: any;

    beforeEach(() => {
        originalModule = { ...index };

        consoleLogMock = jest.fn();
        console.log = consoleLogMock;

        processExitMock = jest.fn();
        process.exit = processExitMock as unknown as (code?: number) => never;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
        process.exit = originalProcessExit;

        jest.resetModules();
        jest.clearAllMocks();
    });

    it('should return array with indices when valid number is provided', () => {
        Object.defineProperty(index, 'userProvidedDays', { value: 3 });
        Object.defineProperty(index, 'isValidNumber', { value: true });
        Object.defineProperty(index, 'isPositiveNumber', { value: true });

        const result = index.getUserInput();

        expect(result).toEqual([0, 1, 2, 3]);
        expect(consoleLogMock).not.toHaveBeenCalled();
        expect(processExitMock).not.toHaveBeenCalled();
    });

    it('should use default number when no argument is provided', () => {
        Object.defineProperty(index, 'userProvidedArg', { value: undefined });
        Object.defineProperty(index, 'isValidNumber', { value: false });
        Object.defineProperty(index, 'isPositiveNumber', { value: false });

        const result = index.getUserInput();

        expect(result).toEqual([0, 1, 2]);
        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('Using the default number'));
        expect(processExitMock).not.toHaveBeenCalled();
    });

    it('should exit with error when argument is not a valid number', () => {
        Object.defineProperty(index, 'userProvidedArg', { value: 'abc' });
        Object.defineProperty(index, 'isValidNumber', { value: false });
        Object.defineProperty(index, 'isPositiveNumber', { value: false });

        index.getUserInput();

        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('is not a valid number'));
        expect(processExitMock).toHaveBeenCalledWith(1);
    });

    it('should exit with error when argument is a negative number', () => {
        Object.defineProperty(index, 'userProvidedArg', { value: '-5' });
        Object.defineProperty(index, 'userProvidedDays', { value: -5 });
        Object.defineProperty(index, 'isValidNumber', { value: true });
        Object.defineProperty(index, 'isPositiveNumber', { value: false });

        index.getUserInput();

        expect(consoleLogMock).toHaveBeenCalledWith(expect.stringContaining('is negative'));
        expect(processExitMock).toHaveBeenCalledWith(1);
    });

    it('should handle zero as a valid input', () => {
        Object.defineProperty(index, 'userProvidedDays', { value: 0 });
        Object.defineProperty(index, 'isValidNumber', { value: true });
        Object.defineProperty(index, 'isPositiveNumber', { value: true });

        const result = index.getUserInput();

        expect(result).toEqual([0]);
        expect(consoleLogMock).not.toHaveBeenCalled();
        expect(processExitMock).not.toHaveBeenCalled();
    });
});

describe('isNotLastDay', () => {
    it('should return true when index is not the last element', () => {
        const days = [0, 1, 2, 3];
        expect(isNotLastDay(0, days)).toBe(true);
        expect(isNotLastDay(1, days)).toBe(true);
        expect(isNotLastDay(2, days)).toBe(true);
    });

    it('should return false when index is the last element', () => {
        const days = [0, 1, 2, 3];
        expect(isNotLastDay(3, days)).toBe(false);
    });

    it('should handle empty array correctly', () => {
        const days: number[] = [];
        expect(isNotLastDay(0, days)).toBe(false);
    });

    it('should handle single element array correctly', () => {
        const days = [0];
        expect(isNotLastDay(0, days)).toBe(false);
    });
});

describe('isLastDay', () => {
    it('should return false when index is the last element', () => {
        const days = [0, 1, 2];
        expect(isNotLastDay(0, days)).toBe(true);
        expect(isNotLastDay(1, days)).toBe(true);
        expect(isNotLastDay(2, days)).toBe(false);
    });
});


describe('showDayIndication', () => {
    const originalConsoleLog = console.log;
    let consoleLogMock: jest.Mock;

    beforeEach(() => {
        consoleLogMock = jest.fn();
        console.log = consoleLogMock;
    });

    afterEach(() => {
        console.log = originalConsoleLog;
    });

    it('should show initial inventory for day 0', () => {
        const days = [0, 1, 2];
        showDayIndication(0, days);
        expect(consoleLogMock).toHaveBeenCalledWith('-------- Day 0 (initial inventory) --------');
    });

    it('should show final inventory for last day', () => {
        const days = [0, 1, 2];
        showDayIndication(2, days);
        expect(consoleLogMock).toHaveBeenCalledWith('-------- Day 2 (final inventory) --------');
    });

    it('should show normal day indicator for middle days', () => {
        const days = [0, 1, 2, 3];
        showDayIndication(1, days);
        expect(consoleLogMock).toHaveBeenCalledWith('-------- Day 1 --------');
    });
});