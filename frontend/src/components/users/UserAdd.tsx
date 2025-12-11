import { useState } from "react";
import "./User.css";
import type { UserAddProps } from "../../interfaces/user-add-props";
import { CREATE_USER_URL } from "../../api/endpoints";

export default function UserAdd({ onClose, onSuccess }: UserAddProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(CREATE_USER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then(async (res) => {
        if (!res.ok) {
          const msg = await res.text();
          throw new Error(msg || "Failed to add user");
        }
        return res.json();
      })
      .then(() => {
        setLoading(false);

        if (onSuccess)
          onSuccess();
        onClose();

        // reset form
        setFirstName("");
        setLastName("");
        setEmail("");
      })
      .catch((err) => {
        setError(err.message || "Error adding user");
        setLoading(false);
      });
  };


  return (
    <div className="modal-overlay">
      <div className="modal-box modal-animate">
        <div className="modal-header">
          <h2>Add New User</h2>
        </div>

        <div className="modal-info-wrapper">
          <div className="modal-info-row">
            <span className="modal-label">First Name:</span>
            <span className="modal-value">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="modal-input"
              />
            </span>
          </div>

          <div className="modal-info-row">
            <span className="modal-label">Last Name:</span>
            <span className="modal-value">
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="modal-input"
              />
            </span>
          </div>

          <div className="modal-info-row">
            <span className="modal-label">Email:</span>
            <span className="modal-value">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="modal-input"
              />
            </span>
          </div>

          {error && <p className="modal-loading" style={{ color: "red" }}>{error}</p>}
          {loading && <p className="modal-loading">Adding user...</p>}
        </div>

        <div style={{ padding: "0 20px 20px 20px" }}>
          <button className="modal-button" onClick={handleAddUser}>Save</button>
          <button className="modal-button" style={{ marginLeft: 10, background: "#6c757d" }} onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
}
