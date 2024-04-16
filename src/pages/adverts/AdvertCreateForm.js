import React, { useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";

import Upload from "../../assets/upload.png";

import styles from "../../styles/AdvertCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Asset from "../../components/Asset";
import { Image } from "react-bootstrap";

function AdvertCreateForm() {
    const [advertData, setAdvertData] = useState({
        title: '',
        name: '',
        age: '',
        breed: '',
        sex: '',
        children: '',
        other_animals: '',
        content: '',
        image: '',
    });
    const {
        title,
        name,
        age,
        breed,
        sex,
        children,
        other_animals,
        content,
        image
    } = advertData;

    const [errors, setErrors] = useState({});

    const handleChange = (event) => {
        setAdvertData({
            ...advertData,
            [event.target.name]: event.target.value,
        });
    };

    const handleChangeImage = (event) => {
        if (event.target.files.length) {
            URL.revokeObjectURL(image);
            setAdvertData({
                ...advertData,
                image: URL.createObjectURL(event.target.files[0]),
            });
        }
    };

    const textFields = (
        <div className="text-center">
            <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Cat's Name</Form.Label>
                <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="text"
                    name="age"
                    value={age}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Breed</Form.Label>
                <Form.Control
                    type="text"
                    name="breed"
                    value={breed}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Sex</Form.Label>
                <Form.Control
                    type="text"
                    name="sex"
                    value={sex}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Behaviour around children</Form.Label>
                <Form.Control
                    type="text"
                    name="children"
                    value={children}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Behaviour around animals</Form.Label>
                <Form.Control
                    type="text"
                    name="other_animals"
                    value={other_animals}
                    onChange={handleChange}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Additional Information</Form.Label>
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
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Purple}`} type="submit">
                create
            </Button>
        </div>
    );

    return (
        <Form>
            <Row>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
                            {image ? (
                                <>
                                    <figure>
                                        <Image
                                            className={appStyles.Image}
                                            src={image}
                                            rounded
                                        />
                                    </figure>
                                    <div>
                                        <Form.Label
                                        className={`${btnStyles.Button} ${btnStyles.Purple} btn`}
                                        htmlFor="image-upload"
                                        >
                                            Select Different Image
                                        </Form.Label>
                                    </div>
                                </>
                            ) : (
                                <Form.Label
                                    className="d-flex justify-content-center"
                                    htmlFor="image-upload"
                                >
                                    <Asset src={Upload} message="Tap to upload your image" />
                                </Form.Label>
                            )}

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                            />

                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default AdvertCreateForm;