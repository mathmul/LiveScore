import React from 'react';
import {render, screen, waitFor} from '@testing-library/react';
import App from './App';
import axios from "axios";
import {LiveScoreResponse} from "./services/api";

// FIXME: Not sure how to resolve issues with axios import other than adding all this extra code
// FIXME: ## FROM
jest.mock('axios', () => ({
  __esModule: true,
  default: {
    get: jest.fn(),
    isAxiosError: jest.fn()
  }
}));
const mockedAxios = axios as jest.Mocked<typeof axios>;
// FIXME: ## TO

test('renders learn LiveScore component', async () => {
  // FIXME: ## FROM
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
  // FIXME: ## TO

  render(<App />);
  const liveScoreComponent = await screen.findByTestId('LiveScore');
  expect(liveScoreComponent).toBeInTheDocument();
});
