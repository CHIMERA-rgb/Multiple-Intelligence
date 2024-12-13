import React, { useState } from 'react';
import '../../styles/Feedback.css';

const Feedback: React.FC = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [selectedStudent, setSelectedStudent] = useState<string>('');
  const [feedbackText, setFeedbackText] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<string>('positive');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Submission confirmation
  const [showConfirmPopup, setShowConfirmPopup] = useState<boolean>(false); // Confirmation pop-up visibility

  // Sınıf değişimi
  const handleClassChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(e.target.value);
    setSelectedStudent(''); // Sınıf değiştiğinde öğrenci seçimi sıfırlanır
  };

  // Öğrenci değişimi
  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(e.target.value);
  };

  // Geri bildirim metni değişimi
  const handleFeedbackChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFeedbackText(e.target.value);
  };

  // Geri bildirim türü değişimi
  const handleFeedbackTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFeedbackType(e.target.value);
  };

  // Geri bildirim gönderme işlemi
  const handleSubmitFeedback = () => {
    if (feedbackText.trim() && selectedClass && selectedStudent) {
      setIsSubmitted(true);  // Geri bildirim gönderildi olarak işaretle
      setFeedbackText(''); // Metni temizle
      setShowConfirmPopup(false);  // Pop-up'ı kapat

      // 3 saniye sonra gönderildi mesajını gizle
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000); // 3000ms = 3 saniye
    } else {
      alert('Lütfen tüm alanları doldurduğunuzdan emin olun!');
    }
  };

  // Geri bildirim onayı pop-up'ını göster
  const handleConfirmation = () => {
    if (feedbackText.trim() && selectedClass && selectedStudent) {
      setShowConfirmPopup(true); // Onay pop-up'ını göster
    } else {
      alert('Lütfen geri bildirim metnini doldurun!');
    }
  };

  // Hayır butonuna tıklama
  const handleCancelSubmit = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="feedback-container">
      <h1>Geri Bildirim</h1>

      {/* Sınıf Seçimi */}
      <div className="class-selector">
        <label htmlFor="class">Sınıf Seç:</label>
        <select id="class" value={selectedClass} onChange={handleClassChange}>
          <option value="" disabled>Sınıf Seçin</option>
          <option value="class5">5. Sınıf</option>
          <option value="class6">6. Sınıf</option>
          <option value="class7">7. Sınıf</option>
        </select>
      </div>

      {/* Öğrenci Seçimi */}
      {selectedClass && (
        <div className="student-selector">
          <label htmlFor="student">Öğrenci Seç:</label>
          <select id="student" value={selectedStudent} onChange={handleStudentChange}>
            <option value="" disabled>Öğrenci Seçin</option>
            <option value="student1">Öğrenci 1</option>
            <option value="student2">Öğrenci 2</option>
            <option value="student3">Öğrenci 3</option>
          </select>
        </div>
      )}

      {/* Geri Bildirim Türü */}
      <div className="feedback-type-selector">
        <label htmlFor="feedback-type">Geri Bildirim Türü:</label>
        <select id="feedback-type" value={feedbackType} onChange={handleFeedbackTypeChange}>
          <option value="positive">Olumlu</option>
          <option value="negative">Olumsuz</option>
        </select>
      </div>

      {/* Geri Bildirim Metni */}
      <div className="feedback-text-area">
        <label htmlFor="feedback-text">Geri Bildiriminizi Yazın:</label>
        <textarea
          id="feedback-text"
          value={feedbackText}
          onChange={handleFeedbackChange}
          rows={4}
        />
      </div>

      {/* Geri Bildirim Gönder Butonu */}
      <button className="submit-feedback" onClick={handleConfirmation}>Gönder</button>

      {/* Onay Pop-up */}
      {showConfirmPopup && (
        <div className="confirmation-popup">
          <div className="confirmation-content">
            <p>Geri bildirim göndermek istediğinizden emin misiniz?</p>
            <button className="yes-btn" onClick={handleSubmitFeedback}>Evet, Gönder</button>
            <button className="no-btn" onClick={handleCancelSubmit}>Hayır</button>
          </div>
        </div>
      )}

      {/* Gönderildi Mesajı */}
      {isSubmitted && <div className="confirmation-message">Geri bildirim başarıyla gönderildi!</div>}
    </div>
  );
};

export default Feedback;
