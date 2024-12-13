import React from "react";
import "../../styles/Statistic.css";

const Statistic: React.FC = () => {
  return (
    <div className="statistic-container">
      <h1 className="statistic-title">İstatistikler</h1>
      <p className="statistic-subtitle">
        Platform üzerindeki genel durumu ve en son verileri inceleyin.
      </p>

      {/* Özet Bilgiler Bölümü */}
      <div className="stat-summary">
        <div>
          <h3>Toplam Ders</h3>
          <p>35</p>
        </div>
        <div>
          <h3>Aktif Kullanıcılar</h3>
          <p>320</p>
        </div>
        <div>
          <h3>Tamamlanan Görevler</h3>
          <p>870</p>
        </div>
      </div>

      {/* Kartlar */}
      <div className="statistic-cards">
        <div className="stat-card">
          <h2>Kullanıcı Sayısı</h2>
          <p>450</p>
        </div>
        <div className="stat-card">
          <h2>Toplam Aktivite</h2>
          <p>1200</p>
        </div>
        <div className="stat-card">
          <h2>Son Eklenen Kullanıcı</h2>
          <p>Ali Veli</p>
        </div>
      </div>

      {/* Kategori Bazlı İstatistikler */}
      <div className="category-stats">
        <h2>Kategori Bazlı İstatistikler</h2>
        <div className="category-grid">
          <div className="category-card">
            <h3>Matematik</h3>
            <p>75 Tamamlanan Görev</p>
          </div>
          <div className="category-card">
            <h3>Fen Bilimleri</h3>
            <p>68 Tamamlanan Görev</p>
          </div>
          <div className="category-card">
            <h3>Türkçe</h3>
            <p>80 Tamamlanan Görev</p>
          </div>
          <div className="category-card">
            <h3>Sosyal Bilgiler</h3>
            <p>55 Tamamlanan Görev</p>
          </div>
        </div>
      </div>

      {/* Görüşler ve Yorumlar */}
      <div className="user-feedback">
        <h2>Kullanıcı Görüşleri</h2>
        <ul>
          <li>"Platform, çocuğumun öğrenme sürecine çok katkı sağladı!" - <em>Bir Veli</em></li>
          <li>"Görevleri kolayca yönetebiliyorum, harika!" - <em>Bir Öğretmen</em></li>
          <li>"Rozetler almak beni çok motive ediyor!" - <em>Bir Öğrenci</em></li>
        </ul>
      </div>

      {/* Hedef Takibi */}
      <div className="goal-tracking">
        <h2>Hedef Takibi</h2>
        <div className="goal">
          <span>Ders Katılım Hedefi</span>
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: "70%" }}></div>
          </div>
          <span>%70</span>
        </div>
        <div className="goal">
          <span>Ödev Tamamlama Hedefi</span>
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: "85%" }}></div>
          </div>
          <span>%85</span>
        </div>
        <div className="goal">
          <span>Etkinlik Katılım Hedefi</span>
          <div className="goal-bar">
            <div className="goal-fill" style={{ width: "50%" }}></div>
          </div>
          <span>%50</span>
        </div>
      </div>

      {/* Güncel Duyurular */}
      <div className="recent-announcements">
        <h2>Güncel Duyurular</h2>
        <ul>
          <li>📢 02/12/2024: Yeni eğitim materyalleri eklendi.</li>
          <li>📢 01/12/2024: Yarıyıl etkinlikleri açıklandı.</li>
          <li>📢 30/11/2024: Öğretmen değerlendirme anketi başladı.</li>
        </ul>
      </div>

      {/* Son Hareketler */}
      <div className="recent-activities">
        <h2>Son Hareketler</h2>
        <ul>
          <li>📅 01/12/2024: Ayşe Yılmaz yeni bir ödev tamamladı.</li>
          <li>📅 02/12/2024: Mehmet Kaya sınıf etkinliğine katıldı.</li>
          <li>📅 02/12/2024: Selin Demir yeni bir başarı elde etti.</li>
        </ul>
      </div>
    </div>
  );
};

export default Statistic;
