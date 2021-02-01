import styles from "./ItemCardSkeleton.module.scss";

const ItemCardSkeleton = () => {
  return (
    <div className={styles.skeleton}>
      <div className={styles.info}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  );
};

export default ItemCardSkeleton;
