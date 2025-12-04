import { useState, useEffect } from "react";
import type { User } from "../../types/user";
import { UPDATE_USER_API_URL, GET_USER_API_URL } from "../../api/endpoints";
import type { UserUpdateProps } from "../../interfaces/user-update-props";
import "./User.css";

export default function UserUpdate({ userId, onClose }: UserUpdateProps) {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);

  useEffect(() => {
    if (!userId) return;
    setLoading(true);
    fetch(GET_USER_API_URL(userId))
      .then(res => {
        if (!res.ok) throw new Error("User not found");
        return res.json();
      })
      .then((data: User) => {
        setUser(data);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setEmail(data.email);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, [userId]);

  const handleUpdateUser = () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(UPDATE_USER_API_URL(userId), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then(res => {
        if (!res.ok) throw new Error("Error updating user");
        return res.json();
      })
      .then((data: User) => {
        setUpdatedUser(data);
        setUser(null);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-animate">
        <div className="modal-header">
          <h2>Update User</h2>
        </div>

        {loading && <p className="modal-loading">Processing...</p>}
        {error && <p className="modal-loading" style={{ color: "red" }}>{error}</p>}

        {/* Form update */}
        {user && (
          <div className="modal-info-wrapper">
            <div className="modal-info-row">
              <span className="modal-label">First Name:</span>
              <input
                type="text"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                className="modal-input"
              />
            </div>
            <div className="modal-info-row">
              <span className="modal-label">Last Name:</span>
              <input
                type="text"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                className="modal-input"
              />
            </div>
            <div className="modal-info-row">
              <span className="modal-label">Email:</span>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="modal-input"
              />
            </div>
          </div>
        )}

        {updatedUser && (
          <div className="modal-info-wrapper">
            <h3>Updated User</h3>
            <div className="modal-info-row">
              <span className="modal-label">ID:</span>
              <span className="modal-value">{updatedUser.id}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-label">First Name:</span>
              <span className="modal-value">{updatedUser.firstName}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-label">Last Name:</span>
              <span className="modal-value">{updatedUser.lastName}</span>
            </div>
            <div className="modal-info-row">
              <span className="modal-label">Email:</span>
              <span className="modal-value">{updatedUser.email}</span>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div style={{ padding: "0 20px 20px 20px" }}>
          {user && (
            <button className="modal-button" onClick={handleUpdateUser} style={{ background: "#007bff" }}>
              Update
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
