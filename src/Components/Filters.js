import React from 'react';
import styled from 'styled-components';
import {
  updateFilter,
  useDataListDispatch,
  useDataListState
} from '../Contexts/dataListContext';

const StyledFilters = styled.div`
  display: flex;
  align-items: center;

  button:nth-of-type(1) {
    margin: 0 10px;
  }

  button {
    border: 1px solid black;
    color: inherit;
    text-decoration: none;
    padding: 5px;
    background-color: transparent;
    cursor: pointer;
    height: 100%;

    &[data-filteractive='true'] {
      background-color: #569a7ea6;
      border: 1px solid #397d61;
    }
  }
`;

const Filters = ({ options }) => {
  const { filters } = useDataListState();
  const dispatch = useDataListDispatch();

  return (
    <StyledFilters>
      <h4>Filters: </h4>
      {options.map(option => (
        <button
          key={option}
          data-filteractive={filters?.includes(option)}
          onClick={() => updateFilter({ filters, option, dispatch })}
        >
          {option}
        </button>
      ))}
    </StyledFilters>
  );
};

export default Filters;
