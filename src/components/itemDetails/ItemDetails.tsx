import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ItemDetails.module.scss";
import { ItemsListProps } from "../../interfaces/ItemsListProps";

interface ParamType {
  id: string;
}

const ItemDetails: React.FC = () => {
  const { id } = useParams<ParamType>();
  const [item, setItem] = useState<ItemsListProps>();

  // !!!!! zwalidować działanie (min max id) przycisków prev i next !!!!!!!!!!!

  useEffect(() => {
    fetch(`http://localhost:5500/api/items/${id}`)
      .then((res) => res.json())
      .then((data) => setItem(data));
  }, [id]);

  if (!item) return null;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <img src={item.imgSrc} alt="" />
        <div className={styles.details}>
          <nav>
            <Link className={styles.backBtn} to="/">
              back to product list
            </Link>
            <Link to={`/items/${parseInt(id) - 1}`} className={styles.navBtn}>
              prev
            </Link>
            <Link to={`/items/${parseInt(id) + 1}`} className={styles.navBtn}>
              next
            </Link>
          </nav>
          <div className={styles.productDetails}>
            <p>category: {item.type}</p>
            <h2>{item.name}</h2>
            <p>model number: {id}</p>
            <p>available sizes:</p>
            <ul>
              {item.sizes.map((size) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          </div>
          <div className={styles.productPrice}>
            <p>{item.price} PLN</p>
          </div>
          <div className={styles.btnContainer}>
            <p>choose size</p>
            <br />
            <button>add to cart</button>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Product description:</h3>
          <p>{item.description}</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            deserunt suscipit blanditiis id provident placeat quis atque autem
            iste molestiae nisi maxime delectus non a, sint alias corrupti quos
            corporis sequi quidem omnis tempora minima deleniti? Quibusdam odio
            perspiciatis molestias!
          </p>
          <div className={styles.tags}>
            <p>Tags:</p>
            {item.tags.map((tag) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
