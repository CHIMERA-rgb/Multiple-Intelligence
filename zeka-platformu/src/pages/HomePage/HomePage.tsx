import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCog, FaChalkboardTeacher, FaUsers, FaChartBar, FaBell, FaRegFileAlt, FaLinkedin } from 'react-icons/fa';
import { MdMessage } from 'react-icons/md';
import { AiFillLinkedin, AiOutlineAppstoreAdd } from 'react-icons/ai';
import { FiLayers } from 'react-icons/fi';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import '../../styles/HomePage.css';

// Slider görselleri
const images = [
  '/images/1.jpg',
  '/images/2.jpg',
  '/images/3.jpg',
  '/images/4.jpg',
  '/images/5.jpg',
];

const texts = [
  'İlk resmin metni',
  'İkinci resmin metni',
  'Üçüncü resmin metni',
  'Dördüncü resmin metni',
  'Beşinci resmin metni',
];

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);

  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }
    }, 5000);

    return () => clearInterval(interval); // Temizlik işlemi
  }, [isPaused]);

  const handleNext = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    setTimeout(() => setIsPaused(false), 5000); // 5 saniye sonra yeniden başlar
  };

  const handlePrev = () => {
    setIsPaused(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setTimeout(() => setIsPaused(false), 5000);
  };

  useEffect(() => {
    // Scroll animasyonu için card elementlerini görünür yapma
    const handleScroll = () => {
      const cards = document.querySelectorAll('.card');
      const windowHeight = window.innerHeight;

      cards.forEach((card) => {
        const cardTop = card.getBoundingClientRect().top;
        if (cardTop < windowHeight - 100) {
          card.classList.add('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    // İlk yüklemede scroll animasyonlarını tetikleyelim
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="homepage-container">
      <div className="navbar">
        <div className="navbar-logo">Proje İsmi</div>
        <div className="navbar-links">
          <span onClick={() => navigate('/login')}>Giriş Yap</span>
          <span>Ücretsiz Deneyin</span>
          <span>İletişim</span>
        </div>
      </div>

      {/* Slider */}
      <div className="slider">
        {/* Geri Butonu */}
        <button className="slider-button slider-button-left" onClick={handlePrev}>
          ‹
        </button>

        {/* Slider Track */}
        <div
          className="slider-track"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 2s ease-in-out',
          }}
        >
          {images.map((src: string, index: number) => (
            <img key={index} src={src} alt={`Slider Image ${index + 1}`} />
          ))}
        </div>

        {/* İleri Butonu */}
        <button className="slider-button slider-button-right" onClick={handleNext}>
          ›
        </button>
      </div>

      {/* Cards Section */}
      <div className="cards-container">
        <div className="card">
          <FaUserCog size={50} className="card-icon" />
          <h2 className="card-title">Admin Paneli</h2>
          <p className="card-description">
            Yönetici paneli, okul yönetimi için kullanıcı ekleme, düzenleme ve silme işlemleri sunar. 
            Ayrıca okulun genel performansını raporlama, içerik yönetimi ve duyurular yapabilirsiniz.
          </p>
        </div>

        <div className="card">
          <FaChalkboardTeacher size={50} className="card-icon" />
          <h2 className="card-title">Öğretmen Paneli</h2>
          <p className="card-description">
            Öğretmenler, sınıf yönetimi, öğrenci performanslarını takip etme, ödev atama ve öğrenci raporları oluşturma imkanı sağlar.
          </p>
        </div>

        <div className="card">
          <FaUsers size={50} className="card-icon" />
          <h2 className="card-title">Veli Paneli</h2>
          <p className="card-description">
            Veliler, çocuklarının performansını görüntüleyebilir, öğretmenlerle iletişime geçebilir ve okul etkinliklerini takip edebilir.
          </p>
        </div>

        <div className="card">
          <FaChartBar size={50} className="card-icon" />
          <h2 className="card-title">Performans Raporları</h2>
          <p className="card-description">
            Öğrencilerin zekâ türlerine göre performanslarını izleyebilir, sınıf karşılaştırmaları yapabilir ve genel değerlendirme raporlarına ulaşabilirsiniz.
          </p>
        </div>

        <div className="card">
          <FaBell size={50} className="card-icon" />
          <h2 className="card-title">Duyuru ve Bildirimler</h2>
          <p className="card-description">
            Okul içi ve okul dışı etkinliklerle ilgili duyuru ve bildirimler, ilgili gruplara veya tüm okuluna gönderilebilir.
          </p>
        </div>

        <div className="card">
          <MdMessage size={50} className="card-icon" />
          <h2 className="card-title">Mesajlaşma</h2>
          <p className="card-description">
            Veliler ve öğretmenler, öğrenci hakkında hızlı ve güvenli bir şekilde iletişim kurabilirler.
          </p>
        </div>

        <div className="card">
          <FaRegFileAlt size={50} className="card-icon" />
          <h2 className="card-title">Öğrenme Kaynakları</h2>
          <p className="card-description">
            Öğrencilerin gelişimlerini destekleyecek evde yapılacak etkinlikler ve öğrenme materyalleri önerilir.
          </p>
        </div>

        {/* Yeni Kartlar */}
        <div className="card">
          <AiOutlineAppstoreAdd size={50} className="card-icon" />
          <h2 className="card-title">İçerik Yönetimi</h2>
          <p className="card-description">
            Öğretmenlerin, ders içeriklerini ve materyalleri eklemeleri ve düzenlemeleri için kolay bir platform sağlar.
          </p>
        </div>

        <div className="card">
          <FiLayers size={50} className="card-icon" />
          <h2 className="card-title">Katmanlı Kullanıcı Erişimi</h2>
          <p className="card-description">
            Farklı roller (admin, öğretmen, öğrenci, veli) için özelleştirilmiş erişim ve yetki seviyeleri sağlar.
          </p>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="social-media-panel">
        <div className="left-side">
          <div className="social-media-title">Bizimle Kalın</div>
          <div className="social-media-description">
            Okul projelerimiz, etkinliklerimiz ve daha fazlası için sosyal medya hesaplarımızı takip edin! Her zaman güncel kalın!
          </div>
          <div className="social-media-container">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-media-icon social-media-facebook">
              <FaFacebookF size={30} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-media-icon social-media-twitter">
              <FaTwitter size={30} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-media-icon social-media-instagram">
              <FaInstagram size={30} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-media-icon social-media-linkedin">
              <AiFillLinkedin size={30} />
            </a>
          </div>
        </div>

        <div className="right-side">
        </div>

      </div>

      {/* Footer */}
      <footer className="footer">
  <div className="footer-content">
    <div className="footer-left">
      <p>Proje İsmi</p>
    </div>
    <div className="footer-center">
    <p>İletişim Adresi: <a href="https://mail.google.com/mail/?view=cm&fs=1&to=tekederelift@gmail.com" style={{ textDecoration: 'none', color: 'white' }}>tekederelift@gmail.com</a> | Telefon: +90 123 456 7890</p>




      <p>&copy; 2024 Okul Projesi Tüm Hakları Saklıdır</p>
    </div>
    <div className="footer-right">
      <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        ↑
      </button>
    </div>
  </div>
</footer>

    </div>
  );
};

export default HomePage;
