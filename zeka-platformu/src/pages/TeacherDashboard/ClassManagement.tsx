import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import '../../styles/ClassManagement.css';

// Chart.js'te gerekli modülleri kaydediyoruz
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ClassManagement = () => {
  const [selectedClass, setSelectedClass] = useState<string>('');
  const [students, setStudents] = useState([
    { id: 1, name: 'Ahmet Yılmaz', class: '5A', intelligence: 'Dilsel', grade: 'B', notes: '', age: 12, dob: '2012-03-15', contact: 'ahmet@school.com' },
    { id: 2, name: 'Ayşe Demir', class: '5A', intelligence: 'Mantıksal', grade: 'A', notes: '', age: 13, dob: '2011-08-22', contact: 'ayse@school.com' },
    { id: 3, name: 'Mehmet Can', class: '5B', intelligence: 'Müzikal', grade: 'C', notes: '', age: 14, dob: '2010-11-10', contact: 'mehmet@school.com' },
  ]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editStudent, setEditStudent] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isStudentAddVisible, setIsStudentAddVisible] = useState<boolean>(false);
  const [openChart, setOpenChart] = useState<number | null>(null); // Öğrenci kartındaki grafiği açma durumu

  const classes = ['5A', '5B', '6A', '6B'];

  const handleClassSelect = (className: string) => {
    setSelectedClass(className);
  };

  const filteredStudents = students.filter(
    (student) => student.class === selectedClass && student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Öğrenciyi güncelleme fonksiyonu
  const handleUpdateStudent = (e: React.FormEvent) => {
    e.preventDefault();
    const name = (e.target as HTMLFormElement).elements.namedItem('editStudentName') as HTMLInputElement;
    const intelligence = (e.target as HTMLFormElement).elements.namedItem('editStudentIntelligence') as HTMLSelectElement;
    const updatedStudents = students.map(student =>
      student.id === editStudent.id
        ? { ...student, name: name.value, intelligence: intelligence.value }
        : student
    );
    setStudents(updatedStudents);
    setIsEditing(false);
    setEditStudent(null);
  };

  const handleEditStudent = (student: any) => {
    setIsEditing(true);
    setEditStudent(student);
  };

  const handleDeleteStudent = (studentId: number) => {
    setStudents(students.filter(student => student.id !== studentId));
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleToggleAddStudent = () => {
    setIsStudentAddVisible(!isStudentAddVisible);
  };

  const handleToggleChart = (studentId: number) => {
    // Grafik açma/kapama işlemi
    setOpenChart(openChart === studentId ? null : studentId);
  };

  const studentNames = filteredStudents.map(student => student.name);
  const studentGrades = filteredStudents.map(student => (student.grade === 'A' ? 4 : student.grade === 'B' ? 3 : 2));

  const data = {
    labels: studentNames,
    datasets: [
      {
        label: 'Öğrenci Notları',
        data: studentGrades,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="class-management">
      <h2>Sınıf Yönetimi</h2>

      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Öğrenci Ara" 
          value={searchQuery} 
          onChange={handleSearchChange} 
        />
      </div>

      <div className="class-filter">
        <label>Sınıf Seçin: </label>
        <select onChange={(e) => handleClassSelect(e.target.value)}>
          <option value="">Tüm Sınıflar</option>
          {classes.map((className) => (
            <option key={className} value={className}>
              {className}
            </option>
          ))}
        </select>
      </div>

      <div className="class-list">
        {filteredStudents.map((student) => (
          <div key={student.id} className="student-card">
            <div className="student-info">
              <span><strong>Ad:</strong> {student.name}</span>
              <span><strong>Sınıf:</strong> {student.class}</span>
              <span><strong>Zeka Türü:</strong> {student.intelligence}</span>
              <span><strong>Not:</strong> {student.grade}</span>
              <span><strong>Yaş:</strong> {student.age}</span>
              <span><strong>Doğum Tarihi:</strong> {student.dob}</span>
              <span><strong>İletişim:</strong> {student.contact}</span>
            </div>
            <div className="student-actions">
              <button className="edit-btn" onClick={() => handleEditStudent(student)}>
                Düzenle
              </button>
              <button className="delete-btn" onClick={() => handleDeleteStudent(student.id)}>
                Sil
              </button>
              <button className="chart-btn" onClick={() => handleToggleChart(student.id)}>
                Performans Grafiği Göster
              </button>
            </div>

            {/* Öğrenci kartındaki grafik butonuna tıklanınca gösterilen grafik */}
            {openChart === student.id && (
              <div className="chart-container">
                <h3>Performans Grafiği</h3>
                <Bar data={data} />
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="toggle-add-btn" onClick={handleToggleAddStudent}>
        Öğrenci Ekle
      </button>

      {isStudentAddVisible && (
        <div className="add-student">
          <form onSubmit={handleUpdateStudent}>
            <input type="text" name="studentName" placeholder="Öğrenci Adı" required />
            <select name="classSelect" required>
              <option value="">Sınıf Seçin</option>
              {classes.map((className) => (
                <option key={className} value={className}>{className}</option>
              ))}
            </select>
            <button type="submit">Ekle</button>
          </form>
        </div>
      )}

      {isEditing && (
        <div className="edit-student">
          <form onSubmit={handleUpdateStudent}>
            <input 
              type="text" 
              name="editStudentName" 
              defaultValue={editStudent?.name} 
              placeholder="Yeni Öğrenci Adı" 
              required 
            />
            <select 
              name="editStudentIntelligence" 
              defaultValue={editStudent?.intelligence} 
              required
            >
              <option value="Dilsel">Dilsel</option>
              <option value="Mantıksal">Mantıksal</option>
              <option value="Müzikal">Müzikal</option>
            </select>
            <button type="submit">Kaydet</button>
            <button type="button" onClick={() => setIsEditing(false)}>İptal</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;
