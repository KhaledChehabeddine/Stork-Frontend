import React, {useCallback, useEffect, useState} from 'react';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css';
import '../../Styles/Home.css';
import getApiClient from '../../api_client/getApiClient';
import {formatDateTime} from '../Utils/utils';
import {CTableHead, CTableHeaderCell, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';
import {useData} from "../../Context/Use";

const Home = () => {
  return (
    <div align='center' id='home'>
      <NavBar/>
      <div style={{ marginTop:'50px'}}>
        <UpcomingEvents/>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const { values: { candidates, jobPositions, actions } } = useData();
  const [loaded, setLoaded] = useState(false);
  const [showingMore, setShowingMore] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(()=> {
    setEvents(jobPositions);
    setLoaded(true);
  }, [jobPositions]);

  const getLatestAction = useCallback((jobPosition) => {
    let can = [];
    for (let i = 0; i < candidates.length; ++i) {
      if (jobPosition.id === candidates[i].jobPosition.id) {
        can.push(candidates[i]);
      }
    }
    let ac = [];
    for (let i = 0; i < Math.min(ac.length, can.length); ++i) {
      if (can[i].id === ac[i].candidate.id) {
        ac.push(ac[i]);
      }
    }
    console.log(actions);
    actions.sort((a, b) => {
      return a.id - b.id;
    });
    return ac[ac.length - 1];
  }, []);


  return (
    <div className='upcoming-events-container'>
      <h2>
        Latest Updates
      </h2>
      <CTable striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col' colSpan='1'>Job Postition</CTableHeaderCell>
            <CTableHeaderCell scope='col' colSpan='1'>Candidate</CTableHeaderCell>
            <CTableHeaderCell scope='col' colSpan='1'>Status</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {!loaded && 
            <CTableRow>
              <CTableDataCell colSpan='3'>
                <div className='loading-text'>
                  Loading...
                </div>
              </CTableDataCell>
            </CTableRow>
          }
          {
            (showingMore ? events : events.slice(0, 10)).map(element => (
              <LatestAction key={element.id} jobPosition={element} action={getLatestAction(element)} />
            ))
          }
          {!showingMore && events.length > 3 && // conditional rendering
            <CTableRow>
              <CTableDataCell colSpan='4'>
                <div onClick={() => setShowingMore(true)} className='view-more-button'>
                  View more
                </div>
              </CTableDataCell>
            </CTableRow>}
        </CTableBody>
      </CTable>
    </div>
  );
};

const LatestAction = ({ jobPosition, action }) => {
  return (
    <CTableRow>
      <CTableDataCell>{jobPosition.jobTitle}</CTableDataCell>
      <CTableDataCell>
        {action ? action.candidate.firstName + ' ' + action.candidate.lastName : 'N/A'}
      </CTableDataCell>
      <CTableDataCell>
        {action ? action.title : 'N/A'}
      </CTableDataCell>
    </CTableRow>
  );
};

export default Home;
