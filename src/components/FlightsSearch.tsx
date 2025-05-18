import React, { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import {
  FormCard,
  FormTitle,
  FormContainer,
  InputGroup,
  InputLabel,
  CityCodeInput,
  ErrorText,
  SearchButton,
} from "./StyledComponents";
import { fetchFlightInspirations } from "../services/api/flights";
import { TableData } from "../types/tableTypes";

interface SearchFormProps {
  onSearch: (data: TableData[]) => void;
}

const FlightsSearch: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [cityCode, setCityCode] = useState("");
  const [date, setDate] = useState<Dayjs | null>(dayjs());
  const [cityCodeError, setCityCodeError] = useState("");
  const [searchError, setSearchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCityCode(value);
    if (cityCodeError) {
      setCityCodeError("");
    }
  };

  const handleSearch = async (cityCode: string, date: string) => {
    setIsLoading(true);
    setSearchError("");
    try {
      const response = await fetchFlightInspirations(cityCode, date);
      const mappedFlightOffers: TableData[] = response.data.map(
        (flightOffer, index) => ({
          id: index.toString(),
          departureDate: flightOffer.departureDate,
          destination: flightOffer.destination,
          origin: flightOffer.origin,
          price: `${flightOffer.price.total}${
            flightOffer.price.currency ?? ""
          }`,
          returnDate: flightOffer.returnDate,
          type: flightOffer.type,
        })
      );
      onSearch(mappedFlightOffers);
    } catch (error) {
      setSearchError("Something went wrong, please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const dateFormat = "YYYY-MM-DD";
    handleSearch(
      cityCode,
      date ? date.format(dateFormat) : dayjs().format(dateFormat)
    );
  };

  return (
    <FormCard>
      <FormTitle>Flight Inspiration Search</FormTitle>
      <FormContainer onSubmit={handleSubmit}>
        <InputGroup>
          <InputLabel>Origin City (IATA Code)</InputLabel>
          <CityCodeInput
            type="text"
            value={cityCode}
            onChange={handleCityCodeChange}
            required
            placeholder="e.g. MAD"
            maxLength={3}
          />
          {cityCodeError && <ErrorText>{cityCodeError}</ErrorText>}
        </InputGroup>

        <InputGroup>
          <InputLabel>Departure Date</InputLabel>
          <DatePicker
            value={date}
            onChange={setDate}
            slotProps={{
              textField: {
                variant: "outlined",
                size: "small",
                fullWidth: true,
                placeholder: "Select date",
              },
            }}
          />
        </InputGroup>

        <SearchButton type="submit" disabled={isLoading}>
          {isLoading ? "Searching..." : "Search Flights"}
        </SearchButton>
      </FormContainer>
      {searchError && <ErrorText>{searchError}</ErrorText>}
    </FormCard>
  );
};

export default FlightsSearch;
