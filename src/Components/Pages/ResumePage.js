import React, {useEffect, useState} from 'react';
import NavBar from "../Utils/Navbar";
import getApiClient from "../../api_client/getApiClient";
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';
import { Link } from "react-router-dom";


const ResumePage = ({candidate}) => {
  const [resume, setResume] = useState(null);
  useEffect(() => {
    getApiClient().findResume(candidate.id)
      .then(response => {
        if (response.status === 200) {
          setResume(response.data);
        }
      }).catch(error => console.log(error));
  }, []);

  return (
    <>
      <NavBar/>
      {/*<Document type='application/pdf' file={resume} onLoadSuccess={() => console.log('success!')}>*/}
      {/*  <Page pageNumber={1} />*/}
      {/*</Document>*/}
    </>
  );
};

export default ResumePage;