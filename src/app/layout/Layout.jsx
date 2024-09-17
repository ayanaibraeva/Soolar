import { Outlet } from "react-router-dom";
import { Header } from "../../modules/Header/components/Header/Header.jsx";
import { Footer } from "../../modules/Footer/components/Footer/Footer.jsx";
import { Loader } from "../../UI/Loader/Loader.jsx";
import { useScrollToTop } from "../../utils/hooks/useScrollToTop.js";
import { Suspense, useRef } from "react";

export const Layout = () => {
    const footerRef = useRef(null);

    const scrollToFooter = () => {
        if (footerRef.current) {
            footerRef.current.scrollIntoView({ behavior: "smooth" });
        }
    };

    useScrollToTop(['/']);

    return (
        <>
            <Header onContactsClick={scrollToFooter} />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
            <div ref={footerRef}>
                {/*<Footer />*/}
            </div>
        </>
    );
};
