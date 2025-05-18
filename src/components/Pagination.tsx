import React from "react";
import { PaginationContainer, PageButton } from "./StyledComponents";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  if (totalPages <= 1 || totalItems === 0) {
    return null;
  }

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <PaginationContainer>
      <PageButton onClick={handlePrevious} disabled={currentPage === 1}>
        Previous
      </PageButton>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
        <PageButton
          key={pageNumber}
          isActive={pageNumber === currentPage}
          onClick={() => onPageChange(pageNumber)}
        >
          {pageNumber}
        </PageButton>
      ))}

      <PageButton onClick={handleNext} disabled={currentPage === totalPages}>
        Next
      </PageButton>
    </PaginationContainer>
  );
};

export default Pagination;
