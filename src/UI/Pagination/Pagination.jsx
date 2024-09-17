import styles from "./Pagination.module.sass";

import PropTypes from "prop-types";
import { Typography } from "../Typography/Typography";
import { MultiContainer } from "../container/MultiContainer.jsx";
import { ArrowLeftIcon } from "../../assets/Icons/ArrowLeftIcon.jsx";
import { ArrowRightIcon } from "../../assets/Icons/ArrowRightIcon.jsx";
export const Pagination = ({ total, current, onChange }) => {
    const handlePageChange = (page) => {
        if (page !== current && page >= 1 && page <= total) {
            onChange(page);
        }
    };

    const getPages = () => {
        const pages = [];

        if (total <= 7) {
            for (let i = 1; i <= total; i++) {
                pages.push(i);
            }
        } else {
            if (current <= 4) {
                pages.push(1, 2, 3, 4, 5, "...", total);
            } else if (current >= total - 3) {
                pages.push(1, "...", total - 4, total - 3, total - 2, total - 1, total);
            } else {
                pages.push(1, "...", current - 1, current, current + 1, "...", total);
            }
        }

        return pages;
    };

    const pages = getPages();

    return (
        <MultiContainer>
            <nav className={styles.mainBlock}>
                <ul>
                    <li>
                        <button
                            className={`${styles.prev} ${current === 1 ? styles.disabled : ""}`}
                            onClick={() => handlePageChange(current - 1)}
                            disabled={current === 1}
                            aria-label="button">
                            <ArrowLeftIcon width="24" height="24" color="white" />
                        </button>
                    </li>
                    {pages.map((page, index) => (
                        <li key={index} className={`${styles.pageItem} ${page === current ? styles.active : ""}`}>
                            {page === "..." ? (
                                <span className={`${styles.pageMiddle} ${styles.pageLink}`}>. . .</span>
                            ) : (
                                <button aria-label="button" className={styles.pageLink} onClick={() => handlePageChange(page)}>
                                    <Typography variant="bodyL" weight="medium" className={styles.number}>
                                        {page}
                                    </Typography>
                                </button>
                            )}
                        </li>
                    ))}
                    <li>
                        <button
                            className={`${styles.next} ${current === total ? styles.disabled : ""}`}
                            onClick={() => handlePageChange(current + 1)}
                            disabled={current === total}
                            aria-label="button">
                            <ArrowRightIcon width="24" height="24" color="white" />
                        </button>
                    </li>
                </ul>
            </nav>
        </MultiContainer>
    );
};

Pagination.propTypes = {
    total: PropTypes.number.isRequired,
    current: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};
