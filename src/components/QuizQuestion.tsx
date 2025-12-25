import { useState } from 'react';
import { Question } from '@/data/quizQuestions';
import { Button } from '@/components/ui/button';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (isCorrect: boolean, timeTaken: number) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion = ({ question, onAnswer, questionNumber, totalQuestions }: QuizQuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [startTime] = useState(Date.now());

  const handleAnswer = (index: number) => {
    if (showResult) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    const timeTaken = (Date.now() - startTime) / 1000;
    const isCorrect = index === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(isCorrect, timeTaken);
    }, 1500);
  };

  const getDifficultyColor = () => {
    switch (question.difficulty) {
      case 'easy': return 'bg-christmas-green/20 text-christmas-green border-christmas-green/30';
      case 'medium': return 'bg-christmas-gold/20 text-christmas-gold border-christmas-gold/30';
      case 'hard': return 'bg-christmas-red/20 text-christmas-red border-christmas-red/30';
    }
  };

  const getCategoryIcon = () => {
    switch (question.category) {
      case 'java': return '☕';
      case 'oops': return '🎯';
      case 'dsa': return '📊';
    }
  };

  const getOptionStyle = (index: number) => {
    if (!showResult) {
      return 'bg-muted hover:bg-muted/80 border-border hover:border-christmas-gold/50';
    }
    if (index === question.correctAnswer) {
      return 'bg-christmas-green/30 border-christmas-green text-christmas-snow';
    }
    if (index === selectedAnswer && index !== question.correctAnswer) {
      return 'bg-christmas-red/30 border-christmas-red text-christmas-snow';
    }
    return 'bg-muted/50 border-border opacity-50';
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress and badges */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-muted-foreground">
          Question {questionNumber} of {totalQuestions}
        </span>
        <div className="flex gap-2">
          <span className={`px-3 py-1 rounded-full text-sm border ${getDifficultyColor()}`}>
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-muted border border-border">
            {getCategoryIcon()} {question.category.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Question */}
      <div className="christmas-card mb-6">
        <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-4">
          {question.question}
        </h2>
        
        {question.code && (
          <pre className="bg-christmas-night p-4 rounded-lg overflow-x-auto text-sm md:text-base font-mono text-christmas-snow border border-border">
            <code>{question.code}</code>
          </pre>
        )}
      </div>

      {/* Options */}
      <div className="grid gap-3">
        {question.options.map((option, index) => (
          <Button
            key={index}
            variant="outline"
            className={`w-full p-4 h-auto text-left justify-start text-base md:text-lg transition-all duration-300 ${getOptionStyle(index)}`}
            onClick={() => handleAnswer(index)}
            disabled={showResult}
          >
            <span className="w-8 h-8 rounded-full bg-muted flex items-center justify-center mr-3 text-sm font-bold">
              {String.fromCharCode(65 + index)}
            </span>
            <span className="flex-1">{option}</span>
            {showResult && index === question.correctAnswer && (
              <span className="text-xl ml-2">✅</span>
            )}
            {showResult && index === selectedAnswer && index !== question.correctAnswer && (
              <span className="text-xl ml-2">❌</span>
            )}
          </Button>
        ))}
      </div>

      {/* Explanation */}
      {showResult && (
        <div className="mt-6 p-4 rounded-xl bg-muted/50 border border-border animate-fade-in">
          <p className="text-muted-foreground">
            <span className="font-semibold text-foreground">💡 Explanation: </span>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
