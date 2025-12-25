import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Snowfall from '@/components/Snowfall';
import Santa from '@/components/Santa';
import { addToLeaderboard, LeaderboardEntry, getRank } from '@/utils/leaderboard';

interface QuizResults {
  name: string;
  score: number;
  coins: number;
  time: number;
  accuracy: number;
  correctAnswers: number;
  totalQuestions: number;
}

const Result = () => {
  const navigate = useNavigate();
  const [results, setResults] = useState<QuizResults | null>(null);
  const [rank, setRank] = useState<number>(0);
  const [showConfetti, setShowConfetti] = useState(true);

  useEffect(() => {
    const storedResults = sessionStorage.getItem('quizResults');
    if (!storedResults) {
      navigate('/');
      return;
    }

    const parsedResults: QuizResults = JSON.parse(storedResults);
    setResults(parsedResults);

    // Add to leaderboard
    const entry = addToLeaderboard({
      name: parsedResults.name,
      score: parsedResults.score,
      coins: parsedResults.coins,
      time: parsedResults.time,
      accuracy: parsedResults.accuracy,
    });

    setRank(getRank(entry));

    // Hide confetti after a while
    setTimeout(() => setShowConfetti(false), 5000);
  }, [navigate]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceMessage = () => {
    if (!results) return '';
    const accuracy = results.accuracy;
    if (accuracy >= 90) return "🌟 Outstanding! Santa is impressed!";
    if (accuracy >= 70) return "🎄 Great job! You're on the nice list!";
    if (accuracy >= 50) return "👍 Good effort! Keep practicing!";
    return "💪 Don't give up! Try again!";
  };

  const getMood = (): 'idle' | 'happy' | 'sad' | 'celebrating' => {
    if (!results) return 'idle';
    if (results.accuracy >= 70) return 'celebrating';
    if (results.accuracy >= 50) return 'happy';
    return 'sad';
  };

  const handlePlayAgain = () => {
    sessionStorage.removeItem('quizResults');
    navigate('/');
  };

  if (!results) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      <Snowfall />

      {/* Confetti effect */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-20">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute animate-snowfall"
              style={{
                left: `${Math.random() * 100}%`,
                top: '-10px',
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              {['🎁', '🎄', '⭐', '🪙', '❄️'][Math.floor(Math.random() * 5)]}
            </div>
          ))}
        </div>
      )}

      <div className="relative z-10 max-w-2xl w-full mx-auto">
        {/* Santa */}
        <div className="flex justify-center mb-6">
          <Santa mood={getMood()} />
        </div>

        {/* Title */}
        <h1 className="font-christmas text-4xl md:text-6xl text-center font-bold mb-2 gold-text glow-text">
          Quiz Complete! 🎉
        </h1>
        <p className="text-center text-xl text-muted-foreground mb-8">
          {getPerformanceMessage()}
        </p>

        {/* Results card */}
        <div className="christmas-card mb-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-foreground mb-1">{results.name}</h2>
            <p className="text-muted-foreground">Your Performance</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-muted rounded-xl p-4 text-center">
              <div className="text-3xl font-bold gold-text">{results.score}</div>
              <div className="text-muted-foreground text-sm">Total Score</div>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <div className="text-3xl font-bold flex items-center justify-center gap-1">
                🪙 <span className="gold-text">{results.coins}</span>
              </div>
              <div className="text-muted-foreground text-sm">Coins Earned</div>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-foreground">
                {results.correctAnswers}/{results.totalQuestions}
              </div>
              <div className="text-muted-foreground text-sm">Correct Answers</div>
            </div>
            <div className="bg-muted rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-foreground">{results.accuracy}%</div>
              <div className="text-muted-foreground text-sm">Accuracy</div>
            </div>
          </div>

          <div className="flex items-center justify-between p-4 bg-muted rounded-xl mb-6">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⏱️</span>
              <span className="text-foreground">Time Taken</span>
            </div>
            <span className="text-xl font-bold font-mono text-foreground">
              {formatTime(results.time)}
            </span>
          </div>

          {rank > 0 && rank <= 10 && (
            <div className="text-center p-4 rounded-xl mb-6" style={{ background: 'var(--gradient-gold)' }}>
              <span className="text-2xl">🏆</span>
              <span className="text-xl font-bold text-christmas-night ml-2">
                You're #{rank} on the leaderboard!
              </span>
            </div>
          )}

          {/* Action buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handlePlayAgain}
              className="christmas-button py-6 text-lg text-primary-foreground"
            >
              🔄 Play Again
            </Button>
            <Button
              onClick={() => navigate('/leaderboard')}
              className="christmas-button christmas-button-green py-6 text-lg text-secondary-foreground"
            >
              🏆 Leaderboard
            </Button>
          </div>
        </div>

        {/* Share section */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm">
            Share your score and challenge your friends! 🎄
          </p>
        </div>
      </div>
    </div>
  );
};

export default Result;
