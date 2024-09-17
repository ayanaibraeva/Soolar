import classes from "./ProductCard.module.sass";

import { useState } from "react";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { CartIcon } from "../../../../assets/Icons/CartIcon.jsx";
import {useTranslation} from "react-i18next";

const ProductCard = ({ product }) => {
    const [selectedVolume, setSelectedVolume] = useState(product.prices[0]?.volume || '');
    const [quantity, setQuantity] = useState(1);
    const {t} = useTranslation();

    const handleVolumeSelect = (volume) => {
        setSelectedVolume(volume);
        setQuantity(1);
    };

    const handleQuantityChange = (type) => {
        if (type === 'increase') {
            setQuantity(prev => prev + 1);
        } else if (type === 'decrease' && quantity > 1) {
            setQuantity(prev => prev - 1);
        }
    };

    const selectedPrice = product.prices.find(priceItem => priceItem.volume === selectedVolume)?.price;
    const totalPrice = selectedPrice * quantity;

    const handleSendToWhatsApp = () => {
        const message = `Product: ${product.name}\nVolume: ${selectedVolume}\nPrice per unit: ${selectedPrice} сом\nQuantity: ${quantity}\nTotal Price: ${totalPrice} сом`;
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
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
                        <span>{quantity}  </span>
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
