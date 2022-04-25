import React, { useEffect, useState} from 'react';
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
      <div style={{ marginTop:'50px'}}>
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
    getApiClient().getAllVacancies()
      .then(response => {
        setLoaded(true);
        setEvents(response.data);
      })
      .catch(error => {
        setErrorMessage(error.message);
        console.log(error);
      });
  }, []);

  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        let curr = {};
        for (let i = 0; i < response.data.length; ++i) {
          curr[response.data[i].id] = response.data[i];
        }
        setCandidates(curr);
      }).catch(error => console.log(error));
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
            (showingMore ? events : events.slice(0, 3)).map(element => (
              <CTableRow key={element.id}>
                <CTableDataCell>{element.jobTitle}</CTableDataCell>
                <CTableDataCell>
                  {candidates[element.candidateId] ?
                    candidates[element.candidateId].firstName + ' ' + candidates[element.candidateId].lastName
                    :
                    ''
                  }
                </CTableDataCell>
                <CTableDataCell>
                  {candidates[element.candidateId] ?
                    candidates[element.candidateId].status : ''}
                </CTableDataCell>
              </CTableRow>
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


export default Home;
