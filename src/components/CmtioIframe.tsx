import { useRef, useEffect } from "react";

interface Props {
    url: string;
    commentsSorting?: string;
    commentsPerPage?: number;
}

export const CmtioIframe = (props: Props) => {
    const { url, commentsSorting, commentsPerPage } = props;
    const cmtioref = useRef<HTMLIFrameElement>(null);
    const CMTIO_SITE_ID = "336536056919753295"; //process.env.NEXT_CMTIO_SITE_ID or sth like that
    const CMTIO_ORIGIN = "https://cmtio.vercel.app"; //process.env.NEXT_CMTIO_ORIGIN or sth like that
    const CMTIO_SORTING = commentsSorting ?? "newest";
    const CMTIO_COMMENTS_PER_PAGE = commentsPerPage ?? 5;
    const sorting = CMTIO_SORTING === "oldest";
    const resizeFunction = (e: MessageEvent<any>) => {
        if (
            e.origin !== CMTIO_ORIGIN ||
            e?.data?.siteId !== CMTIO_SITE_ID ||
            e?.data?.slug !== props.url
        )
            return;
        if (cmtioref.current !== null) {
            cmtioref.current.style.height = `${e.data.height}px`;
        }
    };
    useEffect(() => {
        window.addEventListener("message", resizeFunction);
        return () => {
            window.removeEventListener("message", resizeFunction);
        };
    }, [props.url, resizeFunction]);
    return (
        <iframe
            src={`${CMTIO_ORIGIN}/embed?siteId=${CMTIO_SITE_ID}&slug=${url}&oldest=${Number(
                sorting,
            )}&commentsPerPage=${CMTIO_COMMENTS_PER_PAGE}`}
            title="CmtIO embedded comments"
            className="cmtio-iframe"
            frameBorder="0"
            ref={cmtioref}
        />
    );
};
