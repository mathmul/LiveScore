import React from 'react';
import { act, render, screen } from '@testing-library/react';
import ScoreBox from './ScoreBox';

describe('ScoreBox', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    afterEach(() => {
        jest.runOnlyPendingTimers();
    });

    const mock0to0 = { homeScore: 0, awayScore: 0 };
    const mock1to0 = { homeScore: 1, awayScore: 0 };

    it('renders without crashing', () => {
        render(<ScoreBox { ...mock0to0 } />);
        expect(screen.getByTestId('ScoreBox')).toBeInTheDocument();
    });

    it('displays the correct score', () => {
        render(<ScoreBox { ...mock1to0 } />);
        expect(screen.getByText('1:0')).toBeInTheDocument();
    });

    it('has the football icon in DOM', () => {
        render(<ScoreBox { ...mock0to0 } />);
        expect(screen.getByAltText('Football icon')).toBeInTheDocument();
    });

    it('doesn\'t show the football icon by default', () => {
        render(<ScoreBox { ...mock0to0 } />);
        expect(screen.getByAltText('Football icon')).not.toHaveClass('show-and-fade');
    });

    it('shows the football icon after scoring for 2 seconds only', () => {
        const { rerender } = render(<ScoreBox { ...mock0to0 } />);
        rerender(<ScoreBox { ...mock1to0 } />);
        expect(screen.getByAltText('Football icon')).toHaveClass('show-and-fade');

        act(() => {
            jest.advanceTimersByTime(2100);
        });
        expect(screen.getByAltText('Football icon')).not.toHaveClass('show-and-fade');
    });
});
