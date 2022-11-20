import React from "react";

const PinImage = ({ fileInfo }) => {
  let style = {};
  if (
    fileInfo.fileURL === "" ||
    fileInfo.fileURL === undefined ||
    fileInfo.fileURL === null ||
    fileInfo.fileURL === "Loading..."
  ) {
    style = {
      width: "100%",
      height: "500px",
      backgroundColor: "var(--blue030)",
      border: "none",
    };
  }
  return <img src={fileInfo.fileURL} alt={fileInfo.fileURL} style={style} />;
};

export default PinImage;
