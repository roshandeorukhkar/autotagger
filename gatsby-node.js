/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.onCreatePage = async ({ page, actions }) => {
    const { createPage } = actions

    // page.matchPath is a special key that's used for matching pages
    // only on the client.
    if (!page.path.match(/^\/install/) 
        && !page.path.match(/^\/error/) 
        && !page.path.match(/^\/reauth/)
        && !page.path.match(/^\/enable-cookies/)) {
        // enable if you client-side router
        //page.matchPath = "/app/*"
        
        page.context.layout = 'app'

        // Update the page.
        createPage(page)
    }
}