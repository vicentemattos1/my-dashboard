# My Financial Dashboard

A comprehensive financial analytics dashboard built with Next.js, providing real-time insights into business performance through interactive charts, KPIs, and financial reporting.

## 🚀 Overview

This modern financial dashboard application offers a complete view of business financial health with multi-period analysis capabilities. Built with a focus on performance, usability, and comprehensive data visualization, it serves as a central hub for financial decision-making.

## ✨ Features

### 📊 Main Dashboard

- **Multi-Period Analytics**: View financial data across monthly, quarterly, and yearly periods
- **Interactive Charts**: Revenue & expense trends with responsive bar charts
- **Expense Breakdown**: Pie charts showing expense category distribution
- **Real-time KPIs**: Track revenue, expenses, gross profit, and net income
- **Period Comparisons**: Month-over-month, quarter-over-quarter, and year-over-year analysis
- **Data Refresh**: Manual data refresh with toast notifications

### 💰 Financial Components

- **Financial KPIs**: Comprehensive key performance indicators with trend analysis
- **Cash Flow Analysis**: Investment and operations cash flow tracking
- **Profitability Analysis**: Detailed profit margins and financial health status
- **Growth Metrics**: Performance tracking with visual trend indicators
- **Analysis Tables**: Detailed financial breakdowns with percentages

### 📱 User Experience

- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Sidebar Navigation**: Collapsible sidebar with navigation between dashboard and reports
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Loading States**: Skeleton loaders for smooth user experience
- **Toast Notifications**: Real-time feedback for user actions

### 📈 Reports Section

- **Detailed Financial Reports**: Comprehensive business financial analysis
- **Multiple Report Types**: Various visualization formats including charts and tables
- **Export Capabilities**: Data analysis and reporting features

## 🛠️ Tech Stack

### Frontend

- **Next.js 15.4.1** - React framework with App Router
- **React 19.1.0** - UI library
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 4.1.11** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library

### State Management & Data

- **Redux Toolkit** - Predictable state management
- **RTK Query** - Efficient data fetching and caching
- **React Redux** - React bindings for Redux

### Charts & Visualization

- **Recharts** - Composable charting library for React
- **Lucide React** - Beautiful icon library

### Development & Quality

- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **Jest** - Testing framework
- **Testing Library** - React component testing
- **Husky** - Git hooks for code quality
- **lint-staged** - Run linters on staged files

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd my-dashboard
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

### Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint and fix issues
- `npm run lint:check` - Check for linting issues without fixing
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes for dashboard and reports
│   ├── providers/         # Redux provider setup
│   ├── store/             # Redux store configuration
│   └── reports/           # Reports page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── [dashboard-components] # Custom dashboard components
├── data/                  # JSON data files
├── hooks/                 # Custom React hooks
├── lib/                   # Utility libraries
└── utils/                 # Helper functions and utilities
```

## 🔧 API Endpoints

The application includes several API endpoints for data management:

- `GET /api/dashboard/monthly` - Monthly financial data
- `GET /api/dashboard/quarterly` - Quarterly financial data
- `GET /api/dashboard/yearly` - Yearly financial data
- `GET /api/dashboard/all` - All periods data
- `GET /api/reports` - Financial reports data

## 📊 Data Structure

The dashboard works with comprehensive financial data including:

- Revenue and expense tracking
- Cash flow analysis
- KPI metrics with period comparisons
- Expense categorization
- Profit/loss statements

## 🎨 Customization

The application uses a modern design system with:

- **Custom color palette** - Brand colors for consistent theming
- **Responsive breakpoints** - Mobile-first design approach
- **Component variants** - Flexible UI components
- **Typography scale** - Consistent text styling

## 🧪 Testing

The project includes comprehensive testing setup:

- **Unit tests** with Jest and Testing Library
- **Component testing** for React components
- **Test utilities** for consistent testing patterns
- **Coverage reporting** for code quality metrics

## 📱 Responsive Design

The dashboard is fully responsive with:

- **Mobile-optimized layouts** - Collapsible sidebar and adapted grids
- **Tablet support** - Optimized for medium screen sizes
- **Desktop experience** - Full-featured layout with sidebar navigation

## 🔄 Data Flow

1. **Data Storage**: Financial data stored in JSON files
2. **API Layer**: Next.js API routes serve data
3. **State Management**: RTK Query handles data fetching and caching
4. **Component Layer**: React components consume and display data
5. **User Interaction**: Real-time updates and refresh capabilities

## 🌟 To Improve

### Authentication

- **User Authentication System**: Implement secure login/logout functionality
- **Role-based Access Control**: Different permission levels for users (admin, viewer, analyst)
- **Session Management**: Secure session handling and token management
- **Multi-tenant Support**: Support for multiple organizations/clients
- **OAuth Integration**: Social login options (Google, Microsoft, etc.)

### Query Filters

- **Date Range Filtering**: Custom date range selection for financial data
- **Category Filters**: Filter expenses and revenue by specific categories
- **Advanced Search**: Search functionality across financial records
- **Export Filters**: Filtered data export capabilities
- **Saved Filter Presets**: Save and reuse common filter combinations
- **Real-time Filter Updates**: Dynamic data updates based on filter changes
