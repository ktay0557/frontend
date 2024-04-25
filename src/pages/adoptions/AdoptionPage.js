import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

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
        console.log(adoption);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Please reply to adoption queries as soon as possible</p>
        <p>Post component</p>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        The cats need us!
      </Col>
    </Row>
  );
}

export default AdoptionPage;