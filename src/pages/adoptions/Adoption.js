import React from "react";
import styles from "../../styles/Adoption.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import { Link, useHistory } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import { MoreDropdownStaff } from "../../components/MoreDropdownStaff";

const Adoption = (props) => {
    const {
        id,
        profile_id,
        profile_image,
        created_at,
        advert_id,
        name,
        email,
        mobile,
        content,
        adoptionPage,
    } = props;

    const currentUser = useCurrentUser();
    const isAdminUser = currentUser && currentUser.is_staff_user;
    const history = useHistory();

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/adoptions/${id}/`);
            history.goBack();
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Card className={styles.Adoption}>
            <Card.Body>
                <Media className="align-items-center justify-content-between">
                    <Link to={`/profiles/${profile_id}`}>
                        <Avatar src={profile_image} height={55} />
                    </Link>
                    <div className="d-flex align-items-center">
                        <span>{created_at}</span>
                        {isAdminUser && adoptionPage &&
                            <MoreDropdownStaff
                                handleDelete={handleDelete}
                            />
                        }
                    </div>
                </Media>
            </Card.Body>
            <Link to={`/adoptions/${id}`}>
                <Card.Text>{name}</Card.Text>
            </Link>
            <Card.Body>
                {advert_id && <Card.Title className="text-center">{advert_id}</Card.Title>}
                {email && <Card.Text>{email}</Card.Text>}
                {mobile && <Card.Text>{mobile}</Card.Text>}
                {content && <Card.Text>{content}</Card.Text>}
            </Card.Body>
        </Card>
    );
};

export default Adoption;