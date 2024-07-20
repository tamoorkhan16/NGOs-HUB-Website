import React, { useState } from "react";
import LoaderForImage from "./LoaderForImage";


const ImageLoader = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);

  const handleImageLoad = () => {
    setLoaded(true);
  };

  return (
    <div className="image-loader">
      {!loaded && <div className="loader"><LoaderForImage/></div>}
      <img
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        style={{ display: loaded ? "block" : "none" }}
      />
    </div>
  );
};

export default ImageLoader;
