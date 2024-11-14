import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function DownloadPage() {
  const { id } = useParams();
  const [fileUrl, setFileUrl] = useState('');

  useEffect(() => {
    // Fetch the file URL from the backend
    axios.get(`/api/download/${id}`)
      .then(response => setFileUrl(response.data.fileUrl))
      .catch(error => console.error('Error fetching file URL:', error));
  }, [id]);

  return (
    <div className="download-page">
      <h1>Download</h1>
      <p>Your payment was successful! Click the link below to download the file.</p>
      {fileUrl && <a href={fileUrl} download>Download File</a>}
    </div>
  );
}

export default DownloadPage;
