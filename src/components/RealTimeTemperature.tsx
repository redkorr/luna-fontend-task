import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

interface RealTimeTemperatureProps {
  targetTemperature: number;
  className?: string;
}

const RealTimeTemperature = ({
  targetTemperature,
  className,
}: RealTimeTemperatureProps) => {
  const [temp, setTemp] = useState<number>(0);
  useEffect(() => {
    const socket = io('http://localhost:3001');
    socket.connect();

    socket.on('moduleUpdate', (socket) => {
      setTemp(socket[0].temperature);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const isInRange = Math.abs(temp - targetTemperature) <= 0.5;

  return (
    <>
      <span
        className={cn(
          { 'text-green-500': isInRange, 'text-red-500': !isInRange },
          className
        )}
      >
        {temp}&deg;C
      </span>
    </>
  );
};

export default RealTimeTemperature;
