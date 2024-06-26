import axios from 'axios';

// Define showLoading and hideLoading functions
const showLoading = () => {
  // Logic to show loading indicator
  console.log("Loading indicator is shown");
};

const hideLoading2  = () => {
  // Logic to hide loading indicator
  console.log("Loading indicator is hidden");
};

// Function to set loading interceptor
export const setLoadingInterceptor = ({ showLoading, hideLoading2  }) => {
  axios.interceptors.request.use(
    req => {
      if (!(req.data instanceof FormData)) showLoading();
      return req;
    },
    error => {
      hideLoading2 ();
      return Promise.reject(error);
    }
  );

  axios.interceptors.response.use(
    res => {
      hideLoading();
      return res;
    },
    error => {
      hideLoading();
      return Promise.reject(error);
    }
  );
};

// Call setLoadingInterceptor with showLoading and hideLoading functions
setLoadingInterceptor({ showLoading, hideLoading });

export default setLoadingInterceptor;
