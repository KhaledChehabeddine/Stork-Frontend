import React, {useEffect, useReducer} from 'react';
import {CTable, CTableBody, CTableHead, CTableHeaderCell, CTableRow} from "@coreui/react";
import NavBar from "../Utils/Navbar";
import Spinner from "../Utils/Spinner";
import CIcon from "@coreui/icons-react";
import {cilArrowBottom, cilArrowTop, cilSearch} from "@coreui/icons";
import Input from "../Utils/Input";
import {useData} from "../../Context/Use";
import {cilIdBadge} from "@coreui/icons-pro";
import ManagerRow from "./ManagerRow";

const filterManagers = (managers, input) => {
  let filter, value, i, title, filteredManagers = [];
  filter = input.value.toUpperCase();
  for (i = 0; i < managers.length; i++) {
    title = managers[i].firstName + ' ' + managers[i].lastName+ ' ' + managers[i].email + ' ' + managers[i].phone;
    value = title || title.innerText;
    if (value.toUpperCase().indexOf(filter) > -1) {
      filteredManagers.push(managers[i]);
    }
  }
  return filteredManagers;
}

const sortByName = managers => managers.sort((a, b) => {
  const result = a.firstName.localeCompare(b.firstName);
  return result !== 0 ? result : a.lastName.localeCompare(b.lastName);
})

const sortByEmail = managers => managers.sort((a, b) => {
  return a.email.localeCompare(b.email);
})

const sortByPhone = managers => managers.sort((a, b) => {
  let phoneA, phoneB;
  phoneA = parseInt((a.phone).substring(1, a.phone.length));
  phoneB = parseInt((b.phone).substring(1, b.phone.length));
  return phoneA - phoneB;
})

const rSortByName = managers => managers.sort((a, b) => {
  const result = b.firstName.localeCompare(a.firstName);
  return result !== 0 ? result : b.lastName.localeCompare(a.lastName);
})

const rSortByEmail = managers => managers.sort((a, b) => {
  return b.email.localeCompare(a.email);
})

const rSortByPhone = managers => managers.sort((a, b) => {
  let phoneA, phoneB;
  phoneA = parseInt((a.phone).substring(1, a.phone.length));
  phoneB = parseInt((b.phone).substring(1, b.phone.length));
  return phoneB - phoneA;
})

const reducer = (state, action) => {
  switch(action.type) {
    case 'managers-loaded':
      return { ...state, managersLoaded: true, managers: action.managers, filteredManagers: action.filteredManagers }
    case 'set-managers':
      return { ...state, filteredManagers: action.managers };
    case 'sort-by-name':
      return { ...state, filteredManagers: sortByName(state.managers) };
    case 'sort-by-email':
      return { ...state, filteredManagers: sortByEmail(state.managers) };
    case 'sort-by-phone':
      return { ...state, filteredManagers: sortByPhone(state.managers) };
    case 'reverse-sort-by-name':
      return { ...state, filteredManagers: rSortByName(state.managers) };
    case 'reverse-sort-by-email':
      return { ...state, filteredManagers: rSortByEmail(state.managers) };
    case 'reverse-sort-by-phone':
      return { ...state, filteredManagers: rSortByPhone(state.managers) };
    default:
      return { ...state }
  }
}

const ManagerTable = () => {
  const { values: { managers } } = useData();
  const [state, dispatch] = useReducer(reducer, {
    managersLoaded: false,
    managers: [],
    filteredManagers: []
  });
  useEffect(() => {
    dispatch({ type: 'managers-loaded', managers: managers, filteredManagers: managers});
  }, [managers]);
  return (
    <>
      <div>
        <NavBar />
        {state.managersLoaded
          ?
          <div style={{ display: 'flex', flexDirection: 'column'}}>
            <CTable style={{width: "100%"}} align="middle" className="mb-0 table" hover responsive>
              <CTableHead style={{backgroundColor: "transparent"}}>
                <CTableRow className="header-row">
                  <CTableHeaderCell className="text-center icon-cell">
                    <CIcon className="header-container" icon={cilIdBadge}/>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-name', managers: (filterManagers(state.managers, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Manager Name
                      <button onClick={event => dispatch({type: 'reverse-sort-by-name', managers: (filterManagers(state.managers, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-email', managers: (filterManagers(state.managers, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Email
                      <button onClick={event => dispatch({type: 'reverse-sort-by-email', managers: (filterManagers(state.managers, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      <button onClick={event => dispatch({type: 'sort-by-phone', managers: (filterManagers(state.managers, event.target))})} className="sort-button-top">
                        <CIcon className="sort-icon" icon={cilArrowTop}/>
                      </button>
                      Phone Number
                      <button onClick={event => dispatch({type: 'reverse-sort-by-phone', managers: (filterManagers(state.managers, event.target))})} className="sort-button-bottom">
                        <CIcon className="sort-icon" icon={cilArrowBottom}/>
                      </button>
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center header-cell">
                    <div className="header-container" style={{display:"flex",  alignItems:"center", justifyContent: "center"}}>
                      Gender
                    </div>
                  </CTableHeaderCell>
                  <CTableHeaderCell className="text-center search-cell">
                    <div style={{display:"flex",  alignItems:"center"}}>
                      <CIcon className="search-icon" icon={cilSearch} />
                      <Input className="search-bar" type="text" id="searchInput" onKeyUp={event =>
                        dispatch({type: 'set-managers', managers: (filterManagers(state.managers, event.target))})
                      } placeholder="Search For Managers.."/>
                    </div>
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody className="table-body">
                {state.filteredManagers.map(manager => <ManagerRow key={manager.id} manager={manager} managers={state.filteredManagers}/>)}
              </CTableBody>
            </CTable>
          </div>
          : <Spinner />}
      </div>
    </>
  );
};

export default ManagerTable;
