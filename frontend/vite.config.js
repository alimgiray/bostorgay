import vue from "@vitejs/plugin-vue";

import { loadEnv } from "vite";
import { minifyHtml, injectHtml } from "vite-plugin-html";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  return {
    plugins: [
      vue(),
      minifyHtml(),
      injectHtml({
        injectData: {
          title: env.VITE_APP_NAME,
        },
      }),
    ],
  };
};
