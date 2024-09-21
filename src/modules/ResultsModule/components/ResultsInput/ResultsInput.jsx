import classes from './ResultsInput.module.sass';

import classNames from 'classnames';
import { useState } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import {PATH} from "../../../../utils/lib/variables.js";
import {SearchIcon} from "../../../../assets/Icons/SearchIcon.jsx";
import {CloseCircleIcon} from "../../../../assets/Icons/CloseCircleIcon.jsx";


export const ResultsInput = ({ className }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const search = useLoaderData();
    const [searchInput, setSearchInput] = useState('');

    const handleSearch = () => {
        if (searchInput.trim() !== '') {
            navigate(PATH.search, { state: { query: searchInput.trim() } });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleSearch();
    };

    return (
        <form onSubmit={handleSubmit} className={classNames(classes.search, className)}>
            <div className={classes.searchIcon} onClick={handleSearch}>
                <SearchIcon color={searchInput ? 'accent' : 'dark'} />
            </div>
            <input
                type='text'
                placeholder={"Search"}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className={classes.searchIcon} onClick={() => setSearchInput('')}>
                <CloseCircleIcon color='dark' />
            </div>
        </form>
    );
};
