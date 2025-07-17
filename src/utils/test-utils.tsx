import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import '@testing-library/jest-dom';

// Mock providers wrapper for testing
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <div data-testid="test-wrapper">
      {/* Add your providers here when needed (Redux, Theme, etc.) */}
      {children}
    </div>
  );
};

// Custom render function that includes providers
const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options });

// Re-export everything from testing library
export * from '@testing-library/react';

// Override render export
export { customRender as render };

// Common test utilities
export const createMockComponent = (name: string) => {
  const MockComponent = (props: any) => (
    <div data-testid={`mock-${name.toLowerCase()}`} {...props}>
      Mock {name}
    </div>
  );
  MockComponent.displayName = `Mock${name}`;
  return MockComponent;
};

// Mock event handlers
export const createMockHandler = () => jest.fn();

// Wait utilities
export const waitForTimeout = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// Common test patterns - use these as examples
export const testHelpers = {
  expectElementToBeVisible: (element: HTMLElement) => {
    expect(element).toBeInTheDocument();
    expect(element).toBeVisible();
  },

  expectElementToHaveText: (element: HTMLElement, text: string) => {
    expect(element).toBeInTheDocument();
    expect(element).toHaveTextContent(text);
  },
};
