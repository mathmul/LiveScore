import React from 'react';
import styled from 'styled-components';

export interface ScoreBoxProps {
    homeScore: number;
    awayScore: number;
}

const Box = styled.div`
    font-size: var(--fontSize, 1.2rem);
    font-weight: bold;
    font-family: Arial;
    background-color: #01a5e2;
    color: white;
    line-height: 100%;
    padding: var(--spacingY) var(--spacingX);
`;

const ScoreBox: React.FC<ScoreBoxProps> = ({ homeScore, awayScore }) => {
    return (
        <Box data-testid="ScoreBox">
            {homeScore}:{awayScore}
        </Box>
    );
};

export default ScoreBox;
