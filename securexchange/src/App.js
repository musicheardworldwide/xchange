import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Login';
import Register from './Register';
import FileUpload from './FileUpload';
import FileDownload from './FileDownload';
import Payment from './Payment';
import Summarize from './Summarize';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/data');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <h1>SecureXchange Frontend</h1>
      <Login />
      <Register />
      <FileUpload />
      <Payment />
      <Summarize />
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name} <FileDownload fileId={item.id} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
