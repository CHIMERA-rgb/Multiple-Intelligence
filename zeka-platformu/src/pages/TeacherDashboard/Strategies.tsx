import React, { useState } from "react";
import "../../styles/Strategies.css";

// Strateji tiplerini tanımlıyoruz
type Strategy = {
  id: number;
  name: string;
  description: string;
};

type Student = {
  id: number;
  name: string;
  intelligence: 'Dilsel' | 'Müzikal' | 'Mantıksal' | 'Görsel'; // Zekâ türleri Türkçe
  performance: 'İyi' | 'Orta' | 'Düşük' | 'Çok İyi';
  motivation: 'Yüksek' | 'Orta' | 'Düşük'; // Motivasyon seviyesi
  progress: { [key: string]: number }; // Her strateji için ilerleme oranı
};

type StrategiesByType = {
  [key: string]: string[]; // Zekâ türüne göre stratejiler
};

const Strategies: React.FC = () => {
  // Öğrenciler ve zekâ türleri
  const students: Student[] = [
    { id: 1, name: 'Ali', intelligence: 'Dilsel', performance: 'İyi', motivation: 'Orta', progress: { 'Okuma Alıştırmaları': 60 } },
    { id: 2, name: 'Ayşe', intelligence: 'Müzikal', performance: 'Orta', motivation: 'Yüksek', progress: { 'Şarkı Söyleme': 80 } },
    { id: 3, name: 'Mehmet', intelligence: 'Mantıksal', performance: 'Çok İyi', motivation: 'Düşük', progress: { 'Bulmacalar': 50 } },
    { id: 4, name: 'Elif', intelligence: 'Görsel', performance: 'Düşük', motivation: 'Orta', progress: { 'Zihin Haritaları': 30 } },
    { id: 5, name: 'Murat', intelligence: 'Dilsel', performance: 'Orta', motivation: 'Yüksek', progress: { 'Hikaye Anlatma': 90 } },
    { id: 6, name: 'Zeynep', intelligence: 'Müzikal', performance: 'İyi', motivation: 'Yüksek', progress: { 'Ritim Alıştırmaları': 70 } },
  ];

  const strategiesByType: StrategiesByType = {
    Dilsel: ['Okuma Alıştırmaları', 'Hikaye Anlatma', 'Tartışmalar'],
    Müzikal: ['Şarkı Söyleme', 'Müzik ile Öğrenme', 'Ritim Alıştırmaları'],
    Mantıksal: ['Bulmacalar', 'Problem Çözme Oyunları', 'Mantıksal Diziler'],
    Görsel: ['Zihin Haritaları', 'Çizim', 'Video ile Öğrenme'],
  };

  const suggestedPlans: { [key: string]: string } = {
    Dilsel: 'Bir hafta boyunca okuma çalışmaları, haftalık hikaye oluşturma etkinliği.',
    Müzikal: 'Müzik ve şarkılarla günlük dil gelişimi, her hafta bir şarkı öğrenme.',
    Mantıksal: 'Mantık problemleri çözme, haftalık mini quizler ile mantıksal düşünme.',
    Görsel: 'Görsel materyallerle ders anlatımı, öğrencinin kendi çizimleriyle ödevler.',
  };

  // State tanımlamaları
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [selectedSpecificStrategy, setSelectedSpecificStrategy] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');
  const [strategyHistory, setStrategyHistory] = useState<{ student: string; strategy: string; feedback: string }[]>([]);
  const [suggestedPlan, setSuggestedPlan] = useState<string>('');

  const handleStudentChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const student = students.find(student => student.id === parseInt(event.target.value));
    if (student) {
      setSelectedStudent(student);
      setSuggestedPlan(suggestedPlans[student.intelligence] || ''); // Zekâ türüne göre plan önerisi
    }
  };

  const handleSpecificStrategyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSpecificStrategy(event.target.value);
  };

  const handleFeedbackChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedback(event.target.value);
  };

  const handleSave = () => {
    if (selectedStudent && selectedSpecificStrategy) {
      setStrategyHistory([...strategyHistory, { student: selectedStudent.name, strategy: selectedSpecificStrategy, feedback }]);
      alert(`Strateji kaydedildi: ${selectedSpecificStrategy} - Geri bildirim: ${feedback}`);
      setFeedback(''); // Geri bildirimi sıfırla
    }
  };

  const handleProgressUpdate = (strategy: string, progress: number) => {
    if (selectedStudent) {
      const updatedProgress = { ...selectedStudent.progress, [strategy]: progress };
      setSelectedStudent({ ...selectedStudent, progress: updatedProgress });
    }
  };

  return (
    <div className="strategies-page">
      <div className="header">
        <h1>Eğitim Stratejileri</h1>
        <p>Öğrencileriniz için önerilen eğitim stratejilerini inceleyin ve özelleştirilmiş planlar oluşturun.</p>
      </div>

      {/* Öğrenci Seçimi */}
      <div className="student-selection">
        <label>Öğrenci Seçin: </label>
        <select onChange={handleStudentChange}>
          <option value="">Öğrenci Seçin</option>
          {students.map(student => (
            <option key={student.id} value={student.id}>{student.name}</option>
          ))}
        </select>
      </div>

      {selectedStudent && (
        <div className="student-details">
          <h3>{selectedStudent.name} - Zekâ Türü: {selectedStudent.intelligence}</h3>
          <p>Performans Durumu: {selectedStudent.performance}</p>
          <p>Motivasyon: {selectedStudent.motivation}</p>
          <p><strong>Önerilen Eğitim Planı:</strong> {suggestedPlan}</p>

          <div className="strategy-selection">
            <label>Strateji Seçin: </label>
            <select onChange={handleSpecificStrategyChange} value={selectedSpecificStrategy}>
              <option value="" disabled>Strateji Seçin</option>
              {selectedStudent.intelligence && strategiesByType[selectedStudent.intelligence] && strategiesByType[selectedStudent.intelligence].map((strategy, index) => (
                <option key={index} value={strategy}>
                  {strategy}
                </option>
              ))}
            </select>
          </div>

          <div className="feedback">
            <label>Geri Bildirim: </label>
            <textarea
              value={feedback}
              onChange={handleFeedbackChange}
              placeholder="Stratejiyi açıklayın veya geri bildirim bırakın"
            />
          </div>

          <button onClick={handleSave}>Kaydet</button>

          {/* İlerleme Çubuğu */}
          {selectedSpecificStrategy && (
            <div>
              <h4>{selectedSpecificStrategy} İlerleme</h4>
              <input
                type="range"
                min="0"
                max="100"
                value={selectedStudent.progress[selectedSpecificStrategy] || 0}
                onChange={(e) => handleProgressUpdate(selectedSpecificStrategy, parseInt(e.target.value))}
              />
              <p>İlerleme: {selectedStudent.progress[selectedSpecificStrategy] || 0}%</p>
            </div>
          )}

          {/* Strateji Geçmişi */}
          <div className="strategy-history">
            <h4>Geçmiş Stratejiler</h4>
            <ul>
              {strategyHistory.map((item, index) => (
                <li key={index}>{item.student} - {item.strategy}: {item.feedback}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Strategies;
