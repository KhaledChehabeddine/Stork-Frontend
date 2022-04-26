import CandidateForm from './Components/Forms/CandidateForm';
import CandidatesPage from "./Components/Pages/CandidatesPage";
import Home from './Components/Pages/Home';
import InterviewForm from './Components/Forms/InterviewForm';
import JobForm from './Components/Forms/JobForm';
import LandingPage from './Components/Pages/LandingPage';
import LoginForm from "./Components/Forms/LoginForm";
import ManagerForm from "./Components/Forms/ManagerForm";
import NavigateToAfter from "./Components/Pages/NavigateToAfter";
import PageNotAvailable from "./Components/Pages/PageNotAvailable";
import AboutUsPage from "./Components/Pages/AboutUsPage";
import ProfilePage from './Components/Pages/ProfilePage';
import ResumePage from "./Components/Pages/ResumePage";
import VacanciesPage from "./Components/Pages/VacanciesPage";
import VacancyPage from "./Components/Pages/VacancyPage";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {getHashCode} from "./Components/Utils/utils";
import {useCallback} from "react";
import './App.css';
import {useData} from "./Context/Use";
import LandingPageAboutUs from "./Components/Pages/LandingPageAboutUs";
import ManagerTable from "./Components/Tables/ManagerTable";
import InterviewTable from "./Components/Tables/InterviewTable";

const Routing = () => {
  const { values: { jobPositions, candidates } } = useData();

  const isLoggedIn = useCallback(() => {
    return window.localStorage.getItem('email');
  }, []);

  return (
    <Router>
      <Routes>
        <Route element={ <NavigateToAfter time={2} path={isLoggedIn() ? '/404' : '/login'} /> } exact path='*' />
        <Route element={ <LandingPage /> } exact path='/' />
        <Route element={ <LandingPageAboutUs /> } exact path='/aboutus/1'/>
        <Route element={ <PageNotAvailable /> } exact path='/404' />
        <Route element={ <LoginForm /> } exact path='/login' />
        {isLoggedIn()
          ?
          <>
            <Route element={ <Home /> } exact path='/home'/>
            <Route element={ <AboutUsPage /> } exact path='/aboutus/2'/>
            <Route element={ <CandidateForm /> } exact path='/candidate/add'/>
            <Route element={ <CandidatesPage /> } exact path='/candidate/all'/>
            <Route element={ <InterviewForm /> } exact path='/interview/add'/>
            <Route element={ <InterviewTable /> } exact path='/interview/all'/>
            <Route element={ <JobForm /> } exact path='/job/add'/>
            <Route element={ <VacanciesPage /> } exact path='/job/all'/>
            <Route element={ <ManagerForm /> } exact path='/manager/add'/>
            <Route element={ <ManagerTable /> } exact path='/manager/all'/>
            {candidates.map(candidate =>
              <Route element={ <ProfilePage candidate={candidate} /> } exact key={candidate.id}
                     path={`/candidate/${getHashCode(candidate.id)}`} />)}
            {candidates.map(candidate =>
              <Route element={<ResumePage candidate={candidate} />} exact key={candidate.id}
                     path={`/resume/${getHashCode(candidate.id)}`} />)}
            {jobPositions.map(jobPosition =>
              <Route element={<VacancyPage vacancy={jobPosition} />} exact key={jobPosition.id}
                     path={`/job/${getHashCode(jobPosition.id)}`} />)}
          </>
          :
          <></>}
      </Routes>
    </Router>
  )
};

export default Routing;
