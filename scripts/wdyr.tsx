import React from "react";

if (process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
        const whyDidYouRender = require("@welldone-software/why-did-you-render");
        whyDidYouRender(React, {
            trackAllPureComponents: true,
        });
    }
}
