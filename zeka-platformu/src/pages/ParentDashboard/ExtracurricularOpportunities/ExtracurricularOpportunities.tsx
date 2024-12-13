import React from "react";
import './ExtracurricularOpportunities.css';

const ExtracurricularOpportunities = () => {
  // Örnek aktiviteler
  const activities = [
    {
      title: "Futbol",
      description: "Futbol takımı için yaz aylarında haftada 3 gün antrenman yapılmaktadır. Öğrenciler takım çalışması ve disiplin kazanacak, ayrıca fiziksel gelişimlerini ilerletecekler.",
      ageGroup: "12-18 Yaş",
      time: "Pazar 10:00 - 12:00",
      location: "Okul Sahası",
      applyLink: "/register/football",
    },
    {
      title: "Drama Kulübü",
      description: "Tiyatro oyunları ve drama çalışmaları için kulüp etkinlikleri. Öğrenciler hem sahne sanatları hem de özgüven geliştirecekler.",
      ageGroup: "10-16 Yaş",
      time: "Salı 15:00 - 17:00",
      location: "Drama Sınıfı",
      applyLink: "/register/drama",
    },
    {
      title: "Robotik Kulübü",
      description: "Bilim ve teknolojiye ilgi duyan öğrenciler için robotik atölyeleri. Öğrenciler, robotik dünyasına giriş yapacak ve takım çalışmasını öğrenerek proje geliştirecekler.",
      ageGroup: "12-18 Yaş",
      time: "Çarşamba 14:00 - 16:00",
      location: "Bilim Laboratuvarı",
      applyLink: "/register/robotics",
    },
    {
      title: "Resim ve Sanat Kulübü",
      description: "Öğrenciler, farklı sanat teknikleriyle resim yapacak, yaratıcı düşünme becerilerini geliştirecek ve sanatsal ifade özgürlüğü kazanacaklar.",
      ageGroup: "8-14 Yaş",
      time: "Perşembe 13:00 - 15:00",
      location: "Sanat Atölyesi",
      applyLink: "/register/art",
    },
    {
      title: "Müzik Kulübü",
      description: "Müzik yeteneği olan ve olmayan öğrenciler için şarkı söyleme, enstrüman çalma ve müzik teorisi çalışmaları yapılacaktır.",
      ageGroup: "10-18 Yaş",
      time: "Cuma 16:00 - 18:00",
      location: "Müzik Odası",
      applyLink: "/register/music",
    },
  ];
  

  return (
    <div className="extracurricular-container">
      <h1>Okul Dışı Eğitim Olanakları</h1>
      <p>
        Öğrencilerimize sunduğumuz okul dışı eğitim olanakları, onların kişisel ve akademik gelişimlerine katkı sağlamak amacıyla seçilmiştir. Bu etkinlikler, öğrencilerin farklı yeteneklerini keşfetmelerine ve sosyal becerilerini geliştirmelerine yardımcı olacaktır. Farklı yaş grupları ve ilgi alanlarına göre seçenekler sunulmaktadır.
      </p>

      {/* Yeni Eklenen Bilgi Kutusu */}
      <div className="information-box">
        <h3>Okul Dışı Etkinliklerin Faydaları:</h3>
        <ul>
          <li>Öğrencilerin özgüven ve liderlik becerilerini geliştirme.</li>
          <li>Yaratıcılık ve problem çözme yeteneklerini artırma.</li>
          <li>Farklı ilgi alanlarında uzmanlaşma ve yeni yetenekler kazanma.</li>
          <li>Sosyal becerilerin gelişmesi ve takım çalışması deneyimi kazanma.</li>
        </ul>
      </div>

      {/* Etkinlikler Listesi */}
      <div className="activities-list">
        {activities.map((activity, index) => (
          <div className="activity-item" key={index}>
            <h2>{activity.title}</h2>
            <p>{activity.description}</p>
            <ul>
              <li><strong>Yaş Grubu:</strong> {activity.ageGroup}</li>
              <li><strong>Zaman:</strong> {activity.time}</li>
              <li><strong>Konum:</strong> {activity.location}</li>
            </ul>
            <a href={activity.applyLink} className="apply-link">Başvur</a>
          </div>
        ))}
      </div>

      {/* Sıkça Sorulan Sorular */}
      <div className="faq-section">
        <h3>Sıkça Sorulan Sorular</h3>
        <div className="faq-item">
          <strong>1. Etkinliklere nasıl başvurabilirim?</strong>
          <p>Her etkinlik için başvuru linki sağlanmıştır. Başvurular için ilgili etkinliğin başvuru linkine tıklayarak kaydınızı gerçekleştirebilirsiniz.</p>
        </div>
        <div className="faq-item">
          <strong>2. Etkinlikler ücretli midir?</strong>
          <p>Etkinliklerin çoğu okul bünyesinde ücretsiz olarak sunulmaktadır. Ancak bazı özel etkinlikler için küçük bir katılım ücreti alınabilir. Detaylı bilgiye başvuru sırasında ulaşabilirsiniz.</p>
        </div>
        <div className="faq-item">
          <strong>3. Etkinliklerin güvenliği nasıl sağlanmaktadır?</strong>
          <p>Tüm etkinlikler, okulun deneyimli öğretmenleri ve etkinlik liderleri tarafından düzenlenmektedir. Öğrencilerin güvenliği en ön planda tutulmaktadır.</p>
        </div>
        <div className="faq-item">
          <strong>4. Etkinliklerin süresi ne kadardır?</strong>
          <p>Etkinlikler genellikle haftada bir kez 2 saatlik seanslar halinde düzenlenmektedir. Ancak bazı etkinliklerin süresi daha kısa veya uzun olabilir. Detaylar her etkinliğin açıklamasında belirtilmiştir.</p>
        </div>
      </div>

      {/* Yeni Eklenen Etkinlik Takvimi */}
      <div className="calendar-section">
        <h3>Etkinlik Takvimi</h3>
        <p>Yukarıdaki etkinliklerin tarih ve saat bilgilerini takvimde bulabilirsiniz.</p>
        {/* Burada basit bir takvim veya tarih gösterimi eklenebilir */}
      </div>

    </div>
  );
};

export default ExtracurricularOpportunities;
