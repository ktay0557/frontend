import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import styles from "../styles/MoreDropdown.module.css";
import { useHistory } from "react-router";

// Provides the clickable three dot icon
const ThreeDots = React.forwardRef(({ onClick }, ref) => (
    <i
        className="fas fa-ellipsis-v"
        ref={ref}
        onClick={(e) => {
            e.preventDefault();
            onClick(e);
        }}
    />
));

// This gives the dropdown menu for allowing users to choose to edit and delete.
export const MoreDropdown = ({ handleEdit, handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleEdit}
                    aria-label="edit"
                >
                    <i className="fas fa-edit" />
                </Dropdown.Item>
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fas fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

// This gives staff the menu to delete fulfilled adoption queries
export const MoreDropdownStaff = ({ handleDelete }) => {
    return (
        <Dropdown className="ml-auto" drop="left">
            <Dropdown.Toggle as={ThreeDots} />

            <Dropdown.Menu
                className="text-center"
                popperConfig={{ strategy: "fixed" }}
            >
                <Dropdown.Item
                    className={styles.DropdownItem}
                    onClick={handleDelete}
                    aria-label="delete"
                >
                    <i className="fas fa-trash-alt" />
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
};

// Provides dropdown menu to edit profiles
export function ProfileEditDropdown({ id }) {
    const history = useHistory();
    return (
      <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
        <Dropdown.Toggle as={ThreeDots} />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className="fas fa-edit" /> Edit Details
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className="far fa-id-card" />
            Change Username
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className="fas fa-key" />
            Change Password
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }