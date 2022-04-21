import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/Pages/LandingPage';
import Home from './Components/Pages/Home';
import CandidateForm from './Components/Forms/CandidateForm';
import InterviewForm from './Components/Forms/InterviewForm';
import {useCallback, useEffect, useState} from "react";
import getApiClient from "./api_client/getApiClient";
import LoginForm from "./Components/Forms/LoginForm";
import PageNotAvailable from "./Components/Pages/PageNotAvailable";
import NavigateToAfter from "./Components/Pages/NavigateToAfter";
import JobForm from './Components/Forms/JobForm';
import VacanciesPage from "./Components/Pages/VacanciesPage";
import CandidatesPage from "./Components/Pages/CandidatesPage";
import ProfilePage from './Components/Pages/ProfilePage';
import {getHashCode} from "./Components/Utils/utils";
import ResumePage from "./Components/Pages/ResumePage";
import ManagerForm from "./Components/Forms/ManagerForm";

function App() {
  const [candidates, setCandidates] = useState([]);
  const isLoggedIn = useCallback(() => {
    return window.localStorage.getItem('email');
  }, []);

  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        setCandidates(response.data);
      }).catch(error => {console.log(error)});
  }, [candidates, setCandidates]);

  return (
    <Router>
      <Routes>
        <Route exact path='*' element={<NavigateToAfter time={2} path={'/login'} />} />
        <Route exact path='/' element={<LandingPage/>}/>
        <Route exact path='/404' element={<PageNotAvailable />} />
        <Route exact path='/login' element={<LoginForm/>} />
        {isLoggedIn() ?
          <>
            <Route exact path='/home' element={<Home/>}/>
            <Route exact path='/candidate/add' element={<CandidateForm/>}/>
            <Route exact path='/candidate/all' element={<CandidatesPage/>}/>
            <Route exact path='/interview/add' element={<InterviewForm/>}/>
            <Route exact path='/job/add' element={<JobForm/>}/>
            <Route exact path='/job/all' element={<VacanciesPage/>}/>
            <Route exact path='/manager/add' element={<ManagerForm/>}/>
            {candidates.map(candidate =>
              <Route exact key={candidate.id} path={`/candidate/${getHashCode(candidate.id)}`} element={<ProfilePage candidate={candidate}/>}/>)}
            {candidates.map(candidate =>
              <Route exact key={candidate.id} path={`/resume/${getHashCode(candidate.id)}`} element={<ResumePage candidate={candidate}/>}/>)}
          </>
          :
          <>

          </>
        }
      </Routes>
    </Router>
  );
}

export default App;
