export interface LeaderboardEntry {
  id: string;
  name: string;
  score: number;
  coins: number;
  time: number;
  accuracy: number;
  date: string;
}

const LEADERBOARD_KEY = 'christmas_quiz_leaderboard';

export const getLeaderboard = (): LeaderboardEntry[] => {
  const data = localStorage.getItem(LEADERBOARD_KEY);
  if (!data) return [];
  
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

export const addToLeaderboard = (entry: Omit<LeaderboardEntry, 'id' | 'date'>): LeaderboardEntry => {
  const leaderboard = getLeaderboard();
  
  const newEntry: LeaderboardEntry = {
    ...entry,
    id: Date.now().toString(),
    date: new Date().toISOString(),
  };
  
  leaderboard.push(newEntry);
  
  // Sort by score (desc), then by time (asc)
  leaderboard.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.time - b.time;
  });
  
  // Keep top 100
  const trimmed = leaderboard.slice(0, 100);
  
  localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(trimmed));
  
  return newEntry;
};

export const getRank = (entry: LeaderboardEntry): number => {
  const leaderboard = getLeaderboard();
  return leaderboard.findIndex(e => e.id === entry.id) + 1;
};

export const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};
