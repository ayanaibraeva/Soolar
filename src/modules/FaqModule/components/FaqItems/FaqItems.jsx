import classes from "./FaqItem.module.sass";

import { useRef, useEffect } from "react";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { ArrowDownIcon } from "../../../../assets/Icons/ArrowDownIcon.jsx";

export const FaqItems = ({ faqItem, onClick, isOpen }) => {

    const itemRef = useRef(null);

    useEffect(() => {
        if (isOpen && itemRef.current) {
            itemRef.current.style.maxHeight = `${itemRef.current.scrollHeight}px`;
        } else if (itemRef.current) {
            itemRef.current.style.maxHeight = "0px";
        }
    }, [isOpen]);

    return (
        <li className={classes.accordion_item}>
            <button
                className={`${classes.accordion_header} ${isOpen ? classes.opena : ""}`}
                onClick={onClick}
            >
                <Typography
                    className={`${classes.textFaq} ${isOpen ? classes.fullText : ""}`}
                    variant="body"
                >
                    {faqItem.question}
                </Typography>
                <ArrowDownIcon
                    width="24px"
                    color="black"
                    height="24px"
                    style={{
                        transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.5s ease-in-out",
                        marginLeft: "10px",
                    }}
                />
            </button>
            <div
                ref={itemRef}
                className={`${classes.accordion_collapse} ${isOpen ? classes.open : ""}`}
            >
                <div className={classes.accordion_body}>
                    {faqItem.answer}
                </div>
            </div>
        </li>
    );
};
