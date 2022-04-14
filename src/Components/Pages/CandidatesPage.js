import React, {useEffect, useReducer} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPeople, cilSearch} from "@coreui/icons";
import CandidateRow from "../Tables/CandidateRow";
import Input from "../Utils/Input";
import '../../Styles/CandidateTable.css';

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

const reducer = (state, action) => {
  switch(action.type) {
    case 'set-candidates':
      return { ...state, filteredCandidates: action.candidates };
    case 'sort-by-name':
      return { ...state, filteredCandidates: sortByName(state.candidates) };
    case 'sort-by-date':
      return { ...state, filteredCandidates: sortByDate(state.candidates) };
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
          <CTable id="candidatesTable" align="middle" className="mb-0 candidatesTable" hover responsive>
            <CTableHead color="light">
              <CTableRow className="header-row">
                <CTableHeaderCell className="text-center icon-cell">
                    <CIcon icon={cilPeople}/>
                </CTableHeaderCell>
                <CTableHeaderCell className="header-cell">Candidates</CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">Email</CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">Phone Number</CTableHeaderCell>
                <CTableHeaderCell className="text-center header-cell">Date Applied</CTableHeaderCell>
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
              {state.filteredCandidates.map(candidate => <CandidateRow key={candidate.id} candidate={candidate} /> )}
            </CTableBody>
          </CTable>
        </div>
        : <Spinner />}
    </>
  )
}

export default CandidateCardWrapper;
