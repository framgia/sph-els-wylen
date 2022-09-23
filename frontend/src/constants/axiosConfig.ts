import apiUrls from "./apiUrls";

const AxiosConfig = {
  baseURL: `${apiUrls.ROOT}`,
  xsrfHeaderName: 'X-CSRFToken',
  xsrfCookieName: 'csrftoken',
  withCredentials: true,

}

export default AxiosConfig
