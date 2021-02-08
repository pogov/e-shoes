import React, { useRef, useState } from "react";
import { DropdownProps } from "../../interfaces/DropdownProps";
import styles from "./DropdownMenu.module.scss";
import useClickOutside from "../../hooks/useClickOutside";

const DropdownMenu: React.FC<DropdownProps> = ({ list, header, handler }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [dynamicHeader, setDynamicHeader] = useState<string | number>(header);

  const handleClick = (event: React.MouseEvent, chosen: string | number) => {
    handler(event);
    setIsVisible(false);
    setDynamicHeader(chosen);
  };

  const dropdownRef = useRef<HTMLDivElement>(null);

  const current = dropdownRef.current;

  useClickOutside(current!, setIsVisible);

  return (
    <div ref={dropdownRef} className={styles.menu}>
      <div
        aria-label="select size option"
        data-testid="header"
        className={styles.header}
        onClick={() => setIsVisible(!isVisible)}>
        <p>{dynamicHeader}</p>
      </div>
      {isVisible && (
        <div data-testid="optionsList" className={styles.list}>
          {list.map((item: string | number) => (
            <div
              aria-label="size option"
              key={item}
              className={styles.listItem}
              onClick={(event) => handleClick(event, item)}>
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
