import React from 'react';
import { Link } from 'react-router-dom';
import { FaComments, FaChartLine, FaLightbulb, FaBook, FaChalkboardTeacher } from 'react-icons/fa';
import '../../styles/ParentDashboard.css';

const ParentDashboard: React.FC = () => {
  return (
    <div className="parent-dashboard">
      {/* Ana Butonlar */}
      <div className="button-container">
        <Link to="/parent-dashboard/messaging">
          <button className="main-button button-messaging">
            <FaComments className="button-icon" />
            Mesajlaşma
          </button>
        </Link>

        <Link to="/parent-dashboard/performance">
          <button className="main-button button-performance">
            <FaChartLine className="button-icon" />
            Performans
          </button>
        </Link>

        <Link to="/parent-dashboard/suggestions">
          <button className="main-button button-suggestions">
            <FaLightbulb className="button-icon" />
            Öneriler
          </button>
        </Link>

        {/* Yeni Butonlar */}
        <Link to="/parent-dashboard/learning-resources">
          <button className="main-button button-learning-resources">
            <FaBook className="button-icon" />
            Kaynaklar
          </button>
        </Link>

        <Link to="/parent-dashboard/extracurricular-opportunities">
          <button className="main-button button-extracurricular">
            <FaChalkboardTeacher className="button-icon" />
            Eğitim Olanakları
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ParentDashboard;
