import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import tailwindScrollbar from "tailwind-scrollbar"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), 
    [
      tailwindScrollbar,
    ]
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})