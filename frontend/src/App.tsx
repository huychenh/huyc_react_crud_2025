import reactLogo from './assets/react.svg'
import './App.css'
import UserList from './components/users/UserList'
import UserUpdate from './components/users/UserUpdate'
import UserDelete from './components/users/UserDelete'
import UserAdd from './components/users/UserAdd'
import { useEffect, useState } from 'react'
import UserDetail from './components/users/UserDetail'

interface UserInfo {
  name: string
  role: 'user' | 'admin'
}

function App() {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [message, setMessage] = useState<string | null>(null);
  const [refreshFlag, setRefreshFlag] = useState(0);


  // State login
  const [user, setUser] = useState<UserInfo | null>(null);

  const handleViewUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowDetailModal(true);
  };

  const handleEditUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowUpdateModal(true);
  };

  const handleDeleteUser = (userId: number) => {
    setSelectedUserId(userId);
    setShowDeleteModal(true);
  };

  const handleLogin = () => {
    setUser({ name: 'ABC', role: 'admin' });
  };

  const handleLogout = () => {
    setUser(null);
  };

  // Auto hide message
  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      setMessage(null);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, [message]);


  return (
    <>
      {/* Header Top (Logo + Title) */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
        <h1>Simple CRUD React</h1>
      </div>

      {/* User menu (NEW LINE, RIGHT-ALIGNED) */}
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: 10,
          marginBottom: 20,
        }}
      >
        {!user && (
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              handleLogin();
            }}
            style={{
              textDecoration: "none",
              color: "#007bff",
              fontWeight: 500,
              cursor: "pointer",
              transition: "color 0.2s, text-decoration 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.textDecoration = "none";
            }}
          >
            Login
          </a>
        )}

        {user && (
          <div>
            <span style={{ fontWeight: 500, marginRight: 12 }}>
              Hi {user.name} ({user.role})
            </span>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                handleLogout();
              }}
              style={{
                padding: "6px 16px",
                borderRadius: 6,
                textDecoration: "none",
                background: "#dc3545",
                color: "#fff",
                fontWeight: 500,
                transition: "background 0.2s",
                display: "inline-block",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#a71d2a")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "#dc3545")
              }
            >
              Logout
            </a>
          </div>
        )}
      </div>

      {message && (
        <div style={{
          background: "#d1e7dd",
          border: "1px solid #0f5132",
          padding: "10px 15px",
          borderRadius: 6,
          color: "#0f5132",
          marginTop: 10
        }}>
          {message}
        </div>
      )}


      {/* User List Header */}
      <div className="header-container" style={{ marginTop: 20 }}>
        <h2>User List</h2>
        <button className="add-user-button" onClick={() => setShowAddModal(true)}>
          Add New User
        </button>
      </div>

      {/* List */}
      <UserList
        refresh={refreshFlag}
        onViewUser={handleViewUser}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
      />

      {/* Modals */}
      {showDetailModal && selectedUserId && (
        <UserDetail
          userId={selectedUserId}
          onClose={() => setShowDetailModal(false)}
        />
      )}

      {showAddModal && (
        <UserAdd
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            setMessage("User added successfully!");
            setRefreshFlag(prev => prev + 1);
            setShowAddModal(false);
          }}
        />
      )}

      {showUpdateModal && selectedUserId && (
        <UserUpdate
          userId={selectedUserId}
          onClose={() => setShowUpdateModal(false)}
          onSuccess={() => {
            setMessage("User updated successfully!");
            setRefreshFlag(prev => prev + 1);
          }}
        />
      )}



      {showDeleteModal && selectedUserId && (
        <UserDelete
          userId={selectedUserId}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={() => {
            setMessage("User deleted successfully!");
            setRefreshFlag(prev => prev + 1);
            setShowDeleteModal(false);
          }}
        />
      )}

    </>
  );
};

export default App;

