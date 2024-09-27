export const BASE_URL = import.meta.env.VITE_API_URL;

export const PATH = {
    aboutUs: "/",
    news: "/news",
    catalog: "/catalog",
    catalogDetail: "/catalogDetail/:categoryId",
    search: "/search",
    recipe: "/recipe/:recipeId",
    error: "*"
}