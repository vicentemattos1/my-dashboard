import React, { PropsWithChildren } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { Provider } from 'react-redux';
import { AppStore, RootState, setupStore } from '../store';
import Home from '@/app/(private)/page';
import monthly from '@/data/monthly.json';

const mockUseGetAllDashboardDataQuery = jest.fn();

jest.mock('@/app/store/api/dashboardApi', () => ({
  __esModule: true,
  useGetAllDashboardDataQuery: () => mockUseGetAllDashboardDataQuery(),
}));

interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: Partial<RootState>;
  store?: AppStore;
}

export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  const Wrapper: React.FC<PropsWithChildren<{}>> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return {
    store,
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  };
}

describe('Home Page', () => {
  it('should show loading state', async () => {
    mockUseGetAllDashboardDataQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: jest.fn(),
    });
    const { findByTestId } = renderWithProviders(<Home />);
    const spinner = await findByTestId('dashboard-loading');
    expect(spinner).toBeInTheDocument();
  });
  it('should show value', async () => {
    mockUseGetAllDashboardDataQuery.mockReturnValue({
      data: {
        monthly,
        quarterly: monthly,
        yearly: monthly,
      },
      isLoading: false,
      error: undefined,
      refetch: jest.fn(),
    });
    const { findByTestId, findByText } = renderWithProviders(<Home />);
    const revenue = await findByTestId('revenue-value');
    expect(revenue).toBeInTheDocument();
    const revenue_value = await findByText('$2.0K');
    expect(revenue_value).toBeInTheDocument();
  });
});
