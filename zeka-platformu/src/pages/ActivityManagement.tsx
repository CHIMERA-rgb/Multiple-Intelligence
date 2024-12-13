import React, { useState, useMemo } from 'react';
import '../styles/ActivityManagement.css';
import { DateRangePicker } from 'react-date-range';
import { tr } from 'date-fns/locale';

// Aktivite verisi
const activities = [
  {
    id: 1,
    name: 'Matematik Projesi',
    type: 'Proje',
    startDate: '2024-05-01',
    endDate: '2024-05-15',
    status: 'planned',
    description: 'Bu proje, öğrencilerin matematiksel kavramları anlamalarına yardımcı olacak.',
    goal: 'Öğrencilerin temel matematik becerilerini geliştirmek.',
    materials: ['Kağıt', 'Kalem', 'Bilgisayar'],
    difficulty: 'medium',
  },
  {
    id: 2,
    name: 'Fen Bilimleri Deneyi',
    type: 'Bireysel',
    startDate: '2024-06-01',
    endDate: '2024-06-10',
    status: 'ongoing',
    description: 'Bu deneyde öğrenciler, basit fiziksel kavramları öğreniyorlar.',
    goal: 'Fiziksel deneylerin sonuçlarını gözlemlemek ve analiz etmek.',
    materials: ['Deney seti', 'Bilgisayar'],
    difficulty: 'hard',
  },
  {
    id: 3,
    name: 'Sanat Etkinliği: Resim Yapma',
    type: 'Bireysel',
    startDate: '2024-06-05',
    endDate: '2024-06-12',
    status: 'planned',
    description: 'Öğrenciler, renkleri ve farklı teknikleri kullanarak özgün resimler yapacaklar.',
    goal: 'Öğrencilerin yaratıcılıklarını geliştirmek ve sanatsal ifadelerini desteklemek.',
    materials: ['Tuval', 'Akrilik Boya', 'Fırçalar'],
    difficulty: 'easy',
  },
  {
    id: 4,
    name: 'Edebiyat Kulübü: Kitap Tartışması',
    type: 'Bireysel',
    startDate: '2024-07-01',
    endDate: '2024-07-15',
    status: 'planned',
    description: 'Öğrenciler, seçilen bir kitabı okuyup tartışacaklar.',
    goal: 'Öğrencilerin okuma alışkanlıklarını geliştirmek ve edebi düşünme becerilerini artırmak.',
    materials: ['Kitap'],
    difficulty: 'medium',
  },
  {
    id: 5,
    name: 'Tasarım ve Teknoloji: Robotik Projesi',
    type: 'Proje',
    startDate: '2024-08-01',
    endDate: '2024-08-20',
    status: 'completed',
    description: 'Öğrenciler, robot yapımıyla ilgili temel bilgileri öğrenip bir robot tasarlayacaklar.',
    goal: 'Öğrencilerin mühendislik ve teknoloji becerilerini geliştirmek.',
    materials: ['Robotik Kitleri', 'Bilgisayar'],
    difficulty: 'hard',
  },
  {
    id: 6,
    name: 'Coğrafya: Dünya Haritası Çizimi',
    type: 'Proje',
    startDate: '2024-09-01',
    endDate: '2024-09-10',
    status: 'ongoing',
    description: 'Öğrenciler, Dünya haritasını çizerek coğrafi bilgilerini pekiştirecekler.',
    goal: 'Öğrencilerin coğrafi farkındalıklarını artırmak.',
    materials: ['Kağıt', 'Renkli Kalemler', 'Cetvel'],
    difficulty: 'medium',
  },
];

