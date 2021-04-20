import React, { useReducer, useEffect, useContext, createContext } from 'react';

const SiteListStateContext = createContext();
const SiteListDispatchContext = createContext();

const FETCH_SITE_LIST = 'FETCH_SITE_LIST';
const SITE_LIST_ERROR = 'SITE_LIST_ERROR';
const SAVE_SITE_LIST = 'SAVE_SITE_LIST';
const UPDATE_PAGE = 'UPDATE_PAGE';

const initialState = {
  status: 'idle',
  error: null,
  siteList: [],
  page: 1
};

/*
    This is our reducer that will store and handle any
    changes to our SITE LIST state.
*/
function SiteListReducer(
  state = initialState,
  { type, error, siteList, page }
) {
  switch (type) {
    case FETCH_SITE_LIST: {
      return {
        ...state,
        status: 'fetching'
      };
    }
    case SITE_LIST_ERROR: {
      return {
        ...state,
        status: 'error',
        error: error
      };
    }
    case SAVE_SITE_LIST: {
      return {
        ...state,
        status: 'ready',
        siteList: state.siteList.concat(siteList)
      };
    }
    case UPDATE_PAGE: {
      return {
        ...state,
        page: page
      };
    }

    default: {
      throw new Error(`Action not handled for SiteListContext ${type}`);
    }
  }
}

function SiteListProvider({ children }) {
  const [state, dispatch] = useReducer(SiteListReducer, initialState);

  useEffect(() => {
    fetchSiteList({ dispatch });
    fetch(
      `http://localhost:3000/sites?_page=${
        state.page ? state.page : initialState.page
      }`
    )
      .then(res => res.json())
      .then(data => saveSiteList({ dispatch, siteList: data }))
      .catch(error => {
        console.log('error', error);
        siteListError({ dispatch, error: 'FAILED' });
      });
  }, [state.page]);

  return (
    <SiteListStateContext.Provider value={state}>
      <SiteListDispatchContext.Provider value={dispatch}>
        {children}
      </SiteListDispatchContext.Provider>
    </SiteListStateContext.Provider>
  );
}

function useSiteListState() {
  const context = useContext(SiteListStateContext);
  if (context === undefined) {
    throw new Error('useSiteListState must be used within a SiteListProvider');
  }
  return context;
}

function useSiteListDispatch() {
  const context = useContext(SiteListDispatchContext);
  if (context === undefined) {
    throw new Error(
      'useSiteListDispatch must be used within a SiteListProvider'
    );
  }
  return context;
}

export const fetchSiteList = ({ dispatch }) => {
  dispatch({
    type: FETCH_SITE_LIST
  });
};

export const siteListError = ({ dispatch, error }) => {
  dispatch({
    type: SITE_LIST_ERROR,
    error
  });
};

export const saveSiteList = ({ dispatch, siteList }) => {
  dispatch({
    type: SAVE_SITE_LIST,
    siteList
  });
};

export const updatePage = ({ dispatch, page }) => {
  dispatch({
    type: UPDATE_PAGE,
    page
  });
};

export { SiteListProvider, useSiteListState, useSiteListDispatch };
