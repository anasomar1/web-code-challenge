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
import Pagination from "./Pagination";
import { useEffect, useState } from "react";
import isEqual from "lodash/isEqual";

const PAGE_SIZE = 5;

const FlightsTable = () => {
  const {
    data,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    setTableData,
  } = useTableData();
  const dateCells = ["departureDate", "returnDate"];
  const [currentPage, setCurrentPage] = useState(1);

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

  const onSearch = (data: TableData[]) => {
    setTableData(data);
    setCurrentPage(1);
  };

  const showSaveButton = columns.length > 0;

  const indexOfLastItem = currentPage * PAGE_SIZE;
  const indexOfFirstItem = indexOfLastItem - PAGE_SIZE;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

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
            {currentItems.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column) => (
                  <TableCell
                    key={`${rowIndex}-${column}`}
                    isEdited={editedCells.has(
                      `${indexOfFirstItem + rowIndex}-${column}`
                    )}
                  >
                    {dateCells.includes(column) ? (
                      <DateCell
                        value={row[column as keyof TableData]}
                        onChange={(value) =>
                          updateCell(indexOfFirstItem + rowIndex, column, value)
                        }
                      />
                    ) : (
                      <TableInput
                        value={row[column as keyof TableData]}
                        onChange={(e) =>
                          updateCell(
                            indexOfFirstItem + rowIndex,
                            column,
                            e.target.value
                          )
                        }
                      />
                    )}
                  </TableCell>
                ))}
              </tr>
            ))}
          </tbody>
        </StyledTable>
        <Pagination
          totalItems={data.length}
          itemsPerPage={PAGE_SIZE}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </TableContainer>
    </LocalizationProvider>
  );
};

export default FlightsTable;
