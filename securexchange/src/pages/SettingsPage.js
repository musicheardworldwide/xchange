import React, { useState, useEffect } from 'react';
import axios from 'axios';

function SettingsPage() {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    // Fetch profile information from the backend
    axios.get('/api/profile')
      .then(response => setProfile(response.data))
      .catch(error => console.error('Error fetching profile:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put('/api/profile', profile)
      .then(response => console.log('Profile updated successfully:', response.data))
      .catch(error => console.error('Error updating profile:', error));
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" value={profile.username} onChange={(e) => setProfile({ ...profile, username: e.target.value })} required />
        <input type="email" placeholder="Email" value={profile.email} onChange={(e) => setProfile({ ...profile, email: e.target.value })} required />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}

export default SettingsPage;

