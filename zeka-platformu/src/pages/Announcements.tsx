import React, { useState } from 'react';
import '../styles/Announcements.css';

interface Announcement {
  id: number;
  title: string;
  description: string;
  targetGroup: string;
  startDate: string;
  endDate: string;
  attachment?: File | null;
  status: 'active' | 'expired' | 'scheduled';
}

const Announcements = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [newAnnouncement, setNewAnnouncement] = useState<Announcement>({
    id: 0,
    title: '',
    description: '',
    targetGroup: 'All',
    startDate: '',
    endDate: '',
    attachment: null,
    status: 'scheduled',
  });
  const [filter, setFilter] = useState<'all' | 'active' | 'scheduled' | 'expired'>('all');
  const [editingAnnouncement, setEditingAnnouncement] = useState<Announcement | null>(null); // For editing an announcement

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAnnouncement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setNewAnnouncement((prev) => ({
        ...prev,
        attachment: files[0],
      }));
    }
  };

  const handleAddAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newAnnouncement.title || !newAnnouncement.description || !newAnnouncement.startDate) {
      alert('Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    const today = new Date().toISOString().split('T')[0];
    const status =
      newAnnouncement.startDate > today
        ? 'scheduled'
        : newAnnouncement.endDate && newAnnouncement.endDate < today
        ? 'expired'
        : 'active';

    setAnnouncements((prev) => [
      ...prev,
      { ...newAnnouncement, id: prev.length + 1, status },
    ]);

    setNewAnnouncement({
      id: 0,
      title: '',
      description: '',
      targetGroup: 'All',
      startDate: '',
      endDate: '',
      attachment: null,
      status: 'scheduled',
    });
  };

  const handleStatusChange = (id: number) => {
    setAnnouncements((prev) =>
      prev.map((announcement) =>
        announcement.id === id
          ? { ...announcement, status: announcement.status === 'active' ? 'expired' : 'active' }
          : announcement
      )
    );
  };

  const handleEditAnnouncement = (announcement: Announcement) => {
    setEditingAnnouncement(announcement);
    setNewAnnouncement(announcement);
  };

  const handleDeleteAnnouncement = (id: number) => {
    setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== id));
  };

  const handleUpdateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingAnnouncement) {
      setAnnouncements((prev) =>
        prev.map((announcement) =>
          announcement.id === editingAnnouncement.id ? editingAnnouncement : announcement
        )
      );
      setEditingAnnouncement(null);
      setNewAnnouncement({
        id: 0,
        title: '',
        description: '',
        targetGroup: 'All',
        startDate: '',
        endDate: '',
        attachment: null,
        status: 'scheduled',
      });
    }
  };

  const filteredAnnouncements =
    filter === 'all'
      ? announcements
      : announcements.filter((announcement) => announcement.status === filter);

  return (
    <div className="announcements-container">
      <h2>Duyurular</h2>
      <form className="announcement-form" onSubmit={editingAnnouncement ? handleUpdateAnnouncement : handleAddAnnouncement}>
        <label>
          Başlık:
          <input
            type="text"
            name="title"
            value={newAnnouncement.title}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Açıklama:
          <textarea
            name="description"
            value={newAnnouncement.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </label>
        <label>
          Hedef Grup:
          <select
            name="targetGroup"
            value={newAnnouncement.targetGroup}
            onChange={handleInputChange}
          >
            <option value="All">Tüm Okul</option>
            <option value="Students">Öğrenciler</option>
            <option value="Teachers">Öğretmenler</option>
            <option value="Parents">Veliler</option>
          </select>
        </label>
        <label>
          Başlangıç Tarihi:
          <input
            type="date"
            name="startDate"
            value={newAnnouncement.startDate}
            onChange={handleInputChange}
            required
          />
        </label>
        <label>
          Bitiş Tarihi:
          <input
            type="date"
            name="endDate"
            value={newAnnouncement.endDate}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Dosya Ekle:
          <input type="file" onChange={handleFileUpload} />
        </label>
        <button type="submit">{editingAnnouncement ? 'Duyuruyu Güncelle' : 'Duyuru Ekle'}</button>
      </form>

      <div className="announcement-filter">
        <label>Filtrele: </label>
        <select onChange={(e) => setFilter(e.target.value as 'all' | 'active' | 'scheduled' | 'expired')}>
          <option value="all">Tüm Duyurular</option>
          <option value="active">Aktif</option>
          <option value="scheduled">Planlanan</option>
          <option value="expired">Süresi Dolmuş</option>
        </select>
      </div>

      <div className="announcements-list">
        {filteredAnnouncements.length === 0 ? (
          <p>Henüz duyuru eklenmemiş.</p>
        ) : (
          filteredAnnouncements.map((announcement) => (
            <div key={announcement.id} className="announcement-item">
              <h4>{announcement.title}</h4>
              <p>{announcement.description}</p>
              <div className="announcement-meta">
                <p><strong>Hedef Grup:</strong> {announcement.targetGroup}</p>
                <p><strong>Durum:</strong> <span className={`badge ${announcement.status}`}>{announcement.status}</span></p>
                <p><strong>Başlangıç:</strong> {announcement.startDate}</p>
                <p><strong>Bitiş:</strong> {announcement.endDate}</p>
                {announcement.attachment && (
                  <p><strong>Dosya:</strong> 
                    <a href={URL.createObjectURL(announcement.attachment)} target="_blank" rel="noopener noreferrer">
                      {announcement.attachment.name}
                    </a>
                  </p>
                )}
              </div>
              <button onClick={() => handleStatusChange(announcement.id)}>
                {announcement.status === 'active' ? 'Süresi Dolmuş Olarak İşaretle' : 'Aktif Olarak İşaretle'}
              </button>
              <button onClick={() => handleEditAnnouncement(announcement)}>Düzenle</button>
              <button onClick={() => handleDeleteAnnouncement(announcement.id)}>Sil</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcements;
