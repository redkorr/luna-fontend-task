import { isInRange as isTemeratureInRange } from '@/lib/isInRange';
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

  const isInRange = isTemeratureInRange(temp, targetTemperature, 0.5);

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

  return (
    <>
      <div
        className={cn(
          { 'text-green-500': isInRange, 'text-red-500': !isInRange },
          className
        )}
      >
        {temp}&deg;C
      </div>
    </>
  );
};

export default RealTimeTemperature;
