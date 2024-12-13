import React, { useState } from 'react';
import '../../styles/RewardsAndIncentives.css';

const studentsData = [
  { id: 1, name: 'Ali', rewards: 3, rewardHistory: ['Mükemmel Katılım', 'Yüksek Performans'], category: 'Performans' },
  { id: 2, name: 'Ayşe', rewards: 2, rewardHistory: ['Problem Çözme Ustası'], category: 'Beceri' },
  { id: 3, name: 'Ahmet', rewards: 1, rewardHistory: [], category: 'Katılım' },
];

const rewardsList = [
  { id: 1, title: 'Mükemmel Katılım', points: 5, category: 'Katılım', description: 'Öğrencinin derse aktif katılımı için verilen ödül.' },
  { id: 2, title: 'Yüksek Performans', points: 10, category: 'Performans', description: 'Öğrencinin genel performansının yüksek olduğu durumlar için ödül.' },
  { id: 3, title: 'Problem Çözme Ustası', points: 7, category: 'Beceri', description: 'Öğrencinin problem çözme yeteneğinin gelişmiş olduğunu gösterir.' },
  { id: 4, title: 'Yaratıcı Zihin', points: 6, category: 'Yaratıcılık', description: 'Yaratıcı projeler geliştiren öğrencilere verilen ödül.' },
  { id: 5, title: 'Liderlik Başarı Ödülü', points: 8, category: 'Liderlik', description: 'Grup projelerinde liderlik becerilerini sergileyen öğrenciler için.' },
];

const RewardsAndIncentives = () => {
  const [selectedStudent, setSelectedStudent] = useState<any>(null);
  const [rewardMessage, setRewardMessage] = useState<string>('');
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const assignReward = (studentId: number, reward: any) => {
    const updatedStudents = studentsData.map((student) => {
      if (student.id === studentId) {
        const updatedHistory = [...student.rewardHistory, reward.title];
        return { ...student, rewards: student.rewards + reward.points, rewardHistory: updatedHistory };
      }
      return student;
    });
    setRewardMessage(`${reward.title} ödülü ${updatedStudents.find(student => student.id === studentId)?.name} öğrencisine başarıyla verildi!`);
    setShowConfirmation(false);
  };

  const filteredStudents = studentsData.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const topPerformers = studentsData
    .sort((a, b) => b.rewards - a.rewards)
    .slice(0, 3); // Top 3 students

  return (
    <div className="reward-page">
      <div className="rewards-panel">
        <h1>Ödüller ve Teşvikler</h1>
        <p className="description">Öğrencilere başarılarına göre ödüller atayabilirsiniz. Bu ödüller öğrencinin performansına göre verilir.</p>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Öğrenci ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Student Selection */}
        <div className="student-selection">
          <h2>Öğrenci Seçin</h2>
          <select onChange={(e) => setSelectedStudent(Number(e.target.value))}>
            <option value="">Öğrenci Seçin</option>
            {filteredStudents.map((student) => (
              <option key={student.id} value={student.id}>
                {student.name}
              </option>
            ))}
          </select>
        </div>

        {/* Selected Student Details */}
        {selectedStudent && (
          <div className="student-rewards">
            <h2>{studentsData.find((student) => student.id === selectedStudent)?.name} için Ödüller</h2>
            <p>Toplam Ödül Puanı: {studentsData.find((student) => student.id === selectedStudent)?.rewards}</p>
            
            {/* Category Filter */}
            <div className="category-filter">
              <label>Ödül Kategorisi Seçin: </label>
              <select onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="">Tüm Kategoriler</option>
                <option value="Katılım">Katılım</option>
                <option value="Performans">Performans</option>
                <option value="Beceri">Beceri</option>
                <option value="Yaratıcılık">Yaratıcılık</option>
                <option value="Liderlik">Liderlik</option>
              </select>
            </div>

            {/* Rewards List */}
            <h3>Ödüller</h3>
            <ul>
              {rewardsList
                .filter((reward) => !selectedCategory || reward.category === selectedCategory)
                .map((reward) => (
                  <li key={reward.id}>
                    <button 
                      onClick={() => { 
                        setSelectedReward(reward); 
                        setShowConfirmation(true); 
                      }} >
                      {reward.title} ({reward.points} Puan)
                    </button>
                    <p>{reward.description}</p>
                  </li>
                ))}
            </ul>

            {/* Reward History */}
            <h3>Ödül Geçmişi</h3>
            <ul>
              {studentsData.find((student) => student.id === selectedStudent)?.rewardHistory.map((history, index) => (
                <li key={index}>{history}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirmation && selectedReward && (
          <div className="confirmation">
            <p>Öğrenciye "{selectedReward.title}" ödülünü vermek istediğinizden emin misiniz?</p>
            <button onClick={() => assignReward(selectedStudent, selectedReward)}>Evet, Ver</button>
            <button onClick={() => setShowConfirmation(false)}>Hayır, Vazgeç</button>
          </div>
        )}

        {/* Reward Message */}
        {rewardMessage && <div className="reward-message">{rewardMessage}</div>}

        {/* Top Performers */}
        <div className="top-performers">
          <h3>En İyi Performans Gösteren Öğrenciler</h3>
          <ul>
            {topPerformers.map((student) => (
              <li key={student.id}>
                {student.name}: {student.rewards} Puan
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RewardsAndIncentives;
