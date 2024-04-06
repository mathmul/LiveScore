import React from 'react';
import styled from 'styled-components';
import { capitalize } from "../../utils/stringUtils";

export interface TeamFlagProps {
    abbreviation: string;
    flagSrc: string;
    name: string;
    orientation: 'left' | 'right';
}

const FlagContainer = styled.div<{ orientation: 'left' | 'right' }>`
    font-size: var(--fontSize);
    display: flex;
    flex-direction: ${({ orientation }) => orientation === 'right' ? 'row-reverse' : 'row'};
    align-items: center;
    justify-content: flex-start;
    gap: var(--spacingX);
`;

const FlagImage = styled.img`
    width: 2em;
    height: auto;
`;

const TeamFlag: React.FC<TeamFlagProps> = ({ abbreviation, flagSrc, name, orientation }) => {
    return (
        <FlagContainer orientation={orientation} data-testid={`TeamFlag${capitalize(orientation)}`} className={`orientation-${orientation}`}>
            <span>{abbreviation}</span>
            <FlagImage src={flagSrc} alt={`Flag of ${name}`} />
        </FlagContainer>
    );
};

export default TeamFlag;
