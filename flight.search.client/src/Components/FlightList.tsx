import { useState } from "react";

const FlightList = (results) => {
	const [show, SetShow] = useState(true);
	const flight = { ...results };

	function HandleShow(e) {
		e.preventDefault();
		SetShow(!show);
	}

	console.log(flight);
	if (flight === undefined) {
		return <></>;
	} else {
		return (
			<>
				<div> Departure from: {flight[0]?.departure}</div>
				<div> Arival At: {flight[0]?.arrival}</div>
				<div> Passengers </div>
				<div> Adults: {flight[0]?.adults} </div>
				<div> Children: {flight[0]?.children} </div>
				{flight[0]?.iteneraries?.map((it) => (
					<li key={it.iteneraryID} onClick={HandleShow}>
						<div>Flight </div>
						<div>Departture time: {it.departureTime}</div>
						<div>Arrival time: {it.arrivalTime}</div>
						<div hidden={show}>
							Prices
							{it.priceList.map((pr) => (
								<li key={pr.priceId}>
									<div>
										Adult price : {pr?.adultPrice} {pr?.currency}
									</div>
									<div>
										Children price : {pr?.childPrice} {pr?.currency}
									</div>
								</li>
							))}
						</div>
					</li>
				))}
			</>
		);
	}
};

export default FlightList;
