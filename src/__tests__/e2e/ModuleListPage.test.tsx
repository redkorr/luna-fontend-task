/**
 * @vitest-environment jsdom
 */

import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from '@testing-library/react';
import ModuleListPage from '@/pages/ModuleListPage';

const mockUseApi = vi.fn();

vi.mock('@/hooks/useApi', () => ({
  useApi: vi.fn(() => ({
    data: [
      {
        id: '123',
        name: 'Test Module 1',
        targetTemperature: 20,
        available: true,
        description: 'Test module description',
      },
      {
        id: '124',
        name: 'Test Module 2',
        targetTemperature: 15,
        available: false,
        description: 'Test module description 12',
      },
    ],
    isLoading: false,
    error: null,
    callApi: mockUseApi,
  })),
}));

describe('DetailsPage component', () => {
  it('renders correctly when data is available', () => {
    const wrapper = render(
      <BrowserRouter>
        <ModuleListPage />
      </BrowserRouter>
    );

    expect(wrapper.getAllByText('Test Module 1')).toBeTruthy();

    expect(wrapper.getAllByText('Test Module 2')).toBeTruthy();

    wrapper.unmount();
  });

  it('renders correctly when data is available', async () => {
    const wrapper = render(
      <BrowserRouter>
        <ModuleListPage />
      </BrowserRouter>
    );

    setTimeout(() => {
      const actionsBtn = wrapper.getAllByTestId('actions-btn');
      fireEvent.click(actionsBtn[0]);
    }, 200);

    setTimeout(() => {
      const detailsBtn = wrapper.getByText('View Details');

      expect(detailsBtn).toBeTruthy();
      setTimeout(() => {
        fireEvent.click(detailsBtn);
      }, 200);

      expect(wrapper.getByText('Go Back')).toBeTruthy();
    }, 200);

    wrapper.unmount();
  });
});
