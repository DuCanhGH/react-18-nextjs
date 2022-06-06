import { useEffect } from "react";
//@ts-ignore
import LocomotiveScroll from "locomotive-scroll";

const LocomotiveScrollComponent = () => {
    useEffect(() => {
        //@ts-ignore
        new LocomotiveScroll({
            el: document.querySelector("[data-scroll-container]"),
            smooth: true,
            smoothMobile: true,
        });
    }, []);
    return <></>;
};

export default LocomotiveScrollComponent;