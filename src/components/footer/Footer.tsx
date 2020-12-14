import React from "react";
import styles from "./Footer.module.scss";

const Footer: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div>Footer</div>
      <div>social media logos</div>
      <div className={styles.copyright}>
        © 2020 MYCOMMERCE All right reserved
      </div>
    </div>
  );
};
export default Footer;
