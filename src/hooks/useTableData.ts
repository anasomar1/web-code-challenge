import { useState, useEffect, useMemo } from "react";
import { TableData } from "../types/tableTypes";
import debounce from "lodash/debounce";

export const useTableData = () => {
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [editedCells, setEditedCells] = useState<Set<string>>(new Set());
  const [columnFilters, setColumnFilters] = useState<Record<string, string>>(
    {}
  );

  const debouncedFilter = useMemo(
    () =>
      debounce((column: string, value: string) => {
        setColumnFilters((prev) => ({
          ...prev,
          [column]: value,
        }));
      }, 300),
    []
  );

  useEffect(() => {
    const savedData = localStorage.getItem("tableData");
    if (savedData) {
      setTableData(JSON.parse(savedData));
    }
    return () => {
      debouncedFilter.cancel();
    };
  }, []);

  const saveChanges = () => {
    localStorage.setItem("tableData", JSON.stringify(tableData));
    setEditedCells(new Set());
  };

  const updateCell = (rowIndex: number, columnId: string, value: string) => {
    const newData = [...tableData];
    newData[rowIndex] = {
      ...newData[rowIndex],
      [columnId]: value,
    };
    setTableData(newData);
    setEditedCells(new Set(editedCells).add(`${rowIndex}-${columnId}`));
  };

  const filteredData = useMemo(() => {
    return tableData.filter((row) => {
      return Object.entries(columnFilters).every(([column, filterValue]) => {
        return row[column as keyof TableData]
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      });
    });
  }, [tableData, columnFilters]);

  return {
    data: filteredData,
    editedCells,
    updateCell,
    saveChanges,
    debouncedFilter,
    setTableData,
  };
};
