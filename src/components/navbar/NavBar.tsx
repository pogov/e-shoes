import React, { useState, useRef } from "react";
import CartIcon from "../../containers/cartIcon/CartIcon";
import CartModal from "../../containers/cartModal/CartModal";
import useClickOutside from "../../hooks/useClickOutside";
import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const modalRef = useRef(null);
  useClickOutside(modalRef.current!, setIsModalOpen);
  return (
    <header className={styles.header}>
      <nav ref={modalRef} className={styles.nav}>
        <div className={styles.logoWrapper}>logo</div>
        {/* searchbar and filterbar comp */}
        {/* links / categories */}
        <CartIcon handler={setIsModalOpen} />
        {isModalOpen && <CartModal handler={setIsModalOpen} />}
      </nav>
    </header>
  );
};
export default NavBar;
