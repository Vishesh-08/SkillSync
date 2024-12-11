import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',  // This allows connections from other devices on the network
    port: 5173,        // You can change this if needed, but 3000 is a common default
    strictPort: true,  // If port 3000 is in use, it will fail instead of finding an open one
  }
});
