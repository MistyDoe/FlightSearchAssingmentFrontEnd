import './App.css';
import FlightListRound from './Compartments/FlightListRound';
import FlightList from './Compartments/FlightList';
import {useState} from 'react';


function App() {
  const [SeatchForm, setSearchForm]= useState();
  const [RoundTripState, setRooundTripState] = useState(true);
  

const handleRoundTripState = () => {

  setRooundTripState(!RoundTripState)
}
const handleFormSubmit = () => {

}

  return (

    <>
    <form onSubmit={handleFormSubmit}>
    <label>
        Departure     
      <input type="text" name="destination" />
      </label>
      <label>
        Destination     
      <input type="text" name="arrival" />
      </label>
      <label>
        Departure Date     
      <input type="date" name="departureDate" />
      </label>
      <label>
        Round trip     
      <input type="checkbox" name="roundtrip" onChange= {handleRoundTripState } />
      </label>
      <label hidden={RoundTripState} >
        Retrun date     
      <input type="date" name="retrunDepartureDate" />
      </label>
      <input type="submit" />
    </form>
    <FlightList/>
    <FlightListRound/>
    </>
       
  );
}

export default App;















