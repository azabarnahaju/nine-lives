import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        watch: {
            usePolling: true,
        },
        proxy: {
            '/api/v1/cats': 'http://localhost:4000',
            '/api/v1/users': 'http://localhost:4000',
            '/api/v1/diseases': 'http://localhost:4000',
        },
    },
})
