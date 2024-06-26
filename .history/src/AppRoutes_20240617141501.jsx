import { IonApp, IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';
import LoginPage from './pages/Login/LoginPage';
// import Tab2 from './pages/Tab2';
// import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import RegisterPage from './pages/Register/RegisterPage';
import HomePage from './pages/Home/HomePage';
import CartPage from './pages/Cart/CartPage';
import OrdersPage from './pages/Orders/OrdersPage';
import OrderTrackPage from './pages/OrderTrack/OrderTrackPage';
import UsersPage from './pages/UsersPage/UsersPage';
import UserEditPage from './pages/UserEdit/UserEditPage';
import CategoriesPage from './pages/category/Category';
import ProfilePage from './pages/ProfileSettings/ProfilePage';
import AuthRoute from './components/AuthRoute/AuthRoute';
import OTPVerification from './pages/OTP/OTPVerification';
import Settings from './pages/Settings/Settings';
import MyOrders from './pages/MyOrders/MyOrders';
import Profile from './pages/Profile/Profile';


setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route path="/register" component={RegisterPage} exact />
        <Route path="/otp-verification" component={OTPVerification} exact />
        <Route path="/home" component={HomePage} exact />
        <Route path="/cart" component={CartPage} exact />
        <Route path="/user" component={UsersPage} exact />
        <Route path="/user-edit" component={UserEditPage} exact />
        <Route path="/categories" component={CategoriesPage} exact />
        <Route path="/settings" component={Settings} exact />
        <Route path="/profile" component={  Profile} exact />
        <Route path="/profile-settings" component={ProfilePage} exact />

        
        <Route
        path="/track/:orderId"
        element={
          <AuthRoute>
            <OrderTrackPage />
          </AuthRoute>
        }
      />
              <Route
        path="/my-order/:orderId"
        element={
          <AuthRoute>
          <MyOrders/>
          </AuthRoute>
        }
      />
        {/* <Route
        path="/profile"
        element={
          <AuthRoute>
            <ProfilePage />
          </AuthRoute>
        }
      /> */}
      <Route
        path="/orders/:filter?"
        element={
          <AuthRoute>
            <OrdersPage />
          </AuthRoute>
        }
      />
      </IonRouterOutlet>
      {/* Optional: Add IonTabs or other components here */}
    </IonReactRouter>
  </IonApp>
);

export default App;
