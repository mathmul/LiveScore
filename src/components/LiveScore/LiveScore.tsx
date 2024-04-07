import React from 'react';
import useLiveScore from '../../hooks/useLiveScore';
import MatchRow from '../MatchRow/MatchRow';
import styled from "styled-components";

export interface LiveScoreProps {
    onPhaseChange?: (phase: string) => void;
}

const IMAGES_URL = 'https://vgcommonstaging.aitcloud.de/livescore/images'

const LiveScoreContainer = styled.div`
    --borderColor: #999;
    --spacingX: .6em;
    --spacingY: .2em;
    
    font-size: min(1.2rem, 4vw);
    font-weight: bold;
    font-family: Arial, sans-serif;
    
    display: grid;
    grid-template-columns: 1fr min-content 1fr;
    column-gap: 3.2em;
    row-gap: 1px;
    
    background: var(--borderColor);
    color: #424242;
    padding: .5em;
`

const LiveScore: React.FC<LiveScoreProps> = ({ onPhaseChange }) => {
    const { liveScores, error, loading } = useLiveScore();

    React.useEffect(() => {
        if (liveScores?.phase && onPhaseChange) {
            onPhaseChange(liveScores.phase);
        }
    }, [liveScores?.phase, onPhaseChange]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!liveScores) {
        return <div>No live scores available.</div>;
    }

    return (
        <LiveScoreContainer data-testid="LiveScore" aria-live="polite" aria-label="Live score updates">
            {liveScores.matches.map((match) => {
                const homeTeam = liveScores.teams.find(team => team.team_id === match.home_team_id);
                const awayTeam = liveScores.teams.find(team => team.team_id === match.away_team_id);
                const matchEvents = liveScores.events.filter(event => event.match_id === match.match_id);
                const homeScore = matchEvents.filter(event => event.event_type === 'goal' && event.score_team === 'home').length;
                const awayScore = matchEvents.filter(event => event.event_type === 'goal' && event.score_team === 'away').length;

                if (!homeTeam || !awayTeam) return null;

                return (
                    <MatchRow
                        key={match.match_id}
                        home_team={{
                            abbreviation: homeTeam.team_name_short,
                            crestSrc: `${ IMAGES_URL }/logo_${ homeTeam.team_id }.png`,
                            name: homeTeam.team_name
                        }}
                        away_team={{
                            abbreviation: awayTeam.team_name_short,
                            crestSrc: `${ IMAGES_URL }/logo_${ awayTeam.team_id }.png`,
                            name: awayTeam.team_name
                        }}
                        homeScore={homeScore}
                        awayScore={awayScore}
                    />
                );
            })}
        </LiveScoreContainer>
    );
};

export default LiveScore;
