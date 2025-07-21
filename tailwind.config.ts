import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Base system colors from CSS variables
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        gray: {
          900: 'var(--gray-900)',
        },
        yellow: {
          400: 'var(--yellow-400)',
        },
        blue: {
          400: 'var(--blue-400)',
        },
        // Chart colors
        chart: {
          1: 'var(--chart-1)',
          2: 'var(--chart-2)',
          3: 'var(--chart-3)',
          4: 'var(--chart-4)',
          5: 'var(--chart-5)',
        },

        // Sidebar colors
        sidebar: {
          DEFAULT: 'var(--sidebar)',
          foreground: 'var(--sidebar-foreground)',
          primary: 'var(--sidebar-primary)',
          'primary-foreground': 'var(--sidebar-primary-foreground)',
          accent: 'var(--sidebar-accent)',
          'accent-foreground': 'var(--sidebar-accent-foreground)',
          border: 'var(--sidebar-border)',
          ring: 'var(--sidebar-ring)',
        },

        // Custom brand colors used throughout the app
        brand: {
          // Warm colors (oranges/ambers) - for neutral/stable indicators
          warm: {
            DEFAULT: 'oklch(0.769 0.188 70.08)', // chart-5 color
            foreground: 'oklch(0.985 0 0)',
            50: 'oklch(0.97 0.05 70.08)',
            100: 'oklch(0.95 0.08 70.08)',
            200: 'oklch(0.90 0.12 70.08)',
            300: 'oklch(0.85 0.15 70.08)',
            400: 'oklch(0.80 0.18 70.08)',
            500: 'oklch(0.769 0.188 70.08)',
            600: 'oklch(0.70 0.19 70.08)',
            700: 'oklch(0.60 0.18 70.08)',
            800: 'oklch(0.50 0.16 70.08)',
            900: 'oklch(0.40 0.14 70.08)',
          },

          // Cool colors (blues/greens) - for positive indicators
          cool: {
            DEFAULT: 'oklch(0.6 0.118 184.704)', // chart-2 color
            foreground: 'oklch(0.985 0 0)',
            50: 'oklch(0.97 0.03 184.704)',
            100: 'oklch(0.94 0.05 184.704)',
            200: 'oklch(0.88 0.08 184.704)',
            300: 'oklch(0.80 0.10 184.704)',
            400: 'oklch(0.70 0.12 184.704)',
            500: 'oklch(0.6 0.118 184.704)',
            600: 'oklch(0.55 0.12 184.704)',
            700: 'oklch(0.45 0.11 184.704)',
            800: 'oklch(0.35 0.09 184.704)',
            900: 'oklch(0.25 0.07 184.704)',
          },

          // Light colors - for subtle backgrounds
          light: {
            DEFAULT: 'oklch(0.97 0 0)', // muted/secondary color
            foreground: 'oklch(0.205 0 0)',
            50: 'oklch(0.985 0 0)',
            100: 'oklch(0.97 0 0)',
            200: 'oklch(0.95 0 0)',
            300: 'oklch(0.92 0 0)',
            400: 'oklch(0.88 0 0)',
            500: 'oklch(0.85 0 0)',
          },

          // Neutral colors - for text and borders
          neutral: {
            DEFAULT: 'oklch(0.556 0 0)', // muted-foreground
            foreground: 'oklch(0.985 0 0)',
            50: 'oklch(0.985 0 0)',
            100: 'oklch(0.97 0 0)',
            200: 'oklch(0.922 0 0)',
            300: 'oklch(0.85 0 0)',
            400: 'oklch(0.708 0 0)',
            500: 'oklch(0.556 0 0)',
            600: 'oklch(0.45 0 0)',
            700: 'oklch(0.35 0 0)',
            800: 'oklch(0.25 0 0)',
            900: 'oklch(0.145 0 0)',
          },
        },
      },

      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        xl: 'calc(var(--radius) + 4px)',
      },

      fontFamily: {
        roboto: ['var(--font-roboto)', 'Arial', 'Helvetica', 'sans-serif'],
      },

      boxShadow: {
        xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
