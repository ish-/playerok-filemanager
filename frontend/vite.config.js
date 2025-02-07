import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Adjust for your needs
    }),
  ],
  build: {
    target: 'es2015',
    // lib: {
    //   entry: "./src/index.js",
    //   name: "ReactFileManager",
    //   fileName: (format) => `react-file-manager.${format}.js`,
    //   formats: ["es"],
    // },
    rollupOptions: {
      // external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
