// AirportSearch.jsx
import { useRef, useState} from 'react';
import { MdFlight } from "react-icons/md";
import ErrorBoundary from '../../../../utils/ErrorBoundary';
import AirportDetailItem from '../AirportDetailContainer/AirportDetailItem';
import useGetCityAndAirport from '../../../../Hooks/useGetCityAndAirport';
import { Spinner } from "@material-tailwind/react";

export default function AirportSearch() {
    const refAirport = useRef(null);
    const [parameter, setParameter] = useState('');
    const { data, loading, error } = useGetCityAndAirport(parameter);

    const handleSearch = (e) => {
        e.preventDefault();
        if (parameter === '0') {
            setParameter('');
        } else {
            setParameter(parameter);
        }
    };

    return (
        <>
            <form onSubmit={handleSearch} className="w-full max-w-4xl px-6 sm:px-12 pt-24 pb-12 text-black bg-[#f8f7f9] rounded-lg shadow-mine relative mx-auto">
                <div className="flex justify-between">
                    <div className="w-full p-2 bg-white rounded-lg flex items-center border-[1px] border-gray-300 cursor-pointer" onClick={() => refAirport.current.focus()}>
                        <div className="flex justify-center items-center p-2">
                            <MdFlight className='text-[24px]' />
                        </div>
                        <input
                            ref={refAirport}
                            className='flex-1 outline-none bg-transparent'
                            type="text"
                            placeholder='Search city and airport'
                            value={parameter}
                            onChange={(e) => setParameter(e.target.value)}
                        />
                    </div>
                </div>
               
            </form>

            <ErrorBoundary>
                <div className='my-[5%]'>
                    <div className='w-full max-w-4xl px-6 text-center text-black bg-[#f8f7f9] rounded-lg shadow-mine relative mx-auto'>
                        <div className='max-h-60 overflow-auto'> {loading ? (
                            
                            <p className='flex justify-center items-center my-3'><Spinner /></p> 

                        ) : error ? (
                            <p>{error}</p>
                        ) : Array.isArray(data) && data.length > 0 ? (
                            data.map((item, index) => (
                                <AirportDetailItem 
                                    key={index} 
                                    name={item.name} 
                                    region={item.address ? item.address.cityName : ''} 
                                    id={item.id}
                                    countryCode={item.address?.countryCode ||  ''} 
                                    score={item.analytics && item.analytics.travelers ? item.analytics.travelers.score : 0} 
                                    latitude={item.geoCode ? item.geoCode.latitude : 0} 
                                    longitude={item.geoCode ? item.geoCode.longitude : 0}
                                />
                            ))
                        ) : (
                            <p>No airports found for the given search.</p>
                        )}
                        </div>   
                    </div>
                </div>
            </ErrorBoundary>
        </>
    );
}
