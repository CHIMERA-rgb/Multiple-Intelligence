import React, { useState } from 'react';
import '../../styles/Messages.css';

type Message = {
  id: number;
  sender: string;
  date: string;
  content: string;
  read: boolean;
  category: string;
  replied: boolean;
  repliedMessage: string | null;
  favorite: boolean;
  priority: 'Düşük' | 'Orta' | 'Yüksek';
};

const Messages = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'Veli 1', date: '2024-12-01', content: 'Çocuğumun durumu hakkında bilgi almak istiyorum.', read: false, category: 'Durum', replied: false, repliedMessage: null, favorite: false, priority: 'Orta' },
    { id: 2, sender: 'Veli 2', date: '2024-12-01', content: 'Ödev konusunda yardım rica ediyorum.', read: false, category: 'Ödev', replied: false, repliedMessage: null, favorite: false, priority: 'Yüksek' },
    { id: 3, sender: 'Veli 3', date: '2024-12-02', content: 'Yararlı kaynaklar hakkında tavsiye almak istiyorum.', read: false, category: 'Kaynak', replied: false, repliedMessage: null, favorite: false, priority: 'Düşük' },
    { id: 4, sender: 'Veli 4', date: '2024-12-02', content: 'Çocuğumun katılımını nasıl artırabilirim?', read: false, category: 'Katılım', replied: false, repliedMessage: null, favorite: false, priority: 'Orta' },
  ]);

  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [reply, setReply] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedMessages, setSelectedMessages] = useState<number[]>([]);
  const [showRepliedMessages, setShowRepliedMessages] = useState(false); // Cevaplanan mesajların gösterilmesi için durum

  const handleReply = () => {
    if (reply.trim() && selectedMessage) {
      setMessages((prevMessages) =>
        prevMessages.map((msg) =>
          msg.id === selectedMessage.id
            ? { ...msg, replied: true, repliedMessage: reply }
            : msg
        )
      );
      setReply('');
      setSelectedMessage(null);
    }
  };

  const handleReadMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, read: true } : msg
      )
    );
  };

  const handleDeleteMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.filter((message) => message.id !== id)
    );
  };

  const handleFavoriteMessage = (id: number) => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === id ? { ...msg, favorite: !msg.favorite } : msg
      )
    );
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleCategoryFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCategoryFilter(event.target.value);
  };

  const handleSelectMessage = (id: number) => {
    setSelectedMessages((prev) =>
      prev.includes(id) ? prev.filter((msgId) => msgId !== id) : [...prev, id]
    );
  };

  const handleMarkAllAsRead = () => {
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        selectedMessages.includes(msg.id) ? { ...msg, read: true } : msg
      )
    );
    setSelectedMessages([]);
  };

  const handleDeleteSelected = () => {
    setMessages((prevMessages) =>
      prevMessages.filter((msg) => !selectedMessages.includes(msg.id))
    );
    setSelectedMessages([]);
  };

  const filteredMessages = messages.filter(
    (message) =>
      (message.sender.toLowerCase().includes(searchTerm.toLowerCase()) ||
        message.content.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (categoryFilter ? message.category === categoryFilter : true)
  );

  const repliedMessages = messages.filter((msg) => msg.replied);

  return (
    <div className="messages-container">
      <div className="filter-container">
        <input
          type="text"
          placeholder="Mesajlarda arayın..."
          value={searchTerm}
          onChange={handleSearch}
          className="search-input"
        />
        <select onChange={handleCategoryFilter} value={categoryFilter} className="category-filter">
          <option value="">Tüm Kategoriler</option>
          <option value="Durum">Durum</option>
          <option value="Ödev">Ödev</option>
          <option value="Kaynak">Kaynak</option>
          <option value="Katılım">Katılım</option>
        </select>
      </div>

      <div className="messages-list-container">
        <h2>Mesajlar</h2>
        <ul className="messages-list">
          {filteredMessages.map((message) => (
            !message.replied && ( // Cevaplanmamış mesajları göster
              <li
                key={message.id}
                className={`message-item ${message.read ? 'read' : 'unread'}`}
              >
                <input
                  type="checkbox"
                  checked={selectedMessages.includes(message.id)}
                  onChange={() => handleSelectMessage(message.id)}
                />
                <div className="message-header">
                  <span className="message-sender">{message.sender}</span>
                  <span className="message-date">{message.date}</span>
                </div>
                <p>{message.content.substring(0, 50)}...</p>
                <span className={`priority-badge ${message.priority.toLowerCase()}`}>{message.priority}</span>
                <div className="message-actions">
                  <button
                    onClick={() => {
                      setSelectedMessage(message);
                      handleReadMessage(message.id);
                    }}
                  >
                    Oku
                  </button>
                  <button onClick={() => handleFavoriteMessage(message.id)}>
                    {message.favorite ? 'Favorilerden Çıkar' : 'Favorilere Ekle'}
                  </button>
                  <button onClick={() => handleDeleteMessage(message.id)}>
                    Sil
                  </button>
                </div>
              </li>
            )
          ))}
        </ul>

        <div className="bulk-actions">
          <button onClick={handleMarkAllAsRead}>Tümünü Okundu İşaretle</button>
          <button onClick={handleDeleteSelected}>Seçilenleri Sil</button>
        </div>
      </div>

      {/* Buton ve açılır panel */}
      <div className="replied-messages-container">
        <button onClick={() => setShowRepliedMessages(!showRepliedMessages)}>
          {showRepliedMessages ? 'Cevaplanmış Mesajları Gizle' : 'Cevaplanmış Mesajları Göster'}
        </button>

        {showRepliedMessages && (
          <div className="replied-messages-panel">
            <h3>Cevaplanan Mesajlar</h3>
            <ul className="messages-list">
              {repliedMessages.map((msg) => (
                <li key={msg.id} className="message-item">
                  <div className="message-header">
                    <span className="message-sender">{msg.sender}</span>
                    <span className="message-date">{msg.date}</span>
                  </div>
                  <p><strong>Mesaj:</strong> {msg.content}</p>
                  <p><strong>Cevap:</strong> {msg.repliedMessage}</p>
                  <div className="message-actions">
                    <button onClick={() => handleDeleteMessage(msg.id)}>Sil</button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {selectedMessage && (
        <div className="message-reply-modal">
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <span>Mesajı Cevapla</span>
                <button className="close-btn" onClick={() => setSelectedMessage(null)}>
                  X
                </button>
              </div>
              <p><strong>Gönderen:</strong> {selectedMessage.sender}</p>
              <p><strong>Mesaj:</strong> {selectedMessage.content}</p>
              <textarea
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Cevabınızı yazın..."
              />
              <button onClick={handleReply}>Cevapla</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;
