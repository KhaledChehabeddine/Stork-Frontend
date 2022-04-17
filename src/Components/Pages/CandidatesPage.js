import React, {useEffect, useReducer} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPeople, cilSearch, cilSwapVertical} from "@coreui/icons";
import CandidateRow from "../Tables/CandidateRow";
import Input from "../Utils/Input";

const filterCandidates = (candidates, input) => {
  let filter, value, i, name, filteredCandidates = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < candidates.length; i++) {
    name = candidates[i].firstName+' '+candidates[i].lastName+' '+candidates[i].email+' '+candidates[i].phone;
    value = name || name.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredCandidates.push(candidates[i]);
    }
  }
  return filteredCandidates;
}

const sortByDate = candidates => candidates.sort(function(a,b){
  return new Date(b.date) - new Date(a.date);
});

const sortByName = candidates => candidates.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
})

const sortByEmail = candidates => candidates.sort((a,b) => {
  return a.email.localeCompare(b.email);
})

const sortByPhone = candidates => candidates.sort((a,b) => {
  // FIX THIS
  let phoneA, phoneB;
  phoneA = parseInt((a.phone).substring(1, a.phone.length));
  phoneB = parseInt((b.phone).substring(1, b.phone.length));
  return phoneA - phoneB;
})

const sortByStatus = candidates => candidates.sort((a,b) => {
  // FILL HERE
  return 1;
})

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-candidates':
      return { ...state, filteredCandidates: action.candidates };
    case 'sort-by-name':
      return { ...state, filteredCandidates: sortByName(state.candidates) };
    case 'sort-by-email':
      return { ...state, filteredCandidates: sortByEmail(state.candidates) };
    case 'sort-by-phone':
      return { ...state, filteredCandidates: sortByPhone(state.candidates) };
    case 'sort-by-date':
      return { ...state, filteredCandidates: sortByDate(state.candidates) };
    case 'sort-by-status':
      return { ...state, filteredCandidates: sortByStatus(state.candidates) };
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
    filteredCandidates: []
  });
  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        dispatch({ type: 'page-loaded', candidates: response.data, filteredCandidates: response.data });
      }).catch(error => {console.log(error)});
  }, []);

  return (
    <>
      <NavBar/>
      {state.pageLoaded === true
        ?
        <div style={{ display: 'flex', flexDirection: 'column'}}>
          <CTable id="candidatesTable" align="middle" className="mb-0" hover responsive>
            <CTableHead color="light">
              <CTableRow className="header-row">
                <CTableHeaderCell className="text-center icon-cell">
                    <CIcon icon={cilPeople}/>
                </CTableHeaderCell>
                <CTableHeaderCell className="header-cell">
                  <div style={{display:"flex",  alignItems:"center"}}>
                    Candidates
                    <button onClick={event => dispatch({type: 'sort-by-name', candidates: (filterCandidates(state.candidates, event.target))})} className="sort-button">
                        <CIcon className="sort-icon" icon={cilSwapVertical}/>
                    </button>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">
                  <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                    Email
                    <button onClick={event => dispatch({type: 'sort-by-email', candidates: (filterCandidates(state.candidates, event.target))})} className="sort-button">
                      <CIcon className="sort-icon" icon={cilSwapVertical}/>
                    </button>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">
                  <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                    Phone Number
                    <button onClick={event => dispatch({type: 'sort-by-phone', candidates: (filterCandidates(state.candidates, event.target))})} className="sort-button">
                      <CIcon className="sort-icon" icon={cilSwapVertical}/>
                    </button>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">
                  <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                    Date Applied
                    <button onClick={event => dispatch({type: 'sort-by-date', candidates: (filterCandidates(state.candidates, event.target))})} className="sort-button">
                      <CIcon className="sort-icon" icon={cilSwapVertical}/>
                    </button>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">
                  <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                    Status
                    <button onClick={event => dispatch({type: 'sort-by-status', candidates: (filterCandidates(state.candidates, event.target))})} className="sort-button">
                      <CIcon className="sort-icon" icon={cilSwapVertical}/>
                    </button>
                  </div>
                </CTableHeaderCell>
                <CTableHeaderCell className="text-center">
                  <div style={{display:"flex",  alignItems:"center", float:"right"}}>
                    <CIcon className="search-icon" icon={cilSearch} />
                    <Input className="search-bar" type="text" id="searchInput" onKeyUp={event =>
                      dispatch({type: 'set-candidates', candidates: (filterCandidates(state.candidates, event.target))})
                    } placeholder="Search For Candidates"/>
                  </div>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className="table-body">
              {state.filteredCandidates.map(candidate => <CandidateRow key={candidate.id} candidate={candidate} candidates={state.filteredCandidates} /> )}
            </CTableBody>
          </CTable>
        </div>
        : <Spinner />}
    </>
  )
}

export default CandidateCardWrapper;
