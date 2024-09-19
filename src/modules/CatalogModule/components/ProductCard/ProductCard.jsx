import classes from "./ProductCard.module.sass";
import { useState } from "react";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { CartIcon } from "../../../../assets/Icons/CartIcon.jsx";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
    const [selectedVolume, setSelectedVolume] = useState(product.prices[0]?.volume || '');
    const [quantity, setQuantity] = useState(1);
    const { t } = useTranslation();

    const handleVolumeSelect = (volume) => {
        setSelectedVolume(volume);
    };

    const handleQuantityChange = (type) => {
        setQuantity(prevQuantity => {
            if (type === 'increase') {
                return prevQuantity + 1;
            } else if (type === 'decrease' && prevQuantity > 1) {
                return prevQuantity - 1;
            }
            return prevQuantity;
        });
    };

    const selectedPriceItem = product.prices.find(priceItem => priceItem.volume === selectedVolume);
    const selectedPrice = selectedPriceItem?.price;
    const totalPrice = selectedPrice * quantity;

    const handleSendToWhatsApp = () => {
        // Use the `order_link` from the selected price item
        if (selectedPriceItem?.order_link) {
            window.open(selectedPriceItem.order_link, '_blank');
        } else {
            console.error("No order link available for the selected volume");
        }
    };

    return (
        <div className={classes.cardContent}>
            <div className={classes.cardContentImg}>
                <img src={product.image} alt={product.name} />
            </div>
            <Typography variant="body600">{product.name}</Typography>
            <div className={classes.volumeSelection}>
                {product.prices.map((priceItem, index) => (
                    <span
                        key={index}
                        className={`${classes.volumeSpan} ${selectedVolume === priceItem.volume ? classes.selected : ''}`}
                        onClick={() => handleVolumeSelect(priceItem.volume)}
                    >
                        {priceItem.volume} {t("catalog.gram")}
                    </span>
                ))}
            </div>
            <div className={classes.price}>
                <span>{totalPrice} {t("catalog.som")}</span>
                <div className={classes.quantityControl}>
                    <button onClick={() => handleQuantityChange('decrease')}>-</button>
                    <span>{quantity}</span>
                    <button onClick={() => handleQuantityChange('increase')}>+</button>
                </div>
            </div>
            <button className={classes.button} onClick={handleSendToWhatsApp}>
                {t("catalog.order")}
                <CartIcon />
            </button>
        </div>
    );
};

export default ProductCard;
