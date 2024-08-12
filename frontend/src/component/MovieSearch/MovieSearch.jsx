import { useState, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';


const MovieSearch = () => {
   
    const backgroundStyling = {
        backgroundImage: `url('../assets/backgroundImages/Poster.png')`, // Adjust path if needed
        backgroundSize: 'cover',   // Cover the entire component
        backgroundPosition: 'center', // Center the background image
        backgroundRepeat: 'no-repeat', // Prevent repeating the background image
    };  
    const [city, setCity] = useState('');
    const [movie, setMovie] = useState('');
    const refCity = useRef(null);
    const refMovie = useRef(null);

    return (
        <div style={backgroundStyling}  className="w-full max-w-4xl px-6 sm:px-12 pt-24 pb-12 text-black bg-[#f8f7f9] rounded-lg shadow-mine relative mx-auto flex flex-col gap-4">
            {/* City Input Field */}
            <div className="p-2 bg-white rounded-lg flex items-center border-[1px] border-gray-300 cursor-pointer">
                <AiOutlineSearch className='text-[24px] text-gray-500 mr-2' />
                <input 
                    ref={refCity}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className='flex-1 outline-none bg-transparent p-2'
                    type="text"
                    placeholder='Select search city'
                />
            </div>

            {/* Movie Input Field */}
            <div className="p-2 bg-white rounded-lg flex items-center border-[1px] border-gray-300 cursor-pointer">
                <AiOutlineSearch className='text-[24px] text-gray-500 mr-2' />
                <input 
                    ref={refMovie}
                    value={movie}
                    onChange={(e) => setMovie(e.target.value)}
                    className='flex-1 outline-none bg-transparent p-2'
                    type="text"
                    placeholder='Search movie'
                />
            </div>
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-mine cursor-pointer caret-transparent p-3 flex justify-center items-center w-[380px] h-[56px] rounded-lg bg-[#5392f9] text-white font-bold text-lg">
                SEARCH 
            </div>
        </div>
    );
};

export default MovieSearch;
