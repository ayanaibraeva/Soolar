import classes from './SearchInput.module.sass';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export const SearchInput = ({ value, onChange }) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && value.trim() !== '') {
            navigateToSearch();
        }
    };
    const handleSearchClick = () => {
        if (value.trim() !== '') {
            navigateToSearch();
        }
    };
    const navigateToSearch = () => {
        navigate(`/search?query=${encodeURIComponent(value.trim())}`);
        clearInput();
    };

    const clearInput = () => {
        onChange({ target: { value: '' } });
    };

    return (
        <div className={classes.inputContainer}>
            <span className={classes.icon} onClick={handleSearchClick}></span>
            <input
                type="text"
                value={value}
                onChange={onChange}
                placeholder={t('header.search')}
                className={classes.inputField}
                onKeyDown={handleKeyDown}
            />
            {value && (
                <span className={classes.clearIcon} onClick={clearInput}>
                    &times;
                </span>
            )}
        </div>
    );
};
