import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/layoutPage.js";
import { artistRoute, homeRoute, studioRoute, tattooRoute } from "../pages/routePage.js";

export default createBrowserRouter([
    {
        path: "/",
        Component: LayoutPage,
        children: [...homeRoute, ...tattooRoute, ...artistRoute, ...studioRoute],
    },
]);
