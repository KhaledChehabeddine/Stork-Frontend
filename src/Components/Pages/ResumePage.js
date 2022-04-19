import React, {useEffect, useState} from 'react';
import NavBar from "../Utils/Navbar";
import getApiClient from "../../api_client/getApiClient";

const ResumePage = ({candidate}) => {
  const [resume, setResume] = useState(null);
  useEffect(() => {
    getApiClient().findResume(candidate.id)
      .then(response => {
        if (response.status === 200) {
          setResume(response.data);
        }
      }).catch(error => console.log(error));
  }, [candidate]);

  return (
    <>
      <NavBar/>
    </>
  );
};

export default ResumePage;