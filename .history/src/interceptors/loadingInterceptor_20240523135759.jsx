import axios from 'axios';

export const setLoadingInterceptor = ({ showLoading, hideLoading }) => {
  axios.interceptors.request.use(
    req => {
      if (!(req.data instanceof FormData)) showLoading();
      return req;
    },
    error => {
      hideLoading(); // Correctly calls hideLoading function
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    res => {
      hideLoading(); // Correctly calls hideLoading function
      return res;
    },
    error => {
      hideLoading(); // Correctly calls hideLoading function
      return Promise.reject(error);
    }
  );
};
