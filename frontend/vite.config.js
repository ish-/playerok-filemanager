import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import legacy from "@vitejs/plugin-legacy";
import { viteStaticCopy } from 'vite-plugin-static-copy';

// https://vitejs.dev/config/
export default defineConfig({
  publicDir: false,
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11'], // Adjust for your needs
    }),
    viteStaticCopy({
      targets: [
        {
          src: 'src/langs',  // Path to the source files
          dest: 'assets'  // Destination folder
        }
      ]
    })
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
