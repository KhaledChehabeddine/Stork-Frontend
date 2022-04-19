import React, { useEffect, useState, useCallback } from 'react';
import NavBar from '../Utils/Navbar';
import '../../Styles/Breadcrumbs.css';
import '../../Styles/Home.css';
import getApiClient from '../../api_client/getApiClient';
import {formatDateTime} from '../Utils/utils';
import {CTableHead, CTableHeaderCell, CTable, CTableBody, CTableDataCell, CTableRow } from '@coreui/react';

const Home = () => {
  return (
    <div align='center' id='home'>
      <NavBar/>
      <div className='form-header' style={{ marginTop:'50px'}}></div>

      <div>
        <UpcomingEvents/>
      </div>
    </div>
  );
};

const UpcomingEvents = () => {
  const [loaded, setLoaded] = useState(false);
  const [showingMore, setShowingMore] = useState(false);
  const [events, setEvents] = useState([]); 
  const [errorMessage, setErrorMessage] = useState('');
  const [candidates, setCandidates] = useState({});

  useEffect(()=> {
    getApiClient().getAllInterviews()
      .then(response => {
        const tempEvents = response.data.slice();
        tempEvents.sort((a, b) => new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime());
        const today = new Date();
        today.setHours(0);
        today.setMinutes(0);
        today.setSeconds(0);
        setEvents(tempEvents.filter((element) => new Date(element.dateTime).getTime() >= today.getTime()));
        setLoaded(true);
      })
      .catch(error => {
        setErrorMessage(error.message);
        console.log(error);
      });
  }, [events]);

  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        let curr = {};
        for (let i = 0; i < response.data.length; ++i) {
          curr[response.data[i].id] = response.data[i];
        }
        setCandidates(curr);
      }).catch(error => console.log(error));
  }, [candidates]);

  return (
    <div className='upcoming-events-container'>
      <h2>
        Upcoming Events
      </h2>
      <CTable striped hover bordered>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell scope='col' colSpan='1'>Title</CTableHeaderCell>
            <CTableHeaderCell scope='col' colSpan='1'>Candidate</CTableHeaderCell>
            <CTableHeaderCell scope='col' colSpan='1'>Date</CTableHeaderCell>
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
              <CTableRow key={element.id}>
                <CTableDataCell>{element.description}</CTableDataCell>
                <CTableDataCell>
                  {candidates[element.candidateId]
                    ?
                    candidates[element.candidateId].firstName + ' ' + candidates[element.candidateId].lastName
                    :
                    ''
                  }
                </CTableDataCell>
                <CTableDataCell>{formatDateTime(element.dateTime)}</CTableDataCell>
              </CTableRow>
            ))
          }
          {!showingMore && events.length > 10 && // conditional rendering
            <CTableRow>
              <CTableDataCell colSpan='3'>
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


export default Home;
