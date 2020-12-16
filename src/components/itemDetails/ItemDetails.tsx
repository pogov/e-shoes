import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ItemDetails.module.scss";
import DropdownMenu from "../dropDown/DropdownMenu";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { connect } from "react-redux";
import { addToCart } from "../../actions/cartActions";

type ItemDetailsProps = {
  item: ItemsListProps;
  chosenSize: number;
  handleClick: (e: MouseEvent) => void;
  addItemToCart: (i: string, s: number, p: number) => void;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  chosenSize,
  handleClick,
  addItemToCart,
}) => {
  const [error, setError] = useState("");

  const isChosenSize = chosenSize !== 0;

  if (!item) return null;

  const { sizes, type, description, name, price, imgSrc, tags, _id } = item;

  const handleAddItem = () => {
    if (!isChosenSize) {
      setError("Please chose your size");
      return;
    }
    addItemToCart(_id, chosenSize, price);
    setError("");
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <img src={imgSrc} alt={name} />
        <div className={styles.details}>
          <nav>
            <Link className={styles.backBtn} to="/">
              back to product list
            </Link>
          </nav>
          <div className={styles.productDetails}>
            <p>category: {type}</p>
            <h2>{name}</h2>
            <p>available sizes:</p>
            <ul>
              {sizes.map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          </div>
          <div className={styles.productPrice}>
            <p>{price} PLN</p>
          </div>
          <div className={styles.btnContainer}>
            {isChosenSize && <p>your size: {chosenSize}</p>}
            <DropdownMenu
              list={sizes}
              header="choose size"
              handler={handleClick}
            />
            <br />
            <button onClick={handleAddItem}>add to cart</button>
            {error.length > 0 && !isChosenSize && (
              <p className={styles.error}>{error}</p>
            )}
          </div>
        </div>
        <div className={styles.description}>
          <h3>Product description:</h3>
          <p>{description}</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            deserunt suscipit blanditiis id provident placeat quis atque autem
            iste molestiae nisi maxime delectus non a, sint alias corrupti quos
            corporis sequi quidem omnis tempora minima deleniti? Quibusdam odio
            perspiciatis molestias!
          </p>
          <div className={styles.tags}>
            <p>Tags:</p>
            {tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  addItemToCart: (id: string, size: number, price: number) =>
    dispatch(addToCart(id, size, price)),
});

export default connect(null, mapDispatchToProps)(ItemDetails);
