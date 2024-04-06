import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
} from 'unocss'

import presetAnimations from 'unocss-preset-animations'
import { presetShadcn } from 'unocss-preset-shadcn'
// import { presetShadcn } from './preset.shadcn.js'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      prefix: 'i-',
      extraProperties: {
        display: 'inline-block',
      },
    }),
    presetTypography(),
    presetAnimations(),
    presetShadcn(),
  ],
  // shortcuts: [
  //   {
  //     'flex-center': 'flex justify-center items-center',
  //     'flex-col-center': 'flex flex-col justify-center items-center',
  //     'card': 'bg-background rounded-2 shadow-md ',
  //   },
  // ],
  preflights: [
    {
      getCSS: () => `
        :root {
          --background: 0 0% 100%;
          --foreground: 20 14.3% 4.1%;

          --card: 0 0% 100%;
          --card-foreground: 20 14.3% 4.1%;

          --popover: 0 0% 100%;
          --popover-foreground: 20 14.3% 4.1%;

          --primary: 24 9.8% 10%;
          --primary-foreground: 60 9.1% 97.8%;

          --secondary: 60 4.8% 95.9%;
          --secondary-foreground: 24 9.8% 10%;

          --muted: 60 4.8% 95.9%;
          --muted-foreground: 25 5.3% 44.7%;

          --accent: 60 4.8% 95.9%;
          --accent-foreground: 24 9.8% 10%;

          --destructive: 0 84.2% 60.2%;
          --destructive-foreground: 60 9.1% 97.8%;

          --border:20 5.9% 90%;
          --input:20 5.9% 90%;
          --ring:20 14.3% 4.1%;
          --radius: 0.25rem;

          --highlight-default: #fff;
          --highlight-purple: #f6f3f8;
          --highlight-red: #fdebeb;
          --highlight-yellow: #fbf4a2;
          --highlight-blue: #c1ecf9;
          --highlight-green: #acf79f;
          --highlight-orange: #faebdd;
          --highlight-pink: #faf1f5;
          --highlight-gray: #f1f1ef;
        }

        .dark {
          --background:20 14.3% 4.1%;
          --foreground:60 9.1% 97.8%;

          --card:20 14.3% 4.1%;
          --card-foreground:60 9.1% 97.8%;

          --popover:20 14.3% 4.1%;
          --popover-foreground:60 9.1% 97.8%;

          --primary:60 9.1% 97.8%;
          --primary-foreground:24 9.8% 10%;

          --secondary:12 6.5% 15.1%;
          --secondary-foreground:60 9.1% 97.8%;

          --muted:12 6.5% 15.1%;
          --muted-foreground:24 5.4% 63.9%;

          --accent:12 6.5% 15.1%;
          --accent-foreground:60 9.1% 97.8%;

          --destructive:0 62.8% 30.6%;
          --destructive-foreground:60 9.1% 97.8%;

          --border:12 6.5% 15.1%;
          --input:12 6.5% 15.1%;
          --ring:24 5.7% 82.9%;

          --highlight-default: #000000;
          --highlight-purple: #3f2c4b;
          --highlight-red: #5c1a1a;
          --highlight-yellow: #5c4b1a;
          --highlight-blue: #1a3d5c;
          --highlight-green: #1a5c20;
          --highlight-orange: #5c3a1a;
          --highlight-pink: #5c1a3a;
          --highlight-gray: #3a3a3a;
        }
      `,
    },
  ],
  theme: {
    breakpoints: {
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1208px',
    },
    container: {
      padding: '1rem',
    },
    colors: {
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))',
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))',
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))',
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))',
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))',
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))',
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))',
      },
    },
    borderRadius: {
      lg: `var(--radius)`,
      md: `calc(var(--radius) - 2px)`,
      sm: 'calc(var(--radius) - 4px)',
    },
  },
  transformers: [
    transformerDirectives(),
  ],
  content: {
    pipeline: {
      include: [
        // the default
        /\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/,
        // include js/ts files
        'src/**/*.{js,ts}',
      ],
    },
  },
})
