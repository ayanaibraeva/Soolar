import classes from "./NewsModal.module.sass";

import {useEffect, useRef, useState} from "react";
import { requester } from "../../../../utils/requester/axiosApi.js";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { CloseCircleIcon } from "../../../../assets/Icons/CloseCircleIcon.jsx";
import {useOutsideClick} from "../../../../utils/hooks/useOutsideClick.js";

export const NewsModal = ({ newsId, onClose }) => {
    const [newsDetails, setNewsDetails] = useState(null);
    const modalRef = useRef(null);


    useOutsideClick(modalRef, onClose);

    useEffect(() => {
        const fetchNewsDetails = async () => {
            const details = await requester(`news/${newsId}/`);
            setNewsDetails(details);
        };
        fetchNewsDetails();

        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [newsId]);

    if (!newsDetails) return null;


    return (
        <div className={classes.modal} onClick={e => e.stopPropagation()}>
            <div className={classes.modalContent} ref={modalRef}>
                <div className={classes.closeButton} onClick={onClose}>
                    <CloseCircleIcon height="25px" width="25px" color="black" />
                </div>
                <div className={classes.modalImg}>
                    <img src={newsDetails.image} alt={newsDetails.title} />
                </div>
                <Typography className={classes.modalTitle} variant="h4">
                    {newsDetails.title}
                </Typography>
                <div>
                    <Typography variant="body600">
                        {newsDetails.description}
                    </Typography>
                </div>
            </div>
        </div>
    );
};
