import React from "react";
import { Link } from "react-router-dom";

import styles from "./MenuItem.module.css";

interface MenuItemProps {
  linkTo?: string;
  title: string;
  subtitle: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ linkTo, title, subtitle }) => {
  return (
    <div className={styles.menuSection}>
      {linkTo ? (
        <Link to={linkTo} className={styles.menuLinkTitle}>
          {title}
        </Link>
      ) : (
        <div className={styles.menuTitle}>{title}</div>
      )}
      <div className={styles.menuSubtitle}>{subtitle}</div>
    </div>
  );
};

export default MenuItem;
