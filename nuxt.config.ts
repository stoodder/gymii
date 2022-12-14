// https://v3.nuxtjs.org/api/configuration/nuxt.config
import ENV from './environment'

export default defineNuxtConfig({
	modules: [
		'@pinia/nuxt',
		'nuxt-icon'
	],
	publicRuntimeConfig: {
	},
	privateRuntimeConfig: {
		NODE_ENV: ENV['NODE_ENV'],
		JWT_SECRET: ENV['JWT_SECRET'],
	},
	build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
});
