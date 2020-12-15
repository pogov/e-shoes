import React from "react";
import { Link } from "react-router-dom";
import styles from "./ItemDetails.module.scss";
import DropdownMenu from "../dropDown/DropdownMenu";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

type ItemDetailsProps = {
  item: ItemsListProps;
  chosenSize: number;
  handleClick: (e: MouseEvent) => void;
};

const ItemDetails: React.FC<ItemDetailsProps> = ({
  item,
  chosenSize,
  handleClick,
}) => {
  if (!item) return null;

  const isChosenSize = chosenSize !== 0;

  const { sizes, type, description, name, price, imgSrc, tags } = item;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <img src={imgSrc} alt={name} />
        <div className={styles.details}>
          <nav>
            <Link className={styles.backBtn} to="/">
              back to product list
            </Link>
            {/* <Link to={`/items/${parseInt(id) - 1}`} className={styles.navBtn}>
              prev
            </Link> */}
            {/* <Link to={`/items/${parseInt(id) + 1}`} className={styles.navBtn}>
              next
            </Link> */}
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
            <button>add to cart</button>
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

export default ItemDetails;
