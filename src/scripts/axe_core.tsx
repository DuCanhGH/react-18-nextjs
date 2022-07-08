import React from "react";
import ReactDOM from "react-dom/client";

if (process.env.NODE_ENV !== "production") {
    if (typeof window !== "undefined") {
        import("@axe-core/react").then((axe) => {
            axe.default(React, ReactDOM, 1000);
        });
    }
}
