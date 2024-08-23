import React from 'react'
import LandingPage from './Components/LandingPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/LoginPage';
import ManagerPage from './Components/ManagerPage';
import ProtectedRoute from './utils/ProtectedRoute';
import { Provider } from 'react-redux';
import store from './Redux/store.js';
import LearningCircleLeader from "./Components/LearningCircleLeader.jsx"
import Redirector from './Pages/Redirector.jsx';
import SignUpPage from './Components/SignUpPage.jsx';
import StudentPage from './Pages/Student.jsx';
import ChapterLeader from './Components/ChapterLeader.jsx';
import { Dashboard } from '@mui/icons-material';
import Volunteer from './Components/Volunteer/Volunteer.jsx';
import Student from './Components/Student/Student.jsx';
function App() {
  return (
    <>
    {/* <LandingPage /> */}
    <Provider store={store}>
      <Router>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/" element={<LandingPage/>} />
            <Route path="/LoginPage" element={<LoginPage />} />
            <Route path="/Signup" element={<SignUpPage />} />
              {/* <Route path="/admin" element={<ProtectedRoute requiredRole="Admin"><AdminPage /></ProtectedRoute>} /> */}
              <Route path="/volunteer/*" element={<ProtectedRoute requiredRole="mentor"><Volunteer /></ProtectedRoute>} />
              <Route path="/leader-chapter/*" element={<ProtectedRoute requiredRole="lch"><ChapterLeader /></ProtectedRoute>} />  
              <Route path="/students/*" element={<ProtectedRoute requiredRole="student"><Student/></ProtectedRoute>} />
              <Route path="/leader/*" element={<LearningCircleLeader />} /> 
              <Route path="/manager" element={<ProtectedRoute requiredRole="manager"><ManagerPage /></ProtectedRoute>} />
              <Route path="/leader/*" element={<ProtectedRoute requiredRole="lcl"><LearningCircleLeader /></ProtectedRoute>}></Route>
              <Route path="/manager" element={<ProtectedRoute requiredRole="fellow"><ManagerPage /></ProtectedRoute>} />
              <Route path="*" element={<h1>Not Found</h1>} />
              <Route path="/redirect" element={<Redirector />} />
        </Routes>
      </Router>
    </Provider>
    </>
)
}
export default App