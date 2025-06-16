import React, { useEffect, useState } from 'react';
import { fetchData } from '../services/api';
import './urlResponse.css'

const URLResponse: React.FC = () => {
  const [data, setData] = useState<unknown>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData('/');
        setData(result);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false)
      }
    };

    getData();
  }, []);

  return (
    <div className='url-response'>
      <h1 className='main-title'>Data from Backend</h1>
      {loading ? (<p>Loading...</p>) :
       error ? (<p style={{ color: 'red' }}>{error}</p>) :
       (<p className='response'>{data.message}</p>)}
    </div>
  );
};

export default URLResponse