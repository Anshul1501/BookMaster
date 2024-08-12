import AirportSearch from '../../component/FlightAndAirportItem/Airport/AirportSearch/AirportSearch'
import FlightSearch from '../../component/FlightAndAirportItem/Flight/FlightSearchForm/FlightSearch'
import FunctionBar from '../../component/FunctionBar/FunctionBar'
import HotelSearch from '../../component/HotelSearch/HotelSearch'
import { StickyNavbar } from '../../component/Navbar'
import { useState } from 'react'
import MovieSearch from '../../component/MovieSearch/MovieSearch';

const Home = () => {
    const [selectedFunction, setSelectedFunction] = useState(0);

    const handleSelectFunction = (index) => {
        setSelectedFunction(index);
    };
    return (
        <>
            <div>

                <StickyNavbar />
                <div className="relative my-[10%]">
                    <FunctionBar onSelectFunction={handleSelectFunction} />
                    {selectedFunction === 0 && <AirportSearch/>}
                    {selectedFunction === 1 && <FlightSearch />}
                    {selectedFunction === 2 && <HotelSearch/>}
                    {selectedFunction === 3 && <MovieSearch/>}
                </div>
        
            </div>
        </>
    )
}

export default Home