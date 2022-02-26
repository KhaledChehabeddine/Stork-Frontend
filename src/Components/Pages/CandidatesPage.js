import React, {useEffect, useReducer, useState} from "react";
import getApiClient from "../../api_client/getApiClient";
import NavBar from "../Utils/Navbar";
import Spinner from '../Utils/Spinner';
import {Breadcrumb} from "react-bootstrap";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {cilPeople} from "@coreui/icons";
import CandidateRow from "../Tables/CandidateRow";

const sortingState = 2;

const sortByName = candidates => candidates.sort((a, b) => a.lastName.localeCompare(b.lastName)).sort((a,b) => a.firstName.localeCompare(b.firstName))
const sortByDate = candidates => candidates.sort((a, b) => a.date.localeCompare(b.date))


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
  // eslint-disable-next-line
  const getAllCandidates = useEffect(() => {
    getApiClient().getAllCandidates()
      .then(response => {
        setCandidates(response.data);
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

          <CTable align="middle" className="mb-0 border" hover responsive>
            <CTableHead color="light">
              <CTableRow>
                <CTableHeaderCell className="text-center">
                  <CIcon icon={cilPeople} />
                </CTableHeaderCell>
                <CTableHeaderCell>User</CTableHeaderCell>
                <CTableHeaderCell className="text-center">Email</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {sortingState === 1 && sortByDate(candidates).map(candidate => <CandidateRow key={candidate.id} candidate={candidate} />)}
              {sortingState === 2 && sortByName(candidates).map(candidate => <CandidateRow key={candidate.id} candidate={candidate} />)}
            </CTableBody>
          </CTable>
        </div>
        : <Spinner />}
    </>
  )
}

export default CandidateCardWrapper;
