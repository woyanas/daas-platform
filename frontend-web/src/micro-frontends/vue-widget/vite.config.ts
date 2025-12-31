import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        lib: {
            entry: './src/main.ts',
            name: 'VueTestimonials',
            fileName: 'vue-testimonials',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            external: ['vue'],
            output: {
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production')
    }
})
