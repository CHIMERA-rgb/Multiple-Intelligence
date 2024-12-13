import './MessagingTab.css';
import { AiOutlineSend, AiOutlinePaperClip } from 'react-icons/ai';
import { FaPaperPlane, FaVideo, FaPhoneAlt } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';

const MessagingTab = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [message, setMessage] = useState('');
  const [chats, setChats] = useState([
    { id: 1, name: 'Ali Öğretmen', role: 'teacher', lastMessage: 'Toplantı hakkında bilgilendirme.', time: '10:30', messages: [
      { sender: 'other', text: 'Toplantıya katılamayacağım, başka bir gün olabilir mi?', time: '10:25', read: false },
      { sender: 'me', text: 'Toplantı 3’te başlayacak, önemli bir konu var.', time: '10:26', read: true },
    ], profilePic: '/images/teacher.jpg' },
    { id: 2, name: 'Murat Müdür', role: 'principal', lastMessage: 'Öğrenci başarı durumu raporu.', time: '09:45', messages: [
      { sender: 'other', text: 'Raporu nasıl alabilirim?', time: '09:40', read: false },
      { sender: 'me', text: 'Raporu sistemden indirebilirsiniz.', time: '09:41', read: true },
    ], profilePic: '/images/principal.jpg' },
    { id: 3, name: 'Ayşe Veli', role: 'parent', lastMessage: 'Çocuğumun ders durumu nasıl?', time: '08:20', messages: [
      { sender: 'other', text: 'Çocuğunuz çok iyi durumda, dersleri başarılı.', time: '08:18', read: true },
      { sender: 'me', text: 'Teşekkürler, bu konuda daha fazla bilgi verir misiniz?', time: '08:19', read: true },
    ], profilePic: '/images/parent.jpg' },

  ]);

  useEffect(() => {
    // localStorage'dan sohbet verilerini al
    const storedChats = localStorage.getItem('chats');
    if (storedChats) {
      setChats(JSON.parse(storedChats));
    }
  }, []); // This effect runs only once when the component mounts

  useEffect(() => {
    // sohbet verilerindeki her değişiklikten sonra localStorage'a kaydet
    if (chats.length > 0) {
      localStorage.setItem('chats', JSON.stringify(chats));
    }
  }, [chats]); // This effect runs when 'chats' state changes

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = { sender: 'me', text: message, time: new Date().toLocaleTimeString(), read: true };

      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: message,
            time: newMessage.time,
          };
        }
        return chat;
      });

      setChats(updatedChats);
      setMessage('');
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const newMessage = { sender: 'me', text: `Dosya gönderildi: ${file.name}`, time: new Date().toLocaleTimeString(), read: true };
      const updatedChats = chats.map((chat) => {
        if (chat.id === selectedChat) {
          return {
            ...chat,
            messages: [...chat.messages, newMessage],
            lastMessage: newMessage.text,
            time: newMessage.time,
          };
        }
        return chat;
      });
      setChats(updatedChats);
    }
  };

  const selectedChatMessages = selectedChat
    ? chats.find((chat) => chat.id === selectedChat)?.messages
    : [];

  const handleChatSelect = (chatId) => {
    const updatedChats = chats.map((chat) => {
      if (chat.id === chatId) {
        const updatedMessages = chat.messages.map((msg) => ({ ...msg, read: true }));
        return { ...chat, messages: updatedMessages };
      }
      return chat;
    });
    setChats(updatedChats);
    setSelectedChat(chatId);
  };

  // Görüntülü ve telefon görüşmesi ikonlarına işlevsellik ekleme
  const handleVideoCall = () => {
    alert('Görüntülü görüşme başlatılıyor...');
    // Gerçek bir görüntülü görüşme başlatma kodu burada olabilir (WebRTC gibi)
  };

  const handlePhoneCall = () => {
    alert('Telefon görüşmesi başlatılıyor...');
    // Gerçek bir telefon görüşmesi başlatma kodu burada olabilir
  };

  return (
    <div className="messaging-tab">
      <div className="chat-list">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className="chat-item"
            onClick={() => handleChatSelect(chat.id)}
            style={{ cursor: 'pointer' }}
          >
            <img src={chat.profilePic} alt={chat.name} className="profile-pic" />
            <div className="chat-info">
              <div className="name">{chat.name}</div>
              <div className="message">{chat.lastMessage}</div>
              <div className="time">{chat.time}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="chat-window">
        {selectedChat ? (
          <>
            <div className="header">
              <img src={chats.find((chat) => chat.id === selectedChat)?.profilePic} alt="Profile" className="profile-pic" />
              <div className="name">{chats.find((chat) => chat.id === selectedChat)?.name}</div>
            </div>
            <div className="messages">
              {selectedChatMessages?.map((msg, index) => (
                <div key={index} className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
                  <div className="text">
                    {msg.text}
                    {msg.sender !== 'me' && msg.read && <span className="read-status"> (Görüldü)</span>}
                  </div>
                  <div className="message-time">{msg.time}</div>
                </div>
              ))}
            </div>

            <div className="message-input">
              <label htmlFor="file-upload" className="file-upload-icon">
                <AiOutlinePaperClip size={24} />
              </label>
              <input
                id="file-upload"
                type="file"
                onChange={handleFileUpload}
                style={{ display: 'none' }}
              />
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Mesaj yaz..."
                className="message-input-field"
              />
              <div className="message-container">
                <button className="send-button" onClick={handleSendMessage}>
                  <FaPaperPlane />
                </button>
                <div className="action-icons">
                  <FaVideo className="video-icon" onClick={handleVideoCall} />
                  <FaPhoneAlt className="phone-icon" onClick={handlePhoneCall} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="no-chat-selected">
            <div className="panel">
              <h2>Eğitimde Beraber Başarıya!</h2>
              <p>Çocuğunuzun başarı yolculuğunda, öğretmenlerinizle iş birliği yaparak en iyi sonuçları elde edebilirsiniz. Öğretmenlerinizden güncel bilgiler almak ve çocuğunuzun gelişimini izlemek için sohbet listesine göz atın.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessagingTab;
