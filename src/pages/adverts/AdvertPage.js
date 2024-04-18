import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router";
import { axiosReq } from "../../api/axiosDefaults";
import Advert from "./Advert";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function AdvertPage() {
    const { id } = useParams();
    const [advert, setAdvert] = useState({ results: [] });
    const currentUser = useCurrentUser();
    const profile_image = currentUser?.profile_image;
    const [comments, setComments] = useState({ results: [] });

    useEffect(() => {
        const handleMount = async () => {
            try {
                const [{ data: advert }] = await Promise.all([
                    axiosReq.get(`/adverts/${id}`),
                ]);
                setAdvert({ results: [advert] })
                console.log(advert)
            } catch (err) {
                console.log(err);
            }
        };

        handleMount();
    }, [id]);

    return (
        <Row className="h-100">
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Advert {...advert.results[0]} setAdverts={setAdvert} advertPage />
            </Col>
            <Col>
                <Container className={appStyles.Content}>
                    {currentUser ? (
                        <CommentCreateForm
                            profile_id={currentUser.profile_id}
                            profileImage={profile_image}
                            advert={id}
                            setAdvert={setAdvert}
                            setComments={setComments}
                        />
                    ) : comments.results.length ? (
                        "Comments"
                    ) : null}
                </Container>
            </Col>
        </Row>
    );
}

export default AdvertPage;