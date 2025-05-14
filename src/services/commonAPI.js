import axios from "axios";
import baseURL from "./baseURL";

const commonAPI = async (httpMethod, endpoint, requestBody,requestHeader) => {
  const requestConfig = {
    method: httpMethod,
    url: baseURL + endpoint,
    data: requestBody,
    headers: requestHeader ? requestHeader : {"Content-Type" : "application/json"},
  };

  return await axios(requestConfig)
    .then((res) => {
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export default commonAPI;
