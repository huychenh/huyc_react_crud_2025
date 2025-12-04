import { useEffect, useState } from "react";
import type { User } from "../../types/user";
import { GET_USER_API_URL } from "../../api/endpoints";
import type { UserDetailProps } from "../../interfaces/user-detail-props";
import "./User.css";

export default function UserDetail({ userId, onClose }: UserDetailProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(GET_USER_API_URL(userId))
      .then(res => res.json())
      .then((data: User) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [userId]);

  return (
    <div className="modal-overlay">
      <div className="modal-box modal-animate">
        <div className="modal-header">
          <h2>User Detail</h2>
        </div>

        {loading && <p className="modal-loading">Loading...</p>}

        {user && (
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

        <button className="modal-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
