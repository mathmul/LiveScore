import React, {useEffect, useState} from 'react';
import styled from 'styled-components';
import './ScoreBox.css';
import footballIcon from '../../assets/football.svg';

export interface ScoreBoxProps {
    homeScore: number;
    awayScore: number;
}

const animationDuration = 2000; // 2s

const Box = styled.div<{ $animate: boolean; $showFootball: 'home'|'away' }>`
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
    const [scoreChanged, setScoreChanged] = useState(false);
    const [lastScorer, setLastScorer] = useState<'home' | 'away'>('home');
    const [showFootballIcon, setShowFootballIcon] = useState(false);

    useEffect(() => {
        if (homeScore === previousScores.homeScore && awayScore === previousScores.awayScore)
            return;

        setScoreChanged(true);
        setAnimate(true);
        setLastScorer(homeScore !== previousScores.homeScore ? 'home' : 'away');
        setShowFootballIcon(true);
    }, [homeScore, awayScore]);

    useEffect(() => {
        if (!scoreChanged)
            return;

        const timeoutId = setTimeout(() => {
            setScoreChanged(false);
            setAnimate(false);
            setPreviousScores({ homeScore, awayScore });
            setShowFootballIcon(false);
        }, animationDuration);

        return () => clearTimeout(timeoutId);
    }, [scoreChanged]);

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
