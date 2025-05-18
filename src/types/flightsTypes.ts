export interface FlightOffer {
  type: string;
  origin: string;
  destination: string;
  departureDate: string;
  returnDate: string;
  price: {
    total: string;
    currency?: string;
  };
  links: {
    flightDates: string;
    flightOffers: string;
  };
}

