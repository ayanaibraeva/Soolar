import classes from "../../../../pages/catalogPage/CatalogPage.module.sass";
import ProductCard from "../../../CatalogModule/components/ProductCard/ProductCard.jsx";
import { useLoaderData, useSearchParams } from 'react-router-dom';

export const ResultsItems = () => {
    const search = useLoaderData(); // Загружаем данные из маршрутизатора
    const [searchParams] = useSearchParams(); // Получаем параметры поиска

    const query = searchParams.get('query'); // Получаем параметр поиска

    // Проверяем, есть ли результаты
    if (!search?.results || search.results.length === 0) {
        return <p>No results found for "{query}".</p>;
    }

    return (
        <div>
            <h2>Search results for: "{query}"</h2>
            <div className={classes.catalogPage}>
                {search.results.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};
