import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import { useHistory } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";

function AdoptionCreateForm() {
    const [errors, setErrors] = useState({});

    const [adoptionData, setAdoptionData] = useState({
        name: '',
        email: '',
        mobile: '',
        content: '',
    });
    const {
        name,
        email,
        mobile,
        content,
    } = adoptionData;

    const history = useHistory();

    const handleChange = (event) => {
        setAdoptionData({
            ...adoptionData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault()
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('content', content);

        try {
            const {data} = await axiosReq.post('/adoptions/', formData);
            history.push(`/adoptions/${data.id}`)
        } catch (err) {
            console.log(err)
            if (err.response?.status !== 401){
                setErrors(err.response?.data)
            }
        }
    }

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="text"
                    name="mobile"
                    value={mobile}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Content</Form.Label>
                <Form.Control
                    as="textarea"
                    rows={4}
                    name="content"
                    value={content}
                    onChange={handleChange}
                />
            </Form.Group>

            <Button
                className={`${btnStyles.Button} ${btnStyles.Purple}`}
                onClick={() => { }}
            >
                Cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Purple}`} type="submit">
                Submit Request
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={12}>
                    <Container className={`${appStyles.Content}`}>
                        {textFields}
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default AdoptionCreateForm;