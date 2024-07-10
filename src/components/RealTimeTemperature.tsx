import { isInRange as isTemeratureInRange } from '@/lib/isInRange';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface RealTimeTemperatureProps {
  targetTemperature: number;
  className?: string;
  id: string;
}

const RealTimeTemperature = ({
  targetTemperature,
  className,
  id,
}: RealTimeTemperatureProps) => {
  const [temp, setTemp] = useState<number>(targetTemperature);

  const isInRange = isTemeratureInRange(temp, targetTemperature, 0.5);

  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.connect();

    socket.on('moduleUpdate', (data) => {
      const foundModule = data.find(
        (s: { id: string; temperature: number }) => s.id === id
      );
      if (foundModule) {
        setTemp(foundModule.temperature);
      } else {
        console.error(`No module found with id ${id}`);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, [id]);

  return (
    <div
      data-testid='rl-temp'
      className={cn(
        { 'text-green-500': isInRange, 'text-red-500': !isInRange },
        className
      )}
    >
      {temp}&deg;C
    </div>
  );
};

export default RealTimeTemperature;
