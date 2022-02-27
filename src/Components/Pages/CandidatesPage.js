import React, {useEffect, useReducer, useState} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {Breadcrumb} from "react-bootstrap";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPeople} from "@coreui/icons";
import CandidateRow from "../Tables/CandidateRow";
import Input from "../Utils/Input";

const filterCandidates = (candidates, input) => {
  let filter, value, i, name, filteredCandidates = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < candidates.length; i++) {
    name = candidates[i].firstName+' '+candidates[i].lastName;
    value = name || name.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredCandidates.push(candidates[i]);
    }
  }
  return filteredCandidates;
}

const sortingState = 1;

const sortByDate = candidates => candidates.sort(function(a,b){
  return new Date(b.date) - new Date(a.date);
});

const sortByName = candidates => candidates.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
})

const reducer = (state, action) => {
  switch(action.type) {
    case 'page-loaded':
      return { pageLoaded: true };
    default:
      return { ...state };
  }
}

const CandidateCardWrapper = () => {
  const [state, dispatch] = useReducer(reducer, {
    pageLoaded: false
  });
  const [candidates, setCandidates] = useState([]);
  const [filteredCandidates, setFilteredCandidates] = useState([]);
  useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        setCandidates(response.data);
        setFilteredCandidates(response.data);
        dispatch({ type: 'page-loaded' });
      }).catch(error => {console.log(error)});
  }, []);



  return (
    <>
      <NavBar/>
      {state.pageLoaded === true
        ? <div style={{ display: 'flex', flexDirection: 'column'}}>
          <Breadcrumb className="form-breadcrumb">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item href="/candidates/all">Candidates</Breadcrumb.Item>
            <Breadcrumb.Item active>View Candidates</Breadcrumb.Item>
          </Breadcrumb>
          <h1 className="form-header" style={{ padding: '1rem' }}>Candidates</h1>
          <Input type="text" id="searchInput" onKeyUp={event => setFilteredCandidates(filterCandidates(candidates, event.target))} placeholder="Search For Candidates.."/>
          <CTable id="candidatesTable" align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>Candidate</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Date Applied</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Action</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortingState === 1 && sortByDate(filteredCandidates).map(candidate => <CandidateRow key={candidate.id} candidate={candidate} />)}
              {sortingState === 2 && sortByName(filteredCandidates).map(candidate => <CandidateRow key={candidate.id} candidate={candidate} />)}
            </CTableBody>
          </CTable>
          </div>
        : <Spinner />}
    </>
  )
}

export default CandidateCardWrapper;
