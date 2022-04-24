import React from 'react';

const Warning = ({ condition, text }) => {
  return (
    <>
      {condition && <label className='warning'>{text}</label>}
    </>
  )
};

export default Warning;
