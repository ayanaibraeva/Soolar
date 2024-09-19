import classes from "./NewsModal.module.sass";

import { useEffect, useRef, useState } from "react";
import { requester } from "../../../../utils/requester/axiosApi.js";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { CloseCircleIcon } from "../../../../assets/Icons/CloseCircleIcon.jsx";
import { useOutsideClick } from "../../../../utils/hooks/useOutsideClick.js";
import { ArrowLeftIcon } from "../../../../assets/Icons/ArrowLeftIcon.jsx";
import { ArrowRightIcon } from "../../../../assets/Icons/ArrowRightIcon.jsx";

export const NewsModal = ({ newsId, onClose }) => {
    const [newsDetails, setNewsDetails] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
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

    const images = newsDetails.images || [];
    const isMultipleImages = images.length > 1;

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const handlePreviousImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    return (
        <div className={classes.modal} onClick={(e) => e.stopPropagation()}>
            <div className={classes.modalContent} ref={modalRef}>
                <div className={classes.closeButton} onClick={onClose}>
                    <CloseCircleIcon height="25px" width="25px" color="black" />
                </div>

                <div>
                    {isMultipleImages && (
                        <div className={classes.arrowLeft} onClick={handlePreviousImage}>
                            <ArrowLeftIcon height="25px" width="25px" color="white" />
                        </div>
                    )}

                    <div className={classes.modalImg}>
                        <img src={images[currentImageIndex]} alt={newsDetails.title} />
                    </div>

                    {isMultipleImages && (
                        <div className={classes.arrowRight} onClick={handleNextImage}>
                            <ArrowRightIcon height="25px" width="25px" color="white" />
                        </div>
                    )}
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
