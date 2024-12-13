import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './PerformanceTab.css';
import { useNavigate } from 'react-router-dom';
import { FaComment, FaFilePdf } from 'react-icons/fa'; // Mesaj ve PDF ikonu için
import DatePicker from 'react-datepicker'; // Tarih seçici için
import "react-datepicker/dist/react-datepicker.css"; // CSS dahil

const data = [
  { name: 'Ocak', zeka: 80, görev: 90, "ev aktivitesi": 80 },
  { name: 'Şubat', zeka: 85, görev: 85, "ev aktivitesi": 75 },
  { name: 'Mart', zeka: 90, görev: 88, "ev aktivitesi": 70 },
  { name: 'Nisan', zeka: 88, görev: 95, "ev aktivitesi": 65 },
  { name: 'Mayıs', zeka: 92, görev: 90, "ev aktivitesi": 60 },
  { name: 'Haziran', zeka: 90, görev: 92, "ev aktivitesi": 58 },
  { name: 'Temmuz', zeka: 88, görev: 88, "ev aktivitesi": 56 },
  { name: 'Ağustos', zeka: 92, görev: 85, "ev aktivitesi": 55 },
  { name: 'Eylül', zeka: 88, görev: 90, "ev aktivitesi": 53 },
  { name: 'Ekim', zeka: 90, görev: 95, "ev aktivitesi": 52 },
  { name: 'Kasım', zeka: 85, görev: 90, "ev aktivitesi": 51 },
  { name: 'Aralık', zeka: 85, görev: 90, "ev aktivitesi": 50 }
];

const PerformanceTab = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(null); // Tarih seçici için state

  const goToMessageTab = () => {
    navigate('/parent-dashboard/messaging');
  };

  const exportReport = () => {
    // PDF dışa aktarma işlemi için bir temel fonksiyon
    console.log("PDF raporu dışa aktarılıyor...");
  };

  const motivationMessage = data[data.length - 1].zeka >= 90 ? "Harika gidiyorsunuz! Zeka gelişiminde büyük ilerleme kaydettiniz." : "Hedefe odaklanın! İlerleme kaydediyorsunuz.";

  return (
    <div className="performance-tab">
    <header className="header">
    <img className="student-avatar" src="/images/student-avatar.jpg" alt="Öğrenci Avatarı" />
    <h1>Ahmet Yılmaz - <span>5. Sınıf</span></h1>
    <p className="general-performance">Genel Performans: Başarılı</p>
  </header>


      <section className="performance-section">
        <h2>Genel Performans</h2>
        <p>Bu grafik, öğrencinin zeka türleri ve görev tamamlama oranlarının zaman içindeki değişimini göstermektedir. Öğrencinin zeka türlerinde gösterdiği artış ve görev tamamlama oranındaki düzenli iyileşme dikkat çekmektedir.</p>
        
        {/* Tarih Filtreleme */}
        <div className="date-filter">
          <label>Veri Görüntüleme Aralığı:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            dateFormat="dd/MM/yyyy"
            placeholderText="Başlangıç tarihi seçin"
          />
        </div>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip contentStyle={{ backgroundColor: '#fff', borderRadius: '10px', border: '1px solid #ccc' }} />
            <Legend iconType="square" />
            
            <Line type="monotone" dataKey="zeka" stroke="red" strokeWidth={2} />
            <Line type="monotone" dataKey="görev" stroke="green" strokeWidth={2} />
            <Line type="monotone" dataKey="ev aktivitesi" stroke="gray" strokeWidth={1} />
          </LineChart>
        </ResponsiveContainer>
      </section>

      {/* Motivasyonel Yorum */}
      <section className="motivation-message">
        <p>{motivationMessage}</p>
      </section>

      {/* Görev Tamamlama Durumu */}
      <section className="task-status">
        <h2>Görev Tamamlama Durumu</h2>
        <p>Öğrencinin tamamlaması gereken ve eksik olan görevler şu şekildedir. Bu görevlerin takibi, öğrencinin genel başarısı için önemlidir.</p>
        <ul>
          <li>Matematik Ödevi: 12/12/2024</li>
          <li>Türkçe Testi: 10/12/2024</li>
        </ul>
        <div className="progress-bar">
          <div className="progress" style={{ width: '85%' }}></div>
        </div>
      </section>

      {/* Evde Yapılacak Aktiviteler */}
      <section className="suggestions">
        <h2>Evde Yapılacak Aktiviteler</h2>
        <p>Öğrencinin gelişen zekâ alanlarına odaklanarak evde yapabileceği aktiviteler önerilmektedir. Bu aktiviteler, öğrencinin potansiyelini daha da artıracaktır.</p>
        <ul>
          <li><span className="activity-icon">🧩</span> Mantıksal Zekâ: Problem çözme oyunları</li>
          <li><span className="activity-icon">📖</span> Sözel Zekâ: Kitap okuma</li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="footer">
        <button className="message-btn" onClick={goToMessageTab}>
          <FaComment style={{ marginRight: '8px' }} /> Öğretmenle İletişime Geç
        </button>
        <button className="export-btn" onClick={exportReport}>
          <FaFilePdf style={{ marginRight: '8px' }} /> Raporu İndir
        </button>
      </footer>
    </div>
  );
};

export default PerformanceTab;
