import React from 'react';
import useLiveScore from './hooks/useLiveScore';

const Tmp = () => {
    const { liveScores, error, loading } = useLiveScore();

    const renderMatches = () => {
        if (loading) return <div>Loading...</div>;
        if (error) return <div>Error: {error}</div>;
        if (!liveScores) return <div>No live score data available.</div>;

        return liveScores.matches.map((match) => {
            const homeTeam = liveScores.teams.find(team => team.team_id === match.home_team_id);
            const awayTeam = liveScores.teams.find(team => team.team_id === match.away_team_id);
            const score = { home: 0, away: 0 };
            liveScores.events.forEach((event) => {
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

    return <div>{renderMatches()}</div>;
};

export default Tmp;
