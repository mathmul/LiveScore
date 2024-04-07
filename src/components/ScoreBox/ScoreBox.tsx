import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './ScoreBox.css';
import footballIcon from '../../assets/football.svg';

export interface ScoreBoxProps {
    homeScore: number;
    awayScore: number;
}

const animationDuration = 2000; // 2s

const Box = styled.div<{ $animate: boolean; $showFootball: 'home'|'away'|'none' }>`
    line-height: 100%;
    
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    background-color: #00a5e1; // https://pickcoloronline.com/
    color: white;
    padding: var(--spacingY) var(--spacingX);

    animation: ${({ $animate }) => $animate ? `goalScored ${animationDuration}ms ease-out forwards` : 'none'};

    .football-icon {
        position: absolute;
        height: 1.5em;
        width: auto;
        opacity: 0;
        ${({ $showFootball }) =>
                $showFootball === 'home' ? 'left: -1.5em;'
                : $showFootball === 'away' ? 'right: -1.5em;'
                : ''}
    }
`;

const ScoreBox: React.FC<ScoreBoxProps> = ({ homeScore, awayScore }) => {
    const [animate, setAnimate] = useState(false);
    const [previousScores, setPreviousScores] = useState({ homeScore, awayScore });
    const [lastScorer, setLastScorer] = useState<'home' | 'away' | 'none'>('none');
    const [showFootballIcon, setShowFootballIcon] = useState(false);

    useEffect(() => {
        if (homeScore !== previousScores.homeScore || awayScore !== previousScores.awayScore) {
            setAnimate(true);
            const newScorer = homeScore !== previousScores.homeScore ? 'home' : 'away';
            setLastScorer(newScorer);

            setShowFootballIcon(true);

            const timeoutId = setTimeout(() => {
                setShowFootballIcon(false);
                setAnimate(false);
            }, animationDuration);

            return () => {
                clearTimeout(timeoutId);
            };
        }
    }, [homeScore, awayScore, previousScores.homeScore, previousScores.awayScore]);

    const score = `${homeScore}:${awayScore}`;
    return (
        <Box data-testid="ScoreBox" $animate={animate} $showFootball={lastScorer}>
            <img src={footballIcon}
                 alt="Football icon"
                 className={`football-icon ${showFootballIcon ? 'show-and-fade' : ''}`} />
            {score}
        </Box>
    );
};

export default ScoreBox;
