import React, { useState, useEffect } from 'react';
import { fetchLiveScores, LiveScoreResponse } from './services/api';

const Tmp = () => {
    const [liveScores, setLiveScores] = useState<LiveScoreResponse | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getLiveScores = async () => {
            try {
                const data = await fetchLiveScores();
                setLiveScores(data);
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
            }
        };

        getLiveScores();
    }, []);

    const renderMatches = (data: LiveScoreResponse) => {
        return data.matches.map((match) => {
            const homeTeam = data.teams.find(team => team.team_id === match.home_team_id);
            const awayTeam = data.teams.find(team => team.team_id === match.away_team_id);
            const score = { home: 0, away: 0 };
            data.events.forEach((event) => {
                if (event.match_id === match.match_id && event.event_type === 'goal') {
                    if (event.score_team === 'home') {
                        score.home += event.score_amount ?? 0;
                    } else {
                        score.away += event.score_amount ?? 0;
                    }
                }
            });

            return (
                <div key={match.match_id}>
                    {homeTeam?.team_name_short} vs {awayTeam?.team_name_short} - {score.home}:{score.away}
                </div>
            );
        });
    };

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!liveScores) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {renderMatches(liveScores)}
        </div>
    );
};

export default Tmp;
