export const ArrowDownIcon = ({width, height, color, className, style}) => {
    return (
        <svg
            width={width}
            height={height}
            className={className}
            style={style}
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M10.8391 14C10.2558 14 9.67246 13.775 9.23079 13.3334L3.79746 7.90003C3.55579 7.65837 3.55579 7.25837 3.79746 7.0167C4.03913 6.77503 4.43913 6.77503 4.68079 7.0167L10.1141 12.45C10.5141 12.85 11.1641 12.85 11.5641 12.45L16.9975 7.0167C17.2391 6.77503 17.6391 6.77503 17.8808 7.0167C18.1225 7.25837 18.1225 7.65837 17.8808 7.90003L12.4475 13.3334C12.0058 13.775 11.4225 14 10.8391 14Z"
                fill={color}
            />
        </svg>
    );
};