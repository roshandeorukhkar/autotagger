import React, { Component } from "react"
import { Layout, Page } from "@shopify/polaris"

import TagList from "./TagList"

class App extends Component {
    render = () => {
        return (
            <Page
                title="Home"
            >
                <Layout>
                    <Layout.Section>
                        <TagList location={this.props.location} />
                    </Layout.Section>
                </Layout>
            </Page>
        )
    }
}

export default App
