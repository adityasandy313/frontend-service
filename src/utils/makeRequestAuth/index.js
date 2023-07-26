import axios from 'axios';

const makeRequestAuth = async (apiEndPoint, dynamicConfig = {}, navigate) => {
  try {
    const requestDetails = {
      baseURL: 'http://localhost:3004/',
      url: apiEndPoint.url,
      method: apiEndPoint.method,
      ...dynamicConfig,
    };
    const { data } = await axios(requestDetails);

    return data;
  } catch (e) {
    if (navigate) {
      const errorStatus = e.response?.status;
      if (errorStatus) {
        navigate(`/error/${errorStatus}`);
      } else {
        navigate('/error');
      }
    }
  }
};

export default makeRequestAuth;