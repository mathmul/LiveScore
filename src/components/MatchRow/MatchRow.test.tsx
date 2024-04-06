import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchRow, { MatchRowProps } from './MatchRow';
import { capitalize } from "../../utils/stringUtils";
import TeamFlag from '../TeamFlag/TeamFlag';

jest.mock('../ScoreBox/ScoreBox', () => (props: any) => <div data-testid="ScoreBox"></div>);
jest.mock('../TeamFlag/TeamFlag');

afterEach(() => {
    jest.clearAllMocks();
});

describe('MatchRow', () => {
    const mockProps : MatchRowProps = {
        home_team: { abbreviation: 'HOM', flagSrc: 'home_flag_url', name: 'HomeTeam' },
        away_team: { abbreviation: 'AWY', flagSrc: 'away_flag_url', name: 'AwayTeam' },
        homeScore: 1,
        awayScore: 2
    };

    it('renders without crashing', () => {
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('MatchRow')).toBeInTheDocument();
    });

    it('displays TeamFlag components for home and away teams', () => {
        (TeamFlag as jest.Mock).mockImplementation(({ orientation }) => (
            <div data-testid={`TeamFlag${capitalize(orientation)}`}></div>
        ));
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('TeamFlagLeft')).toBeInTheDocument();
        expect(screen.getByTestId('TeamFlagRight')).toBeInTheDocument();
    });

    it('displays ScoreBox', () => {
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('ScoreBox')).toBeInTheDocument();
    });

    it('passes the correct props to TeamFlag components', () => {
        render(<MatchRow {...mockProps} />);
        expect(TeamFlag).toHaveBeenCalledWith(
            expect.objectContaining({
                abbreviation: mockProps.home_team.abbreviation,
                flagSrc: mockProps.home_team.flagSrc,
                name: mockProps.home_team.name,
                orientation: 'left',
            }),
            {},
        );
        expect(TeamFlag).toHaveBeenCalledWith(
            expect.objectContaining({
                abbreviation: mockProps.away_team.abbreviation,
                flagSrc: mockProps.away_team.flagSrc,
                name: mockProps.away_team.name,
                orientation: 'right',
            }),
            {},
        );
    });
});
