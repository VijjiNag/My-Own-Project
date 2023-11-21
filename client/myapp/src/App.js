import React, {Fragment, useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Home from './components/Home'
import SchoolRegisterForm from './components/SchoolRegisterForm'
import AdminReports from './components/AdminReports';
import AdminLogin from './components/AdminLogin';
import SchoolLogin from './components/SchoolLogin';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

const App = () => {
    const jwtToken = Cookies.get("jwt_token")
    const isAuth = jwtToken !== undefined
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={isAuth ? <Navigate to="/admin"/> : <Home/>}/>
            <Route exact path='/admin_login' element={isAuth ? <Navigate to="/admin"/> : <AdminLogin/>}/>
            <Route exact path='/school_login' element={isAuth? <Navigate to="/admin"/> : <SchoolLogin/>}/>
            <Route element={<ProtectedRoute auth={isAuth}/>}>
              <Route exact path='/admin' element={<AdminHome/>}/>
              <Route exact path='/admin/school_register' element={<SchoolRegisterForm/>}/>
              <Route exact path='/admin/reports' element={<AdminReports/>}/>
              <Route exact path='/admin/change_password' element={<ChangePassword/>}/>
            </Route>
          </Routes>
        </Fragment>
      </Router>
    )
}

export default App;
