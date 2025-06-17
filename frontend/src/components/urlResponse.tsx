import React, { useEffect, useState } from 'react';

import { fetchRootMessage } from '../api';

const URLResponse: React.FC = () => {
  const [data, setData] = useState<string>();
  const [error, setError] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchRootMessage();
        setData(result);
      } catch (error) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false)
      }
    };

    getData();
  }, []);

  return (
    <div className='flex flex-col items-center gap-10'>
      <h1 className="text-[rgb(82,139,160)] text-2xl font-semibold">Data from Backend</h1>
      {loading ? (<p>Loading...</p>) :
       error ? (<p className="text-red-500">{error}</p>) :
       (<p className="text-[rgb(156,217,65)]">{data}</p>)}
    </div>
  );
};

export default URLResponse
