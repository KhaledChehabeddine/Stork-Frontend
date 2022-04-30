import React, {useEffect, useState} from 'react';
import '../../Styles/Breadcrumbs.css';
import '../../Styles/Home.css';
import {
  CTableHead,
  CTableHeaderCell,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableRow,
  CCardBody,
  CCard
} from '@coreui/react';
import {useData} from '../../Context/Use';
import Navbar from '../Utils/Navbar';
import CardHeader from 'react-bootstrap/CardHeader';
import {cilBriefcase, cilCalendar, cilCheckCircle, cilClock, cilPaperPlane, cilXCircle} from "@coreui/icons";
import CIcon from "@coreui/icons-react";

const statusMessage = (action) => {
  if (action.title.toLowerCase() === 'accepted')
    return (
      <div className='status-accepted'>
        <CIcon className='me-2'
               icon={cilCheckCircle}/>
        {action.title}
      </div>);
  if (action.title.toLowerCase() === 'offer accepted')
    return (
      <div className='status-accepted'>
        <CIcon className='me-2'
               icon={cilCheckCircle}/>
        {action.title}
      </div>
    );
  if (action.title.toLowerCase() === 'offer rejected')
    return (
      <div className='status-rejected'>
        <CIcon className='me-2'
               icon={cilXCircle}/>
        {action.title}
      </div>
    );
  if (action.title.toLowerCase() === 'offer sent')
    return (
      <div className='status-pending'>
        <CIcon className='me-2'
               icon={cilPaperPlane}/>
        {action.title}
      </div>
    );
  if (action.title.toLowerCase() === 'pending')
    return (
      <div className='status-pending'>
        <CIcon className='me-2'
               icon={cilClock}/>
        {action.title}
      </div>);
  if (action.title.toLowerCase() === 'rejected')
    return (
      <div className='status-rejected'>
        <CIcon className='me-2'
               icon={cilXCircle}/>
        {action.title}
      </div>);
  return (
    <div className='status-interview'>
      <CIcon className='me-2'
             icon={cilCalendar}/>
      {action.title}
    </div>
  );
}

const LatestAction = ({action, jobPosition}) => {
  return (
    <CTableRow className='table-body-row'>
      <CTableDataCell className='table-header-cell table-job-position-cell'
                      style={{color: '#cfd5da'}}><span>{jobPosition.jobTitle}</span></CTableDataCell>
      <CTableDataCell className='table-header-cell table-candidate-status-cell'
                      style={{color: '#cfd5da'}}>
        {action ? action.candidate.firstName + ' ' + action.candidate.lastName :
          <div className='candidate-none'>
            No Candidate
          </div>}
      </CTableDataCell>
      <CTableDataCell className='table-header-cell table-candidate-status-cell'
                      style={{color: '#cfd5da'}}>
        {action ? statusMessage(action) :
          <div className='status-new-position'>
            <CIcon className='me-2'
                   icon={cilBriefcase}/>
            New Position
          </div>}
      </CTableDataCell>
    </CTableRow>
  );
};

const UpcomingEvents = () => {
  const { values: { candidates, jobPositions, actions } } = useData();
  const [loaded, setLoaded] = useState(false);
  const [showingMore, setShowingMore] = useState(false);
  const [events, setEvents] = useState([]);
  const [dict, setDict] = useState({});

  useEffect(()=> {
    setEvents(jobPositions);
    const interval = setInterval(() => {
      for (let j = 0; j < jobPositions.length; ++j) {
        let can = [];
        for (let i = 0; i < candidates.length; ++i)
          if (jobPositions[j].id === candidates[i].jobPosition.id)
            can.push(candidates[i]);
        let ac = [];
        for (let i = 0; i < can.length; ++i)
          for (let k = 0; k < actions.length; ++k)
            if (can[i].id === actions[k].candidate.id)
              ac.push(actions[k]);
        ac.sort((a, b) => {return a.id - b.id});
        dict[jobPositions[j].id] = ac[ac.length - 1];
      }
      setDict(dict);
      setLoaded(true);
    }, [loaded ? 1 : 1000]);
    return () => clearInterval(interval);
  }, [actions, candidates, dict, jobPositions, loaded]);

  return (
    <CCard className='home-card'>
      <CCardBody>
        <CardHeader className='home-card-header mb-3'>LATEST UPDATES</CardHeader>
        <CCard>
          <CTable className='home-table'
                  hover
                  style={{color: '#cfd5da'}}>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell className='table-header-cell'
                                  colSpan='1'
                                  scope='col'>Job Position</CTableHeaderCell>
                <CTableHeaderCell className='table-header-cell'
                                  colSpan='1'
                                  scope='col'>Candidate</CTableHeaderCell>
                <CTableHeaderCell className='table-header-cell'
                                  colSpan='1'
                                  scope='col'>Status</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {!loaded &&
                <CTableRow>
                  <CTableDataCell className='table-loading-cell'
                                  colSpan='3'>Loading...</CTableDataCell>
                </CTableRow>}
              {loaded &&
                (showingMore ? events : events.slice(0, 3)).map(element =>
                  <LatestAction key={element.id} jobPosition={element} action={dict[element.id]}/>
                )}
              {!showingMore && events.length > 3 &&
                <CTableRow>
                  <CTableDataCell className='table-view'
                                  colSpan='3'>
                    <div onClick={() => setShowingMore(true)}>View more</div>
                  </CTableDataCell>
                </CTableRow>}
              {showingMore && events.length > 3 &&
                <CTableRow>
                  <CTableDataCell className='table-view'
                                  colSpan='3'>
                    <div onClick={() => setShowingMore(false)}>View less</div>
                  </CTableDataCell>
                </CTableRow>}
            </CTableBody>
          </CTable>
        </CCard>
      </CCardBody>
    </CCard>
  );
};

const Home = () => {
  return (
    <div align='center'
         className='full-height'
         style={{background: '#ECF0F3'}}>
      <Navbar/>
      <div style={{ marginTop:'50px'}}>
        <UpcomingEvents/>
      </div>
    </div>
  );
};

export default Home;
