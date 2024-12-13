import React, { useState } from 'react';
import '../../styles/ClassroomClimate.css';
import { FaThumbsUp, FaUsers, FaHeadset, FaProjectDiagram, FaBrain, FaQuestionCircle } from 'react-icons/fa';
import { FaTimes, FaRegLightbulb, FaChartBar, FaPalette, FaRunning, FaMusic, FaHandsHelping, FaUserSecret, FaTree, FaCommentAlt, FaUserGraduate } from 'react-icons/fa';

const ClassroomClimate: React.FC = () => {
    const [showModal, setShowModal] = useState(false);
    const [showFeedbackPanel, setShowFeedbackPanel] = useState(false);
    const [feedbacks, setFeedbacks] = useState([
        { id: 1, student: 'Ali', message: 'Ödevim çok zor, biraz yardımcı olabilir misiniz?', response: '' },
        { id: 2, student: 'Ayşe', message: 'Sınıf içi etkinlikler daha eğlenceli olmalı.', response: '' },
        { id: 3, student: 'Mehmet', message: 'Bugün ders çok hızlıydı, biraz daha yavaş gidebilir miyiz?', response: '' },
        { id: 4, student: 'Mehmet', message: 'Bugün ders çok hızlıydı, biraz daha yavaş gidebilir miyiz?', response: '' },
        { id: 5, student: 'Mehmet', message: 'Bugün ders çok hızlıydı, biraz daha yavaş gidebilir miyiz?', response: '' },
        { id: 6, student: 'Mehmet', message: 'Bugün ders çok hızlıydı, biraz daha yavaş gidebilir miyiz?', response: '' },
    ]);

    // Modal açma / kapama fonksiyonu
    const toggleModal = () => setShowModal(!showModal);

    // Geri bildirim panelini açma / kapama fonksiyonu
    const toggleFeedbackPanel = () => setShowFeedbackPanel(!showFeedbackPanel);

    // Geri bildirime cevap yazma fonksiyonu
    const handleResponse = (id: number, response: string) => {
        setFeedbacks(feedbacks.map(feedback =>
            feedback.id === id ? { ...feedback, response } : feedback
        ));
    };

    return (
        <div className="classroom-climate">
            <h1>SINIF İKLİMİ</h1>
            <div className="content-section">
                <p>
                    Öğrencilerin farklı zeka türlerine göre öğrenmelerini sağlamak, sınıf
                    iklimini daha verimli hale getirebilir. Her zeka türüne uygun
                    etkinliklerle öğrencilerin ilgisini canlı tutabilirsiniz.
                </p>
                <div className="info-cards">
                    <div className="card">
                        <FaRegLightbulb className="icon" />
                        <h3>Sözel – Dilsel Zeka</h3>
                        <p>Kelime ve dil kullanımına dayalı etkinlikler, hikaye anlatma ve yazılı materyallerle öğrenme.</p>
                    </div>
                    <div className="card">
                        <FaChartBar className="icon" />
                        <h3>Mantıksal – Matematiksel Zeka</h3>
                        <p>Problem çözme, mantık oyunları ve matematik temelli etkinlikler.</p>
                    </div>
                    <div className="card">
                        <FaPalette className="icon" />
                        <h3>Görsel – Mekansal Zeka</h3>
                        <p>Haritalar, resim çizme, görsel materyallerle öğrenme.</p>
                    </div>
                    <div className="card">
                        <FaRunning className="icon" />
                        <h3>Bedensel Zeka – Kinestetik Zeka</h3>
                        <p>Drama, dans, spor aktiviteleri ve fiziksel hareket gerektiren görevler.</p>
                    </div>
                    <div className="card">
                        <FaMusic className="icon" />
                        <h3>Ritmik Zeka</h3>
                        <p>Ritimli müziklerle ders konularını ilişkilendirme, şarkılarla öğrenme.</p>
                    </div>
                    <div className="card">
                        <FaHandsHelping className="icon" />
                        <h3>Sosyal Zeka</h3>
                        <p>Grup çalışmaları, iş birliği oyunları ve tartışma etkinlikleri.</p>
                    </div>
                    <div className="card">
                        <FaUserSecret className="icon" />
                        <h3>İçsel Zeka</h3>
                        <p>Kendi kendine öğrenme, günlük yazma ve kişisel hedef belirleme.</p>
                    </div>
                    <div className="card">
                        <FaTree className="icon" />
                        <h3>Doğasal Zeka</h3>
                        <p>Doğa gezileri, hayvanlar ve bitkiler üzerine çalışmalar.</p>
                    </div>
                </div>
            </div>

            {/* Geri Bildirim Paneli Açma / Kapatma Butonu */}
            <button className="feedback-toggle" onClick={toggleFeedbackPanel}>
                {showFeedbackPanel ? 'Geri Bildirimi Kapat' : 'Öğrenci Geri Bildirimlerini Görüntüle'}
            </button>

            {/* Geri Bildirim Paneli */}
            {showFeedbackPanel && (
                <div className="feedback-panel">
                    <div className="feedback-list">
                        {feedbacks.map((feedback) => (
                            <div key={feedback.id} className="feedback-item">
                                <p><strong>{feedback.student}:</strong> {feedback.message}</p>
                                {feedback.response ? (
                                    <p><strong>Cevap:</strong> {feedback.response}</p>
                                ) : (
                                    <textarea
                                        placeholder="Cevabınızı buraya yazın..."
                                        rows={2}
                                        onChange={(e) => handleResponse(feedback.id, e.target.value)}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Sınıf Yönetimi ve İletişim Bölümü */}
            <div className="content-section">
                <h1>SINIF YÖNETİMİ VE İLETİŞİM</h1>
                <p>
                    Öğrencilerle etkili iletişim kurmak ve sınıf yönetimini iyi yapmak, sınıf iklimini geliştirir. İletişim tarzınızı öğrencilerin özelliklerine göre şekillendirin.
                </p>
                <div className="communication-strategies">
    <div className="strategy-card">
        <FaCommentAlt className="icon" />
        <h3>Açık İletişim</h3>
        <p>Öğrencilerle açık, net ve dürüst iletişim kurarak güven oluşturun. Her öğrencinin sesini duyduğundan emin olun.</p>
    </div>
    <div className="strategy-card">
        <FaUserGraduate className="icon" />
        <h3>Empati</h3>
        <p>Öğrencilerin duygusal ve sosyal ihtiyaçlarını anlayarak, empatik bir yaklaşım sergileyin.</p>
    </div>
    <div className="strategy-card">
        <FaThumbsUp className="icon" />
        <h3>Pozitif Davranışları Pekiştirme</h3>
        <p>Öğrencilerin pozitif davranışlarını takdir ederek, doğru davranışları pekiştirebilir ve sınıf içindeki sağlıklı bir ortam oluşturabilirsiniz.</p>
    </div>
    <div className="strategy-card">
        <FaUsers className="icon" />
        <h3>Grup Çalışmaları</h3>
        <p>Öğrencilerin birbirleriyle iş birliği yapmalarını teşvik edin ve grup çalışmalarıyla sınıf içindeki etkileşimi artırın.</p>
    </div>
    <div className="strategy-card">
        <FaHeadset className="icon" />
        <h3>Aktif Dinleme</h3>
        <p>Öğrencilerin söylediklerini dikkatle dinleyerek, onların düşüncelerini ve hislerini doğru bir şekilde anlamaya çalışın.</p>
    </div>
    <div className="strategy-card">
        <FaBrain className="icon" />
        <h3>Farklı Öğrenme Tarzlarına Uygun Yaklaşımlar</h3>
        <p>Öğrencilerin farklı öğrenme stillerine uygun ders içerikleri ve yöntemler geliştirerek sınıf içi etkileşimi güçlendirin.</p>
    </div>
    <div className="strategy-card">
        <FaQuestionCircle className="icon" />
        <h3>Sorularla Yönlendirme</h3>
        <p>Öğrencilerin derse aktif katılımını sağlamak için düşündürücü sorular sorarak sınıf içi tartışmalar başlatın.</p>
    </div>
    <div className="strategy-card">
        <FaUserSecret className="icon" />
        <h3>Bireysel Destek</h3>
        <p>Öğrencilerin bireysel ihtiyaçlarını göz önünde bulundurarak, onlara özel destek sağlayın.</p>
    </div>
    <div className="strategy-card">
        <FaRunning className="icon" />
        <h3>Aktif Katılımı Teşvik Etme</h3>
        <p>Öğrencilerin derslere aktif katılımını teşvik edin, onların fikirlerini paylaşmalarını ve derslere dahil olmalarını sağlayın.</p>
    </div>
    <div className="strategy-card">
        <FaMusic className="icon" />
        <h3>Müzikal Etkileşimler</h3>
        <p>Müzik, sınıf atmosferini pozitif hale getirebilir. Öğrencilerle ders müzikleri eşliğinde interaktif etkinlikler yapın.</p>
    </div>
</div>
      </div>
        </div>
    );
};

export default ClassroomClimate;
