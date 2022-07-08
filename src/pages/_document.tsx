import Document, { Html, Main, DocumentContext } from "next/document";
import { getCspInitialProps, provideComponents } from "@next-safe/middleware/dist/document";

class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await getCspInitialProps({ ctx, trustifyStyles: true });
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
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
