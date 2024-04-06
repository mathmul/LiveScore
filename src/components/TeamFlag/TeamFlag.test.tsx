import React from 'react';
import { render, screen } from '@testing-library/react';
import TeamFlag, { TeamFlagProps } from './TeamFlag';

// TODO: Find out where to get the data from (incl. images) | Note: Mockup has country teams, but JSON response is for club teams
// import { Country } from '../../types/Country';
// import countriesData from '../../data/countries.json';
// const country: Country = {
//     "name":"Slovenia",
//     "alpha-2":"SI",
//     "alpha-3":"SVN",
//     "country-code":"705",
//     "iso_3166-2":"ISO 3166-2:SI",
//     "region":"Europe",
//     "sub-region":"Southern Europe",
//     "intermediate-region":"",
//     "region-code":"150",
//     "sub-region-code":"039",
//     "intermediate-region-code":""
// };

describe('TeamFlag', () => {
    const mockProps : TeamFlagProps = {
        abbreviation: "SVN",
        flagSrc: `https://flagcdn.com/w40/si.png`,
        name: "Slovenia",
        orientation: 'left'
    };

    it('renders without crashing', () => {
        render(<TeamFlag {...mockProps} />);
        const element = screen.getByTestId('TeamFlagLeft');
        expect(element).toBeInTheDocument();
    });

    it('displays the correct team abbreviation', () => {
        render(<TeamFlag {...mockProps} />);
        expect(screen.getByText(mockProps.abbreviation)).toBeInTheDocument();
    });

    it('displays the flag image with correct src and alt text', () => {
        render(<TeamFlag {...mockProps} />);
        const flagImage = screen.getByAltText(`Flag of ${mockProps.name}`);
        expect(flagImage).toBeInTheDocument();
        expect(flagImage).toHaveAttribute('src', mockProps.flagSrc);
    });

    it('respects orientation', () => {
        const rightProps : TeamFlagProps = { ...mockProps, orientation: 'right' };
        render(<TeamFlag {...rightProps} />);
        const rightContainer = screen.getByTestId('TeamFlagRight');
        expect(rightContainer).toBeInTheDocument();
    });
});
