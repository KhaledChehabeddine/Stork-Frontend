import React, {useEffect, useReducer} from 'react';
import {
  CButton,
  CCardText,
  CFormInput, CInputGroup, CInputGroupText,
  CTable,
  CTableBody,
  CTableHead,
  CTableHeaderCell,
  CTableRow
} from '@coreui/react';
import NavBar from '../Utils/Navbar';
import VacancyRow from './VacancyRow';
import Spinner from '../Utils/Spinner';
import CIcon from '@coreui/icons-react';
import {cilArrowBottom, cilArrowTop, cilBriefcase, cilSearch} from '@coreui/icons';
import Input from '../Utils/Input';
import {useData} from '../../Context/Use';
import '../../Styles/VacancyTable.css';

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

const VacancyTable = () => {
  const { values: { jobPositions } } = useData();
  const [state, dispatch] = useReducer(reducer, {
    vacanciesLoaded: false,
    vacancies: [],
    filteredPositions: []
  });

  useEffect(() => {
    dispatch({ type: 'vacancies-loaded', vacancies: jobPositions, filteredPositions: jobPositions});
  }, [jobPositions]);

  return (
    <div>
      <NavBar/>
      {state.vacanciesLoaded ?
        <div className='full-table'>
          <CTable align='middle'
                  className='table'
                  hover
                  responsive>
            <CTableHead>
              <CTableRow className='table-head-row'>
                <CTableHeaderCell className='icon-cell'>
                  <div className='table-icon'>
                    <CIcon className='table-header-cell-2' icon={cilBriefcase}/>
                  </div>
                </CTableHeaderCell>

                <CTableHeaderCell className='table-header-column'>
                  <div className='header-container'
                       style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                    Job Title
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch(
                               {type: 'sort-by-title', vacancies: (filterPositions(state.vacancies, event.target))}
                             )}>
                      <CIcon icon={cilArrowTop}/>
                    </CButton>
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch({
                               type: 'reverse-sort-by-title',
                               vacancies: (filterPositions(state.vacancies, event.target))
                             })}>
                      <CIcon icon={cilArrowBottom}/>
                    </CButton>
                  </div>
                </CTableHeaderCell>

                <CTableHeaderCell className='table-header-column'>
                  <div className='header-container'
                       style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                    Country
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch(
                               {type: 'sort-by-country', vacancies: (filterPositions(state.vacancies, event.target))}
                             )}>
                      <CIcon icon={cilArrowTop}/>
                    </CButton>
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch({
                               type: 'reverse-sort-by-country',
                               vacancies: (filterPositions(state.vacancies, event.target))
                             })}>
                      <CIcon icon={cilArrowBottom}/>
                    </CButton>
                  </div>
                </CTableHeaderCell>

                <CTableHeaderCell className='table-header-column'>
                  <div className='header-container'
                       style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                    City
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch(
                               {type: 'sort-by-city', vacancies: (filterPositions(state.vacancies, event.target))}
                             )}>
                      <CIcon icon={cilArrowTop}/>
                    </CButton>
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch({
                               type: 'reverse-sort-by-city',
                               vacancies: (filterPositions(state.vacancies, event.target))
                             })}>
                      <CIcon icon={cilArrowBottom}/>
                    </CButton>
                  </div>
                </CTableHeaderCell>

                <CTableHeaderCell className='table-header-column'>
                  <div className='header-container'
                       style={{display:'flex',  alignItems:'center', justifyContent: 'center'}}>
                    Date Posted
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch(
                               {type: 'sort-by-date', vacancies: (filterPositions(state.vacancies, event.target))}
                             )}>
                      <CIcon icon={cilArrowTop}/>
                    </CButton>
                    <CButton className='table-button'
                             variant='outline'
                             onClick={event => dispatch({
                               type: 'reverse-sort-by-date',
                               vacancies: (filterPositions(state.vacancies, event.target))
                             })}>
                      <CIcon icon={cilArrowBottom}/>
                    </CButton>
                  </div>
                </CTableHeaderCell>

                <CTableHeaderCell className='search-cell'>
                  <div style={{display:'flex',  alignItems:'center', paddingTop: '1rem', paddingBlock: '1rem'}}>
                    <CInputGroup className='align-items-center'>
                      <CInputGroupText className='table-group-text'>
                        <CIcon icon={cilSearch}/>
                      </CInputGroupText>
                      <CFormInput className='table-group-input'
                                  placeholder='Search...'
                                  type='text'
                                  onKeyUp={event => dispatch({
                                    type: 'set-positions',
                                    vacancies: (filterPositions(state.vacancies, event.target))}
                                  )}/>
                    </CInputGroup>
                  </div>
                </CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody className='table-body'>
              {state.filteredPositions.map(vacancy =>
                <VacancyRow key={vacancy.id} vacancy={vacancy} vacancies={state.filteredPositions}/>
              )}
            </CTableBody>
          </CTable>
        </div>
        : <Spinner/>}
    </div>
  );
};

export default VacancyTable;
