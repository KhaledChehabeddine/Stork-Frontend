import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/LandingPage';
import Home from './Components/Pages/Home';
import CandidateForm from './Components/Forms/CandidateForm'
import EmployeeForm from './Components/Forms/EmployeeForm';
import EmployeeCardWrapper from './Components/Cards/EmployeeCardWrapper';
import CandidateCardWrapper from "./Components/Cards/CandidateCardWrapper";
import ScheduleForm from './Components/Forms/ScheduleForm';
import {useEffect, useState} from "react";
import getApiClient from "./api_client/getApiClient";
import ViewEmployeePage from "./Components/Pages/ViewEmployeePage";
import ViewCandidatePage from "./Components/Pages/ViewCandidatePage";
import LoginForm from "./Components/Forms/LoginForm";

function App() {
  const [employees, setEmployees] = useState([]);
  const [candidates, setCandidates] = useState([]);
  // eslint-disable-next-line
  const getAllEmployees = useEffect(() => {
    getApiClient().getAllEmployees()
      .then(response => {
        setEmployees(response.data);
      }).catch(error => {console.log(error)});
  }, []);
  // eslint-disable-next-line
  const getAllCandidates = useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        setCandidates(response.data);
      }).catch(error => {console.log(error)});
  }, []);

  return (
    <Router>
      <Routes>
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/login' element={<LoginForm/>}/>
        <Route exact path='/home' element={<Home/>}/>
        <Route exact path='/employee/add' element={ <EmployeeForm /> } />
        <Route exact path='/employee/all' element={ <EmployeeCardWrapper /> } />
        <Route exact path='/candidate/add' element={ <CandidateForm /> } />
        <Route exact path='/candidate/all' element={ <CandidateCardWrapper />} />
        <Route exact path='/interview/schedule' element={ <ScheduleForm /> } />
        {employees.map(employee =>
          <Route
            exact
            key={employee.id}
            path={`/employee/${employee.id}`}
            element={<ViewEmployeePage employee={employee} />}
          />)}
        {candidates.map(candidate =>
          <Route
            exact
            key={candidate.id}
            path={`/candidate/${candidate.id}`}
            element={<ViewCandidatePage candidate={candidate} />}
          />)}
      </Routes>
    </Router>
  );
}

export default App;
