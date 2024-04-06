import React from 'react';
import styled from 'styled-components';

export interface ScoreBoxProps {
    homeScore: number;
    awayScore: number;
}

const Box = styled.div`
  background-color: blue;
  color: white;
  padding: .5rem;
`;

const ScoreBox: React.FC<ScoreBoxProps> = ({ homeScore, awayScore }) => {
    return (
        <Box data-testid="ScoreBox">
            {homeScore}:{awayScore}
        </Box>
    );
};

export default ScoreBox;
