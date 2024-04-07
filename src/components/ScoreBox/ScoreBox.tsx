import React from 'react';
import styled from 'styled-components';

export interface ScoreBoxProps {
    homeScore: number;
    awayScore: number;
}

const Box = styled.div`
    line-height: 100%;
    
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: #00a5e1; // https://pickcoloronline.com/
    color: white;
    padding: var(--spacingY) var(--spacingX);
`;

const ScoreBox: React.FC<ScoreBoxProps> = ({ homeScore, awayScore }) => {
    const score = `${homeScore}:${awayScore}`;
    return (
        <Box data-testid="ScoreBox">{score}</Box>
    );
};

export default ScoreBox;
