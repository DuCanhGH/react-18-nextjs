import { Html, Main, DocumentContext } from "next/document";
import Document, { provideComponents } from "@next-safe/middleware/dist/document";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return initialProps;
    }
    render() {
        const { Head, NextScript } = provideComponents(this.props);
        return (
            <Html lang="en">
                <Head />
                <body>
                    <Main />
                    <NextScript />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `console.log('I will always be blocked by a strict CSP')`,
                        }}
                    />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
