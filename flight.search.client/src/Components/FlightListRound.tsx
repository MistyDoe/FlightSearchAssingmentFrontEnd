import Booking from "./Booking";
import DescriptionCard from "./DescriptionCard";

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
export type Flights = {
	departureDestination: string;
	arrivalDestination: string;
	roundTrip: boolean;
	adults: number;
	children: number;
	retrunDepartureDate?: Date;
	iteneraries: Array<Itenerary>;
}  


function FlightListRound(results:Flights) {


    return (
      <>
        <Booking/>
      </>
      
     
    );
  }
  
  export default FlightListRound;
  