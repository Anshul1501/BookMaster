import FlightSearchedContainerItems from './FlightSearchedContainerItems';
import { useLocation } from 'react-router-dom'


const FlightSearchedContainer = () => {
      //Retrieve the flight data from state 'FlightSearchForm'
  const location = useLocation();
  const flights = location.state?.flights || [];
    return (
        <div className='w-full max-w-4xl px-6 sm:px-12 pt-24 pb-12 text-black rounded-lg shadow-mine relative mx-auto'>
            <div className='my-[5%]'>
                {Array.isArray(flights) && flights.length > 0 ? flights.map((flight, index) => (
                    <FlightSearchedContainerItems
                        key={index}
                        airline={flight.airline}
                        departureTime={flight.departureTime}
                        departureCityCode={flight.departureCityCode}
                        departureAirport={flight.departureAirport}
                        arrivalTime={flight.arrivalTime}
                        arrivalCityCode={flight.arrivalCityCode}
                        arrivalAirport={flight.arrivalAirport}
                        duration={flight.duration}
                        price={flight.price}
                        isCheapest={flight.isCheapest}
                        airlineLogo={flight.airlineLogo}
                        typeFlight={flight.typeFlight}
                        aircraftName={flight.aircraftName}
                    />
                )) : (
                    <p>No flights available for the selected route and date.</p>
                )}
            </div>
        </div>
    );
};

export default FlightSearchedContainer;
