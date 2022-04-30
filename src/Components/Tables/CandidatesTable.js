import React, {useEffect, useReducer} from 'react';
import NavBar from '../Utils/Navbar';
import Spinner from '../Utils/Spinner';
import {
  CButton,
  CFormInput, CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {cilPeople, cilSearch, cilArrowBottom, cilArrowTop} from '@coreui/icons';
import CandidateRow from './CandidateRow';
import Input from '../Utils/Input';
import {useData} from '../../Context/Use';
import '../../Styles/VacancyTable.css';

const filterCandidates = (candidates, input) => {
  let filter, value, i, name, filteredCandidates = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < candidates.length; i++) {
    name = candidates[i].firstName+' '+candidates[i].lastName+' '+candidates[i].email+' '+candidates[i].phone
      +' '+candidates[i].date+' '+candidates[i].status;
    value = name || name.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredCandidates.push(candidates[i]);
    }
  }
  return filteredCandidates;
};

const sortByDate = candidates => candidates.sort((a, b) => {
  return a.id - b.id;
});

const rSortByDate = candidates => candidates.sort((a, b) => {
  return b.id - a.id;
});

const sortByName = candidates => candidates.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
});

const rSortByName = candidates => candidates.sort((a, b) => {
  const result = b.firstName.localeCompare(a.firstName);
  return result !== 0 ? result : b.lastName.localeCompare(a.lastName);
})

const sortByEmail = candidates => candidates.sort((a,b) => {
  return a.email.localeCompare(b.email);
});

const rSortByEmail = candidates => candidates.sort((a, b) => {
  return b.email.localeCompare(a.email);
})

const sortByPhone = candidates => candidates.sort((a,b) => {
  let phoneA, phoneB;
  phoneA = parseInt((a.phone).substring(1, a.phone.length));
  phoneB = parseInt((b.phone).substring(1, b.phone.length));
  return phoneA - phoneB;
});

const rSortByPhone = candidates => candidates.sort((a, b) => {
  let phoneA, phoneB;
  phoneA = parseInt((a.phone).substring(1, a.phone.length));
  phoneB = parseInt((b.phone).substring(1, b.phone.length));
  return phoneB - phoneA;
});

const sortByStatus = candidates => candidates.sort((a,b) => {
  return statusReducer(a.status) - statusReducer(b.status);
});

const rSortByStatus = candidates => candidates.sort((a, b) => {
  return statusReducer(b.status) - statusReducer(a.status);
});

const statusReducer = status => {
  let state = status.toLowerCase();
  if (state.includes('pending')) return 1;
  else if (state.includes('interview')) return 2;
  else if (state.includes('offer')) return 3;
  else if (state.includes('accepted')) return 4;
  else if (state.includes('rejected')) return 5;
  else return 100;
};

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-candidates':
      return { ...state, filteredCandidates: action.candidates };
    case 'sort-by-name':
      return { ...state, filteredCandidates: sortByName(state.candidates) };
    case 'reverse-sort-by-name':
      return { ...state, filterCandidates: rSortByName(state.candidates) };
    case 'sort-by-email':
      return { ...state, filteredCandidates: sortByEmail(state.candidates) };
    case 'reverse-sort-by-email':
      return { ...state, filteredCandidates: rSortByEmail(state.candidates) };
    case 'sort-by-phone':
      return { ...state, filteredCandidates: sortByPhone(state.candidates) };
    case 'reverse-sort-by-phone':
      return { ...state, filteredCandidates: rSortByPhone(state.candidates) };
    case 'sort-by-date':
      return { ...state, filteredCandidates: sortByDate(state.candidates) };
    case 'reverse-sort-by-date':
      return { ...state, filteredCandidates: rSortByDate(state.candidates) };
    case 'sort-by-status':
      return { ...state, filteredCandidates: sortByStatus(action.candidates) };
    case 'reverse-sort-by-status':
      return { ...state, filteredCandidates: rSortByStatus(action.candidates) };
    case 'page-loaded':
      return { ...state, pageLoaded: true, candidates: action.candidates, filteredCandidates: action.filteredCandidates };
    default:
      return { ...state };
  }
}

const CandidateCardWrapper = () => {
  const { values: { candidates } } = useData();
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false,
    filteredCandidates: [],
    nameSortReverse: false,
    emailSortReverse: false,
    phoneSortReverse: false,
    dateSortReverse: false,
    statusSortReverse: false
  });
  useEffect(() => {
    if (candidates)
      dispatch({ type: 'page-loaded', candidates: candidates, filteredCandidates: candidates });
  }, [candidates]);

  return (
    <>
      <div>
        <NavBar/>
        {state.pageLoaded === true ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
            <CTable style={{width: '100%'}} align='middle' className='mb-0 table' hover responsive>
              <CTableHead style={{backgroundColor: 'transparent'}}>
                <CTableRow className='header-row'>
                  <CTableHeaderCell className='text-center icon-cell'>
                    <CIcon className='header-container' icon={cilPeople}/>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='header-cell'>
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Candidates
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                   type: 'sort-by-name',
                                   candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-name',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='text-center header-cell'>
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Email
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-email',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-email',
                                 candidates: (filterCandidates(state.candidates, event.target))})
                               }>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='text-center header-cell'>
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Phone Number
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-phone',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-phone',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='text-center header-cell'>
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Date Applied
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-date',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-date',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='text-center header-cell'>
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Status
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-status',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-status',
                                 candidates: (filterCandidates(state.candidates, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className='text-center search-cell'>
                    <div style={{display:'flex',  alignItems:'center', paddingTop: '1rem', paddingBlock: '1rem'}}>
                      <CInputGroup className='align-items-center'>
                        <CInputGroupText className='table-group-text'>
                          <CIcon icon={cilSearch}/>
                        </CInputGroupText>
                        <CFormInput className='table-group-input'
                                    placeholder='Search...'
                                    type='text'
                                    onKeyUp={event => dispatch({
                                      type: 'set-candidates',
                                      candidates: (filterCandidates(state.candidates, event.target))}
                                    )}/>
                      </CInputGroup>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className='table-body'>
                {state.filteredCandidates.map(candidate => <CandidateRow key={candidate.id} candidate={candidate} candidates={state.filteredCandidates} />)}
              </CTableBody>
            </CTable>
          </div>
          : <Spinner />}
      </div>
    </>
  )
}

export default CandidateCardWrapper;
