import React from 'react';
import styled from 'styled-components';
import {
  fetchPage,
  useDataListDispatch,
  useDataListState
} from '../Contexts/dataListContext';

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  p {
    margin-right: 10px;
  }
`;

const Pagination = ({ path }) => {
  const { page } = useDataListState();
  const dispatch = useDataListDispatch();

  return (
    <StyledContainer>
      <p>Page:</p>
      <label>
        <select
          onChange={e => {
            fetchPage({ listType: path, page: e.target.value, dispatch });
            window.scrollTo(0, 0);
          }}
          defaultValue={page}
        >
          {[...Array(10).keys()].map(i => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </label>
    </StyledContainer>
  );
};

export default Pagination;
