import { useState } from 'react';
import { MdFlightTakeoff, MdFlightLand } from 'react-icons/md';
import { FaExchangeAlt } from 'react-icons/fa';
import {  AiOutlineDown } from 'react-icons/ai';
import { HiUserAdd } from "react-icons/hi";
import Datepicker from 'react-tailwindcss-datepicker';
import { Menu } from '@headlessui/react';

const StickySearchForm = () => {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState(null);
  const [adults, setAdults] = useState(1);
  const [classType, setClassType] = useState('Economy');

  const handleDateChange = (newValue) => {
    setDate(newValue);
  };

  const swapLocations = () => {
    const temp = origin;
    setOrigin(destination);
    setDestination(temp);
  };

  return (
    <div className="flex items-center bg-white text-black shadow p-2 relative ">
        <div className='flex border-2 px-[10%] border-none relative'>
      <div className="flex items-center border rounded-full p-1 mx-2 relative">
        <MdFlightTakeoff className="size-5 mx-2" />
        <input
          type="text"
          value={origin}
          onChange={(e) => setOrigin(e.target.value)}
          className="outline-none flex-1 bg-transparent"
          placeholder="Origin"
        />
      </div>
      <div className="flex items-center border rounded-lg p-1 cursor-pointer">
        <FaExchangeAlt className="text-lg mx-2" onClick={swapLocations} />
      </div>
      <div className="flex items-center border rounded-full p-1 mx-2 relative">
        <MdFlightLand className="size-5 mx-2" />
        <input
          type="text"
          value={destination}
          onChange={(e) => setDestination(e.target.value)}
          className="flex-1 outline-none bg-transparent"
          placeholder="Destination"
        />
      </div>
      <div className="flex items-center border rounded-full mx-2">
        <Datepicker
          value={date}
          onChange={handleDateChange}
          asSingle={true}
          useRange={false}
          placeholderText="MMM D, YYYY"
          className="flex-1 outline-none bg-transparent"
        />
      </div>
      <div className="flex items-center border rounded-full p-1 mx-2">
        <HiUserAdd className="text-lg mr-2" />
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center">
            {adults}<AiOutlineDown className="ml-2" />
          </Menu.Button>
          <Menu.Items className="absolute mt-2 bg-white shadow-lg rounded-md p-1 z-10">
            {[1, 2, 3, 4, 5].map((number) => (
              <Menu.Item key={number}>
                {({ active }) => (
                  <button
                    onClick={() => setAdults(number)}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-black'
                    } p-2 rounded-md w-full text-left`}
                  >
                    {number} {number === 1 ? 'Adult' : 'Adults'}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
      <div className="flex items-center border rounded-full p-1 mx-2">
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center">
            {classType} <AiOutlineDown className="ml-2" />
          </Menu.Button>
          <Menu.Items className="absolute mt-2 bg-white shadow-lg rounded-md p-1 z-10">
            {['Economy', 'Business', 'First'].map((type) => (
              <Menu.Item key={type}>
                {({ active }) => (
                  <button
                    onClick={() => setClassType(type)}
                    className={`${
                      active ? 'bg-blue-500 text-white' : 'text-black'
                    } p-2 rounded-md w-full text-left`}
                  >
                    {type}
                  </button>
                )}
              </Menu.Item>
            ))}
          </Menu.Items>
        </Menu>
      </div>
      <button className="bg-blue-500 text-white rounded-full p-2 mx-10">Search</button>
      </div>
    </div>
  );
};

export default StickySearchForm;
