import { useEffect, useState } from 'react';
import axios from 'axios';
import { errorNotification } from '../components/Admin/Common/errorNotification';

const Axios = axios.create({
  baseURL: 'http://localhost',
  timeout: 15000
});

const useApi = (url, method, data, params) => {
  const [response, setResponse] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await Axios({
          url,
          method,
          data,
          params
        });

        console.log(result);
        setResponse(result.data);
      } catch (error) {
        //general error handling condition
        if (error.response.data) {
          console.log(error.response.data);
          let errorMessage = error.response.data.message
            ? error.response.data.message
            : 'Request Failed Please Try Again';
          let errorType = 'Server Error';
          errorNotification(errorType, errorMessage);
        }
        //error handle conditions
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [response, isLoading, error];
};

export default useApi;
