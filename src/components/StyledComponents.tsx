import styled from "@emotion/styled";

export const TableContainer = styled.div`
  padding: 20px;
  max-width: 100%;
  overflow-x: auto;
`;

export const StyledTable = styled.table`
  border-collapse: collapse;
  width: 100%;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const TableHeader = styled.th`
  background: #f5f5f5;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  border-bottom: 2px solid #ddd;
`;

export const TableCell = styled.td<{ isEdited?: boolean }>`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  background: ${({ isEdited }) => (isEdited ? "#fff9c4" : "inherit")};
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 8px;
  margin: 4px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const SaveButton = styled.button`
  padding: 10px 20px;
  background: #1976d2;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  &:hover {
    background: #1565c0;
  }
`;

export const FormCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
`;

export const FormTitle = styled.h2`
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

export const FormContainer = styled.form`
  display: flex;
  flex-direction: row;
  gap: 16px;
  align-items: flex-end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const InputLabel = styled.label`
  font-size: 14px;
  margin-bottom: 8px;
  color: #666;
`;

export const CityCodeInput = styled(SearchInput)`
  min-width: 120px;
`;

export const ErrorText = styled.span`
  color: #d32f2f;
  font-size: 12px;
  margin-top: 4px;
`;

export const SearchButton = styled(SaveButton)`
  margin: 0;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const TableInput = styled.input`
  border: none;
  background: transparent;
  width: 100%;
  padding: 2px 4px;
  font-family: inherit;
  &:focus {
    outline: 1px solid #1976d2;
    border-radius: 2px;
  }
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 16px;
  gap: 8px;
`;

export const PageButton = styled.button<{ isActive?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: ${(props) => (props.isActive ? "#4a90e2" : "#ffffff")};
  color: ${(props) => (props.isActive ? "#ffffff" : "#333333")};
  cursor: pointer;
  border-radius: 4px;
  &:hover {
    background-color: ${(props) => (props.isActive ? "#4a90e2" : "#f5f5f5")};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;
