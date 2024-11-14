import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: "build",
        rollupOptions: {
            output: {
                entryFileNames: "assets/[name].js",
                chunkFileNames: "assets/[name].js",
                assetFileNames: "assets/[name].[ext]"
            },
        },
    }
});
//# sourceMappingURL=vite.config.js.map