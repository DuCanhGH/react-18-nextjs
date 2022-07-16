import { Html, Main, DocumentContext, DocumentProps, DocumentInitialProps } from "next/document";
import { getCspInitialProps, provideComponents } from "@next-safe/middleware/dist/document";

const CustomDocument = (props: DocumentProps) => {
    const { Head, NextScript } = provideComponents(props);
    return (
        <Html lang="en">
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
};

interface InitialPropsType extends DocumentInitialProps {
    nonce: string;
    trustifyStyles: boolean;
    trustifyScripts: boolean;
}

CustomDocument.getInitialProps = async (ctx: DocumentContext): Promise<InitialPropsType> => {
    const initialProps = await getCspInitialProps({ ctx, trustifyStyles: true });
    return initialProps;
};

export default CustomDocument;
