import classes from "./Faq.module.sass";

import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLoaderData } from "react-router-dom";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { FaqItems } from "../FaqItems/FaqItems.jsx";
import {MultiContainer} from "../../../../UI/container/MultiContainer.jsx";

export const Faq = () => {
    const faq = useLoaderData();

    const faqs = faq?.faq?.results
    const [openId, setOpenId] = useState(null);
    const { t } = useTranslation();
    const accordionRef = useRef(null);


    useEffect(() => {
        const handleClickOutside = (event) => {
            if (accordionRef.current && !accordionRef.current.contains(event.target)) {
                setOpenId(null);
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <section>
            <MultiContainer>
                <Typography className={classes.title} variant="h2" color="blue500">
                    {t("aboutUs.accordion")}
                </Typography>
                <ul ref={accordionRef} className={classes.accordion}>
                    {faqs?.map((faqItem, id) => (
                        <FaqItems
                            onClick={() => (id === openId ? setOpenId(null) : setOpenId(id))}
                            faqItem={faqItem}
                            isOpen={id === openId}
                            key={faqItem.id}
                        />
                    ))}
                </ul>
            </MultiContainer>
        </section>
    );
};
