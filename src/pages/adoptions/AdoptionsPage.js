import React from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/AdoptionsPage.module.css";

function AdoptionsPage() {
  
  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Please try to reply to adoption queries as soon as possible</p>
        <p>List of adoption queries here</p>
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>The cats need us!</p>
      </Col>
    </Row>
  );
}

export default AdoptionsPage;