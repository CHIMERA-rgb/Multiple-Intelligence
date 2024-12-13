import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/TeacherDashboard.css';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <h1>Öğretmen Paneli</h1>
      <p>Bu panelde sınıf yönetimi, öğrenci performansı ve iletişim işlemlerini gerçekleştirebilirsiniz.</p>
      <div className="dashboard-sections">
        <Link to="/teacher-dashboard/class-management">
          <button>Sınıf Yönetimi</button>
        </Link>
        <Link to="/teacher-dashboard/student-profile">
          <button>Öğrenci Profilleri</button>
        </Link>
        <Link to="/teacher-dashboard/activity-management">
          <button>Aktivite Yönetimi</button>
        </Link>
        <Link to="/teacher-dashboard/performance-reports">
          <button>Performans Raporları</button>
        </Link>
        <Link to="/teacher-dashboard/messages">
          <button>Mesajlaşma</button>
        </Link>
        <Link to="/teacher-dashboard/feedback">
          <button>Geri Bildirim</button>
        </Link>
        <Link to="/teacher-dashboard/statistics">
          <button>İstatistikler</button>
        </Link>
        <Link to="/teacher-dashboard/classroomclimate">
          <button>Sınıf İklimi</button>
        </Link>
        <Link to="/teacher-dashboard/strategies">
          <button>Eğitim Stratejileri</button>
        </Link>
        {/* Grup Projeleri yerine Ödüller ve Teşvikler sayfası eklendi */}
        <Link to="/teacher-dashboard/rewards-and-incentives">
          <button className="special-button">Ödüller ve Teşvikler</button>
        </Link>
      </div>
    </div>
  );
};

export default TeacherDashboard;
