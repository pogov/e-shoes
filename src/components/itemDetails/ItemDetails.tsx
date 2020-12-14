import React from "react";
import { Link } from "react-router-dom";
import styles from "./ItemDetails.module.scss";
import { ItemsListProps } from "../../interfaces/ItemsListProps";
import { connect } from "react-redux";

// interface ParamType {
//   id: string;
// }

const ItemDetails: React.FC = ({ shoe }: any) => {
  // const { id } = useParams<ParamType>();
  // const [item, setItem] = React.useState<ItemsListProps>();

  // !!!!! zwalidować działanie (min max id) przycisków prev i next !!!!!!!!!!!

  // if (!item) return null;
  // const [shoe] = oneItem;

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        <img src={shoe.imgSrc} alt="" />
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
            <p>category: {shoe.type}</p>
            <h2>{shoe.name}</h2>
            {/* <p>model number: {id}</p> */}
            <p>available sizes:</p>
            <ul>
              {shoe.sizes.map((size: number) => (
                <li key={size}>{size}</li>
              ))}
            </ul>
          </div>
          <div className={styles.productPrice}>
            <p>{shoe.price} PLN</p>
          </div>
          <div className={styles.btnContainer}>
            <p>choose size</p>
            <br />
            <button>add to cart</button>
          </div>
        </div>
        <div className={styles.description}>
          <h3>Product description:</h3>
          <p>{shoe.description}</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Possimus
            deserunt suscipit blanditiis id provident placeat quis atque autem
            iste molestiae nisi maxime delectus non a, sint alias corrupti quos
            corporis sequi quidem omnis tempora minima deleniti? Quibusdam odio
            perspiciatis molestias!
          </p>
          <div className={styles.tags}>
            <p>Tags:</p>
            {shoe.tags.map((tag: string) => (
              <p key={tag}>{tag}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ItemsListProps[], ownProps: any) => {
  const shoe = state.find((item) => item._id === ownProps.match.params.id);
  return {
    shoe,
  };
};

export default connect(mapStateToProps)(ItemDetails);
