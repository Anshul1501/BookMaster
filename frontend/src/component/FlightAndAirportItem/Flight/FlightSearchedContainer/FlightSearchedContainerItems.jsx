//To Do: use aircraft code to get aircraft name using amadeus api 

import { RiArrowDropDownLine } from "react-icons/ri";
import { HiArrowLongRight } from "react-icons/hi2";
import { MdKeyboardArrowUp } from "react-icons/md";
import PropTypes from 'prop-types';
import { useState } from "react";
import { PiDotFill} from "react-icons/pi";

const FlightSearchedContainerItems = ({ airline, departureTime, departureCityCode, departureAirport, arrivalTime, arrivalCityCode, arrivalAirport, duration, price, airlineLogo, typeFlight, aircraftName }) => {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };

    return (

        <div className='w-full max-w-4xl text-left text-black bg-[#f8f7f9] rounded-lg p-4 mb-4'>
            <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center mb-2 md:mb-0 md:mr-4 p-2">
                    <img src={airlineLogo} alt={`${airline} logo`} className="h-6 mr-2" />
                    <p>{airline}</p>
                </div>
                <div className="flex items-center mb-2 md:mb-0 md:mr-4 p-2">
                    <div className="text-center">
                        <p>{departureTime}</p>
                        <p className="text-sm text-gray-900">{departureCityCode}</p>
                    </div>
                    <div className="flex flex-col items-center  mb-2 md:mb-0 md:mr-4 p-2">
                        <HiArrowLongRight className="ml-10 mr-10 size-8" />
                        <p className="text-xs text-gray-900 ml-2">{duration}</p>
                    </div>
                    <div className="text-center  mb-2 md:mb-0 md:mr-4 p-2">
                        <p>{arrivalTime}</p>
                        <p className="text-sm text-gray-900">{arrivalCityCode}</p>
                    </div>
                </div>
                <div className="mb-2 md:mb-0 md:mr-[-8%] flex items-baseline">
                    <span className="text-sm text-red-900">Rs.</span>
                    <span className="text-2xl text-red-900 ml-1"><strong>{price}</strong></span>
                </div>
                <a className="text-4xl flex items-center text-blue-500 cursor-pointer" onClick={toggleExpand}>
                    {isExpanded ? <MdKeyboardArrowUp /> : <RiArrowDropDownLine />}
                </a>
            </div>
            {isExpanded && (
                <div className="flex mt-0 border-t-0 pt-0">
                    <div className="border-0 border-red-700 w-[10%] items-center mb-2 md:mb-0 md:mr-4 p-2">
                        <div className="text-center text-sm">
                            <p className="font-bold">{departureTime}</p>
                            <p className="text-xs text-gray-900">2 Aug</p>            {/*departure date*/}
                        </div>
                        <div className="text-center text-gray-900 mt-5 text-xs">
                            <p>{duration}</p>
                        </div>
                        <div className="text-center text-sm mt-5">
                            <p className="font-bold">{arrivalTime}</p>
                            <p className="text-xs text-gray-900">2 Aug</p>            {/*arrival date*/}
                        </div>
                    </div>

                    <div className="border-0 border-red-900 relative">
                        <div className="text-clip">
                            <PiDotFill className="size-7 text-gray-500 text-center mt-3" />
                            <div className="w-[-1] h-16 border-0 border-l border-gray-500 text-center ml-3.5"></div>
                            <PiDotFill className="size-7 text-gray-500 text-center" />
                        </div>
                    </div>

                    <div className="border-0 border-red-700 w-[40%] items-center mb-2 md:mb-0 md:mr-4 p-2">
                        <div className="text-start text-sm">
                            <p className="font-bold">New Delhi and NCR ({departureCityCode})</p> {/*departure city name and city code*/}
                            <p className="text-xs text-gray-900">{departureAirport}</p>
                        </div>
                        <div className="items-center  md:mb-0 md:mr-4 mt-5">
                            <div className="flex">
                                <img src={airlineLogo} alt={`${airline} logo`} className="h-3" />
                                <p className="text-xs text-gray-900 ml-2">{airline}</p>
                            </div>
                            <p className="text-xs text-gray-900 text-start">{typeFlight} • {aircraftName}</p>
                        </div>
                        <div className="text-start text-sm mt-5">
                            <p className="font-bold"> Mumbai ({arrivalCityCode})</p>
                            <p className="text-xs text-gray-900">{arrivalAirport}</p>            {/*arrival date*/}
                        </div>
                    </div>

                    <div className="border-0 border-red-700 w-[40%] items-center mb-2 md:mb-0 md:mr-4 p-2">

                        <div className="border-2 bg-blue-500 text-white float-end mt-[60%] rounded-full text-sm pl-4 pr-4 p-1 cursor-pointer hover:bg-blue-600">
                            <a>select</a>
                        </div>
                    </div> {/*additional detials*/}
                </div>
            )}
        </div>
    );
}

FlightSearchedContainerItems.propTypes = {
    airline: PropTypes.string.isRequired,
    departureTime: PropTypes.string.isRequired,
    departureCityCode: PropTypes.string.isRequired,
    departureAirport: PropTypes.string, // Corrected typo
    arrivalTime: PropTypes.string.isRequired,
    arrivalCityCode: PropTypes.string.isRequired,
    arrivalAirport: PropTypes.string,
    duration: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    airlineLogo: PropTypes.string.isRequired,
    typeFlight: PropTypes.string,
    aircraftName: PropTypes.string
};

export default FlightSearchedContainerItems;


{/*
     <p className="text-sm text-gray-700"><strong>Departure Airport:</strong> {departureAirprot}</p>
          <p className="text-sm text-gray-700"><strong>Arrival Airport:</strong> {arrivalAirport}</p>
          <p className="text-sm text-gray-700"><strong>Flight Type:</strong> {typeFlight}</p>
    */}

