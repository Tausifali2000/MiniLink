import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
		proxy: {
			"/api": {
				target: "https://mern-app-btfqarbmg0bfceh8.southeastasia-01.azurewebsites.net",
				
			},

			
		},
	},
})
