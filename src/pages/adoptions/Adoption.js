import React from "react";
import { toast } from "react-toastify";
import { Link, useHistory } from "react-router-dom";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";

import styles from "../../styles/Adoption.module.css";
import appStyles from "../../App.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Avatar from "../../components/Avatar";
import { MoreDropdownStaff } from "../../components/MoreDropdown";

import { axiosRes } from "../../api/axiosDefaults";

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
            toast.success("Deletion Successful", {position: "top-center"});
        } catch (err) {
            // console.log(err);
        }
    };

    return (
        <>
            <hr />
            <Card className={appStyles.Content}>
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
                <Card.Body>
                    <Link to={`/adoptions/${id}`}>
                        <Card.Text className="text-left">
                            <strong>Name:</strong> {name}
                        </Card.Text>
                    </Link>
                </Card.Body>
                <Card.Body>
                    {advert_id && <Card.Title className={`${styles.CardTitle}`}>{advert_id}</Card.Title>}
                    {email &&
                        <Card.Text className="text-left">
                            <strong>Email:</strong> {email}
                        </Card.Text>}
                    {mobile &&
                        <Card.Text className="text-left">
                            <strong>Mobile:</strong> {mobile}
                        </Card.Text>}
                    {content &&
                        <Card.Text className="text-left">
                            <strong>Adoption Query:</strong> {content}
                        </Card.Text>}
                </Card.Body>
            </Card>
        </>
    );
};

export default Adoption;