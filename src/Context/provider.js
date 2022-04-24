import {useEffect, useState} from 'react';
import { Data } from './context';
import getApiClient from "../api_client/getApiClient";
import App from "../App";
import Routing from "../Routing";

const Provider = ({ children }) => {
  const [jobPositions, setJobPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [managers, setManagers] = useState([]);
  const [interviews, setInterviews] = useState([]);

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
    console.log(candidates);
  }, []);

  const value = {
    values: {
      jobPositions,
      candidates,
      managers,
      interviews
    },
    actions: {
      setJobPositions,
      setCandidates,
      setManagers,
      setInterviews
    }
  };

  return (
    <Data.Provider value={value}>
      {children}
    </Data.Provider>
  )
};

export default Provider;
