import { resolve } from 'path'
import { defineConfig } from 'vite'
import topLevelAwait from "vite-plugin-top-level-await";

export default defineConfig({
    plugins: [
        topLevelAwait(),
    ],
    root: 'src',
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'src/index.html'),
            },
            output: {
                entryFileNames: 'main.js',
                assetFileNames: 'style.css',
                chunkFileNames: "chunk.js",
                manualChunks: {},
            }
        },
        cssCodeSplit: true,

    },
    optimizeDeps: {
        esbuildOptions: {
            target: "es2022",
        }
    },
    server: {
        host: '0.0.0.0',
    }
})