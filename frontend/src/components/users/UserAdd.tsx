import { useState } from "react";
import type { User } from "../../types/user";
import { ADD_USER_API_URL } from "../../api/endpoints";
import "./User.css";
import type { UserAddProps } from "../../interfaces/user-add-props";

export default function UserAdd({ onClose }: UserAddProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddUser = () => {
    if (!firstName || !lastName || !email) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError(null);

    fetch(ADD_USER_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ firstName, lastName, email }),
    })
      .then((res) => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
      })
      .catch(() => {
        setError("Error adding user");
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

        {user && (
          <div className="modal-info-wrapper" style={{ marginTop: 10 }}>
            <h3>Added User</h3>
            <table style={{ borderCollapse: "collapse", width: "100%" }}>
              <thead>
                <tr>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>ID</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>First Name</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Last Name</th>
                  <th style={{ border: "1px solid #ccc", padding: 8 }}>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.id}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.firstName}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.lastName}</td>
                  <td style={{ border: "1px solid #ccc", padding: 8 }}>{user.email}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
