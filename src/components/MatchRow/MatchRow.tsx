import React from 'react';
import TeamFlag, { TeamFlagProps } from '../TeamFlag/TeamFlag';
import ScoreBox, { ScoreBoxProps } from '../ScoreBox/ScoreBox';
import styled from 'styled-components';

export interface MatchRowProps {
    home_team: {
        abbreviation: string;
        flagSrc: string;
        name: string;
    };
    away_team: {
        abbreviation: string;
        flagSrc: string;
        name: string;
    };
    homeScore: number;
    awayScore: number;
}

const RowContainer = styled.div`
    --fontSize: 1.2rem;
    --spacingX: .6em;
    --spacingY: .1em;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2em;
    padding: var(--spacingY) var(--spacingX);
    outline: 1px solid lightblue;
`;

const MatchRow: React.FC<MatchRowProps> = ({ home_team, away_team, homeScore, awayScore }) => {
    const homeTeamFlagProps: TeamFlagProps = { ...home_team, orientation: 'left' }
    const awayTeamFlagProps: TeamFlagProps = { ...away_team, orientation: 'right' }
    const scoreBoxProps: ScoreBoxProps = { homeScore, awayScore }
    return (
        <RowContainer data-testid="MatchRow">
            <TeamFlag { ...homeTeamFlagProps } />
            <ScoreBox { ...scoreBoxProps } />
            <TeamFlag { ...awayTeamFlagProps } />
        </RowContainer>
    );
};

export default MatchRow;
