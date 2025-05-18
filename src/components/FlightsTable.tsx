import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTableData } from "../hooks/useTableData";
import { TableData } from "../types/tableTypes";
import { DateCell } from "./DateCell";
import {
  SaveButton,
  SearchInput,
  StyledTable,
  TableCell,
  TableContainer,
  TableHeader,
  TableInput,
} from "./StyledComponents";
import FlightsSearch from "./FlightsSearch";

const FlightsTable = () => {
  const {
    data,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    setTableData,
  } = useTableData();
  const columns = Object.keys(data[0] || {});
  const dateCells = ["departureDate", "returnDate"];

  const onSearch = (data: TableData[]) => {
    setTableData(data);
  };

  const showSaveButton = columns.length > 0;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FlightsSearch onSearch={onSearch} />
      <TableContainer>
        {showSaveButton && (
          <SaveButton onClick={saveChanges}>Save Changes</SaveButton>
        )}
        <StyledTable>
          <thead>
            <tr>
              {columns.map((column) => (
                <TableHeader key={column}>
                  {column}
                  <SearchInput
                    placeholder={`Search ${column}...`}
                    onChange={(e) => debouncedFilter(column, e.target.value)}
                  />
                </TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column}`}
                    isEdited={editedCells.has(`${rowIndex}-${column}`)}
                  >
                    {dateCells.includes(column) ? (
                      <DateCell
                        value={row[column as keyof TableData]}
                        onChange={(value) =>
                          updateCell(rowIndex, column, value)
                        }
                      />
                    ) : (
                      <TableInput
                        value={row[column as keyof TableData]}
                        onChange={(e) =>
                          updateCell(rowIndex, column, e.target.value)
                        }
                      />
                    )}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
      </TableContainer>
    </LocalizationProvider>
  );
};

export default FlightsTable;
