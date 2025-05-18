import React, { useState } from "react";

export const useColumnOrder = (initialColumns: string[]) => {
  const [columns, setColumns] = useState<string[]>(initialColumns);

  const moveColumn = (fromIndex: number, toIndex: number) => {
    const newOrder = [...columns];
    const [movedColumn] = newOrder.splice(fromIndex, 1);
    newOrder.splice(toIndex, 0, movedColumn);
    setColumns(newOrder);
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLTableCellElement>,
    index: number
  ) => {
    e.dataTransfer.setData("columnIndex", index.toString());
    e.currentTarget.style.opacity = "0.4";
  };

  const handleDragOver = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.preventDefault();
    e.currentTarget.style.borderLeft = "1px solid blue";
  };

  const handleDragLeave = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.currentTarget.style.borderLeft = "";
  };

  const handleDrop = (
    e: React.DragEvent<HTMLTableCellElement>,
    dropIndex: number
  ) => {
    e.preventDefault();
    const dragIndex = parseInt(e.dataTransfer.getData("columnIndex"));
    if (dragIndex !== dropIndex) {
      moveColumn(dragIndex, dropIndex);
    }
    e.currentTarget.style.borderLeft = "";
  };

  const handleDragEnd = (e: React.DragEvent<HTMLTableCellElement>) => {
    e.currentTarget.style.opacity = "1";
  };

  return {
    columns,
    moveColumn,
    setColumns,
    dragHandlers: {
      handleDragStart,
      handleDragOver,
      handleDragLeave,
      handleDrop,
      handleDragEnd,
    },
  };
};
