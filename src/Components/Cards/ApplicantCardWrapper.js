import React, { useEffect, useState } from "react";
import getApiClient from "../../api_client/getApiClient";
import ApplicantCard from "./ApplicantCard";

const ApplicantCardWrapper = () => {
  const [applicants, setApplicants] = useState([]);
  const getAllApplicants = useEffect(() => {
    getApiClient().getAllApplicants()
      .then(response => {
        setApplicants(response.data);
      }).catch(error => {console.log(error)});
  }, []);
  return (
    <div className='card_wrapper'>
      {applicants.map(applicant => <ApplicantCard key={applicant.id} applicant={applicant} />)}
    </div>
  )
}

export default ApplicantCardWrapper;
