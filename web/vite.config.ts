import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const port = parseInt(env.WEB_PORT, 10);

  return {
    plugins: [tailwindcss(), react()],
    server: {
      port: isNaN(port) ? 5173 : port,
      host: true,
      watch: {
        usePolling: true,
      },
    },
  };
});
