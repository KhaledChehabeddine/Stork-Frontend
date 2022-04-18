import React, {useEffect, useReducer} from 'react';
import getApiClient from "../../api_client/getApiClient";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import VacancyRow from "../Tables/VacancyRow";
import Spinner from "../Utils/Spinner";
import CIcon from "@coreui/icons-react";
import {cilBriefcase, cilSearch, cilSwapVertical} from "@coreui/icons";
import Input from "../Utils/Input";

const filterPositions = (vacancies, input) => {
  let filter, value, i, title, filteredPositions = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < vacancies.length; i++) {
    title = vacancies[i].jobTitle + ' ' + vacancies[i].country + ' ' + vacancies[i].city;
    value = title || title.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredPositions.push(vacancies[i]);
    }
  }
  return filteredPositions;
}

const sortByTitle = vacancies => vacancies.sort((a, b) => {
  return a.jobTitle.localeCompare(b.jobTitle);
})

const sortByCountry = vacancies => vacancies.sort((a, b) => {
  return a.country.localeCompare(b.country);
})

const sortByCity = vacancies => vacancies.sort((a, b) => {
  return a.city.localeCompare(b.city);
})

const reducer = (state, action) => {
  switch(action.type) {
    case 'vacancies-loaded':
      return { ...state, vacanciesLoaded: true, vacancies: action.vacancies, filteredPositions: action.filteredPositions }
    case 'set-positions':
      return { ...state, filteredPositions: action.vacancies };
    case 'sort-by-title':
      return { ...state, filteredPositions: sortByTitle(state.vacancies) };
    case 'sort-by-country':
      return { ...state, filteredPositions: sortByCountry(state.vacancies) };
    case 'sort-by-city':
      return { ...state, filteredPositions: sortByCity(state.vacancies) };
    default:
      return { ...state }
  }
}

const VacanciesPage = (props) => {
  const [state, dispatch] = useReducer(reducer, {
    vacanciesLoaded: false,
    vacancies: [],
    filteredPositions: []
  });
  useEffect(() => {
    getApiClient().getAllVacancies()
      .then(response => {
        dispatch({ type: 'vacancies-loaded', vacancies: response.data, filteredPositions: response.data });
      }).catch(error => console.log(error));
  }, []);
  return (
    <>
      <NavBar />
      {state.vacanciesLoaded
        ?
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <CTable align="middle" className="mb-0" hover responsive>
              <CTableHead color="light">
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center header-cell">
                    <CIcon icon={cilBriefcase}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      Job Title
                      <button onClick={event => dispatch({type: 'sort-by-title', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button">
                        <CIcon className="sort-icon" icon={cilSwapVertical}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      Country
                      <button onClick={event => dispatch({type: 'sort-by-country', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button">
                        <CIcon className="sort-icon" icon={cilSwapVertical}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      City
                      <button onClick={event => dispatch({type: 'sort-by-city', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button">
                        <CIcon className="sort-icon" icon={cilSwapVertical}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div style={{display:"flex",  alignItems:"center", float:"right"}}>
                      <CIcon className="search-icon" icon={cilSearch} />
                      <Input className="search-bar" type="text" id="searchInput" onKeyUp={event =>
                        dispatch({type: 'set-positions', vacancies: (filterPositions(state.vacancies, event.target))})
                      } placeholder="Search For Positions"/>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
                {state.filteredPositions.map(vacancy => <VacancyRow key={vacancy.id} vacancy={vacancy} vacancies={state.filteredPositions}/>)}
              </CTableBody>
            </CTable>
          </div>
        : <Spinner />}
    </>
  );
};

export default VacanciesPage;
