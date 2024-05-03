import daisyuiPlugin from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-theme="dark"]'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      animation: {
        'infinite-scroll': 'infinite-scroll 30s linear infinite',
      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
      },
      boxShadow: {
        '2xl': '-4px -4px 10px 0px rgba(0, 0, 0, 0.10), 4px 4px 10px 0px rgba(0, 0, 0, 0.10)',
        'neon-pink': '0 0 .1rem 1px var(--neon-pink), 0 0 .2rem 1px var(--neon-pink),0 0 0 1px var(--neon-pink)', // Customize this with your desired color
        'neon-white': 'var(--neon-white)', // Customize this with your desired color
      },
      borderColor: {
        'neon-pink': 'var(--border-neon-pink)',
        'neon-white': 'var(--border-neon-white)',
      },
      colors: {
      },
    },
  },
  plugins: [daisyuiPlugin],
  // https://daisyui.com/docs/config/
  daisyui: {
    darkTheme: 'dark', // name of one of the included themes for dark mode
    base: true, // applies background color and foreground color for root element by default
    styled: true, // include daisyUI colors and design decisions for all components
    utils: true, // adds responsive and modifier utility classes
    rtl: false, // rotate style direction from left-to-right to right-to-left. You also need to add dir="rtl" to your html tag and install `tailwindcss-flip` plugin for Tailwind CSS.
    prefix: '', // prefix for daisyUI classnames (components, modifiers and responsive class names. Not colors)
    logs: false, // Shows info about daisyUI version and used config in the console when building your CSS
    themes: [{
      'light': {
        'primary': '#570df8',
        'primary-focus': '#4506cb',
        'primary-content': '#ffffff',

        'secondary': '#f000b8',
        'secondary-focus': '#bd0091',
        'secondary-content': '#ffffff',

        'accent': '#37cdbe',
        'accent-focus': '#2ba69a',
        'accent-content': '#ffffff',

        'neutral': '#3b424e',
        'neutral-focus': '#2a2e37',
        'neutral-content': '#ffffff',

        'base-100': '#ffffff',
        'base-200': '#f9fafb',
        'base-300': '#ced3d9',
        'base-content': '#1e2734',

        'info': '#1c92f2',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',

        '--rounded-box': '1rem',
        '--rounded-btn': '.5rem',
        '--rounded-badge': '1.9rem',

        '--animation-btn': '.25s',
        '--animation-input': '.2s',

        '--btn-text-case': 'uppercase',
        '--navbar-padding': '.5rem',
        '--border-btn': '1px',
      },
      'dark': {
        'primary': '#ffb3d9',
        'primary-focus': '#ff80bf',
        'primary-content': '#1b1c22',

        'secondary': '#b9ffb3',
        'secondary-focus': '#8aff80',
        'secondary-content': '#1b1c22',

        'accent': '#ffffb3',
        'accent-focus': '#ffff80',
        'accent-content': '#1b1c22',

        'neutral': '#22212c',
        'neutral-focus': '#1b1c22',
        'neutral-content': '#d5ccff',

        'base-100': '#302f3d',
        'base-200': '#22212c',
        'base-300': '#1b1c22',
        'base-content': '#d5ccff',

        'info': '#1c92f2',
        'success': '#009485',
        'warning': '#ff9900',
        'error': '#ff5724',

        '--rounded-box': '1rem',
        '--rounded-btn': '.5rem',
        '--rounded-badge': '1.9rem',

        '--animation-btn': '.25s',
        '--animation-input': '.2s',

        '--btn-text-case': 'uppercase',
        '--navbar-padding': '.5rem',
        '--border-btn': '1px',
      },
    }
    ],
  },
};
