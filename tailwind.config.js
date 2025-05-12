/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': 'var(--primary)',
        'secondary': 'var(--secondary)',
        'accent': 'var(--accent)',
        'highlight': 'var(--highlight)',
        'danger': 'var(--danger)',
        // Shades of primary
        'primary-light': 'var(--primary-light)',
        'primary-dark': 'var(--primary-dark)',
        // Shades of secondary
        'secondary-light': 'var(--secondary-light)',
        'secondary-dark': 'var(--secondary-dark)',
        // Shades of accent
        'accent-light': 'var(--accent-light)',
        'accent-dark': 'var(--accent-dark)',
        // Shades of highlight
        'highlight-light': 'var(--highlight-light)',
        'highlight-dark': 'var(--highlight-dark)',
        // Shades of danger
        'danger-light': 'var(--danger-light)',
        'danger-dark': 'var(--danger-dark)',
        // System
        'background': 'var(--background)',
        'foreground': 'var(--foreground)',
        'border': 'var(--border)',
        'input': 'var(--input)',
        'ring': 'var(--ring)',
        'muted': 'var(--muted)',
        'muted-foreground': 'var(--muted-foreground)',
        'card': 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        'popover': 'var(--popover)',
        'popover-foreground': 'var(--popover-foreground)',
        'destructive': 'var(--destructive)',
        'destructive-foreground': 'var(--destructive-foreground)',
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 