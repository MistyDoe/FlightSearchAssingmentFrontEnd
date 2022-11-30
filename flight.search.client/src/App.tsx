/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import FlightListRound from "./Compartments/FlightListRound";
import FlightList from "./Compartments/FlightList";
import  { useState,  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";


type SearchForm = {
	departureDestination: string;
	arrivalDestination: string;
	departureDate: Date;
	roundTrip: boolean;
	retrunDepartureDate: Date;
};

function App() {
	const [Shown, setShown] = useState(true);
	const { register, handleSubmit } = useForm<SearchForm>();

	const onSubmit: SubmitHandler<SearchForm> = (data) => {

    const json = JSON.stringify(data);
    const url =
    fetch(`https://localhost:7288/api/Flights?`+ new URLSearchParams({json}) )
          .then((response) => {
            if(!response.ok)
            {
              throw new Error ('OhOh....')
            }
            return response.blob();
          })
          .then((response) => console.log(response))
          ;
    
   

  }

	return (
		<>
			<form onSubmit={handleSubmit(onSubmit)}>
				<label>
					Departure:
					<input
						type="text"
						defaultValue=""
						{...register("departureDestination", { required: true })}
					/>
				</label>
				<label>
					Destination:
					<input
						type="text"
						defaultValue=""
						{...register("arrivalDestination", { required: true })}
					/>
				</label>
				<label>
					Departure Date:
					<input
						type="date"
						defaultValue=""
						{...register("departureDate", { required: true })}
					/>
				</label>
				<label>
					Round trip
					<input
						type="checkbox"
						defaultValue=""
						{...register("roundTrip", {
							onChange: (e) => {
								setShown(!Shown);
							},
							required: false,
						})}
					/>
				</label>
				<label hidden={Shown}>
					Return date:
					<input
						type="date"
						{...register("retrunDepartureDate", { required: false })}
					/>
				</label>
				<input type="submit" />
			</form>
			<FlightList />
			<FlightListRound />
		</>
	);
}

export default App;
