import { useRef, useEffect } from "react";

interface Props {
    url: string;
}

export const CmtioIframe = (props: Props) => {
    const CMTIO_SITE_ID = "336536056919753295";
    const CMTIO_ORIGIN = "https://cmtio.vercel.app";
    const cmtioref = useRef<HTMLIFrameElement>(null);
    const { url } = props;
    useEffect(() => {
        window.addEventListener("message", (e) => {
            if (
                e.origin !== CMTIO_ORIGIN ||
                e?.data?.siteId !== CMTIO_SITE_ID ||
                e?.data?.slug !== props.url
            )
                return;
            if (cmtioref.current !== null) {
                cmtioref.current.style.height = `${e.data.height}px`;
            }
        });
    }, [props.url]);
    return (
        <iframe
            src={`${CMTIO_ORIGIN}/embed?siteId=${CMTIO_SITE_ID}&slug=${url}`}
            title="CmtIO embedded comments"
            className="cmtio-iframe"
            frameBorder="0"
            ref={cmtioref}
        />
    );
};
