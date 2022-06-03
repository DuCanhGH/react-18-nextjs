import Document, { Html, Head, Main, NextScript, DocumentInitialProps } from "next/document";
import crypto from "crypto";
import { nanoid } from "nanoid";

const cspHashOf = (text: string) => {
    const hash = crypto.createHash("sha256");
    hash.update(text);
    return `'sha256-${hash.digest("base64")}'`;
};

class CustomDocument extends Document<DocumentInitialProps> {
    render() {
        const nonce = nanoid();
        type cspType = {
            [key: string]: string;
        };
        let csp: cspType = {
            "default-src": "'self' blob: https://pokeapi.co",
            "style-src": `'self' https 'unsafe-inline'`,
            "object-src": "'none'",
            "base-uri": "'self'",
            "script-src": `'nonce-${nonce}' ${cspHashOf(
                NextScript.getInlineScriptSource(this.props),
            )} 'unsafe-inline' 'unsafe-eval' 'strict-dynamic' https: http:`,
            "block-all-mixed-content": "",
            "upgrade-insecure-requests": "",
        };
        let cspStr = "";
        for (let k in csp) {
            cspStr += `${k} ${csp[k]}; `;
        }
        return (
            <Html lang="en">
                <Head nonce={nonce}>
                    <meta httpEquiv="Content-Security-Policy" content={cspStr} />
                </Head>
                <body>
                    <Main />
                    <NextScript nonce={nonce} />
                </body>
            </Html>
        );
    }
}

export default CustomDocument;
