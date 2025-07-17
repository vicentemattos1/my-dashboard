# Jest Testing Setup

This project is configured with Jest and React Testing Library for comprehensive testing.

## Configuration Files

- **`jest.config.js`** - Main Jest configuration with Next.js integration
- **`jest.setup.js`** - Global test setup and mocks
- **`src/utils/test-utils.tsx`** - Custom testing utilities

## Available Scripts

```bash
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

## Test Structure

Tests should be placed in one of these locations:

- `src/components/__tests__/` - Component tests
- `src/utils/__tests__/` - Utility function tests (when needed)
- `__tests__/` - Integration and global tests
- `*.test.{js,jsx,ts,tsx}` - Inline test files
- `*.spec.{js,jsx,ts,tsx}` - Spec files

## Global Mocks Available

- **Next.js Router** - Both `next/router` and `next/navigation`
- **Next.js Image** - Renders as standard `<img>` tag
- **IntersectionObserver** - Mock implementation
- **ResizeObserver** - Mock implementation
- **matchMedia** - Mock implementation
- **CSS Modules** - Returns empty objects

## Example Test

```typescript
import { render, screen } from '../utils/test-utils'
import MyComponent from './MyComponent'

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />)
    expect(screen.getByText('Hello World')).toBeInTheDocument()
  })
})
```

## Custom Utilities

The `test-utils.tsx` file provides:

- Custom render function with providers
- Mock component creator
- Common assertion helpers
- Mock event handlers

## Coverage Reports

Coverage reports are generated in the `coverage/` directory and include:

- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

Files are automatically ignored from coverage if they match:

- `*.d.ts` - TypeScript declarations
- `*.stories.*` - Storybook stories
- `*.config.*` - Configuration files
