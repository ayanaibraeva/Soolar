import { BannerModule } from "../../modules/MainModule/BannerModule/BannerModule.jsx";
import { AboutUsModule } from "../../modules/MainModule/AboutUsModule/AboutUsModule.jsx";
import { HazelnutModule } from "../../modules/MainModule/HazelnutModule/HazelnutModule.jsx";
import { NewsMain } from "../../modules/MainModule/NewsMainModule/NewsMain.jsx";
import {Faq} from "../../modules/FaqModule/components/Faq/Faq.jsx";
import {HitProducts} from "../../modules/HitProductsModule/components/HitProducts/HitProducts.jsx";

export const AboutUsPage = () => {

    return (
        <>
            <BannerModule />
            <AboutUsModule />
            <HitProducts/>
            <HazelnutModule />
            <NewsMain />
            <Faq/>
        </>
    );
};
