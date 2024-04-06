import React from 'react';
import { render, screen } from '@testing-library/react';
import ScoreBox from './ScoreBox';

describe('ScoreBox', () => {
    const mockProps = {
        homeScore: 1,
        awayScore: 0
    };

    it('renders without crashing', () => {
        render(<ScoreBox {...mockProps} />);
        const scoreBoxElement = screen.getByTestId('ScoreBox');
        expect(scoreBoxElement).toBeInTheDocument();
    });

    it('displays the correct score', () => {
        render(<ScoreBox {...mockProps} />);
        expect(screen.getByText('1:0')).toBeInTheDocument();
    });
});
