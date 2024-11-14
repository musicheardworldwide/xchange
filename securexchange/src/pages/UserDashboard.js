import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function UserDashboard() {
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch purchased files from the backend
    axios.get('/api/purchased-files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));

    // Fetch profile information from the backend
    axios.get('/api/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  return (
    <div className="user-dashboard">
      <h1>User Dashboard</h1>
      <div className="profile-section">
        <h2>Profile Information</h2>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <Link to="/settings">Settings</Link>
      </div>
      <ul className="file-list">
        {files.map(file => (
          <li key={file.id}>
            <span>{file.title}</span>
            <Link to={`/file-details/${file.id}`}>View Details</Link>
            <Link to={`/download/${file.id}`}>Download</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserDashboard;
