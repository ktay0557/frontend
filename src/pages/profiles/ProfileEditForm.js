import React, { useState, useEffect, useRef } from "react";
import { useHistory, useParams } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Alert from "react-bootstrap/Alert";

import { axiosReq } from "../../api/axiosDefaults";
import {
    useCurrentUser,
    useSetCurrentUser,
} from "../../contexts/CurrentUserContext";

import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

const ProfileEditForm = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    const { id } = useParams();
    const history = useHistory();
    const imageFile = useRef();

    const [profileData, setProfileData] = useState({
        name: "",
        age: "",
        email: "",
        mobile: "",
        location: "",
        previously_owned: "",
        currently_own: "",
        relationship_status: "",
        children: "",
        housing: "",
        hobbies: "",
        preferred_breed: "",
        preferred_age: "",
        preferred_sex: "",
        image: "",
    });
    const {
        name,
        age,
        email,
        mobile,
        location,
        previously_owned,
        currently_own,
        relationship_status,
        children,
        housing,
        hobbies,
        preferred_breed,
        preferred_age,
        preferred_sex,
        image
    } = profileData;

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const handleMount = async () => {
            if (currentUser?.profile_id?.toString() === id) {
                try {
                    const { data } = await axiosReq.get(`/profiles/${id}/`);
                    const {
                        name,
                        age,
                        email,
                        mobile,
                        location,
                        previously_owned,
                        currently_own,
                        relationship_status,
                        children,
                        housing,
                        hobbies,
                        preferred_breed,
                        preferred_age,
                        preferred_sex,
                        image
                    } = data;
                    setProfileData({
                        name,
                        age,
                        email,
                        mobile,
                        location,
                        previously_owned,
                        currently_own,
                        relationship_status,
                        children,
                        housing,
                        hobbies,
                        preferred_breed,
                        preferred_age,
                        preferred_sex,
                        image
                    });
                } catch (err) {
                    console.log(err);
                    history.push("/");
                }
            } else {
                history.push("/");
            }
        };

        handleMount();
    }, [currentUser, history, id]);

    const handleChange = (event) => {
        setProfileData({
            ...profileData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", name);
        formData.append("age", age);
        formData.append("email", email);
        formData.append("mobile", mobile);
        formData.append("location", location);
        formData.append("previously_owned", previously_owned);
        formData.append("currently_own", currently_own);
        formData.append("relationship_status", relationship_status);
        formData.append("children", children);
        formData.append("housing", housing);
        formData.append("hobbies", hobbies);
        formData.append("preferred_breed", preferred_breed);
        formData.append("preferred_age", preferred_age);
        formData.append("preferred_sex", preferred_sex);

        if (imageFile?.current?.files[0]) {
            formData.append("image", imageFile?.current?.files[0]);
        }

        try {
            const { data } = await axiosReq.put(`/profiles/${id}/`, formData);
            setCurrentUser((currentUser) => ({
                ...currentUser,
                profile_image: data.image,
            }));
            history.goBack();
        } catch (err) {
            console.log(err);
            setErrors(err.response?.data);
        }
    };

    const textFields = (
        <>
            <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                    type="text"
                    value={name}
                    onChange={handleChange}
                    name="name"
                />
            </Form.Group>
            {errors?.name?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Age</Form.Label>
                <Form.Control
                    type="integer"
                    value={age}
                    onChange={handleChange}
                    name="age"
                />
            </Form.Group>
            {errors?.age?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                    type="email"
                    value={email}
                    onChange={handleChange}
                    name="email"
                />
            </Form.Group>
            {errors?.email?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Mobile</Form.Label>
                <Form.Control
                    type="text"
                    value={mobile}
                    onChange={handleChange}
                    name="mobile"
                />
            </Form.Group>
            {errors?.mobile?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Location</Form.Label>
                <Form.Control
                    type="text"
                    value={location}
                    onChange={handleChange}
                    name="location"
                />
            </Form.Group>
            {errors?.location?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Previous Pets</Form.Label>
                <Form.Control
                    type="text"
                    value={previously_owned}
                    onChange={handleChange}
                    name="previously_owned"
                />
            </Form.Group>
            {errors?.previously_owned?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Current Pets</Form.Label>
                <Form.Control
                    type="text"
                    value={currently_own}
                    onChange={handleChange}
                    name="currently_own"
                />
            </Form.Group>
            {errors?.currently_own?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Relationship Status</Form.Label>
                <Form.Control
                    type="text"
                    value={relationship_status}
                    onChange={handleChange}
                    name="relationship_status"
                />
            </Form.Group>
            {errors?.relationship_status?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Children in the home</Form.Label>
                <Form.Control
                    type="text"
                    value={children}
                    onChange={handleChange}
                    name="children"
                />
            </Form.Group>
            {errors?.children?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Housing Situation</Form.Label>
                <Form.Control
                    type="text"
                    value={housing}
                    onChange={handleChange}
                    name="housing"
                />
            </Form.Group>
            {errors?.housing?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Hobbies</Form.Label>
                <Form.Control
                    type="text"
                    value={hobbies}
                    onChange={handleChange}
                    name="hobbies"
                />
            </Form.Group>
            {errors?.hobbies?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Preferred Breed</Form.Label>
                <Form.Control
                    type="text"
                    value={preferred_breed}
                    onChange={handleChange}
                    name="preferred_breed"
                />
            </Form.Group>
            {errors?.preferred_breed?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Preferred Age</Form.Label>
                <Form.Control
                    type="text"
                    value={preferred_age}
                    onChange={handleChange}
                    name="preferred_age"
                />
            </Form.Group>
            {errors?.preferred_age?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
                    {message}
                </Alert>
            ))}
            <Form.Group>
                <Form.Label>Preferred Sex</Form.Label>
                <Form.Control
                    type="text"
                    value={preferred_sex}
                    onChange={handleChange}
                    name="preferred_sex"
                />
            </Form.Group>
            {errors?.preferred_sex?.map((message, idx) => (
                <Alert variant="warning" key={idx}>
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
                Save
            </Button>
        </>
    );

    return (
        <Form onSubmit={handleSubmit}>
            <Row>
                <Col md={5} lg={6} className="d-none d-md-block p-0 p-md-2 text-center">
                    <Container className={appStyles.Content}>{textFields}</Container>
                </Col>
                <Col className="py-2 p-0 p-md-2 text-center" md={7} lg={6}>
                    <Container className={appStyles.Content}>
                        <Form.Group>
                            {image && (
                                <figure>
                                    <Image src={image} fluid />
                                </figure>
                            )}
                            {errors?.image?.map((message, idx) => (
                                <Alert variant="warning" key={idx}>
                                    {message}
                                </Alert>
                            ))}
                            <div>
                                <Form.Label
                                    className={`${btnStyles.Button} ${btnStyles.Blue} btn my-auto`}
                                    htmlFor="image-upload"
                                >
                                    Change Profile Image
                                </Form.Label>
                            </div>
                            <Form.File
                                id="image-upload"
                                ref={imageFile}
                                accept="image/*"
                                onChange={(e) => {
                                    if (e.target.files.length) {
                                        setProfileData({
                                            ...profileData,
                                            image: URL.createObjectURL(e.target.files[0]),
                                        });
                                    }
                                }}
                            />
                        </Form.Group>
                        <div className="d-md-none">{textFields}</div>
                    </Container>
                </Col>
            </Row>
        </Form>
    );
};

export default ProfileEditForm;