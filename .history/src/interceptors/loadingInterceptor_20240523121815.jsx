import React, { useState } from 'react';
import { setLoadingInterceptor } from './path/to/setLoadingInterceptor';
import axios from 'axios';

const App = () => {
  const [loading, setLoading] = useState(false);

  const showLoading = () => setLoading(true);
  const hideLoading = () => setLoading(false);

  // Set the interceptor with the loading functions
  setLoadingInterceptor({ showLoading, hideLoading });

  // Example axios request
  const fetchData = async () => {
    try {
      const response = await axios.get('/api/data');
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {loading && <div>Loading...</div>}
      <button onClick={fetchData}>Fetch Data</button>
    </div>
  );
};

export default App;
