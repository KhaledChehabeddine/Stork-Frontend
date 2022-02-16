import React from 'react';

const Spinner = (props) => {
  return (
    <div align='center' style={ spinnerStyle }>
      <span className='spinner-border text-dark' />
    </div>
  );
};

const spinnerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '800px'
}

export default Spinner;
