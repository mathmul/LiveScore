import { renderHook, waitFor } from '@testing-library/react';
import { fetchLiveScores, LiveScoreResponse } from '../services/api';
import useLiveScore from './useLiveScore';

jest.mock('../services/api', () => ({
    fetchLiveScores: jest.fn(),
}));

describe('useLiveScore', () => {
    it('should fetch live scores', async () => {
        const mockData: LiveScoreResponse = {
            phase: 'match',
            teams: [],
            matches: [],
            events: [],
        };

        (fetchLiveScores as jest.Mock).mockResolvedValue(mockData);

        const { result } = renderHook(() => useLiveScore());

        expect(result.current.loading).toBe(true);

        await waitFor(() => { expect(result.current.loading).toBe(false) });
        await waitFor(() => { expect(result.current.error).toBe(null) });
        await waitFor(() => { expect(result.current.liveScores).toEqual(mockData) });
    });
});
