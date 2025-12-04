import reactLogo from './assets/react.svg'
import './App.css'
import UserList from './components/users/UserList'
import UserUpdate from './components/users/UserUpdate'
import UserDelete from './components/users/UserDelete'
import UserAdd from './components/users/UserAdd'
import { useState } from 'react'
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

  return (
    <>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <h1>Simple CRUD React</h1>
        </div>

        <p>&nbsp;</p>

        {/* User menu */}
        <div style={{ marginTop: 12 }}>
          {!user && (
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); handleLogin(); }}
              style={{
                textDecoration: 'none',
                color: '#007bff',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'color 0.2s, text-decoration 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Login
            </a>

          )}

          {user && (
            <div style={{ marginTop: 8 }}>
              <span style={{ fontWeight: 500, marginRight: 12 }}>
                Hi {user.name} ({user.role})
              </span>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); handleLogout(); }}
                style={{
                  padding: '6px 16px',
                  borderRadius: 6,
                  textDecoration: 'none',
                  background: '#dc3545',
                  color: '#fff',
                  fontWeight: 500,
                  transition: 'background 0.2s',
                  display: 'inline-block',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#a71d2a')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#dc3545')}
              >
                Logout
              </a>
            </div>
          )}
        </div>


      </div>

      {/* User List Header */}
      <div className="header-container" style={{ marginTop: 20 }}>
        <h2>User List</h2>
        <button className="add-user-button" onClick={() => setShowAddModal(true)}>
          Add New User
        </button>
      </div>

      {/* List */}
      <UserList
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
      {showAddModal && <UserAdd onClose={() => setShowAddModal(false)} />}
      {showUpdateModal && selectedUserId && (
        <UserUpdate
          userId={selectedUserId}
          onClose={() => setShowUpdateModal(false)}
        />
      )}
      {showDeleteModal && selectedUserId && (
        <UserDelete
          userId={selectedUserId}
          onClose={() => setShowDeleteModal(false)}
        />
      )}
    </>
  )
}

export default App;
