import { useRef, useState } from "react";
import FlightList from "./FlightList";
import FlightListRound from "./FlightListRound";

interface Iprops {
	departureDestination: "string",
    arrivalDestination: "string",
	roundTrip: boolean,
	adults: number,
	children: number,
	departureDate: Date,
	returnDate?: Date
}

function Search(props:Iprops) {
    const [search, setSearch]= useState(props);

	const [Shown, setShown] = useState(true);
	const form = useRef(null);

	const submit = (e:any) => {
// 	e.preventDefault()
//     const data = new FormData(form.current)
//     const json = JSON.stringify(data);
//     console.log(data);
//     console.log(json);
//     const q = new URLSearchParams(json);
//     console.log(q)
//     fetch(`https://localhost:7288/api/Flights?`)
//           .then((response) => {
//             if(!response.ok)
//             {
//               throw new Error ('OhOh....')
//             }
//             return response.blob();
//           })
//           .then((response) => console.log(response))
//           ;
    
   

  }

	return (
		<>
			<form ref = {form} onSubmit={submit}>
				<label>
					Departure:
					<input
						type="text"
						name="props[departureDestination]"
                        defaultValue={search.departureDestination}
					/>
				</label>
				<label>
					Departure:
					<input
						type="text"
						name="props[arrivalDestination]"
                        defaultValue={search.arrivalDestination}
					/>
				</label>
	
				<input type="submit" />
			</form>
			<FlightList />
			<FlightListRound />
		</>
	);
  }
  
  export default Search;
  