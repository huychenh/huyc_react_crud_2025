import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import { DELETE_USER_API_URL, GET_USER_API_URL } from "../../api/endpoints";
import type { UserDeleteProps } from "../../interfaces/user-delete-props";
import "./User.css";

export default function UserDelete({ userId, onClose }: UserDeleteProps) {
    const [user, setUser] = useState<User | null>(null);
    const [deletedUser, setDeletedUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!userId) return;
        setLoading(true);
        setError(null);

        fetch(GET_USER_API_URL(userId))
            .then(res => {
                if (!res.ok) throw new Error("User not found");
                return res.json();
            })
            .then((data: User) => {
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    const handleDeleteUser = () => {
        if (!userId) return;

        setLoading(true);
        setError(null);

        fetch(DELETE_USER_API_URL(userId), { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error("User not found or cannot delete");
                return res.json();
            })
            .then((data: User) => {
                setDeletedUser(data);
                setUser(null);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    return (
        <div className="modal-overlay">
            <div className="modal-box modal-animate">
                <div className="modal-header">
                    <h2>Delete User</h2>
                </div>

                {loading && <p className="modal-loading">Processing...</p>}
                {error && <p className="modal-loading" style={{ color: "red" }}>{error}</p>}

                {!deletedUser && user && (
                    <div className="modal-info-wrapper">
                        <div className="modal-info-row">
                            <span className="modal-label">ID:</span>
                            <span className="modal-value">{user.id}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">First Name:</span>
                            <span className="modal-value">{user.firstName}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">Last Name:</span>
                            <span className="modal-value">{user.lastName}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">Email:</span>
                            <span className="modal-value">{user.email}</span>
                        </div>
                    </div>
                )}

                {deletedUser && (
                    <div className="modal-info-wrapper">
                        <h3>User Deleted</h3>
                        <div className="modal-info-row">
                            <span className="modal-label">ID:</span>
                            <span className="modal-value">{deletedUser.id}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">First Name:</span>
                            <span className="modal-value">{deletedUser.firstName}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">Last Name:</span>
                            <span className="modal-value">{deletedUser.lastName}</span>
                        </div>
                        <div className="modal-info-row">
                            <span className="modal-label">Email:</span>
                            <span className="modal-value">{deletedUser.email}</span>
                        </div>
                    </div>
                )}

                <div style={{ padding: "0 20px 20px 20px" }}>
                    {!deletedUser && (
                        <button className="modal-button" onClick={handleDeleteUser} style={{ background: "#dc3545" }}>
                            Delete
                        </button>
                    )}
                    <button className="modal-button" style={{ marginLeft: 10, background: "#6c757d" }} onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}
