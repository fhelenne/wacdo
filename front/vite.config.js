import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  host: true,
  base: '/formation/front',
  strictPort: false,
  cors: true,
  origin: undefined,
})
