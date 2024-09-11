import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import {
  black,
  contrast,
  paper,
  primary,
  secondary,
} from "./src/styles/colors";

export default {
  content: ["./src/**/*.tsx", "./src/**/colors.ts"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        black: black,
        contrast: contrast,
        paper: paper,
        primary: primary,
        secondary: secondary,
      },
    },
  },
  plugins: [],
} satisfies Config;
