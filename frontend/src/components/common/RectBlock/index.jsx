import React from "react";

export default function (props) {
  const {
    className,
    title,
    title2,
    subTitle,
    content,
    background,
    mainColor,
    subColor,
    borderColor,
    width,
    height,
  } = props;

  const mainStyle = {
    background: background,
    boxSizing: "border-box",
    borderRight: `12px solid ${borderColor}`,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    width: `${width}px`,
    height: `${height}px`,
    color: mainColor,
    fontWeight: 600,
    paddingLeft: 20
  };

  const headerStyle = {
    fontSize: "16px",
    color: mainColor,
  };

  const subHeaderStyle = {
    fontSize: "12px",
    color: subColor,
    paddingTop: 12
  };

  const contentStyle = {
    fontSize: "16px",
    color: mainColor,
    paddingTop: 20
  };

  return (
    <div className={className} style={mainStyle}>
      <span style={headerStyle}>{title}</span>
      {title2 !== "" && <span style={headerStyle}>{title2}</span>}
      <span style={subHeaderStyle}>{subTitle}</span>
      <span style={contentStyle}>{content}</span>
    </div>
  );
}
