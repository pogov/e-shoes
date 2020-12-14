import React from "react";
import styles from "./ItemCard.module.scss";
import { Link } from "react-router-dom";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

const ItemCard: React.FC<ItemsListProps> = (item) => {
  return (
    <div className={styles.wrapper}>
      <Link to={`/items/${item._id}`}>
        <img src={item.imgSrc} alt={item.name} />
      </Link>
      <div className={styles.info}>
        <div>
          <p>name: {item.name}</p>
          <p>price: {item.price} $</p>
        </div>
        <button
          onClick={() => console.log(`add to cart item nr: ${item._id}`)}
          className={styles.addBtn}>
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ItemCard;
