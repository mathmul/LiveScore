import React from 'react';
import styled from 'styled-components';
import { capitalize } from "../../utils/stringUtils";

export interface TeamCrestProps {
    abbreviation: string;
    crestSrc: string;
    name: string;
    orientation: 'left' | 'right';
}

const CrestContainer = styled.div<{ orientation: 'left' | 'right' }>`
    display: flex;
    flex-direction: ${({ orientation }) => orientation === 'right' ? 'row-reverse' : 'row'};
    align-items: center;
    justify-content: flex-end;
    gap: var(--spacingX);
`;

const CrestImage = styled.img`
    width: 2em;
    height: auto;
`;

const TeamCrest: React.FC<TeamCrestProps> = ({ abbreviation, crestSrc, name, orientation }) => {
    return (
        <CrestContainer orientation={orientation} data-testid={`TeamCrest${capitalize(orientation)}`} className={`orientation-${orientation}`}>
            <span>{abbreviation}</span>
            <CrestImage src={crestSrc} alt={`Crest of ${name}`} />
        </CrestContainer>
    );
};

export default TeamCrest;
