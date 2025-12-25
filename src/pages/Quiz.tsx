import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Snowfall from '@/components/Snowfall';
import Santa from '@/components/Santa';
import CoinCounter from '@/components/CoinCounter';
import Timer from '@/components/Timer';
import QuizQuestion from '@/components/QuizQuestion';
import { getMixedQuestions, Question } from '@/data/quizQuestions';

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [coins, setCoins] = useState(0);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [santaMood, setSantaMood] = useState<'idle' | 'happy' | 'sad' | 'celebrating'>('idle');
  const [showCoinAnimation, setShowCoinAnimation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [answerTimes, setAnswerTimes] = useState<number[]>([]);

  useEffect(() => {
    const playerName = sessionStorage.getItem('playerName');
    if (!playerName) {
      navigate('/');
      return;
    }
    
    const quizQuestions = getMixedQuestions(3, 4, 3);
    setQuestions(quizQuestions);
  }, [navigate]);

  const calculatePoints = (isCorrect: boolean, timeTaken: number, difficulty: string): number => {
    if (!isCorrect) return 0;
    
    let basePoints = 0;
    switch (difficulty) {
      case 'easy': basePoints = 10; break;
      case 'medium': basePoints = 20; break;
      case 'hard': basePoints = 30; break;
    }
    
    // Speed bonus: up to 50% extra for answers under 10 seconds
    const speedBonus = timeTaken < 10 ? Math.floor((10 - timeTaken) * 2) : 0;
    
    return basePoints + speedBonus;
  };

  const calculateCoins = (isCorrect: boolean, timeTaken: number): number => {
    if (!isCorrect) return 0;
    
    let coinsEarned = 5;
    if (timeTaken < 5) coinsEarned += 5;
    else if (timeTaken < 10) coinsEarned += 3;
    else if (timeTaken < 15) coinsEarned += 1;
    
    return coinsEarned;
  };

  const handleAnswer = (isCorrect: boolean, timeTaken: number) => {
    const currentQuestion = questions[currentQuestionIndex];
    const pointsEarned = calculatePoints(isCorrect, timeTaken, currentQuestion.difficulty);
    const coinsEarned = calculateCoins(isCorrect, timeTaken);
    
    setAnswerTimes(prev => [...prev, timeTaken]);
    
    if (isCorrect) {
      setScore(prev => prev + pointsEarned);
      setCoins(prev => prev + coinsEarned);
      setCorrectAnswers(prev => prev + 1);
      setSantaMood('happy');
      setShowCoinAnimation(true);
      setTimeout(() => setShowCoinAnimation(false), 500);
    } else {
      setSantaMood('sad');
    }

    // Move to next question or finish
    setTimeout(() => {
      setSantaMood('idle');
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
      } else {
        // Quiz finished
        setIsTimerRunning(false);
        finishQuiz();
      }
    }, 1500);
  };

  const finishQuiz = () => {
    const playerName = sessionStorage.getItem('playerName') || 'Anonymous';
    const accuracy = Math.round((correctAnswers / questions.length) * 100);
    
    const results = {
      name: playerName,
      score,
      coins,
      time,
      accuracy,
      correctAnswers,
      totalQuestions: questions.length,
    };
    
    sessionStorage.setItem('quizResults', JSON.stringify(results));
    navigate('/result');
  };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-foreground animate-pulse">Loading quiz... 🎄</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden p-4">
      <Snowfall />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between max-w-4xl mx-auto mb-6">
        <Timer time={time} setTime={setTime} isRunning={isTimerRunning} />
        
        <div className="flex items-center gap-4">
          <CoinCounter coins={coins} animate={showCoinAnimation} />
          <div className="bg-muted px-4 py-2 rounded-full border border-border">
            <span className="font-bold text-foreground">{score}</span>
            <span className="text-muted-foreground ml-1">pts</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 max-w-4xl mx-auto mb-8">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full transition-all duration-500 rounded-full"
            style={{ 
              width: `${((currentQuestionIndex + 1) / questions.length) * 100}%`,
              background: 'var(--gradient-festive)',
            }}
          />
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col lg:flex-row items-start gap-8 max-w-6xl mx-auto">
        {/* Santa */}
        <div className="hidden lg:block lg:w-48 flex-shrink-0">
          <Santa mood={santaMood} showCoins={showCoinAnimation} />
        </div>

        {/* Question */}
        <div className="flex-1 w-full">
          <QuizQuestion
            question={questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={questions.length}
          />
        </div>
      </div>

      {/* Mobile Santa */}
      <div className="lg:hidden fixed bottom-4 left-4 z-20 scale-75 origin-bottom-left">
        <Santa mood={santaMood} showCoins={showCoinAnimation} />
      </div>
    </div>
  );
};

export default Quiz;
