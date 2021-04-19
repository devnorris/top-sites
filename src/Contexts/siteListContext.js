import React, { useReducer, useEffect, useContext, createContext } from 'react';

const SiteListStateContext = createContext();
const SiteListDispatchContext = createContext();

const FETCH_SITE_LIST = 'FETCH_SITE_LIST';
const SITE_LIST_ERROR = 'SITE_LIST_ERROR';
const SAVE_SITE_LIST = 'SAVE_SITE_LIST';

const initialState = {
  status: 'idle',
  error: null,
  siteList: []
};

/*
    This is our reducer that will store and handle any
    changes to our SITE LIST state.
*/
function SiteListReducer(state = initialState, { type, error, siteList }) {
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

    default: {
      throw new Error(`Action not handled for SiteListContext ${type}`);
    }
  }
}

function SiteListProvider({ children }) {
  const [state, dispatch] = useReducer(SiteListReducer, initialState);

  useEffect(() => {
    fetchSiteList({ dispatch });
    fetch('test')
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(error => siteListError({ dispatch, error: 'FAILED' }));
  }, []);

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
  console.log(error);
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

export { SiteListProvider, useSiteListState, useSiteListDispatch };
