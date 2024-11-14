import React from 'react';
import axios from 'axios';

function FileDownload({ fileId }) {
  const handleDownload = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/download/${fileId}`, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'file.txt');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('File download failed:', error);
    }
  };

  return (
    <button onClick={handleDownload}>Download</button>
  );
}

export default FileDownload;
