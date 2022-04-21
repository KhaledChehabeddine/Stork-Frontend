import React, {useEffect, useReducer} from 'react';
import getApiClient from "../../api_client/getApiClient";
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import VacancyRow from "../Tables/VacancyRow";
import Spinner from "../Utils/Spinner";
import CIcon from "@coreui/icons-react";
import {cilArrowBottom, cilArrowTop, cilBriefcase, cilSearch} from "@coreui/icons";
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

const sortByDate = vacancies => vacancies.sort((a, b) => {
  return a.id - b.id;
})

const rSortByTitle = vacancies => vacancies.sort((a, b) => {
  return b.jobTitle.localeCompare(a.jobTitle);
})

const rSortByCountry = vacancies => vacancies.sort((a, b) => {
  return b.country.localeCompare(a.country);
})

const rSortByCity = vacancies => vacancies.sort((a, b) => {
  return b.city.localeCompare(a.city);
})

const rSortByDate = vacancies => vacancies.sort((a, b) => {
  return b.id - a.id;
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
    case 'sort-by-date':
      return { ...state, filteredPositions: sortByDate(state.vacancies) };
    case 'reverse-sort-by-title':
      return { ...state, filteredPositions: rSortByTitle(state.vacancies) };
    case 'reverse-sort-by-country':
      return { ...state, filteredPositions: rSortByCountry(state.vacancies) };
    case 'reverse-sort-by-city':
      return { ...state, filteredPositions: rSortByCity(state.vacancies) };
    case 'reverse-sort-by-date':
      return { ...state, filteredPositions: rSortByDate(state.vacancies) };
    default:
      return { ...state }
  }
}

const VacanciesPage = () => {
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
            <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>
              <CTableHead color="light">
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center icon-cell">
                    <CIcon icon={cilBriefcase}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div className="header-cell-content">
                      <button onClick={event => dispatch({type: 'sort-by-title', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Job Title
                      <button onClick={event => dispatch({type: 'reverse-sort-by-title', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-country', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Country
                      <button onClick={event => dispatch({type: 'reverse-sort-by-country', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-city', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      City
                      <button onClick={event => dispatch({type: 'reverse-sort-by-city', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-date', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Date Posted
                      <button onClick={event => dispatch({type: 'reverse-sort-by-date', vacancies: (filterPositions(state.vacancies, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
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
