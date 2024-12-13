import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import styles from './LoginPage.module.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isIframeVisible, setIframeVisible] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null); // iframe'e referans
  const [feedback, setFeedback] = useState(''); // Geri bildirim durumu
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username === 'admin' && password === 'adminpass') {
      navigate('/admin-dashboard');
    } else if (username === 'teacher' && password === 'teacherpass') {
      navigate('/teacher-dashboard');
    } else if (username === 'parent' && password === 'parentpass') {
      navigate('/parent-dashboard');
    } else {
      alert('Geçersiz kimlik bilgileri');
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!isPasswordVisible);
  };

  const toggleIframeVisibility = () => {
    setIframeVisible(!isIframeVisible);
  };

  useEffect(() => {
    if (iframeRef.current && isIframeVisible) {
      const doc = iframeRef.current.contentDocument || iframeRef.current.contentWindow?.document;
      if (doc) {
        doc.open();
        doc.write(`
          <html>
            <head>
              <style>
                body {
                  font-family: Arial, sans-serif;
                  margin: 0;
                  padding: 0;
                  background-color: #fff;
                  display: flex;
                  flex-direction: column;
                  height: 100%;
                }
                .content {
                  padding: 20px;
                  background-color: #fff;
                  text-align: center;
                  flex: 1;
                }
                .header {
                  background: linear-gradient(45deg, #3498db, #2c3e50);
                  color: #fff;
                  padding: 15px;
                  text-align: center;
                  font-size: 18px;
                  border-bottom: 2px solid #ddd;
                }
                .footer {
                  background-color: #3498db;
                  padding: 15px;
                  color: #fff;
                  text-align: left;
                  font-size: 14px;
                  border-top: 2px solid #ddd;
                  margin-top: 10px;
                  display: flex;
                  flex-direction: column;
                  align-items: flex-start;
                }
                .feedback-input {
                  width: 95%;
                  padding: 10px;
                  margin-right: 10px;
                  border: 0.5px solid #ccc; /* Daha ince kenarlık */
                  border-radius: 4px;
                  font-size: 14px;
                  resize: none;
                  max-height: 120px;
                  overflow-y: auto;
                }
                .checkbox-group {
                  display: flex;
                  flex-direction: column;
                  margin-top: 10px;
                }
                .checkbox-group label {
                  font-size: 14px;
                  margin-bottom: 5px;
                }
                .send-icon {
                  background-color: #fff;
                  border: none;
                  color: red !important;
                  font-size: 18px;
                  cursor: pointer;
                  margin-left: 10px;
                  margin-top: 10px;
                  padding: 8px 16px;
                  border-radius: 4px;
                }
                .additional-input {
                  display: none;
                  margin-top: 10px;
                  margin-right: 250px;
                  width: 100%;
                  display: flex;
                  justify-content: space-between;
                }
                .show-input .additional-input {
                  display: flex;
                }
                .additional-input input {
                  flex: 1;
                  padding: 10px;
                  border: 0.5px solid #ccc; /* Daha ince kenarlık */
                  border-radius: 4px;
                  font-size: 14px;
                  resize: none;
                  max-height: 120px;
                  overflow-y: auto;
                }
                .additional-input button {
                  padding: 8px 16px;
                  background-color: #3498db;
                  border: none;
                  color: white;
                  cursor: pointer;
                  font-size: 16px;
                  border-radius: 4px;
                }
              </style>
            </head>
            <body>
              <div class="header">Geri Bildirim</div>
              <div class="content">
                <p>Web sitesinde karşılaştığınız sorunları seçin:</p>
              </div>
              <div class="footer">
                <div class="checkbox-group">
                  <label>
                    <input type="checkbox" /> Sayfa düzgün yüklenmiyor
                  </label>
                  <label>
                    <input type="checkbox" /> Bağlantılar çalışmıyor
                  </label>
                  <label>
                    <input type="checkbox" /> Görseller yüklenmiyor
                  </label>
                  <label>
                    <input type="checkbox" /> Sayfa çok yavaş
                  </label>
                  <label>
                    <input type="checkbox" /> Formlar düzgün çalışmıyor
                  </label>
                  <label class="show-input">
                    <input type="checkbox" id="other-option" onclick="toggleInput()" /> Diğer (Lütfen açıklayın)
                  </label>
                  <div class="additional-input" id="other-input">
                    <input 
                      class="feedback-input" 
                      type="text" 
                      placeholder="Açıklamanızı buraya yazın..."
                    />
                    <button class="send-icon">
                      &#10148;
                    </button>
                  </div>
                </div>
              </div>
              <script>
                function toggleInput() {
                  const checkbox = document.getElementById("other-option");
                  const inputContainer = document.getElementById("other-input");
                  if (checkbox.checked) {
                    inputContainer.style.display = "flex";
                  } else {
                    inputContainer.style.display = "none";
                  }
                }
              </script>
            </body>
          </html>
        `);
        doc.close();
      }
    }
  }, [isIframeVisible]);
  
  
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-image']}>
        <img
          src="images/login.jpg"
          alt="Login Illustration"
          className={styles['login-illustration']}
        />
      </div>
      <div className={styles['login-form']}>
        <h1>BİLGİLERİNİZİ GİRİNİZ</h1>
        <div className={styles['form-group']}>
          <label>Kullanıcı Adı</label>
          <input
            type="text"
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className={styles['form-group']}>
          <label>Şifre</label>
          <div className={styles['password-wrapper']}>
            <input
              className={styles['password-input']}
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder="Şifrenizi girin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className={styles['toggle-password']}
              onClick={togglePasswordVisibility}
            >
              {isPasswordVisible ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
        <button className={styles['login-button']} onClick={handleLogin}>
          Giriş Yap
        </button>
      </div>

      {/* Chat widget'ı */}
      {isIframeVisible && (
        <iframe
          ref={iframeRef} // React ref ile iframe'e referans
          src="about:blank"
          frameBorder="0"
          scrolling="no"
          width="350px"
          height="420px"
          style={{
            position: 'fixed',
            right: '10px',
            bottom: '90px',
            zIndex: 1000002,
            borderRadius: '5px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
          title="chat widget"
        ></iframe>
      )}

      {/* Yuvarlak Buton */}
      <button
        className={styles['toggle-button']}
        onClick={toggleIframeVisibility}
        aria-label="Show/Hide Chat Widget"
      >
        {isIframeVisible ? '×' : '+'}
      </button>
    </div>
  );
};

export default LoginPage;
