import React, {useEffect, useReducer} from 'react';
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import Spinner from "../Utils/Spinner";
import CIcon from "@coreui/icons-react";
import {cilArrowBottom, cilArrowTop, cilChatBubble, cilSearch} from "@coreui/icons";
import Input from "../Utils/Input";
import {useData} from "../../Context/Use";
import InterviewRow from "./InterviewRow";

const filterInterviews = (interviews, input) => {
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
    dispatch({ type: 'managers-loaded', interviews: interviews, filteredInterviews: interviews});
  }, [interviews]);
  return (
    <>
      <div>
        <NavBar />
        {state.managersLoaded
          ?
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>
              <CTableHead style={{backgroundColor: "transparent"}}>
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center icon-cell">
                    <CIcon className="header-container" icon={cilChatBubble}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-date', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Interview Date
                      <button onClick={event => dispatch({type: 'reverse-sort-by-date', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-candidate-name', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Candidate Name
                      <button onClick={event => dispatch({type: 'reverse-sort-by-candidate-name', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-manager-name', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Manager Name
                      <button onClick={event => dispatch({type: 'reverse-sort-by-manager-name', interviews: (filterInterviews(state.interviews, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center search-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      <CIcon className="search-icon" icon={cilSearch} />
                      <Input className="search-bar" type="text" id="searchInput" onKeyUp={event =>
                        dispatch({type: 'set-interviews', interviews: (filterInterviews(state.interviews, event.target))})
                      } placeholder="Search For Interviews.."/>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
                {state.filteredInterviews.map(interview => <InterviewRow key={interview.id} manager={interview} managers={state.filteredInterviews}/>)}
              </CTableBody>
            </CTable>
          </div>
          : <Spinner />}
      </div>
    </>
  );
};

export default InterviewTable;
