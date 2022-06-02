import { NextPageContext } from "next";

function Error(props: { statusCode: string }) {
    const { statusCode } = props;
    return (
        <p>
            {statusCode
                ? `Error: ${statusCode} occurred on server.`
                : "An error occurred on client."}
        </p>
    );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
    const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
    return { statusCode };
};

export default Error;
