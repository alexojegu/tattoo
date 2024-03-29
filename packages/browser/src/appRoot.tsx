import type { ReactElement } from "react";
import { RouterProvider } from "react-router-dom";
import "./styles/globalStyle.css";
import routerContext from "./contexts/routerContext.js";

export default function AppRoot(): ReactElement {
    return <RouterProvider router={routerContext} />;
}
