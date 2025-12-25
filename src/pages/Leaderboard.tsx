import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Snowfall from '@/components/Snowfall';
import { getLeaderboard, LeaderboardEntry, formatTime } from '@/utils/leaderboard';

const Leaderboard = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    setLeaderboard(getLeaderboard());
  }, []);

  const getRankBadge = (rank: number) => {
    if (rank === 1) return '🥇';
    if (rank === 2) return '🥈';
    if (rank === 3) return '🥉';
    return `#${rank}`;
  };

  const getRankStyle = (rank: number) => {
    if (rank === 1) return 'bg-christmas-gold/20 border-christmas-gold';
    if (rank === 2) return 'bg-muted border-muted-foreground/50';
    if (rank === 3) return 'bg-christmas-red/10 border-christmas-red/50';
    return 'bg-muted/50 border-border';
  };

  return (
    <div className="min-h-screen relative overflow-hidden p-4 py-8">
      <Snowfall />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-christmas text-4xl md:text-6xl font-bold mb-2 gold-text glow-text">
            🏆 Leaderboard 🏆
          </h1>
          <p className="text-muted-foreground">Top Java Quiz Champions</p>
        </div>

        {/* Leaderboard list */}
        {leaderboard.length === 0 ? (
          <div className="christmas-card text-center py-12">
            <div className="text-6xl mb-4">🎄</div>
            <h2 className="text-xl font-bold text-foreground mb-2">No scores yet!</h2>
            <p className="text-muted-foreground mb-6">
              Be the first to complete the quiz and claim the top spot!
            </p>
            <Button
              onClick={() => navigate('/')}
              className="christmas-button text-primary-foreground"
            >
              🎅 Start Quiz
            </Button>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {leaderboard.slice(0, 20).map((entry, index) => (
              <div
                key={entry.id}
                className={`christmas-card flex items-center gap-4 p-4 border ${getRankStyle(index + 1)}`}
              >
                {/* Rank */}
                <div className="w-12 text-center text-2xl font-bold">
                  {getRankBadge(index + 1)}
                </div>

                {/* Player info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-lg text-foreground truncate">{entry.name}</h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span>⏱️ {formatTime(entry.time)}</span>
                    <span>🎯 {entry.accuracy}%</span>
                  </div>
                </div>

                {/* Score and coins */}
                <div className="text-right">
                  <div className="text-xl font-bold gold-text">{entry.score}</div>
                  <div className="text-sm text-muted-foreground flex items-center gap-1 justify-end">
                    🪙 {entry.coins}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Back button */}
        <div className="text-center">
          <Button
            onClick={() => navigate('/')}
            className="christmas-button christmas-button-green text-secondary-foreground"
          >
            🏠 Back to Home
          </Button>
        </div>
      </div>

      {/* Decorations */}
      <div className="absolute bottom-4 left-4 text-4xl animate-bounce-soft">🎁</div>
      <div className="absolute bottom-4 right-4 text-4xl animate-bounce-soft" style={{ animationDelay: '0.5s' }}>🎄</div>
    </div>
  );
};

export default Leaderboard;
