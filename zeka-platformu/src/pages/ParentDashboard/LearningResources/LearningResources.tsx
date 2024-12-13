import React, { useState } from 'react';
import './LearningResources.css';

const LearningResources = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Kaynaklar kategorilere ayrılmış durumda.
  const resources: { [key: string]: { title: string; description: string; link: string; icon: string }[] } = {
    'Dilsel Zeka': [
        { title: 'Dil ve Anlatım Kaynakları', description: 'Dil becerilerini geliştiren kaynaklar', link: '#language1', icon: '📚' },
        { title: 'Edebiyat Kitapları', description: 'Edebiyat kitapları ve analizleri', link: '#literature1', icon: '📖' },
        { title: 'Yazılı Anlatım Teknikleri', description: 'Yazılı anlatımı geliştirme stratejileri', link: '#writing1', icon: '✍️' },
        { title: 'Kelimelerle Oyunlar', description: 'Kelime dağarcığını geliştiren eğlenceli aktiviteler', link: '#wordgames1', icon: '🧩' },
        { title: 'Şiir Yazma Teknikleri', description: 'Şiir yazmayı öğrenmek için kaynaklar', link: '#poetry1', icon: '✒️' },
      ],
      'Matematiksel Zeka': [
        { title: 'Matematiksel Problemler', description: 'Zeka geliştiren matematik problemleri', link: '#mathproblems1', icon: '🔢' },
        { title: 'Geometri Kaynakları', description: 'Geometri konularında dersler ve açıklamalar', link: '#geometry1', icon: '🔺' },
        { title: 'Matematiksel Modelleme', description: 'Matematiksel modelleme üzerine kaynaklar', link: '#modeling1', icon: '🧮' },
        { title: 'Fizik ve Matematik', description: 'Fizik problemleriyle matematiksel düşünme becerisi', link: '#physicsmath1', icon: '⚛️' },
        { title: 'İleri Matematik', description: 'İleri düzey matematik konuları ve kaynaklar', link: '#advancedmath1', icon: '🔢' },
      ],
      'Görsel Zeka': [
          { title: 'Görsel Hafıza Egzersizleri', description: 'Görsel hafızayı güçlendiren egzersizler', link: '#visualmemory1', icon: '🔍' },
          { title: 'Sanat Eserleri Üzerine Çalışmalar', description: 'Ünlü sanat eserleri ve teknik incelemeler', link: '#artwork1', icon: '🖼️' },
          { title: 'Mimari Tasarım', description: 'Mimari tasarım üzerine dersler', link: '#architecture1', icon: '🏛️' },
          { title: 'Fotografçılık Temelleri', description: 'Fotoğrafçılık konusunda öğrenilecek temel bilgiler', link: '#photography1', icon: '📸' },
          { title: 'Renk Teorisi', description: 'Renklerin psikolojik etkilerini öğrenin', link: '#colorTheory1', icon: '🎨' },
        ],
        'Müzikal Zeka': [
          { title: 'Müzik Teorisi', description: 'Müzik teorisi üzerine kaynaklar', link: '#musictheory1', icon: '🎶' },
          { title: 'Piyano Çalışmaları', description: 'Piyano çalmayı öğrenmek için kaynaklar', link: '#piano1', icon: '🎹' },
          { title: 'Gitar Dersi', description: 'Gitar çalmayı öğrenmek için kaynaklar', link: '#guitar1', icon: '🎸' },
          { title: 'Müzikal Nota Okuma', description: 'Nota okuma becerilerini geliştiren kaynaklar', link: '#sheetmusic1', icon: '🎵' },
          { title: 'Dünya Müzikleri', description: 'Farklı kültürlerin müziklerine dair bilgiler', link: '#worldmusic1', icon: '🌍' },
        ],
        'Kinestetik Zeka': [
          { title: 'Dans ve Hareket', description: 'Dans tekniklerini geliştiren kaynaklar', link: '#dance1', icon: '💃' },
          { title: 'Fiziksel Aktivite', description: 'Fiziksel sağlığı artıran egzersizler', link: '#exercise1', icon: '🏋️' },
          { title: 'Yoga ve Meditasyon', description: 'Fiziksel ve zihinsel sağlık için yoga ve meditasyon teknikleri', link: '#yoga1', icon: '🧘' },
          { title: 'Koşu Teknikleri', description: 'Koşu tekniklerini geliştiren eğitimler', link: '#running1', icon: '🏃‍♂️' },
          { title: 'Takım Sporları', description: 'Futbol, basketbol gibi takım sporlarıyla ilgili kaynaklar', link: '#teamSports1', icon: '⚽' },
        ],
        'Doğa Zeka': [
          { title: 'Ekoloji Çalışmaları', description: 'Ekoloji ve çevre bilinci üzerine kaynaklar', link: '#ecology1', icon: '🌱' },
          { title: 'Biyoloji Kitapları', description: 'Biyoloji ve doğa bilimleri kitapları', link: '#biology1', icon: '🧬' },
          { title: 'Doğal Yaşamı Koruma', description: 'Doğal yaşamı koruma üzerine bilgiler', link: '#conservation1', icon: '🌳' },
          { title: 'Hayvan Davranışları', description: 'Hayvan davranışlarını inceleyen kaynaklar', link: '#animalbehavior1', icon: '🐾' },
          { title: 'Botanik Çalışmaları', description: 'Bitki bilimi ve botanik üzerine çalışmalar', link: '#botany1', icon: '🌸' },
        ],
        'Sosyal Zeka': [
          { title: 'Empati Geliştirme', description: 'Empati becerilerini geliştirmek için kaynaklar', link: '#empathy1', icon: '🤝' },
          { title: 'Psikolojik Danışmanlık', description: 'Psikolojik danışmanlık ve rehberlik üzerine bilgiler', link: '#counseling1', icon: '🧠' },
          { title: 'Sosyal Etkileşim Teknikleri', description: 'Sosyal becerileri geliştirmek için kaynaklar', link: '#socialskills1', icon: '👥' },
          { title: 'Takım Çalışması', description: 'Ekip çalışmasını ve liderliği geliştiren eğitimler', link: '#teamwork1', icon: '🤝' },
          { title: 'Sosyal Duygusal Öğrenme', description: 'Sosyal ve duygusal öğrenme becerilerini geliştiren kaynaklar', link: '#sel1', icon: '🧑‍🤝‍🧑' },
        ],
        'İçsel Zeka': [
          { title: 'Meditasyon Teknikleri', description: 'Zihinsel rahatlama ve farkındalık için meditasyon kaynakları', link: '#meditation1', icon: '🧘‍♀️' },
          { title: 'Kendilik Gelişimi', description: 'Kendini keşfetme ve kişisel gelişim üzerine kaynaklar', link: '#selfdevelopment1', icon: '💡' },
          { title: 'Zihinsel Dayanıklılık', description: 'Zihinsel dayanıklılığı artıran stratejiler', link: '#resilience1', icon: '🧠' },
          { title: 'Felsefi Düşünceler', description: 'Felsefi düşünme becerilerini geliştiren kitaplar', link: '#philosophy1', icon: '📜' },
          { title: 'Kendini Keşfet', description: 'Kendini daha iyi tanımaya yönelik rehberler', link: '#selfdiscovery1', icon: '🔍' },
        ]
    // Diğer zekâ türleri buraya eklenmiştir.
  };

  // Kategori seçme işlemi
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  // Kaynak aç/kapa işlemi
  const toggleResource = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="learning-resources">
      <h1>ÖĞRENME KAYNAKLARI</h1>
      <div className="categories">
        {Object.keys(resources).map((category) => (
          <button
            key={category}
            className={selectedCategory === category ? 'active' : ''}
            onClick={() => handleCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="accordion">
        {selectedCategory && resources[selectedCategory] ? (
          resources[selectedCategory].map((resource, index) => (
            <div key={index} className={`accordion-item ${openIndex === index ? 'active' : ''}`}>
              <div className="accordion-header" onClick={() => toggleResource(index)}>
                <span className="icon">{resource.icon}</span>
                <h3>{resource.title}</h3>
                <span>{openIndex === index ? '-' : '+'}</span>
              </div>
              {openIndex === index && (
                <div className="accordion-content">
                  <p>{resource.description}</p>
                  <a href={resource.link} target="_blank" rel="noopener noreferrer">
                    Detaylar
                  </a>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>ZEKA TÜRLERİ İLE ALAKALI GEREKLİ BİLGİLERİ ALMAK İÇİN ZEKA TÜRÜ SEÇİNİZ</p>
        )}
      </div>
    </div>
  );
};

export default LearningResources;
