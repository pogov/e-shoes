import React, { useCallback, useEffect, useRef } from "react";
import styles from "./DropdownMenu.module.scss";
import { DropdownProps } from "../../interfaces/DropdownProps";

const DropdownMenu: React.FC<DropdownProps> = ({ list, header, handler }) => {
  const [isVisible, setIsVisible] = React.useState(false);

  const handleClick = (event: any) => {
    handler(event);
    setIsVisible(false);
  };

  const dropdownRef = useRef(null);

  const doesCurrentContainsTarget = (ref: HTMLElement, target: any) => {
    if (ref.contains(target)) return true;
    return false;
  };

  const clickOutside = useCallback((e: MouseEvent) => {
    const current = dropdownRef.current;
    const target = e.target ? e.target : "";

    if (!current || doesCurrentContainsTarget(current, target)) return null;

    setIsVisible(false);
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, [clickOutside]);

  return (
    <div ref={dropdownRef} className={styles.menu}>
      <div
        data-testid="header"
        className={styles.header}
        onClick={() => setIsVisible(!isVisible)}>
        <p>{header}</p>
      </div>
      {isVisible && (
        <div data-testid="optionsList" className={styles.list}>
          {list.map((item: any) => (
            <div
              key={item}
              className={styles.listItem}
              onClick={handleClick}
              data-testid="listItem">
              <p>{item}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;
