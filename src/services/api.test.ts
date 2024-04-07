import axios from 'axios';
import { fetchLiveScores, LiveScoreResponse } from './api';

jest.mock('axios', () => ({
    __esModule: true,
    default: {
        get: jest.fn(),
        isAxiosError: jest.fn()
    }
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('fetchLiveScores', () => {
    it('throws an error when the API call fails', async () => {
        const errorMessage = 'Network Error';
        mockedAxios.get.mockRejectedValue(new Error(errorMessage));
        mockedAxios.isAxiosError.mockReturnValue(true);
        const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {});

        await expect(fetchLiveScores()).rejects.toThrow('Error fetching live scores.');
        expect(mockConsoleError).toHaveBeenCalledWith('Axios error fetching live scores:', errorMessage);

        mockConsoleError.mockRestore();
    });

    it('fetches successfully data from the API', async () => {
        const mockData: LiveScoreResponse = {
            phase: 'match',
            teams: [
                { team_id: 1, team_name: 'Team A', team_name_short: 'TA' },
                { team_id: 2, team_name: 'Team B', team_name_short: 'TB' },
            ],
            matches: [{ match_id: 1, tournament_id: 101, round: 1, home_team_id: 1, away_team_id: 2 }],
            events: [
                { event_id: 1, event_type: "match_start", event_time: 0, match_id: 1},
                { event_id: 2, event_type: 'goal', event_time: 30, match_id: 1, score_amount: 1, score_team: 'home' }
            ],
        };
        mockedAxios.get.mockReturnValue({ data: mockData } as any);
        const response = await fetchLiveScores();

        expect(mockedAxios.get).toHaveBeenCalledWith('http://vgcommonstaging.aitcloud.de/livescore/');
        expect(response).toEqual(mockData);
    });
});
