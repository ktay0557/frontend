import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";

import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";

function AdoptionCreateForm() {
    const [errors, setErrors] = useState({});
    const [adoptionData, setAdoptionData] = useState({
        name: '',
        email: '',
        mobile: '',
        content: '',
        advert_id: '',
    });

    const {
        name,
        email,
        mobile,
        content,
        advert_id,
    } = adoptionData;


    const [adverts, setAdverts] = useState([]);

    const history = useHistory();

    // Fetch adverts
    useEffect(() => {
        const fetchAdverts = async () => {
            try {
                const response = await axiosReq.get('/adverts/');
                setAdverts(response.data.results);
            } catch (error) {
                console.error('Error fetching adverts:', error);
            }
        };
        fetchAdverts();
    }, []);

    // Handle form change
    const handleChange = (event) => {
        setAdoptionData({
            ...adoptionData,
            [event.target.name]: event.target.value,
        });
    };

    // Handle form submission
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('name', name);
        formData.append('email', email);
        formData.append('mobile', mobile);
        formData.append('content', content);
        formData.append('advert_id', advert_id);

        try {
            await axiosReq.post('/adoptions/', formData);
            toast.success(
                "Adoption Query Sent, we will be in touch within 3 working days.",
                { position: "top-center" }
            );
            history.push("/");
        } catch (err) {
            // console.log(err);
            toast.error(
                "Adoption Query not sent. Please try again",
                { position: "top-center" }
            );
            if (err.response?.status !== 401) {
                setErrors(err.response?.data);
            }
        }
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col className="py-2 p-0 p-md-2" md={12}>
                    <Container className={`${appStyles.Content}`}>
                        <Form.Group>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={name}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.name?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={email}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.email?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Mobile</Form.Label>
                            <Form.Control
                                type="text"
                                name="mobile"
                                value={mobile}
                                onChange={handleChange}
                            />
                        </Form.Group>
                        {errors.mobile?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

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
                        {errors.content?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <Form.Group>
                            <Form.Label>Select an Advert</Form.Label>
                            <Form.Control
                                as="select"
                                name="advert_id"
                                value={advert_id}
                                onChange={handleChange}
                            >
                                <option value="">Select an advert...</option>
                                {adverts.map((advert) => (
                                    <option key={advert.id} value={advert.id}>
                                        {advert.title}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                        {errors.advert_id?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}

                        <Button
                            className={`${btnStyles.Button} ${btnStyles.Purple}`}
                            onClick={() => history.goBack()}
                        >
                            Cancel
                        </Button>
                        <Button className={`${btnStyles.Button} ${btnStyles.Purple}`} type="submit">
                            Submit Request
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}

                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default AdoptionCreateForm;
