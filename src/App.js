import './App.css';
import Provider from "./Context/provider";
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
