import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { errorNotification } from '../components/Admin/Common/errorNotification';
import ApiContext from '../utils/apiContext';

const Axios = axios.create({
  baseURL: 'http://localhost',
  timeout: 15000
});

const useApi = (url, method, data, params) => {
  const { Fetch_Init, Fetch_Success, Fetch_Failure } = useContext(ApiContext);
  const [response, setResponse] = useState(null);
  const [errorState, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        Fetch_Init();
        const result = await Axios({
          url,
          method,
          data,
          params
        });

        console.log(result);
        Fetch_Success();
        setResponse(result.data);
      } catch (error) {
        Fetch_Failure(error);
        setError(error);
        //general error handling condition
        //if (error.response.data) {
        //  console.log(error.response.data);
        //  let errorMessage = error.response.data.message
        //    ? error.response.data.message
        //    : 'Request Failed Please Try Again or Contact Support';
        //  let errorType = error.response.data.type ? error.response.data.type : '500 Server Error';
        //  errorNotification(errorType, errorMessage);
        //} else if (error.message) {
        //    //firebase auth errors
        //}
        //error handle conditions
      }
    };

    fetchData();
  }, [url]);

  return [response, errorState];
};

//custom response var, custom response var, loading

export default useApi;
