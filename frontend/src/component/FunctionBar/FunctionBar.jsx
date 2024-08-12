import { useState } from 'react';
import { MdConnectingAirports } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { FaHotel } from "react-icons/fa";
import { PiFilmSlateFill } from "react-icons/pi";

const FunctionBar = ({ onSelectFunction }) => {
  const arrayFunction = ['Search AirPort', 'Flight', 'Hotel', 'MovieTicket'];
  const arrayIcon = [<MdConnectingAirports />, <FaPlaneDeparture />, <FaHotel />,<PiFilmSlateFill /> ];
  const [select, setSelect] = useState(0);

  const handleSelectFunction = (index) => {
    setSelect(index);
    onSelectFunction(index);
  };

  return (
    <div className="px-8 w-[40%] max-w-[40%]shadow-mine rounded-lg text-black bg-white absolute top-0 left-1/2 transform -translate-x-1/2 z-10 my-[-2%]">
      <ul className='flex flex-wrap justify-between'>
        {arrayFunction.map((el, id) => (
          <div
            key={id}
            className={`flex justify-center items-center relative cursor-pointer py-3 px-4
              ${select !== id ? '' : 'after:absolute after:w-full after:h-1 after:bg-[#5392f9] after:top-full after:left-0'}`}
            onClick={() => handleSelectFunction(id)}
          >
            {arrayIcon[id]}
            <li className="ml-2">{el}</li>
          </div>
        ))}
      </ul>
    </div>
  );
}
export default FunctionBar;
