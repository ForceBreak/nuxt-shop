module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'nuxt-shop',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Test online store by DNEPR-FAN' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
 css: [
    { src: '~assets/styles/main.scss', lang: 'scss' },
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },

  router: {
    middleware: ['protectAdminPages']
  },

  plugins: ["~/plugins/mixins/mixins.js", 
    { src: '~/plugins/vueditor.js', ssr: false }
  ],

  modules: ['@nuxtjs/firebase', '@nuxtjs/pwa', 'nuxt-moment',
    [
      'nuxt-i18n',
      {
        locales: [
          {
            code: 'ru',
            file: 'ru-RU.js'
          },
          {
            code: 'us',
            file: 'us-US.js'
          },
        ],
        defaultLocale: 'ru',
        detectBrowserLanguage: false,
        lazy: true,
        langDir: 'lang/'
      }
    ],
    ['nuxt-env', {
      keys: [
        { key: 'ADMIN_EMAIL', default: 'gbuecjd18@gmail.com', secret: false },
      ]
    }]
  ],
  
  buildModules: [
    '@nuxtjs/vuetify'
  ],

  firebase: {
    config: {
      production: {
        apiKey: "AIzaSyA4Wi5BcCh3pmrwbDOdDP80wz-KglgnOzw",
        authDomain: "nuxt-shop-93181.firebaseapp.com",
        databaseURL: "https://nuxt-shop-93181.firebaseio.com",
        projectId: "nuxt-shop-93181",
        storageBucket: "nuxt-shop-93181.appspot.com",
        messagingSenderId: "77297445051",
        appId: "1:77297445051:web:65e16a6dcbe955f3e7619e",
        measurementId: "G-ZNKZ29139Y",
        fcmPublicVapidKey: 'BClj63QTFLWlGMzhj7V2totJIOz-NkcjCp2qXAbgGxrhig0DwBxLXSuUVliOcAbOUSGDSZ13g3GoNsUOBZnUa7U'
      },
      development: {
        apiKey: "AIzaSyA4Wi5BcCh3pmrwbDOdDP80wz-KglgnOzw",
        authDomain: "nuxt-shop-93181.firebaseapp.com",
        databaseURL: "https://nuxt-shop-93181.firebaseio.com",
        projectId: "nuxt-shop-93181",
        storageBucket: "nuxt-shop-93181.appspot.com",
        messagingSenderId: "77297445051",
        appId: "1:77297445051:web:65e16a6dcbe955f3e7619e",
        measurementId: "G-ZNKZ29139Y",
        fcmPublicVapidKey: 'BClj63QTFLWlGMzhj7V2totJIOz-NkcjCp2qXAbgGxrhig0DwBxLXSuUVliOcAbOUSGDSZ13g3GoNsUOBZnUa7U'
      }
    },
    customEnv: false,
    onFirebaseHosting: false,
    services: {
      auth: {
        persistence: 'local',
        initialize: {
          onAuthStateChangedMutation: "auth/SET_AUTH_USER",
          onAuthStateChangedAction: 'auth/onAuthStateChanged',
        },
        ssr: true
      },
      firestore: true,
      functions: {
        // location: 'us-central1', // Default
        // emulatorPort: 12345
      },
      storage: true,
      realtimeDb: true,
      performance: true,
      analytics: true,
      remoteConfig: {
        settings: {
          fetchTimeoutMillis: 60000, // Default
          minimumFetchIntervalMillis: 43200000 // Default
        },
        defaultConfig: {
          welcome_message: "Welcome"
        }
      },
      messaging: {
        createServiceWorker: true
      }
    }
  },
  pwa: {
    workbox: {
      importScripts: [
        '/firebase-auth-sw.js'
      ],
      // by default the workbox module will not install the service worker in dev environment to avoid conflicts with HMR
      // only set this true for testing and remember to always clear your browser cache in development
      dev: true
    }
  },
  vuetify: {
    /* module options */
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

