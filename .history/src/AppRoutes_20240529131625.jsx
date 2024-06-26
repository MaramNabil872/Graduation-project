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
import ProfilePage from './pages/Profile/ProfilePage';


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
        <Route path="/home" component={HomePage} exact />
        <Route path="/cart" component={CartPage} exact />
        <Route path="/order" component={OrdersPage} exact />
        <Route path="/order-track" component={OrderTrackPage} exact />
        <Route path="/user" component={UsersPage} exact />
        <Route path="/user-edit" component={UserEditPage} exact />
        <Route path="/categories" component={CategoriesPage} exact />
        <Route path="/categories" component={CategoriesPage} exact />
      </IonRouterOutlet>
      {/* Optional: Add IonTabs or other components here */}
    </IonReactRouter>
  </IonApp>
);

export default App;
