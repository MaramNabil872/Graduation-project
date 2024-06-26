import { Router } from 'react-router';
import AppRoutes from './AppRoutes';
import Header from './components/Header/Header';
// import Loading from './components/Loading/Loading';
// import { useLoading } from './hooks/useLoading';
// import { setLoadingInterceptor } from './interceptors/loadingInterceptor';
// import { useEffect } from 'react';

function App() {
  // const { showLoading, hideLoading } = useLoading();

  // useEffect(() => {
  //   setLoadingInterceptor({ showLoading, hideLoading });
  // }, []);

  return (
    <>
    <Router>
      {/* <Loading /> */}
      <Header />
      <AppRoutes />
      </Router>
    </>
  );
}

export default App;
