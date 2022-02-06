import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import ApplicantForm from './Components/Forms/ApplicantForm'
import EmployeeForm from './Components/Forms/EmployeeForm';
import EmployeeCardWrapper from './Components/Cards/EmployeeCardWrapper';
import ApplicantCardWrapper from "./Components/Cards/ApplicantCardWrapper";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route exact path='/employee/add' element={ <EmployeeForm /> } />
        <Route exact path='/employee/all' element={ <EmployeeCardWrapper /> } />
        <Route exact path='/applicant/add' element={ <ApplicantForm /> } />
        <Route exact path='/applicant/all' element={ <ApplicantCardWrapper />} />
      </Routes>
    </Router>
  );
}

export default App;
