import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoot from "./appRoot.js";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <AppRoot />
    </StrictMode>,
);
