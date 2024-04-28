import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import Adoption from "./Adoption";
import Asset from "../../components/Asset";
import appStyles from "../../App.module.css";
import styles from "../../styles/AdoptionsPage.module.css";
import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import { fetchMoreData } from "../../utils/utils";
import Info from "../../components/Info";

import { axiosReq } from "../../api/axiosDefaults";

function AdoptionsPage({ message, filter = "" }) {
    const [adoptions, setAdoptions] = useState({ results: [] });
    const [hasLoaded, setHasLoaded] = useState(false);
    const { pathname } = useLocation();

    const [query, setQuery] = useState("");

    useEffect(() => {
        const fetchAdoptions = async () => {
            try {
                const { data } = await axiosReq.get(`/adoptions/?${filter}search=${query}`);
                setAdoptions(data);
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };

        setHasLoaded(false);
        const timer = setTimeout(() => {
            fetchAdoptions();
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [filter, query, pathname]);

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
                        placeholder="Search Adoption Queries"
                        value={query}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                </Form>
                {hasLoaded ? (
                    <>
                        {adoptions.results.length ? (
                            <InfiniteScroll
                                children={
                                    adoptions.results.map(adoption => (
                                        <Adoption key={adoption.id} {...adoption} setAdoptions={setAdoptions} />
                                    ))
                                }
                                dataLength={adoptions.results.length}
                                loader={<Asset spinner />}
                                hasMore={!!adoptions.next}
                                next={() => fetchMoreData(adoptions, setAdoptions)}
                            />
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
                <Info />
            </Col>
        </Row>
    );
}

export default AdoptionsPage;