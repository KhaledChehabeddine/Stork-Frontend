import React, {useCallback, useEffect, useMemo, useState} from 'react';
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

const UpcomingEvents = (factory, deps) => {
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
        for (let i = 0; i < candidates.length; ++i) {
          if (jobPositions[j].id === candidates[i].jobPosition.id) {
            can.push(candidates[i]);
          }
        }

        let ac = [];
        for (let i = 0; i < can.length; ++i) {
          for (let k = 0; k < actions.length; ++k) {
            if (can[i].id === actions[k].candidate.id) {
              ac.push(actions[k]);
            }
          }
        }
        ac.sort((a, b) => {
          return a.id - b.id;
        });
        dict[jobPositions[j].id] = ac[ac.length - 1];
      }
      setDict(dict);
      setLoaded(true);
    }, [1500]);
    return () => clearInterval(interval);
  }, [actions, candidates, dict, jobPositions]);

  return (
    <div className='profile-card'>
      <h2 className="upcoming-title">
        Latest Updates
      </h2>
      <CTable className="upcoming-table" striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col' colSpan='1'>Job Position</CTableHeaderCell>
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
          { loaded &&
            (showingMore ? events : events.slice(0, 10)).map(element => (
              <LatestAction key={element.id} jobPosition={element} action={dict[element.id]} />
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
