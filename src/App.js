import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Components/Pages/Home';
import EmployeeForm from './Components/Forms/EmployeeForm';
import EmployeeCardWrapper from './Components/Cards/EmployeeCardWrapper';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path='/' element={ <Home /> } />
        <Route exact path='/employee/add' element={ <EmployeeForm /> } />
        <Route exact path='/employee/all' element={ <EmployeeCardWrapper /> } />
      </Routes>
    </Router>
  );
}

export default App;
