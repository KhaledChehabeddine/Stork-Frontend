import React, {useEffect} from 'react';
import './App.css';
import Provider from "./Context/Provider";
import Routing from "./Routing";

const App = () => {
  return (
    <>
      <Provider>
        <Routing />
      </Provider>
    </>
  );
}

export default App;
