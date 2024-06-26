import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './AppRoutes';
import Header from './components/Header/Header';
import Loading from './components/Loading/Loading';
import { useLoading } from './hooks/useLoading';
import { useEffect } from 'react';
import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
import { LoadingProvider } from './hooks/useLoading'; // Adjust the path as needed


function App() {
  const { showLoading, hideLoading } = useLoading();
  useEffect(() => {
    console.log(typeof hideLoading); 
    setLoadingInterceptor({ showLoading, hideLoading: hideLoading });
  }, [showLoading, hideLoading]);
  return (
    <Router>
      <LoadingProvider>{/* Wrap your components in Router */}
      <>
        <Loading />
        {/* <Header /> */}
        <AppRoutes />
      </>
      </LoadingProvider> 
    </Router>
  );
}

export default App;
