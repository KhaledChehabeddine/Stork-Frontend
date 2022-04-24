import React, {useCallback} from 'react';
import '../../Styles/ProfilePage.css'
import Navbar from "../Utils/Navbar";
import CIcon from "@coreui/icons-react";
import {cilBriefcase, cilBuilding, cilGlobeAlt, cilHome} from "@coreui/icons";
import {cilCalendarEvent, cilCity, cilRemoteControl} from "@coreui/icons-pro";
import {formatDate} from "../Utils/utils";
import {useNavigate} from "react-router-dom";

const VacancyPage = ({vacancy}) => {
  const navigate = useNavigate();

  const setWorkTypeIcon = () => {
    if (vacancy.workType === 'On-site') return <CIcon icon={cilBuilding}/>;
    if (vacancy.workType === 'Hybrid') return <CIcon icon={cilHome}/>;
    return <CIcon icon={cilRemoteControl}/>;
  }

  const getCandidates = () => {
    /* Implement backend support to get all candidates of a job position id */
    return 0 ? <div/>/*<CandidatesTable candidates=''/>*/ :
      <h1 className='profile-name'>No candidates assigned to this job position.</h1>;
  }

  const addCandidate = useCallback(() => {
    navigate('/candidate/add', {state: {jobPosition: vacancy}});
  }, [navigate, vacancy]);

  return (
    <>
      <div>
        <Navbar/>
        <div className='profile-card'
             style={{display: 'flex', justifyContent: 'space-evenly'}}>
          <div className='profile-info'>
            <h1 className='profile-name'
                style={{paddingTop: '2%'}}>{vacancy.jobTitle}</h1>
            <div className='profile-field'>
              <div className='profile-icon-container'
                   style={{float: 'left'}}><CIcon icon={cilGlobeAlt}/></div>
              <h3 className='card-text'
                  style={{float: 'right'}}>{vacancy.country}</h3>
            </div>
            <div className='profile-field'>
              <div className='profile-icon-container'
                   style={{float: 'left'}}><CIcon icon={cilCity}/></div>
              <h3 className='card-text'
                  style={{float: 'right'}}>{vacancy.city}</h3>
            </div>
            <div className='profile-field'>
              <div className='profile-icon-container'
                   style={{float: 'left'}}>{setWorkTypeIcon()}</div>
              <h3 className='card-text'
                  style={{float: 'right'}}>{vacancy.workType}</h3>
            </div>
            <div className='profile-field'>
              <div className='profile-icon-container'
                   style={{float: 'left'}}><CIcon icon={cilBriefcase}/></div>
              <h3 className='card-text'
                  style={{float: 'right'}}>{vacancy.employmentType}</h3>
            </div>
            <div className='profile-field'>
              <div className='profile-icon-container'
                   style={{float: 'left'}}><CIcon icon={cilCalendarEvent}/></div>
              <h3 className='card-text'
                  style={{float: 'right'}}>{formatDate(vacancy.expectedStartDate)}</h3>
            </div>
          </div>
          <div className='button-container'
               style={{float: 'right', width: '35%'}}>
            <h1 className='profile-name'
                style={{paddingTop: '2%'}}>Actions</h1>
            <button className='action-button'
                    onClick={() => addCandidate()}>Add Candidate</button>
            <button className='action-button'
                    onClick={'DO NOTHING'}>Edit Job Position</button>
          </div>
        </div>
        <div className='profile-card'
             style={{paddingBottom:'5%', marginBottom: '5%'}}>{getCandidates()}</div>
        </div>
    </>
  );
};

export default VacancyPage;
