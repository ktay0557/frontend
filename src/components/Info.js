import React from "react";
import styles from "../styles/Info.module.css";
import Container from "react-bootstrap/Container";

const Info = ({ mobile }) => {
    return (
        <Container
            className={`${styles.Content} ${mobile && 'd-lg-none text-center mb-3'
                }`}
        >
            <p>
                There are currently around a quarter of a million cats
                without a forever home in the UK. <br />
                Lets work together to reduce those numbers.
            </p>
        </Container>
    )
}

export default Info;