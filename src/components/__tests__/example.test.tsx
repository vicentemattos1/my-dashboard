import { render, screen } from '@testing-library/react';

// Example test component
const ExampleComponent = () => {
  return <div>Hello, Jest!</div>;
};

describe('Example Test Suite', () => {
  it('should demonstrate Jest is working', () => {
    // This is just a basic test to show Jest is set up correctly
    expect(1 + 1).toBe(2);
  });

  it('should render a component with React Testing Library', () => {
    render(<ExampleComponent />);
    expect(screen.getByText('Hello, Jest!')).toBeInTheDocument();
  });

  it('should have access to Jest mocks', () => {
    const mockFn = jest.fn();
    mockFn('test');
    expect(mockFn).toHaveBeenCalledWith('test');
  });
});

// Export for potential use in other tests
export { ExampleComponent };
