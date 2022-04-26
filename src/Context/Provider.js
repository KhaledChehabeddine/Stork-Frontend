import {useEffect, useState} from 'react';
import { Data } from './Context';
import getApiClient from "../api_client/getApiClient";

const Provider = ({ children }) => {
  const [jobPositions, setJobPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [managers, setManagers] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [actions, setActions] = useState([]);

  useEffect(() => {
    getApiClient().getAllVacancies()
      .then(response => {
        if (response.status === 200) {
          setJobPositions(response.data);
        }
      }).catch(error => console.log(error));
    getApiClient().getAllCandidates()
      .then(response => {
        if (response.status === 200) {
        setCandidates(response.data);
        }
      }).catch(error => console.log(error));
    getApiClient().getAllManagers()
      .then(response => {
        if (response.status === 200) {
          setManagers(response.data);
        }
      }).catch(error => console.log(error));
    getApiClient().getAllInterviews()
      .then(response => {
        if (response.status === 200) {
          setInterviews(response.data);
        }
      }).catch(error => console.log(error));
    getApiClient().getAllActions()
      .then(response => {
        if (response.status === 200) {
          setActions(response.data);
        }
      })
  }, []);

  const value = {
    values: {
      jobPositions,
      candidates,
      managers,
      interviews,
      actions
    },
    actions: {
      setJobPositions,
      setCandidates,
      setManagers,
      setInterviews,
      setActions
    }
  };

  return (
    <Data.Provider value={value}>
      {children}
    </Data.Provider>
  )
};

export default Provider;
