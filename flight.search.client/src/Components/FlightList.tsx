import { useState } from "react";
import Booking from "./Booking";
import DescriptionCard from "./DescriptionCard";



const FlightList = (results) => {
  const[show, SetShow] = useState(true);
const flight = {...results[0]}

function HandleShow(e){
  e.prevenrDefault();
  SetShow(!show);
}

console.log(flight)
    if(!flight)
    {
      return(
      <></>
    )}else{
      return (   
        <>
        <div> Departure from: {flight.departure}</div>
        <div> Arival At: {flight.arrival}</div>
        <div> Passengers </div>
        <div> Adults: {flight.adults} </div>
        <div> Childer: {flight.children} </div>
        {flight.iteneraries?.map((it ) => (
        <div onClick = {HandleShow}> Flight List <DescriptionCard  {...it}  hidden = {show}/></div>))}
         
        </> 
      );
    }
  }
  
  export default FlightList;
  