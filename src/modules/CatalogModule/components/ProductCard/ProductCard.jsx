import classes from "./ProductCard.module.sass";
import { useState } from "react";
import { Typography } from "../../../../UI/Typography/Typography.jsx";
import { CartIcon } from "../../../../assets/Icons/CartIcon.jsx";
import { useTranslation } from "react-i18next";

const ProductCard = ({ product }) => {
    const [selectedVolume, setSelectedVolume] = useState(product.prices[0]?.volume || '');
    const [quantity, setQuantity] = useState(1);
    const { t } = useTranslation();  // Move the hook to the component body

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

    // Pass the 't' function as part of the logic
    const handleSendToWhatsApp = () => {
        if (selectedPriceItem?.order_link) {
            const message = `${t("whatsapp.message")} ${t('whatsapp.product')}: ${product.name}, ` +
                `${t('whatsapp.volume')}: ${selectedVolume} ${t("whatsapp.gram")}, ` +
                `${t('whatsapp.pricePerUnit')}: ${selectedPrice} ${t("whatsapp.som")}, ` +
                `${t('whatsapp.quantity')}: ${quantity}, ` +
                `${t('whatsapp.totalPrice')}: ${totalPrice} ${t("whatsapp.som")}` ;


            const encodedMessage = encodeURIComponent(message);
            const whatsappUrl = `${selectedPriceItem.order_link}&text=${encodedMessage}`;
            window.open(whatsappUrl, '_blank');
        } else {
            console.error("No WhatsApp order link available");
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
