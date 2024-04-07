import React from 'react';
import {render, waitFor, screen, within} from '@testing-library/react';
import LiveScore from './LiveScore';
import useLiveScore from '../../hooks/useLiveScore'

jest.mock('../../hooks/useLiveScore', () => ({
    __esModule: true,
    default: jest.fn(),
}));

const mockLiveScoresData = {
    "phase":"match",
    "teams":[
        {"team_id":8982001,"team_name":"VL Lisbon","team_name_short":"LIS"},
        {"team_id":8982004,"team_name":"VL Vienna","team_name_short":"VIE"},
        {"team_id":8982012,"team_name":"VL Paris","team_name_short":"PAR"},
        {"team_id":8982014,"team_name":"VL Kiev","team_name_short":"KIE"}
    ],
    "matches":[
        {"match_id":250391326,"tournament_id":1770655,"round":23,"home_team_id":8982001,"away_team_id":8982004},
        {"match_id":250391328,"tournament_id":1770655,"round":23,"home_team_id":8982014,"away_team_id":8982012}
    ],
    "events":[
        {"event_id":2,"event_type":"match_start","event_time":0,"match_id":250391326},
        {"event_id":4,"event_type":"match_start","event_time":0,"match_id":250391328},
        {"event_id":12,"event_type":"goal","event_time":15,"match_id":250391326,"score_amount":1,"score_team":"home"},
        {"event_id":13,"event_type":"goal","event_time":3,"match_id":250391328,"score_amount":1,"score_team":"away"}
    ]
};

describe('LiveScore', () => {
    it('displays loading state initially', () => {
        (useLiveScore as jest.Mock).mockReturnValue({
            liveScores: null,
            error: null,
            loading: true,
        });
        render(<LiveScore />);
        expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    it('displays an error message if there is an error', () => {
        (useLiveScore as jest.Mock).mockReturnValue({
            liveScores: null,
            error: 'Network Error',
            loading: false,
        });
        render(<LiveScore />);
        expect(screen.getByText('Error: Network Error')).toBeInTheDocument();
    });

    it('renders all live scores once data is fetched', async () => {
        (useLiveScore as jest.Mock).mockReturnValue({
            liveScores: mockLiveScoresData,
            error: null,
            loading: false,
        });
        render(<LiveScore />);

        await waitFor(() => {
            const rows = screen.getAllByTestId('MatchRow');
            expect(rows).toHaveLength(mockLiveScoresData.matches.length);
        });
    });

    it('renders details of live scores correctly once data is fetched', async () => {
        (useLiveScore as jest.Mock).mockReturnValue({
            liveScores: mockLiveScoresData,
            error: null,
            loading: false,
        });
        render(<LiveScore />);

        await waitFor(() => {
            expect(screen.getByAltText('Crest of VL Lisbon')).toBeInTheDocument();
            expect(screen.getByAltText('Crest of VL Vienna')).toBeInTheDocument();
            expect(screen.getByText('1:0')).toBeInTheDocument();

            const secondRow = screen.getAllByTestId('MatchRow')[1];
            const { getByText } = within(secondRow);
            expect(getByText('PAR')).toBeInTheDocument();
            expect(getByText('KIE')).toBeInTheDocument();
            expect(getByText('0:1')).toBeInTheDocument();
        });
    });
});

afterEach(() => {
    jest.resetAllMocks();
});
