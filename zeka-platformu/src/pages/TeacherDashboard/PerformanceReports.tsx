// src/pages/TeacherDashboard/PerformanceReports.tsx
import React, { useState } from 'react';
import { Line, Bar, Radar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import '../../styles/PerformanceReports.css';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement);

const PerformanceReports = () => {
  const [selectedGraph, setSelectedGraph] = useState('line');
  const [selectedStudent, setSelectedStudent] = useState<'all' | 'student1' | 'student2' | 'student3' | 'student4'>('all');
  const [showDetails, setShowDetails] = useState(true); // Öğrenci performans detaylarını açma/kapama

  const handleGraphChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedGraph(e.target.value);
  };

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(e.target.value as 'all' | 'student1' | 'student2' | 'student3' | 'student4');
  };

  const handleDetailsToggle = () => {
    setShowDetails(prev => !prev);
  };

  const studentData: { [key in 'all' | 'student1' | 'student2' | 'student3' | 'student4']: { labels: string[]; datasets: { label: string; data: number[]; borderColor: string; backgroundColor: string; fill: boolean; }[] } } = {
    all: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
      datasets: [
        {
          label: 'Tüm Öğrencilerin Performansı',
          data: [65, 59, 80, 81, 56],
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          fill: true,
        },
      ],
    },
    student1: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
      datasets: [
        {
          label: 'Öğrenci 1 Performansı',
          data: [72, 78, 85, 90, 88],
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          fill: true,
        },
      ],
    },
    student2: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
      datasets: [
        {
          label: 'Öğrenci 2 Performansı',
          data: [65, 60, 72, 85, 80],
          borderColor: 'rgba(54, 162, 235, 1)',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          fill: true,
        },
      ],
    },
    student3: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
      datasets: [
        {
          label: 'Öğrenci 3 Performansı',
          data: [55, 65, 75, 80, 90],
          borderColor: 'rgba(153, 102, 255, 1)',
          backgroundColor: 'rgba(153, 102, 255, 0.2)',
          fill: true,
        },
      ],
    },
    student4: {
      labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
      datasets: [
        {
          label: 'Öğrenci 4 Performansı',
          data: [80, 85, 88, 90, 92],
          borderColor: 'rgba(255, 159, 64, 1)',
          backgroundColor: 'rgba(255, 159, 64, 0.2)',
          fill: true,
        },
      ],
    },
  };

  const renderGraph = () => {
    const data = studentData[selectedStudent];
    switch (selectedGraph) {
      case 'line':
        return <Line data={data} />;
      case 'bar':
        return <Bar data={data} />;
      case 'radar':
        return <Radar data={data} />;
      case 'pie':
        return <Pie data={data} />;
      default:
        return <Line data={data} />;
    }
  };

  return (
    <div className="performance-reports">
      <h1>Öğrenci Performans Raporları</h1>

      <div className="filter-section">
        <div className="student-selection">
          <label htmlFor="student">Öğrenci Seçin:</label>
          <select id="student" onChange={handleStudentChange} value={selectedStudent}>
            <option value="all">Tüm Öğrenciler</option>
            <option value="student1">Öğrenci 1</option>
            <option value="student2">Öğrenci 2</option>
            <option value="student3">Öğrenci 3</option>
            <option value="student4">Öğrenci 4</option>
          </select>
        </div>

        <div className="graph-selection">
          <label htmlFor="graphType">Grafik Türü:</label>
          <select id="graphType" onChange={handleGraphChange} value={selectedGraph}>
            <option value="line">Çizgi Grafik</option>
            <option value="bar">Çubuk Grafik</option>
            <option value="radar">Radar Grafik</option>
            <option value="pie">Pasta Grafik</option>
          </select>
        </div>

        <div className="details-toggle">
          <button onClick={handleDetailsToggle}>{showDetails ? 'Detayları Gizle' : 'Detayları Göster'}</button>
        </div>
      </div>

      <div className="report-content">
        <h2>Seçilen Öğrenci: {selectedStudent === 'all' ? 'Tüm Öğrenciler' : selectedStudent}</h2>
        <h3>Seçilen Grafik: {selectedGraph === 'line' ? 'Çizgi Grafik' : selectedGraph === 'bar' ? 'Çubuk Grafik' : selectedGraph === 'radar' ? 'Radar Grafik' : 'Pasta Grafik'}</h3>

        <div className="graph-placeholder">
          {renderGraph()}
        </div>

        {showDetails && (
          <div className="student-performance">
            <h3>Öğrencinin Performans Özeti</h3>
            <p>Öğrencinin son 3 ayda gösterdiği performans grafik üzerinden incelenebilir. Bu dönemde, öğrencinin genel gelişimi, güçlü ve zayıf alanları değerlendirilebilir.</p>

            <div className="performance-details">
              <h4>Güçlü Alanlar:</h4>
              <ul>
                <li>Matematiksel Mantık</li>
                <li>Doğa Bilimleri</li>
                <li>İletişim Becerileri</li>
              </ul>

              <h4>Geliştirilmesi Gereken Alanlar:</h4>
              <ul>
                <li>Okuma Anlama</li>
                <li>Sosyal Beceriler</li>
                <li>Yazılı İfade</li>
              </ul>
            </div>

            <div className="suggestions">
              <h4>Öneriler:</h4>
              <p>Öğrencinin zayıf olduğu alanlarda daha fazla uygulama yapması önerilmektedir. Evde yapılacak okuma çalışmaları ve grup projeleri öğrencinin gelişimine katkı sağlayacaktır.</p>
            </div>
          </div>
        )}

        <div className="overall-assessment">
          <h3>Genel Değerlendirme</h3>
          <p>Öğrenci, bu dönemde gösterdiği performansla genel başarı seviyesini artırmıştır. Ancak, belirli alanlarda daha fazla çalışması gerekmektedir. Öğrencinin motivasyonu arttıkça bu alanlarda daha hızlı gelişim sağlanacaktır.</p>
        </div>

        <div className="parent-communication">
          <h3>Veli İletişimi</h3>
          <p>Öğrencinin ilerlemesi hakkında velilerin bilgilendirilmesi önemlidir. Bu bölümde, öğretmenler öğrencinin zayıf ve güçlü alanlarını velilere bildirebilir.</p>
        </div>

        <div className="class-comparison">
          <h3>Sınıf Karşılaştırması</h3>
          <p>Öğrencinin sınıfındaki diğer öğrencilerle karşılaştırmalı performans analizleri yapılabilir. Bu karşılaştırma, öğrencinin sınıf içindeki yerini anlamasına yardımcı olabilir.</p>
        </div>
      </div>
    </div>
  );
};

export default PerformanceReports;
