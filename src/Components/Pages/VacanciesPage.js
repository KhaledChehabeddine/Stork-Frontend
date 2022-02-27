import React, {useState, useEffect, useReducer} from 'react';
import getApiClient from "../../api_client/getApiClient";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import {tableStyle} from "../Utils/Styles";
import Header from "../Utils/Header";
import VacancyRow from "../Tables/VacancyRow";
import Spinner from "../Utils/Spinner";
import {Breadcrumb} from "react-bootstrap";

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
    <div>
      <NavBar />
      {state.vacanciesLoaded
        ?
          <>
            <Breadcrumb className="form-breadcrumb">
              <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
              <Breadcrumb.Item active>Vacancies</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="form-header" style={{ padding: '1%' }}>Vacancies</h1>
            <CTable style={tableStyle}>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col">#</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Job Title</CTableHeaderCell>
                  <CTableHeaderCell scope="col">Country</CTableHeaderCell>
                  <CTableHeaderCell scope="col">City</CTableHeaderCell>
                  <CTableHeaderCell scope="col">View</CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {vacancies.map(vacancy =>
                  <VacancyRow vacancy={vacancy} />)}
              </CTableBody>
            </CTable>
          </>
        : <Spinner />}

    </div>
  );
};

export default VacanciesPage;
