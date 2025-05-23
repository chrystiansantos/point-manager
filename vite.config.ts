import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const { VITE_PORT } = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      tailwindcss(),
      Unfonts({
        google: {
          families: [
            {
              name: "Inter",
              styles: "wght@400;500;700",
            },
          ],
        },
      }),
    ],
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest-setup.js"],
      globals: true,
      include: ["./src/components/**/*.spec.?(c|m)[jt]s?(x)"],
    },
    server: {
      port: Number(VITE_PORT),
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
