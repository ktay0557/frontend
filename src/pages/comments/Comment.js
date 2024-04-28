import React, { useState } from "react";
import { toast } from "react-toastify";

import Media from "react-bootstrap/Media";

import styles from "../../styles/Comment.module.css";
import Avatar from "../../components/Avatar";
import { MoreDropdown } from "../../components/MoreDropdown";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import CommentEditForm from "./CommentEditForm";

import { axiosRes } from "../../api/axiosDefaults";

const Comment = (props) => {
    const {
        profile_id,
        profile_image,
        owner,
        updated_at,
        content,
        id,
        setAdvert,
        setComments,
    } = props;

    const [showEditForm, setShowEditForm] = useState(false);

    const currentUser = useCurrentUser();
    const is_owner = currentUser?.username === owner;

    // Handle comment deletion
    const handleDelete = async () => {
        try {
            await axiosRes.delete(`/comments/${id}/`);
            setAdvert(prevAdvert => ({
                results: [{
                    ...prevAdvert.results[0],
                    comments_count: prevAdvert.results[0].comments_count - 1,
                },
                ],
            }));
            toast.success("Comment deleted successfully", {position: "top-center"});
            setComments((prevComments) => ({
                ...prevComments,
                results: prevComments.results.filter((comment) => comment.id !== id),
            }));
        } catch (err) {
            // console.log(err);
        };
    };

    return (
        <>
            <hr />
            <Media>
                <Avatar src={profile_image} />
                <Media.Body className="align-self-center ml-2">
                    <span className={styles.Owner}>{owner}</span>
                    <span className={styles.Date}>{updated_at}</span>
                    {showEditForm ? (
                        <CommentEditForm
                            id={id}
                            profile_id={profile_id}
                            content={content}
                            profileImage={profile_image}
                            setComments={setComments}
                            setShowEditForm={setShowEditForm}
                        />
                    ) : (
                        <p>{content}</p>
                    )}
                </Media.Body>
                {is_owner && !showEditForm && (
                    <MoreDropdown
                        handleEdit={() => setShowEditForm(true)}
                        handleDelete={handleDelete}
                    />
                )}
            </Media>
        </>
    );
};

export default Comment;