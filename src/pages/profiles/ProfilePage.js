import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import Asset from "../../components/Asset";
import { ProfileEditDropdown } from "../../components/MoreDropdown";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import Info from "../../components/Info";
import {
    useProfileData,
    useSetProfileData
} from "../../contexts/ProfileDataContext";

import { axiosReq } from "../../api/axiosDefaults";

function ProfilePage() {
    const [hasLoaded, setHasLoaded] = useState(false);
    const { id } = useParams();
    const setProfileData = useSetProfileData();
    const { pageProfile } = useProfileData();
    const [profile] = pageProfile.results;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [{ data: pageProfile }] = await Promise.all([
                    axiosReq.get(`/profiles/${id}/`),
                ]);
                setProfileData((prevState) => ({
                    ...prevState,
                    pageProfile: { results: [pageProfile] },
                }));
                setHasLoaded(true);
            } catch (err) {
                // console.log(err);
            }
        };
        fetchData();
    }, [id, setProfileData]);

    const mainProfile = (
        <>
            {profile?.is_owner && <ProfileEditDropdown id={profile?.id} />}
            <Row noGutters className="px-3 text-center">
                <Col lg={3} className="text-lg-left">
                    <Image
                        className={styles.ProfileImage}
                        roundedCircle
                        src={profile?.image}
                    />
                </Col>
                <Col lg={6}>
                    <h3 className="m-2">{profile?.owner}</h3>
                </Col>
            </Row>
        </>
    );

    const mainProfileDetails = (
        <>
            <hr />
            <p className="text-center"><strong>Name:</strong> {profile?.name}</p>
            <p className="text-center"><strong>Age:</strong> {profile?.age}</p>
            <p className="text-center"><strong>Email:</strong> {profile?.email}</p>
            <p className="text-center"><strong>Mobile:</strong> {profile?.mobile}</p>
            <p className="text-center"><strong>Location:</strong> {profile?.location}</p>
            <p className="text-center"><strong>Previous Pets:</strong> {profile?.previously_owned}</p>
            <p className="text-center"><strong>Current Pets:</strong> {profile?.currently_own}</p>
            <p className="text-center"><strong>Relationship Status:</strong> {profile?.relationship_status}</p>
            <p className="text-center"><strong>Children:</strong> {profile?.children}</p>
            <p className="text-center"><strong>Housing:</strong> {profile?.housing}</p>
            <p className="text-center"><strong>Hobbies:</strong> {profile?.hobbies}</p>
            <p className="text-center"><strong>Preferred Breed:</strong> {profile?.preferred_breed}</p>
            <p className="text-center"><strong>Preferred Age:</strong> {profile?.preferred_age}</p>
            <p className="text-center"><strong>Preferred Sex:</strong> {profile?.preferred_sex}</p>
            <hr />
        </>
    );

    return (
        <Row>
            <Col className="py-2 p-0 p-lg-2" lg={8}>
                <Info mobile />
                <Container className={appStyles.Content}>
                    {hasLoaded ? (
                        <>
                            {mainProfile}
                            {mainProfileDetails}
                        </>
                    ) : (
                        <Asset spinner />
                    )}
                </Container>
            </Col>
            <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
                <Info />
            </Col>
        </Row>
    );
}

export default ProfilePage;