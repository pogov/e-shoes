import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import CartIcon from "../../containers/cartIcon/CartIcon";
import CartModal from "../../containers/cartModal/CartModal";
import useClickOutside from "../../hooks/useClickOutside";
import SearchBar from "../../containers/searchBar/SearchBar";
import styles from "./NavBar.module.scss";

const NavBar: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);

  const current = modalRef.current;

  const toggle = () => setIsModalOpen((prev) => !prev);

  useClickOutside(current!, setIsModalOpen);

  return (
    <header className={styles.header}>
      <nav ref={modalRef} className={styles.nav}>
        <div className={styles.logoWrapper}>
          <Link to="/">e-Shoes</Link>
        </div>
        <SearchBar />
        <CartIcon data-testid="icon" onClick={toggle} />
        {isModalOpen && <CartModal handler={toggle} />}
      </nav>
    </header>
  );
};
export default NavBar;
