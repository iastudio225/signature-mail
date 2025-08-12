import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig({
  plugins:[react()],
  base: '/signature-mail',
});
