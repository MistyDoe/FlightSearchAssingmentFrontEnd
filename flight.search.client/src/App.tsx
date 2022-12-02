/* eslint-disable @typescript-eslint/no-unused-vars */
import "./App.css";
import FlightListRound from "./Components/FlightListRound";
import FlightList from "./Components/FlightList";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { render } from "@testing-library/react";
import { type } from "@testing-library/user-event/dist/type";

type SearchForm = {
	departureDestination: string;
	arrivalDestination: string;
	departureDate: Date;
	adults: number;
	children: number;
	roundTrip: boolean;
	retrunDepartureDate?: Date;
};
export type Itenerary = {
	iteneraryID: string;
	departureTime: Date;
	arrivalTime: Date;
	availableSeats: 0;
	priceList: Array<prices>;
};
export type prices = {
	pricesId: string;
	currency: string;
	adultPrice: number;
	childPrice: number;
};
export type SearchResult = {
	departureDestination: string;
	arrivalDestination: string;
	roundTrip: boolean;
	adults: number;

	children: number;

	retrunDepartureDate?: Date;
	iteneraries: Array<Itenerary>;
};

function App() {
	const [Shown, setShown] = useState(true);
	const { register, handleSubmit } = useForm<SearchForm>();
	const [result, setResult] = useState<SearchResult>(undefined);
	const [roundTrip, setRoundTrip] = useState<Boolean>();

	const onSubmit: SubmitHandler<SearchForm> = (data) => {
		var url = new URL("https://localhost:7288/api/Flights?");
		if (!data.retrunDepartureDate) {
			delete data.retrunDepartureDate;
		}
		Object.keys(data).forEach((key) => url.searchParams.append(key, data[key]));
		fetch(url)
		.then((response) => {
			if (!response.ok) {
				throw new Error("OhOh....");
			}
			return response.json();
		})
		.then((result) => {
			if(result !== undefined)
			
			setResult(result);
		});
		setRoundTrip(data.roundTrip);
	};
	console.log(roundTrip);

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
					<label> Adults
						<input
						type = "number"
						defaultValue="1"
						{...register("adults" ,{required:true} )}/>
					</label> 
					<label>
					<input
						type = "number"
						defaultValue="0"
						{...register("children" ,{required:true} )}/>
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
			{roundTrip ?  <FlightListRound  {...result}/> : <FlightList  {...result} />}
		</>
	);
}

export default App;
