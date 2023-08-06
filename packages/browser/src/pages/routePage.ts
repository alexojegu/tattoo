import { lazy } from "react";
import type { IndexRouteObject, NonIndexRouteObject } from "react-router-dom";

export const homeRoute: IndexRouteObject[] = [
    {
        index: true,
        Component: lazy(async () => import("./homes/indexHome.js")),
    },
];

export const tattooRoute: NonIndexRouteObject[] = [
    {
        path: "/tattoo",
        Component: lazy(async () => import("./tattoos/indexTattoo.js")),
    },
];

export const artistRoute: NonIndexRouteObject[] = [
    {
        path: "/artist",
        Component: lazy(async () => import("./artists/indexArtist.js")),
    },
];

export const studioRoute: NonIndexRouteObject[] = [
    {
        path: "/studio",
        Component: lazy(async () => import("./studios/indexStudio.js")),
    },
];
