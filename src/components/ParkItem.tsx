import React from "react";
import { S3Image } from "./S3Image";
export const ParkItem = ({ park }) => {
  return (
    <div style={{ margin: "2rem auto" }}>
      <h3 style={{ marginBottom: "1rem" }}>{park.name}</h3>
      <S3Image imgKey={park.image.key} alt={park.name} />
    </div>
  );
};
