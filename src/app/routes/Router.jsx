import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../layout/Layout.jsx";
import { PATH } from "../../utils/lib/variables.js";
import { requester } from "../../utils/requester/axiosApi.js";
import { loadComponent } from "../../utils/helpers/helpers.js";
import {RecipePage} from "../../pages/receptPage/RecipePage.jsx";

const AboutUsPage = loadComponent(() => import ('../../pages/aboutUsPage/AboutUsPage.jsx'), 'AboutUsPage');
const CatalogPage = loadComponent(() => import ('../../pages/catalogPage/CatalogPage.jsx'), 'CatalogPage');
const NewsPage = loadComponent(() => import ('../../pages/newsPage/NewsPage.jsx'), 'NewsPage');
const CatalogDetail = loadComponent(() => import ('../../pages/catalogDetail/CatalogDetail.jsx'), 'CatalogDetail');
const ResultsPage = loadComponent(() => import ('../../pages/resultsPage/ResultsPage.jsx'), 'ResultsPage');

export const router = createBrowserRouter([
    {
        element:<Layout/>,
        loader: async () => {
            const contacts = await requester(`contacts/`);
            const footer = await requester(`category_name/`);
            const linkContacts = await requester(`link_contact/`);
            return {
                footer,
                contacts,
                linkContacts
            };
        },
        children: [
            {
                element: <AboutUsPage/>,
                path: PATH.aboutUs,
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const page = url.searchParams.get("page") || 1;
                    const newsPage = await requester(`news/?page=${page}`);
                    const recipe = await requester('recipe/');
                    const aboutUs = await requester('about_us/');
                    const faq = await requester('faq/');
                    const hitProducts = await requester('hit_products/');
                    const banner = await requester('banner/');
                    return {
                        newsPage,
                        recipe,
                        aboutUs,
                        faq,
                        hitProducts,
                        banner
                    };
                }
            },
            {
                element: <NewsPage />,
                path: PATH.news,
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const page = url.searchParams.get("page") || 1;
                    const newsPage = await requester(`news/?page=${page}&page_size=9`);
                    return newsPage;
                }
            },
            {
                element: <CatalogPage/>,
                path: PATH.catalog,
                loader: async () => {
                    const category = await requester(`category/`);
                    return category;
                }
            },
            {
                element: <CatalogDetail />,
                path: PATH.catalogDetail,
                loader: async ({ params, request }) => {
                    const { categoryId } = params;
                    const url = new URL(request.url);
                    const page = url.searchParams.get('page') || 1;
                    const categoryData = await requester(`category/${categoryId}/?page=${page}&page_size=12`);
                    return categoryData;
                },
            },
            {
                element: <ResultsPage />,
                path: PATH.search,
                loader: async ({ request }) => {
                    const url = new URL(request.url);
                    const search = url.searchParams.get("query");
                    const page = url.searchParams.get('page') || 1;
                    const searchResults = await requester(`search_product/?search=${search}&page=${page}&page_size=12`);
                    return searchResults;
                }
            },
            {
                element: <RecipePage />,
                path: PATH.recipe,
                loader: async ({ params }) => {
                    const { recipeId } = params;
                    const recipe = await requester(`recipe/${recipeId}`);
                    return recipe;
                }
            }

        ]
    }
])