import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { createPortal } from "react-dom";

import { ReactComponent as Times } from "./times.svg";
import styles from "./Notification.module.css";
import createContainer from "../createContainer";

const container = createContainer();

export default function Notification({ color = Color.info, children }) {
  return createPortal(
    <div className={cn([styles.notification, styles[color]])}>
      {children}
      <button className={styles.closeButton}>
        <Times height={16} />
      </button>
    </div>,
    container
  );
}

export const Color = {
  info: "info",
  success: "success",
  warning: "warning",
  error: "error",
};

Notification.propTypes = {
  notificationType: PropTypes.oneOf(Object.keys(Color)),
  children: PropTypes.element,
};

