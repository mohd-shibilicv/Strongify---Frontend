import { useState, useEffect } from 'react';
import axios from 'axios';

const useBackendAPI = (url, method = 'GET', data = null, authToken = null) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const headers = {};
        if (authToken) {
          headers.Authorization = `Bearer ${authToken}`;
        }
        const response = await axios({
          method,
          url,
          data,
          headers,
        });
        setResponse(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [url, method, data, authToken]);

  return { response, error, isLoading };
};

export default useBackendAPI;
