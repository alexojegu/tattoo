import { createBrowserRouter } from "react-router-dom";
import LayoutPage from "../pages/layoutPage.js";

export default createBrowserRouter([
    {
        path: "/",
        Component: LayoutPage,
    },
]);
