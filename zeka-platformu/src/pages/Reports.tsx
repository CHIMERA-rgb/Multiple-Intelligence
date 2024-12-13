import React, { useState, useRef } from 'react';
import { Line, Pie, Radar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale,
} from 'chart.js';
import { jsPDF } from 'jspdf';
import '../styles/Reports.css';

// Chart.js bileşenlerini kaydet
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadarController,
  RadialLinearScale
);

type TimePeriod = 'haftalık' | 'aylık' | 'yıllık';

const Reports = () => {
  const [timePeriod, setTimePeriod] = useState<TimePeriod>('haftalık');
  const [compareMode, setCompareMode] = useState(false);
  const [comparisonTimePeriod, setComparisonTimePeriod] = useState<TimePeriod>('aylık');
  const [comments, setComments] = useState<{ [key: string]: string }>({});

  const lineChartRef = useRef<ChartJS<'line'> | null>(null);
  const pieChartRef = useRef<ChartJS<'pie'> | null>(null);
  const radarChartRef = useRef<ChartJS<'radar'> | null>(null);
  const doughnutChartRef = useRef<ChartJS<'doughnut'> | null>(null);

  const getTimePeriodData = (period: TimePeriod) => {
    const data: Record<TimePeriod, number[]> = {
      haftalık: [80, 85, 90, 95, 88],
      aylık: [78, 83, 87, 92, 85],
      yıllık: [70, 75, 80, 85, 90],
    };
    return data[period];
  };

  const userData = {
    labels: ['Öğrenci', 'Öğretmen', 'Admin', 'Diğer Kullanıcılar'],
    datasets: [
      {
        label: 'Kullanıcı Dağılımı',
        data: [200, 50, 10, 40],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 159, 64)', 'rgb(153, 102, 255)', 'rgb(54, 162, 235)'],
      },
    ],
  };

  const intelligenceData = {
    labels: ['Mantıksal', 'Sözel', 'Görsel', 'Kinestetik', 'Müzikal'],
    datasets: [
      {
        label: 'Performans',
        data: [75, 80, 85, 90, 88],
        borderColor: 'rgb(153, 102, 255)',
        tension: 0.1,
      },
    ],
  };

  const activityCompletionData = {
    labels: ['Tamamlanan', 'Tamamlanmayan'],
    datasets: [
      {
        label: 'Aktivite Tamamlama Oranı',
        data: [75, 25],
        backgroundColor: ['rgb(75, 192, 192)', 'rgb(255, 99, 132)'],
      },
    ],
  };

  const data = {
    labels: ['Ocak', 'Şubat', 'Mart', 'Nisan', 'Mayıs'],
    datasets: [
      {
        label: `Genel Performans (${timePeriod})`,
        data: getTimePeriodData(timePeriod),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
      ...(compareMode
        ? [
            {
              label: `Genel Performans (${comparisonTimePeriod})`,
              data: getTimePeriodData(comparisonTimePeriod),
              borderColor: 'rgb(255, 99, 132)',
              tension: 0.1,
            },
          ]
        : []),
    ],
  };

  const generatePDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text('Genel Raporlar', 20, 20);
    doc.text(`Tarih: ${new Date().toLocaleDateString()}`, 20, 30);

    if (lineChartRef.current) {
      const lineChartImage = lineChartRef.current.toBase64Image();
      doc.addImage(lineChartImage, 'PNG', 20, 40, 160, 90);
      doc.text('Okul Performansı Zamanla', 20, 135);
    }

    if (pieChartRef.current) {
      const pieChartImage = pieChartRef.current.toBase64Image();
      doc.addImage(pieChartImage, 'PNG', 20, 150, 160, 90);
      doc.text('Kullanım İstatistikleri', 20, 245);
    }

    if (radarChartRef.current) {
      const radarChartImage = radarChartRef.current.toBase64Image();
      doc.addImage(radarChartImage, 'PNG', 20, 260, 160, 90);
      doc.text('Zeka Türlerine Göre Performans', 20, 355);
    }

    if (doughnutChartRef.current) {
      const doughnutChartImage = doughnutChartRef.current.toBase64Image();
      doc.addImage(doughnutChartImage, 'PNG', 20, 370, 160, 90);
      doc.text('Aktivite Tamamlama Oranı', 20, 465);
    }

    doc.save('GenelRaporlar.pdf');
  };

  return (
    <div className="reports-container">
      <h2>Genel Raporlar</h2>

      {/* Zaman Dilimi Seçimi */}
      <div className="time-period-buttons">
        {['haftalık', 'aylık', 'yıllık'].map((period) => (
          <button
            key={period}
            className={timePeriod === period ? 'selected-button' : ''}
            onClick={() => setTimePeriod(period as TimePeriod)}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </button>
        ))}
        {compareMode && (
          <select
            value={comparisonTimePeriod}
            onChange={(e) => setComparisonTimePeriod(e.target.value as TimePeriod)}
          >
            {['haftalık', 'aylık', 'yıllık'].map((period) => (
              <option key={period} value={period}>
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </option>
            ))}
          </select>
        )}
        <button onClick={() => setCompareMode((prev) => !prev)}>
          {compareMode ? 'Karşılaştırmayı Kapat' : 'Karşılaştır'}
        </button>
      </div>

      {/* Genel Performans */}
      <div className="report-section">
        <h3>Okul Performansı Zamanla</h3>
        <p>
          Bu grafik, okulun genel performansını izler ve zamanla nasıl bir gelişim sağlandığını gösterir. Farklı zaman dilimlerinde
          karşılaştırmalar yapabilirsiniz. Şu anki zaman dilimi: {timePeriod}.
        </p>
        <div className="chart-container">
          <Line
            ref={lineChartRef}
            data={data}
            options={{ responsive: true, maintainAspectRatio: false }}
          />
        </div>
        <p>
          Seçili zaman dilimi: {timePeriod}. Gelecek hafta için iyileştirme alanları belirtilmiştir.
        </p>
      </div>

      {/* Kullanıcı Dağılımı */}
      <div className="report-section">
        <h3>Kullanıcı Dağılımı</h3>
        <p>
          Kullanıcıların her rolü (öğrenci, öğretmen, admin) zaman içinde nasıl dağıldığını gösteren bir pasta grafiğidir.
        </p>
        <div className="chart-container">
          <Pie ref={pieChartRef} data={userData} />
        </div>
      </div>

      {/* Performans Türleri */}
      <div className="report-section">
        <h3>Zeka Türlerine Göre Performans</h3>
        <p>
          Öğrencilerin zeka türlerine göre performanslarını ölçen radar grafiğidir. İyileştirilmesi gereken alanlar burada
          belirtilmiştir.
        </p>
        <div className="chart-container">
          <Radar ref={radarChartRef} data={intelligenceData} />
        </div>
      </div>

      {/* Aktivite Tamamlama Oranı */}
      <div className="report-section">
        <h3>Aktivite Tamamlama Oranı</h3>
        <p>
          Bu grafik, öğrencilerin ne kadar aktivitelerini tamamladığını gösteren bir göstergeyi temsil eder.
        </p>
        <div className="chart-container">
          <Doughnut ref={doughnutChartRef} data={activityCompletionData} />
        </div>
      </div>

      {/* Yorumlar */}
      <div className="comments-section">
        <h3>Yorumlar</h3>
        <textarea
          value={comments[timePeriod] || ''}
          onChange={(e) => setComments({ ...comments, [timePeriod]: e.target.value })}
          placeholder="Bu zaman dilimi için yorumlarınızı yazın..."
        />
      </div>

      <div className="download-buttons">
        <button className="download-pdf-button" onClick={generatePDF}>
          PDF İndir
        </button>
      </div>
    </div>
  );
};

export default Reports;
