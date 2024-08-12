// AirportDetailItem.jsx
import PropTypes from 'prop-types';
import Flag from 'react-world-flags';
import { FaMapMarkedAlt } from "react-icons/fa";

const AirportDetailItem = ({ name, region, id, countryCode, score, latitude, longitude }) => {
  const mapLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

  return (
    <div className='w-full max-w-4xl text-left text-black bg-[#f8f7f9] rounded-lg p-4 mb-4'>
      <h2 className="text-2xl font-semibold mb-4">{name}</h2>
      <div className="flex flex-col md:flex-row justify-between items-center">
        <p className="mb-2 md:mb-0 md:mr-4"><strong>Region:</strong> {region}</p>
        <p className="mb-2 md:mb-0 md:mr-4"><strong>ID:</strong> {id}</p>
        <p className="mb-2 md:mb-0 md:mr-4 flex items-center">
          <strong>Country:</strong> <Flag code={countryCode} className="ml-2 w-6 h-4" />
        </p>
        <p className="mb-2 md:mb-0 md:mr-4"><strong>Score:</strong> {score}</p>
        <a href={mapLink} target="_blank" rel="noopener noreferrer" className="btn ml-2 flex items-center">
          Map<FaMapMarkedAlt className='ml-2' />
        </a>
      </div>
    </div>
  );
};

AirportDetailItem.propTypes = {
  name: PropTypes.string.isRequired,
  region: PropTypes.string,
  id: PropTypes.string.isRequired,
  countryCode: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export default AirportDetailItem;
