import { useLocation } from 'react-router-dom';
import FlightSearchedContainer from '../../component/FlightAndAirportItem/Flight/FlightSearchedContainer/FlightSearchedContainer';
import StickySearchForm from '../../component/FlightAndAirportItem/Flight/StickySearchForm/StickySearchForm';

const FlightSearchResult = () => {
  const location = useLocation();
  const { flights = [] } = location.state || {};

  return (
    <>
      <StickySearchForm />
      <FlightSearchedContainer flights={flights} />
    </>
  );
}

export default FlightSearchResult;
