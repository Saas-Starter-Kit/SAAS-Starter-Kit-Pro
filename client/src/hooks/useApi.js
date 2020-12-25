import { useEffect, useState, useContext } from 'react';
import ApiContext from '../utils/apiContext';
import axios from '../services/axios';

const useApi = async (url, method, data, params) => {
  const { fetchInit, fetchSuccess, fetchFailure } = useContext(ApiContext);
  const [response, setResponse] = useState(null);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        fetchInit();
        const result = await axios({
          url,
          method,
          data,
          params
        });

        console.log(result);
        fetchSuccess();
        setResponse(result.data);
      } catch (error) {
        fetchFailure(error);
        setError(error);
      }
    };

    fetchData();
  }, [url]);

  return [response, errorState];
};

export default useApi;
