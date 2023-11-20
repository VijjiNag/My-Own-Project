import React, {Fragment, Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import SchoolRegisterForm from './components/SchoolRegisterForm'
import AdminReports from './components/AdminReports';
import AdminLogin from './components/AdminLogin';
import SchoolLogin from './components/SchoolLogin';
import AdminHome from './components/AdminHome';
import ChangePassword from './components/ChangePassword';
import ProtectedRoute from './components/ProtectedRoute';
import DisplayAdminProtectedRoute from './components/DisplayAdminProtectedRoute';
import DisplaySchoolProtectedRoute from './components/DisplaySchoolProtectedRoute';
import DisplayReportsProtectedRoute from './components/DisplayReportsProtectedRoute';
import DisplayChangePasswordProtectedRoute from './components/DisplayChangePasswordProtectedRoute';
import Auth from './components/Auth';
import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <Routes>
            <Route exact path='/' element={<Home/>}/>
            <Route exact path='/admin_login' element={<AdminLogin/>}/>
            <Route exact path='/school_login' element={<SchoolLogin/>}/>
            <ProtectedRoute exact path="/admin" element={<AdminHome/>}/>
          </Routes>
        </Fragment>
      </Router>
    )
  }
}

export default App;
