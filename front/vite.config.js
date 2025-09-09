import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig(({mode}) => {
    return {
        plugins: [react()],
        // host: true,
        base: mode === 'production' ? '/formation/front':'',
        strictPort: false,
        cors: true,
        test: {
            env: {
                VITE_WACDO_BACK_URL: 'http://proxy',
                VITE_WACDO_BACK_API_URL: "http://proxy/api",
            },
            server: {
                base: '',
            },
            environment: 'jsdom',
            host: true,
            globals: true,
        },
    }
})
