import React from 'react';
import TeamCrest, { TeamCrestProps } from '../TeamCrest/TeamCrest';
import ScoreBox, { ScoreBoxProps } from '../ScoreBox/ScoreBox';
import styled from 'styled-components';

export interface MatchRowProps {
    home_team: {
        abbreviation: string;
        crestSrc: string;
        name: string;
    };
    away_team: {
        abbreviation: string;
        crestSrc: string;
        name: string;
    };
    homeScore: number;
    awayScore: number;
}

const RowContainer = styled.div`
    grid-column: span 3;
    display: grid;
    grid-template-columns: subgrid;
    
    background: white;
    padding: var(--spacingY) var(--spacingX);
`;

const MatchRow: React.FC<MatchRowProps> = ({ home_team, away_team, homeScore, awayScore }) => {
    const homeTeamCrestProps: TeamCrestProps = { ...home_team, orientation: 'left' }
    const awayTeamCrestProps: TeamCrestProps = { ...away_team, orientation: 'right' }
    const scoreBoxProps: ScoreBoxProps = { homeScore, awayScore }
    return (
        <RowContainer data-testid="MatchRow">
            <TeamCrest { ...homeTeamCrestProps } />
            <ScoreBox { ...scoreBoxProps } />
            <TeamCrest { ...awayTeamCrestProps } />
        </RowContainer>
    );
};

export default MatchRow;
