import { useEffect, useState } from 'react';

interface SantaProps {
  mood: 'idle' | 'happy' | 'sad' | 'celebrating';
  showCoins?: boolean;
}

const Santa = ({ mood, showCoins = false }: SantaProps) => {
  const [coins, setCoins] = useState<number[]>([]);

  useEffect(() => {
    if (showCoins) {
      const newCoins = Array.from({ length: 5 }, (_, i) => i);
      setCoins(newCoins);
      const timer = setTimeout(() => setCoins([]), 1500);
      return () => clearTimeout(timer);
    }
  }, [showCoins]);

  const getMoodStyles = () => {
    switch (mood) {
      case 'happy':
        return 'animate-bounce-soft scale-110';
      case 'sad':
        return 'animate-shake scale-95';
      case 'celebrating':
        return 'animate-float scale-115';
      default:
        return 'animate-float';
    }
  };

  return (
    <div className="relative">
      {/* Coins animation */}
      {coins.map((coin, i) => (
        <div
          key={coin}
          className="absolute animate-coin-pop"
          style={{
            left: `${50 + (i - 2) * 30}%`,
            top: '-20px',
            animationDelay: `${i * 0.1}s`,
          }}
        >
          <span className="text-3xl">🪙</span>
        </div>
      ))}

      {/* Santa character */}
      <div className={`transition-all duration-300 ${getMoodStyles()}`}>
        <div className="relative">
          {/* Santa body */}
          <div className="text-8xl md:text-9xl select-none">🎅</div>

          {/* Speech bubble */}
          {mood === 'happy' && (
            <div className="absolute -top-8 -right-4 bg-christmas-snow text-christmas-night px-3 py-1 rounded-xl text-sm font-bold animate-bounce-soft">
              Ho Ho Ho! 🎁
            </div>
          )}
          {mood === 'sad' && (
            <div className="absolute -top-8 -right-4 bg-christmas-snow text-christmas-night px-3 py-1 rounded-xl text-sm font-bold">
              Oh no! 😅
            </div>
          )}
          {mood === 'celebrating' && (
            <div className="absolute -top-8 -right-4 bg-christmas-gold text-christmas-night px-3 py-1 rounded-xl text-sm font-bold animate-sparkle">
              Amazing! 🌟
            </div>
          )}
        </div>
      </div>

      {/* Gift decorations */}
      <div className="absolute -bottom-2 left-0 text-2xl animate-bounce-soft" style={{ animationDelay: '0.2s' }}>
        🎁
      </div>
      <div className="absolute -bottom-2 right-0 text-2xl animate-bounce-soft" style={{ animationDelay: '0.4s' }}>
        🎄
      </div>
    </div>
  );
};

export default Santa;
