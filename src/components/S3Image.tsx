import { useState, useEffect } from "react";
import { Storage } from "aws-amplify";
import Image from "next/image";
import { LoadingState } from "./LoadingState";

export const S3Image = ({ imgKey, alt }) => {
  const [img, setImg] = useState("");
  async function fetchImageUrls(key) {
    const imgURI = await Storage.get(key);
    setImg(imgURI);
  }
  useEffect(() => {
    fetchImageUrls(imgKey);
  }, [imgKey]);

  const Component = img ? (
    <Image src={img} alt={alt} width={600} height={400} />
  ) : (
    <LoadingState height={400} width={600} />
  );

  return Component;
};
