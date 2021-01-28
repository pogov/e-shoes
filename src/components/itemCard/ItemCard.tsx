import React from "react";
import { Link } from "react-router-dom";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import styles from "./ItemCard.module.scss";

const ItemCard: React.FC<ItemsListProps> = (item) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/items/${item._id}`}>
        <img src={item.imgSrc} alt={item.name} />
      </Link>
      <div className={styles.info}>
        <div>
          <p>{item.name}</p>
          <p>Price: {item.price}</p>
        </div>
        <div className={styles.sizes}>
          <p>Sizes:</p>
          {item.sizes.map((size) => (
            <p key={size}>{size}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ItemCard;
