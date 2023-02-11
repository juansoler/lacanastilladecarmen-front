const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: ["minio.lacanastilladecarmen.es", "medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", "217.160.205.211:9050", "217.160.205.211", "farmaciapaseo51.com"],
  },
  i18n: {
    // The locales you want to support in your app
    locales: ["es"],
    // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
    defaultLocale: "es",
  },
})

console.log("next.config.js", JSON.stringify(module.exports, null, 2))
