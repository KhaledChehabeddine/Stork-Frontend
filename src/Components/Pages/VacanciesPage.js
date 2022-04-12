import React, {useState, useEffect, useReducer} from 'react';
import getApiClient from "../../api_client/getApiClient";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import VacancyRow from "../Tables/VacancyRow";
import Spinner from "../Utils/Spinner";
import {Breadcrumb} from "react-bootstrap";
import CIcon from "@coreui/icons-react";
import {cilBuilding} from "@coreui/icons";
import '../../Styles/Breadcrumbs.css'

const reducer = (state, action) => {
  switch(action.type) {
    case 'vacancies-loaded':
      return { ...state, vacanciesLoaded: true }
    default:
      return { ...state }
  }
}

const VacanciesPage = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    vacanciesLoaded: false
  });
  const [vacancies, setVacancies] = useState([]);
  useEffect(() => {
    getApiClient().getAllVacancies()
      .then(response => {
        setVacancies(response.data);
        dispatch({ type: 'vacancies-loaded' });
      }).catch(error => console.log(error));
  }, []);
  return (
    <>
      <NavBar />
      {state.vacanciesLoaded
        ?
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <Breadcrumb className="breadcrumb">
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item href="/vacancies">Vacancies</Breadcrumb.Item>
              <Breadcrumb.Item active="/vacancies/all">View Vacancies</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="page-header" style={{padding:"1rem"}}>Vacancies</h1>
            <CTable align="middle" className="mb-0 border" hover responsive>
              <CTableHead color="light">
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center">
                    <CIcon icon={cilBuilding}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col"> </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
                {vacancies.map(vacancy =>
                  <VacancyRow key={vacancy.id} vacancy={vacancy} id={vacancy.id} />)}
              </CTableBody>
            </CTable>
          </div>
        : <Spinner />}
    </>
  );
};

export default VacanciesPage;
