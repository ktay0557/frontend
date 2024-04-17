import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AdvertsPage.module.css";
import { useLocation } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Advert from "./Advert";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

function AdvertsPage({ message, filter = "" }) {
    const [adverts, setAdverts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const { data } = await axiosReq.get(`/adverts/?${filter}`);
                setAdverts(data);
                setHasLoaded(true);
            } catch (err) {
                console.log(err);
            }
        };

        setHasLoaded(false);
        fetchAdverts();
    }, [filter, pathname]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <p>
                    There are currently around a quarter of a million cats
                    without a forever home in the UK. Why don't you see if you
                    can help us reduce that number.
                </p>
                {hasLoaded ? (
                    <>
                        {adverts.results.length ? (
                            adverts.results.map(advert => (
                                <Advert key={advert.id} {...advert} setAdverts={setAdverts} />
                            ))
                        ) : (
                            <Container className={appStyles.Content}>
                                <Asset src={NoResults} message={message} />
                            </Container>
                        )}
                    </>
                ) : (
                    <Container>
                        <Asset spinner />
                    </Container>
                )}
            </Col>
            <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
                <p>
                    There are currently around a quarter of a million cats
                    without a forever home in the UK. Why don't you see if you
                    can help us reduce that number.
                </p>
            </Col>
        </Row>
    );
}

export default AdvertsPage;