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
  display: flex;
  align-items: center;
  flex-direction: ${({ orientation }) => orientation === 'right' ? 'row-reverse' : 'row'};
  justify-content: flex-start;
`;

const AbbreviationText = styled.span<{ orientation: 'left' | 'right' }>`
  font-size: 1rem;
  margin: ${({ orientation }) => (orientation === 'left' ? '0 10px 0 0' : '0 0 0 10px')};
`;

const FlagImage = styled.img`
  width: 40px;
  height: auto;
`;

const TeamFlag: React.FC<TeamFlagProps> = ({ abbreviation, flagSrc, name, orientation }) => {
    return (
        <FlagContainer orientation={orientation} data-testid={`TeamFlag${capitalize(orientation)}`} className={`orientation-${orientation}`}>
            <AbbreviationText orientation={orientation}>{abbreviation}</AbbreviationText>
            <FlagImage src={flagSrc} alt={`Flag of ${name}`} />
        </FlagContainer>
    );
};

export default TeamFlag;
