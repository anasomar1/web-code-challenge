import axios from 'axios';
import { FlightOffer } from '../../types/flightsTypes';
import { getAmadeusToken } from './common';

interface FlightInspirationResponse {
  data: FlightOffer[];
}

export const fetchFlightInspirations = async (
  originCityCode: string,
  departureDate: string
): Promise<FlightInspirationResponse> => {
  const token = await getAmadeusToken();

  try {
    const response = await axios.get<FlightInspirationResponse>(
      'https://test.api.amadeus.com/v1/shopping/flight-destinations',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json',
        },
        params: {
          origin: originCityCode,
          departureDate,
        },
      }
    );

    return response.data;
  } catch {
    throw new Error('Failed to fetch flight inspirations');
  }
};

