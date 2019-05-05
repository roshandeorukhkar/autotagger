const proxy = require("http-proxy-middleware")
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const {
  FIREBASE_PROJECT_ID,
  FIREBASE_APP_ZONE,
} = process.env;

module.exports = {
  siteMetadata: {
    title: `Gatsby Starter Shopify App`,
    description: `A Gatsby Starter to create a Shopify App`,
    author: `@gilgnyc`,
  },
  plugins: [
    `gatsby-plugin-layout`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.app/offline
    // 'gatsby-plugin-offline',
  ],
  developMiddleware: app => {
    app.use(
      "/auth",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/auth": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/auth`,
        },
      })
    )

    // Firebase Function Routes

    app.use(
      "/callback",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/callback": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/callback`,
        },
      })
    )

    app.use(
      "/api/graphql",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/api/graphql": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/graphql`,
        },
      })
    )

    app.use(
      "/api/activate-charge",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/api/activate-charge": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/activateCharge`,
        },
      })
    )

    app.use(
      "/webhook/uninstall",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/webhook/uninstall": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/webhookUninstall`,
        },
      })
    )

    app.use(
      "/webhook/customer-redact",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/webhook/customer-redact": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/webhookCustomerRedact`,
        },
      })
    )

    app.use(
      "/webhook/customers-data-request",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/webhook/customers-data-request": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/webhookCustomersDataRequest`,
        },
      })
    )

    app.use(
      "/webhook/shop-redact",
      proxy({
        target: "http://localhost:5001",
        pathRewrite: {
          "/webhook/shop-redact": `/${FIREBASE_PROJECT_ID}/${FIREBASE_APP_ZONE || 'us-central1'}/webhookShopRedact`,
        },
      })
    )
  },
}
