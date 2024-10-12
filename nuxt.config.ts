// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  devtools: { enabled: true },

  app: {
    pageTransition: {
      name: 'fade', // Use 'fade' as the transition name or choose your own
      mode: 'out-in' // Ensure the new page fades in only after the old page fades out
    }
  },

  css: ['~/css/Transitions/Fade.css'],

  modules: [
    '@nuxtjs/google-fonts', "@nuxt/image", '@pinia/nuxt', '@pinia-plugin-persistedstate/nuxt', 'nuxt-vue3-google-signin'
  ],

  googleFonts: {
    families: {
      // Specify each family and the variations you want to load
      'Bebas+Neue': true, // Loads all styles if true
      'Manrope': [400, 700], // Loads only the specified weights
      'Source+Sans+Pro': [400, 700], // Loads only the specified weights
      'Montserrat': [400, 700], // Loads only the specified weights
      'Libre+Baskerville': true // Loads all styles if true
    },
    display: 'swap', // Ensures text remains visible during webfont load
    preconnect: true // Enables DNS-prefetching for Google Fonts domains
  },

  nitro: {
    awsAmplify: {
      imageSettings: {
        dangerouslyAllowSVG: true
      }
    }
  },

  image: {
    lazy: false
  },

  ignore: process.env.NODE_ENV === 'production' 
    ? [
        'pages/item/originalProductPage.vue',
        'pages/Test.vue',
        'pages/Products',
        'pages/Contact',      
      ] 
    : [],

    googleSignIn: {
      clientId: process.env.GOOGLE_CLIENT_ID,
    },

  runtimeConfig: {    
    // Public keys that are exposed to the client
    JWT_SECRET: process.env.JWT_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    DB_URI: process.env.DB_URI,
    GOOGLE_LOGIN_URI: process.env.GOOGLE_LOGIN_URI,
    GOOGLE_LOGIN_URI_TEST: process.env.GOOGLE_LOGIN_URI_TEST,
    NUXT_AWS_ACCESS_KEY: process.env.NUXT_AWS_ACCESS_KEY,
    NUXT_AWS_SECRET_KEY: process.env.NUXT_AWS_SECRET_KEY,
    NUXT_AWS_REGION: process.env.NUXT_AWS_REGION,
    NUXT_S3_BUCKET: process.env.NUXT_S3_BUCKET,
      
    public: {
      // DB_URI: process.env.DB_URI,
    }
  },

  compatibilityDate: '2024-08-19',
})