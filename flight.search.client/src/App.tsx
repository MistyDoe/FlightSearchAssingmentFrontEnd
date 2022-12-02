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
	roundTrip: boolean;
	retrunDepartureDate?: Date;
};
type Itenerary = {
	iteneraryID: string;
	departureTime: Date;
	arrivalTime: Date;
	availableSeats: 0;
	priceList: Array<prices>;
};
type prices = {
	pricesId: string;
	currency: string;
	adultPrice: number;
	childPrice: number;
};
type SearchResult = {
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
	const [result, setResult] = useState<SearchResult>();
	const [FlightShow, SetFlightShow] = useState(false);
	const [FlightRoundShow, SetFlightRoundShow] = useState(false);
	const [NoFlightShow, SetNoFlightShow] = useState(false);
	const [roundTrip, setRoundTrip] = useState<Boolean>();

	const onSubmit: SubmitHandler<SearchForm> = (data) => {
		var url = new URL("https://localhost:7288/api/Flights?");
		if (!data.retrunDepartureDate) {
			delete data.retrunDepartureDate;
		}
		setRoundTrip(data.roundTrip);
		Object.keys(data).forEach((key) => url.searchParams.append(key, data[key]));
		fetch(url)
			.then((response) => {
				if (!response.ok) {
					throw new Error("OhOh....");
				}
				return response.json();
			})
			.then((result) => {
				setResult(result);
			});
	};
	console.log(result);

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
			{roundTrip ? <FlightList flightList = {result} /> : <FlightListRound flightList = {result} />}
		</>
	);
}

export default App;
