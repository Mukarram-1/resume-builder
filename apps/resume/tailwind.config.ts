import baseConfig from "@resume/ui/tailwind.config";
import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",  // Covers all app directory files
    "../../packages/ui/src/**/*.{ts,tsx}",
    "../../packages/ui/hooks/**/*.{ts,tsx}",
    "../../packages/ui/lib/**/*.{ts,tsx}"
  ],
  presets: [baseConfig],
  theme: {
    container: {
      center: true,
    },
    extend: {
    colors: {
      resume: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)'
      }
    },
    fontFamily: {
        calibri: ["Calibri", "sans-serif"],
        cambria: ["Cambria", "serif"],
        georgia: ["Georgia", "serif"],
        helvetica: ["Helvetica", "Arial", "sans-serif"],
        arial: ["Arial", "sans-serif"],
        "times-new-roman": ["Times New Roman", "serif"],
        garamond: ["Garamond", "serif"],
        palatino: ["Palatino", "serif"],
        tahoma: ["Tahoma", "sans-serif"],
        verdana: ["Verdana", "sans-serif"],
      },
  }
  },
} satisfies Config;