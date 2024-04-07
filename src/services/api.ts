import axios from 'axios';

const API_URL = 'http://vgcommonstaging.aitcloud.de/livescore/';

export type LiveScoreResponse = {
    phase: string;
    teams: Array<{
        team_id: number;
        team_name: string;
        team_name_short: string;
    }>;
    matches: Array<{
        match_id: number;
        tournament_id: number;
        round: number;
        home_team_id: number;
        away_team_id: number;
    }>;
    events: Array<{
        event_id: number;
        event_type: string;
        event_time: number;
        match_id: number;
        score_amount?: number;
        score_team?: 'home' | 'away';
    }>;
};

export const fetchLiveScores = async (): Promise<LiveScoreResponse> => {
    try {
        const response = await axios.get<LiveScoreResponse>(API_URL);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error fetching live scores:', error.message);
            throw new Error('Error fetching live scores.');
        } else {
            console.error('Unexpected error fetching live scores:', error);
            throw new Error('Error fetching live scores.');
        }
    }
};
