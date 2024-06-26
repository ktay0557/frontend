import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useHistory, useParams } from "react-router-dom";

import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import btnStyles from "../../styles/Button.module.css";
import appStyles from "../../App.module.css";

import { axiosRes } from "../../api/axiosDefaults";

const UserPasswordForm = () => {
    const history = useHistory();
    const { id } = useParams();
    const currentUser = useCurrentUser();

    const [userData, setUserData] = useState({
        new_password1: "",
        new_password2: "",
    });
    const { new_password1, new_password2 } = userData;

    const [errors, setErrors] = useState({});

    // Handle form changes
    const handleChange = (event) => {
        setUserData({
            ...userData,
            [event.target.name]: event.target.value,
        });
    };

    useEffect(() => {
        if (currentUser?.profile_id?.toString() !== id) {
            // redirect user if they are not the owner of this profile
            history.push("/");
        }
    }, [currentUser, history, id]);

    // Handle form submissions
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axiosRes.post("/dj-rest-auth/password/change/", userData);
            history.goBack();
            toast.success("Password updated!", { position: "top-center" });
        } catch (err) {
            // console.log(err);
            toast.error("Password could not be updated. Please try again", { position: "top-center" });
            setErrors(err.response?.data);
        }
    };

    return (
        <Row>
            <Col className="py-2 mx-auto text-center" md={6}>
                <Container className={appStyles.Content}>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>New Password</Form.Label>
                            <Form.Control
                                placeholder="new password"
                                type="password"
                                value={new_password1}
                                onChange={handleChange}
                                name="new_password1"
                            />
                        </Form.Group>
                        {errors?.new_password1?.map((message, idx) => (
                            <Alert key={idx} variant="warning">
                                {message}
                            </Alert>
                        ))}
                        <Form.Group>
                            <Form.Label>Confirm New Password</Form.Label>
                            <Form.Control
                                placeholder="confirm new password"
                                type="password"
                                value={new_password2}
                                onChange={handleChange}
                                name="new_password2"
                            />
                        </Form.Group>
                        {errors?.new_password2?.map((message, idx) => (
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
                        <Button
                            type="submit"
                            className={`${btnStyles.Button} ${btnStyles.Purple}`}
                        >
                            Save
                        </Button>
                        {errors.non_field_errors?.map((message, idx) => (
                            <Alert key={idx} variant="warning" className="mt-3">
                                {message}
                            </Alert>
                        ))}
                    </Form>
                </Container>
            </Col>
        </Row>
    );
};

export default UserPasswordForm;