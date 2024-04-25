import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Adoption from "./Adoption";
import Asset from "../../components/Asset";

import appStyles from "../../App.module.css";
import styles from "../../styles/AdoptionsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

import NoResults from "../../assets/no-results.png";

function AdoptionsPage({ message, filter = "" }) {
    const [adoptions, setAdoptions] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const { data } = await axiosReq.get(`/adoptions/?${filter}`);
                setAdoptions(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchAdoptions();
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>Please try to reply to adoption queries as soon as possible</p>
                {hasLoaded ? (
                    <>
                        {adoptions.results.length ? (
                            adoptions.results.map((adoption) => (
                                <Adoption key={adoption.id} {...adoption} setAdoptions={setAdoptions} />
                            ))
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container className={appStyles.Content}>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>The cats need us!</p>
            </Col>
        </Row>
    );
}

export default AdoptionsPage;