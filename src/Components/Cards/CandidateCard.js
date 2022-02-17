import React from 'react'
import '../../Styles/Employee.css'
import Button from '../Utils/Button'
import DefaultProfile from '../../Components/Assets/Profile Picture.png'
import {useNavigate} from "react-router-dom";

const CandidateCard = ({ candidate }) => {
  const navigate = useNavigate();
  return (
    <div className='card'>
      <div className='card_body'>
        <img className='card_image' src={DefaultProfile} alt='' />
        <h2 className='card_name'>{candidate.name}</h2>
        <h2 className='card_name'>{"Id: " + candidate.id}</h2>
      </div>
      <Button className='button' onClick={() => navigate(`/candidate/${candidate.id}`)}>View Candidate</Button>
    </div>
  );
};

export default CandidateCard;