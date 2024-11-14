import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProviderDashboard() {
  const [files, setFiles] = useState([]);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch uploaded files from the backend
    axios.get('/api/files')
      .then(response => setFiles(response.data))
      .catch(error => console.error('Error fetching files:', error));

    // Fetch profile information from the backend
    axios.get('/api/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleDelete = (fileId) => {
    axios.delete(`/api/files/${fileId}`)
      .then(() => {
        setFiles(files.filter(file => file.id !== fileId));
      })
      .catch(error => console.error('Error deleting file:', error));
  };

  return (
    <div className="provider-dashboard">
      <h1>Provider Dashboard</h1>
      <div className="profile-section">
        <h2>Profile Information</h2>
        <p>Username: {profile.username}</p>
        <p>Email: {profile.email}</p>
        <Link to="/settings">Settings</Link>
      </div>
      <Link to="/upload-file" className="upload-button">Upload File</Link>
      <ul className="file-list">
        {files.map(file => (
          <li key={file.id}>
            <span>{file.title}</span>
            <Link to={`/file-details/${file.id}`}>View Details</Link>
            <Link to={`/edit-file/${file.id}`}>Edit</Link>
            <button onClick={() => handleDelete(file.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProviderDashboard;
