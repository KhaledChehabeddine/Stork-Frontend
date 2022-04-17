import React from 'react';
import '../../Styles/ProfileCard.css'
import ActionTable from "../Tables/ActionTable";
import NavBar from "../Utils/Navbar";
import {formatDate} from "../Utils/utils";

const ProfileCard = ({ candidate }) => {
  return (
    <>
      <NavBar />
      <div style={{height: "30%"}}>
        <div style={{width: "50%", float: "left", padding: "5%"}}>
          <h3>{candidate.firstName + " " + candidate.lastName}</h3>
        </div>
        <div style={{width: "50%", float: "right"}}>
          <h3>{candidate.email}</h3>
          <h3>{candidate.phone}</h3>
          <h3>{formatDate(candidate.date)}</h3>
          <h3>{candidate.country}</h3>
          <h3>{candidate.sex}</h3>
        </div>
      </div>
      <ActionTable candidate={candidate} />
    </>
  );
};

export default ProfileCard;
