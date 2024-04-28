import React from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import appStyles from "../../App.module.css";
import styles from "../../styles/Advert.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { MoreDropdown } from "../../components/MoreDropdown";

import { axiosRes } from "../../api/axiosDefaults";

const Advert = (props) => {
    const {
        id,
        owner,
        updated_at,
        title,
        name,
        age,
        breed,
        sex,
        children,
        other_animals,
        content,
        image,
        like_id,
        likes_count,
        comments_count,
        advertPage,
        setAdverts,
    } = props;

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;
    const history = useHistory();

    const handleEdit = () => {
        history.push(`/adverts/${id}/edit`);
    };

    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/adverts/${id}/`);
            toast.success("Advert deleted successfully", {position: "top-center"})
            history.goBack();
        } catch (err) {
            // console.log(err);
        }
    };

    const handleLike = async () => {
        try {
            const { data } = await axiosRes.post("/likes/", { advert: id });
            setAdverts((prevAdverts) => ({
                ...prevAdverts,
                results: prevAdverts.results.map((advert) => {
                    return advert.id === id
                        ? { ...advert, likes_count: advert.likes_count + 1, like_id: data.id }
                        : advert;
                }),
            }));
        } catch (err) {
            // console.log(err);
        }
    };

    const handleUnlike = async () => {
        try {
            await axiosRes.delete(`/likes/${like_id}/`);
            setAdverts((prevAdverts) => ({
                ...prevAdverts,
                results: prevAdverts.results.map((advert) => {
                    return advert.id === id
                        ? { ...advert, likes_count: advert.likes_count - 1, like_id: null }
                        : advert;
                }),
            }));
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
                        <div className="d-flex align-items-center">
                            <Card.Title className={`${styles.CardTitle}`}>{title}</Card.Title>
                        </div>
                        {is_owner && advertPage &&
                            <MoreDropdown
                                handleEdit={handleEdit}
                                handleDelete={handleDelete}
                            />
                        }
                    </Media>
                    <Link to={`/adverts/${id}`}>
                        <Card.Img src={image} alt={title} />
                    </Link>
                </Card.Body>
                <Card.Body>
                    {name &&
                        <Card.Text className="text-left">
                            <strong>Name:</strong> {name}
                        </Card.Text>}
                    {age &&
                        <Card.Text className="text-left">
                            <strong>Age:</strong> {age}
                        </Card.Text>}
                    {breed &&
                        <Card.Text className="text-left">
                            <strong>Breed:</strong> {breed}
                        </Card.Text>}
                    {sex &&
                        <Card.Text className="text-left">
                            <strong>Sex:</strong> {sex}</Card.Text>}
                    {children &&
                        <Card.Text className="text-left">
                            <strong>Behaviour with children:</strong> {children}
                        </Card.Text>}
                    {other_animals &&
                        <Card.Text className="text-left">
                            <strong>Behaviour with animals:</strong> {other_animals}
                        </Card.Text>}
                    {content &&
                        <Card.Text className="text-left">
                            <strong>Additional Infomation:</strong> {content}
                        </Card.Text>}
                </Card.Body>
                <div className={styles.AdvertBar}>
                    {is_owner ? (
                        <OverlayTrigger
                            placement="top"
                            overlay={<Tooltip>You cannot like what you create</Tooltip>}
                        >
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    ) : like_id ? (
                        <span onClick={handleUnlike}>
                            <i className={`fas fa-heart ${styles.Heart}`} />
                        </span>
                    ) : currentUser ? (
                        <span onClick={handleLike}>
                            <i className={`fas fa-heart ${styles.HeartOutline}`} />
                        </span>
                    ) : (
                        <OverlayTrigger placement="top" overlay={<Tooltip>Log in to like!</Tooltip>}>
                            <i className="far fa-heart" />
                        </OverlayTrigger>
                    )}
                    {likes_count}
                    <Link to={`/adverts/${id}`}>
                        <i className="far fa-comments" />
                    </Link>
                    {comments_count}
                    <hr />
                    <span>{updated_at}</span>
                </div>
            </Card>
        </>
    );
};

export default Advert;