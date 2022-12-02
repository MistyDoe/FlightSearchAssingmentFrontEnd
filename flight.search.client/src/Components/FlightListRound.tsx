import Booking from "./Booking";
import DescriptionCard from "./DescriptionCard";

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
type Flights = {
	departureDestination: string;
	arrivalDestination: string;
	roundTrip: boolean;
	adults: number;
	children: number;
	retrunDepartureDate?: Date;
	iteneraries: Array<Itenerary>;

function FlightListRound() {
    return (
      <>
      <p>flightlistRound</p>
        <Booking/>
      </>
      
     
    );
  }
  
  export default FlightListRound;
  