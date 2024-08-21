import type { Config } from "tailwindcss";
import flowbite from "flowbite-react/tailwind";

export default {
  content: [
    "./{pages,layouts,components,src}/**/*.{html,js,jsx,ts,tsx,vue}",
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  darkMode: "media",
  plugins: [require("@tailwindcss/typography"), flowbite.plugin()],
} satisfies Config;
