import React from "react";
import styles from "./NavBar.module.scss";
import CartIcon from "../cartIcon/CartIcon";

const NavBar: React.FC = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logoWrapper}>logo</div>
        {/* searchbar and filterbar comp */}
        {/* links / categories */}
        <CartIcon isItem={true} />
      </nav>
    </header>
  );
};
export default NavBar;
