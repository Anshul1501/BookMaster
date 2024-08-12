import { useState } from "react";

const useGetFlight = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchFlightData = async(searchParams) => {
        const { originCode, destinationCode, dateOfDeparture } = searchParams;
        if (!originCode || !destinationCode || !dateOfDeparture) {
            setError("Required fields are missing");
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `/api/search/flight-search?originCode=${originCode}&destinationCode=${destinationCode}&dateOfDeparture=${dateOfDeparture}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                throw new Error(`
                            HTTP error!status: $ { response.status }
                            `);
            }

            const result = await response.json();
            console.log(result);

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

    return { data, loading, error, fetchFlightData };
};

export default useGetFlight;