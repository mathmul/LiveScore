import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamCrest, { TeamCrestProps } from './TeamCrest';

describe('TeamCrest', () => {
    const mockProps : TeamCrestProps = {
        abbreviation: "SVN",
        crestSrc: './assets/team-crests/logo_8982012.png',
        name: "Slovenia",
        orientation: 'left'
    };

    it('renders without crashing', () => {
        render(<TeamCrest {...mockProps} />);
        const element = screen.getByTestId('TeamCrestLeft');
        expect(element).toBeInTheDocument();
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

    it('respects orientation', () => {
        const rightProps : TeamCrestProps = { ...mockProps, orientation: 'right' };
        render(<TeamCrest {...rightProps} />);
        const rightContainer = screen.getByTestId('TeamCrestRight');
        expect(rightContainer).toBeInTheDocument();
    });
});
