import { showDayIndication } from './index';

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