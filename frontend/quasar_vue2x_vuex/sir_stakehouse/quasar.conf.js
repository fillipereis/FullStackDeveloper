const ESLintPlugin = require("eslint-webpack-plugin");

module.exports = function () {
  return {
    supportTS: false,

    boot: ["axios"],

    css: ["app.scss"],

    extras: ["roboto-font", "material-icons"],

    build: {
      vueRouterMode: "history", // Modo history para executar a aplicação sem o # na URL

      chainWebpack(chain) {
        chain
          .plugin("eslint-webpack-plugin")
          .use(ESLintPlugin, [{ extensions: ["js", "vue"] }]);
      },
    },

    devServer: {
      https: false,
      port: 8080,
      open: true, // Inicializa o browser automaticamente ao carregar a aplicação
    },

    framework: {
      iconSet: "material-icons",
      lang: "en-us",
      config: {},
      importStrategy: "auto",

      plugins: ["Notify", "Dialog"],
    },

    animations: [],

    ssr: {
      pwa: false,
    },

    pwa: {
      workboxPluginMode: "GenerateSW",
      workboxOptions: {},
      manifest: {
        name: `Sir.Stakehouse`,
        short_name: `Sir.Stakehouse`,
        description: `Hamburgueria Sir.Stakehouse`,
        display: "standalone",
        orientation: "portrait",
        background_color: "#ffffff",
        theme_color: "#027be3",
        icons: [
          {
            src: "icons/icon-128x128.png",
            sizes: "128x128",
            type: "image/png",
          },
          {
            src: "icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "icons/icon-256x256.png",
            sizes: "256x256",
            type: "image/png",
          },
          {
            src: "icons/icon-384x384.png",
            sizes: "384x384",
            type: "image/png",
          },
          {
            src: "icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true,
    },

    electron: {
      bundler: "packager",

      packager: {},

      builder: {
        appId: "vue_quasar_laravel_2x",
      },

      nodeIntegration: true,

      extendWebpack() {},
    },
  };
};
