import React, { useEffect, useState } from "react";
import EmployeeCard from "./EmployeeCard";
import getApiClient from "../../api_client/getApiClient";

const EmployeeCardWrapper = () => {
  const [employees, setEmployees] = useState([]);
  const getAllEmployees = useEffect(() => {
    getApiClient().getAllEmployees()
      .then(response => {
        setEmployees(response.data);
      }).catch(error => {console.log(error)});
  }, []);
  return (
    <div className='card_wrapper'>
      {employees.map(employee => <EmployeeCard key={employee.id} employee={employee} />)}
    </div>
  )
}

export default EmployeeCardWrapper;
