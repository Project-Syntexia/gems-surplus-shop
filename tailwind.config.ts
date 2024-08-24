import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { contrast, paper, primary, secondary } from "./src/styles/colors";

export default {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
      colors: {
        primary: primary,
        secondary: secondary,
        paper: paper,
        contrast: contrast,
      },
    },
  },
  plugins: [],
} satisfies Config;
