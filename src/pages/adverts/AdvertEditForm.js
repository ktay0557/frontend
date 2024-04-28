import React, { useEffect, useRef, useState } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import styles from "../../styles/AdvertCreateEditForm.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";
import Image from "react-bootstrap/Image";
import { useHistory } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import { toast } from "react-toastify";
import { useParams } from "react-router";

function AdvertEditForm() {
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

    const imageInput = useRef(null);
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        const handleMount = async () => {
            try {
                const { data } = await axiosReq.get(`/adverts/${id}/`);
                const {
                    title,
                    name,
                    age,
                    breed,
                    sex,
                    children,
                    other_animals,
                    content,
                    image,
                    is_owner
                } = data;

                is_owner ? setAdvertData({
                        title,
                        name,
                        age,
                        breed,
                        sex,
                        children,
                        other_animals,
                        content,
                        image
                    }) : history.push("/");
            } catch (err) { 
                // console.log(err);
            }
        };

        handleMount();
    }, [history, id]);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('name', name);
        formData.append('age', age);
        formData.append('breed', breed);
        formData.append('sex', sex);
        formData.append('children', children);
        formData.append('other_animals', other_animals);
        formData.append('content', content);

        if (imageInput?.current?.files[0]) {
            formData.append('image', imageInput.current.files[0]);
        }

        try {
            await axiosReq.put(`/adverts/${id}/`, formData);
            history.push(`/adverts/${id}`);
            toast.success("Advert updated successfully!", { position: "top-center" });
        } catch (err) {
            if (err.response?.status !== 404) {
                toast.error("Could not update. Please try again", { position: "top-center" });
                setErrors(err.response?.data);
            }
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
                onClick={() => history.goBack()}
            >
                cancel
            </Button>
            <Button className={`${btnStyles.Button} ${btnStyles.Purple}`} type="submit">
                update
            </Button>
        </div>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={5} lg={4} className="d-none d-md-block p-0 p-md-2">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
                <Col className="py-2 p-0 p-md-2" md={7} lg={8}>
                    <Container
                        className={`${appStyles.Content} ${styles.Container} d-flex flex-column justify-content-center`}
                    >
                        <Form.Group className="text-center">
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
                                            Update Image
                                        </Form.Label>
                                    </div>

                            <Form.File
                                id="image-upload"
                                accept="image/*"
                                onChange={handleChangeImage}
                                ref={imageInput}
                            />

                        </Form.Group>
                        {errors?.image?.map((message, idx) => (
                            <Alert variant="warning" key={idx}>
                                {message}
                            </Alert>
                        ))}
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
}

export default AdvertEditForm;