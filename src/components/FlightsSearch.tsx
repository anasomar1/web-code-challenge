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

  const handleCityCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toUpperCase();
    setCityCode(value);

    if (cityCodeError) {
      setCityCodeError("");
    }
  };

  const handleSearch = async (cityCode: string, date: string) => {
    const response = await fetchFlightInspirations(cityCode, date);
    const mappedFlightOffers: TableData[] = response.data.map(
      (flightOffer, index) => ({
        id: index.toString(),
        departureDate: flightOffer.departureDate,
        destination: flightOffer.destination,
        origin: flightOffer.origin,
        price: `${flightOffer.price.total}${flightOffer.price.currency ?? ""}`,
        returnDate: flightOffer.returnDate,
        type: flightOffer.type,
      })
    );
    onSearch(mappedFlightOffers);
  };

  const validateForm = (): boolean => {
    const iataPattern = /^[A-Z]{3}$/;

    if (!iataPattern.test(cityCode)) {
      setCityCodeError("City code must be 3 uppercase letters");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      handleSearch(
        cityCode,
        date ? date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")
      );
    }
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

        <SearchButton type="submit">Search Flights</SearchButton>
      </FormContainer>
    </FormCard>
  );
};

export default FlightsSearch;
