import React, { useState, useEffect } from 'react';
import '../styles/ContentManagement.css';

interface Content {
  id: number;
  title: string;
  category: string;
  status: string;
  teacher: string;
  file: File | null;
}

const ContentManagement = () => {
  const [contents, setContents] = useState<Content[]>([
    { id: 1, title: 'Matematik Dersi', category: 'Mantıksal-Matematiksel Zeka', status: 'pending', teacher: 'Ali Yılmaz', file: null },
    { id: 2, title: 'Edebiyat Dersi', category: 'Dilsel Zeka', status: 'approved', teacher: 'Ayşe Kalkan', file: null },
    { id: 3, title: 'Resim Dersi', category: 'Görsel-Zoomatik Zeka', status: 'rejected', teacher: 'Mehmet Özdemir', file: null },
    { id: 4, title: 'Müzik Dersi', category: 'Müzikal Zeka', status: 'pending', teacher: 'Gülseren Demir', file: null },
    { id: 5, title: 'Beden Eğitimi Dersi', category: 'Kinestetik Zeka', status: 'pending', teacher: 'Fikret Kaya', file: null },
    { id: 6, title: 'Coğrafya Dersi', category: 'Doğa Zeka', status: 'approved', teacher: 'Selin Arslan', file: null },
  ]);

  const [newContent, setNewContent] = useState<Content>({
    id: 0,
    title: '',
    category: 'Mantıksal-Matematiksel Zeka',
    status: 'pending',
    teacher: '',
    file: null,
  });

  const [popupMessage, setPopupMessage] = useState<string | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [isPopupVisible, setIsPopupVisible] = useState<boolean>(false);

  const startTimer = () => {
    let timeLeft = 5; // 5 saniye
    setIsPopupVisible(true); // Popup'ı açıyoruz
    setProgress(0); // İlerleme çubuğunu sıfırlıyoruz

    // Zamanlayıcıyı başlatıyoruz
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval); // 100% olunca zamanlayıcıyı durdur
          setIsPopupVisible(false); // Popup'ı kapatıyoruz
          return 100;
        }
        return prev + 100 / timeLeft; // İlerleme çubuğunu güncelliyoruz
      });
    }, 1000); // Her saniye
  };

  const handleStatusChange = (id: number, newStatus: string) => {
    let message = '';
    switch (newStatus) {
      case 'approved':
        message = `${contents.find(content => content.id === id)?.title} ders onaylandı`;
        break;
      case 'rejected':
        message = `${contents.find(content => content.id === id)?.title} ders iptal edildi`;
        break;
      case 'pending':
        message = `${contents.find(content => content.id === id)?.title} ders beklemede`;
        break;
    }

    // Pop-up'ı açmadan önce eski pop-up'ı kapatalım
    setIsPopupVisible(false);

    // Pop-up mesajını ayarlıyoruz
    setPopupMessage(message); 
    startTimer(); // Yeni pop-up'ı başlatıyoruz
    setContents(prevContents => 
      prevContents.map(content => 
        content.id === id ? { ...content, status: newStatus } : content
      )
    );
  };

  const handleDelete = (id: number) => {
    setContents(prevContents => 
      prevContents.filter(content => content.id !== id)
    );
  };

  const handleFileChange = (id: number, file: File | null) => {
    setContents(prevContents => 
      prevContents.map(content => 
        content.id === id ? { ...content, file: file } : content
      )
    );
  };

  const triggerFileInput = (id: number) => {
    const fileInput = document.getElementById(`file-input-${id}`) as HTMLInputElement;
    if (fileInput) fileInput.click();
  };

  const handleAddContent = (e: React.FormEvent) => {
    e.preventDefault();

    // Başlık veya öğretmen eksikse uyarı göster
    if (!newContent.title || !newContent.teacher) {
      alert('Başlık ve öğretmen alanları zorunludur.');
      return;
    }

    // Yeni içerik ekliyoruz
    const newContentItem: Content = {
      ...newContent,
      id: contents.length + 1,
      status: 'pending',
      file: null,
    };

    setContents([...contents, newContentItem]);

    // Formu sıfırlıyoruz
    setNewContent({
      id: 0,
      title: '',
      category: 'Mantıksal-Matematiksel Zeka',
      status: 'pending',
      teacher: '',
      file: null,
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewContent((prevContent) => ({
      ...prevContent,
      [name]: value,
    }));
  };

  return (
    <div className="content-management-container">
      <h2>İçerik Yönetimi</h2>

      {/* Pop-up mesajı */}
      {isPopupVisible && popupMessage && (
        <div className="popup">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
          <div className="popup-message">
            {popupMessage}
          </div>
        </div>
      )}

      <table>
        <thead>
          <tr>
            <th>Başlık</th>
            <th>Kategori</th>
            <th>Durum</th>
            <th>Öğretmen</th>
            <th>Dosya</th>
            <th>Aksiyon</th>
          </tr>
        </thead>
        <tbody>
          {contents.map(content => (
            <tr key={content.id}>
              <td>{content.title}</td>
              <td>{content.category}</td>
              <td>{content.status}</td>
              <td>{content.teacher}</td>
              <td>
                {content.file ? (
                  <a href={URL.createObjectURL(content.file)} download>{content.file.name}</a>
                ) : (
                  'Yok'
                )}
              </td>
              <td>
                <button
                  className="approve"
                  onClick={() => handleStatusChange(content.id, 'approved')}
                  disabled={content.status === 'approved'}
                >
                  Onayla
                </button>
                <button
                  className="reject"
                  onClick={() => handleStatusChange(content.id, 'rejected')}
                  disabled={content.status === 'rejected'}
                >
                  Reddet
                </button>
                <button
                  className="pending"
                  onClick={() => handleStatusChange(content.id, 'pending')}
                  disabled={content.status === 'pending'}
                >
                  Beklemede
                </button>
                <button
                  className="delete"
                  onClick={() => handleDelete(content.id)}
                >
                  Sil
                </button>
                <button
                  className="file-button"
                  onClick={() => triggerFileInput(content.id)}
                >
                  Dosya Seç
                </button>
                <input 
                  type="file" 
                  id={`file-input-${content.id}`}
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileChange(content.id, e.target.files ? e.target.files[0] : null)} 
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div>
        <h3>Yeni İçerik Ekle</h3>
        <form onSubmit={handleAddContent}>
          <label>
            Başlık:
            <input 
              type="text" 
              name="title" 
              value={newContent.title} 
              onChange={handleInputChange} 
              required 
            />
          </label>
          <label>
            Kategori:
            <select 
              name="category" 
              value={newContent.category} 
              onChange={handleInputChange}
            >
              <option value="Mantıksal-Matematiksel Zeka">Mantıksal-Matematiksel Zeka</option>
              <option value="Dilsel Zeka">Dilsel Zeka</option>
              <option value="Görsel-Zoomatik Zeka">Görsel-Zoomatik Zeka</option>
              <option value="Müzikal Zeka">Müzikal Zeka</option>
              <option value="Kinestetik Zeka">Kinestetik Zeka</option>
              <option value="Doğa Zeka">Doğa Zeka</option>
            </select>
          </label>
          <label>
            Öğretmen:
            <input 
              type="text" 
              name="teacher" 
              value={newContent.teacher} 
              onChange={handleInputChange}
              required
            />
          </label>
          <button type="submit">İçerik Ekle</button>
        </form>
      </div>
    </div>
  );
};

export default ContentManagement;
