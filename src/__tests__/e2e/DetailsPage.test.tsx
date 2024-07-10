/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import DetailsPage from '@/pages/DetailsPage';

const mockUseApi = vi.fn();

const ResizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

vi.stubGlobal('ResizeObserver', ResizeObserverMock);

describe('DetailsPage component', () => {
  it('renders correctly when data is available', () => {
    const wrapper = render(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    );

    vi.mock('@/hooks/useApi', () => ({
      useApi: vi.fn(() => ({
        data: {
          id: '123',
          name: 'Test Module',
          targetTemperature: 25,
          available: true,
          description: 'Test module description',
        },
        isLoading: false,
        error: null,
        callApi: mockUseApi,
      })),
    }));

    const editBtn = wrapper.getByTestId('edit-btn');

    expect(wrapper.getByText('Test Module')).toBeTruthy();

    expect(wrapper.getByText('Target temperature')).toBeTruthy();

    expect(wrapper.getAllByText('25°C')[0]).toBeTruthy();

    expect(wrapper.getByText('Temperature now')).toBeTruthy();

    expect(wrapper.getByText('Test module description')).toBeTruthy();

    fireEvent.click(editBtn);

    setTimeout(() => {
      expect(wrapper.getByTestId('dialog')).toBeDefined();
    }, 200);

    wrapper.unmount();
  });
  it('renders unavailable flag in red and alert exist', () => {
    const wrapper = render(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    );

    vi.mock('@/hooks/useApi', () => ({
      useApi: vi.fn(() => ({
        data: {
          id: '123',
          name: 'Test Module',
          targetTemperature: 25,
          available: false,
          description: 'Test module description',
        },
        isLoading: false,
        error: null,
        callApi: mockUseApi,
      })),
    }));

    const editBtn = wrapper.getByTestId('edit-btn');

    expect(wrapper.getByTestId('rl-temp-details').classList).toContain(
      'text-red-500'
    );

    expect(wrapper.getByText('Heads up!')).toBeTruthy();

    expect(editBtn).toHaveProperty('disabled', true);

    fireEvent.click(editBtn);

    setTimeout(() => {
      expect(wrapper.getByTestId('dialog')).not.toBeDefined();
    }, 200);

    wrapper.unmount();
  });

  it('uses navigation go back button', () => {
    const wrapper = render(
      <BrowserRouter>
        <DetailsPage />
      </BrowserRouter>
    );

    vi.mock('@/hooks/useApi', () => ({
      useApi: vi.fn(() => ({
        data: {
          id: '123',
          name: 'Test Module',
          targetTemperature: 25,
          available: false,
          description: 'Test module description',
        },
        isLoading: false,
        error: null,
        callApi: mockUseApi,
      })),
    }));

    const backBtn = wrapper.getByTestId('back-btn');

    fireEvent.click(backBtn);

    setTimeout(() => {
      expect(backBtn).not.toBeDefined();
    }, 200);
  });
});
