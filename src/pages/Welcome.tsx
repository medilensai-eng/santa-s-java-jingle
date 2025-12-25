import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Snowfall from '@/components/Snowfall';
import Santa from '@/components/Santa';

const Welcome = () => {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleStart = () => {
    if (name.trim()) {
      sessionStorage.setItem('playerName', name.trim());
      navigate('/quiz');
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center p-4">
      <Snowfall />
      
      {/* Christmas lights decoration */}
      <div className="absolute top-0 left-0 right-0 flex justify-center gap-4 py-4">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="w-3 h-3 rounded-full animate-twinkle"
            style={{
              backgroundColor: i % 3 === 0 ? 'hsl(var(--christmas-red))' : i % 3 === 1 ? 'hsl(var(--christmas-green))' : 'hsl(var(--christmas-gold))',
              animationDelay: `${i * 0.3}s`,
              boxShadow: `0 0 10px currentColor`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* Santa */}
        <div className="mb-8">
          <Santa mood="idle" />
        </div>

        {/* Title */}
        <h1 className="font-christmas text-5xl md:text-7xl font-bold mb-4 gold-text glow-text">
          🎄 Java Quiz 🎄
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-2">
          Christmas Edition
        </p>
        <p className="text-lg text-muted-foreground mb-8">
          Test your Java, OOPs & DSA knowledge and earn rewards from Santa! 🎁
        </p>

        {/* Name input and start */}
        <div className="christmas-card max-w-md mx-auto">
          <label className="block text-lg font-semibold mb-3 text-foreground">
            Enter your name to begin:
          </label>
          <Input
            type="text"
            placeholder="Your name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            className="mb-4 text-lg py-6 bg-muted border-border text-foreground placeholder:text-muted-foreground focus:border-christmas-gold"
            maxLength={20}
          />
          <Button
            onClick={handleStart}
            disabled={!name.trim()}
            className="christmas-button w-full text-xl py-6 text-primary-foreground disabled:opacity-50"
          >
            🎅 Start Quiz
          </Button>
        </div>

        {/* Leaderboard link */}
        <button
          onClick={() => navigate('/leaderboard')}
          className="mt-6 text-muted-foreground hover:text-christmas-gold transition-colors underline underline-offset-4"
        >
          🏆 View Leaderboard
        </button>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-12">
          <div className="text-center">
            <div className="text-3xl mb-2">☕</div>
            <p className="text-sm text-muted-foreground">Java Basics</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">🎯</div>
            <p className="text-sm text-muted-foreground">OOPs Concepts</p>
          </div>
          <div className="text-center">
            <div className="text-3xl mb-2">📊</div>
            <p className="text-sm text-muted-foreground">DSA Questions</p>
          </div>
        </div>
      </div>

      {/* Decorative gifts */}
      <div className="absolute bottom-4 left-4 text-4xl animate-bounce-soft">🎁</div>
      <div className="absolute bottom-4 right-4 text-4xl animate-bounce-soft" style={{ animationDelay: '0.5s' }}>🎄</div>
    </div>
  );
};

export default Welcome;
