import React, {useEffect, useReducer} from 'react';
import {
  CButton, CFormInput,
  CInputGroup,
  CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import Spinner from "../Utils/Spinner";
import CIcon from "@coreui/icons-react";
import {cilArrowBottom, cilArrowTop, cilChatBubble, cilSearch} from "@coreui/icons";
import Input from "../Utils/Input";
import {useData} from "../../Context/Use";
import InterviewRow from "./InterviewRow";

const filterInterviews = (interviews, input) => {
  if (!input) return;
  if (!input.value) return;
  let filter, value, i, title, filteredInterviews = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < interviews.length; i++) {
    title = interviews[i].dateTime
    value = title || title.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredInterviews.push(interviews[i]);
    }
  }
  return filteredInterviews;
}

const sortByCandidateName = managers => managers.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
})

const sortByManagerName = managers => managers.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
})

const sortByDate = managers => managers.sort((a, b) => {
  return a.dateTime.localeCompare(b.dateTime);
})

const rSortByCandidateName = managers => managers.sort((a, b) => {
  const result = b.firstName.localeCompare(a.firstName);
  return result !== 0 ? result : b.lastName.localeCompare(a.lastName);
})

const rSortByManagerName = managers => managers.sort((a, b) => {
  const result = b.firstName.localeCompare(a.firstName);
  return result !== 0 ? result : b.lastName.localeCompare(a.lastName);
})

const rSortByDate = interviews => interviews.sort((a, b) => {
  return b.dateTime.localeCompare(a.dateTime);
})

const reducer = (state, action) => {
  switch(action.type) {
    case 'interviews-loaded':
      return { ...state, interviewsLoaded: true, interviews: action.interviews, filteredInterviews: action.filteredInterviews }
    case 'set-interviews':
      return { ...state, filteredInterviews: action.interviews };
    case 'sort-by-candidate-name':
      return { ...state, filteredInterviews: sortByCandidateName(state.interviews) };
    case 'sort-by-manager-name':
      return { ...state, filteredInterviews: sortByManagerName(state.interviews) };
    case 'sort-by-date':
      return { ...state, filteredInterviews: sortByDate(state.interviews) };
    case 'reverse-sort-by-candidate-name':
      return { ...state, filteredInterviews: rSortByCandidateName(state.interviews) };
    case 'reverse-sort-by-manager-name':
      return { ...state, filteredInterviews: rSortByManagerName(state.interviews) };
    case 'reverse-sort-by-date':
      return { ...state, filteredInterviews: rSortByDate(state.interviews) };
    default:
      return { ...state }
  }
}

const InterviewTable = () => {
  const { values: { interviews } } = useData();
  const [state, dispatch] = useReducer(reducer, {
    interviewsLoaded: false,
    interviews: [],
    filteredInterviews: []
  });
  useEffect(() => {
    dispatch({ type: 'interviews-loaded', interviews: interviews, filteredInterviews: interviews});
  }, [interviews]);
  return (
    <>
      <div>
        <NavBar />
        {state.interviewsLoaded
          ?
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>
              <CTableHead style={{backgroundColor: "transparent"}}>
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center icon-cell">
                    <CIcon className="header-container" icon={cilChatBubble}/>
                  </CTableHeaderCell>

                  <CTableHeaderCell className="header-cell">
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Interview Date
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-date',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-date',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className="text-center header-cell">
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Candidate Name
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-candidate-name',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-candidate-name',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className="text-center header-cell">
                    <div className='header-container'
                         style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                      Manager Name
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'sort-by-manager-name',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowTop}/>
                      </CButton>
                      <CButton className='table-button'
                               variant='outline'
                               onClick={event => dispatch({
                                 type: 'reverse-sort-by-manager-name',
                                 interviews: (filterInterviews(state.interviews, event.target))}
                               )}>
                        <CIcon icon={cilArrowBottom}/>
                      </CButton>
                    </div>
                  </CTableHeaderCell>

                  <CTableHeaderCell className="text-center search-cell">
                    <div style={{display:'flex',  alignItems:'center', paddingTop: '1rem', paddingBlock: '1rem'}}>
                      <CInputGroup className='align-items-center'>
                        <CInputGroupText className='table-group-text'>
                          <CIcon icon={cilSearch}/>
                        </CInputGroupText>
                        <CFormInput className='table-group-input'
                                    placeholder='Search...'
                                    type='text'
                                    onKeyUp={event => dispatch({
                                      type: 'set-interviews',
                                      interviews: (filterInterviews(state.interviews, event.target))}
                                    )}/>
                      </CInputGroup>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
                {state.filteredInterviews.map(interview =>
                  <InterviewRow key={interview.id} interview={interview} interviews={state.filteredInterviews}/>)}
              </CTableBody>
            </CTable>
          </div>
          : <Spinner />}
      </div>
    </>
  );
};

export default InterviewTable;
