import React from "react";

import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import styles from "../../styles/About.module.css";

// Provides About info for the users to see
const About = () => {
    return (
        <Container className={styles.About}>
            <Row className="justify-content-center">
                <Col lg={8} className="text-center">
                    <h1>About Purrfect Matches</h1>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col lg={8} className="text-center">
                    <p>
                        Purrfect Matches helps connect stray cats with their forever humans.
                        Every cat brought in to us is given a health check. The health check 
                        ensures they are free from fleas, worms, ticks, and any other parasites.
                        It also makes sure they are up to date on their vaccinations and are 
                        spayed/neutered. This means that when they are finally ready to go to their 
                        forever home, they can do so happy and healthy.
                    </p>
                    <hr />
                    <p>
                        Please feel free to browse the cats we currently have in our care.
                        If any call out to you, don't hesitate to register for free to be able
                        to enquire over adopting the little cutie, or letting us know of any 
                        queries you may have.
                    </p>
                    <hr />
                    <p>
                        We look forward to helping you find your Purrfect Match!
                    </p>
                </Col>
            </Row>
        </Container>
    )
};

export default About;