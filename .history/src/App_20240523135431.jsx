import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './AppRoutes';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
// import { useLoading } from './hooks/useLoading';
import { useEffect } from 'react';
// import { setLoadingInterceptor } from './interceptors/loadingInterceptor';


function App() {
  // const { showLoading, hideLoading  } = useLoading();

  // useEffect(() => {
  //   setLoadingInterceptor({ showLoading, hideLoading });
  // }, []);

  return (
    <Router> {/* Wrap your components in Router */}
      <>
        <Loading />
        {/* <Header /> */}
        <AppRoutes />
      </>
    </Router>
  );
}

export default App;
