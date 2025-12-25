import { useEffect } from 'react';

interface TimerProps {
  time: number;
  setTime: (time: number | ((prev: number) => number)) => void;
  isRunning: boolean;
}

const Timer = ({ time, setTime, isRunning }: TimerProps) => {
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev: number) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, setTime]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full border border-border">
      <span className="text-xl">⏱️</span>
      <span className="text-xl font-mono font-bold text-foreground">
        {formatTime(time)}
      </span>
    </div>
  );
};

export default Timer;
