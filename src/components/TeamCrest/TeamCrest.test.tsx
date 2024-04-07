import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamCrest, { TeamCrestProps } from './TeamCrest';

const mockProps : TeamCrestProps = {
    abbreviation: "TMO",
    crestSrc: 'crestSrc',
    name: "TeamMock",
    orientation: 'left'
};

describe('TeamCrest', () => {
    it('renders without crashing', () => {
        render(<TeamCrest {...mockProps} />);
        expect(screen.getByTestId('TeamCrestLeft')).toBeInTheDocument();
    });

    it('respects orientation', () => {
        const rightProps : TeamCrestProps = { ...mockProps, orientation: 'right' };
        render(<TeamCrest {...rightProps} />);
        expect(screen.getByTestId('TeamCrestRight')).toBeInTheDocument();
    });

    it('displays the correct team abbreviation', () => {
        render(<TeamCrest {...mockProps} />);
        expect(screen.getByText(mockProps.abbreviation)).toBeInTheDocument();
    });

    it('displays the crest image with correct src and alt text', () => {
        render(<TeamCrest {...mockProps} />);
        const crestImage = screen.getByAltText(`Crest of ${mockProps.name}`);
        expect(crestImage).toBeInTheDocument();
        expect(crestImage).toHaveAttribute('src', mockProps.crestSrc);
    });
});
