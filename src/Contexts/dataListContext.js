import React, { useReducer, useEffect, useContext, createContext } from 'react';

const DataListStateContext = createContext();
const DataListDispatchContext = createContext();

const FETCH_DATA_LIST = 'FETCH_DATA_LIST';
const DATA_LIST_ERROR = 'DATA_LIST_ERROR';
const SAVE_DATA_LIST = 'SAVE_DATA_LIST';
const UPDATE_PAGE = 'UPDATE_PAGE';
const UPDATE_FILTERS = 'UPDATE_FILTERS';

const initialState = {
  status: 'idle',
  error: null,
  dataList: [],
  filters: [],
  page: 1
};

// -------------------!!!-------------------------------

// This is our reducer that will store and handle any
// changes to our DATA LIST state

function DataListReducer(
  state = initialState,
  { type, error, dataList, page, filters }
) {
  switch (type) {
    case FETCH_DATA_LIST: {
      return {
        ...state,
        status: 'fetching'
      };
    }
    case DATA_LIST_ERROR: {
      return {
        ...state,
        status: 'error',
        error: error
      };
    }
    case SAVE_DATA_LIST: {
      return {
        ...state,
        status: 'ready',
        dataList: dataList
      };
    }
    case UPDATE_PAGE: {
      return {
        ...state,
        page: page
      };
    }
    case UPDATE_FILTERS: {
      return {
        ...state,
        filters
      };
    }

    default: {
      throw new Error(`Action not handled for DataListContext ${type}`);
    }
  }
}

// -------------------!!!-------------------------------

// This is our Provider that will wrap our whole app essentially,
// But we usually would only wrap the components within our app
// that would need access to this specific global state

function DataListProvider({ children, listType }) {
  const [state, dispatch] = useReducer(DataListReducer, initialState);

  // Our initial Fetch when loading our desired route

  useEffect(() => {
    fetchDataList({ dispatch });
    fetch(`https://tracktik-challenge.staffr.com/${listType}?_page=1`)
      .then(res => res.json())
      .then(data => saveDataList({ dispatch, dataList: data }))
      .catch(() => dataListError({ dispatch, error: 'FAILED' }));
  }, [listType]);

  // In this useEffect we are checking if the filters
  // are being applied and fetching the data accordingly
  //! I wasn't able to pair the page with filter GET
  //! in json-server. So if you filter you get all the results
  //! but they are properly filtered

  useEffect(() => {
    if (state.filters?.length) {
      filterResults({
        listType,
        filters: state.filters,
        dispatch
      });
    } else {
      fetchDataList({ dispatch });
      fetch(`https://tracktik-challenge.staffr.com/${listType}?_page=1`)
        .then(res => res.json())
        .then(data => saveDataList({ dispatch, dataList: data }))
        .catch(() => dataListError({ dispatch, error: 'FAILED' }));
    }
  }, [listType, state.filters]);

  return (
    <DataListStateContext.Provider value={state}>
      <DataListDispatchContext.Provider value={dispatch}>
        {children}
      </DataListDispatchContext.Provider>
    </DataListStateContext.Provider>
  );
}

function useDataListState() {
  const context = useContext(DataListStateContext);
  if (context === undefined) {
    throw new Error('useDataListState must be used within a DataListProvider');
  }
  return context;
}

function useDataListDispatch() {
  const context = useContext(DataListDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useDataListDispatch must be used within a DataListProvider'
    );
  }
  return context;
}

export const fetchPage = ({ listType = 'sites', page = 1, dispatch }) => {
  fetchDataList({ dispatch });
  updatePage({ dispatch, page });
  fetch(`https://tracktik-challenge.staffr.com/${listType}?_page=${page}`)
    .then(res => res.json())
    .then(data => saveDataList({ dispatch, dataList: data }))
    .catch(() => dataListError({ dispatch, error: 'FAILED' }));
};

export const updateFilter = ({ filters = [], option = '', dispatch }) => {
  if (filters.length && filters.find(item => item === option)) {
    updateFilters({
      fitlers: filters.filter(item => item !== option),
      dispatch
    });
  } else {
    updateFilters({ filters: filters.concat(option), dispatch });
  }
};

export const filterResults = ({
  listType = 'sites',
  filters = [],
  dispatch
}) => {
  fetchDataList({ dispatch });
  let url = '';

  //! --- Only allowing 2 filters in this code challenge ---
  if (filters.length > 1) {
    url = `https://tracktik-challenge.staffr.com/${listType}?tags_like=${filters[0]},${filters[1]}`;
  } else {
    url = `https://tracktik-challenge.staffr.com/${listType}?tags_like=${filters[0]}`;
  }
  fetch(url)
    .then(res => res.json())
    .then(data => saveDataList({ dispatch, dataList: data }))
    .catch(() => dataListError({ dispatch, error: 'FAILED' }));
};

// -------------------!!!-------------------------------

// These are our Actions that are responsible for dispatching
// Updates to our Reducer

export const fetchDataList = ({ dispatch }) => {
  dispatch({
    type: FETCH_DATA_LIST
  });
};

export const dataListError = ({ dispatch, error }) => {
  dispatch({
    type: DATA_LIST_ERROR,
    error
  });
};

export const saveDataList = ({ dispatch, dataList }) => {
  dispatch({
    type: SAVE_DATA_LIST,
    dataList
  });
};

export const updatePage = ({ dispatch, page }) => {
  dispatch({
    type: UPDATE_PAGE,
    page
  });
};

export const updateFilters = ({ dispatch, filters }) => {
  dispatch({
    type: UPDATE_FILTERS,
    filters
  });
};

export { DataListProvider, useDataListState, useDataListDispatch };
