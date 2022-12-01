/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import FlightListRound from "./Components/FlightListRound";
import FlightList from "./Components/FlightList";
import  { useState,  } from "react";
import { useForm, SubmitHandler } from "react-hook-form";


type SearchForm = {
	departureDestination: string;
	arrivalDestination: string;
	departureDate: Date;
	roundTrip: boolean;
	retrunDepartureDate?: Date;
};


function App() {
	const [Shown, setShown] = useState(true);
	const { register, handleSubmit } = useForm<SearchForm>();

	const onSubmit: SubmitHandler<SearchForm> = (data) => {
		var url = new URL("https://localhost:7288/api/Flights?")
		if(!data.retrunDepartureDate)
		{
			delete data.retrunDepartureDate;
		}	
		console.log(Object.keys(data));
		Object.keys(data).forEach(key => url.searchParams.append(key, data[key]))
		fetch(url )
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
