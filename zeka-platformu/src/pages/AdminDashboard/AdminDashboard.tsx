import React from 'react';
import { Link } from 'react-router-dom';
import './AdminDashboard.css'; // AdminDashboard için CSS dosyasını ekleyeceğiz

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Yönetici Paneli</h2>
      <div className="admin-buttons">
        {/* Kullanıcı Yönetimi */}
        <Link to="/admin-dashboard/user-management">
          <button className="admin-button">Kullanıcı Yönetimi</button>
        </Link>

        {/* Genel Raporlar */}
        <Link to="/admin-dashboard/reports">
          <button className="admin-button">Genel Raporlar</button>
        </Link>

        {/* İçerik Yönetimi */}
        <Link to="/admin-dashboard/content-management">
          <button className="admin-button">İçerik Yönetimi</button>
        </Link>

        {/* Duyurular */}
        <Link to="/admin-dashboard/announcements">
          <button className="admin-button">Duyurular</button>
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
