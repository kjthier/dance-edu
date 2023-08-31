import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // resolve: {
  //   alias: {
  //     // Aliases relative to the parent folder of vite.config.ts
  //     frontend: '/frontend',
  //     backend: '/backend',
  //     types: '/types',
  //   },
  // },
})
