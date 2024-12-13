import React, { useState } from 'react';
import '../../styles/StudentProfile.css';

// Öğrenci profili için örnek veri
const student = {
  name: 'John Doe',
  class: '5. Sınıf',
  intelligenceType: 'Mantıksal-Matematiksel',
  email: 'john.doe@example.com',
  phone: '123-456-7890',
  profilePicture: '', // Opsiyonel profil resmi
  performance: {
    logical: 85,
    linguistic: 90,
    spatial: 75,
    musical: 60,
    bodily: 70,
    interpersonal: 80,
    intrapersonal: 95,
    naturalistic: 88,
  },
  achievements: [
    { title: 'Matematik Şampiyonu', date: '2024-05-20' },
    { title: 'Bilim Fuarı Birincisi', date: '2024-03-15' },
  ],
};

const StudentProfile = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState(false);

  const filteredAchievements = student.achievements.filter((achievement) =>
    achievement.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="student-profile">
      <h2>{student.name}</h2>
      <p>{student.class} | {student.intelligenceType}</p>

      <div className="student-profile-image">
        <img src={student.profilePicture || 'default-profile.png'} alt={student.name} />
      </div>

      <div className="contact-info">
        <p>Email: {student.email}</p>
        <p>Telefon: {student.phone}</p>
      </div>

      <div className="performance">
        <h3>Performans Özeti</h3>
        <div className="performance-bar">
          {Object.keys(student.performance).map((key) => {
            const performanceKey = key as keyof typeof student.performance;
            const label = {
              logical: 'Mantıksal',
              linguistic: 'Dilsel',
              spatial: 'Uzamsal',
              musical: 'Müzikal',
              bodily: 'Bedensel',
              interpersonal: 'Kişilerarası',
              intrapersonal: 'Kişisel',
              naturalistic: 'Doğa Bilimsel',
            }[performanceKey];

            return (
              <div className="bar-container" key={performanceKey}>
                <label>{label}</label>
                <div
                  className="progress-bar"
                  style={{ width: `${student.performance[performanceKey]}%` }}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div className="achievements">
        <h3>Başarılar</h3>
        <input
          type="text"
          placeholder="Başarıları ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {filteredAchievements.map((achievement, index) => (
            <li key={index}>
              {achievement.title} - <em>{achievement.date}</em>
            </li>
          ))}
        </ul>
      </div>

      <div className="development-suggestions">
        <h3>Gelişim Önerileri</h3>
        <ul>
          {Object.keys(student.performance).map((key) => {
            const performanceKey = key as keyof typeof student.performance;
            if (student.performance[performanceKey] < 70) {
              return <li key={performanceKey}>{performanceKey.charAt(0).toUpperCase() + performanceKey.slice(1)}</li>;
            }
            return null;
          })}
        </ul>
      </div>

      <div className="actions">
        <button>Aileye Mesaj Gönder</button>
        <button>Rapor Oluştur</button>
      </div>

      <div className="performance-details">
        <button onClick={() => setShowDetails(true)}>Detayları Görüntüle</button>
        {showDetails && (
          <div className="modal">
            <h3>Performans Detayları</h3>
            <p>Detaylı performans açıklamaları burada yer alacak...</p>
            <button onClick={() => setShowDetails(false)}>Kapat</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;
