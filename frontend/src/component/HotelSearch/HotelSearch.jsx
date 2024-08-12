import React, { useState, useRef } from 'react';
import { AiOutlinePlusCircle, AiOutlineMinusCircle, AiOutlineSearch } from "react-icons/ai";
import { BsChevronDown, BsPeople } from "react-icons/bs";
import Datepicker from "react-tailwindcss-datepicker";

export default function HotelSearch() {
    const [showPeople, setShowPeople] = useState(false);
    const [adult, setAdult] = useState(1);
    const [childrent, setChildrent] = useState(0);
    const refCity = useRef(null);
    const [dates, setDates] = useState({
        startDate: (new Date()).toISOString().split('T')[0],
        endDate: (new Date()).toISOString().split('T')[0]
    });

    return (
        <div className="w-full max-w-4xl px-6 sm:px-12 pt-24 pb-12 text-black bg-[#f8f7f9] rounded-lg shadow-mine relative mx-auto">
            <div className="flex flex-col gap-4">
                {/* City Name Input Field with Search Icon */}
                <div className="p-2 bg-white rounded-lg flex items-center border-[1px] border-gray-300 cursor-pointer">
                    <AiOutlineSearch className='text-[24px] text-gray-500 mr-2' />
                    <input ref={refCity} className='flex-1 outline-none bg-transparent p-2' type="text" placeholder='Enter City name' />
                </div>
                
                {/* Date Selection and People Selection Form */}
                <div className="flex gap-4">
                    {/* Date Selection Form */}
                    <div className="w-[65%] relative">
                        <Datepicker
                            inputClassName={"w-full border-[1px] border-gray-300 p-4 rounded-md bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"}
                            containerClassName="relative"
                            asSingle={false}
                            value={dates}
                            onChange={setDates}
                            showShortcuts={true}
                            primaryColor={"blue"}
                            placeholder="Check-in & Check-out"
                        />
                        <div className="absolute inset-y-0 right-1 w-px bg-gray-300"></div> {/* Vertical Line */}
                    </div>

                    {/* People Selection Form */}
                    <div className="w-[35%] bg-white rounded-md border-[1px] border-gray-300 caret-transparent flex cursor-pointer relative">
                        <div className="flex justify-between w-full p-4" onClick={() => setShowPeople(!showPeople)}>
                            <div className="flex items-center justify-center"><BsPeople className='text-[20px]' /></div>
                            <div className="flex-1 ml-2">{`${adult} Adults, ${childrent} Children`}</div>
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
                                            <AiOutlineMinusCircle className='text-[20px] cursor-pointer' onClick={() => setChildrent(Math.max(childrent - 1, 0))} />
                                            <p className='m-2 text-[18px]'>{childrent}</p>
                                            <AiOutlinePlusCircle className='text-[20px] cursor-pointer' onClick={() => setChildrent(childrent + 1)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-mine cursor-pointer caret-transparent p-3 flex justify-center items-center w-[380px] h-[56px] rounded-lg bg-[#5392f9] text-white font-bold text-lg">
                SEARCH HOTELS
            </div>
        </div>
    );
}
