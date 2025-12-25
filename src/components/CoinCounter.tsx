interface CoinCounterProps {
  coins: number;
  animate?: boolean;
}

const CoinCounter = ({ coins, animate = false }: CoinCounterProps) => {
  return (
    <div 
      className={`flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-christmas-gold/30 ${
        animate ? 'animate-coin-pop' : ''
      }`}
      style={{
        boxShadow: '0 0 20px hsl(var(--christmas-gold) / 0.3)',
      }}
    >
      <span className="text-2xl">🪙</span>
      <span className="text-xl font-bold gold-text">{coins}</span>
    </div>
  );
};

export default CoinCounter;
