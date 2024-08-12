import { useState, useRef, useEffect } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle } from "react-icons/ai";
import { BsChevronDown, BsPeople } from "react-icons/bs";
import { MdFlight } from "react-icons/md";
import { LuLocateFixed } from "react-icons/lu";
import { GrTransaction } from "react-icons/gr";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from 'react-router-dom';
import useGetFlight from '../../../../Hooks/useGetFlight'


const FlightSearchForm = () => {
    const [showPeople, setShowPeople] = useState(false);
    const typeFlightArray = ['Economy', 'Premium economy', 'Business', 'First'];
    const [oneWay, setOneWay] = useState(true);
    const [adult, setAdult] = useState(1);
    const [children, setChildren] = useState(0);
    const [typeFlight, setTypeFlight] = useState(0);
    const refDes = useRef(null);
    const refStart = useRef(null);
    const ref = useRef(null);
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [value, setValue] = useState({
        startDate: (new Date(Date.now()).toLocaleString('sv')).split(' ')[0],
        endDate: (new Date(Date.now()).toLocaleString('sv')).split(' ')[0]
    });

    const swapLocations = () => {
        const temp = origin;
        setOrigin(destination);
        setDestination(temp);
    };

    const handleDateChange = (newValue) => {
        setValue(newValue);
    };

    const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
            setShowPeople(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [ref]);
    

    const { data, loading, error, fetchFlightData } = useGetFlight();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
    
        try {
            // Fetch flight data based on user input
            await fetchFlightData({
                originCode: origin,
                destinationCode: destination,
                dateOfDeparture: value.startDate,
                adults: adult,
                numberOfChildren: children,
                travelClass: typeFlightArray[typeFlight],
            });
    
            // Now check the data after the API call is complete
            if (Array.isArray(data) && data.length > 0) {
                const formattedFlights = data.map(offer => {
                    const firstSegment = offer.itineraries[0].segments[0];
                    const lastSegment = offer.itineraries[0].segments[offer.itineraries[0].segments.length - 1];
    
                    return {
                        airline: firstSegment.operating.carrierCode,
                        departureTime: firstSegment.departure.at.split('T')[1].slice(0, 5),
                        departureCityCode: firstSegment.departure.iataCode,
                        departureAirport: firstSegment.departure.terminal,
                        arrivalTime: lastSegment.arrival.at.split('T')[1].slice(0, 5),
                        arrivalCityCode: lastSegment.arrival.iataCode,
                        arrivalAirport: lastSegment.arrival.terminal,
                        duration: offer.itineraries[0].duration.replace('PT', '').replace('H', 'h ').replace('M', 'm'),
                        price: offer.price.total,
                        isCheapest: false,
                        airlineLogo: 'https://via.placeholder.com/50',
                        typeFlight: offer.travelerPricings[0].fareDetailsBySegment[0].cabin,
                        aircraftName: firstSegment.aircraft.code
                    };
                });
    
                navigate('/FlightSearchResult', { state: { flights: formattedFlights } });
            } else {
                console.error("No matching flights found");
            }
        } catch (error) {
            console.error("An error occurred while fetching flight data:", error);
        }
    };
    
    
    return (
        <form onSubmit={handleSubmit} className="w-full max-w-4xl px-6 sm:px-12 pt-24 pb-12 text-black bg-[#f8f7f9] rounded-lg shadow-mine relative mx-auto">
            <div className="flex py-4">
                <div className={`py-2 px-4 bg-white rounded-full cursor-pointer ${oneWay ? 'border-[#5392f9] border-[3px]' : 'border-gray-300 border-[1px]'}`} onClick={() => setOneWay(true)}>One-Way</div>
                <div className={`py-2 px-4 bg-white rounded-full ml-4 cursor-pointer ${!oneWay ? 'border-[#5392f9] border-[3px]' : 'border-gray-300 border-[1px]'}`} onClick={() => setOneWay(false)}>Round-trip</div>
            </div>
            <div className="flex justify-between relative">
                <div className="w-[49%] p-2 bg-white rounded-lg flex justify-between items-center border-[1px] border-gray-300 cursor-pointer" onClick={() => refStart.current.focus()}>
                    <div className="flex justify-center items-center p-2">
                        <MdFlight className='text-[24px]' />
                    </div>
                    <input 
                        ref={refStart} 
                        className='flex-1 outline-none bg-transparent' 
                        type="text" 
                        placeholder='Fly from' 
                        value={origin} 
                        onChange={(e) => setOrigin(e.target.value)} 
                    />
                </div>
                <div className="w-[49%] p-2 bg-white rounded-lg flex justify-between items-center border-[1px] border-gray-300 cursor-pointer" onClick={() => refDes.current.focus()}>
                    <div className="flex justify-center items-center p-2">
                        <LuLocateFixed className='text-[24px]' />
                    </div>
                    <input 
                        ref={refDes} 
                        className='flex-1 outline-none bg-transparent' 
                        type="text" 
                        placeholder='Fly to' 
                        value={destination} 
                        onChange={(e) => setDestination(e.target.value)} 
                    />
                </div>
                <div className="absolute bg-white p-2 rounded-md left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-mine cursor-pointer hover:bg-gray-100 transition-all" onClick={swapLocations}>
                    <GrTransaction className='text-[16px]' />
                </div>
            </div>
            <div className="flex justify-between mt-6">
                <div className="w-[49%]">
                    <Datepicker
                        inputClassName={"w-full border-[1px] border-gray-300 p-4 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                        containerClassName=""
                        asSingle={oneWay}
                        primaryColor={"blue"}
                        value={value}
                        showShortcuts={true}
                        onChange={handleDateChange}
                    />
                </div>
                <div ref={ref} className="w-[49%] bg-white rounded-md border-[1px] border-gray-300 caret-transparent flex cursor-pointer relative">
                    <div className="flex justify-between w-full p-4" onClick={() => setShowPeople(!showPeople)}>
                        <div className="flex items-center justify-center"><BsPeople className='text-[20px]' /></div>
                        <div className="flex-1 ml-2">{`${adult} Adults, ${children} Children, ${typeFlightArray[typeFlight]}`}</div>
                        <div className="flex items-center justify-center"><BsChevronDown className='text-[20px]' /></div>
                    </div>
                    {showPeople && (
                        <div className="absolute bg-white p-4 left-0 top-[110%] z-20 min-w-[300px] rounded-md border-[1px] border-gray-300 cursor-default">
                            <div className="flex justify-between">
                                <div>
                                    <p>Adult</p>
                                    <p className='text-[12px] text-[#6b7388]'>Ages 18 or above</p>
                                </div>
                                <div className="flex justify-center items-center">
                                    <AiOutlineMinusCircle className='text-[20px] cursor-pointer' onClick={() => setAdult(Math.max(adult - 1, 1))} />
                                    <p className='m-2 text-[18px]'>{adult}</p>
                                    <AiOutlinePlusCircle className='text-[20px] cursor-pointer' onClick={() => setAdult(adult + 1)} />
                                </div>
                            </div>
                            <div className="mt-4">
                                <div className="flex justify-between">
                                    <div>
                                        <p>Children</p>
                                        <p className='text-[12px] text-[#6b7388]'>Ages 0-17</p>
                                    </div>
                                    <div className="flex justify-center items-center">
                                        <AiOutlineMinusCircle className='text-[20px] cursor-pointer' onClick={() => setChildren(Math.max(children - 1, 0))} />
                                        <p className='m-2 text-[18px]'>{children}</p>
                                        <AiOutlinePlusCircle className='text-[20px] cursor-pointer' onClick={() => setChildren(children + 1)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 mt-4 gap-2">
                                    {typeFlightArray.map((el, id) => (
                                        <div
                                            key={id}
                                            className={`${typeFlight === id ? 'bg-[#5392f9] text-white' : ''} border-[1px] border-[#5392f9] rounded-md px-2 py-1 cursor-pointer`}
                                            onClick={() => setTypeFlight(id)}
                                        >
                                            {el}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <button
                type="submit"
                className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-mine caret-transparent p-3 flex justify-center items-center w-[380px] h-[56px] rounded-lg bg-[#5392f9] text-white font-bold text-lg"
            >
                {loading ? "SEARCHING..." : "SEARCH FLIGHTS"}
            </button>
            {error && <div className="text-red-500 mt-4 text-center">Failed to load flights. Please try again.</div>}
        </form>
    );
}

export default FlightSearchForm;
