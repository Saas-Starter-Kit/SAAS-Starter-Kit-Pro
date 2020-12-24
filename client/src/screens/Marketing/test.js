import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
        console.log(error.response.data);

        //error handle conditions
        setError(true);
      }
      setIsLoading(false);
    };

    fetchData();
  }, [url]);

  return [response, isLoading, error];
};

const Test = () => {
  let params = { title: 'FFFFFF' };
  const [response, isLoading, error] = useApi('/fail-health', 'get', '', params);

  return (
    <div>
      {response && console.log(response)}
      {error && console.log(error)}
      {isLoading && console.log(isLoading)}
      {/*<button onClick={ApiRequest}>DFFFFFFFFFFFF </button>{' '}*/}
    </div>
  );
};

export default Test;
