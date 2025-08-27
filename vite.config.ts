import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Ensure public directory is properly handled
  publicDir: 'public',
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production)
    sourcemap: mode === 'development',
    // Minify CSS
    cssMinify: true,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Ensure all assets are copied to dist
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          // Keep original file names for videos and other assets
          if (assetInfo.name) {
            return assetInfo.name;
          }
          return 'assets/[name]-[hash][extname]';
        },
      },
    },
    // Copy all assets from public directory
    copyPublicDir: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'react-router-dom',
      '@radix-ui/react-dialog',
      '@radix-ui/react-tabs',
    ],
  },
  // Asset handling - include video files
  assetsInclude: ['**/*.png', '**/*.jpg', '**/*.jpeg', '**/*.gif', '**/*.svg', '**/*.webp', '**/*.mp4', '**/*.mov', '**/*.avi', '**/*.webm'],
}));
