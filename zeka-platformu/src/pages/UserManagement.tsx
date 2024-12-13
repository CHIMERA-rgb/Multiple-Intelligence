import React, { useState } from 'react';
import './UserManagement.css';

const UserManagement = () => {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('admin');
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([
    { name: 'Yönetici 1', role: 'admin', email: 'admin@example.com', phone: '123-456-7890', isActive: true, avatar: '' },
    { name: 'Öğretmen 2', role: 'teacher', email: 'teacher@example.com', phone: '234-567-8901', isActive: false, avatar: '' },
    { name: 'Veli 3', role: 'parent', email: 'parent@example.com', phone: '345-678-9012', isActive: true, avatar: '' },
  ]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser = { name: username, role, email: '', phone: '', isActive: true, avatar: '' };
    setUsers([...users, newUser]);
    setUsername('');
    setRole('admin');
    console.log('Kullanıcı Eklendi:', newUser);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleDeleteUser = (index: number) => {
    const confirmed = window.confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?');
    if (confirmed) {
      setUsers(users.filter((_, i) => i !== index));
    }
  };

  const toggleActiveStatus = (index: number) => {
    const updatedUsers = [...users];
    updatedUsers[index].isActive = !updatedUsers[index].isActive;
    setUsers(updatedUsers);
  };

  const handleUserSelect = (index: number) => {
    const isSelected = selectedUsers.includes(index);
    setSelectedUsers(isSelected ? selectedUsers.filter(id => id !== index) : [...selectedUsers, index]);
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) {
      alert('Silinecek kullanıcıyı seçmediniz!');
      return;
    }

    const confirmed = window.confirm('Seçilen kullanıcıları silmek istediğinizden emin misiniz?');
    if (confirmed) {
      const updatedUsers = users.filter((_, index) => !selectedUsers.includes(index));
      setUsers(updatedUsers);
      setSelectedUsers([]); // Seçilen kullanıcıları temizle
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const confirmDelete = () => {
    if (userToDelete !== null) {
      setUsers(users.filter((_, i) => i !== userToDelete));
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setUserToDelete(null);
  };

  return (
    <div className="user-management-container">
      <h2>Kullanıcı Yönetimi</h2>

      {/* Arama Barı */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Kullanıcı Ara"
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      {/* Toplu Silme veya Güncelleme */}
      <div className="bulk-actions">
        <button onClick={handleBulkDelete} disabled={selectedUsers.length === 0}>
          Toplu Silme
        </button>
        <button onClick={() => alert('Toplu güncelleme yapılacak')} disabled={selectedUsers.length === 0}>
          Toplu Güncelleme
        </button>
      </div>

      <h3>Kullanıcı Listesi</h3>
      <div className="user-list">
        {filteredUsers.map((user, index) => (
          <div key={index} className="user-card">
            <div className="user-info">
              <img
                src={user.avatar || 'https://via.placeholder.com/40'}
                alt="avatar"
                className="user-avatar"
              />
              <span className="user-name">{user.name}</span>
              <span className="user-role">{user.role}</span>
              <span className={`user-status ${user.isActive ? 'active' : 'inactive'}`}>
                {user.isActive ? 'Aktif' : 'Pasif'}
              </span>
              <span className="user-contact">E-posta: {user.email}</span>
              <span className="user-contact">Telefon: {user.phone}</span>
            </div>
            <div className="action-buttons">
              <button className="update-btn">Güncelle</button>
              <button className="delete-btn" onClick={() => setShowDeleteModal(true)}>
                Sil
              </button>
              <button className="status-btn" onClick={() => toggleActiveStatus(index)}>
                {user.isActive ? 'Pasif Yap' : 'Aktif Yap'}
              </button>
            </div>
            <input
              type="checkbox"
              checked={selectedUsers.includes(index)}
              onChange={() => handleUserSelect(index)}
            />
          </div>
        ))}
      </div>

      {/* Kullanıcı Ekle */}
      <h3>Kullanıcı Ekle</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Kullanıcı Adı</label>
        <input
          type="text"
          id="username"
          placeholder="Kullanıcı adı girin"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label htmlFor="role">Rol</label>
        <select
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="admin">Yönetici</option>
          <option value="teacher">Öğretmen</option>
          <option value="parent">Veli</option>
          <option value="student">Öğrenci</option>
        </select>

        <button type="submit" className="add-btn">Ekle</button>
      </form>

      {/* Silme Onay Modal */}
      {showDeleteModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Bu kullanıcıyı silmek istediğinizden emin misiniz?</h3>
            <button onClick={confirmDelete}>Evet</button>
            <button onClick={cancelDelete}>Hayır</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
