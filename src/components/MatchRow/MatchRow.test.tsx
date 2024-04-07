import React from 'react';
import { render, screen } from '@testing-library/react';
import MatchRow, { MatchRowProps } from './MatchRow';
import { capitalize } from "../../utils/stringUtils";
import TeamCrest from '../TeamCrest/TeamCrest';

jest.mock('../ScoreBox/ScoreBox', () => () => <div data-testid="ScoreBox"></div>);
jest.mock('../TeamCrest/TeamCrest');

describe('MatchRow', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockProps : MatchRowProps = {
        home_team: { abbreviation: 'HOM', crestSrc: 'HomeTeamCrestSrc', name: 'HomeTeam' },
        away_team: { abbreviation: 'AWY', crestSrc: 'AwayTeamCrestSrc', name: 'AwayTeam' },
        homeScore: 1,
        awayScore: 2
    };

    it('renders without crashing', () => {
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('MatchRow')).toBeInTheDocument();
    });

    it('displays TeamCrest components for home and away teams', () => {
        (TeamCrest as jest.Mock).mockImplementation(({ orientation }) => (
            <div data-testid={`TeamCrest${capitalize(orientation)}`}></div>
        ));
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('TeamCrestLeft')).toBeInTheDocument();
        expect(screen.getByTestId('TeamCrestRight')).toBeInTheDocument();
    });

    it('displays ScoreBox', () => {
        render(<MatchRow {...mockProps} />);
        expect(screen.getByTestId('ScoreBox')).toBeInTheDocument();
    });

    it('passes the correct props to TeamCrest components', () => {
        render(<MatchRow {...mockProps} />);
        expect(TeamCrest).toHaveBeenCalledWith(
            expect.objectContaining({
                abbreviation: mockProps.home_team.abbreviation,
                crestSrc: mockProps.home_team.crestSrc,
                name: mockProps.home_team.name,
                orientation: 'left',
            }),
            {},
        );
        expect(TeamCrest).toHaveBeenCalledWith(
            expect.objectContaining({
                abbreviation: mockProps.away_team.abbreviation,
                crestSrc: mockProps.away_team.crestSrc,
                name: mockProps.away_team.name,
                orientation: 'right',
            }),
            {},
        );
    });
});
