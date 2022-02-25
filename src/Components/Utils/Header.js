import React from 'react';
import {CHeader} from "@coreui/react";

const Header = ({ text }) => {
  return (
    <CHeader align='center' style={{ fontSize: '180%', marginTop: '1%', fontStyle: 'bold' }}>{text}</CHeader>
  );
};

export default Header;
