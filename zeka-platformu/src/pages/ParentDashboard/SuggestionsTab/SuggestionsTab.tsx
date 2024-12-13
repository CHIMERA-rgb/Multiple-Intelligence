import React, { useState } from "react";
import "./SuggestionsTab.css";

// Zekâ türlerine göre öneri tipleri
interface Suggestion {
  id: number;
  title: string;
  description: string;
  date: string;
  completed: boolean; // Yeni alan: önerinin tamamlanma durumu
}

// Çocuk bilgisi
interface ChildProfile {
  name: string;
  intelligenceType: string; // Çocuğun zekâ türü
  intelligenceImage: string; // Zekâ türü görseli
}

const SuggestionsTab: React.FC = () => {
  // Çocuğun bilgileri
  const [childProfile] = useState<ChildProfile>({
    name: "Ahmet",
    intelligenceType: "Dilsel Zeka",
    intelligenceImage: "/images/student-avatar.jpg",
  });

  // Zeka türüne özgü öneri listesi
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    {
      id: 1,
      title: "Daha Fazla Okuma ve Yazma Alıştırması",
      description:
        "Çocuğunuzun dilsel zekasını geliştirmek için günlük okuma alışkanlıkları kazandırın ve yazılı çalışmalar yapmasını teşvik edin.",
      date: "2024-12-08",
      completed: false,
    },
    {
      id: 2,
      title: "Hikaye Anlatma Çalışmaları",
      description:
        "Çocuğunuzun kelime dağarcığını ve anlatım becerilerini artırmak için, hikayeler yaratmasını ve anlatmasını teşvik edin.",
      date: "2024-12-08",
      completed: false,
    },
    {
      id: 3,
      title: "Kelime Oyunları ve Bulmacalar",
      description:
        "Dilsel zekayı desteklemek için eğlenceli kelime oyunları ve bulmacalar yapın. Kelime bilgisi gelişecek ve dil becerileri artacaktır.",
      date: "2024-12-08",
      completed: false,
    },
  ]);

  // Pop-up görünürlüğünü kontrol eden state
  const [popupVisible, setPopupVisible] = useState(false);

  // Öneriyi tamamlanmış olarak işaretleme ve pop-up gösterme
  const markAsCompleted = (id: number) => {
    setSuggestions((prev) =>
      prev.map((suggestion) =>
        suggestion.id === id ? { ...suggestion, completed: true } : suggestion
      )
    );
    // Pop-up'ı göster ve 3 saniye sonra kaybolmasını sağla
    setPopupVisible(true);
    setTimeout(() => setPopupVisible(false), 3000); // 3 saniye sonra gizle
  };

  return (
    <div className="suggestions-tab-container">
      <header className="header">
        <div className="header-content">
          <img
            className="intelligence-image"
            src={childProfile.intelligenceImage}
            alt={childProfile.intelligenceType}
          />
          <div>
            <h2 className="header-title">
              {childProfile.name} için {childProfile.intelligenceType} Önerileri
            </h2>
          </div>
        </div>
        <p className="header-subtitle">
          Daha iyi bir gelecek için zekâ potansiyelini geliştirin.
        </p>
      </header>

      <div className="suggestions-list">
        {suggestions.map((suggestion) => (
          <div
            className={`suggestion-item ${
              suggestion.completed ? "completed" : ""
            }`}
            key={suggestion.id}
          >
            <h3 className="suggestion-title">{suggestion.title}</h3>
            <p className="suggestion-description">{suggestion.description}</p>
            <span className="suggestion-date">{suggestion.date}</span>
            {!suggestion.completed && (
              <button
                className="mark-complete-btn"
                onClick={() => markAsCompleted(suggestion.id)}
              >
                Tamamlandı
              </button>
            )}
          </div>
        ))}
      </div>

      {popupVisible && (
        <div className="popup">
          <p>🎉 Tebrikler! Ahmet harika bir iş çıkardı! 🎉</p>
        </div>
      )}
    </div>
  );
};

export default SuggestionsTab;
