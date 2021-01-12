import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { ItemDetailsProps } from "../../interfaces/ItemDetailsProps";
import { addToCart } from "../../redux/actions/cartActions";
import DropdownMenu from "../../components/dropDown/DropdownMenu";
import styles from "./ItemDetails.module.scss";

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
      setError("Please choose your size");
      return;
    }
    addItemToCart(_id, chosenSize, price, name, imgSrc);
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
  addItemToCart: (
    id: string,
    size: number,
    price: number,
    name: string,
    imgSrc: string,
  ) => dispatch(addToCart(id, size, price, name, imgSrc)),
});

export default connect(null, mapDispatchToProps)(ItemDetails);
