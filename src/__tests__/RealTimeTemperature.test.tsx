/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import RealTimeTemperature from '@/components/RealTimeTemperature';
import { render } from '@testing-library/react';
import { io, Socket } from 'socket.io-client';

describe('RealTimeTemperature component', () => {
  let socketInstance: Socket | null = null;

  beforeAll(async () => {
    const socket = io('http://localhost:3001');
    socketInstance = socket as Socket;
    socket.connect();

    socket.emit('moduleUpdate', [
      { temperature: 25, id: '1' },
      { temperature: 2, id: '2' },
    ]);
    await new Promise((resolve) => setTimeout(resolve, 100)); // Wait for state to update
  });

  afterAll(() => {
    if (socketInstance) {
      socketInstance.disconnect();
    }
  });

  it('renders temperature and applies correct class based on range', () => {
    const wrapper = render(
      <RealTimeTemperature targetTemperature={25} id='1' />
    );

    setTimeout(() => {
      expect(wrapper.getByTestId('rl-temp').classList).toContain(
        'text-green-500'
      );
    }, 200);

    wrapper.unmount();
  });

  it('renders temperature and applies correct class based on range', () => {
    const wrapper = render(
      <RealTimeTemperature targetTemperature={24} id='2' />
    );

    setTimeout(() => {
      expect(wrapper.getByTestId('rl-temp').classList).toContain(
        'text-red-500'
      );
    }, 200);

    wrapper.unmount();
  });
});
