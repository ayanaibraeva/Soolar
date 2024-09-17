import {lazy} from "react";

export const loadComponent = (path, componentName) => {
    return lazy(() =>
        path().then((module) => ({ default: module[componentName] })),
    )
}