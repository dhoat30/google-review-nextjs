import React from "react";

export default function Skeleton({ height, className, variant }) {
  return (
    <div
      className={`${className} ${
        variant === "dark" ? "dark-skeleton" : "skeleton"
      }`}
      style={{
        position: "relative",
        paddingBottom: `${height}`,
        width: "100%",
      }}
    ></div>
  );
}
