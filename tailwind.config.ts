import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#000000',
            a: {
              color: '#3182ce',
              '&:hover': {
                color: '#2c5282',
              },
            },
            p: {
              marginTop: '1.25em',
              marginBottom: '1.25em',
              color: '#000000',
            },
            img: {
              marginTop: '2em',
              marginBottom: '2em',
            },
            'h1, h2, h3, h4': {
              marginTop: '1.5em',
              marginBottom: '0.75em',
              fontWeight: '700',
              color: '#000000',
            },
            li: {
              color: '#000000',
            },
            code: {
              color: '#666666',
              backgroundColor: '#f5f5f5',
              padding: '0.2em 0.4em',
              borderRadius: '0.25rem',
              fontSize: '0.875em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderRadius: '0',
              padding: '0',
              color: '#666666',
              fontSize: '0.875em',
            },
            pre: {
              backgroundColor: '#f5f5f5',
              color: '#666666',
              padding: '1rem',
              borderRadius: '0.5rem',
              overflow: 'auto',
            },
            strong: {
              color: '#000000',
            },
            em: {
              color: '#000000',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config; 