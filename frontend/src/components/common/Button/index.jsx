import React from "react";

import "./styles.scss";
const classNames = require("classnames");

export default function ({ className, caption, size, color }) {
  return (
    <div
      className={classNames(className, "button__wrapper", size, color)}
      role="button"
    >
      {caption}
    </div>
  );
}