const ActivityManagement: React.FC = () => {
  const [category, setCategory] = useState('all');
  const [difficulty, setDifficulty] = useState('all');
  const [status, setStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<any>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });
  const [showModal, setShowModal] = useState(false);

  // Aktivite filtreleme
  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const categoryMatch = category === 'all' || act.type === category;
      const difficultyMatch = difficulty === 'all' || act.difficulty === difficulty;
      const statusMatch = status === 'all' || act.status === status;
      const searchMatch = act.name.toLowerCase().includes(searchTerm.toLowerCase());

      return categoryMatch && difficultyMatch && statusMatch && searchMatch;
    });
  }, [category, difficulty, status, searchTerm]);

  // Aktivite detayı
  const handleActivityClick = (activityId: number) => {
    const activity = activities.find((act) => act.id === activityId);
    alert(`Aktivite: ${activity?.name}\nAçıklama: ${activity?.description}`);
  };

  // Aktivite durumu güncelleme
  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedActivities = activities.map((activity) =>
      activity.id === id ? { ...activity, status: newStatus } : activity
    );
    // Burada state'i güncellemeniz gerekebilir (örneğin useState ile)
  };

  // Aktivite ekleme
  const handleAddActivity = () => {
    // Aktivite ekleme işlemleri
    setShowModal(false);
  };

  return (
    <div className="activity-management">
      <h1>Aktivite Yönetimi</h1>

      <div className="filters">
        <div>
          <label>Kategori:</label>
          <select onChange={(e) => setCategory(e.target.value)} value={category}>
            <option value="all">Tümü</option>
            <option value="Proje">Proje</option>
            <option value="Bireysel">Bireysel</option>
          </select>
        </div>

        <div>
          <label>Zorluk:</label>
          <select onChange={(e) => setDifficulty(e.target.value)} value={difficulty}>
            <option value="all">Tümü</option>
            <option value="easy">Kolay</option>
            <option value="medium">Orta</option>
            <option value="hard">Zor</option>
          </select>
        </div>

        <div>
          <label>Durum:</label>
          <select onChange={(e) => setStatus(e.target.value)} value={status}>
            <option value="all">Tümü</option>
            <option value="planned">Planlanan</option>
            <option value="ongoing">Devam Ediyor</option>
            <option value="completed">Tamamlandı</option>
          </select>
        </div>

        <div>
          <label>Aktivite Ara:</label>
          <input
            type="text"
            placeholder="Aktivite ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="activities-list">
        <ul>
          {filteredActivities.map((activity) => (
            <li key={activity.id} onClick={() => handleActivityClick(activity.id)}>
              <h3>{activity.name}</h3>
              <p><strong>Tip:</strong> {activity.type}</p>
              <p><strong>Zorluk:</strong> {activity.difficulty}</p>
              <p><strong>Başlangıç:</strong> {activity.startDate}</p>
              <p><strong>Bitiş:</strong> {activity.endDate}</p>
              <p><strong>Durum:</strong> {activity.status}</p>
              <button onClick={() => handleStatusChange(activity.id, 'completed')}>Durumu Tamamla</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Aktivite Ekleme Modal */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      <h2>Aktivite Ekle</h2>
      
      <form className="activity-form">
        <div className="form-group">
          <label htmlFor="activityName">Aktivite Adı</label>
          <input type="text" id="activityName" placeholder="Aktivite adı girin" />
        </div>
        
        <div className="form-group">
          <label htmlFor="activityDate">Tarih</label>
          <input type="date" id="activityDate" />
        </div>
        
        <div className="form-group">
          <label htmlFor="activityDescription">Açıklama</label>
          <textarea id="activityDescription" placeholder="Aktivite hakkında açıklama yapın" />
        </div>
        
        <div className="form-group">
          <label htmlFor="activityCategory">Kategori</label>
          <select id="activityCategory">
            <option value="sport">Spor</option>
            <option value="art">Sanat</option>
            <option value="education">Eğitim</option>
            <option value="entertainment">Eğlence</option>
          </select>
        </div>
        
        <div className="modal-actions">
          <button type="submit" className="submit-btn">Ekle</button>
          <button type="button" className="close-btn" onClick={() => setShowModal(false)}>Kapat</button>
        </div>
      </form>
    </div>
  </div>
)}

      <button onClick={() => setShowModal(true)} className="add-activity-button">Aktivite Ekle</button>

      {/* Sayfalama */}
      <div className="pagination">
        {[...Array(Math.ceil(filteredActivities.length / 5))].map((_, index) => (
          <button key={index}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityManagement;
