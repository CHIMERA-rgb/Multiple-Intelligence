import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import UserManagement from './pages/UserManagement';
import GeneralReports from './pages/Reports';
import ContentManagement from './pages/ContentManagement';
import Announcements from './pages/Announcements';
import ClassManagement from './pages/TeacherDashboard/ClassManagement';
import StudentProfile from './pages/TeacherDashboard/StudentProfile';
import ActivityManagement from './pages/ActivityManagement';
import TeacherDashboard from './pages/TeacherDashboard/TeacherDashboard';
import ParentDashboard from './pages/ParentDashboard/ParentDashboard';
import MessagingTab from './pages/ParentDashboard/MessagingTab/MessagingTab';
import PerformanceTab from './pages/ParentDashboard/PerformanceTab/PerformanceTab';
import SuggestionsTab from './pages/ParentDashboard/SuggestionsTab/SuggestionsTab';
import TasksTab from './pages/ParentDashboard/TasksTab/TasksTab';
import ExtracurricularOpportunities from './pages/ParentDashboard/ExtracurricularOpportunities/ExtracurricularOpportunities';
import PerformanceReports from './pages/TeacherDashboard/PerformanceReports'; // Yeni sayfa
import Messages from './pages/TeacherDashboard/Messages'; // Yeni Mesajlar Sayfası
import Feedback from './pages/TeacherDashboard/Feedback'; // Yeni Feedback Sayfası
import Statistics from './pages/TeacherDashboard/Statistics'; // Yeni Statistics Sayfası
import ClassroomClimate from './pages/TeacherDashboard/ClassroomClimate';
import Strategies from './pages/TeacherDashboard/Strategies';
import RewardsAndIncentives from './pages/TeacherDashboard/RewardsAndIncentives';
import LearningResources from './pages/ParentDashboard/LearningResources/LearningResources';

function App() {
  return (
    <Router>
      <Routes>
        {/* Genel Sayfalar */}
        <Route path="/" element={<HomePage />} /> {/* Ana Sayfa İlk */}
        <Route path="/login" element={<LoginPage />} />

        {/* Admin Paneli */}
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/admin-dashboard/user-management" element={<UserManagement />} />
        <Route path="/admin-dashboard/reports" element={<GeneralReports />} />
        <Route path="/admin-dashboard/content-management" element={<ContentManagement />} />
        <Route path="/admin-dashboard/announcements" element={<Announcements />} />

        {/* Öğretmen Paneli */}
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-dashboard/student-profile" element={<StudentProfile />} />
        <Route path="/teacher-dashboard/class-management" element={<ClassManagement />} />
        <Route path="/teacher-dashboard/activity-management" element={<ActivityManagement />} />
        <Route path="/teacher-dashboard/performance-reports" element={<PerformanceReports />} /> {/* Yeni sayfa */}
        <Route path="/teacher-dashboard/messages" element={<Messages />} /> {/* Yeni Mesajlar Sayfası */}
        <Route path="/teacher-dashboard/feedback" element={<Feedback />} /> {/* Yeni Feedback Sayfası */}
        <Route path="/teacher-dashboard/statistics" element={<Statistics />} /> {/* Yeni Statistics Sayfası */}
        <Route path="/teacher-dashboard/classroomclimate" element={<ClassroomClimate />} /> {/* Yeni Sınıf Bilgisayarı Sıcaklığı Sayfası */}
        <Route path="/teacher-dashboard/strategies" element={<Strategies />} /> {/* Yeni Öğretmen Stratejileri Sayfası */}
        <Route path="/teacher-dashboard/rewards-and-incentives" element={<RewardsAndIncentives />} /> {/* Yeni Ödüllü ve Ödenekler Sayfası */}

        {/* Veli Paneli */}
        <Route path="/parent-dashboard" element={<ParentDashboard />} />
        <Route path="/parent-dashboard/messaging" element={<MessagingTab />} />
        <Route path="/parent-dashboard/performance" element={<PerformanceTab />} />
        <Route path="/parent-dashboard/suggestions" element={<SuggestionsTab />} />
        <Route path="/parent-dashboard/tasks" element={<TasksTab />} />
        <Route path="/parent-dashboard/learning-resources" element={<LearningResources />} /> {/* Yeni Öğrenci Eğitim Veri Sayfası */}
        <Route path="/parent-dashboard/extracurricular-opportunities" element={<ExtracurricularOpportunities />} /> {/* Yeni Öğrenci Ekstra Kurumsal İşler Sayfası */}

      </Routes>
    </Router>
  );
}

export default App;