import React from "react";
import Spinner from "react-bootstrap/Spinner";
import styles from "../styles/Asset.module.css";

// Gives a multi-purpose component that can render combinations of props passed to it: 
// spinner, image, and message.
const Asset = ({ spinner, src, message }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && <Spinner animation="grow" variant="secondary" />}
      {src && <img src={src} alt={message} />}
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default Asset;