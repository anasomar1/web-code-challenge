import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { useTableData } from "../hooks/useTableData";
import { useColumnOrder } from "../hooks/useColumnOrder";
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
import { useEffect } from "react";
import isEqual from "lodash/isEqual";

const FlightsTable = () => {
  const {
    data,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    setTableData,
  } = useTableData();

  const initialColumns = data.length > 0 ? Object.keys(data[0]) : [];
  const { columns, setColumns, dragHandlers } = useColumnOrder(initialColumns);

  useEffect(() => {
    if (data.length > 0) {
      const dataColumns = Object.keys(data[0]);
      if (!isEqual(columns, dataColumns) && columns.length === 0) {
        setColumns(dataColumns);
      }
    }
  }, [data, setColumns, columns]);

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
              {columns.map((column, index) => (
                <TableHeader
                  key={column}
                  draggable={true}
                  onDragStart={(e) => dragHandlers.handleDragStart(e, index)}
                  onDragOver={dragHandlers.handleDragOver}
                  onDragLeave={dragHandlers.handleDragLeave}
                  onDrop={(e) => dragHandlers.handleDrop(e, index)}
                  onDragEnd={dragHandlers.handleDragEnd}
                  style={{ cursor: "move" }}
                >
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
