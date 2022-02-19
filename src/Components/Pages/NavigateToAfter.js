import React, {useEffect, useState } from 'react';
import { Navigate } from "react-router-dom";
import Spinner from "../Utils/Spinner";

const NavigateToAfter = ({ time = 0, path }) => {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoad(true);
    }, time*1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <>{load ? <Navigate to={path} /> : <Spinner />}</>
  );
};

export default NavigateToAfter;
