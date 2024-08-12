// useGetCityAndAirport.js
import { useState, useEffect } from "react";

const useGetCityAndAirport = (parameter) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!parameter) return;

        const fetchData = async() => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(
                    `/api/search/city-and-airport-search/${parameter}`
                );
                const result = await response.json();

                console.log("API response:", result); // Debugging statement

                if (Array.isArray(result.data)) {
                    setData(result.data);
                } else {
                    setData([]);
                    setError("Unexpected data format");
                }
            } catch (err) {
                setError(err.message);
                setData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [parameter]);

    return { data, loading, error };
};

export default useGetCityAndAirport;