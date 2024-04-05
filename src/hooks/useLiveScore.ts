import { useState, useEffect } from 'react';
import { fetchLiveScores, LiveScoreResponse } from '../services/api';

const useLiveScore = () => {
    const [liveScores, setLiveScores] = useState<LiveScoreResponse | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const getLiveScores = async () => {
            try {
                const data = await fetchLiveScores();
                if (isMounted) {
                    setLiveScores(data);
                    setLoading(false);
                }
            } catch (e) {
                if (e instanceof Error) {
                    setError(e.message);
                } else {
                    setError('An unknown error occurred');
                }
                setLoading(false);
            }
        };

        getLiveScores();
        const intervalId = setInterval(getLiveScores, 2000);

        return () => {
            isMounted = false;
            clearInterval(intervalId);
        };
    }, []);

    return { liveScores, error, loading };
};

export default useLiveScore;
