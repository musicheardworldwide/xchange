import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function FileDetailsPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Fetch file details from the backend
    axios.get(`/api/files/${id}`)
      .then(response => setFile(response.data))
      .catch(error => console.error('Error fetching file details:', error));
  }, [id]);

  if (!file) {
    return <div>Loading...</div>;
  }

  return (
    <div className="file-details-page">
      <h1>{file.title}</h1>
      <p>{file.description}</p>
      <p>Price: ${file.price}</p>
      <p>Category: {file.category}</p>
      <p>AI Summary: {file.summary}</p>
      <Link to={`/payment/${file.id}`} className="purchase-button">Purchase</Link>
    </div>
  );
}

export default FileDetailsPage;
