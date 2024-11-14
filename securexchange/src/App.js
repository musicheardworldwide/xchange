import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProviderDashboard from './pages/ProviderDashboard';
import UserDashboard from './pages/UserDashboard';
import FileUploadPage from './pages/FileUploadPage';
import FileDetailsPage from './pages/FileDetailsPage';
import PaymentPage from './pages/PaymentPage';
import DownloadPage from './pages/DownloadPage';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/provider-dashboard" element={<ProviderDashboard />} />
            <Route path="/user-dashboard" element={<UserDashboard />} />
            <Route path="/upload-file" element={<FileUploadPage />} />
            <Route path="/file-details/:id" element={<FileDetailsPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/download/:id" element={<DownloadPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegistrationPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
