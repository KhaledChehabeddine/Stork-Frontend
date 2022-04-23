import React, {useEffect, useReducer} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPeople, cilSearch, cilArrowBottom, cilArrowTop} from "@coreui/icons";
import CandidateRow from "../Tables/CandidateRow";
import Input from "../Utils/Input";

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
})

const statusReducer = status => {
  switch (status.toLowerCase()) {
    case 'pending':
      return 1;
    case 'first interview scheduled':
      return 2;
    case 'second interview scheduled':
      return 3;
    case 'offer sent':
      return 4;
    case 'offer accepted':
      return 5;
    case 'offer rejected':
      return 6;
    default:
      return 100;
  }
};

const sortByStatus = candidates => candidates.sort((a,b) => {
  return statusReducer(a.status) - statusReducer(b.status);
});

const rSortByStatus = candidates => candidates.sort((a, b) => {
  return statusReducer(b.status) - statusReducer(a.status);
});

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
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false,
    candidates: [],
    filteredCandidates: [],
    nameSortReverse: false,
    emailSortReverse: false,
    phoneSortReverse: false,
    dateSortReverse: false,
    statusSortReverse: false
  });
  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        dispatch({ type: 'page-loaded', candidates: response.data, filteredCandidates: response.data });
      }).catch(error => {console.log(error)});
  }, []);

  return (
    <>
      <div className="page-background">
        <NavBar/>
        {state.pageLoaded === true
          ?
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center"}}>
            <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>
              <CTableHead style={{backgroundColor: "transparent"}}>
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center icon-cell">
                    <CIcon icon={cilPeople}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div style={{display:"flex",  alignItems:"center" }}>
                      <button onClick={event => {
                        dispatch({
                          type: 'sort-by-name',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Candidates
                      <button onClick={event => {
                        dispatch({
                          type: 'reverse-sort-by-name',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => {
                        dispatch({
                          type: 'sort-by-email',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Email
                      <button onClick={event => {
                        dispatch({
                          type: 'reverse-sort-by-email',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => {
                        dispatch({
                          type: 'sort-by-phone',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Phone Number
                      <button onClick={event => {
                        dispatch({
                          type: 'reverse-sort-by-phone',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => {
                        dispatch({
                          type: 'sort-by-date',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Date Applied
                      <button onClick={event => {
                        dispatch({
                          type: 'reverse-sort-by-date',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => {
                        dispatch({
                          type: 'sort-by-status',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Status
                      <button onClick={event => {
                        dispatch({
                          type: 'reverse-sort-by-status',
                          candidates: (filterCandidates(state.candidates, event.target))})
                      }} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center search-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      <CIcon className="search-icon" icon={cilSearch} />
                      <Input className="search-bar" type="text" id="searchInput" onKeyUp={event =>
                        dispatch({type: 'set-candidates', candidates: (filterCandidates(state.candidates, event.target))})
                      } placeholder="Search For Candidates.."/>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
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
