import React, { Fragment, Component, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Cookies from 'js-cookie';
import Home from './components/Home'
import SchoolRegisterForm from './components/SchoolRegisterForm'
import AdminSchoolReports from './components/AdminSchoolReports';
import AdminCollegeReports from './components/AdminCollegeReports';
import AdminLogin from './components/AdminLogin';
import SchoolLogin from './components/SchoolLogin';
import AdminHome from './components/AdminHome';
import CollegeLogin from './components/CollegeLogin';
import ChangePassword from './components/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import ProtectedRouteForPublic from './components/ProtectedRouteForPublic';
import CollegeRegistrationForm from './components/CollegeRegistrationForm';
import NotFound from './components/NotFound';
import GetStarted from './components/GetStarted';
import AdminUserQueryReports from './components/AdminUserQueryReports';
import './App.css';

const App = () => {
    const jwtToken = Cookies.get("jwt_token")
    const isAuth = jwtToken !== undefined
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route element={<ProtectedRouteForPublic auth={isAuth} />}>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/admin_login' element={<AdminLogin />} />
              <Route exact path='/school_login' element={<SchoolLogin />} />
              <Route exact path='/college_login' element={<CollegeLogin />} />
              <Route exact path='/user_query' element={<GetStarted/>}/>
            </Route>
            <Route element={<ProtectedRoute auth={isAuth} />}>
              <Route exact path='/admin/dashboard' element={<AdminHome />} />
              <Route exact path='/admin/:admin_id/register/school' element={<SchoolRegisterForm />} />
              <Route exact path='/admin/:admin_id/register/college' element={<CollegeRegistrationForm/>} />
              <Route exact path='/admin/:admin_id/reports/school' element={<AdminSchoolReports />} />
              <Route exact path='/admin/:admin_id/reports/college' element={<AdminCollegeReports />} />
              <Route exact path='/admin/:admin_id/reports/user_query' element={<AdminUserQueryReports />} />
              <Route exact path='/admin/:admin_id/change_password' element={<ChangePassword />} />
              <Route path='*' element={<NotFound />}/>
            </Route>
          </Routes>
        </Fragment>
      </Router>
    )
}

export default App;
