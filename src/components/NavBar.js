import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import logo from "../assets/logo.png";
import styles from "../styles/NavBar.module.css";
import { NavLink } from "react-router-dom";
import { useCurrentUser, useSetCurrentUser } from "../contexts/CurrentUserContext";
import Avatar from "./Avatar";
import { axiosReq } from "../api/axiosDefaults";
import { toast } from "react-toastify";
import UseClickOutsideToggle from "../hooks/UseClickOutsideToggle";

const NavBar = () => {
    const currentUser = useCurrentUser();
    const setCurrentUser = useSetCurrentUser();
    // const isAdminUser = currentUser && currentUser.is_staff;

    const { expanded, setExpanded, ref } = UseClickOutsideToggle();

    const handleSignOut = async () => {
        try {
            await axiosReq.post("dj-rest-auth/logout/");
            setCurrentUser(null);
            toast.success("Signed out successfully!", { position: "top-center" });
        } catch (err) {
            console.log(err);
        }
    };

    const isAdminIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/adverts/create"
            >
                <i class="fa-regular fa-square-plus"></i>Create Advert
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/adoptions"
            >
                <i class="fa-solid fa-list"></i>Adoption Submissions
            </NavLink>
        </>
    )

    const loggedInIcons = <>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/liked"
        >
            <i className="fa-solid fa-thumbs-up"></i>Liked
        </NavLink>
        <NavLink
            className={styles.NavLink}
            activeClassName={styles.Active}
            to="/about"
        >
            <i className="fa-solid fa-address-card"></i>About
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to="/"
            onClick={handleSignOut}
        >
            <i className="fa-solid fa-right-from-bracket"></i>Sign Out
        </NavLink>
        <NavLink
            className={styles.NavLink}
            to={`/profiles/${currentUser?.profile_id}`}
        >
            <Avatar src={currentUser?.profile_image} text={currentUser?.username} height={40} />
        </NavLink>
    </>
    const loggedOutIcons = (
        <>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/about"
            >
                <i className="fa-solid fa-address-card"></i>About
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signin"
            >
                <i className="fa-solid fa-right-to-bracket"></i>Sign In
            </NavLink>
            <NavLink
                className={styles.NavLink}
                activeClassName={styles.Active}
                to="/signup"
            >
                <i className="fa-solid fa-user-plus"></i>Sign Up
            </NavLink>
        </>
    )
    return (
        <Navbar
            expanded={expanded}
            className={styles.NavBar}
            expand="lg"
            fixed="top"
        >
            <Container>
                <NavLink to="/">
                    <Navbar.Brand>
                        <img src={logo} alt="logo" height="45" />
                    </Navbar.Brand>
                </NavLink>
                {/* {isAdminUser ? isAdminIcons : null} */}
                {currentUser && isAdminIcons}
                <Navbar.Toggle
                    ref={ref}
                    onClick={() => setExpanded(!expanded)}
                    aria-controls="basic-navbar-nav"
                />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto text-left">
                        <NavLink
                            exact
                            className={styles.NavLink}
                            activeClassName={styles.Active}
                            to="/"
                        >
                            <i className="fa-solid fa-cat"></i>Cats
                        </NavLink>
                        {currentUser ? loggedInIcons : loggedOutIcons}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavBar;