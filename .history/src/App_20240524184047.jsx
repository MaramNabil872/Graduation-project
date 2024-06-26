import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Import BrowserRouter
import AppRoutes from "./AppRoutes";
import Header from "./components/Header/Header";
import ''
function App() {
    // const { showLoading, hideLoading } = useLoading();
    // useEffect(() => {
    //     setLoadingInterceptor({ showLoading, hideLoading });
    // }, []);
    // console.log(typeof hideLoading);
    return (
        <Router>
            {/* Wrap your components in Router */}
            <>
                {/* <Loading /> */}
                {/* <Header /> */}
                <AppRoutes />
            </>
        </Router>
    );
}

export default App;
