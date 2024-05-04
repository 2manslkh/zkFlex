import adapter from "@sveltejs/adapter-auto";
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://kit.svelte.dev/docs/integrations#preprocessors
  // for more information about preprocessors
  preprocess: [vitePreprocess()],

  kit: {
    // adapter-auto only supports some environments, see https://kit.svelte.dev/docs/adapter-auto for a list.
    // If your environment is not supported or you settled on a specific environment, switch out the adapter.
    // See https://kit.svelte.dev/docs/adapters for more information about adapters.
    adapter: adapter(),
    alias: {
      "$components/*": "./src/components/*",
      "$stores/*": "./src/stores/*",
      "$stores": "./src/stores/index.ts",
      "$config": "./src/app.config.ts",
      "$configs": "./src/configs/*",
      "$const": "./src/constants/index.ts",
      "$libs/*": "./src/libs/*",
      "$types": "./src/types/index.ts",
      "$mocks": "./src/mocks/index.ts",
      "$abi": "./src/abi/index.ts",
      "$images/*": "./src/public/images/*",
      "$fonts/*": "./src/public/fonts/*",
    },
    prerender: {
      default: true, // Enable prerendering for all pages
      crawl: true, // Automatically discover and prerender linked routes
      entries: ['*'] // Specify entries to prerender; '*' means all routes
    }
  },
};

export default config;
