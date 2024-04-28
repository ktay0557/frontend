import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import InfiniteScroll from "react-infinite-scroll-component";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AdvertsPage.module.css";
import Advert from "./Advert";
import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import Info from "../../components/Info";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import { axiosReq } from "../../api/axiosDefaults";

function AdvertsPage({ message, filter = "" }) {
    const [adverts, setAdverts] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    const currentUser = useCurrentUser();

    // Fetch adverts
    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const { data } = await axiosReq.get(`/adverts/?${filter}search=${query}`);
                setAdverts(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchAdverts();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname, currentUser]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Info mobile />
                <i className={`fas fa-search ${styles.SearchIcon}`} />
                <Form
                    className={styles.SearchBar}
                    onSubmit={(event) => event.preventDefault()}
                >
                    <Form.Control
                        type="text"
                        className="mr-sm-2"
                        placeholder="Search Our Cats"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </Form>
                {hasLoaded ? (
                    <>
                        {adverts.results.length ? (
                            <InfiniteScroll 
                                children={
                                    adverts.results.map(advert => (
                                        <Advert key={advert.id} {...advert} setAdverts={setAdverts} />
                                    ))
                                }
                                dataLength={adverts.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!adverts.next}
                                next={() => fetchMoreData(adverts, setAdverts)}
                            />

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
                <Info />
            </Col>
        </Row>
    );
}

export default AdvertsPage;