import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import PrivateRoutes from './utils/protected';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserRoutes from './utils/user';
import NotFoundPage from './pages/404';


const User = React.lazy(() => import("./pages/user"));
const Login = React.lazy(() => import('./pages/login'));


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<UserRoutes />}>
            <Route path="/" element={<React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>} />
            <Route path="/login" element={<React.Suspense fallback={<>...</>}>
              <Login />
            </React.Suspense>} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/user" element={<React.Suspense fallback={<>...</>}>
                <User />
              </React.Suspense>} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
