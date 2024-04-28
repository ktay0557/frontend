import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Adoption from "./Adoption";
import Info from "../../components/Info";

function AdoptionPage() {
    const { id } = useParams();
    const [adoption, setAdoption] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: adoption }] = await Promise.all([
                    axiosReq.get(`/adoptions/${id}`),
                ]);
                setAdoption({ results: [adoption] });
            } catch (err) {
                // console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Info mobile />
                <Adoption {...adoption.results[0]} setAdoptions={setAdoption} adoptionPage />
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <Info />
            </Col>
        </Row>
    );
}

export default AdoptionPage;