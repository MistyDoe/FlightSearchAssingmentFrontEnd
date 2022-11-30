/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import FlightListRound from "./Compartments/FlightListRound";
import FlightList from "./Compartments/FlightList";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler,Controller } from "react-hook-form";
import { getValue } from "@testing-library/user-event/dist/utils";



type SearchForm = {
	DepartureDestination: string;
	ArrivalDestination: string;
	DepartureDate: Date;
	RoundTrip: boolean;
	RetrunDepartureDate: Date;
};

function App() {
	const [RoundTripState, setRooundTripState] = useState(true);
  const [Shown, setShown] = useState(true);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<SearchForm>();

  
	const onSubmit: SubmitHandler<SearchForm> = (data) => console.log(data);
	

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Departure:
					<input type="text" defaultValue="" {...register("DepartureDestination", { required: true })} />
				</label>
				<label>
					Destination:
					<input type="text" defaultValue="" {...register("ArrivalDestination", { required: true })} />
				</label>
				<label>
					Departure Date:
					<input type="date" defaultValue="" {...register("DepartureDate", { required: true })}/>
				</label>
				<label>
					Round trip
          <input type="checkbox" defaultValue="" {...register("RoundTrip", { 
            onChange: (e) => {setShown(!Shown)}, 
              required: false })}/>
				</label>        
				<label  hidden={Shown}>
					Return date:
					<input type="date"  {...register("RetrunDepartureDate", { required: false })} />
				</label>       
        <input type="submit"/>
			</form>
			<FlightList />
			<FlightListRound />
		</>
	);
}

export default App;
